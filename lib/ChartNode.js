"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactAutobind = _interopRequireDefault(require("react-autobind"));

var _react = _interopRequireWildcard(require("react"));

var _service = require("./service");

require("./ChartNode.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var ChartNode = /*#__PURE__*/function (_PureComponent) {
  _inherits(ChartNode, _PureComponent);

  var _super = _createSuper(ChartNode);

  function ChartNode(props) {
    var _this;

    _classCallCheck(this, ChartNode);

    _this = _super.call(this, props);
    (0, _reactAutobind["default"])(_assertThisInitialized(_this));
    _this.state = {
      isChildrenCollapsed: false,
      topEdgeExpanded: undefined,
      rightEdgeExpanded: undefined,
      bottomEdgeExpanded: undefined,
      leftEdgeExpanded: undefined,
      allowedDrop: false,
      selected: false
    };
    return _this;
  } // componentDidMount () {
  //   this.init(this.props)
  // }
  // //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  // componentWillReceiveProps (nextProps) {
  //   // if (this.props.multipleSelect !== nextProps.multipleSelect ||
  //   //   this.props.datasource !== nextProps.datasource) {
  //   //   this.init(nextProps);
  //   // }
  // }


  _createClass(ChartNode, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.subs1.unsubscribe();
      this.subs2.unsubscribe();
    }
  }, {
    key: "init",
    value: function init(props) {
      var _this2 = this;

      this.subs1 = _service.dragNodeService.getDragInfo().subscribe(function (draggedInfo) {
        if (draggedInfo) {
          var allowedDrop = !document.querySelector("#" + draggedInfo.draggedNodeId).closest("li").querySelector("#" + _this2.node.id) ? true : false;

          _this2.setState({
            allowedDrop: allowedDrop
          });
        } else {
          _this2.setState({
            allowedDrop: false
          });
        }
      });
      var multipleSelect = props.multipleSelect,
          datasource = props.datasource;
      this.subs2 = _service.selectNodeService.getSelectedNodeInfo().subscribe(function (selectedNodeInfo) {
        if (selectedNodeInfo) {
          if (multipleSelect) {
            if (selectedNodeInfo.selectedNodeId === datasource.id) {
              _this2.setState({
                selected: true
              });
            }
          } else {
            _this2.setState({
              selected: selectedNodeInfo.selectedNodeId === datasource.id
            });
          }
        } else {
          _this2.setState({
            selected: false
          });
        }
      });
    }
  }, {
    key: "addArrows",
    value: function addArrows(e) {
      var node = e.target.closest("li");
      var parent = node.parentNode.closest("li");
      var isAncestorsCollapsed = node && parent ? parent.firstChild.classList.contains("hidden") : undefined;
      var isSiblingsCollapsed = Array.from(node.parentNode.children).some(function (item) {
        return item.classList.contains("hidden");
      });
      this.setState({
        topEdgeExpanded: !isAncestorsCollapsed,
        rightEdgeExpanded: !isSiblingsCollapsed,
        leftEdgeExpanded: !isSiblingsCollapsed,
        bottomEdgeExpanded: !this.state.isAncestorsCollapsed
      });
    }
  }, {
    key: "removeArrows",
    value: function removeArrows() {
      this.setState({
        topEdgeExpanded: undefined,
        rightEdgeExpanded: undefined,
        leftEdgeExpanded: undefined,
        bottomEdgeExpanded: undefined
      });
    }
  }, {
    key: "toggleAncestors",
    value: function toggleAncestors(actionNode) {
      var node = actionNode.parentNode.closest("li");
      if (!node) return;
      var isAncestorsCollapsed = node.firstChild.classList.contains("hidden");

      if (isAncestorsCollapsed) {
        // 向上展开，只展开一级
        actionNode.classList.remove("isAncestorsCollapsed");
        node.firstChild.classList.remove("hidden");
      } else {
        var _actionNode$classList;

        // 向下折叠，则折叠所有祖先节点以及祖先节点的兄弟节点
        var isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(function (item) {
          return item.classList.contains("hidden");
        });

        if (!isSiblingsCollapsed) {
          this.toggleSiblings(actionNode);
        }

        (_actionNode$classList = actionNode.classList).add.apply(_actionNode$classList, _toConsumableArray(("isAncestorsCollapsed" + (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")).split(" ")));

        node.firstChild.classList.add("hidden"); // 如果还有展开的祖先节点，那继续折叠关闭之

        if (node.parentNode.closest("li") && !node.parentNode.closest("li").firstChild.classList.contains("hidden")) {
          this.toggleAncestors(node);
        }
      }
    }
  }, {
    key: "topEdgeClickHandler",
    value: function topEdgeClickHandler(e) {
      e.stopPropagation();
      this.setState({
        topEdgeExpanded: !this.state.topEdgeExpanded
      });
      this.toggleAncestors(e.target.closest("li"));
    }
  }, {
    key: "bottomEdgeClickHandler",
    value: function bottomEdgeClickHandler(e) {
      var _this$state = this.state,
          isChildrenCollapsed = _this$state.isChildrenCollapsed,
          bottomEdgeExpanded = _this$state.bottomEdgeExpanded;
      e.stopPropagation();
      this.setState({
        isChildrenCollapsed: !isChildrenCollapsed,
        bottomEdgeExpanded: !bottomEdgeExpanded
      });
    }
  }, {
    key: "toggleSiblings",
    value: function toggleSiblings(actionNode) {
      var node = actionNode.previousSibling;
      var isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(function (item) {
        return item.classList.contains("hidden");
      });
      actionNode.classList.toggle("isSiblingsCollapsed", !isSiblingsCollapsed); // 先处理同级的兄弟节点

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
      } // 在展开兄弟节点的同时，还要展开父节点


      var isAncestorsCollapsed = actionNode.parentNode.closest("li").firstChild.classList.contains("hidden");

      if (isAncestorsCollapsed) {
        this.toggleAncestors(actionNode);
      }
    }
  }, {
    key: "hEdgeClickHandler",
    value: function hEdgeClickHandler(e) {
      e.stopPropagation();
      var _this$state2 = this.state,
          leftEdgeExpanded = _this$state2.leftEdgeExpanded,
          rightEdgeExpanded = _this$state2.rightEdgeExpanded;
      this.setState({
        leftEdgeExpanded: !leftEdgeExpanded,
        rightEdgeExpanded: !rightEdgeExpanded
      });
      this.toggleSiblings(e.target.closest("li"));
    }
  }, {
    key: "filterAllowedDropNodes",
    value: function filterAllowedDropNodes(id) {
      _service.dragNodeService.sendDragInfo(id);
    }
  }, {
    key: "clickNodeHandler",
    value: function clickNodeHandler(event) {
      var _this$props = this.props,
          onClickNode = _this$props.onClickNode,
          datasource = _this$props.datasource;

      if (onClickNode) {
        onClickNode(datasource);
      }

      _service.selectNodeService.sendSelectedNodeInfo(datasource.id);
    }
  }, {
    key: "dragstartHandler",
    value: function dragstartHandler(event) {
      var copyDS = _objectSpread({}, this.props.datasource);

      delete copyDS.relationship;
      event.dataTransfer.setData("text/plain", JSON.stringify(copyDS)); // highlight all potential drop targets

      this.filterAllowedDropNodes(this.node.id);
    }
  }, {
    key: "dragoverHandler",
    value: function dragoverHandler(event) {
      // prevent default to allow drop
      event.preventDefault();
    }
  }, {
    key: "dragendHandler",
    value: function dragendHandler() {
      // reset background of all potential drop targets
      _service.dragNodeService.clearDragInfo();
    }
  }, {
    key: "dropHandler",
    value: function dropHandler(event) {
      if (!event.currentTarget.classList.contains("allowedDrop")) {
        return;
      }

      _service.dragNodeService.clearDragInfo();

      this.props.changeHierarchy(JSON.parse(event.dataTransfer.getData("text/plain")), event.currentTarget.id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          datasource = _this$props2.datasource,
          draggable = _this$props2.draggable,
          NodeTemplate = _this$props2.NodeTemplate,
          collapsible = _this$props2.collapsible,
          multipleSelect = _this$props2.multipleSelect,
          changeHierarchy = _this$props2.changeHierarchy,
          onClickNode = _this$props2.onClickNode;
      var _this$state3 = this.state,
          topEdgeExpanded = _this$state3.topEdgeExpanded,
          rightEdgeExpanded = _this$state3.rightEdgeExpanded,
          leftEdgeExpanded = _this$state3.leftEdgeExpanded,
          bottomEdgeExpanded = _this$state3.bottomEdgeExpanded,
          isChildrenCollapsed = _this$state3.isChildrenCollapsed,
          allowedDrop = _this$state3.allowedDrop,
          selected = _this$state3.selected;
      var nodeClass = ["oc-node", isChildrenCollapsed ? "isChildrenCollapsed" : "", allowedDrop ? "allowedDrop" : "", selected ? "selected" : ""].filter(function (item) {
        return item;
      }).join(" ");
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: "oc-hierarchy"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(c) {
          return _this3.node = c;
        },
        id: datasource.id,
        className: nodeClass,
        draggable: draggable ? "true" : undefined,
        onClick: this.clickNodeHandler,
        onDragStart: this.dragstartHandler,
        onDragOver: this.dragoverHandler,
        onDragEnd: this.dragendHandler,
        onDrop: this.dropHandler,
        onMouseEnter: this.addArrows,
        onMouseLeave: this.removeArrows
      }, NodeTemplate ? /*#__PURE__*/_react["default"].createElement(NodeTemplate, {
        nodeData: datasource
      }) : /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "oc-heading"
      }, datasource.relationship && datasource.relationship.charAt(2) === "1" && /*#__PURE__*/_react["default"].createElement("i", {
        className: "oci oci-leader oc-symbol"
      }), datasource.name), /*#__PURE__*/_react["default"].createElement("div", {
        className: "oc-content"
      }, datasource.title)), collapsible && datasource.relationship && datasource.relationship.charAt(0) === "1" && /*#__PURE__*/_react["default"].createElement("i", {
        className: "oc-edge verticalEdge topEdge oci ".concat(topEdgeExpanded === undefined ? "" : topEdgeExpanded ? "oci-chevron-down" : "oci-chevron-up"),
        onClick: this.topEdgeClickHandler
      }), collapsible && datasource.relationship && datasource.relationship.charAt(1) === "1" && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("i", {
        className: "oc-edge horizontalEdge rightEdge oci ".concat(rightEdgeExpanded === undefined ? "" : rightEdgeExpanded ? "oci-chevron-left" : "oci-chevron-right"),
        onClick: this.hEdgeClickHandler
      }), /*#__PURE__*/_react["default"].createElement("i", {
        className: "oc-edge horizontalEdge leftEdge oci ".concat(leftEdgeExpanded === undefined ? "" : leftEdgeExpanded ? "oci-chevron-right" : "oci-chevron-left"),
        onClick: this.hEdgeClickHandler
      })), collapsible && datasource.relationship && datasource.relationship.charAt(2) === "1" && /*#__PURE__*/_react["default"].createElement("i", {
        className: "oc-edge verticalEdge bottomEdge oci ".concat(bottomEdgeExpanded === undefined ? "" : bottomEdgeExpanded ? "oci-chevron-up" : "oci-chevron-down"),
        onClick: this.bottomEdgeClickHandler
      })), datasource.children && datasource.children.length > 0 && /*#__PURE__*/_react["default"].createElement("ul", {
        className: isChildrenCollapsed ? "hidden" : ""
      }, datasource.children.map(function (nodeItem) {
        return /*#__PURE__*/_react["default"].createElement(ChartNode, {
          datasource: nodeItem,
          NodeTemplate: NodeTemplate,
          id: nodeItem.id,
          key: nodeItem.id,
          draggable: draggable,
          collapsible: collapsible,
          multipleSelect: multipleSelect,
          changeHierarchy: changeHierarchy,
          onClickNode: onClickNode
        });
      })));
    }
  }]);

  return ChartNode;
}(_react.PureComponent);

exports["default"] = ChartNode;

_defineProperty(ChartNode, "propTypes", {
  datasource: _react.PropTypes.object,
  NodeTemplate: _react.PropTypes.func,
  draggable: _react.PropTypes.bool,
  collapsible: _react.PropTypes.bool,
  multipleSelect: _react.PropTypes.bool,
  changeHierarchy: _react.PropTypes.func,
  onClickNode: _react.PropTypes.func
});

_defineProperty(ChartNode, "defaultProps", {
  draggable: false,
  collapsible: true,
  multipleSelect: false
});

;