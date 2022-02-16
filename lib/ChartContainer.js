"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactAutobind = _interopRequireDefault(require("react-autobind"));

var _react = _interopRequireWildcard(require("react"));

var _service = require("./service");

var _jsonDigger = _interopRequireDefault(require("json-digger"));

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _jspdf = _interopRequireDefault(require("jspdf"));

var _ChartNode = _interopRequireDefault(require("./ChartNode"));

require("./ChartContainer.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChartContainer = /*#__PURE__*/function (_PureComponent) {
  _inherits(ChartContainer, _PureComponent);

  var _super = _createSuper(ChartContainer);

  function ChartContainer(props) {
    var _this;

    _classCallCheck(this, ChartContainer);

    _this = _super.call(this, props);
    (0, _reactAutobind["default"])(_assertThisInitialized(_this));
    _this.state = {
      startX: 0,
      startY: 0,
      transform: '',
      panning: false,
      cursor: 'default',
      exporting: false,
      dataURL: '',
      download: '',
      ds: props.datasource
    };
    return _this;
  }

  _createClass(ChartContainer, [{
    key: "attachRel",
    value: function attachRel(data, flags) {
      var _this2 = this;

      data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);

      if (data.children) {
        data.children.forEach(function (item) {
          _this2.attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
        });
      }

      return data;
    }
  }, {
    key: "componentWillReceiveProps",
    value: //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    function componentWillReceiveProps(nextProps) {
      if (this.props.datasource !== nextProps.datasource) {
        this.setState({
          ds: nextProps.datasource
        });
      }
    }
  }, {
    key: "clickChartHandler",
    value: function clickChartHandler(event) {
      if (!event.target.closest(".oc-node")) {
        if (this.props.onClickChart) {
          this.props.onClickChart();
        }

        _service.selectNodeService.clearSelectedNodeInfo();
      }
    }
  }, {
    key: "panEndHandler",
    value: function panEndHandler() {
      this.setState({
        panning: false,
        cursor: 'default'
      });
    }
  }, {
    key: "panHandler",
    value: function panHandler(e) {
      var _this$state = this.state,
          startX = _this$state.startX,
          startY = _this$state.startY,
          transform = _this$state.transform;
      var newX = 0;
      var newY = 0;

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
            transform: "matrix(1,0,0,1," + newX + "," + newY + ")"
          });
        } else {
          this.setState({
            transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)"
          });
        }
      } else {
        var matrix = transform.split(",");

        if (transform.indexOf("3d") === -1) {
          matrix[4] = newX;
          matrix[5] = newY + ")";
        } else {
          matrix[12] = newX;
          matrix[13] = newY;
        }

        this.setState({
          transform: matrix.join(",")
        });
      }
    }
  }, {
    key: "panStartHandler",
    value: function panStartHandler(e) {
      var transform = this.state.transform;

      if (e.target.closest(".oc-node")) {
        this.setState({
          panning: false
        });
        return;
      } else {
        this.setState({
          panning: true
        });
        this.setState({
          cursor: 'move'
        });
      }

      var lastX = 0;
      var lastY = 0;

      if (transform !== "") {
        var matrix = transform.split(",");

        if (transform.indexOf("3d") === -1) {
          lastX = parseInt(matrix[4]);
          lastY = parseInt(matrix[5]);
        } else {
          lastX = parseInt(matrix[12]);
          lastY = parseInt(matrix[13]);
        }
      }

      if (!e.targetTouches) {
        this.setState({
          startX: e.pageX - lastX,
          startY: e.pageY - lastY
        });
      } else if (e.targetTouches.length === 1) {
        this.setState({
          startX: e.targetTouches[0].pageX - lastX,
          startY: e.targetTouches[0].pageY - lastY
        });
      } else if (e.targetTouches.length > 1) {
        return;
      }
    }
  }, {
    key: "updateChartScale",
    value: function updateChartScale(newScale) {
      var transform = this.state.transform;
      var _this$props = this.props,
          zoomoutLimit = _this$props.zoomoutLimit,
          zoominLimit = _this$props.zoominLimit;
      var matrix = [];
      var targetScale = 1;

      if (transform === "") {
        this.setState({
          transform: "matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)"
        });
      } else {
        matrix = transform.split(",");

        if (transform.indexOf("3d") === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);

          if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
            matrix[0] = "matrix(" + targetScale;
            matrix[3] = targetScale;
            this.setState({
              transform: matrix.join(",")
            });
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);

          if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
            matrix[0] = "matrix3d(" + targetScale;
            matrix[5] = targetScale;
            this.setState({
              transform: matrix.join(",")
            });
          }
        }
      }
    }
  }, {
    key: "zoomHandler",
    value: function zoomHandler(e) {
      var newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
      this.updateChartScale(newScale);
    }
  }, {
    key: "exportPDF",
    value: function exportPDF(canvas, exportFilename) {
      var canvasWidth = Math.floor(canvas.width);
      var canvasHeight = Math.floor(canvas.height);
      var doc = canvasWidth > canvasHeight ? new _jspdf["default"]({
        orientation: "landscape",
        unit: "px",
        format: [canvasWidth, canvasHeight]
      }) : new _jspdf["default"]({
        orientation: "portrait",
        unit: "px",
        format: [canvasHeight, canvasWidth]
      });
      doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
      doc.save(exportFilename + ".pdf");
    }
  }, {
    key: "exportPNG",
    value: function exportPNG(canvas, exportFilename) {
      var isWebkit = ("WebkitAppearance" in document.documentElement.style);
      var isFf = !!window.sidebar;
      var isEdge = navigator.appName === "Microsoft Internet Explorer" || navigator.appName === "Netscape" && navigator.appVersion.indexOf("Edge") > -1;

      if (!isWebkit && !isFf || isEdge) {
        window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
      } else {
        this.setState({
          dataURL: canvas.toDataURL(),
          download: exportFilename + ".png"
        });
        this.downloadButton.click();
      }
    }
  }, {
    key: "exportTo",
    value: // async changeHierarchy (draggedItemData,dropTargetId) {
    //   const dsDigger = new JSONDigger(this.props.datasource,"id","children");
    //   await dsDigger.removeNode(draggedItemData.id);
    //   await dsDigger.addChildren(dropTargetId,draggedItemData);
    //   this.setState({ ds: { ...dsDigger.ds } });
    // };
    function exportTo(exportFilename, exportFileextension) {
      var _this3 = this;

      exportFilename = exportFilename || "OrgChart";
      exportFileextension = exportFileextension || "png";
      this.setState({
        exporting: true
      });
      var container = this.container;
      var chart = this.chart;
      var originalScrollLeft = container.scrollLeft;
      container.scrollLeft = 0;
      var originalScrollTop = container.scrollTop;
      container.scrollTop = 0;
      (0, _html2canvas["default"])(chart, {
        width: chart.clientWidth,
        height: chart.clientHeight,
        onclone: function onclone(clonedDoc) {
          clonedDoc.querySelector(".orgchart").style.background = "none";
          clonedDoc.querySelector(".orgchart").style.transform = "";
        }
      }).then(function (canvas) {
        if (exportFileextension.toLowerCase() === "pdf") {
          _this3.exportPDF(canvas, exportFilename);
        } else {
          _this3.exportPNG(canvas, exportFilename);
        }

        _this3.setState({
          exporting: false
        });

        container.scrollLeft = originalScrollLeft;
        container.scrollTop = originalScrollTop;
      }, function () {
        _this3.setState({
          exporting: false
        });

        container.scrollLeft = originalScrollLeft;
        container.scrollTop = originalScrollTop;
      });
    }
  }, {
    key: "expandAllNodes",
    value: function expandAllNodes() {
      this.chart.querySelectorAll(".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed").forEach(function (el) {
        el.classList.remove("hidden", "isSiblingsCollapsed", "isAncestorsCollapsed");
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          containerClass = _this$props2.containerClass,
          zoom = _this$props2.zoom,
          pan = _this$props2.pan,
          chartClass = _this$props2.chartClass,
          NodeTemplate = _this$props2.NodeTemplate,
          draggable = _this$props2.draggable,
          collapsible = _this$props2.collapsible,
          multipleSelect = _this$props2.multipleSelect,
          onClickNode = _this$props2.onClickNode,
          datasource = _this$props2.datasource;
      var _this$state2 = this.state,
          panning = _this$state2.panning,
          transform = _this$state2.transform,
          cursor = _this$state2.cursor,
          dataURL = _this$state2.dataURL,
          download = _this$state2.download,
          exporting = _this$state2.exporting;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(c) {
          return _this4.container = c;
        },
        className: "orgchart-container " + containerClass,
        onWheel: zoom ? this.zoomHandler : undefined,
        onMouseUp: pan && panning ? this.panEndHandler : undefined
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(c) {
          return _this4.chart = c;
        },
        className: "orgchart " + chartClass,
        style: {
          transform: transform,
          cursor: cursor
        },
        onClick: this.clickChartHandler,
        onMouseDown: pan ? this.panStartHandler : undefined,
        onMouseMove: pan && panning ? this.panHandler : undefined
      }, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement(_ChartNode["default"], {
        datasource: this.attachRel(datasource, "00"),
        NodeTemplate: NodeTemplate,
        draggable: draggable,
        collapsible: collapsible,
        multipleSelect: multipleSelect // changeHierarchy={this.changeHierarchy}
        ,
        onClickNode: onClickNode
      }))), /*#__PURE__*/_react["default"].createElement("a", {
        className: "oc-download-btn hidden",
        ref: function ref(c) {
          _this4.downloadButton = c;
        },
        href: dataURL,
        download: download
      }, "\xA0"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "oc-mask ".concat(exporting ? "" : "hidden")
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "oci oci-spinner spinner"
      })));
    }
  }]);

  return ChartContainer;
}(_react.PureComponent);

exports["default"] = ChartContainer;

_defineProperty(ChartContainer, "propTypes", {
  datasource: _react.PropTypes.object.isRequired,
  pan: _react.PropTypes.bool,
  zoom: _react.PropTypes.bool,
  zoomoutLimit: _react.PropTypes.number,
  zoominLimit: _react.PropTypes.number,
  containerClass: _react.PropTypes.string,
  chartClass: _react.PropTypes.string,
  NodeTemplate: _react.PropTypes.func,
  draggable: _react.PropTypes.bool,
  collapsible: _react.PropTypes.bool,
  multipleSelect: _react.PropTypes.bool,
  onClickNode: _react.PropTypes.func,
  onClickChart: _react.PropTypes.func
});

_defineProperty(ChartContainer, "defaultProps", {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: "",
  draggable: false,
  collapsible: true,
  multipleSelect: false
});