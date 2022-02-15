import autoBind from 'react-autobind';
import React,{ PropTypes,PureComponent } from 'react';
import { selectNodeService } from "./service";
import JSONDigger from "json-digger";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ChartNode from "./ChartNode";
import "./ChartContainer.css";

export default class ChartContainer extends PureComponent {
  static propTypes = {
    datasource: PropTypes.object.isRequired,
    pan: PropTypes.bool,
    zoom: PropTypes.bool,
    zoomoutLimit: PropTypes.number,
    zoominLimit: PropTypes.number,
    containerClass: PropTypes.string,
    chartClass: PropTypes.string,
    NodeTemplate: PropTypes.func,
    draggable: PropTypes.bool,
    collapsible: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    onClickNode: PropTypes.func,
    onClickChart: PropTypes.func
  };

  static defaultProps = {
    pan: false,
    zoom: false,
    zoomoutLimit: 0.5,
    zoominLimit: 7,
    containerClass: "",
    chartClass: "",
    draggable: false,
    collapsible: true,
    multipleSelect: false
  };

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      startX: 0,
      startY: 0,
      transform: '',
      panning: false,
      cursor: 'default',
      exporting: false,
      dataURL: '',
      download: '',
      ds: props.datasource
    }
  }

  attachRel (data,flags) {
    data.relationship =
      flags + (data.children && data.children.length > 0 ? 1 : 0);
    if (data.children) {
      data.children.forEach(item => {
        this.attachRel(item,"1" + (data.children.length > 1 ? 1 : 0));
      });
    }
    return data;
  };

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps (nextProps) {
    if (this.props.datasource !== nextProps.datasource) {
      this.setState({
        ds: nextProps.datasource
      });
    }
  }

  clickChartHandler (event) {
    if (!event.target.closest(".oc-node")) {
      if (this.props.onClickChart) {
        this.props.onClickChart();
      }
      selectNodeService.clearSelectedNodeInfo();
    }
  };

  panEndHandler () {
    this.setState({ panning: false,cursor: 'default' });
  };

  panHandler (e) {
    const { startX,startY,transform } = this.state;
    let newX = 0;
    let newY = 0;
    if (!e.targetTouches) {
      // pand on desktop
      newX = e.pageX - startX;
      newY = e.pageY - startY;
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      newX = e.targetTouches[0].pageX - startX;
      newY = e.targetTouches[0].pageY - startY;
    } else if (e.targetTouches.length > 1) {
      return;
    }
    if (transform === "") {
      if (transform.indexOf("3d") === -1) {
        this.setState({
          transform:
            "matrix(1,0,0,1," + newX + "," + newY + ")"
        });
      } else {
        this.setState({
          transform:
            "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)"
        });
      }
    } else {
      let matrix = transform.split(",");
      if (transform.indexOf("3d") === -1) {
        matrix[4] = newX;
        matrix[5] = newY + ")";
      } else {
        matrix[12] = newX;
        matrix[13] = newY;
      }
      this.setState({
        transform:
          matrix.join(",")
      });
    }
  };

  panStartHandler (e) {
    const { transform } = this.state;
    if (e.target.closest(".oc-node")) {
      this.setState({ panning: false });
      return;
    } else {
      this.setState({ panning: true });
      this.setState({ cursor: 'move' });
    }
    let lastX = 0;
    let lastY = 0;
    if (transform !== "") {
      let matrix = transform.split(",");
      if (transform.indexOf("3d") === -1) {
        lastX = parseInt(matrix[4]);
        lastY = parseInt(matrix[5]);
      } else {
        lastX = parseInt(matrix[12]);
        lastY = parseInt(matrix[13]);
      }
    }
    if (!e.targetTouches) {
      this.setState({ startX: e.pageX - lastX,startY: e.pageY - lastY });
    } else if (e.targetTouches.length === 1) {
      this.setState({ startX: e.targetTouches[0].pageX - lastX,startY: e.targetTouches[0].pageY - lastY });
    } else if (e.targetTouches.length > 1) {
      return;
    }
  };

  updateChartScale (newScale) {
    const { transform } = this.state;
    const { zoomoutLimit,zoominLimit } = this.props;
    let matrix = [];
    let targetScale = 1;
    if (transform === "") {
      this.setState({ transform: "matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)" });
    } else {
      matrix = transform.split(",");
      if (transform.indexOf("3d") === -1) {
        targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
        if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
          matrix[0] = "matrix(" + targetScale;
          matrix[3] = targetScale;
          this.setState({ transform: matrix.join(",") });
        }
      } else {
        targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
        if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
          matrix[0] = "matrix3d(" + targetScale;
          matrix[5] = targetScale;
          this.setState({ transform: matrix.join(",") });
        }
      }
    }
  };

  zoomHandler (e) {
    let newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
    this.updateChartScale(newScale);
  };

  exportPDF (canvas,exportFilename) {
    const canvasWidth = Math.floor(canvas.width);
    const canvasHeight = Math.floor(canvas.height);
    const doc =
      canvasWidth > canvasHeight
        ? new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvasWidth,canvasHeight]
        })
        : new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvasHeight,canvasWidth]
        });
    doc.addImage(canvas.toDataURL("image/jpeg",1.0),"JPEG",0,0);
    doc.save(exportFilename + ".pdf");
  };

  exportPNG (canvas,exportFilename) {
    const isWebkit = "WebkitAppearance" in document.documentElement.style;
    const isFf = !!window.sidebar;
    const isEdge =
      navigator.appName === "Microsoft Internet Explorer" ||
      (navigator.appName === "Netscape" &&
        navigator.appVersion.indexOf("Edge") > -1);

    if ((!isWebkit && !isFf) || isEdge) {
      window.navigator.msSaveBlob(canvas.msToBlob(),exportFilename + ".png");
    } else {
      this.setState({ dataURL: canvas.toDataURL(),download: exportFilename + ".png" });
      this.downloadButton.click();
    }
  };

  async changeHierarchy (draggedItemData,dropTargetId) {
    const dsDigger = new JSONDigger(this.props.datasource,"id","children");
    await dsDigger.removeNode(draggedItemData.id);
    await dsDigger.addChildren(dropTargetId,draggedItemData);
    this.setState({ ds: { ...dsDigger.ds } });
  };


  exportTo (exportFilename,exportFileextension) {
    exportFilename = exportFilename || "OrgChart";
    exportFileextension = exportFileextension || "png";
    this.setState({ exporting: true });
    const container = this.container;
    const chart = this.chart;
    const originalScrollLeft = container.scrollLeft;
    container.scrollLeft = 0;
    const originalScrollTop = container.scrollTop;
    container.scrollTop = 0;
    html2canvas(chart,{
      width: chart.clientWidth,
      height: chart.clientHeight,
      onclone: function (clonedDoc) {
        clonedDoc.querySelector(".orgchart").style.background = "none";
        clonedDoc.querySelector(".orgchart").style.transform = "";
      }
    }).then(
      canvas => {
        if (exportFileextension.toLowerCase() === "pdf") {
          this.exportPDF(canvas,exportFilename);
        } else {
          this.exportPNG(canvas,exportFilename);
        }
        this.setState({ exporting: false });
        container.scrollLeft = originalScrollLeft;
        container.scrollTop = originalScrollTop;
      },
      () => {
        this.setState({ exporting: false });
        container.scrollLeft = originalScrollLeft;
        container.scrollTop = originalScrollTop;
      }
    );
  }
  expandAllNodes () {
    this.chart
      .querySelectorAll(
        ".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed"
      )
      .forEach(el => {
        el.classList.remove(
          "hidden",
          "isSiblingsCollapsed",
          "isAncestorsCollapsed"
        );
      });
  }

  render () {
    const { containerClass,zoom,pan,chartClass,NodeTemplate,draggable,collapsible,multipleSelect,onClickNode,datasource } = this.props;
    const { panning,transform,cursor,dataURL,download,exporting } = this.state;
    return (
      <div
        ref={(c) => this.container = c}
        className={"orgchart-container " + containerClass}
        onWheel={zoom ? this.zoomHandler : undefined}
        onMouseUp={pan && panning ? this.panEndHandler : undefined}
      >
        <div
          ref={(c) => this.chart = c}
          className={"orgchart " + chartClass}
          style={{ transform: transform,cursor: cursor }}
          onClick={this.clickChartHandler}
          onMouseDown={pan ? this.panStartHandler : undefined}
          onMouseMove={pan && panning ? this.panHandler : undefined}
        >
          <ul>
            <ChartNode
              datasource={this.attachRel(datasource,"00")}
              NodeTemplate={NodeTemplate}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={this.changeHierarchy}
              onClickNode={onClickNode}
            />
          </ul>
        </div>
        <a
          className="oc-download-btn hidden"
          ref={(c) => { this.downloadButton = c }}
          href={dataURL}
          download={download}
        >
          &nbsp;
        </a>
        <div className={`oc-mask ${ exporting ? "" : "hidden" }`}>
          <i className="oci oci-spinner spinner"></i>
        </div>
      </div >
    );
  }
}
