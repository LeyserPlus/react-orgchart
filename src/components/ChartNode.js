import autoBind from 'react-autobind';
import React,{ PropTypes,PureComponent } from 'react';
import { dragNodeService,selectNodeService } from "./service";
import "./ChartNode.css";

export default class ChartNode extends PureComponent {
  static propTypes = {
    datasource: PropTypes.object,
    NodeTemplate: PropTypes.func,
    draggable: PropTypes.bool,
    collapsible: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    changeHierarchy: PropTypes.func,
    onClickNode: PropTypes.func
  };

  static defaultProps = {
    draggable: false,
    collapsible: true,
    multipleSelect: false
  };

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isChildrenCollapsed: false,
      topEdgeExpanded: undefined,
      rightEdgeExpanded: undefined,
      bottomEdgeExpanded: undefined,
      leftEdgeExpanded: undefined,
      allowedDrop: false,
      selected: false
    }
  }

  // componentDidMount () {
  //   this.init(this.props)
  // }
  // //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  // componentWillReceiveProps (nextProps) {
  //   // if (this.props.multipleSelect !== nextProps.multipleSelect ||
  //   //   this.props.datasource !== nextProps.datasource) {
  //   //   this.init(nextProps);
  //   // }
  // }

  // componentWillUnmount () {
  //   this.subs1.unsubscribe();
  //   this.subs2.unsubscribe();
  // }

  init (props) {
    this.subs1 = dragNodeService.getDragInfo().subscribe(draggedInfo => {
      if (draggedInfo) {
        const allowedDrop =
          !document.querySelector("#" + draggedInfo.draggedNodeId).closest("li").querySelector("#" + this.node.id) ? true : false;
        this.setState({ allowedDrop });

      } else {
        this.setState({ allowedDrop: false });
      }
    }
    );

    const { multipleSelect,datasource } = props;

    this.subs2 = selectNodeService
      .getSelectedNodeInfo()
      .subscribe(selectedNodeInfo => {
        if (selectedNodeInfo) {
          if (multipleSelect) {
            if (selectedNodeInfo.selectedNodeId === datasource.id) {
              this.setState({ selected: true });
            }
          } else {
            this.setState({ selected: selectedNodeInfo.selectedNodeId === datasource.id });
          }
        } else {
          this.setState({ selected: false });
        }
      });
  }

  addArrows (e) {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    const isAncestorsCollapsed =
      node && parent
        ? parent.firstChild.classList.contains("hidden")
        : undefined;
    const isSiblingsCollapsed = Array.from(
      node.parentNode.children
    ).some(item => item.classList.contains("hidden"));

    this.setState({
      topEdgeExpanded: !isAncestorsCollapsed,
      rightEdgeExpanded: !isSiblingsCollapsed,
      leftEdgeExpanded: !isSiblingsCollapsed,
      bottomEdgeExpanded: !this.state.isAncestorsCollapsed,
    });
  };

  removeArrows () {
    this.setState({
      topEdgeExpanded: undefined,
      rightEdgeExpanded: undefined,
      leftEdgeExpanded: undefined,
      bottomEdgeExpanded: undefined,
    });
  };

  toggleAncestors (actionNode) {
    let node = actionNode.parentNode.closest("li");
    if (!node) return;
    const isAncestorsCollapsed = node.firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      // 向上展开，只展开一级
      actionNode.classList.remove("isAncestorsCollapsed");
      node.firstChild.classList.remove("hidden");
    } else {
      // 向下折叠，则折叠所有祖先节点以及祖先节点的兄弟节点
      const isSiblingsCollapsed = Array.from(
        actionNode.parentNode.children
      ).some(item => item.classList.contains("hidden"));
      if (!isSiblingsCollapsed) {
        this.toggleSiblings(actionNode);
      }
      actionNode.classList.add(
        ...(
          "isAncestorsCollapsed" +
          (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")
        ).split(" ")
      );
      node.firstChild.classList.add("hidden");
      // 如果还有展开的祖先节点，那继续折叠关闭之
      if (
        node.parentNode.closest("li") &&
        !node.parentNode.closest("li").firstChild.classList.contains("hidden")
      ) {
        this.toggleAncestors(node);
      }
    }
  };

  topEdgeClickHandler (e) {
    e.stopPropagation();
    this.setState({ topEdgeExpanded: !this.state.topEdgeExpanded });
    this.toggleAncestors(e.target.closest("li"));
  };

  bottomEdgeClickHandler (e) {
    const { isChildrenCollapsed,bottomEdgeExpanded } = this.state;
    e.stopPropagation();
    this.setState({ isChildrenCollapsed: !isChildrenCollapsed,bottomEdgeExpanded: !bottomEdgeExpanded });
  };

  toggleSiblings (actionNode) {
    let node = actionNode.previousSibling;
    const isSiblingsCollapsed = Array.from(
      actionNode.parentNode.children
    ).some(item => item.classList.contains("hidden"));
    actionNode.classList.toggle("isSiblingsCollapsed",!isSiblingsCollapsed);
    // 先处理同级的兄弟节点
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.previousSibling;
    }
    node = actionNode.nextSibling;
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.nextSibling;
    }
    // 在展开兄弟节点的同时，还要展开父节点
    const isAncestorsCollapsed = actionNode.parentNode
      .closest("li")
      .firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      this.toggleAncestors(actionNode);
    }
  };

  hEdgeClickHandler (e) {
    e.stopPropagation();
    const { leftEdgeExpanded,rightEdgeExpanded } = this.state;
    this.setState({ leftEdgeExpanded: !leftEdgeExpanded,rightEdgeExpanded: !rightEdgeExpanded });
    this.toggleSiblings(e.target.closest("li"));
  };

  filterAllowedDropNodes (id) {
    dragNodeService.sendDragInfo(id);
  };

  clickNodeHandler (event) {
    const { onClickNode,datasource } = this.props;
    if (onClickNode) {
      onClickNode(datasource);
    }

    selectNodeService.sendSelectedNodeInfo(datasource.id);
  };

  dragstartHandler (event) {
    const copyDS = { ...this.props.datasource };
    delete copyDS.relationship;
    event.dataTransfer.setData("text/plain",JSON.stringify(copyDS));
    // highlight all potential drop targets
    this.filterAllowedDropNodes(this.node.id);
  };

  dragoverHandler (event) {
    // prevent default to allow drop
    event.preventDefault();
  };

  dragendHandler () {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  dropHandler (event) {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }
    dragNodeService.clearDragInfo();
    this.props.changeHierarchy(
      JSON.parse(event.dataTransfer.getData("text/plain")),
      event.currentTarget.id
    );
  };

  render () {
    const { datasource,draggable,NodeTemplate,collapsible,multipleSelect,changeHierarchy,onClickNode } = this.props;
    const { topEdgeExpanded,rightEdgeExpanded,leftEdgeExpanded,bottomEdgeExpanded,isChildrenCollapsed,allowedDrop,selected } = this.state;

    const nodeClass = [
      "oc-node",
      isChildrenCollapsed ? "isChildrenCollapsed" : "",
      allowedDrop ? "allowedDrop" : "",
      selected ? "selected" : ""
    ]
      .filter(item => item)
      .join(" ");


    return (
      <li className="oc-hierarchy">
        <div
          ref={(c) => this.node = c}
          id={datasource.id}
          className={nodeClass}
          draggable={draggable ? "true" : undefined}
          onClick={this.clickNodeHandler}
          onDragStart={this.dragstartHandler}
          onDragOver={this.dragoverHandler}
          onDragEnd={this.dragendHandler}
          onDrop={this.dropHandler}
          onMouseEnter={this.addArrows}
          onMouseLeave={this.removeArrows}
        >
          {NodeTemplate ? (
            <NodeTemplate nodeData={datasource} />
          ) : (
            <div>
              <div className="oc-heading">
                {datasource.relationship &&
                  datasource.relationship.charAt(2) === "1" && (
                    <i className="oci oci-leader oc-symbol" />
                  )}
                {datasource.name}
              </div>
              <div className="oc-content">{datasource.title}</div>
            </div>
          )}
          {/* <div>
                        <div className="oc-heading">
                            {datasource.relationship &&
                                datasource.relationship.charAt(2) === "1" && (
                                    <i className="oci oci-leader oc-symbol" />
                                )}
                            {datasource.name}
                        </div>
                        <div className="oc-content">{datasource.title}</div>
                    </div> */}
          {collapsible &&
            datasource.relationship &&
            datasource.relationship.charAt(0) === "1" && (
              <i
                className={`oc-edge verticalEdge topEdge oci ${ topEdgeExpanded === undefined
                  ? ""
                  : topEdgeExpanded
                    ? "oci-chevron-down"
                    : "oci-chevron-up"
                  }`}
                onClick={this.topEdgeClickHandler}
              />
            )}
          {collapsible &&
            datasource.relationship &&
            datasource.relationship.charAt(1) === "1" && (
              <div>
                <i
                  className={`oc-edge horizontalEdge rightEdge oci ${ rightEdgeExpanded === undefined
                    ? ""
                    : rightEdgeExpanded
                      ? "oci-chevron-left"
                      : "oci-chevron-right"
                    }`}
                  onClick={this.hEdgeClickHandler}
                />
                <i
                  className={`oc-edge horizontalEdge leftEdge oci ${ leftEdgeExpanded === undefined
                    ? ""
                    : leftEdgeExpanded
                      ? "oci-chevron-right"
                      : "oci-chevron-left"
                    }`}
                  onClick={this.hEdgeClickHandler}
                />
              </div>
            )}
          {collapsible &&
            datasource.relationship &&
            datasource.relationship.charAt(2) === "1" && (
              <i
                className={`oc-edge verticalEdge bottomEdge oci ${ bottomEdgeExpanded === undefined
                  ? ""
                  : bottomEdgeExpanded
                    ? "oci-chevron-up"
                    : "oci-chevron-down"
                  }`}
                onClick={this.bottomEdgeClickHandler}
              />
            )}
        </div>
        {datasource.children && datasource.children.length > 0 && (
          <ul className={isChildrenCollapsed ? "hidden" : ""}>
            {datasource.children.map(nodeItem => (
              <ChartNode
                datasource={nodeItem}
                NodeTemplate={NodeTemplate}
                id={nodeItem.id}
                key={nodeItem.id}
                draggable={draggable}
                collapsible={collapsible}
                multipleSelect={multipleSelect}
                // changeHierarchy={changeHierarchy}
                onClickNode={onClickNode}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
};
