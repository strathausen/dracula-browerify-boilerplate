(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Dracula = require('graphdracula');

var Graph = Dracula.Graph;

var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;

var graph = new Graph();

graph.addEdge('Banana', 'Apple');
graph.addEdge('Apple', 'Kiwi');
graph.addEdge('Apple', 'Dragonfruit');
graph.addEdge('Dragonfruit', 'Banana');
graph.addEdge('Kiwi', 'Banana');

var layout = new Layout(graph)
var renderer = new Renderer('#paper', graph, 400, 300);
renderer.draw()


},{"graphdracula":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Testing for string or number data type
var isId = function isId(x) {
  return !!~['string', 'number'].indexOf(typeof x === 'undefined' ? 'undefined' : _typeof(x));
};
var edges = 'edges'; // Symbol('edges')
var nodes = 'nodes'; // Symbol('nodes')

/**
 * Graph Data Structure
 */

var Dracula = function () {
  function Dracula() {
    _classCallCheck(this, Dracula);

    this[nodes] = {};
    this[edges] = [];
  }

  /**
   * Creator for the new haters :)
   * @returns {Dracula} a new graph instance
   */


  _createClass(Dracula, [{
    key: 'addNode',


    /**
     * Add node if it doesn't exist yet.
     *
     * This method does not update an existing node.
     * If you want to update a node, just update the node object.
     *
     * @param {string|number|object} id or node data
     * @param {object|} nodeData (optional)
     * @returns {Node} the new or existing node
     */
    value: function addNode(id, nodeData) {
      // Node initialisation shorthands
      if (!nodeData) {
        nodeData = isId(id) ? { id: id } : id;
      } else {
        nodeData.id = id;
      }
      if (!nodeData.id) {
        nodeData.id = (0, _uuid2.default)();
        // Don't create a new node if it already exists
      } else if (this[nodes][nodeData.id]) {
        return this[nodes][nodeData.id];
      }
      this[nodes][nodeData.id] = nodeData;
      return nodeData;
    }

    /**
     * @param {string|number|object} source node or ID
     * @param {string|number|object} target node or ID
     * @param {object|} (optional) edge data, e.g. styles
     * @returns {Edge}
     */

  }, {
    key: 'addEdge',
    value: function addEdge(source, target) {
      var edgeData = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var sourceNode = this.addNode(source);
      var targetNode = this.addNode(target);
      edgeData.source = sourceNode;
      edgeData.target = targetNode;
      this[edges].push(edgeData);
      return edgeData;
    }

    /**
     * @param {string|number|Node} node node or ID
     * @return {Node}
     */

  }, {
    key: 'removeNode',
    value: function removeNode(node) {
      var id = isId(node) ? node : node.id;
      node = this[nodes][id];
      // Delete node from index
      delete this[nodes][id];
      // Delete node from all the edges
      this[edges] = this[edges].filter(function (edge) {
        return edge.source !== node && edge.target !== node;
      });
      return node;
    }

    /**
     * Remove an edge by providing either two nodes (or ids) or the edge instance
     * @param {string|number|Node|Edge} node edge, node or ID
     * @param {string|number|Node} node node or ID
     * @return {Edge}
     */

  }, {
    key: 'removeEdge',
    value: function removeEdge(source, target) {
      var found = void 0;
      // Fallback to only one parameter
      if (!target) {
        target = source.target;
        source = source.source;
      }
      // Normalise node IDs
      if (isId(source)) source = { id: source };
      if (isId(target)) target = { id: target };
      // Find and remove edge
      this[edges] = this[edges].filter(function (edge) {
        if (edge.source.id === source.id && edge.target.id === target.id) {
          found = edge;
          return false;
        }
        return true;
      });
      // Return removed edge
      return found;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { nodes: this[nodes], edges: this[edges] };
    }
  }], [{
    key: 'create',
    value: function create() {
      return new Dracula();
    }
  }]);

  return Dracula;
}();

exports.default = Dracula;
},{"uuid":205}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collection = require('lodash/collection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for distributing nodes algorithms
 */
var Layout = function () {
  function Layout(graph) {
    _classCallCheck(this, Layout);

    this.graph = graph;
  }

  _createClass(Layout, [{
    key: 'layout',
    value: function layout() {
      this.initCoords();
      this.layoutPrepare();
      this.layoutCalcBounds();
    }
  }, {
    key: 'initCoords',
    value: function initCoords() {
      (0, _collection.each)(this.graph.nodes, function (node) {
        node.layoutPosX = 0;
        node.layoutPosY = 0;
      });
    }
  }, {
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      throw new Error('not implemented');
    }
  }, {
    key: 'layoutCalcBounds',
    value: function layoutCalcBounds() {
      var minx = Infinity;
      var maxx = -Infinity;
      var miny = Infinity;
      var maxy = -Infinity;

      (0, _collection.each)(this.graph.nodes, function (node) {
        var x = node.layoutPosX;
        var y = node.layoutPosY;

        if (x > maxx) maxx = x;
        if (x < minx) minx = x;
        if (y > maxy) maxy = y;
        if (y < miny) miny = y;
      });

      this.graph.layoutMinX = minx;
      this.graph.layoutMaxX = maxx;
      this.graph.layoutMinY = miny;
      this.graph.layoutMaxY = maxy;
    }
  }]);

  return Layout;
}();

exports.default = Layout;
},{"lodash/collection":146}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * OrderedTree is like Ordered but assumes there is one root
 * This way we can give non random positions to nodes on the Y-axis
 * It assumes the ordered nodes are of a perfect binary tree
 */
var OrderedTree = function (_Layout) {
  _inherits(OrderedTree, _Layout);

  function OrderedTree(graph, order) {
    _classCallCheck(this, OrderedTree);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OrderedTree).call(this, graph));

    _this.order = order;
    _this.layout();
    return _this;
  }

  _createClass(OrderedTree, [{
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      // To reverse the order of rendering, we need to find out the
      // absolute number of levels we have. simple log math applies.
      var numNodes = this.order.length;
      var totalLevels = Math.floor(Math.log(numNodes) / Math.log(2));

      var counter = 1;
      this.order.forEach(function (node) {
        // Rank aka x coordinate
        var rank = Math.floor(Math.log(counter) / Math.log(2));
        // File relative to top
        var file = counter - Math.pow(rank, 2);

        node.layoutPosX = totalLevels - rank;
        node.layoutPosY = file;
        counter++;
      });
    }
  }]);

  return OrderedTree;
}(_layout2.default);

exports.default = OrderedTree;
},{"./layout":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _collection = require('lodash/collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TODO take ratio into account
 * TODO use integers for speed
 */
var Spring = function (_Layout) {
  _inherits(Spring, _Layout);

  function Spring(graph) {
    _classCallCheck(this, Spring);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Spring).call(this, graph));

    _this.iterations = 500;
    _this.maxRepulsiveForceDistance = 6;
    _this.k = 2;
    _this.c = 0.01;
    _this.maxVertexMovement = 0.5;
    _this.layout();
    return _this;
  }

  _createClass(Spring, [{
    key: 'layout',
    value: function layout() {
      this.layoutPrepare();
      for (var i = 0; i < this.iterations; i++) {
        this.layoutIteration();
      }
      this.layoutCalcBounds();
    }
  }, {
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      (0, _collection.each)(this.graph.nodes, function (node) {
        node.layoutPosX = 0;
        node.layoutPosY = 0;
        node.layoutForceX = 0;
        node.layoutForceY = 0;
      });
    }
  }, {
    key: 'layoutIteration',
    value: function layoutIteration() {
      var _this2 = this;

      // Forces on nodes due to node-node repulsions
      var prev = [];
      (0, _collection.each)(this.graph.nodes, function (node1) {
        prev.forEach(function (node2) {
          _this2.layoutRepulsive(node1, node2);
        });
        prev.push(node1);
      });

      // Forces on nodes due to edge attractions
      this.graph.edges.forEach(function (edge) {
        _this2.layoutAttractive(edge);
      });

      // Move by the given force
      (0, _collection.each)(this.graph.nodes, function (node) {
        var xmove = _this2.c * node.layoutForceX;
        var ymove = _this2.c * node.layoutForceY;

        var max = _this2.maxVertexMovement;

        if (xmove > max) xmove = max;
        if (xmove < -max) xmove = -max;
        if (ymove > max) ymove = max;
        if (ymove < -max) ymove = -max;

        node.layoutPosX += xmove;
        node.layoutPosY += ymove;
        node.layoutForceX = 0;
        node.layoutForceY = 0;
      });
    }
  }, {
    key: 'layoutRepulsive',
    value: function layoutRepulsive(node1, node2) {
      if (!node1 || !node2) {
        return;
      }
      var dx = node2.layoutPosX - node1.layoutPosX;
      var dy = node2.layoutPosY - node1.layoutPosY;
      var d2 = dx * dx + dy * dy;
      if (d2 < 0.01) {
        dx = 0.1 * Math.random() + 0.1;
        dy = 0.1 * Math.random() + 0.1;
        d2 = dx * dx + dy * dy;
      }
      var d = Math.sqrt(d2);
      if (d < this.maxRepulsiveForceDistance) {
        var repulsiveForce = this.k * this.k / d;
        node2.layoutForceX += repulsiveForce * dx / d;
        node2.layoutForceY += repulsiveForce * dy / d;
        node1.layoutForceX -= repulsiveForce * dx / d;
        node1.layoutForceY -= repulsiveForce * dy / d;
      }
    }
  }, {
    key: 'layoutAttractive',
    value: function layoutAttractive(edge) {
      var node1 = edge.source;
      var node2 = edge.target;

      var dx = node2.layoutPosX - node1.layoutPosX;
      var dy = node2.layoutPosY - node1.layoutPosY;
      var d2 = dx * dx + dy * dy;
      if (d2 < 0.01) {
        dx = 0.1 * Math.random() + 0.1;
        dy = 0.1 * Math.random() + 0.1;
        d2 = dx * dx + dy * dy;
      }
      var d = Math.sqrt(d2);
      if (d > this.maxRepulsiveForceDistance) {
        d = this.maxRepulsiveForceDistance;
        d2 = d * d;
      }
      var attractiveForce = (d2 - this.k * this.k) / this.k;
      if (!edge.attraction) edge.attraction = 1;
      attractiveForce *= Math.log(edge.attraction) * 0.5 + 1;

      node2.layoutForceX -= attractiveForce * dx / d;
      node2.layoutForceY -= attractiveForce * dy / d;
      node1.layoutForceX += attractiveForce * dx / d;
      node1.layoutForceY += attractiveForce * dy / d;
    }
  }], [{
    key: 'create',
    value: function create() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(this, [null].concat(args)))();
    }
  }]);

  return Spring;
}(_layout2.default);

exports.default = Spring;
},{"./layout":3,"lodash/collection":146}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _collection = require('lodash/collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TournamentTree = function (_Layout) {
  _inherits(TournamentTree, _Layout);

  /**
   * @param {Graph} graph
   * @param {Array[Node]} order
   */
  function TournamentTree(graph, order) {
    _classCallCheck(this, TournamentTree);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TournamentTree).call(this));

    _this.graph = graph;
    _this.order = order;
    _this.layout();
    return _this;
  }

  _createClass(TournamentTree, [{
    key: 'layout',
    value: function layout() {
      this.layoutPrepare();
      this.layoutCalcBounds();
    }
  }, {
    key: 'layoutPrepare',
    value: function layoutPrepare() {
      (0, _collection.each)(this.graph.nodes, function (node) {
        node.layoutPosX = 0;
        node.layoutPosY = 0;
      });

      // To reverse the order of rendering, we need to find out the
      // absolute number of levels we have. simple log math applies.
      var numNodes = this.order.length;
      var totalLevels = Math.floor(Math.log(numNodes) / Math.log(2));

      var counter = 1;
      this.order.forEach(function (node) {
        var depth = Math.floor(Math.log(counter) / Math.log(2));
        var offset = Math.pow(2, totalLevels - depth);
        var final_x = offset + (counter - Math.pow(2, depth)) * Math.pow(2, totalLevels - depth + 1);
        node.layoutPosX = final_x;
        node.layoutPosY = depth;
        counter++;
      });
    }
  }]);

  return TournamentTree;
}(_layout2.default);

exports.default = TournamentTree;
},{"./layout":3,"lodash/collection":146}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raphael = require('raphael');

var _raphael2 = _interopRequireDefault(_raphael);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dragify = function dragify(shape) {
  var r = shape.paper;
  shape.items.forEach(function (item) {
    item.set = shape;
    if (item.type === 'text') {
      return;
    }
    item.node.style.cursor = 'move';
    item.drag(function dragMove(dx, dy, x, y) {
      dx = this.set.ox;
      dy = this.set.oy;
      var bBox = this.set.getBBox();
      var newX = x - dx + (bBox.x + bBox.width / 2);
      var newY = y - dy + (bBox.y + bBox.height / 2);
      var clientX = x - (newX < 20 ? newX - 20 : newX > r.width - 20 ? newX - r.width + 20 : 0);
      var clientY = y - (newY < 20 ? newY - 20 : newY > r.height - 20 ? newY - r.height + 20 : 0);
      this.set.translate(clientX - Math.round(dx), clientY - Math.round(dy));
      shape.connections.forEach(function (connection) {
        connection.draw();
      });

      this.set.ox = clientX;
      this.set.oy = clientY;
    }, function dragEnter(x, y) {
      this.set.ox = x;
      this.set.oy = y;
      this.animate({ 'fill-opacity': 0.2 }, 500);
    }, function dragOut() {
      this.animate({ 'fill-opacity': 0.6 }, 500);
    });
  });
};

var RaphaelRenderer = function (_Renderer) {
  _inherits(RaphaelRenderer, _Renderer);

  function RaphaelRenderer(element, graph, width, height) {
    _classCallCheck(this, RaphaelRenderer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RaphaelRenderer).call(this, element, graph, width, height));

    _this.canvas = (0, _raphael2.default)(_this.element, _this.width, _this.height);
    _this.lineStyle = {
      stroke: '#443399',
      'stroke-width': '2px'
    };
    return _this;
  }

  _createClass(RaphaelRenderer, [{
    key: 'drawNode',
    value: function drawNode(node) {
      var color = _raphael2.default.getColor();
      // TODO update / cache shape
      node.shape = this.canvas.set();
      node.shape.connections = [];
      node.shape.push(this.canvas.ellipse(0, 0, 30, 20).attr({ stroke: color, 'stroke-width': 2, fill: color, 'fill-opacity': 0 })).push(this.canvas.text(0, 30, node.label || node.id)).translate(node.point[0], node.point[1]);
      // .drag(move, dragger, up)
      dragify(node.shape);
    }
  }, {
    key: 'drawEdge',
    value: function drawEdge(edge) {
      if (!edge.shape) {
        edge.shape = this.canvas.connection(edge.source.shape, edge.target.shape);
        // edge.shape.line.attr(this.lineStyle)
        edge.source.shape.connections.push(edge.shape);
        edge.target.shape.connections.push(edge.shape);
      }
    }
  }]);

  return RaphaelRenderer;
}(_renderer2.default);

// <Raphael.fn.connection>

/* coordinates for potential connection coordinates from/to the objects */


exports.default = RaphaelRenderer;
var getConnectionPoints = function getConnectionPoints(obj1, obj2) {

  /* get bounding boxes of target and source */
  var bb1 = obj1.getBBox();
  var bb2 = obj2.getBBox();

  var off1 = 0;
  var off2 = 0;

  return [

  /* NORTH 1 */
  { x: bb1.x + bb1.width / 2, y: bb1.y - off1 },

  /* SOUTH 1 */
  { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + off1 },

  /* WEST */
  { x: bb1.x - off1, y: bb1.y + bb1.height / 2 },

  /* EAST  1 */
  { x: bb1.x + bb1.width + off1, y: bb1.y + bb1.height / 2 },

  /* NORTH 2 */
  { x: bb2.x + bb2.width / 2, y: bb2.y - off2 },

  /* SOUTH 2 */
  { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + off2 },

  /* WEST  2 */
  { x: bb2.x - off2, y: bb2.y + bb2.height / 2 },

  /* EAST  2 */
  { x: bb2.x + bb2.width + off2, y: bb2.y + bb2.height / 2 }];
};

_raphael2.default.fn.connection = function Connection(obj1, obj2, style) {
  var self = this;

  /* create and return new connection */
  var edge = {

    /* eslint-disable complexity */
    draw: function draw() {

      var p = getConnectionPoints(obj1, obj2);

      /* distances between objects and according coordinates connection */
      var d = {};
      var dis = [];
      var dx = void 0;
      var dy = void 0;

      /*
       * find out the best connection coordinates by trying all possible ways
       */
      /* loop the first object's connection coordinates */
      for (var i = 0; i < 4; i++) {

        /* loop the second object's connection coordinates */
        for (var j = 4; j < 8; j++) {
          dx = Math.abs(p[i].x - p[j].x);
          dy = Math.abs(p[i].y - p[j].y);
          if (i === j - 4 || (i !== 3 && j !== 6 || p[i].x < p[j].x) && (i !== 2 && j !== 7 || p[i].x > p[j].x) && (i !== 0 && j !== 5 || p[i].y > p[j].y) && (i !== 1 && j !== 4 || p[i].y < p[j].y)) {
            dis.push(dx + dy);
            d[dis[dis.length - 1].toFixed(3)] = [i, j];
          }
        }
      }
      var res = dis.length === 0 ? [0, 4] : d[Math.min.apply(Math, dis).toFixed(3)];

      /* bezier path */
      var x1 = p[res[0]].x;
      var y1 = p[res[0]].y;
      var x4 = p[res[1]].x;
      var y4 = p[res[1]].y;
      dx = Math.max(Math.abs(x1 - x4) / 2, 10);
      dy = Math.max(Math.abs(y1 - y4) / 2, 10);
      var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3);
      var y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3);
      var x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3);
      var y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);

      /* assemble path and arrow */
      var path = ['M' + x1.toFixed(3), y1.toFixed(3), 'C' + x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(',');

      /* arrow */
      if (style && style.directed) {
        (function () {
          // magnitude, length of the last path vector
          var mag = Math.sqrt((y4 - y3) * (y4 - y3) + (x4 - x3) * (x4 - x3));
          // vector normalisation to specified length
          var norm = function norm(x, l) {
            return -x * (l || 5) / mag;
          };
          // calculate array coordinates (two lines orthogonal to the path vector)
          var arr = [{
            x: (norm(x4 - x3) + norm(y4 - y3) + x4).toFixed(3),
            y: (norm(y4 - y3) + norm(x4 - x3) + y4).toFixed(3)
          }, {
            x: (norm(x4 - x3) - norm(y4 - y3) + x4).toFixed(3),
            y: (norm(y4 - y3) - norm(x4 - x3) + y4).toFixed(3)
          }];
          path = path + ',M' + arr[0].x + ',' + arr[0].y + ',L' + x4 + ',' + y4 + ',L' + arr[1].x + ',' + arr[1].y;
        })();
      }

      /* function to be used for moving existent path(s), e.g. animate() or attr() */
      var move = 'attr';

      /* applying path(s) */
      if (edge.fg) {
        edge.fg[move]({ path: path });
      } else {
        edge.fg = self.path(path).attr({ stroke: style && style.stroke || '#000', fill: 'none' }).toBack();
      }
      if (edge.bg) {
        edge.bg[move]({ path: path });
      } else if (style && style.fill && style.fill.split) {
        edge.bg = self.path(path).attr({
          stroke: style.fill.split('|')[0],
          fill: 'none',
          'stroke-width': style.fill.split('|')[1] || 3
        }).toBack();
      }

      /* setting label */
      if (style && style.label) {
        if (edge.label) {
          edge.label.attr({ x: (x1 + x4) / 2, y: (y1 + y4) / 2 });
        } else {
          edge.label = self.text((x1 + x4) / 2, (y1 + y4) / 2, style.label).attr({
            fill: '#000',
            'font-size': style['font-size'] || '10px',
            'fill-opacity': '0.6'
          });
        }
      }

      if (style && style.label && style['label-style'] && edge.label) {
        edge.label.attr(style['label-style']);
      }

      if (style && style.callback) {
        style.callback(edge);
      }
    }
  };
  edge.draw();
  return edge;
};

// </Raphael.fn.connection>
},{"./renderer":8,"raphael":203}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collection = require('lodash/collection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for rendering nodes
 *
 * Can transform coordinates to fit onto the canvas
 */
var Renderer = function () {

  /**
   * @param {DomElement|String} element target dom element or querySelector
   * @param {Graph} graph Dracula Graph instance
   * @param {number} width (optional) width of the canvas, default 400
   * @param {number} height (optional) height of the canvas, default 300
   */
  function Renderer(element, graph, width, height) {
    _classCallCheck(this, Renderer);

    this.graph = graph;
    // Convert a query into a dom element
    if (typeof element === 'string') {
      var selector = typeof $ !== 'undefined' ? $ : function (q) {
        return document.querySelector(q);
      };
      element = selector(element);
    }
    this.element = element;
    this.width = width || 400;
    this.height = height || 300;
    this.radius = 40;
  }

  /**
   * Scale the nodes within the canvas dimensions
   * Keep a distance to the canvas edges of half a node radius
   */


  _createClass(Renderer, [{
    key: 'draw',
    value: function draw() {
      var _this = this;

      this.factorX = (this.width - 2 * this.radius) / (this.graph.layoutMaxX - this.graph.layoutMinX);

      this.factorY = (this.height - 2 * this.radius) / (this.graph.layoutMaxY - this.graph.layoutMinY);

      (0, _collection.each)(this.graph.nodes, function (node) {
        node.point = _this.translate([node.layoutPosX, node.layoutPosY]);
        _this.drawNode(node);
      });
      (0, _collection.each)(this.graph.edges, function (edge) {
        _this.drawEdge(edge);
      });
    }
  }, {
    key: 'translate',
    value: function translate(point) {
      return [Math.round((point[0] - this.graph.layoutMinX) * this.factorX + this.radius), Math.round((point[1] - this.graph.layoutMinY) * this.factorY + this.radius)];
    }
  }, {
    key: 'drawNode',
    value: function drawNode(node) {
      // eslint-disable-line no-unused-vars
      throw new Error('not implemented');
    }
  }, {
    key: 'drawEdge',
    value: function drawEdge(edge) {
      // eslint-disable-line no-unused-vars
      throw new Error('not implemented');
    }
  }], [{
    key: 'render',
    value: function render() {
      for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
        a[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(Renderer, [null].concat(a)))();
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;
},{"lodash/collection":146}],9:[function(require,module,exports){
// Core
var dracula = require('./dist/dracula').default

// Layouts
var spring = require('./dist/layout/spring').default
var orderedTree = require('./dist/layout/ordered_tree').default
var tournamentTree = require('./dist/layout/tournament_tree').default

// Renderers
var raphael = require('./dist/renderer/raphael').default

module.exports.Graph = dracula

module.exports.Layout = {
  OrderedTree: orderedTree,
  Spring: spring,
  TournamentTree: tournamentTree
}

module.exports.Renderer = {
  Raphael: raphael,
}

},{"./dist/dracula":2,"./dist/layout/ordered_tree":4,"./dist/layout/spring":5,"./dist/layout/tournament_tree":6,"./dist/renderer/raphael":7}],10:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":93,"./_root":130}],11:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":98,"./_hashDelete":99,"./_hashGet":100,"./_hashHas":101,"./_hashSet":102}],12:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":113,"./_listCacheDelete":114,"./_listCacheGet":115,"./_listCacheHas":116,"./_listCacheSet":117}],13:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":93,"./_root":130}],14:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":118,"./_mapCacheDelete":119,"./_mapCacheGet":120,"./_mapCacheHas":121,"./_mapCacheSet":122}],15:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":93,"./_root":130}],16:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":93,"./_root":130}],17:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":14,"./_setCacheAdd":131,"./_setCacheHas":132}],18:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":12,"./_stackClear":134,"./_stackDelete":135,"./_stackGet":136,"./_stackHas":137,"./_stackSet":138}],19:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":130}],20:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":130}],21:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":93,"./_root":130}],22:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],23:[function(require,module,exports){
/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}

module.exports = arrayAggregator;

},{}],24:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],25:[function(require,module,exports){
/**
 * A specialized version of `_.forEachRight` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEachRight(array, iteratee) {
  var length = array ? array.length : 0;

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEachRight;

},{}],26:[function(require,module,exports){
/**
 * A specialized version of `_.every` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */
function arrayEvery(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

module.exports = arrayEvery;

},{}],27:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array ? array.length : 0,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],28:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":74,"./_isIndex":105,"./isArguments":168,"./isArray":169}],29:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],30:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],31:[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],32:[function(require,module,exports){
/**
 * A specialized version of `_.reduceRight` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the last element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduceRight(array, iteratee, accumulator, initAccum) {
  var length = array ? array.length : 0;
  if (initAccum && length) {
    accumulator = array[--length];
  }
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length, array);
  }
  return accumulator;
}

module.exports = arrayReduceRight;

},{}],33:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],34:[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = baseProperty('length');

module.exports = asciiSize;

},{"./_baseProperty":66}],35:[function(require,module,exports){
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

},{}],36:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":150}],37:[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach(collection, function(value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

module.exports = baseAggregator;

},{"./_baseEach":39}],38:[function(require,module,exports){
/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

module.exports = baseClamp;

},{}],39:[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":46,"./_createBaseEach":84}],40:[function(require,module,exports){
var baseForOwnRight = require('./_baseForOwnRight'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEachRight` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEachRight = createBaseEach(baseForOwnRight, true);

module.exports = baseEachRight;

},{"./_baseForOwnRight":47,"./_createBaseEach":84}],41:[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;
  baseEach(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

module.exports = baseEvery;

},{"./_baseEach":39}],42:[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./_baseEach":39}],43:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],44:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":30,"./_isFlattenable":103}],45:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":85}],46:[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":45,"./keys":180}],47:[function(require,module,exports){
var baseForRight = require('./_baseForRight'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys);
}

module.exports = baseForOwnRight;

},{"./_baseForRight":48,"./keys":180}],48:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * This function is like `baseFor` except that it iterates over properties
 * in the opposite order.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseForRight = createBaseFor(true);

module.exports = baseForRight;

},{"./_createBaseFor":85}],49:[function(require,module,exports){
var castPath = require('./_castPath'),
    isKey = require('./_isKey'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":78,"./_isKey":107,"./_toKey":142}],50:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

module.exports = baseGetTag;

},{}],51:[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

},{}],52:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":43,"./_baseIsNaN":57}],53:[function(require,module,exports){
var apply = require('./_apply'),
    castPath = require('./_castPath'),
    isKey = require('./_isKey'),
    last = require('./last'),
    parent = require('./_parent'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.invoke` without support for individual
 * method arguments.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} args The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 */
function baseInvoke(object, path, args) {
  if (!isKey(path, object)) {
    path = castPath(path);
    object = parent(object, path);
    path = last(path);
  }
  var func = object == null ? object : object[toKey(path)];
  return func == null ? undefined : apply(func, object, args);
}

module.exports = baseInvoke;

},{"./_apply":22,"./_castPath":78,"./_isKey":107,"./_parent":129,"./_toKey":142,"./last":181}],54:[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObject = require('./isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":55,"./isObject":174,"./isObjectLike":175}],55:[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isHostObject = require('./_isHostObject'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":18,"./_equalArrays":87,"./_equalByTag":88,"./_equalObjects":89,"./_getTag":94,"./_isHostObject":104,"./isArray":169,"./isTypedArray":178}],56:[function(require,module,exports){
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":18,"./_baseIsEqual":54}],57:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],58:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('./_isHostObject'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isHostObject":104,"./_isMasked":109,"./_toSource":143,"./isFunction":172,"./isObject":174}],59:[function(require,module,exports){
var isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = baseIsTypedArray;

},{"./isLength":173,"./isObjectLike":175}],60:[function(require,module,exports){
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":63,"./_baseMatchesProperty":64,"./identity":165,"./isArray":169,"./property":187}],61:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":110,"./_nativeKeys":126}],62:[function(require,module,exports){
var baseEach = require('./_baseEach'),
    isArrayLike = require('./isArrayLike');

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;

},{"./_baseEach":39,"./isArrayLike":170}],63:[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData'),
    matchesStrictComparable = require('./_matchesStrictComparable');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":56,"./_getMatchData":92,"./_matchesStrictComparable":124}],64:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn'),
    isKey = require('./_isKey'),
    isStrictComparable = require('./_isStrictComparable'),
    matchesStrictComparable = require('./_matchesStrictComparable'),
    toKey = require('./_toKey');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":54,"./_isKey":107,"./_isStrictComparable":111,"./_matchesStrictComparable":124,"./_toKey":142,"./get":162,"./hasIn":164}],65:[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    baseMap = require('./_baseMap'),
    baseSortBy = require('./_baseSortBy'),
    baseUnary = require('./_baseUnary'),
    compareMultiple = require('./_compareMultiple'),
    identity = require('./identity');

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;

},{"./_arrayMap":29,"./_baseIteratee":60,"./_baseMap":62,"./_baseSortBy":73,"./_baseUnary":76,"./_compareMultiple":80,"./identity":165}],66:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],67:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":49}],68:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(lower, upper) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}

module.exports = baseRandom;

},{}],69:[function(require,module,exports){
/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

module.exports = baseReduce;

},{}],70:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = baseRest;

},{"./_apply":22}],71:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],72:[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

module.exports = baseSome;

},{"./_baseEach":39}],73:[function(require,module,exports){
/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;

},{}],74:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],75:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":19,"./isSymbol":177}],76:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],77:[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;

},{"./_arrayMap":29}],78:[function(require,module,exports){
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = castPath;

},{"./_stringToPath":141,"./isArray":169}],79:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;

},{"./isSymbol":177}],80:[function(require,module,exports){
var compareAscending = require('./_compareAscending');

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;

},{"./_compareAscending":79}],81:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],82:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":130}],83:[function(require,module,exports){
var arrayAggregator = require('./_arrayAggregator'),
    baseAggregator = require('./_baseAggregator'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {};

    return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
  };
}

module.exports = createAggregator;

},{"./_arrayAggregator":23,"./_baseAggregator":37,"./_baseIteratee":60,"./isArray":169}],84:[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":170}],85:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],86:[function(require,module,exports){
var baseIteratee = require('./_baseIteratee'),
    isArrayLike = require('./isArrayLike'),
    keys = require('./keys');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;

},{"./_baseIteratee":60,"./isArrayLike":170,"./keys":180}],87:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

},{"./_SetCache":17,"./_arraySome":33}],88:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":19,"./_Uint8Array":20,"./_equalArrays":87,"./_mapToArray":123,"./_setToArray":133,"./eq":150}],89:[function(require,module,exports){
var keys = require('./keys');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

},{"./keys":180}],90:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],91:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":108}],92:[function(require,module,exports){
var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":111,"./keys":180}],93:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":58,"./_getValue":95}],94:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":10,"./_Map":13,"./_Promise":15,"./_Set":16,"./_WeakMap":21,"./_baseGetTag":50,"./_toSource":143}],95:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],96:[function(require,module,exports){
var castPath = require('./_castPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isKey = require('./_isKey'),
    isLength = require('./isLength'),
    toKey = require('./_toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;

},{"./_castPath":78,"./_isIndex":105,"./_isKey":107,"./_toKey":142,"./isArguments":168,"./isArray":169,"./isLength":173}],97:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

},{}],98:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

module.exports = hashClear;

},{"./_nativeCreate":125}],99:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

module.exports = hashDelete;

},{}],100:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":125}],101:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":125}],102:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":125}],103:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

},{"./_Symbol":19,"./isArguments":168,"./isArray":169}],104:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],105:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],106:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":105,"./eq":150,"./isArrayLike":170,"./isObject":174}],107:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":169,"./isSymbol":177}],108:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],109:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":82}],110:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],111:[function(require,module,exports){
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":174}],112:[function(require,module,exports){
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;

},{}],113:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

module.exports = listCacheClear;

},{}],114:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":36}],115:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":36}],116:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":36}],117:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":36}],118:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":11,"./_ListCache":12,"./_Map":13}],119:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

module.exports = mapCacheDelete;

},{"./_getMapData":91}],120:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":91}],121:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":91}],122:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":91}],123:[function(require,module,exports){
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],124:[function(require,module,exports){
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;

},{}],125:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":93}],126:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":128}],127:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":90}],128:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],129:[function(require,module,exports){
var baseGet = require('./_baseGet'),
    baseSlice = require('./_baseSlice');

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;

},{"./_baseGet":49,"./_baseSlice":71}],130:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":90}],131:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],132:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],133:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],134:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

module.exports = stackClear;

},{"./_ListCache":12}],135:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

module.exports = stackDelete;

},{}],136:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],137:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],138:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

module.exports = stackSet;

},{"./_ListCache":12,"./_Map":13,"./_MapCache":14}],139:[function(require,module,exports){
var asciiSize = require('./_asciiSize'),
    hasUnicode = require('./_hasUnicode'),
    unicodeSize = require('./_unicodeSize');

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

module.exports = stringSize;

},{"./_asciiSize":34,"./_hasUnicode":97,"./_unicodeSize":144}],140:[function(require,module,exports){
var asciiToArray = require('./_asciiToArray'),
    hasUnicode = require('./_hasUnicode'),
    unicodeToArray = require('./_unicodeToArray');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;

},{"./_asciiToArray":35,"./_hasUnicode":97,"./_unicodeToArray":145}],141:[function(require,module,exports){
var memoize = require('./memoize'),
    toString = require('./toString');

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./memoize":183,"./toString":201}],142:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":177}],143:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],144:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    result++;
  }
  return result;
}

module.exports = unicodeSize;

},{}],145:[function(require,module,exports){
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

},{}],146:[function(require,module,exports){
module.exports = {
  'countBy': require('./countBy'),
  'each': require('./each'),
  'eachRight': require('./eachRight'),
  'every': require('./every'),
  'filter': require('./filter'),
  'find': require('./find'),
  'findLast': require('./findLast'),
  'flatMap': require('./flatMap'),
  'flatMapDeep': require('./flatMapDeep'),
  'flatMapDepth': require('./flatMapDepth'),
  'forEach': require('./forEach'),
  'forEachRight': require('./forEachRight'),
  'groupBy': require('./groupBy'),
  'includes': require('./includes'),
  'invokeMap': require('./invokeMap'),
  'keyBy': require('./keyBy'),
  'map': require('./map'),
  'orderBy': require('./orderBy'),
  'partition': require('./partition'),
  'reduce': require('./reduce'),
  'reduceRight': require('./reduceRight'),
  'reject': require('./reject'),
  'sample': require('./sample'),
  'sampleSize': require('./sampleSize'),
  'shuffle': require('./shuffle'),
  'size': require('./size'),
  'some': require('./some'),
  'sortBy': require('./sortBy')
};

},{"./countBy":147,"./each":148,"./eachRight":149,"./every":151,"./filter":152,"./find":153,"./findLast":155,"./flatMap":157,"./flatMapDeep":158,"./flatMapDepth":159,"./forEach":160,"./forEachRight":161,"./groupBy":163,"./includes":166,"./invokeMap":167,"./keyBy":179,"./map":182,"./orderBy":185,"./partition":186,"./reduce":188,"./reduceRight":189,"./reject":190,"./sample":191,"./sampleSize":192,"./shuffle":193,"./size":194,"./some":195,"./sortBy":196}],147:[function(require,module,exports){
var createAggregator = require('./_createAggregator');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.countBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': 1, '6': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.countBy(['one', 'two', 'three'], 'length');
 * // => { '3': 2, '5': 1 }
 */
var countBy = createAggregator(function(result, value, key) {
  hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
});

module.exports = countBy;

},{"./_createAggregator":83}],148:[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":160}],149:[function(require,module,exports){
module.exports = require('./forEachRight');

},{"./forEachRight":161}],150:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],151:[function(require,module,exports){
var arrayEvery = require('./_arrayEvery'),
    baseEvery = require('./_baseEvery'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * **Note:** This method returns `true` for
 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty collections.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.every(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.every(users, 'active');
 * // => false
 */
function every(collection, predicate, guard) {
  var func = isArray(collection) ? arrayEvery : baseEvery;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = every;

},{"./_arrayEvery":26,"./_baseEvery":41,"./_baseIteratee":60,"./_isIterateeCall":106,"./isArray":169}],152:[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    baseFilter = require('./_baseFilter'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;

},{"./_arrayFilter":27,"./_baseFilter":42,"./_baseIteratee":60,"./isArray":169}],153:[function(require,module,exports){
var createFind = require('./_createFind'),
    findIndex = require('./findIndex');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;

},{"./_createFind":86,"./findIndex":154}],154:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIteratee = require('./_baseIteratee'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;

},{"./_baseFindIndex":43,"./_baseIteratee":60,"./toInteger":199}],155:[function(require,module,exports){
var createFind = require('./_createFind'),
    findLastIndex = require('./findLastIndex');

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) {
 *   return n % 2 == 1;
 * });
 * // => 3
 */
var findLast = createFind(findLastIndex);

module.exports = findLast;

},{"./_createFind":86,"./findLastIndex":156}],156:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIteratee = require('./_baseIteratee'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `_.matches` iteratee shorthand.
 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `_.property` iteratee shorthand.
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0
      ? nativeMax(length + index, 0)
      : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
}

module.exports = findLastIndex;

},{"./_baseFindIndex":43,"./_baseIteratee":60,"./toInteger":199}],157:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    map = require('./map');

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * _.flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1);
}

module.exports = flatMap;

},{"./_baseFlatten":44,"./map":182}],158:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    map = require('./map');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * This method is like `_.flatMap` except that it recursively flattens the
 * mapped results.
 *
 * @static
 * @memberOf _
 * @since 4.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]];
 * }
 *
 * _.flatMapDeep([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMapDeep(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), INFINITY);
}

module.exports = flatMapDeep;

},{"./_baseFlatten":44,"./map":182}],159:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    map = require('./map'),
    toInteger = require('./toInteger');

/**
 * This method is like `_.flatMap` except that it recursively flattens the
 * mapped results up to `depth` times.
 *
 * @static
 * @memberOf _
 * @since 4.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The function invoked per iteration.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]];
 * }
 *
 * _.flatMapDepth([1, 2], duplicate, 2);
 * // => [[1, 1], [2, 2]]
 */
function flatMapDepth(collection, iteratee, depth) {
  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(map(collection, iteratee), depth);
}

module.exports = flatMapDepth;

},{"./_baseFlatten":44,"./map":182,"./toInteger":199}],160:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseEach = require('./_baseEach'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = forEach;

},{"./_arrayEach":24,"./_baseEach":39,"./_baseIteratee":60,"./isArray":169}],161:[function(require,module,exports){
var arrayEachRight = require('./_arrayEachRight'),
    baseEachRight = require('./_baseEachRight'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');

/**
 * This method is like `_.forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEach
 * @example
 *
 * _.forEachRight([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `2` then `1`.
 */
function forEachRight(collection, iteratee) {
  var func = isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = forEachRight;

},{"./_arrayEachRight":25,"./_baseEachRight":40,"./_baseIteratee":60,"./isArray":169}],162:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":49}],163:[function(require,module,exports){
var createAggregator = require('./_createAggregator');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * // The `_.property` iteratee shorthand.
 * _.groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 */
var groupBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    result[key] = [value];
  }
});

module.exports = groupBy;

},{"./_createAggregator":83}],164:[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":51,"./_hasPath":96}],165:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],166:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    toInteger = require('./toInteger'),
    values = require('./values');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;

},{"./_baseIndexOf":52,"./isArrayLike":170,"./isString":176,"./toInteger":199,"./values":202}],167:[function(require,module,exports){
var apply = require('./_apply'),
    baseEach = require('./_baseEach'),
    baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest'),
    isArrayLike = require('./isArrayLike'),
    isKey = require('./_isKey');

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] The arguments to invoke each method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invokeMap([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
var invokeMap = baseRest(function(collection, path, args) {
  var index = -1,
      isFunc = typeof path == 'function',
      isProp = isKey(path),
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value) {
    var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
    result[++index] = func ? apply(func, value, args) : baseInvoke(value, path, args);
  });
  return result;
});

module.exports = invokeMap;

},{"./_apply":22,"./_baseEach":39,"./_baseInvoke":53,"./_baseRest":70,"./_isKey":107,"./isArrayLike":170}],168:[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":171}],169:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],170:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":172,"./isLength":173}],171:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":170,"./isObjectLike":175}],172:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":174}],173:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],174:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],175:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],176:[function(require,module,exports){
var isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{"./isArray":169,"./isObjectLike":175}],177:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":175}],178:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":59,"./_baseUnary":76,"./_nodeUtil":127}],179:[function(require,module,exports){
var createAggregator = require('./_createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.keyBy(array, function(o) {
 *   return String.fromCharCode(o.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.keyBy(array, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 */
var keyBy = createAggregator(function(result, value, key) {
  result[key] = value;
});

module.exports = keyBy;

},{"./_createAggregator":83}],180:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":28,"./_baseKeys":61,"./isArrayLike":170}],181:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],182:[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    baseMap = require('./_baseMap'),
    isArray = require('./isArray');

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;

},{"./_arrayMap":29,"./_baseIteratee":60,"./_baseMap":62,"./isArray":169}],183:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":14}],184:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0: return !predicate.call(this);
      case 1: return !predicate.call(this, args[0]);
      case 2: return !predicate.call(this, args[0], args[1]);
      case 3: return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}

module.exports = negate;

},{}],185:[function(require,module,exports){
var baseOrderBy = require('./_baseOrderBy'),
    isArray = require('./isArray');

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

module.exports = orderBy;

},{"./_baseOrderBy":65,"./isArray":169}],186:[function(require,module,exports){
var createAggregator = require('./_createAggregator');

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * _.partition(users, function(o) { return o.active; });
 * // => objects for [['fred'], ['barney', 'pebbles']]
 *
 * // The `_.matches` iteratee shorthand.
 * _.partition(users, { 'age': 1, 'active': false });
 * // => objects for [['pebbles'], ['barney', 'fred']]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.partition(users, ['active', false]);
 * // => objects for [['barney', 'pebbles'], ['fred']]
 *
 * // The `_.property` iteratee shorthand.
 * _.partition(users, 'active');
 * // => objects for [['fred'], ['barney', 'pebbles']]
 */
var partition = createAggregator(function(result, value, key) {
  result[key ? 0 : 1].push(value);
}, function() { return [[], []]; });

module.exports = partition;

},{"./_createAggregator":83}],187:[function(require,module,exports){
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey'),
    toKey = require('./_toKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":66,"./_basePropertyDeep":67,"./_isKey":107,"./_toKey":142}],188:[function(require,module,exports){
var arrayReduce = require('./_arrayReduce'),
    baseEach = require('./_baseEach'),
    baseIteratee = require('./_baseIteratee'),
    baseReduce = require('./_baseReduce'),
    isArray = require('./isArray');

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}

module.exports = reduce;

},{"./_arrayReduce":31,"./_baseEach":39,"./_baseIteratee":60,"./_baseReduce":69,"./isArray":169}],189:[function(require,module,exports){
var arrayReduceRight = require('./_arrayReduceRight'),
    baseEachRight = require('./_baseEachRight'),
    baseIteratee = require('./_baseIteratee'),
    baseReduce = require('./_baseReduce'),
    isArray = require('./isArray');

/**
 * This method is like `_.reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduce
 * @example
 *
 * var array = [[0, 1], [2, 3], [4, 5]];
 *
 * _.reduceRight(array, function(flattened, other) {
 *   return flattened.concat(other);
 * }, []);
 * // => [4, 5, 2, 3, 0, 1]
 */
function reduceRight(collection, iteratee, accumulator) {
  var func = isArray(collection) ? arrayReduceRight : baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
}

module.exports = reduceRight;

},{"./_arrayReduceRight":32,"./_baseEachRight":40,"./_baseIteratee":60,"./_baseReduce":69,"./isArray":169}],190:[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    baseFilter = require('./_baseFilter'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray'),
    negate = require('./negate');

/**
 * The opposite of `_.filter`; this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.filter
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': true }
 * ];
 *
 * _.reject(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.reject(users, { 'age': 40, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.reject(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.reject(users, 'active');
 * // => objects for ['barney']
 */
function reject(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, negate(baseIteratee(predicate, 3)));
}

module.exports = reject;

},{"./_arrayFilter":27,"./_baseFilter":42,"./_baseIteratee":60,"./isArray":169,"./negate":184}],191:[function(require,module,exports){
var baseRandom = require('./_baseRandom'),
    isArrayLike = require('./isArrayLike'),
    values = require('./values');

/**
 * Gets a random element from `collection`.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(collection) {
  var array = isArrayLike(collection) ? collection : values(collection),
      length = array.length;

  return length > 0 ? array[baseRandom(0, length - 1)] : undefined;
}

module.exports = sample;

},{"./_baseRandom":68,"./isArrayLike":170,"./values":202}],192:[function(require,module,exports){
var baseClamp = require('./_baseClamp'),
    baseRandom = require('./_baseRandom'),
    isIterateeCall = require('./_isIterateeCall'),
    toArray = require('./toArray'),
    toInteger = require('./toInteger');

/**
 * Gets `n` random elements at unique keys from `collection` up to the
 * size of `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * _.sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * _.sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 */
function sampleSize(collection, n, guard) {
  var index = -1,
      result = toArray(collection),
      length = result.length,
      lastIndex = length - 1;

  if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = baseClamp(toInteger(n), 0, length);
  }
  while (++index < n) {
    var rand = baseRandom(index, lastIndex),
        value = result[rand];

    result[rand] = result[index];
    result[index] = value;
  }
  result.length = n;
  return result;
}

module.exports = sampleSize;

},{"./_baseClamp":38,"./_baseRandom":68,"./_isIterateeCall":106,"./toArray":197,"./toInteger":199}],193:[function(require,module,exports){
var sampleSize = require('./sampleSize');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  return sampleSize(collection, MAX_ARRAY_LENGTH);
}

module.exports = shuffle;

},{"./sampleSize":192}],194:[function(require,module,exports){
var baseKeys = require('./_baseKeys'),
    getTag = require('./_getTag'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    stringSize = require('./_stringSize');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }
  var tag = getTag(collection);
  if (tag == mapTag || tag == setTag) {
    return collection.size;
  }
  return baseKeys(collection).length;
}

module.exports = size;

},{"./_baseKeys":61,"./_getTag":94,"./_stringSize":139,"./isArrayLike":170,"./isString":176}],195:[function(require,module,exports){
var arraySome = require('./_arraySome'),
    baseIteratee = require('./_baseIteratee'),
    baseSome = require('./_baseSome'),
    isArray = require('./isArray'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = some;

},{"./_arraySome":33,"./_baseIteratee":60,"./_baseSome":72,"./_isIterateeCall":106,"./isArray":169}],196:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    baseOrderBy = require('./_baseOrderBy'),
    baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, function(o) { return o.user; });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 *
 * _.sortBy(users, 'user', function(o) {
 *   return Math.floor(o.age / 10);
 * });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;

},{"./_baseFlatten":44,"./_baseOrderBy":65,"./_baseRest":70,"./_isIterateeCall":106}],197:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    copyArray = require('./_copyArray'),
    getTag = require('./_getTag'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    iteratorToArray = require('./_iteratorToArray'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray'),
    stringToArray = require('./_stringToArray'),
    values = require('./values');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Built-in value references. */
var iteratorSymbol = Symbol ? Symbol.iterator : undefined;

/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (iteratorSymbol && value[iteratorSymbol]) {
    return iteratorToArray(value[iteratorSymbol]());
  }
  var tag = getTag(value),
      func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

  return func(value);
}

module.exports = toArray;

},{"./_Symbol":19,"./_copyArray":81,"./_getTag":94,"./_iteratorToArray":112,"./_mapToArray":123,"./_setToArray":133,"./_stringToArray":140,"./isArrayLike":170,"./isString":176,"./values":202}],198:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

},{"./toNumber":200}],199:[function(require,module,exports){
var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

},{"./toFinite":198}],200:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":174,"./isSymbol":177}],201:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":75}],202:[function(require,module,exports){
var baseValues = require('./_baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;

},{"./_baseValues":77,"./keys":180}],203:[function(require,module,exports){
!function t(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Raphael=r():e.Raphael=r()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var i,n;i=[r(1),r(3),r(4)],n=function(t){return t}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(2)],n=function(t){function e(r){if(e.is(r,"function"))return w?r():t.on("raphael.DOMload",r);if(e.is(r,Q))return e._engine.create[z](e,r.splice(0,3+e.is(r[0],$))).add(r);var i=Array.prototype.slice.call(arguments,0);if(e.is(i[i.length-1],"function")){var n=i.pop();return w?n.call(e._engine.create[z](e,i)):t.on("raphael.DOMload",function(){n.call(e._engine.create[z](e,i))})}return e._engine.create[z](e,arguments)}function r(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var i in t)t[T](i)&&(e[i]=r(t[i]));return e}function i(t,e){for(var r=0,i=t.length;i>r;r++)if(t[r]===e)return t.push(t.splice(r,1)[0])}function n(t,e,r){function n(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=n.cache=n.cache||{},l=n.count=n.count||[];return o[T](s)?(i(l,s),r?r(o[s]):o[s]):(l.length>=1e3&&delete o[l.shift()],l.push(s),o[s]=t[z](e,a),r?r(o[s]):o[s])}return n}function a(){return this.hex}function s(t,e){for(var r=[],i=0,n=t.length;n-2*!e>i;i+=2){var a=[{x:+t[i-2],y:+t[i-1]},{x:+t[i],y:+t[i+1]},{x:+t[i+2],y:+t[i+3]},{x:+t[i+4],y:+t[i+5]}];e?i?n-4==i?a[3]={x:+t[0],y:+t[1]}:n-2==i&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[n-2],y:+t[n-1]}:n-4==i?a[3]=a[2]:i||(a[0]={x:+t[i],y:+t[i+1]}),r.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return r}function o(t,e,r,i,n){var a=-3*e+9*r-9*i+3*n,s=t*a+6*e-12*r+6*i;return t*s-3*e+3*r}function l(t,e,r,i,n,a,s,l,h){null==h&&(h=1),h=h>1?1:0>h?0:h;for(var u=h/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;c>g;g++){var x=u*f[g]+u,v=o(x,t,r,n,s),y=o(x,e,i,a,l),m=v*v+y*y;d+=p[g]*Y.sqrt(m)}return u*d}function h(t,e,r,i,n,a,s,o,h){if(!(0>h||l(t,e,r,i,n,a,s,o)<h)){var u=1,c=u/2,f=u-c,p,d=.01;for(p=l(t,e,r,i,n,a,s,o,f);H(p-h)>d;)c/=2,f+=(h>p?1:-1)*c,p=l(t,e,r,i,n,a,s,o,f);return f}}function u(t,e,r,i,n,a,s,o){if(!(W(t,r)<G(n,s)||G(t,r)>W(n,s)||W(e,i)<G(a,o)||G(e,i)>W(a,o))){var l=(t*i-e*r)*(n-s)-(t-r)*(n*o-a*s),h=(t*i-e*r)*(a-o)-(e-i)*(n*o-a*s),u=(t-r)*(a-o)-(e-i)*(n-s);if(u){var c=l/u,f=h/u,p=+c.toFixed(2),d=+f.toFixed(2);if(!(p<+G(t,r).toFixed(2)||p>+W(t,r).toFixed(2)||p<+G(n,s).toFixed(2)||p>+W(n,s).toFixed(2)||d<+G(e,i).toFixed(2)||d>+W(e,i).toFixed(2)||d<+G(a,o).toFixed(2)||d>+W(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,e){return p(t,e)}function f(t,e){return p(t,e,1)}function p(t,r,i){var n=e.bezierBBox(t),a=e.bezierBBox(r);if(!e.isBBoxIntersect(n,a))return i?0:[];for(var s=l.apply(0,t),o=l.apply(0,r),h=W(~~(s/5),1),c=W(~~(o/5),1),f=[],p=[],d={},g=i?0:[],x=0;h+1>x;x++){var v=e.findDotsAtSegment.apply(e,t.concat(x/h));f.push({x:v.x,y:v.y,t:x/h})}for(x=0;c+1>x;x++)v=e.findDotsAtSegment.apply(e,r.concat(x/c)),p.push({x:v.x,y:v.y,t:x/c});for(x=0;h>x;x++)for(var y=0;c>y;y++){var m=f[x],b=f[x+1],_=p[y],w=p[y+1],k=H(b.x-m.x)<.001?"y":"x",B=H(w.x-_.x)<.001?"y":"x",C=u(m.x,m.y,b.x,b.y,_.x,_.y,w.x,w.y);if(C){if(d[C.x.toFixed(4)]==C.y.toFixed(4))continue;d[C.x.toFixed(4)]=C.y.toFixed(4);var S=m.t+H((C[k]-m[k])/(b[k]-m[k]))*(b.t-m.t),T=_.t+H((C[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);S>=0&&1.001>=S&&T>=0&&1.001>=T&&(i?g++:g.push({x:C.x,y:C.y,t1:G(S,1),t2:G(T,1)}))}}return g}function d(t,r,i){t=e._path2curve(t),r=e._path2curve(r);for(var n,a,s,o,l,h,u,c,f,d,g=i?0:[],x=0,v=t.length;v>x;x++){var y=t[x];if("M"==y[0])n=l=y[1],a=h=y[2];else{"C"==y[0]?(f=[n,a].concat(y.slice(1)),n=f[6],a=f[7]):(f=[n,a,n,a,l,h,l,h],n=l,a=h);for(var m=0,b=r.length;b>m;m++){var _=r[m];if("M"==_[0])s=u=_[1],o=c=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,u,c,u,c],s=u,o=c);var w=p(f,d,i);if(i)g+=w;else{for(var k=0,B=w.length;B>k;k++)w[k].segment1=x,w[k].segment2=m,w[k].bez1=f,w[k].bez2=d;g=g.concat(w)}}}}}return g}function g(t,e,r,i,n,a){null!=t?(this.a=+t,this.b=+e,this.c=+r,this.d=+i,this.e=+n,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function x(){return this.x+I+this.y}function v(){return this.x+I+this.y+I+this.width+" × "+this.height}function y(t,e,r,i,n,a){function s(t){return((c*t+u)*t+h)*t}function o(t,e){var r=l(t,e);return((d*r+p)*r+f)*r}function l(t,e){var r,i,n,a,o,l;for(n=t,l=0;8>l;l++){if(a=s(n)-t,H(a)<e)return n;if(o=(3*c*n+2*u)*n+h,H(o)<1e-6)break;n-=a/o}if(r=0,i=1,n=t,r>n)return r;if(n>i)return i;for(;i>r;){if(a=s(n),H(a-t)<e)return n;t>a?r=n:i=n,n=(i-r)/2+r}return n}var h=3*e,u=3*(i-e)-h,c=1-h-u,f=3*r,p=3*(n-r)-f,d=1-f-p;return o(t,1/(200*a))}function m(t,e){var r=[],i={};if(this.ms=e,this.times=1,t){for(var n in t)t[T](n)&&(i[ht(n)]=t[n],r.push(ht(n)));r.sort(Bt)}this.anim=i,this.top=r[r.length-1],this.percents=r}function b(r,i,n,a,s,o){n=ht(n);var l,h,u,c=[],f,p,d,x=r.ms,v={},m={},b={};if(a)for(w=0,B=Ee.length;B>w;w++){var _=Ee[w];if(_.el.id==i.id&&_.anim==r){_.percent!=n?(Ee.splice(w,1),u=1):h=_,i.attr(_.totalOrigin);break}}else a=+m;for(var w=0,B=r.percents.length;B>w;w++){if(r.percents[w]==n||r.percents[w]>a*r.top){n=r.percents[w],p=r.percents[w-1]||0,x=x/r.top*(n-p),f=r.percents[w+1],l=r.anim[n];break}a&&i.attr(r.anim[r.percents[w]])}if(l){if(h)h.initstatus=a,h.start=new Date-h.ms*a;else{for(var C in l)if(l[T](C)&&(pt[T](C)||i.paper.customAttributes[T](C)))switch(v[C]=i.attr(C),null==v[C]&&(v[C]=ft[C]),m[C]=l[C],pt[C]){case $:b[C]=(m[C]-v[C])/x;break;case"colour":v[C]=e.getRGB(v[C]);var S=e.getRGB(m[C]);b[C]={r:(S.r-v[C].r)/x,g:(S.g-v[C].g)/x,b:(S.b-v[C].b)/x};break;case"path":var A=Qt(v[C],m[C]),E=A[1];for(v[C]=A[0],b[C]=[],w=0,B=v[C].length;B>w;w++){b[C][w]=[0];for(var N=1,M=v[C][w].length;M>N;N++)b[C][w][N]=(E[w][N]-v[C][w][N])/x}break;case"transform":var L=i._,z=le(L[C],m[C]);if(z)for(v[C]=z.from,m[C]=z.to,b[C]=[],b[C].real=!0,w=0,B=v[C].length;B>w;w++)for(b[C][w]=[v[C][w][0]],N=1,M=v[C][w].length;M>N;N++)b[C][w][N]=(m[C][w][N]-v[C][w][N])/x;else{var F=i.matrix||new g,R={_:{transform:L.transform},getBBox:function(){return i.getBBox(1)}};v[C]=[F.a,F.b,F.c,F.d,F.e,F.f],se(R,m[C]),m[C]=R._.transform,b[C]=[(R.matrix.a-F.a)/x,(R.matrix.b-F.b)/x,(R.matrix.c-F.c)/x,(R.matrix.d-F.d)/x,(R.matrix.e-F.e)/x,(R.matrix.f-F.f)/x]}break;case"csv":var I=j(l[C])[q](k),D=j(v[C])[q](k);if("clip-rect"==C)for(v[C]=D,b[C]=[],w=D.length;w--;)b[C][w]=(I[w]-v[C][w])/x;m[C]=I;break;default:for(I=[][P](l[C]),D=[][P](v[C]),b[C]=[],w=i.paper.customAttributes[C].length;w--;)b[C][w]=((I[w]||0)-(D[w]||0))/x}var V=l.easing,O=e.easing_formulas[V];if(!O)if(O=j(V).match(st),O&&5==O.length){var Y=O;O=function(t){return y(t,+Y[1],+Y[2],+Y[3],+Y[4],x)}}else O=St;if(d=l.start||r.start||+new Date,_={anim:r,percent:n,timestamp:d,start:d+(r.del||0),status:0,initstatus:a||0,stop:!1,ms:x,easing:O,from:v,diff:b,to:m,el:i,callback:l.callback,prev:p,next:f,repeat:o||r.times,origin:i.attr(),totalOrigin:s},Ee.push(_),a&&!h&&!u&&(_.stop=!0,_.start=new Date-x*a,1==Ee.length))return Me();u&&(_.start=new Date-_.ms*a),1==Ee.length&&Ne(Me)}t("raphael.anim.start."+i.id,i,r)}}function _(t){for(var e=0;e<Ee.length;e++)Ee[e].el.paper==t&&Ee.splice(e--,1)}e.version="2.2.0",e.eve=t;var w,k=/[, ]+/,B={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},C=/\{(\d+)\}/g,S="prototype",T="hasOwnProperty",A={doc:document,win:window},E={was:Object.prototype[T].call(A.win,"Raphael"),is:A.win.Raphael},N=function(){this.ca=this.customAttributes={}},M,L="appendChild",z="apply",P="concat",F="ontouchstart"in A.win||A.win.DocumentTouch&&A.doc instanceof DocumentTouch,R="",I=" ",j=String,q="split",D="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](I),V={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},O=j.prototype.toLowerCase,Y=Math,W=Y.max,G=Y.min,H=Y.abs,X=Y.pow,U=Y.PI,$="number",Z="string",Q="array",J="toString",K="fill",tt=Object.prototype.toString,et={},rt="push",it=e._ISURL=/^url\(['"]?(.+?)['"]?\)$/i,nt=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,at={NaN:1,Infinity:1,"-Infinity":1},st=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ot=Y.round,lt="setAttribute",ht=parseFloat,ut=parseInt,ct=j.prototype.toUpperCase,ft=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0,"class":""},pt=e._availableAnimAttrs={blur:$,"clip-rect":"csv",cx:$,cy:$,fill:"colour","fill-opacity":$,"font-size":$,height:$,opacity:$,path:"path",r:$,rx:$,ry:$,stroke:"colour","stroke-opacity":$,"stroke-width":$,transform:"transform",width:$,x:$,y:$},dt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,gt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,xt={hs:1,rg:1},vt=/,?([achlmqrstvxz]),?/gi,yt=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,mt=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,bt=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,_t=e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,wt={},kt=function(t,e){return t.key-e.key},Bt=function(t,e){return ht(t)-ht(e)},Ct=function(){},St=function(t){return t},Tt=e._rectPath=function(t,e,r,i,n){return n?[["M",t+n,e],["l",r-2*n,0],["a",n,n,0,0,1,n,n],["l",0,i-2*n],["a",n,n,0,0,1,-n,n],["l",2*n-r,0],["a",n,n,0,0,1,-n,-n],["l",0,2*n-i],["a",n,n,0,0,1,n,-n],["z"]]:[["M",t,e],["l",r,0],["l",0,i],["l",-r,0],["z"]]},At=function(t,e,r,i){return null==i&&(i=r),[["M",t,e],["m",0,-i],["a",r,i,0,1,1,0,2*i],["a",r,i,0,1,1,0,-2*i],["z"]]},Et=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return At(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return At(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return Tt(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return Tt(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return Tt(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return Tt(e.x,e.y,e.width,e.height)}},Nt=e.mapPath=function(t,e){if(!e)return t;var r,i,n,a,s,o,l;for(t=Qt(t),n=0,s=t.length;s>n;n++)for(l=t[n],a=1,o=l.length;o>a;a+=2)r=e.x(l[a],l[a+1]),i=e.y(l[a],l[a+1]),l[a]=r,l[a+1]=i;return t};if(e._g=A,e.type=A.win.SVGAngle||A.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var Mt=A.doc.createElement("div"),Lt;if(Mt.innerHTML='<v:shape adj="1"/>',Lt=Mt.firstChild,Lt.style.behavior="url(#default#VML)",!Lt||"object"!=typeof Lt.adj)return e.type=R;Mt=null}e.svg=!(e.vml="VML"==e.type),e._Paper=N,e.fn=M=N.prototype=e.prototype,e._id=0,e._oid=0,e.is=function(t,e){return e=O.call(e),"finite"==e?!at[T](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||tt.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,r,i,n,a,s){if(null==a){var o=t-i,l=r-n;return o||l?(180+180*Y.atan2(-l,-o)/U+360)%360:0}return e.angle(t,r,a,s)-e.angle(i,n,a,s)},e.rad=function(t){return t%360*U/180},e.deg=function(t){return Math.round(180*t/U%360*1e3)/1e3},e.snapTo=function(t,r,i){if(i=e.is(i,"finite")?i:10,e.is(t,Q)){for(var n=t.length;n--;)if(H(t[n]-r)<=i)return t[n]}else{t=+t;var a=r%t;if(i>a)return r-a;if(a>t-i)return r-a+t}return r};var zt=e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=16*Y.random()|0,r="x"==t?e:3&e|8;return r.toString(16)});e.setWindow=function(r){t("raphael.setWindow",e,A.win,r),A.win=r,A.doc=A.win.document,e._engine.initWin&&e._engine.initWin(A.win)};var Pt=function(t){if(e.vml){var r=/^\s+|\s+$/g,i;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),i=a.body}catch(s){i=createPopup().document.body}var o=i.createTextRange();Pt=n(function(t){try{i.style.color=j(t).replace(r,R);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(n){return"none"}})}else{var l=A.doc.createElement("i");l.title="Raphaël Colour Picker",l.style.display="none",A.doc.body.appendChild(l),Pt=n(function(t){return l.style.color=t,A.doc.defaultView.getComputedStyle(l,R).getPropertyValue("color")})}return Pt(t)},Ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},Rt=function(){return"hsl("+[this.h,this.s,this.l]+")"},It=function(){return this.hex},jt=function(t,r,i){if(null==r&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(i=t.b,r=t.g,t=t.r),null==r&&e.is(t,Z)){var n=e.getRGB(t);t=n.r,r=n.g,i=n.b}return(t>1||r>1||i>1)&&(t/=255,r/=255,i/=255),[t,r,i]},qt=function(t,r,i,n){t*=255,r*=255,i*=255;var a={r:t,g:r,b:i,hex:e.rgb(t,r,i),toString:It};return e.is(n,"finite")&&(a.opacity=n),a};e.color=function(t){var r;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(r=e.hsb2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(r=e.hsl2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(r=e.rgb2hsl(t),t.h=r.h,t.s=r.s,t.l=r.l,r=e.rgb2hsb(t),t.v=r.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=It,t},e.hsb2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(r=t.b,e=t.s,i=t.o,t=t.h),t*=360;var n,a,s,o,l;return t=t%360/60,l=r*e,o=l*(1-H(t%2-1)),n=a=s=r-l,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.hsl2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(r=t.l,e=t.s,t=t.h),(t>1||e>1||r>1)&&(t/=360,e/=100,r/=100),t*=360;var n,a,s,o,l;return t=t%360/60,l=2*e*(.5>r?r:1-r),o=l*(1-H(t%2-1)),n=a=s=r-l/2,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.rgb2hsb=function(t,e,r){r=jt(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s;return a=W(t,e,r),s=a-G(t,e,r),i=0==s?null:a==t?(e-r)/s:a==e?(r-t)/s+2:(t-e)/s+4,i=(i+360)%6*60/360,n=0==s?0:s/a,{h:i,s:n,b:a,toString:Ft}},e.rgb2hsl=function(t,e,r){r=jt(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s,o,l;return s=W(t,e,r),o=G(t,e,r),l=s-o,i=0==l?null:s==t?(e-r)/l:s==e?(r-t)/l+2:(t-e)/l+4,i=(i+360)%6*60/360,a=(s+o)/2,n=0==l?0:.5>a?l/(2*a):l/(2-2*a),{h:i,s:n,l:a,toString:Rt}},e._path2string=function(){return this.join(",").replace(vt,"$1")};var Dt=e._preload=function(t,e){var r=A.doc.createElement("img");r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){e.call(this),this.onload=null,A.doc.body.removeChild(this)},r.onerror=function(){A.doc.body.removeChild(this)},A.doc.body.appendChild(r),r.src=t};e.getRGB=n(function(t){if(!t||(t=j(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(xt[T](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Pt(t));var r,i,n,s,o,l,h,u=t.match(nt);return u?(u[2]&&(s=ut(u[2].substring(5),16),n=ut(u[2].substring(3,5),16),i=ut(u[2].substring(1,3),16)),u[3]&&(s=ut((l=u[3].charAt(3))+l,16),n=ut((l=u[3].charAt(2))+l,16),i=ut((l=u[3].charAt(1))+l,16)),u[4]&&(h=u[4][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),"rgba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100)),u[5]?(h=u[5][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsb2rgb(i,n,s,o)):u[6]?(h=u[6][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsla"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsl2rgb(i,n,s,o)):(u={r:i,g:n,b:s,toString:a},u.hex="#"+(16777216|s|n<<8|i<<16).toString(16).slice(1),e.is(o,"finite")&&(u.opacity=o),u)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=n(function(t,r,i){return e.hsb2rgb(t,r,i).hex}),e.hsl=n(function(t,r,i){return e.hsl2rgb(t,r,i).hex}),e.rgb=n(function(t,e,r){function i(t){return t+.5|0}return"#"+(16777216|i(r)|i(e)<<8|i(t)<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},r=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})),r.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var r=Vt(t);if(r.arr)return Yt(r.arr);var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},n=[];return e.is(t,Q)&&e.is(t[0],Q)&&(n=Yt(t)),n.length||j(t).replace(yt,function(t,e,r){var a=[],s=e.toLowerCase();if(r.replace(bt,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(n.push([e][P](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)n.push([e][P](a));else for(;a.length>=i[s]&&(n.push([e][P](a.splice(0,i[s]))),i[s]););}),n.toString=e._path2string,r.arr=Yt(n),n},e.parseTransformString=n(function(t){if(!t)return null;var r={r:3,s:4,t:2,m:6},i=[];return e.is(t,Q)&&e.is(t[0],Q)&&(i=Yt(t)),i.length||j(t).replace(mt,function(t,e,r){var n=[],a=O.call(e);r.replace(bt,function(t,e){e&&n.push(+e)}),i.push([e][P](n))}),i.toString=e._path2string,i});var Vt=function(t){var e=Vt.ps=Vt.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var r in e)e[T](r)&&r!=t&&(e[r].sleep--,!e[r].sleep&&delete e[r])}),e[t]};e.findDotsAtSegment=function(t,e,r,i,n,a,s,o,l){var h=1-l,u=X(h,3),c=X(h,2),f=l*l,p=f*l,d=u*t+3*c*l*r+3*h*l*l*n+p*s,g=u*e+3*c*l*i+3*h*l*l*a+p*o,x=t+2*l*(r-t)+f*(n-2*r+t),v=e+2*l*(i-e)+f*(a-2*i+e),y=r+2*l*(n-r)+f*(s-2*n+r),m=i+2*l*(a-i)+f*(o-2*a+i),b=h*t+l*r,_=h*e+l*i,w=h*n+l*s,k=h*a+l*o,B=90-180*Y.atan2(x-y,v-m)/U;return(x>y||m>v)&&(B+=180),{x:d,y:g,m:{x:x,y:v},n:{x:y,y:m},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,r,i,n,a,s,o,l){e.is(t,"array")||(t=[t,r,i,n,a,s,o,l]);var h=Zt.apply(null,t);return{x:h.min.x,y:h.min.y,x2:h.max.x,y2:h.max.y,width:h.max.x-h.min.x,height:h.max.y-h.min.y}},e.isPointInsideBBox=function(t,e,r){return e>=t.x&&e<=t.x2&&r>=t.y&&r<=t.y2},e.isBBoxIntersect=function(t,r){var i=e.isPointInsideBBox;return i(r,t.x,t.y)||i(r,t.x2,t.y)||i(r,t.x,t.y2)||i(r,t.x2,t.y2)||i(t,r.x,r.y)||i(t,r.x2,r.y)||i(t,r.x,r.y2)||i(t,r.x2,r.y2)||(t.x<r.x2&&t.x>r.x||r.x<t.x2&&r.x>t.x)&&(t.y<r.y2&&t.y>r.y||r.y<t.y2&&r.y>t.y)},e.pathIntersection=function(t,e){return d(t,e)},e.pathIntersectionNumber=function(t,e){return d(t,e,1)},e.isPointInsidePath=function(t,r,i){var n=e.pathBBox(t);return e.isPointInsideBBox(n,r,i)&&d(t,[["M",r,i],["H",n.x2+10]],1)%2==1},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ot=e.pathBBox=function(t){var e=Vt(t);if(e.bbox)return r(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Qt(t);for(var i=0,n=0,a=[],s=[],o,l=0,h=t.length;h>l;l++)if(o=t[l],"M"==o[0])i=o[1],n=o[2],a.push(i),s.push(n);else{var u=Zt(i,n,o[1],o[2],o[3],o[4],o[5],o[6]);a=a[P](u.min.x,u.max.x),s=s[P](u.min.y,u.max.y),i=o[5],n=o[6]}var c=G[z](0,a),f=G[z](0,s),p=W[z](0,a),d=W[z](0,s),g=p-c,x=d-f,v={x:c,y:f,x2:p,y2:d,width:g,height:x,cx:c+g/2,cy:f+x/2};return e.bbox=r(v),v},Yt=function(t){var i=r(t);return i.toString=e._path2string,i},Wt=e._pathToRelative=function(t){var r=Vt(t);if(r.rel)return Yt(r.rel);e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t));var i=[],n=0,a=0,s=0,o=0,l=0;"M"==t[0][0]&&(n=t[0][1],a=t[0][2],s=n,o=a,l++,i.push(["M",n,a]));for(var h=l,u=t.length;u>h;h++){var c=i[h]=[],f=t[h];if(f[0]!=O.call(f[0]))switch(c[0]=O.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-n).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;d>p;p++)c[p]=+(f[p]-(p%2?n:a)).toFixed(3)}else{c=i[h]=[],"m"==f[0]&&(s=f[1]+n,o=f[2]+a);for(var g=0,x=f.length;x>g;g++)i[h][g]=f[g]}var v=i[h].length;switch(i[h][0]){case"z":n=s,a=o;break;case"h":n+=+i[h][v-1];break;case"v":a+=+i[h][v-1];break;default:n+=+i[h][v-2],a+=+i[h][v-1]}}return i.toString=e._path2string,r.rel=Yt(i),i},Gt=e._pathToAbsolute=function(t){var r=Vt(t);if(r.abs)return Yt(r.abs);if(e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var i=[],n=0,a=0,o=0,l=0,h=0;"M"==t[0][0]&&(n=+t[0][1],a=+t[0][2],o=n,l=a,h++,i[0]=["M",n,a]);for(var u=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),c,f,p=h,d=t.length;d>p;p++){if(i.push(c=[]),f=t[p],f[0]!=ct.call(f[0]))switch(c[0]=ct.call(f[0]),c[0]){case"A":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]+n),c[7]=+(f[7]+a);break;case"V":c[1]=+f[1]+a;break;case"H":c[1]=+f[1]+n;break;case"R":for(var g=[n,a][P](f.slice(1)),x=2,v=g.length;v>x;x++)g[x]=+g[x]+n,g[++x]=+g[x]+a;i.pop(),i=i[P](s(g,u));break;case"M":o=+f[1]+n,l=+f[2]+a;default:for(x=1,v=f.length;v>x;x++)c[x]=+f[x]+(x%2?n:a)}else if("R"==f[0])g=[n,a][P](f.slice(1)),i.pop(),i=i[P](s(g,u)),c=["R"][P](f.slice(-2));else for(var y=0,m=f.length;m>y;y++)c[y]=f[y];switch(c[0]){case"Z":n=o,a=l;break;case"H":n=c[1];break;case"V":a=c[1];break;case"M":o=c[c.length-2],l=c[c.length-1];default:n=c[c.length-2],a=c[c.length-1]}}return i.toString=e._path2string,r.abs=Yt(i),i},Ht=function(t,e,r,i){return[t,e,r,i,r,i]},Xt=function(t,e,r,i,n,a){var s=1/3,o=2/3;return[s*t+o*r,s*e+o*i,s*n+o*r,s*a+o*i,n,a]},Ut=function(t,e,r,i,a,s,o,l,h,u){var c=120*U/180,f=U/180*(+a||0),p=[],d,g=n(function(t,e,r){var i=t*Y.cos(r)-e*Y.sin(r),n=t*Y.sin(r)+e*Y.cos(r);return{x:i,y:n}});if(u)S=u[0],T=u[1],B=u[2],C=u[3];else{d=g(t,e,-f),t=d.x,e=d.y,d=g(l,h,-f),l=d.x,h=d.y;var x=Y.cos(U/180*a),v=Y.sin(U/180*a),y=(t-l)/2,m=(e-h)/2,b=y*y/(r*r)+m*m/(i*i);b>1&&(b=Y.sqrt(b),r=b*r,i=b*i);var _=r*r,w=i*i,k=(s==o?-1:1)*Y.sqrt(H((_*w-_*m*m-w*y*y)/(_*m*m+w*y*y))),B=k*r*m/i+(t+l)/2,C=k*-i*y/r+(e+h)/2,S=Y.asin(((e-C)/i).toFixed(9)),T=Y.asin(((h-C)/i).toFixed(9));S=B>t?U-S:S,T=B>l?U-T:T,0>S&&(S=2*U+S),0>T&&(T=2*U+T),o&&S>T&&(S-=2*U),!o&&T>S&&(T-=2*U)}var A=T-S;if(H(A)>c){var E=T,N=l,M=h;T=S+c*(o&&T>S?1:-1),l=B+r*Y.cos(T),h=C+i*Y.sin(T),p=Ut(l,h,r,i,a,0,o,N,M,[T,E,B,C])}A=T-S;var L=Y.cos(S),z=Y.sin(S),F=Y.cos(T),R=Y.sin(T),I=Y.tan(A/4),j=4/3*r*I,D=4/3*i*I,V=[t,e],O=[t+j*z,e-D*L],W=[l+j*R,h-D*F],G=[l,h];if(O[0]=2*V[0]-O[0],O[1]=2*V[1]-O[1],u)return[O,W,G][P](p);p=[O,W,G][P](p).join()[q](",");for(var X=[],$=0,Z=p.length;Z>$;$++)X[$]=$%2?g(p[$-1],p[$],f).y:g(p[$],p[$+1],f).x;return X},$t=function(t,e,r,i,n,a,s,o,l){var h=1-l;return{x:X(h,3)*t+3*X(h,2)*l*r+3*h*l*l*n+X(l,3)*s,y:X(h,3)*e+3*X(h,2)*l*i+3*h*l*l*a+X(l,3)*o}},Zt=n(function(t,e,r,i,n,a,s,o){var l=n-2*r+t-(s-2*n+r),h=2*(r-t)-2*(n-r),u=t-r,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,p=[e,o],d=[t,s],g;return H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&1>c&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&1>f&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),l=a-2*i+e-(o-2*a+i),h=2*(i-e)-2*(a-i),u=e-i,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&1>c&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&1>f&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),{min:{x:G[z](0,d),y:G[z](0,p)},max:{x:W[z](0,d),y:W[z](0,p)}}}),Qt=e._path2curve=n(function(t,e){var r=!e&&Vt(t);if(!e&&r.curve)return Yt(r.curve);for(var i=Gt(t),n=e&&Gt(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e,r){var i,n,a={T:1,Q:1};if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in a)&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][P](Ut[z](0,[e.x,e.y][P](t.slice(1))));break;case"S":"C"==r||"S"==r?(i=2*e.x-e.bx,n=2*e.y-e.by):(i=e.x,n=e.y),t=["C",i,n][P](t.slice(1));break;case"T":"Q"==r||"T"==r?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"][P](Xt(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][P](Xt(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][P](Ht(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][P](Ht(e.x,e.y,t[1],e.y));break;case"V":t=["C"][P](Ht(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][P](Ht(e.x,e.y,e.X,e.Y))}return t}),l=function(t,e){if(t[e].length>7){t[e].shift();for(var r=t[e];r.length;)u[e]="A",n&&(c[e]="A"),t.splice(e++,0,["C"][P](r.splice(0,6)));t.splice(e,1),g=W(i.length,n&&n.length||0)}},h=function(t,e,r,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),r.bx=0,r.by=0,r.x=t[s][1],r.y=t[s][2],g=W(i.length,n&&n.length||0))},u=[],c=[],f="",p="",d=0,g=W(i.length,n&&n.length||0);g>d;d++){i[d]&&(f=i[d][0]),"C"!=f&&(u[d]=f,d&&(p=u[d-1])),i[d]=o(i[d],a,p),"A"!=u[d]&&"C"==f&&(u[d]="C"),l(i,d),n&&(n[d]&&(f=n[d][0]),"C"!=f&&(c[d]=f,d&&(p=c[d-1])),n[d]=o(n[d],s,p),"A"!=c[d]&&"C"==f&&(c[d]="C"),l(n,d)),h(i,n,a,s,d),h(n,i,s,a,d);var x=i[d],v=n&&n[d],y=x.length,m=n&&v.length;a.x=x[y-2],a.y=x[y-1],a.bx=ht(x[y-4])||a.x,a.by=ht(x[y-3])||a.y,s.bx=n&&(ht(v[m-4])||s.x),s.by=n&&(ht(v[m-3])||s.y),s.x=n&&v[m-2],s.y=n&&v[m-1]}return n||(r.curve=Yt(i)),n?[i,n]:i},null,Yt),Jt=e._parseDots=n(function(t){for(var r=[],i=0,n=t.length;n>i;i++){var a={},s=t[i].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.opacity=a.color.opacity,a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),r.push(a)}for(i=1,n=r.length-1;n>i;i++)if(!r[i].offset){for(var o=ht(r[i-1].offset||0),l=0,h=i+1;n>h;h++)if(r[h].offset){l=r[h].offset;break}l||(l=100,h=n),l=ht(l);for(var u=(l-o)/(h-i+1);h>i;i++)o+=u,r[i].offset=o+"%"}return r}),Kt=e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)},te=e._tofront=function(t,e){e.top!==t&&(Kt(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},ee=e._toback=function(t,e){e.bottom!==t&&(Kt(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},re=e._insertafter=function(t,e,r){Kt(t,r),e==r.top&&(r.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},ie=e._insertbefore=function(t,e,r){Kt(t,r),e==r.bottom&&(r.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},ne=e.toMatrix=function(t,e){var r=Ot(t),i={_:{transform:R},getBBox:function(){return r}};return se(i,e),i.matrix},ae=e.transformPath=function(t,e){return Nt(t,ne(t,e))},se=e._extractTransform=function(t,r){if(null==r)return t._.transform;r=j(r).replace(/\.{3}|\u2026/g,t._.transform||R);var i=e.parseTransformString(r),n=0,a=0,s=0,o=1,l=1,h=t._,u=new g;if(h.transform=i||[],i)for(var c=0,f=i.length;f>c;c++){var p=i[c],d=p.length,x=j(p[0]).toLowerCase(),v=p[0]!=x,y=v?u.invert():0,m,b,_,w,k;"t"==x&&3==d?v?(m=y.x(0,0),b=y.y(0,0),_=y.x(p[1],p[2]),w=y.y(p[1],p[2]),u.translate(_-m,w-b)):u.translate(p[1],p[2]):"r"==x?2==d?(k=k||t.getBBox(1),u.rotate(p[1],k.x+k.width/2,k.y+k.height/2),n+=p[1]):4==d&&(v?(_=y.x(p[2],p[3]),w=y.y(p[2],p[3]),u.rotate(p[1],_,w)):u.rotate(p[1],p[2],p[3]),n+=p[1]):"s"==x?2==d||3==d?(k=k||t.getBBox(1),u.scale(p[1],p[d-1],k.x+k.width/2,k.y+k.height/2),o*=p[1],l*=p[d-1]):5==d&&(v?(_=y.x(p[3],p[4]),w=y.y(p[3],p[4]),u.scale(p[1],p[2],_,w)):u.scale(p[1],p[2],p[3],p[4]),o*=p[1],l*=p[2]):"m"==x&&7==d&&u.add(p[1],p[2],p[3],p[4],p[5],p[6]),h.dirtyT=1,t.matrix=u}t.matrix=u,h.sx=o,h.sy=l,h.deg=n,h.dx=a=u.e,h.dy=s=u.f,1==o&&1==l&&!n&&h.bbox?(h.bbox.x+=+a,h.bbox.y+=+s):h.dirtyT=1},oe=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},le=e._equaliseTransform=function(t,r){r=j(r).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],r=e.parseTransformString(r)||[];for(var i=W(t.length,r.length),n=[],a=[],s=0,o,l,h,u;i>s;s++){if(h=t[s]||oe(r[s]),u=r[s]||oe(h),h[0]!=u[0]||"r"==h[0].toLowerCase()&&(h[2]!=u[2]||h[3]!=u[3])||"s"==h[0].toLowerCase()&&(h[3]!=u[3]||h[4]!=u[4]))return;for(n[s]=[],a[s]=[],o=0,l=W(h.length,u.length);l>o;o++)o in h&&(n[s][o]=h[o]),o in u&&(a[s][o]=u[o])}return{from:n,to:a}};e._getContainer=function(t,r,i,n){var a;return a=null!=n||e.is(t,"object")?t:A.doc.getElementById(t),null!=a?a.tagName?null==r?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:r,height:i}:{container:1,x:t,y:r,width:i,height:n}:void 0},e.pathToRelative=Wt,e._engine={},e.path2curve=Qt,e.matrix=function(t,e,r,i,n,a){return new g(t,e,r,i,n,a)},function(t){function r(t){return t[0]*t[0]+t[1]*t[1]}function i(t){var e=Y.sqrt(r(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,r,i,n,a){var s=[[],[],[]],o=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],l=[[t,r,n],[e,i,a],[0,0,1]],h,u,c,f;for(t&&t instanceof g&&(l=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),h=0;3>h;h++)for(u=0;3>u;u++){for(f=0,c=0;3>c;c++)f+=o[h][c]*l[c][u];s[h][u]=f}this.a=s[0][0],this.b=s[1][0],this.c=s[0][1],this.d=s[1][1],this.e=s[0][2],this.f=s[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new g(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new g(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){
this.add(1,0,0,1,t,e)},t.scale=function(t,e,r,i){null==e&&(e=t),(r||i)&&this.add(1,0,0,1,r,i),this.add(t,0,0,e,0,0),(r||i)&&this.add(1,0,0,1,-r,-i)},t.rotate=function(t,r,i){t=e.rad(t),r=r||0,i=i||0;var n=+Y.cos(t).toFixed(9),a=+Y.sin(t).toFixed(9);this.add(n,a,-a,n,r,i),this.add(1,0,0,1,-r,-i)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[j.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var n=[[this.a,this.c],[this.b,this.d]];t.scalex=Y.sqrt(r(n[0])),i(n[0]),t.shear=n[0][0]*n[1][0]+n[0][1]*n[1][1],n[1]=[n[1][0]-n[0][0]*t.shear,n[1][1]-n[0][1]*t.shear],t.scaley=Y.sqrt(r(n[1])),i(n[1]),t.shear/=t.scaley;var a=-n[0][1],s=n[1][1];return 0>s?(t.rotate=e.deg(Y.acos(s)),0>a&&(t.rotate=360-t.rotate)):t.rotate=e.deg(Y.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this[q]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:R)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:R)+(e.rotate?"r"+[e.rotate,0,0]:R)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(g.prototype);for(var he=function(){this.returnValue=!1},ue=function(){return this.originalEvent.preventDefault()},ce=function(){this.cancelBubble=!0},fe=function(){return this.originalEvent.stopPropagation()},pe=function(t){var e=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,r=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft;return{x:t.clientX+r,y:t.clientY+e}},de=function(){return A.doc.addEventListener?function(t,e,r,i){var n=function(t){var e=pe(t);return r.call(i,t,e.x,e.y)};if(t.addEventListener(e,n,!1),F&&V[e]){var a=function(e){for(var n=pe(e),a=e,s=0,o=e.targetTouches&&e.targetTouches.length;o>s;s++)if(e.targetTouches[s].target==t){e=e.targetTouches[s],e.originalEvent=a,e.preventDefault=ue,e.stopPropagation=fe;break}return r.call(i,e,n.x,n.y)};t.addEventListener(V[e],a,!1)}return function(){return t.removeEventListener(e,n,!1),F&&V[e]&&t.removeEventListener(V[e],a,!1),!0}}:A.doc.attachEvent?function(t,e,r,i){var n=function(t){t=t||A.win.event;var e=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,n=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft,a=t.clientX+n,s=t.clientY+e;return t.preventDefault=t.preventDefault||he,t.stopPropagation=t.stopPropagation||ce,r.call(i,t,a,s)};t.attachEvent("on"+e,n);var a=function(){return t.detachEvent("on"+e,n),!0};return a}:void 0}(),ge=[],xe=function(e){for(var r=e.clientX,i=e.clientY,n=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,a=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft,s,o=ge.length;o--;){if(s=ge[o],F&&e.touches){for(var l=e.touches.length,h;l--;)if(h=e.touches[l],h.identifier==s.el._drag.id){r=h.clientX,i=h.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var u=s.el.node,c,f=u.nextSibling,p=u.parentNode,d=u.style.display;A.win.opera&&p.removeChild(u),u.style.display="none",c=s.el.paper.getElementByPoint(r,i),u.style.display=d,A.win.opera&&(f?p.insertBefore(u,f):p.appendChild(u)),c&&t("raphael.drag.over."+s.el.id,s.el,c),r+=a,i+=n,t("raphael.drag.move."+s.el.id,s.move_scope||s.el,r-s.el._drag.x,i-s.el._drag.y,r,i,e)}},ve=function(r){e.unmousemove(xe).unmouseup(ve);for(var i=ge.length,n;i--;)n=ge[i],n.el._drag={},t("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,r);ge=[]},ye=e.el={},me=D.length;me--;)!function(t){e[t]=ye[t]=function(r,i){return e.is(r,"function")&&(this.events=this.events||[],this.events.push({name:t,f:r,unbind:de(this.shape||this.node||A.doc,t,r,i||this)})),this},e["un"+t]=ye["un"+t]=function(r){for(var i=this.events||[],n=i.length;n--;)i[n].name!=t||!e.is(r,"undefined")&&i[n].f!=r||(i[n].unbind(),i.splice(n,1),!i.length&&delete this.events);return this}}(D[me]);ye.data=function(r,i){var n=wt[this.id]=wt[this.id]||{};if(0==arguments.length)return n;if(1==arguments.length){if(e.is(r,"object")){for(var a in r)r[T](a)&&this.data(a,r[a]);return this}return t("raphael.data.get."+this.id,this,n[r],r),n[r]}return n[r]=i,t("raphael.data.set."+this.id,this,i,r),this},ye.removeData=function(t){return null==t?wt[this.id]={}:wt[this.id]&&delete wt[this.id][t],this},ye.getData=function(){return r(wt[this.id]||{})},ye.hover=function(t,e,r,i){return this.mouseover(t,r).mouseout(e,i||r)},ye.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var be=[];ye.drag=function(r,i,n,a,s,o){function l(l){(l.originalEvent||l).preventDefault();var h=l.clientX,u=l.clientY,c=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,f=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft;if(this._drag.id=l.identifier,F&&l.touches)for(var p=l.touches.length,d;p--;)if(d=l.touches[p],this._drag.id=d.identifier,d.identifier==this._drag.id){h=d.clientX,u=d.clientY;break}this._drag.x=h+f,this._drag.y=u+c,!ge.length&&e.mousemove(xe).mouseup(ve),ge.push({el:this,move_scope:a,start_scope:s,end_scope:o}),i&&t.on("raphael.drag.start."+this.id,i),r&&t.on("raphael.drag.move."+this.id,r),n&&t.on("raphael.drag.end."+this.id,n),t("raphael.drag.start."+this.id,s||a||this,l.clientX+f,l.clientY+c,l)}return this._drag={},be.push({el:this,start:l}),this.mousedown(l),this},ye.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},ye.undrag=function(){for(var r=be.length;r--;)be[r].el==this&&(this.unmousedown(be[r].start),be.splice(r,1),t.unbind("raphael.drag.*."+this.id));!be.length&&e.unmousemove(xe).unmouseup(ve),ge=[]},M.circle=function(t,r,i){var n=e._engine.circle(this,t||0,r||0,i||0);return this.__set__&&this.__set__.push(n),n},M.rect=function(t,r,i,n,a){var s=e._engine.rect(this,t||0,r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},M.ellipse=function(t,r,i,n){var a=e._engine.ellipse(this,t||0,r||0,i||0,n||0);return this.__set__&&this.__set__.push(a),a},M.path=function(t){t&&!e.is(t,Z)&&!e.is(t[0],Q)&&(t+=R);var r=e._engine.path(e.format[z](e,arguments),this);return this.__set__&&this.__set__.push(r),r},M.image=function(t,r,i,n,a){var s=e._engine.image(this,t||"about:blank",r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},M.text=function(t,r,i){var n=e._engine.text(this,t||0,r||0,j(i));return this.__set__&&this.__set__.push(n),n},M.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var r=new ze(t);return this.__set__&&this.__set__.push(r),r.paper=this,r.type="set",r},M.setStart=function(t){this.__set__=t||this.set()},M.setFinish=function(t){var e=this.__set__;return delete this.__set__,e},M.getSize=function(){var t=this.canvas.parentNode;return{width:t.offsetWidth,height:t.offsetHeight}},M.setSize=function(t,r){return e._engine.setSize.call(this,t,r)},M.setViewBox=function(t,r,i,n,a){return e._engine.setViewBox.call(this,t,r,i,n,a)},M.top=M.bottom=null,M.raphael=e;var _e=function(t){var e=t.getBoundingClientRect(),r=t.ownerDocument,i=r.body,n=r.documentElement,a=n.clientTop||i.clientTop||0,s=n.clientLeft||i.clientLeft||0,o=e.top+(A.win.pageYOffset||n.scrollTop||i.scrollTop)-a,l=e.left+(A.win.pageXOffset||n.scrollLeft||i.scrollLeft)-s;return{y:o,x:l}};M.getElementByPoint=function(t,e){var r=this,i=r.canvas,n=A.doc.elementFromPoint(t,e);if(A.win.opera&&"svg"==n.tagName){var a=_e(i),s=i.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=i.getIntersectionList(s,null);o.length&&(n=o[o.length-1])}if(!n)return null;for(;n.parentNode&&n!=i.parentNode&&!n.raphael;)n=n.parentNode;return n==r.canvas.parentNode&&(n=i),n=n&&n.raphael?r.getById(n.raphaelid):null},M.getElementsByBBox=function(t){var r=this.set();return this.forEach(function(i){e.isBBoxIntersect(i.getBBox(),t)&&r.push(i)}),r},M.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},M.forEach=function(t,e){for(var r=this.bottom;r;){if(t.call(e,r)===!1)return this;r=r.next}return this},M.getElementsByPoint=function(t,e){var r=this.set();return this.forEach(function(i){i.isPointInside(t,e)&&r.push(i)}),r},ye.isPointInside=function(t,r){var i=this.realPath=Et[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(i=e.transformPath(i,this.attr("transform"))),e.isPointInsidePath(i,t,r)},ye.getBBox=function(t){if(this.removed)return{};var e=this._;return t?(!e.dirty&&e.bboxwt||(this.realPath=Et[this.type](this),e.bboxwt=Ot(this.realPath),e.bboxwt.toString=v,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&(!e.dirty&&this.realPath||(e.bboxwt=0,this.realPath=Et[this.type](this)),e.bbox=Ot(Nt(this.realPath,this.matrix)),e.bbox.toString=v,e.dirty=e.dirtyT=0),e.bbox)},ye.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},ye.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:null==t.opacity?.5:t.opacity,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},r=e.width/2,i=this.paper,n=i.set(),a=this.realPath||Et[this.type](this);a=this.matrix?Nt(a,this.matrix):a;for(var s=1;r+1>s;s++)n.push(i.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/r*s).toFixed(3),opacity:+(e.opacity/r).toFixed(3)}));return n.insertBefore(this).translate(e.offsetx,e.offsety)};var we={},ke=function(t,r,i,n,a,s,o,u,c){return null==c?l(t,r,i,n,a,s,o,u):e.findDotsAtSegment(t,r,i,n,a,s,o,u,h(t,r,i,n,a,s,o,u,c))},Be=function(t,r){return function(i,n,a){i=Qt(i);for(var s,o,l,h,u="",c={},f,p=0,d=0,g=i.length;g>d;d++){if(l=i[d],"M"==l[0])s=+l[1],o=+l[2];else{if(h=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6]),p+h>n){if(r&&!c.start){if(f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),u+=["C"+f.start.x,f.start.y,f.m.x,f.m.y,f.x,f.y],a)return u;c.start=u,u=["M"+f.x,f.y+"C"+f.n.x,f.n.y,f.end.x,f.end.y,l[5],l[6]].join(),p+=h,s=+l[5],o=+l[6];continue}if(!t&&!r)return f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),{x:f.x,y:f.y,alpha:f.alpha}}p+=h,s=+l[5],o=+l[6]}u+=l.shift()+l}return c.end=u,f=t?p:r?c:e.findDotsAtSegment(s,o,l[0],l[1],l[2],l[3],l[4],l[5],1),f.alpha&&(f={x:f.x,y:f.y,alpha:f.alpha}),f}},Ce=Be(1),Se=Be(),Te=Be(0,1);e.getTotalLength=Ce,e.getPointAtLength=Se,e.getSubpath=function(t,e,r){if(this.getTotalLength(t)-r<1e-6)return Te(t,e).end;var i=Te(t,r,1);return e?Te(i,e).end:i},ye.getTotalLength=function(){var t=this.getPath();if(t)return this.node.getTotalLength?this.node.getTotalLength():Ce(t)},ye.getPointAtLength=function(t){var e=this.getPath();if(e)return Se(e,t)},ye.getPath=function(){var t,r=e._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return r&&(t=r(this)),t},ye.getSubpath=function(t,r){var i=this.getPath();if(i)return e.getSubpath(i,t,r)};var Ae=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,r=Y.sqrt(.1734+e*e),i=r-e,n=X(H(i),1/3)*(0>i?-1:1),a=-r-e,s=X(H(a),1/3)*(0>a?-1:1),o=n+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*Y.sin((t-.075)*(2*U)/.3)+1},bounce:function(t){var e=7.5625,r=2.75,i;return 1/r>t?i=e*t*t:2/r>t?(t-=1.5/r,i=e*t*t+.75):2.5/r>t?(t-=2.25/r,i=e*t*t+.9375):(t-=2.625/r,i=e*t*t+.984375),i}};Ae.easeIn=Ae["ease-in"]=Ae["<"],Ae.easeOut=Ae["ease-out"]=Ae[">"],Ae.easeInOut=Ae["ease-in-out"]=Ae["<>"],Ae["back-in"]=Ae.backIn,Ae["back-out"]=Ae.backOut;var Ee=[],Ne=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},Me=function(){for(var r=+new Date,i=0;i<Ee.length;i++){var n=Ee[i];if(!n.el.removed&&!n.paused){var a=r-n.start,s=n.ms,o=n.easing,l=n.from,h=n.diff,u=n.to,c=n.t,f=n.el,p={},d,g={},x;if(n.initstatus?(a=(n.initstatus*n.anim.top-n.prev)/(n.percent-n.prev)*s,n.status=n.initstatus,delete n.initstatus,n.stop&&Ee.splice(i--,1)):n.status=(n.prev+(n.percent-n.prev)*(a/s))/n.anim.top,!(0>a))if(s>a){var v=o(a/s);for(var y in l)if(l[T](y)){switch(pt[y]){case $:d=+l[y]+v*s*h[y];break;case"colour":d="rgb("+[Le(ot(l[y].r+v*s*h[y].r)),Le(ot(l[y].g+v*s*h[y].g)),Le(ot(l[y].b+v*s*h[y].b))].join(",")+")";break;case"path":d=[];for(var m=0,_=l[y].length;_>m;m++){d[m]=[l[y][m][0]];for(var w=1,k=l[y][m].length;k>w;w++)d[m][w]=+l[y][m][w]+v*s*h[y][m][w];d[m]=d[m].join(I)}d=d.join(I);break;case"transform":if(h[y].real)for(d=[],m=0,_=l[y].length;_>m;m++)for(d[m]=[l[y][m][0]],w=1,k=l[y][m].length;k>w;w++)d[m][w]=l[y][m][w]+v*s*h[y][m][w];else{var B=function(t){return+l[y][t]+v*s*h[y][t]};d=[["m",B(0),B(1),B(2),B(3),B(4),B(5)]]}break;case"csv":if("clip-rect"==y)for(d=[],m=4;m--;)d[m]=+l[y][m]+v*s*h[y][m];break;default:var C=[][P](l[y]);for(d=[],m=f.paper.customAttributes[y].length;m--;)d[m]=+C[m]+v*s*h[y][m]}p[y]=d}f.attr(p),function(e,r,i){setTimeout(function(){t("raphael.anim.frame."+e,r,i)})}(f.id,f,n.anim)}else{if(function(r,i,n){setTimeout(function(){t("raphael.anim.frame."+i.id,i,n),t("raphael.anim.finish."+i.id,i,n),e.is(r,"function")&&r.call(i)})}(n.callback,f,n.anim),f.attr(u),Ee.splice(i--,1),n.repeat>1&&!n.next){for(x in u)u[T](x)&&(g[x]=n.totalOrigin[x]);n.el.attr(g),b(n.anim,n.el,n.anim.percents[0],null,n.totalOrigin,n.repeat-1)}n.next&&!n.stop&&b(n.anim,n.el,n.next,null,n.totalOrigin,n.repeat)}}}Ee.length&&Ne(Me)},Le=function(t){return t>255?255:0>t?0:t};ye.animateWith=function(t,r,i,n,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var l=i instanceof m?i:e.animation(i,n,a,s),h,u;b(l,o,l.percents[0],null,o.attr());for(var c=0,f=Ee.length;f>c;c++)if(Ee[c].anim==r&&Ee[c].el==t){Ee[f-1].start=Ee[c].start;break}return o},ye.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},m.prototype.delay=function(t){var e=new m(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},m.prototype.repeat=function(t){var e=new m(this.anim,this.ms);return e.del=this.del,e.times=Y.floor(W(t,0))||1,e},e.animation=function(t,r,i,n){if(t instanceof m)return t;!e.is(i,"function")&&i||(n=n||i||null,i=null),t=Object(t),r=+r||0;var a={},s,o;for(o in t)t[T](o)&&ht(o)!=o&&ht(o)+"%"!=o&&(s=!0,a[o]=t[o]);if(s)return i&&(a.easing=i),n&&(a.callback=n),new m({100:a},r);if(n){var l=0;for(var h in t){var u=ut(h);t[T](h)&&u>l&&(l=u)}l+="%",!t[l].callback&&(t[l].callback=n)}return new m(t,r)},ye.animate=function(t,r,i,n){var a=this;if(a.removed)return n&&n.call(a),a;var s=t instanceof m?t:e.animation(t,r,i,n);return b(s,a,s.percents[0],null,a.attr()),a},ye.setTime=function(t,e){return t&&null!=e&&this.status(t,G(e,t.ms)/t.ms),this},ye.status=function(t,e){var r=[],i=0,n,a;if(null!=e)return b(t,this,-1,G(e,1)),this;for(n=Ee.length;n>i;i++)if(a=Ee[i],a.el.id==this.id&&(!t||a.anim==t)){if(t)return a.status;r.push({anim:a.anim,status:a.status})}return t?0:r},ye.pause=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.pause."+this.id,this,Ee[r].anim)!==!1&&(Ee[r].paused=!0);return this},ye.resume=function(e){for(var r=0;r<Ee.length;r++)if(Ee[r].el.id==this.id&&(!e||Ee[r].anim==e)){var i=Ee[r];t("raphael.anim.resume."+this.id,this,i.anim)!==!1&&(delete i.paused,this.status(i.anim,i.status))}return this},ye.stop=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.stop."+this.id,this,Ee[r].anim)!==!1&&Ee.splice(r--,1);return this},t.on("raphael.remove",_),t.on("raphael.clear",_),ye.toString=function(){return"Raphaël’s object"};var ze=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,r=t.length;r>e;e++)!t[e]||t[e].constructor!=ye.constructor&&t[e].constructor!=ze||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},Pe=ze.prototype;Pe.push=function(){for(var t,e,r=0,i=arguments.length;i>r;r++)t=arguments[r],!t||t.constructor!=ye.constructor&&t.constructor!=ze||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},Pe.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},Pe.forEach=function(t,e){for(var r=0,i=this.items.length;i>r;r++)if(t.call(e,this.items[r],r)===!1)return this;return this};for(var Fe in ye)ye[T](Fe)&&(Pe[Fe]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t][z](r,e)})}}(Fe));return Pe.attr=function(t,r){if(t&&e.is(t,Q)&&e.is(t[0],"object"))for(var i=0,n=t.length;n>i;i++)this.items[i].attr(t[i]);else for(var a=0,s=this.items.length;s>a;a++)this.items[a].attr(t,r);return this},Pe.clear=function(){for(;this.length;)this.pop()},Pe.splice=function(t,e,r){t=0>t?W(this.length+t,0):t,e=W(0,G(this.length-t,e));var i=[],n=[],a=[],s;for(s=2;s<arguments.length;s++)a.push(arguments[s]);for(s=0;e>s;s++)n.push(this[t+s]);for(;s<this.length-t;s++)i.push(this[t+s]);var o=a.length;for(s=0;s<o+i.length;s++)this.items[t+s]=this[t+s]=o>s?a[s]:i[s-o];for(s=this.items.length=this.length-=e-o;this[s];)delete this[s++];return new ze(n)},Pe.exclude=function(t){for(var e=0,r=this.length;r>e;e++)if(this[e]==t)return this.splice(e,1),!0},Pe.animate=function(t,r,i,n){(e.is(i,"function")||!i)&&(n=i||null);var a=this.items.length,s=a,o,l=this,h;if(!a)return this;n&&(h=function(){!--a&&n.call(l)}),i=e.is(i,Z)?i:h;var u=e.animation(t,r,i,h);for(o=this.items[--s].animate(u);s--;)this.items[s]&&!this.items[s].removed&&this.items[s].animateWith(o,u,u),this.items[s]&&!this.items[s].removed||a--;return this},Pe.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},Pe.getBBox=function(){for(var t=[],e=[],r=[],i=[],n=this.items.length;n--;)if(!this.items[n].removed){var a=this.items[n].getBBox();t.push(a.x),e.push(a.y),r.push(a.x+a.width),i.push(a.y+a.height)}return t=G[z](0,t),e=G[z](0,e),r=W[z](0,r),i=W[z](0,i),{x:t,y:e,x2:r,y2:i,width:r-t,height:i-e}},Pe.clone=function(t){t=this.paper.set();for(var e=0,r=this.items.length;r>e;e++)t.push(this.items[e].clone());return t},Pe.toString=function(){return"Raphaël‘s set"},Pe.glow=function(t){var e=this.paper.set();return this.forEach(function(r,i){var n=r.glow(t);null!=n&&n.forEach(function(t,r){e.push(t)})}),e},Pe.isPointInside=function(t,e){var r=!1;return this.forEach(function(i){return i.isPointInside(t,e)?(r=!0,!1):void 0}),r},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},r=t.face["font-family"];for(var i in t.face)t.face[T](i)&&(e.face[i]=t.face[i]);if(this.fonts[r]?this.fonts[r].push(e):this.fonts[r]=[e],!t.svg){e.face["units-per-em"]=ut(t.face["units-per-em"],10);for(var n in t.glyphs)if(t.glyphs[T](n)){var a=t.glyphs[n];if(e.glyphs[n]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[T](s)&&(e.glyphs[n].k[s]=a.k[s])}}return t},M.getFont=function(t,r,i,n){if(n=n||"normal",i=i||"normal",r=+r||{normal:400,bold:700,lighter:300,bolder:800}[r]||400,e.fonts){var a=e.fonts[t];if(!a){var s=new RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,R)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[T](o)&&s.test(o)){a=e.fonts[o];break}}var l;if(a)for(var h=0,u=a.length;u>h&&(l=a[h],l.face["font-weight"]!=r||l.face["font-style"]!=i&&l.face["font-style"]||l.face["font-stretch"]!=n);h++);return l}},M.print=function(t,r,i,n,a,s,o,l){s=s||"middle",o=W(G(o||0,1),-1),l=W(G(l||1,3),1);var h=j(i)[q](R),u=0,c=0,f=R,p;if(e.is(n,"string")&&(n=this.getFont(n)),n){p=(a||16)/n.face["units-per-em"];for(var d=n.face.bbox[q](k),g=+d[0],x=d[3]-d[1],v=0,y=+d[1]+("baseline"==s?x+ +n.face.descent:x/2),m=0,b=h.length;b>m;m++){if("\n"==h[m])u=0,w=0,c=0,v+=x*l;else{var _=c&&n.glyphs[h[m-1]]||{},w=n.glyphs[h[m]];u+=c?(_.w||n.w)+(_.k&&_.k[h[m]]||0)+n.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",u*p,v*p,"s",p,p,g,y,"t",(t-g)/p,(r-y)/p]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},M.add=function(t){if(e.is(t,"array"))for(var r=this.set(),i=0,n=t.length,a;n>i;i++)a=t[i]||{},B[T](a.type)&&r.push(this[a.type]().attr(a));return r},e.format=function(t,r){var i=e.is(r,Q)?[0][P](r):arguments;return t&&e.is(t,Z)&&i.length-1&&(t=t.replace(C,function(t,e){return null==i[++e]?R:i[e]})),t||R},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,r=function(t,r,i){var n=i;return r.replace(e,function(t,e,r,i,a){e=e||i,n&&(e in n&&(n=n[e]),"function"==typeof n&&a&&(n=n()))}),n=(null==n||n==i?t:n)+""};return function(e,i){return String(e).replace(t,function(t,e){return r(t,e,i)})}}(),e.ninja=function(){if(E.was)A.win.Raphael=E.is;else{window.Raphael=void 0;try{delete window.Raphael}catch(t){}}return e},e.st=Pe,t.on("raphael.DOMload",function(){w=!0}),function(t,r,i){function n(){/in/.test(t.readyState)?setTimeout(n,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(r,i=function(){t.removeEventListener(r,i,!1),t.readyState="complete"},!1),t.readyState="loading"),n()}(document,"DOMContentLoaded"),e}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;!function(r){var a="0.4.2",s="hasOwnProperty",o=/[\.\/]/,l="*",h=function(){},u=function(t,e){return t-e},c,f,p={n:{}},d=function(t,e){t=String(t);var r=p,i=f,n=Array.prototype.slice.call(arguments,2),a=d.listeners(t),s=0,o=!1,l,h=[],g={},x=[],v=c,y=[];c=t,f=0;for(var m=0,b=a.length;b>m;m++)"zIndex"in a[m]&&(h.push(a[m].zIndex),a[m].zIndex<0&&(g[a[m].zIndex]=a[m]));for(h.sort(u);h[s]<0;)if(l=g[h[s++]],x.push(l.apply(e,n)),f)return f=i,x;for(m=0;b>m;m++)if(l=a[m],"zIndex"in l)if(l.zIndex==h[s]){if(x.push(l.apply(e,n)),f)break;do if(s++,l=g[h[s]],l&&x.push(l.apply(e,n)),f)break;while(l)}else g[l.zIndex]=l;else if(x.push(l.apply(e,n)),f)break;return f=i,c=v,x.length?x:null};d._events=p,d.listeners=function(t){var e=t.split(o),r=p,i,n,a,s,h,u,c,f,d=[r],g=[];for(s=0,h=e.length;h>s;s++){for(f=[],u=0,c=d.length;c>u;u++)for(r=d[u].n,n=[r[e[s]],r[l]],a=2;a--;)i=n[a],i&&(f.push(i),g=g.concat(i.f||[]));d=f}return g},d.on=function(t,e){if(t=String(t),"function"!=typeof e)return function(){};for(var r=t.split(o),i=p,n=0,a=r.length;a>n;n++)i=i.n,i=i.hasOwnProperty(r[n])&&i[r[n]]||(i[r[n]]={n:{}});for(i.f=i.f||[],n=0,a=i.f.length;a>n;n++)if(i.f[n]==e)return h;return i.f.push(e),function(t){+t==+t&&(e.zIndex=+t)}},d.f=function(t){var e=[].slice.call(arguments,1);return function(){d.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},d.stop=function(){f=1},d.nt=function(t){return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(c):c},d.nts=function(){return c.split(o)},d.off=d.unbind=function(t,e){if(!t)return void(d._events=p={n:{}});var r=t.split(o),i,n,a,h,u,c,f,g=[p];for(h=0,u=r.length;u>h;h++)for(c=0;c<g.length;c+=a.length-2){if(a=[c,1],i=g[c].n,r[h]!=l)i[r[h]]&&a.push(i[r[h]]);else for(n in i)i[s](n)&&a.push(i[n]);g.splice.apply(g,a)}for(h=0,u=g.length;u>h;h++)for(i=g[h];i.n;){if(e){if(i.f){for(c=0,f=i.f.length;f>c;c++)if(i.f[c]==e){i.f.splice(c,1);break}!i.f.length&&delete i.f}for(n in i.n)if(i.n[s](n)&&i.n[n].f){var x=i.n[n].f;for(c=0,f=x.length;f>c;c++)if(x[c]==e){x.splice(c,1);break}!x.length&&delete i.n[n].f}}else{delete i.f;for(n in i.n)i.n[s](n)&&i.n[n].f&&delete i.n[n].f}i=i.n}},d.once=function(t,e){var r=function(){return d.unbind(t,r),e.apply(this,arguments)};return d.on(t,r)},d.version=a,d.toString=function(){return"You are running Eve "+a},"undefined"!=typeof t&&t.exports?t.exports=d:(i=[],n=function(){return d}.apply(e,i),!(void 0!==n&&(t.exports=n)))}(this)},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.svg){var e="hasOwnProperty",r=String,i=parseFloat,n=parseInt,a=Math,s=a.max,o=a.abs,l=a.pow,h=/[, ]+/,u=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var x=function(i,n){if(n){"string"==typeof i&&(i=x(i));for(var a in n)n[e](a)&&("xlink:"==a.substring(0,6)?i.setAttributeNS(p,a.substring(6),r(n[a])):i.setAttribute(a,r(n[a])))}else i=t._g.doc.createElementNS("http://www.w3.org/2000/svg",i),i.style&&(i.style.webkitTapHighlightColor="rgba(0,0,0,0)");return i},v=function(e,n){var h="linear",u=e.id+n,f=.5,p=.5,d=e.node,g=e.paper,v=d.style,y=t._g.doc.getElementById(u);if(!y){if(n=r(n).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=i(e),p=i(r);var n=2*(p>.5)-1;l(f-.5,2)+l(p-.5,2)>.25&&(p=a.sqrt(.25-l(f-.5,2))*n+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*n)}return c}),n=n.split(/\s*\-\s*/),"linear"==h){var b=n.shift();if(b=-i(b),isNaN(b))return null;var _=[0,0,a.cos(t.rad(b)),a.sin(t.rad(b))],w=1/(s(o(_[2]),o(_[3]))||1);_[2]*=w,_[3]*=w,_[2]<0&&(_[0]=-_[2],_[2]=0),_[3]<0&&(_[1]=-_[3],_[3]=0)}var k=t._parseDots(n);if(!k)return null;if(u=u.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&u!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=x(h+"Gradient",{id:u}),e.gradient=y,x(y,"radial"==h?{fx:f,fy:p}:{x1:_[0],y1:_[1],x2:_[2],y2:_[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var B=0,C=k.length;C>B;B++)y.appendChild(x("stop",{offset:k[B].offset?k[B].offset:B?"100%":"0%","stop-color":k[B].color||"#fff","stop-opacity":isFinite(k[B].opacity)?k[B].opacity:1}))}}return x(d,{fill:m(u),opacity:1,"fill-opacity":1}),v.fill=c,v.opacity=1,v.fillOpacity=1,1},y=function(){var t=document.documentMode;return t&&(9===t||10===t)},m=function(t){if(y())return"url('#"+t+"')";var e=document.location,r=e.protocol+"//"+e.host+e.pathname+e.search;return"url('"+r+"#"+t+"')"},b=function(t){var e=t.getBBox(1);x(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},_=function(i,n,a){if("path"==i.type){for(var s=r(n).toLowerCase().split("-"),o=i.paper,l=a?"end":"start",h=i.node,u=i.attrs,f=u["stroke-width"],p=s.length,v="classic",y,m,b,_,w,k=3,B=3,C=5;p--;)switch(s[p]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":v=s[p];break;case"wide":B=5;break;case"narrow":B=2;break;case"long":k=5;break;case"short":k=2}if("open"==v?(k+=2,B+=2,C+=2,b=1,_=a?4:1,w={fill:"none",stroke:u.stroke}):(_=b=k/2,w={fill:u.stroke,stroke:"none"}),i._.arrows?a?(i._.arrows.endPath&&g[i._.arrows.endPath]--,i._.arrows.endMarker&&g[i._.arrows.endMarker]--):(i._.arrows.startPath&&g[i._.arrows.startPath]--,i._.arrows.startMarker&&g[i._.arrows.startMarker]--):i._.arrows={},"none"!=v){var S="raphael-marker-"+v,T="raphael-marker-"+l+v+k+B+"-obj"+i.id;t._g.doc.getElementById(S)?g[S]++:(o.defs.appendChild(x(x("path"),{"stroke-linecap":"round",d:d[v],id:S})),g[S]=1);var A=t._g.doc.getElementById(T),E;A?(g[T]++,E=A.getElementsByTagName("use")[0]):(A=x(x("marker"),{id:T,markerHeight:B,markerWidth:k,orient:"auto",refX:_,refY:B/2}),E=x(x("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+B/2+") ":c)+"scale("+k/C+","+B/C+")","stroke-width":(1/((k/C+B/C)/2)).toFixed(4)}),A.appendChild(E),o.defs.appendChild(A),g[T]=1),x(E,w);var N=b*("diamond"!=v&&"oval"!=v);a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-N*f):(y=N*f,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),w={},w["marker-"+l]="url(#"+T+")",(m||y)&&(w.d=t.getSubpath(u.path,y,m)),x(h,w),i._.arrows[l+"Path"]=S,i._.arrows[l+"Marker"]=T,i._.arrows[l+"dx"]=N,i._.arrows[l+"Type"]=v,i._.arrows[l+"String"]=n}else a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-y):(y=0,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),i._.arrows[l+"Path"]&&x(h,{d:t.getSubpath(u.path,y,m)}),delete i._.arrows[l+"Path"],delete i._.arrows[l+"Marker"],delete i._.arrows[l+"dx"],delete i._.arrows[l+"Type"],delete i._.arrows[l+"String"];for(w in g)if(g[e](w)&&!g[w]){var M=t._g.doc.getElementById(w);M&&M.parentNode.removeChild(M)}}},w={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},k=function(t,e,i){if(e=w[r(e).toLowerCase()]){for(var n=t.attrs["stroke-width"]||"1",a={round:n,square:n,butt:0}[t.attrs["stroke-linecap"]||i["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*n+(o%2?1:-1)*a;x(t.node,{"stroke-dasharray":s.join(",")})}else x(t.node,{"stroke-dasharray":"none"})},B=function(i,a){var l=i.node,u=i.attrs,f=l.style.visibility;l.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(u[d]=g,d){case"blur":i.blur(g);break;case"title":var y=l.getElementsByTagName("title");if(y.length&&(y=y[0]))y.firstChild.nodeValue=g;else{y=x("title");var m=t._g.doc.createTextNode(g);y.appendChild(m),l.appendChild(y)}break;case"href":case"target":var w=l.parentNode;if("a"!=w.tagName.toLowerCase()){var B=x("a");w.insertBefore(B,l),B.appendChild(l),w=B}"target"==d?w.setAttributeNS(p,"show","blank"==g?"new":g):w.setAttributeNS(p,d,g);break;case"cursor":l.style.cursor=g;break;case"transform":i.transform(g);break;case"arrow-start":_(i,g);break;case"arrow-end":_(i,g,1);break;case"clip-rect":var C=r(g).split(h);if(4==C.length){i.clip&&i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var T=x("clipPath"),A=x("rect");T.id=t.createUUID(),x(A,{x:C[0],y:C[1],width:C[2],height:C[3]}),T.appendChild(A),i.paper.defs.appendChild(T),x(l,{"clip-path":"url(#"+T.id+")"}),i.clip=A}if(!g){var E=l.getAttribute("clip-path");if(E){var N=t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,c));N&&N.parentNode.removeChild(N),x(l,{"clip-path":c}),delete i.clip}}break;case"path":"path"==i.type&&(x(l,{d:g?u.path=t._pathToAbsolute(g):"M0,0"}),i._.dirty=1,i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1)));break;case"width":if(l.setAttribute(d,g),i._.dirty=1,!u.fx)break;d="x",g=u.x;case"x":u.fx&&(g=-u.x-(u.width||0));case"rx":if("rx"==d&&"rect"==i.type)break;case"cx":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"height":if(l.setAttribute(d,g),i._.dirty=1,!u.fy)break;d="y",g=u.y;case"y":u.fy&&(g=-u.y-(u.height||0));case"ry":if("ry"==d&&"rect"==i.type)break;case"cy":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"r":"rect"==i.type?x(l,{rx:g,ry:g}):l.setAttribute(d,g),i._.dirty=1;break;case"src":"image"==i.type&&l.setAttributeNS(p,"href",g);break;case"stroke-width":1==i._.sx&&1==i._.sy||(g/=s(o(i._.sx),o(i._.sy))||1),l.setAttribute(d,g),u["stroke-dasharray"]&&k(i,u["stroke-dasharray"],a),i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"stroke-dasharray":k(i,g,a);break;case"fill":var M=r(g).match(t._ISURL);if(M){T=x("pattern");var L=x("image");T.id=t.createUUID(),x(T,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),x(L,{x:0,y:0,"xlink:href":M[1]}),T.appendChild(L),function(e){t._preload(M[1],function(){var t=this.offsetWidth,r=this.offsetHeight;x(e,{width:t,height:r}),x(L,{width:t,height:r})})}(T),i.paper.defs.appendChild(T),x(l,{fill:"url(#"+T.id+")"}),i.pattern=T,i.pattern&&b(i);break}var z=t.getRGB(g);if(z.error){if(("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&v(i,g)){
if("opacity"in u||"fill-opacity"in u){var P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(P){var F=P.getElementsByTagName("stop");x(F[F.length-1],{"stop-opacity":("opacity"in u?u.opacity:1)*("fill-opacity"in u?u["fill-opacity"]:1)})}}u.gradient=g,u.fill="none";break}}else delete a.gradient,delete u.gradient,!t.is(u.opacity,"undefined")&&t.is(a.opacity,"undefined")&&x(l,{opacity:u.opacity}),!t.is(u["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&x(l,{"fill-opacity":u["fill-opacity"]});z[e]("opacity")&&x(l,{"fill-opacity":z.opacity>1?z.opacity/100:z.opacity});case"stroke":z=t.getRGB(g),l.setAttribute(d,z.hex),"stroke"==d&&z[e]("opacity")&&x(l,{"stroke-opacity":z.opacity>1?z.opacity/100:z.opacity}),"stroke"==d&&i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"gradient":("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&v(i,g);break;case"opacity":u.gradient&&!u[e]("stroke-opacity")&&x(l,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(u.gradient){P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c)),P&&(F=P.getElementsByTagName("stop"),x(F[F.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=n(g,10)+"px");var R=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});l.style[R]=g,i._.dirty=1,l.setAttribute(d,g)}}S(i,a),l.style.visibility=f},C=1.2,S=function(i,a){if("text"==i.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=i.attrs,o=i.node,l=o.firstChild?n(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h=r(a.text).split("\n"),u=[],f,p=0,d=h.length;d>p;p++)f=x("tspan"),p&&x(f,{dy:l*C,x:s.x}),f.appendChild(t._g.doc.createTextNode(h[p])),o.appendChild(f),u[p]=f}else for(u=o.getElementsByTagName("tspan"),p=0,d=u.length;d>p;p++)p?x(u[p],{dy:l*C,x:s.x}):x(u[0],{dy:0});x(o,{x:s.x,y:s.y}),i._.dirty=1;var g=i._getBBox(),v=s.y-(g.y+g.height/2);v&&t.is(v,"finite")&&x(u[0],{dy:v})}},T=function(t){return t.parentNode&&"a"===t.parentNode.tagName.toLowerCase()?t.parentNode:t},A=function(e,r){var i=0,n=0;this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;A.prototype=E,E.constructor=A,t._engine.path=function(t,e){var r=x("path");e.canvas&&e.canvas.appendChild(r);var i=new A(r,e);return i.type="path",B(i,{fill:"none",stroke:"#000",path:t}),i},E.rotate=function(t,e,n){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,n]])),this},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3])),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this},E.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},E.transform=function(r){var i=this._;if(null==r)return i.transform;if(t._extractTransform(this,r),this.clip&&x(this.clip,{transform:this.matrix.invert()}),this.pattern&&b(this),this.node&&x(this.node,{transform:this.matrix}),1!=i.sx||1!=i.sy){var n=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":n})}return i.transform=this.matrix.toTransformString(),this},E.hide=function(){return this.removed||(this.node.style.display="none"),this},E.show=function(){return this.removed||(this.node.style.display=""),this},E.remove=function(){var e=T(this.node);if(!this.removed&&e.parentNode){var r=this.paper;r.__set__&&r.__set__.exclude(this),u.unbind("raphael.*.*."+this.id),this.gradient&&r.defs.removeChild(this.gradient),t._tear(this,r),e.parentNode.removeChild(e),this.removeData();for(var i in this)this[i]="function"==typeof this[i]?t._removedFactory(i):null;this.removed=!0}},E._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e=!1,r;this.paper.canvas.parentElement?r=this.paper.canvas.parentElement.style:this.paper.canvas.parentNode&&(r=this.paper.canvas.parentNode.style),r&&"none"==r.display&&(e=!0,r.display="");var i={};try{i=this.node.getBBox()}catch(n){i={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}finally{i=i||{},e&&(r.display="none")}return t&&this.hide(),i},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},l=0,c=s.length;c>l;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==i&&t.is(r,"array")){for(o={},l=0,c=r.length;c>l;l++)o[r[l]]=this.attr(r[l]);return o}if(null!=i){var f={};f[r]=i}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)u("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return B(this,f),this},E.toFront=function(){if(this.removed)return this;var e=T(this.node);e.parentNode.appendChild(e);var r=this.paper;return r.top!=this&&t._tofront(this,r),this},E.toBack=function(){if(this.removed)return this;var e=T(this.node),r=e.parentNode;r.insertBefore(e,r.firstChild),t._toback(this,this.paper);var i=this.paper;return this},E.insertAfter=function(e){if(this.removed||!e)return this;var r=T(this.node),i=T(e.node||e[e.length-1].node);return i.nextSibling?i.parentNode.insertBefore(r,i.nextSibling):i.parentNode.appendChild(r),t._insertafter(this,e,this.paper),this},E.insertBefore=function(e){if(this.removed||!e)return this;var r=T(this.node),i=T(e.node||e[0].node);return i.parentNode.insertBefore(r,i),t._insertbefore(this,e,this.paper),this},E.blur=function(e){var r=this;if(0!==+e){var i=x("filter"),n=x("feGaussianBlur");r.attrs.blur=e,i.id=t.createUUID(),x(n,{stdDeviation:+e||1.5}),i.appendChild(n),r.paper.defs.appendChild(i),r._blur=i,x(r.node,{filter:"url(#"+i.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter");return r},t._engine.circle=function(t,e,r,i){var n=x("circle");t.canvas&&t.canvas.appendChild(n);var a=new A(n,t);return a.attrs={cx:e,cy:r,r:i,fill:"none",stroke:"#000"},a.type="circle",x(n,a.attrs),a},t._engine.rect=function(t,e,r,i,n,a){var s=x("rect");t.canvas&&t.canvas.appendChild(s);var o=new A(s,t);return o.attrs={x:e,y:r,width:i,height:n,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",x(s,o.attrs),o},t._engine.ellipse=function(t,e,r,i,n){var a=x("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new A(a,t);return s.attrs={cx:e,cy:r,rx:i,ry:n,fill:"none",stroke:"#000"},s.type="ellipse",x(a,s.attrs),s},t._engine.image=function(t,e,r,i,n,a){var s=x("image");x(s,{x:r,y:i,width:n,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new A(s,t);return o.attrs={x:r,y:i,width:n,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,i,n){var a=x("text");e.canvas&&e.canvas.appendChild(a);var s=new A(a,e);return s.attrs={x:r,y:i,"text-anchor":"middle",text:n,"font-family":t._availableAttrs["font-family"],"font-size":t._availableAttrs["font-size"],stroke:"none",fill:"#000"},s.type="text",B(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,i=e.x,n=e.y,a=e.width,s=e.height;if(!r)throw new Error("SVG container not found.");var o=x("svg"),l="overflow:hidden;",h;return i=i||0,n=n||0,a=a||512,s=s||342,x(o,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),1==r?(o.style.cssText=l+"position:absolute;left:"+i+"px;top:"+n+"px",t._g.doc.body.appendChild(o),h=1):(o.style.cssText=l+"position:relative",r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o)),r=new t._Paper,r.width=a,r.height=s,r.canvas=o,r.clear(),r._left=r._top=0,h&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,i,n){u("raphael.setViewBox",this,this._viewBox,[t,e,r,i,n]);var a=this.getSize(),o=s(r/a.width,i/a.height),l=this.top,h=n?"xMidYMid meet":"xMinYMin",c,p;for(null==t?(this._vbSize&&(o=1),delete this._vbSize,c="0 0 "+this.width+f+this.height):(this._vbSize=o,c=t+f+e+f+r+f+i),x(this.canvas,{viewBox:c,preserveAspectRatio:h});o&&l;)p="stroke-width"in l.attrs?l.attrs["stroke-width"]:1,l.attr({"stroke-width":p}),l._.dirty=1,l._.dirtyT=1,l=l.prev;return this._viewBox=[t,e,r,i,!!n],this},t.prototype.renderfix=function(){var t=this.canvas,e=t.style,r;try{r=t.getScreenCTM()||t.createSVGMatrix()}catch(i){r=t.createSVGMatrix()}var n=-r.e%1,a=-r.f%1;(n||a)&&(n&&(this._left=(this._left+n)%1,e.left=this._left+"px"),a&&(this._top=(this._top+a)%1,e.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=x("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=x("defs"))},t.prototype.remove=function(){u("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var N=t.st;for(var M in E)E[e](M)&&!N[e](M)&&(N[M]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(M))}}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},x=/([clmz]),?([^clmz]*)/gi,v=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(x,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o=n(e),l,h;s=[];for(var u=0,c=o.length;c>u;u++){l=o[u],h=o[u][0].toLowerCase(),"z"==h&&(h="x");for(var f=1,v=l.length;v>f;f++)h+=a(l[f]*b)+(f!=v-1?",":d);s.push(h)}return s.join(p)},B=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},C=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",x,v=b/e,y=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(v)+p+l(y),f.rotation=a*(0>e*r?-1:1),a){var m=B(a,i,n);i=m.dx,n=m.dy}if(0>e&&(g+="x"),0>r&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-v+p+n*-y,u||s.fillsize){var _=c.getElementsByTagName(h);_=_&&_[0],c.removeChild(_),u&&(m=B(a,o.x(u[0],u[1]),o.y(u[0],u[1])),_.position=m.dx*d+p+m.dy*d),s.fillsize&&(_.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(_)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},T=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,x,v=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),y=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),m=n;for(var B in l)l[e](B)&&(f[B]=l[B]);if(v&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||v)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),n._.dirty=1,"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],C(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),y){var T=+f.cx,E=+f.cy,N=+f.rx||+f.r||0,L=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((T-N)*b),a((E-L)*b),a((T+N)*b),a((E+L)*b),a(T*b)),n._.dirty=1}if("clip-rect"in l){var z=r(l["clip-rect"]).split(u);if(4==z.length){z[2]=+z[2]+ +z[0],z[3]=+z[3]+ +z[1];var P=c.clipRect||t._g.doc.createElement("div"),F=P.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",z),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(P,c),P.appendChild(c),c.clipRect=P)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(m,l["arrow-start"]),"arrow-end"in l&&S(m,l["arrow-end"],1),null!=l.opacity||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var I=c.getElementsByTagName(h),j=!1;if(I=I&&I[0],!I&&(j=I=M(h)),"image"==n.type&&l.src&&(I.src=l.src),l.fill&&(I.on=!0),null!=I.on&&"none"!=l.fill&&null!==l.fill||(I.on=!1),I.on&&l.fill){var q=r(l.fill).match(t._ISURL);if(q){I.parentNode==c&&c.removeChild(I),I.rotate=!0,I.src=q[1],I.type="tile";var D=n.getBBox(1);I.position=D.x+p+D.y,n._.fillpos=[D.x,D.y],t._preload(q[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else I.color=t.getRGB(l.fill).hex,I.src=d,I.type="solid",t.getRGB(l.fill).error&&(m.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&A(m,l.fill,I)&&(f.fill="none",f.gradient=l.fill,I.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var V=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);V=o(s(V,0),1),I.opacity=V,I.src&&(I.color="none")}c.appendChild(I);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],Y=!1;!O&&(Y=O=M("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var W=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=W.hex),V=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+W.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(V=o(s(V,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&1>G&&(V*=G)&&(O.weight=1),O.opacity=V,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),"stroke-dasharray"in l){var H={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=H[e](l["stroke-dasharray"])?H[l["stroke-dasharray"]]:d}Y&&c.appendChild(O)}if("text"==m.type){m.paper.canvas.style.display=d;var X=m.paper.span,U=100,$=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),$=i(f["font-size"]||$&&$[0])||10,g.fontSize=$*U+"px",m.textpath.string&&(X.innerHTML=r(m.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Z=X.getBoundingClientRect();m.W=f.w=(Z.right-Z.left)/U,m.H=f.h=(Z.bottom-Z.top)/U,m.X=f.x,m.Y=f.y+m.H/2,("x"in l||"y"in l)&&(m.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Q=["x","y","text","font","font-family","font-weight","font-style","font-size"],J=0,K=Q.length;K>J;J++)if(Q[J]in l){m._.dirty=1;break}switch(f["text-anchor"]){case"start":m.textpath.style["v-text-align"]="left",m.bbx=m.W/2;break;case"end":m.textpath.style["v-text-align"]="right",m.bbx=-m.W/2;break;default:m.textpath.style["v-text-align"]="center",m.bbx=0}m.textpath.style["v-text-kern"]=!0}},A=function(e,a,s){e.attrs=e.attrs||{};var o=e.attrs,l=Math.pow,h,u,c="linear",f=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return c="radial",e&&r&&(e=i(e),r=i(r),l(e-.5,2)+l(r-.5,2)>.25&&(r=n.sqrt(.25-l(e-.5,2))*(2*(r>.5)-1)+.5),f=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==c){var g=a.shift();if(g=-i(g),isNaN(g))return null}var x=t._parseDots(a);if(!x)return null;if(e=e.shape||e.node,x.length){e.removeChild(s),s.on=!0,s.method="none",s.color=x[0].color,s.color2=x[x.length-1].color;for(var v=[],y=0,m=x.length;m>y;y++)x[y].offset&&v.push(x[y].offset+p+x[y].color);s.colors=v.length?v.join():"0% "+s.color,"radial"==c?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=f,s.angle=0):(s.type="gradient",s.angle=(270-g)%360),e.appendChild(s)}return 1},E=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},N=t.el;E.prototype=N,N.constructor=E,N.transform=function(e){if(null==e)return this._.transform;var i=this.paper._viewBoxShift,n=i?"s"+[i.scale,i.scale]+"-1-1t"+[i.dx,i.dy]:d,a;i&&(a=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,n+e);var s=this.matrix.clone(),o=this.skew,l=this.node,h,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(s.translate(1,1),c||u||"image"==this.type)if(o.matrix="1 0 0 1",o.offset="0 0",h=s.split(),u&&h.noRotation||!h.isSimple){l.style.filter=s.toFilter();var f=this.getBBox(),g=this.getBBox(1),x=f.x-g.x,v=f.y-g.y;l.coordorigin=x*-b+p+v*-b,C(this,1,1,x,v,0)}else l.style.filter=d,C(this,h.scalex,h.scaley,h.dx,h.dy,h.rotate);else l.style.filter=d,o.matrix=r(s),o.offset=s.offset();return null!==a&&(this._.transform=a,t._extractTransform(this,a)),this},N.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},N.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},N.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},N.hide=function(){return!this.removed&&(this.node.style.display="none"),this},N.show=function(){return!this.removed&&(this.node.style.display=d),this},N.auxGetBBox=t.el.getBBox,N.getBBox=function(){var t=this.auxGetBBox();if(this.paper&&this.paper._viewBoxShift){var e={},r=1/this.paper._viewBoxShift.scale;return e.x=t.x-this.paper._viewBoxShift.dx,e.x*=r,e.y=t.y-this.paper._viewBoxShift.dy,e.y*=r,e.width=t.width*r,e.height=t.height*r,e.x2=e.x+e.width,e.y2=e.y+e.height,e}return t},N._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},N.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},N.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;f>l;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;f>l;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var x in g)g[e](x)&&(p[x]=g[x])}p.text&&"text"==this.type&&(this.textpath.string=p.text),T(this,p)}return this},N.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},N.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},N.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},N.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},N.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;return i=i.replace(v,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur),this},t._engine.path=function(t,e){var r=M("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new E(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,T(i,n),e.canvas&&e.canvas.appendChild(r);var a=M("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path(),s=a.attrs;return a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",T(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path(),a=n.attrs;return n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",T(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),C(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=M("shape"),l=M("path"),h=M("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new E(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,T(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=M("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var s=this.getSize(),o=s.width,l=s.height,h,u;return a&&(h=l/n,u=o/i,o>i*h&&(e-=(o-i*h)/2/h),l>n*u&&(r-=(l-n*u)/2/u)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:s},this.forEach(function(t){t.transform("...")}),this};var M;t._engine.initWin=function(t){var e=t.document;e.styleSheets.length<31?e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"):e.styleSheets[0].addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),M=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){M=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n,a=e.width,s=e.x,o=e.y;if(!r)throw new Error("VML container not found.");var l=new t._Paper,h=l.canvas=t._g.doc.createElement("div"),u=h.style;return s=s||0,o=o||0,a=a||512,i=i||342,l.width=a,l.height=i,a==+a&&(a+="px"),i==+i&&(i+="px"),l.coordsize=1e3*b+p+1e3*b,l.coordorigin="0 0",l.span=t._g.doc.createElement("span"),l.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",h.appendChild(l.span),u.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",a,i),1==r?(t._g.doc.body.appendChild(h),u.left=s+"px",u.top=o+"px",u.position="absolute"):r.firstChild?r.insertBefore(h,r.firstChild):r.appendChild(h),l.renderfix=function(){},l},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var L=t.st;for(var z in N)N[e](z)&&!L[e](z)&&(L[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}}.apply(e,i),!(void 0!==n&&(t.exports=n))}])});
},{}],204:[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],205:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":204}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaGRyYWN1bGEvZGlzdC9kcmFjdWxhLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBoZHJhY3VsYS9kaXN0L2xheW91dC9sYXlvdXQuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhkcmFjdWxhL2Rpc3QvbGF5b3V0L29yZGVyZWRfdHJlZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaGRyYWN1bGEvZGlzdC9sYXlvdXQvc3ByaW5nLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBoZHJhY3VsYS9kaXN0L2xheW91dC90b3VybmFtZW50X3RyZWUuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhkcmFjdWxhL2Rpc3QvcmVuZGVyZXIvcmFwaGFlbC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaGRyYWN1bGEvZGlzdC9yZW5kZXJlci9yZW5kZXJlci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaGRyYWN1bGEvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX0RhdGFWaWV3LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fSGFzaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX0xpc3RDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcENhY2hlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1NldENhY2hlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fU3RhY2suanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19VaW50OEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fV2Vha01hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FwcGx5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlBZ2dyZWdhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlFYWNoUmlnaHQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUV2ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlGaWx0ZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVB1c2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVJlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5UmVkdWNlUmlnaHQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVNvbWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc2NpaVNpemUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc2NpaVRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQWdncmVnYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VDbGFtcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUVhY2hSaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFdmVyeS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGaWx0ZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRmluZEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRm9yLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZvck93bi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGb3JPd25SaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGb3JSaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUhhc0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUluZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSW52b2tlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzRXF1YWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNNYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hTi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXRlcmF0ZWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlS2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VNYXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlTWF0Y2hlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VNYXRjaGVzUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlT3JkZXJCeS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VQcm9wZXJ0eURlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUmFuZG9tLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVJlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VSZXN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNsaWNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNvbWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlU29ydEJ5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nhc3RQYXRoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY29tcGFyZUFzY2VuZGluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvbXBhcmVNdWx0aXBsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVBZ2dyZWdhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQmFzZUVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVCYXNlRm9yLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlRmluZC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsQXJyYXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZXF1YWxCeVRhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRNYXBEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TWF0Y2hEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNQYXRoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzVW5pY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hEZWxldGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hTZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc0ZsYXR0ZW5hYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNIb3N0T2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSXRlcmF0ZWVDYWxsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleWFibGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc01hc2tlZC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzUHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNTdHJpY3RDb21wYXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXRlcmF0b3JUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVHZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVTZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVTZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbm9kZVV0aWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fcGFyZW50LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldENhY2hlQWRkLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tHZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0hhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nU2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0cmluZ1RvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpbmdUb1BhdGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL190b0tleS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fdW5pY29kZVNpemUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL191bmljb2RlVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY291bnRCeS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZWFjaFJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9lcS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZXZlcnkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZmluZC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZmluZEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9maW5kTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZmluZExhc3RJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZmxhdE1hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZmxhdE1hcERlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ZsYXRNYXBEZXB0aC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZm9yRWFjaFJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9nZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2dyb3VwQnkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2hhc0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludm9rZU1hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5TGlrZU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNUeXBlZEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9rZXlCeS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbWFwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9tZW1vaXplLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9uZWdhdGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29yZGVyQnkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3BhcnRpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3JlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvcmVkdWNlUmlnaHQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3JlamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc2FtcGxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zYW1wbGVTaXplLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zaHVmZmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zaXplLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zb21lLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zb3J0QnkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvRmluaXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b0ludGVnZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvTnVtYmVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL3JhcGhhZWwvcmFwaGFlbC5taW4uanMiLCJub2RlX21vZHVsZXMvdXVpZC9ybmctYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3V1aWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIERyYWN1bGEgPSByZXF1aXJlKCdncmFwaGRyYWN1bGEnKTtcblxudmFyIEdyYXBoID0gRHJhY3VsYS5HcmFwaDtcblxudmFyIFJlbmRlcmVyID0gRHJhY3VsYS5SZW5kZXJlci5SYXBoYWVsO1xudmFyIExheW91dCA9IERyYWN1bGEuTGF5b3V0LlNwcmluZztcblxudmFyIGdyYXBoID0gbmV3IEdyYXBoKCk7XG5cbmdyYXBoLmFkZEVkZ2UoJ0JhbmFuYScsICdBcHBsZScpO1xuZ3JhcGguYWRkRWRnZSgnQXBwbGUnLCAnS2l3aScpO1xuZ3JhcGguYWRkRWRnZSgnQXBwbGUnLCAnRHJhZ29uZnJ1aXQnKTtcbmdyYXBoLmFkZEVkZ2UoJ0RyYWdvbmZydWl0JywgJ0JhbmFuYScpO1xuZ3JhcGguYWRkRWRnZSgnS2l3aScsICdCYW5hbmEnKTtcblxudmFyIGxheW91dCA9IG5ldyBMYXlvdXQoZ3JhcGgpXG52YXIgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoJyNwYXBlcicsIGdyYXBoLCA0MDAsIDMwMCk7XG5yZW5kZXJlci5kcmF3KClcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF91dWlkID0gcmVxdWlyZSgndXVpZCcpO1xuXG52YXIgX3V1aWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXVpZCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8vIFRlc3RpbmcgZm9yIHN0cmluZyBvciBudW1iZXIgZGF0YSB0eXBlXG52YXIgaXNJZCA9IGZ1bmN0aW9uIGlzSWQoeCkge1xuICByZXR1cm4gISF+WydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgeCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoeCkpO1xufTtcbnZhciBlZGdlcyA9ICdlZGdlcyc7IC8vIFN5bWJvbCgnZWRnZXMnKVxudmFyIG5vZGVzID0gJ25vZGVzJzsgLy8gU3ltYm9sKCdub2RlcycpXG5cbi8qKlxuICogR3JhcGggRGF0YSBTdHJ1Y3R1cmVcbiAqL1xuXG52YXIgRHJhY3VsYSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRHJhY3VsYSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhY3VsYSk7XG5cbiAgICB0aGlzW25vZGVzXSA9IHt9O1xuICAgIHRoaXNbZWRnZXNdID0gW107XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRvciBmb3IgdGhlIG5ldyBoYXRlcnMgOilcbiAgICogQHJldHVybnMge0RyYWN1bGF9IGEgbmV3IGdyYXBoIGluc3RhbmNlXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKERyYWN1bGEsIFt7XG4gICAga2V5OiAnYWRkTm9kZScsXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCBub2RlIGlmIGl0IGRvZXNuJ3QgZXhpc3QgeWV0LlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgdXBkYXRlIGFuIGV4aXN0aW5nIG5vZGUuXG4gICAgICogSWYgeW91IHdhbnQgdG8gdXBkYXRlIGEgbm9kZSwganVzdCB1cGRhdGUgdGhlIG5vZGUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfG9iamVjdH0gaWQgb3Igbm9kZSBkYXRhXG4gICAgICogQHBhcmFtIHtvYmplY3R8fSBub2RlRGF0YSAob3B0aW9uYWwpXG4gICAgICogQHJldHVybnMge05vZGV9IHRoZSBuZXcgb3IgZXhpc3Rpbmcgbm9kZVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGROb2RlKGlkLCBub2RlRGF0YSkge1xuICAgICAgLy8gTm9kZSBpbml0aWFsaXNhdGlvbiBzaG9ydGhhbmRzXG4gICAgICBpZiAoIW5vZGVEYXRhKSB7XG4gICAgICAgIG5vZGVEYXRhID0gaXNJZChpZCkgPyB7IGlkOiBpZCB9IDogaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlRGF0YS5pZCA9IGlkO1xuICAgICAgfVxuICAgICAgaWYgKCFub2RlRGF0YS5pZCkge1xuICAgICAgICBub2RlRGF0YS5pZCA9ICgwLCBfdXVpZDIuZGVmYXVsdCkoKTtcbiAgICAgICAgLy8gRG9uJ3QgY3JlYXRlIGEgbmV3IG5vZGUgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tub2Rlc11bbm9kZURhdGEuaWRdKSB7XG4gICAgICAgIHJldHVybiB0aGlzW25vZGVzXVtub2RlRGF0YS5pZF07XG4gICAgICB9XG4gICAgICB0aGlzW25vZGVzXVtub2RlRGF0YS5pZF0gPSBub2RlRGF0YTtcbiAgICAgIHJldHVybiBub2RlRGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8b2JqZWN0fSBzb3VyY2Ugbm9kZSBvciBJRFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxvYmplY3R9IHRhcmdldCBub2RlIG9yIElEXG4gICAgICogQHBhcmFtIHtvYmplY3R8fSAob3B0aW9uYWwpIGVkZ2UgZGF0YSwgZS5nLiBzdHlsZXNcbiAgICAgKiBAcmV0dXJucyB7RWRnZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkRWRnZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEVkZ2Uoc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBlZGdlRGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG4gICAgICB2YXIgc291cmNlTm9kZSA9IHRoaXMuYWRkTm9kZShzb3VyY2UpO1xuICAgICAgdmFyIHRhcmdldE5vZGUgPSB0aGlzLmFkZE5vZGUodGFyZ2V0KTtcbiAgICAgIGVkZ2VEYXRhLnNvdXJjZSA9IHNvdXJjZU5vZGU7XG4gICAgICBlZGdlRGF0YS50YXJnZXQgPSB0YXJnZXROb2RlO1xuICAgICAgdGhpc1tlZGdlc10ucHVzaChlZGdlRGF0YSk7XG4gICAgICByZXR1cm4gZWRnZURhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfE5vZGV9IG5vZGUgbm9kZSBvciBJRFxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZU5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgIHZhciBpZCA9IGlzSWQobm9kZSkgPyBub2RlIDogbm9kZS5pZDtcbiAgICAgIG5vZGUgPSB0aGlzW25vZGVzXVtpZF07XG4gICAgICAvLyBEZWxldGUgbm9kZSBmcm9tIGluZGV4XG4gICAgICBkZWxldGUgdGhpc1tub2Rlc11baWRdO1xuICAgICAgLy8gRGVsZXRlIG5vZGUgZnJvbSBhbGwgdGhlIGVkZ2VzXG4gICAgICB0aGlzW2VkZ2VzXSA9IHRoaXNbZWRnZXNdLmZpbHRlcihmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICByZXR1cm4gZWRnZS5zb3VyY2UgIT09IG5vZGUgJiYgZWRnZS50YXJnZXQgIT09IG5vZGU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBlZGdlIGJ5IHByb3ZpZGluZyBlaXRoZXIgdHdvIG5vZGVzIChvciBpZHMpIG9yIHRoZSBlZGdlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfE5vZGV8RWRnZX0gbm9kZSBlZGdlLCBub2RlIG9yIElEXG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfE5vZGV9IG5vZGUgbm9kZSBvciBJRFxuICAgICAqIEByZXR1cm4ge0VkZ2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZUVkZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVFZGdlKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgZm91bmQgPSB2b2lkIDA7XG4gICAgICAvLyBGYWxsYmFjayB0byBvbmx5IG9uZSBwYXJhbWV0ZXJcbiAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldCA9IHNvdXJjZS50YXJnZXQ7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS5zb3VyY2U7XG4gICAgICB9XG4gICAgICAvLyBOb3JtYWxpc2Ugbm9kZSBJRHNcbiAgICAgIGlmIChpc0lkKHNvdXJjZSkpIHNvdXJjZSA9IHsgaWQ6IHNvdXJjZSB9O1xuICAgICAgaWYgKGlzSWQodGFyZ2V0KSkgdGFyZ2V0ID0geyBpZDogdGFyZ2V0IH07XG4gICAgICAvLyBGaW5kIGFuZCByZW1vdmUgZWRnZVxuICAgICAgdGhpc1tlZGdlc10gPSB0aGlzW2VkZ2VzXS5maWx0ZXIoZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBzb3VyY2UuaWQgJiYgZWRnZS50YXJnZXQuaWQgPT09IHRhcmdldC5pZCkge1xuICAgICAgICAgIGZvdW5kID0gZWRnZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICAgIC8vIFJldHVybiByZW1vdmVkIGVkZ2VcbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0b0pTT04nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICByZXR1cm4geyBub2RlczogdGhpc1tub2Rlc10sIGVkZ2VzOiB0aGlzW2VkZ2VzXSB9O1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAnY3JlYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgcmV0dXJuIG5ldyBEcmFjdWxhKCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIERyYWN1bGE7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERyYWN1bGE7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2NvbGxlY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvY29sbGVjdGlvbicpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGRpc3RyaWJ1dGluZyBub2RlcyBhbGdvcml0aG1zXG4gKi9cbnZhciBMYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExheW91dChncmFwaCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMYXlvdXQpO1xuXG4gICAgdGhpcy5ncmFwaCA9IGdyYXBoO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKExheW91dCwgW3tcbiAgICBrZXk6ICdsYXlvdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsYXlvdXQoKSB7XG4gICAgICB0aGlzLmluaXRDb29yZHMoKTtcbiAgICAgIHRoaXMubGF5b3V0UHJlcGFyZSgpO1xuICAgICAgdGhpcy5sYXlvdXRDYWxjQm91bmRzKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaW5pdENvb3JkcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRDb29yZHMoKSB7XG4gICAgICAoMCwgX2NvbGxlY3Rpb24uZWFjaCkodGhpcy5ncmFwaC5ub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgbm9kZS5sYXlvdXRQb3NYID0gMDtcbiAgICAgICAgbm9kZS5sYXlvdXRQb3NZID0gMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xheW91dFByZXBhcmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsYXlvdXRQcmVwYXJlKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdsYXlvdXRDYWxjQm91bmRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGF5b3V0Q2FsY0JvdW5kcygpIHtcbiAgICAgIHZhciBtaW54ID0gSW5maW5pdHk7XG4gICAgICB2YXIgbWF4eCA9IC1JbmZpbml0eTtcbiAgICAgIHZhciBtaW55ID0gSW5maW5pdHk7XG4gICAgICB2YXIgbWF4eSA9IC1JbmZpbml0eTtcblxuICAgICAgKDAsIF9jb2xsZWN0aW9uLmVhY2gpKHRoaXMuZ3JhcGgubm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciB4ID0gbm9kZS5sYXlvdXRQb3NYO1xuICAgICAgICB2YXIgeSA9IG5vZGUubGF5b3V0UG9zWTtcblxuICAgICAgICBpZiAoeCA+IG1heHgpIG1heHggPSB4O1xuICAgICAgICBpZiAoeCA8IG1pbngpIG1pbnggPSB4O1xuICAgICAgICBpZiAoeSA+IG1heHkpIG1heHkgPSB5O1xuICAgICAgICBpZiAoeSA8IG1pbnkpIG1pbnkgPSB5O1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZ3JhcGgubGF5b3V0TWluWCA9IG1pbng7XG4gICAgICB0aGlzLmdyYXBoLmxheW91dE1heFggPSBtYXh4O1xuICAgICAgdGhpcy5ncmFwaC5sYXlvdXRNaW5ZID0gbWlueTtcbiAgICAgIHRoaXMuZ3JhcGgubGF5b3V0TWF4WSA9IG1heHk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIExheW91dDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTGF5b3V0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9sYXlvdXQgPSByZXF1aXJlKCcuL2xheW91dCcpO1xuXG52YXIgX2xheW91dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogT3JkZXJlZFRyZWUgaXMgbGlrZSBPcmRlcmVkIGJ1dCBhc3N1bWVzIHRoZXJlIGlzIG9uZSByb290XG4gKiBUaGlzIHdheSB3ZSBjYW4gZ2l2ZSBub24gcmFuZG9tIHBvc2l0aW9ucyB0byBub2RlcyBvbiB0aGUgWS1heGlzXG4gKiBJdCBhc3N1bWVzIHRoZSBvcmRlcmVkIG5vZGVzIGFyZSBvZiBhIHBlcmZlY3QgYmluYXJ5IHRyZWVcbiAqL1xudmFyIE9yZGVyZWRUcmVlID0gZnVuY3Rpb24gKF9MYXlvdXQpIHtcbiAgX2luaGVyaXRzKE9yZGVyZWRUcmVlLCBfTGF5b3V0KTtcblxuICBmdW5jdGlvbiBPcmRlcmVkVHJlZShncmFwaCwgb3JkZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3JkZXJlZFRyZWUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9yZGVyZWRUcmVlKS5jYWxsKHRoaXMsIGdyYXBoKSk7XG5cbiAgICBfdGhpcy5vcmRlciA9IG9yZGVyO1xuICAgIF90aGlzLmxheW91dCgpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhPcmRlcmVkVHJlZSwgW3tcbiAgICBrZXk6ICdsYXlvdXRQcmVwYXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGF5b3V0UHJlcGFyZSgpIHtcbiAgICAgIC8vIFRvIHJldmVyc2UgdGhlIG9yZGVyIG9mIHJlbmRlcmluZywgd2UgbmVlZCB0byBmaW5kIG91dCB0aGVcbiAgICAgIC8vIGFic29sdXRlIG51bWJlciBvZiBsZXZlbHMgd2UgaGF2ZS4gc2ltcGxlIGxvZyBtYXRoIGFwcGxpZXMuXG4gICAgICB2YXIgbnVtTm9kZXMgPSB0aGlzLm9yZGVyLmxlbmd0aDtcbiAgICAgIHZhciB0b3RhbExldmVscyA9IE1hdGguZmxvb3IoTWF0aC5sb2cobnVtTm9kZXMpIC8gTWF0aC5sb2coMikpO1xuXG4gICAgICB2YXIgY291bnRlciA9IDE7XG4gICAgICB0aGlzLm9yZGVyLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgLy8gUmFuayBha2EgeCBjb29yZGluYXRlXG4gICAgICAgIHZhciByYW5rID0gTWF0aC5mbG9vcihNYXRoLmxvZyhjb3VudGVyKSAvIE1hdGgubG9nKDIpKTtcbiAgICAgICAgLy8gRmlsZSByZWxhdGl2ZSB0byB0b3BcbiAgICAgICAgdmFyIGZpbGUgPSBjb3VudGVyIC0gTWF0aC5wb3cocmFuaywgMik7XG5cbiAgICAgICAgbm9kZS5sYXlvdXRQb3NYID0gdG90YWxMZXZlbHMgLSByYW5rO1xuICAgICAgICBub2RlLmxheW91dFBvc1kgPSBmaWxlO1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gT3JkZXJlZFRyZWU7XG59KF9sYXlvdXQyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBPcmRlcmVkVHJlZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfbGF5b3V0ID0gcmVxdWlyZSgnLi9sYXlvdXQnKTtcblxudmFyIF9sYXlvdXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KTtcblxudmFyIF9jb2xsZWN0aW9uID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRPRE8gdGFrZSByYXRpbyBpbnRvIGFjY291bnRcbiAqIFRPRE8gdXNlIGludGVnZXJzIGZvciBzcGVlZFxuICovXG52YXIgU3ByaW5nID0gZnVuY3Rpb24gKF9MYXlvdXQpIHtcbiAgX2luaGVyaXRzKFNwcmluZywgX0xheW91dCk7XG5cbiAgZnVuY3Rpb24gU3ByaW5nKGdyYXBoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwcmluZyk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3ByaW5nKS5jYWxsKHRoaXMsIGdyYXBoKSk7XG5cbiAgICBfdGhpcy5pdGVyYXRpb25zID0gNTAwO1xuICAgIF90aGlzLm1heFJlcHVsc2l2ZUZvcmNlRGlzdGFuY2UgPSA2O1xuICAgIF90aGlzLmsgPSAyO1xuICAgIF90aGlzLmMgPSAwLjAxO1xuICAgIF90aGlzLm1heFZlcnRleE1vdmVtZW50ID0gMC41O1xuICAgIF90aGlzLmxheW91dCgpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTcHJpbmcsIFt7XG4gICAga2V5OiAnbGF5b3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGF5b3V0KCkge1xuICAgICAgdGhpcy5sYXlvdXRQcmVwYXJlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgIHRoaXMubGF5b3V0SXRlcmF0aW9uKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxheW91dENhbGNCb3VuZHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdsYXlvdXRQcmVwYXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGF5b3V0UHJlcGFyZSgpIHtcbiAgICAgICgwLCBfY29sbGVjdGlvbi5lYWNoKSh0aGlzLmdyYXBoLm5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBub2RlLmxheW91dFBvc1ggPSAwO1xuICAgICAgICBub2RlLmxheW91dFBvc1kgPSAwO1xuICAgICAgICBub2RlLmxheW91dEZvcmNlWCA9IDA7XG4gICAgICAgIG5vZGUubGF5b3V0Rm9yY2VZID0gMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xheW91dEl0ZXJhdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxheW91dEl0ZXJhdGlvbigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAvLyBGb3JjZXMgb24gbm9kZXMgZHVlIHRvIG5vZGUtbm9kZSByZXB1bHNpb25zXG4gICAgICB2YXIgcHJldiA9IFtdO1xuICAgICAgKDAsIF9jb2xsZWN0aW9uLmVhY2gpKHRoaXMuZ3JhcGgubm9kZXMsIGZ1bmN0aW9uIChub2RlMSkge1xuICAgICAgICBwcmV2LmZvckVhY2goZnVuY3Rpb24gKG5vZGUyKSB7XG4gICAgICAgICAgX3RoaXMyLmxheW91dFJlcHVsc2l2ZShub2RlMSwgbm9kZTIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJldi5wdXNoKG5vZGUxKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBGb3JjZXMgb24gbm9kZXMgZHVlIHRvIGVkZ2UgYXR0cmFjdGlvbnNcbiAgICAgIHRoaXMuZ3JhcGguZWRnZXMuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICBfdGhpczIubGF5b3V0QXR0cmFjdGl2ZShlZGdlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBNb3ZlIGJ5IHRoZSBnaXZlbiBmb3JjZVxuICAgICAgKDAsIF9jb2xsZWN0aW9uLmVhY2gpKHRoaXMuZ3JhcGgubm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciB4bW92ZSA9IF90aGlzMi5jICogbm9kZS5sYXlvdXRGb3JjZVg7XG4gICAgICAgIHZhciB5bW92ZSA9IF90aGlzMi5jICogbm9kZS5sYXlvdXRGb3JjZVk7XG5cbiAgICAgICAgdmFyIG1heCA9IF90aGlzMi5tYXhWZXJ0ZXhNb3ZlbWVudDtcblxuICAgICAgICBpZiAoeG1vdmUgPiBtYXgpIHhtb3ZlID0gbWF4O1xuICAgICAgICBpZiAoeG1vdmUgPCAtbWF4KSB4bW92ZSA9IC1tYXg7XG4gICAgICAgIGlmICh5bW92ZSA+IG1heCkgeW1vdmUgPSBtYXg7XG4gICAgICAgIGlmICh5bW92ZSA8IC1tYXgpIHltb3ZlID0gLW1heDtcblxuICAgICAgICBub2RlLmxheW91dFBvc1ggKz0geG1vdmU7XG4gICAgICAgIG5vZGUubGF5b3V0UG9zWSArPSB5bW92ZTtcbiAgICAgICAgbm9kZS5sYXlvdXRGb3JjZVggPSAwO1xuICAgICAgICBub2RlLmxheW91dEZvcmNlWSA9IDA7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdsYXlvdXRSZXB1bHNpdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsYXlvdXRSZXB1bHNpdmUobm9kZTEsIG5vZGUyKSB7XG4gICAgICBpZiAoIW5vZGUxIHx8ICFub2RlMikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZHggPSBub2RlMi5sYXlvdXRQb3NYIC0gbm9kZTEubGF5b3V0UG9zWDtcbiAgICAgIHZhciBkeSA9IG5vZGUyLmxheW91dFBvc1kgLSBub2RlMS5sYXlvdXRQb3NZO1xuICAgICAgdmFyIGQyID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICBpZiAoZDIgPCAwLjAxKSB7XG4gICAgICAgIGR4ID0gMC4xICogTWF0aC5yYW5kb20oKSArIDAuMTtcbiAgICAgICAgZHkgPSAwLjEgKiBNYXRoLnJhbmRvbSgpICsgMC4xO1xuICAgICAgICBkMiA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgfVxuICAgICAgdmFyIGQgPSBNYXRoLnNxcnQoZDIpO1xuICAgICAgaWYgKGQgPCB0aGlzLm1heFJlcHVsc2l2ZUZvcmNlRGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIHJlcHVsc2l2ZUZvcmNlID0gdGhpcy5rICogdGhpcy5rIC8gZDtcbiAgICAgICAgbm9kZTIubGF5b3V0Rm9yY2VYICs9IHJlcHVsc2l2ZUZvcmNlICogZHggLyBkO1xuICAgICAgICBub2RlMi5sYXlvdXRGb3JjZVkgKz0gcmVwdWxzaXZlRm9yY2UgKiBkeSAvIGQ7XG4gICAgICAgIG5vZGUxLmxheW91dEZvcmNlWCAtPSByZXB1bHNpdmVGb3JjZSAqIGR4IC8gZDtcbiAgICAgICAgbm9kZTEubGF5b3V0Rm9yY2VZIC09IHJlcHVsc2l2ZUZvcmNlICogZHkgLyBkO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xheW91dEF0dHJhY3RpdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsYXlvdXRBdHRyYWN0aXZlKGVkZ2UpIHtcbiAgICAgIHZhciBub2RlMSA9IGVkZ2Uuc291cmNlO1xuICAgICAgdmFyIG5vZGUyID0gZWRnZS50YXJnZXQ7XG5cbiAgICAgIHZhciBkeCA9IG5vZGUyLmxheW91dFBvc1ggLSBub2RlMS5sYXlvdXRQb3NYO1xuICAgICAgdmFyIGR5ID0gbm9kZTIubGF5b3V0UG9zWSAtIG5vZGUxLmxheW91dFBvc1k7XG4gICAgICB2YXIgZDIgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIGlmIChkMiA8IDAuMDEpIHtcbiAgICAgICAgZHggPSAwLjEgKiBNYXRoLnJhbmRvbSgpICsgMC4xO1xuICAgICAgICBkeSA9IDAuMSAqIE1hdGgucmFuZG9tKCkgKyAwLjE7XG4gICAgICAgIGQyID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICB9XG4gICAgICB2YXIgZCA9IE1hdGguc3FydChkMik7XG4gICAgICBpZiAoZCA+IHRoaXMubWF4UmVwdWxzaXZlRm9yY2VEaXN0YW5jZSkge1xuICAgICAgICBkID0gdGhpcy5tYXhSZXB1bHNpdmVGb3JjZURpc3RhbmNlO1xuICAgICAgICBkMiA9IGQgKiBkO1xuICAgICAgfVxuICAgICAgdmFyIGF0dHJhY3RpdmVGb3JjZSA9IChkMiAtIHRoaXMuayAqIHRoaXMuaykgLyB0aGlzLms7XG4gICAgICBpZiAoIWVkZ2UuYXR0cmFjdGlvbikgZWRnZS5hdHRyYWN0aW9uID0gMTtcbiAgICAgIGF0dHJhY3RpdmVGb3JjZSAqPSBNYXRoLmxvZyhlZGdlLmF0dHJhY3Rpb24pICogMC41ICsgMTtcblxuICAgICAgbm9kZTIubGF5b3V0Rm9yY2VYIC09IGF0dHJhY3RpdmVGb3JjZSAqIGR4IC8gZDtcbiAgICAgIG5vZGUyLmxheW91dEZvcmNlWSAtPSBhdHRyYWN0aXZlRm9yY2UgKiBkeSAvIGQ7XG4gICAgICBub2RlMS5sYXlvdXRGb3JjZVggKz0gYXR0cmFjdGl2ZUZvcmNlICogZHggLyBkO1xuICAgICAgbm9kZTEubGF5b3V0Rm9yY2VZICs9IGF0dHJhY3RpdmVGb3JjZSAqIGR5IC8gZDtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogJ2NyZWF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KHRoaXMsIFtudWxsXS5jb25jYXQoYXJncykpKSgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTcHJpbmc7XG59KF9sYXlvdXQyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTcHJpbmc7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2xheW91dCA9IHJlcXVpcmUoJy4vbGF5b3V0Jyk7XG5cbnZhciBfbGF5b3V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCk7XG5cbnZhciBfY29sbGVjdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFRvdXJuYW1lbnRUcmVlID0gZnVuY3Rpb24gKF9MYXlvdXQpIHtcbiAgX2luaGVyaXRzKFRvdXJuYW1lbnRUcmVlLCBfTGF5b3V0KTtcblxuICAvKipcbiAgICogQHBhcmFtIHtHcmFwaH0gZ3JhcGhcbiAgICogQHBhcmFtIHtBcnJheVtOb2RlXX0gb3JkZXJcbiAgICovXG4gIGZ1bmN0aW9uIFRvdXJuYW1lbnRUcmVlKGdyYXBoLCBvcmRlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUb3VybmFtZW50VHJlZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVG91cm5hbWVudFRyZWUpLmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMuZ3JhcGggPSBncmFwaDtcbiAgICBfdGhpcy5vcmRlciA9IG9yZGVyO1xuICAgIF90aGlzLmxheW91dCgpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUb3VybmFtZW50VHJlZSwgW3tcbiAgICBrZXk6ICdsYXlvdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsYXlvdXQoKSB7XG4gICAgICB0aGlzLmxheW91dFByZXBhcmUoKTtcbiAgICAgIHRoaXMubGF5b3V0Q2FsY0JvdW5kcygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xheW91dFByZXBhcmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsYXlvdXRQcmVwYXJlKCkge1xuICAgICAgKDAsIF9jb2xsZWN0aW9uLmVhY2gpKHRoaXMuZ3JhcGgubm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIG5vZGUubGF5b3V0UG9zWCA9IDA7XG4gICAgICAgIG5vZGUubGF5b3V0UG9zWSA9IDA7XG4gICAgICB9KTtcblxuICAgICAgLy8gVG8gcmV2ZXJzZSB0aGUgb3JkZXIgb2YgcmVuZGVyaW5nLCB3ZSBuZWVkIHRvIGZpbmQgb3V0IHRoZVxuICAgICAgLy8gYWJzb2x1dGUgbnVtYmVyIG9mIGxldmVscyB3ZSBoYXZlLiBzaW1wbGUgbG9nIG1hdGggYXBwbGllcy5cbiAgICAgIHZhciBudW1Ob2RlcyA9IHRoaXMub3JkZXIubGVuZ3RoO1xuICAgICAgdmFyIHRvdGFsTGV2ZWxzID0gTWF0aC5mbG9vcihNYXRoLmxvZyhudW1Ob2RlcykgLyBNYXRoLmxvZygyKSk7XG5cbiAgICAgIHZhciBjb3VudGVyID0gMTtcbiAgICAgIHRoaXMub3JkZXIuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgZGVwdGggPSBNYXRoLmZsb29yKE1hdGgubG9nKGNvdW50ZXIpIC8gTWF0aC5sb2coMikpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gTWF0aC5wb3coMiwgdG90YWxMZXZlbHMgLSBkZXB0aCk7XG4gICAgICAgIHZhciBmaW5hbF94ID0gb2Zmc2V0ICsgKGNvdW50ZXIgLSBNYXRoLnBvdygyLCBkZXB0aCkpICogTWF0aC5wb3coMiwgdG90YWxMZXZlbHMgLSBkZXB0aCArIDEpO1xuICAgICAgICBub2RlLmxheW91dFBvc1ggPSBmaW5hbF94O1xuICAgICAgICBub2RlLmxheW91dFBvc1kgPSBkZXB0aDtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRvdXJuYW1lbnRUcmVlO1xufShfbGF5b3V0Mi5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVG91cm5hbWVudFRyZWU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JhcGhhZWwgPSByZXF1aXJlKCdyYXBoYWVsJyk7XG5cbnZhciBfcmFwaGFlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yYXBoYWVsKTtcblxudmFyIF9yZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXInKTtcblxudmFyIF9yZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW5kZXJlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGRyYWdpZnkgPSBmdW5jdGlvbiBkcmFnaWZ5KHNoYXBlKSB7XG4gIHZhciByID0gc2hhcGUucGFwZXI7XG4gIHNoYXBlLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpdGVtLnNldCA9IHNoYXBlO1xuICAgIGlmIChpdGVtLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLm5vZGUuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgIGl0ZW0uZHJhZyhmdW5jdGlvbiBkcmFnTW92ZShkeCwgZHksIHgsIHkpIHtcbiAgICAgIGR4ID0gdGhpcy5zZXQub3g7XG4gICAgICBkeSA9IHRoaXMuc2V0Lm95O1xuICAgICAgdmFyIGJCb3ggPSB0aGlzLnNldC5nZXRCQm94KCk7XG4gICAgICB2YXIgbmV3WCA9IHggLSBkeCArIChiQm94LnggKyBiQm94LndpZHRoIC8gMik7XG4gICAgICB2YXIgbmV3WSA9IHkgLSBkeSArIChiQm94LnkgKyBiQm94LmhlaWdodCAvIDIpO1xuICAgICAgdmFyIGNsaWVudFggPSB4IC0gKG5ld1ggPCAyMCA/IG5ld1ggLSAyMCA6IG5ld1ggPiByLndpZHRoIC0gMjAgPyBuZXdYIC0gci53aWR0aCArIDIwIDogMCk7XG4gICAgICB2YXIgY2xpZW50WSA9IHkgLSAobmV3WSA8IDIwID8gbmV3WSAtIDIwIDogbmV3WSA+IHIuaGVpZ2h0IC0gMjAgPyBuZXdZIC0gci5oZWlnaHQgKyAyMCA6IDApO1xuICAgICAgdGhpcy5zZXQudHJhbnNsYXRlKGNsaWVudFggLSBNYXRoLnJvdW5kKGR4KSwgY2xpZW50WSAtIE1hdGgucm91bmQoZHkpKTtcbiAgICAgIHNoYXBlLmNvbm5lY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgY29ubmVjdGlvbi5kcmF3KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zZXQub3ggPSBjbGllbnRYO1xuICAgICAgdGhpcy5zZXQub3kgPSBjbGllbnRZO1xuICAgIH0sIGZ1bmN0aW9uIGRyYWdFbnRlcih4LCB5KSB7XG4gICAgICB0aGlzLnNldC5veCA9IHg7XG4gICAgICB0aGlzLnNldC5veSA9IHk7XG4gICAgICB0aGlzLmFuaW1hdGUoeyAnZmlsbC1vcGFjaXR5JzogMC4yIH0sIDUwMCk7XG4gICAgfSwgZnVuY3Rpb24gZHJhZ091dCgpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZSh7ICdmaWxsLW9wYWNpdHknOiAwLjYgfSwgNTAwKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG52YXIgUmFwaGFlbFJlbmRlcmVyID0gZnVuY3Rpb24gKF9SZW5kZXJlcikge1xuICBfaW5oZXJpdHMoUmFwaGFlbFJlbmRlcmVyLCBfUmVuZGVyZXIpO1xuXG4gIGZ1bmN0aW9uIFJhcGhhZWxSZW5kZXJlcihlbGVtZW50LCBncmFwaCwgd2lkdGgsIGhlaWdodCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSYXBoYWVsUmVuZGVyZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJhcGhhZWxSZW5kZXJlcikuY2FsbCh0aGlzLCBlbGVtZW50LCBncmFwaCwgd2lkdGgsIGhlaWdodCkpO1xuXG4gICAgX3RoaXMuY2FudmFzID0gKDAsIF9yYXBoYWVsMi5kZWZhdWx0KShfdGhpcy5lbGVtZW50LCBfdGhpcy53aWR0aCwgX3RoaXMuaGVpZ2h0KTtcbiAgICBfdGhpcy5saW5lU3R5bGUgPSB7XG4gICAgICBzdHJva2U6ICcjNDQzMzk5JyxcbiAgICAgICdzdHJva2Utd2lkdGgnOiAnMnB4J1xuICAgIH07XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFJhcGhhZWxSZW5kZXJlciwgW3tcbiAgICBrZXk6ICdkcmF3Tm9kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdOb2RlKG5vZGUpIHtcbiAgICAgIHZhciBjb2xvciA9IF9yYXBoYWVsMi5kZWZhdWx0LmdldENvbG9yKCk7XG4gICAgICAvLyBUT0RPIHVwZGF0ZSAvIGNhY2hlIHNoYXBlXG4gICAgICBub2RlLnNoYXBlID0gdGhpcy5jYW52YXMuc2V0KCk7XG4gICAgICBub2RlLnNoYXBlLmNvbm5lY3Rpb25zID0gW107XG4gICAgICBub2RlLnNoYXBlLnB1c2godGhpcy5jYW52YXMuZWxsaXBzZSgwLCAwLCAzMCwgMjApLmF0dHIoeyBzdHJva2U6IGNvbG9yLCAnc3Ryb2tlLXdpZHRoJzogMiwgZmlsbDogY29sb3IsICdmaWxsLW9wYWNpdHknOiAwIH0pKS5wdXNoKHRoaXMuY2FudmFzLnRleHQoMCwgMzAsIG5vZGUubGFiZWwgfHwgbm9kZS5pZCkpLnRyYW5zbGF0ZShub2RlLnBvaW50WzBdLCBub2RlLnBvaW50WzFdKTtcbiAgICAgIC8vIC5kcmFnKG1vdmUsIGRyYWdnZXIsIHVwKVxuICAgICAgZHJhZ2lmeShub2RlLnNoYXBlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmF3RWRnZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdFZGdlKGVkZ2UpIHtcbiAgICAgIGlmICghZWRnZS5zaGFwZSkge1xuICAgICAgICBlZGdlLnNoYXBlID0gdGhpcy5jYW52YXMuY29ubmVjdGlvbihlZGdlLnNvdXJjZS5zaGFwZSwgZWRnZS50YXJnZXQuc2hhcGUpO1xuICAgICAgICAvLyBlZGdlLnNoYXBlLmxpbmUuYXR0cih0aGlzLmxpbmVTdHlsZSlcbiAgICAgICAgZWRnZS5zb3VyY2Uuc2hhcGUuY29ubmVjdGlvbnMucHVzaChlZGdlLnNoYXBlKTtcbiAgICAgICAgZWRnZS50YXJnZXQuc2hhcGUuY29ubmVjdGlvbnMucHVzaChlZGdlLnNoYXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmFwaGFlbFJlbmRlcmVyO1xufShfcmVuZGVyZXIyLmRlZmF1bHQpO1xuXG4vLyA8UmFwaGFlbC5mbi5jb25uZWN0aW9uPlxuXG4vKiBjb29yZGluYXRlcyBmb3IgcG90ZW50aWFsIGNvbm5lY3Rpb24gY29vcmRpbmF0ZXMgZnJvbS90byB0aGUgb2JqZWN0cyAqL1xuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJhcGhhZWxSZW5kZXJlcjtcbnZhciBnZXRDb25uZWN0aW9uUG9pbnRzID0gZnVuY3Rpb24gZ2V0Q29ubmVjdGlvblBvaW50cyhvYmoxLCBvYmoyKSB7XG5cbiAgLyogZ2V0IGJvdW5kaW5nIGJveGVzIG9mIHRhcmdldCBhbmQgc291cmNlICovXG4gIHZhciBiYjEgPSBvYmoxLmdldEJCb3goKTtcbiAgdmFyIGJiMiA9IG9iajIuZ2V0QkJveCgpO1xuXG4gIHZhciBvZmYxID0gMDtcbiAgdmFyIG9mZjIgPSAwO1xuXG4gIHJldHVybiBbXG5cbiAgLyogTk9SVEggMSAqL1xuICB7IHg6IGJiMS54ICsgYmIxLndpZHRoIC8gMiwgeTogYmIxLnkgLSBvZmYxIH0sXG5cbiAgLyogU09VVEggMSAqL1xuICB7IHg6IGJiMS54ICsgYmIxLndpZHRoIC8gMiwgeTogYmIxLnkgKyBiYjEuaGVpZ2h0ICsgb2ZmMSB9LFxuXG4gIC8qIFdFU1QgKi9cbiAgeyB4OiBiYjEueCAtIG9mZjEsIHk6IGJiMS55ICsgYmIxLmhlaWdodCAvIDIgfSxcblxuICAvKiBFQVNUICAxICovXG4gIHsgeDogYmIxLnggKyBiYjEud2lkdGggKyBvZmYxLCB5OiBiYjEueSArIGJiMS5oZWlnaHQgLyAyIH0sXG5cbiAgLyogTk9SVEggMiAqL1xuICB7IHg6IGJiMi54ICsgYmIyLndpZHRoIC8gMiwgeTogYmIyLnkgLSBvZmYyIH0sXG5cbiAgLyogU09VVEggMiAqL1xuICB7IHg6IGJiMi54ICsgYmIyLndpZHRoIC8gMiwgeTogYmIyLnkgKyBiYjIuaGVpZ2h0ICsgb2ZmMiB9LFxuXG4gIC8qIFdFU1QgIDIgKi9cbiAgeyB4OiBiYjIueCAtIG9mZjIsIHk6IGJiMi55ICsgYmIyLmhlaWdodCAvIDIgfSxcblxuICAvKiBFQVNUICAyICovXG4gIHsgeDogYmIyLnggKyBiYjIud2lkdGggKyBvZmYyLCB5OiBiYjIueSArIGJiMi5oZWlnaHQgLyAyIH1dO1xufTtcblxuX3JhcGhhZWwyLmRlZmF1bHQuZm4uY29ubmVjdGlvbiA9IGZ1bmN0aW9uIENvbm5lY3Rpb24ob2JqMSwgb2JqMiwgc3R5bGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8qIGNyZWF0ZSBhbmQgcmV0dXJuIG5ldyBjb25uZWN0aW9uICovXG4gIHZhciBlZGdlID0ge1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICAgIGRyYXc6IGZ1bmN0aW9uIGRyYXcoKSB7XG5cbiAgICAgIHZhciBwID0gZ2V0Q29ubmVjdGlvblBvaW50cyhvYmoxLCBvYmoyKTtcblxuICAgICAgLyogZGlzdGFuY2VzIGJldHdlZW4gb2JqZWN0cyBhbmQgYWNjb3JkaW5nIGNvb3JkaW5hdGVzIGNvbm5lY3Rpb24gKi9cbiAgICAgIHZhciBkID0ge307XG4gICAgICB2YXIgZGlzID0gW107XG4gICAgICB2YXIgZHggPSB2b2lkIDA7XG4gICAgICB2YXIgZHkgPSB2b2lkIDA7XG5cbiAgICAgIC8qXG4gICAgICAgKiBmaW5kIG91dCB0aGUgYmVzdCBjb25uZWN0aW9uIGNvb3JkaW5hdGVzIGJ5IHRyeWluZyBhbGwgcG9zc2libGUgd2F5c1xuICAgICAgICovXG4gICAgICAvKiBsb29wIHRoZSBmaXJzdCBvYmplY3QncyBjb25uZWN0aW9uIGNvb3JkaW5hdGVzICovXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXG4gICAgICAgIC8qIGxvb3AgdGhlIHNlY29uZCBvYmplY3QncyBjb25uZWN0aW9uIGNvb3JkaW5hdGVzICovXG4gICAgICAgIGZvciAodmFyIGogPSA0OyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgZHggPSBNYXRoLmFicyhwW2ldLnggLSBwW2pdLngpO1xuICAgICAgICAgIGR5ID0gTWF0aC5hYnMocFtpXS55IC0gcFtqXS55KTtcbiAgICAgICAgICBpZiAoaSA9PT0gaiAtIDQgfHwgKGkgIT09IDMgJiYgaiAhPT0gNiB8fCBwW2ldLnggPCBwW2pdLngpICYmIChpICE9PSAyICYmIGogIT09IDcgfHwgcFtpXS54ID4gcFtqXS54KSAmJiAoaSAhPT0gMCAmJiBqICE9PSA1IHx8IHBbaV0ueSA+IHBbal0ueSkgJiYgKGkgIT09IDEgJiYgaiAhPT0gNCB8fCBwW2ldLnkgPCBwW2pdLnkpKSB7XG4gICAgICAgICAgICBkaXMucHVzaChkeCArIGR5KTtcbiAgICAgICAgICAgIGRbZGlzW2Rpcy5sZW5ndGggLSAxXS50b0ZpeGVkKDMpXSA9IFtpLCBqXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciByZXMgPSBkaXMubGVuZ3RoID09PSAwID8gWzAsIDRdIDogZFtNYXRoLm1pbi5hcHBseShNYXRoLCBkaXMpLnRvRml4ZWQoMyldO1xuXG4gICAgICAvKiBiZXppZXIgcGF0aCAqL1xuICAgICAgdmFyIHgxID0gcFtyZXNbMF1dLng7XG4gICAgICB2YXIgeTEgPSBwW3Jlc1swXV0ueTtcbiAgICAgIHZhciB4NCA9IHBbcmVzWzFdXS54O1xuICAgICAgdmFyIHk0ID0gcFtyZXNbMV1dLnk7XG4gICAgICBkeCA9IE1hdGgubWF4KE1hdGguYWJzKHgxIC0geDQpIC8gMiwgMTApO1xuICAgICAgZHkgPSBNYXRoLm1heChNYXRoLmFicyh5MSAtIHk0KSAvIDIsIDEwKTtcbiAgICAgIHZhciB4MiA9IFt4MSwgeDEsIHgxIC0gZHgsIHgxICsgZHhdW3Jlc1swXV0udG9GaXhlZCgzKTtcbiAgICAgIHZhciB5MiA9IFt5MSAtIGR5LCB5MSArIGR5LCB5MSwgeTFdW3Jlc1swXV0udG9GaXhlZCgzKTtcbiAgICAgIHZhciB4MyA9IFswLCAwLCAwLCAwLCB4NCwgeDQsIHg0IC0gZHgsIHg0ICsgZHhdW3Jlc1sxXV0udG9GaXhlZCgzKTtcbiAgICAgIHZhciB5MyA9IFswLCAwLCAwLCAwLCB5MSArIGR5LCB5MSAtIGR5LCB5NCwgeTRdW3Jlc1sxXV0udG9GaXhlZCgzKTtcblxuICAgICAgLyogYXNzZW1ibGUgcGF0aCBhbmQgYXJyb3cgKi9cbiAgICAgIHZhciBwYXRoID0gWydNJyArIHgxLnRvRml4ZWQoMyksIHkxLnRvRml4ZWQoMyksICdDJyArIHgyLCB5MiwgeDMsIHkzLCB4NC50b0ZpeGVkKDMpLCB5NC50b0ZpeGVkKDMpXS5qb2luKCcsJyk7XG5cbiAgICAgIC8qIGFycm93ICovXG4gICAgICBpZiAoc3R5bGUgJiYgc3R5bGUuZGlyZWN0ZWQpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBtYWduaXR1ZGUsIGxlbmd0aCBvZiB0aGUgbGFzdCBwYXRoIHZlY3RvclxuICAgICAgICAgIHZhciBtYWcgPSBNYXRoLnNxcnQoKHk0IC0geTMpICogKHk0IC0geTMpICsgKHg0IC0geDMpICogKHg0IC0geDMpKTtcbiAgICAgICAgICAvLyB2ZWN0b3Igbm9ybWFsaXNhdGlvbiB0byBzcGVjaWZpZWQgbGVuZ3RoXG4gICAgICAgICAgdmFyIG5vcm0gPSBmdW5jdGlvbiBub3JtKHgsIGwpIHtcbiAgICAgICAgICAgIHJldHVybiAteCAqIChsIHx8IDUpIC8gbWFnO1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gY2FsY3VsYXRlIGFycmF5IGNvb3JkaW5hdGVzICh0d28gbGluZXMgb3J0aG9nb25hbCB0byB0aGUgcGF0aCB2ZWN0b3IpXG4gICAgICAgICAgdmFyIGFyciA9IFt7XG4gICAgICAgICAgICB4OiAobm9ybSh4NCAtIHgzKSArIG5vcm0oeTQgLSB5MykgKyB4NCkudG9GaXhlZCgzKSxcbiAgICAgICAgICAgIHk6IChub3JtKHk0IC0geTMpICsgbm9ybSh4NCAtIHgzKSArIHk0KS50b0ZpeGVkKDMpXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgeDogKG5vcm0oeDQgLSB4MykgLSBub3JtKHk0IC0geTMpICsgeDQpLnRvRml4ZWQoMyksXG4gICAgICAgICAgICB5OiAobm9ybSh5NCAtIHkzKSAtIG5vcm0oeDQgLSB4MykgKyB5NCkudG9GaXhlZCgzKVxuICAgICAgICAgIH1dO1xuICAgICAgICAgIHBhdGggPSBwYXRoICsgJyxNJyArIGFyclswXS54ICsgJywnICsgYXJyWzBdLnkgKyAnLEwnICsgeDQgKyAnLCcgKyB5NCArICcsTCcgKyBhcnJbMV0ueCArICcsJyArIGFyclsxXS55O1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICAvKiBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBtb3ZpbmcgZXhpc3RlbnQgcGF0aChzKSwgZS5nLiBhbmltYXRlKCkgb3IgYXR0cigpICovXG4gICAgICB2YXIgbW92ZSA9ICdhdHRyJztcblxuICAgICAgLyogYXBwbHlpbmcgcGF0aChzKSAqL1xuICAgICAgaWYgKGVkZ2UuZmcpIHtcbiAgICAgICAgZWRnZS5mZ1ttb3ZlXSh7IHBhdGg6IHBhdGggfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGdlLmZnID0gc2VsZi5wYXRoKHBhdGgpLmF0dHIoeyBzdHJva2U6IHN0eWxlICYmIHN0eWxlLnN0cm9rZSB8fCAnIzAwMCcsIGZpbGw6ICdub25lJyB9KS50b0JhY2soKTtcbiAgICAgIH1cbiAgICAgIGlmIChlZGdlLmJnKSB7XG4gICAgICAgIGVkZ2UuYmdbbW92ZV0oeyBwYXRoOiBwYXRoIH0pO1xuICAgICAgfSBlbHNlIGlmIChzdHlsZSAmJiBzdHlsZS5maWxsICYmIHN0eWxlLmZpbGwuc3BsaXQpIHtcbiAgICAgICAgZWRnZS5iZyA9IHNlbGYucGF0aChwYXRoKS5hdHRyKHtcbiAgICAgICAgICBzdHJva2U6IHN0eWxlLmZpbGwuc3BsaXQoJ3wnKVswXSxcbiAgICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHN0eWxlLmZpbGwuc3BsaXQoJ3wnKVsxXSB8fCAzXG4gICAgICAgIH0pLnRvQmFjaygpO1xuICAgICAgfVxuXG4gICAgICAvKiBzZXR0aW5nIGxhYmVsICovXG4gICAgICBpZiAoc3R5bGUgJiYgc3R5bGUubGFiZWwpIHtcbiAgICAgICAgaWYgKGVkZ2UubGFiZWwpIHtcbiAgICAgICAgICBlZGdlLmxhYmVsLmF0dHIoeyB4OiAoeDEgKyB4NCkgLyAyLCB5OiAoeTEgKyB5NCkgLyAyIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkZ2UubGFiZWwgPSBzZWxmLnRleHQoKHgxICsgeDQpIC8gMiwgKHkxICsgeTQpIC8gMiwgc3R5bGUubGFiZWwpLmF0dHIoe1xuICAgICAgICAgICAgZmlsbDogJyMwMDAnLFxuICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IHN0eWxlWydmb250LXNpemUnXSB8fCAnMTBweCcsXG4gICAgICAgICAgICAnZmlsbC1vcGFjaXR5JzogJzAuNidcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3R5bGUgJiYgc3R5bGUubGFiZWwgJiYgc3R5bGVbJ2xhYmVsLXN0eWxlJ10gJiYgZWRnZS5sYWJlbCkge1xuICAgICAgICBlZGdlLmxhYmVsLmF0dHIoc3R5bGVbJ2xhYmVsLXN0eWxlJ10pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3R5bGUgJiYgc3R5bGUuY2FsbGJhY2spIHtcbiAgICAgICAgc3R5bGUuY2FsbGJhY2soZWRnZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBlZGdlLmRyYXcoKTtcbiAgcmV0dXJuIGVkZ2U7XG59O1xuXG4vLyA8L1JhcGhhZWwuZm4uY29ubmVjdGlvbj4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfY29sbGVjdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgcmVuZGVyaW5nIG5vZGVzXG4gKlxuICogQ2FuIHRyYW5zZm9ybSBjb29yZGluYXRlcyB0byBmaXQgb250byB0aGUgY2FudmFzXG4gKi9cbnZhciBSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogQHBhcmFtIHtEb21FbGVtZW50fFN0cmluZ30gZWxlbWVudCB0YXJnZXQgZG9tIGVsZW1lbnQgb3IgcXVlcnlTZWxlY3RvclxuICAgKiBAcGFyYW0ge0dyYXBofSBncmFwaCBEcmFjdWxhIEdyYXBoIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAob3B0aW9uYWwpIHdpZHRoIG9mIHRoZSBjYW52YXMsIGRlZmF1bHQgNDAwXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgKG9wdGlvbmFsKSBoZWlnaHQgb2YgdGhlIGNhbnZhcywgZGVmYXVsdCAzMDBcbiAgICovXG4gIGZ1bmN0aW9uIFJlbmRlcmVyKGVsZW1lbnQsIGdyYXBoLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlbmRlcmVyKTtcblxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcbiAgICAvLyBDb252ZXJ0IGEgcXVlcnkgaW50byBhIGRvbSBlbGVtZW50XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIHNlbGVjdG9yID0gdHlwZW9mICQgIT09ICd1bmRlZmluZWQnID8gJCA6IGZ1bmN0aW9uIChxKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHEpO1xuICAgICAgfTtcbiAgICAgIGVsZW1lbnQgPSBzZWxlY3RvcihlbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgNDAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDMwMDtcbiAgICB0aGlzLnJhZGl1cyA9IDQwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoZSBub2RlcyB3aXRoaW4gdGhlIGNhbnZhcyBkaW1lbnNpb25zXG4gICAqIEtlZXAgYSBkaXN0YW5jZSB0byB0aGUgY2FudmFzIGVkZ2VzIG9mIGhhbGYgYSBub2RlIHJhZGl1c1xuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhSZW5kZXJlciwgW3tcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuZmFjdG9yWCA9ICh0aGlzLndpZHRoIC0gMiAqIHRoaXMucmFkaXVzKSAvICh0aGlzLmdyYXBoLmxheW91dE1heFggLSB0aGlzLmdyYXBoLmxheW91dE1pblgpO1xuXG4gICAgICB0aGlzLmZhY3RvclkgPSAodGhpcy5oZWlnaHQgLSAyICogdGhpcy5yYWRpdXMpIC8gKHRoaXMuZ3JhcGgubGF5b3V0TWF4WSAtIHRoaXMuZ3JhcGgubGF5b3V0TWluWSk7XG5cbiAgICAgICgwLCBfY29sbGVjdGlvbi5lYWNoKSh0aGlzLmdyYXBoLm5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBub2RlLnBvaW50ID0gX3RoaXMudHJhbnNsYXRlKFtub2RlLmxheW91dFBvc1gsIG5vZGUubGF5b3V0UG9zWV0pO1xuICAgICAgICBfdGhpcy5kcmF3Tm9kZShub2RlKTtcbiAgICAgIH0pO1xuICAgICAgKDAsIF9jb2xsZWN0aW9uLmVhY2gpKHRoaXMuZ3JhcGguZWRnZXMsIGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgIF90aGlzLmRyYXdFZGdlKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHBvaW50KSB7XG4gICAgICByZXR1cm4gW01hdGgucm91bmQoKHBvaW50WzBdIC0gdGhpcy5ncmFwaC5sYXlvdXRNaW5YKSAqIHRoaXMuZmFjdG9yWCArIHRoaXMucmFkaXVzKSwgTWF0aC5yb3VuZCgocG9pbnRbMV0gLSB0aGlzLmdyYXBoLmxheW91dE1pblkpICogdGhpcy5mYWN0b3JZICsgdGhpcy5yYWRpdXMpXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkcmF3Tm9kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXdOb2RlKG5vZGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZHJhd0VkZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3RWRnZShlZGdlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGEgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYVtfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoUmVuZGVyZXIsIFtudWxsXS5jb25jYXQoYSkpKSgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSZW5kZXJlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVuZGVyZXI7IiwiLy8gQ29yZVxudmFyIGRyYWN1bGEgPSByZXF1aXJlKCcuL2Rpc3QvZHJhY3VsYScpLmRlZmF1bHRcblxuLy8gTGF5b3V0c1xudmFyIHNwcmluZyA9IHJlcXVpcmUoJy4vZGlzdC9sYXlvdXQvc3ByaW5nJykuZGVmYXVsdFxudmFyIG9yZGVyZWRUcmVlID0gcmVxdWlyZSgnLi9kaXN0L2xheW91dC9vcmRlcmVkX3RyZWUnKS5kZWZhdWx0XG52YXIgdG91cm5hbWVudFRyZWUgPSByZXF1aXJlKCcuL2Rpc3QvbGF5b3V0L3RvdXJuYW1lbnRfdHJlZScpLmRlZmF1bHRcblxuLy8gUmVuZGVyZXJzXG52YXIgcmFwaGFlbCA9IHJlcXVpcmUoJy4vZGlzdC9yZW5kZXJlci9yYXBoYWVsJykuZGVmYXVsdFxuXG5tb2R1bGUuZXhwb3J0cy5HcmFwaCA9IGRyYWN1bGFcblxubW9kdWxlLmV4cG9ydHMuTGF5b3V0ID0ge1xuICBPcmRlcmVkVHJlZTogb3JkZXJlZFRyZWUsXG4gIFNwcmluZzogc3ByaW5nLFxuICBUb3VybmFtZW50VHJlZTogdG91cm5hbWVudFRyZWVcbn1cblxubW9kdWxlLmV4cG9ydHMuUmVuZGVyZXIgPSB7XG4gIFJhcGhhZWw6IHJhcGhhZWwsXG59XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuIiwidmFyIGxpc3RDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlQ2xlYXInKSxcbiAgICBsaXN0Q2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVEZWxldGUnKSxcbiAgICBsaXN0Q2FjaGVHZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVHZXQnKSxcbiAgICBsaXN0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVIYXMnKSxcbiAgICBsaXN0Q2FjaGVTZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Q2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXRDYWNoZTtcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBzdGFja0NsZWFyID0gcmVxdWlyZSgnLi9fc3RhY2tDbGVhcicpLFxuICAgIHN0YWNrRGVsZXRlID0gcmVxdWlyZSgnLi9fc3RhY2tEZWxldGUnKSxcbiAgICBzdGFja0dldCA9IHJlcXVpcmUoJy4vX3N0YWNrR2V0JyksXG4gICAgc3RhY2tIYXMgPSByZXF1aXJlKCcuL19zdGFja0hhcycpLFxuICAgIHN0YWNrU2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhY2s7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gVWludDhBcnJheTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUFnZ3JlZ2F0b3JgIGZvciBhcnJheXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNldHRlciBUaGUgZnVuY3Rpb24gdG8gc2V0IGBhY2N1bXVsYXRvcmAgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGl0ZXJhdGVlIHRvIHRyYW5zZm9ybSBrZXlzLlxuICogQHBhcmFtIHtPYmplY3R9IGFjY3VtdWxhdG9yIFRoZSBpbml0aWFsIGFnZ3JlZ2F0ZWQgb2JqZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBhY2N1bXVsYXRvcmAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5QWdncmVnYXRvcihhcnJheSwgc2V0dGVyLCBpdGVyYXRlZSwgYWNjdW11bGF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgc2V0dGVyKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaXRlcmF0ZWUodmFsdWUpLCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5QWdncmVnYXRvcjtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaFJpZ2h0YCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoUmlnaHQoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2xlbmd0aF0sIGxlbmd0aCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2hSaWdodDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmV2ZXJ5YCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBwYXNzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUV2ZXJ5KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoIXByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFdmVyeTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZpbHRlcmAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzSW5kZXggPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0W3Jlc0luZGV4KytdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlGaWx0ZXI7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4Jyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwiLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5UHVzaDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlSZWR1Y2U7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VSaWdodGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZVJpZ2h0KGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbLS1sZW5ndGhdO1xuICB9XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2xlbmd0aF0sIGxlbmd0aCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVJlZHVjZVJpZ2h0O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlTb21lO1xuIiwidmFyIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2Jhc2VQcm9wZXJ0eScpO1xuXG4vKipcbiAqIEdldHMgdGhlIHNpemUgb2YgYW4gQVNDSUkgYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3RyaW5nIHNpemUuXG4gKi9cbnZhciBhc2NpaVNpemUgPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzY2lpU2l6ZTtcbiIsIi8qKlxuICogQ29udmVydHMgYW4gQVNDSUkgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5zcGxpdCgnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNjaWlUb0FycmF5O1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcbiIsInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyk7XG5cbi8qKlxuICogQWdncmVnYXRlcyBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgb24gYGFjY3VtdWxhdG9yYCB3aXRoIGtleXMgdHJhbnNmb3JtZWRcbiAqIGJ5IGBpdGVyYXRlZWAgYW5kIHZhbHVlcyBzZXQgYnkgYHNldHRlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNldHRlciBUaGUgZnVuY3Rpb24gdG8gc2V0IGBhY2N1bXVsYXRvcmAgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGl0ZXJhdGVlIHRvIHRyYW5zZm9ybSBrZXlzLlxuICogQHBhcmFtIHtPYmplY3R9IGFjY3VtdWxhdG9yIFRoZSBpbml0aWFsIGFnZ3JlZ2F0ZWQgb2JqZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBhY2N1bXVsYXRvcmAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBZ2dyZWdhdG9yKGNvbGxlY3Rpb24sIHNldHRlciwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yKSB7XG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICBzZXR0ZXIoYWNjdW11bGF0b3IsIHZhbHVlLCBpdGVyYXRlZSh2YWx1ZSksIGNvbGxlY3Rpb24pO1xuICB9KTtcbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBZ2dyZWdhdG9yO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jbGFtcGAgd2hpY2ggZG9lc24ndCBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIFRoZSBudW1iZXIgdG8gY2xhbXAuXG4gKiBAcGFyYW0ge251bWJlcn0gW2xvd2VyXSBUaGUgbG93ZXIgYm91bmQuXG4gKiBAcGFyYW0ge251bWJlcn0gdXBwZXIgVGhlIHVwcGVyIGJvdW5kLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY2xhbXBlZCBudW1iZXIuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbGFtcChudW1iZXIsIGxvd2VyLCB1cHBlcikge1xuICBpZiAobnVtYmVyID09PSBudW1iZXIpIHtcbiAgICBpZiAodXBwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbnVtYmVyID0gbnVtYmVyIDw9IHVwcGVyID8gbnVtYmVyIDogdXBwZXI7XG4gICAgfVxuICAgIGlmIChsb3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBudW1iZXIgPSBudW1iZXIgPj0gbG93ZXIgPyBudW1iZXIgOiBsb3dlcjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ2xhbXA7XG4iLCJ2YXIgYmFzZUZvck93biA9IHJlcXVpcmUoJy4vX2Jhc2VGb3JPd24nKSxcbiAgICBjcmVhdGVCYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2NyZWF0ZUJhc2VFYWNoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwidmFyIGJhc2VGb3JPd25SaWdodCA9IHJlcXVpcmUoJy4vX2Jhc2VGb3JPd25SaWdodCcpLFxuICAgIGNyZWF0ZUJhc2VFYWNoID0gcmVxdWlyZSgnLi9fY3JlYXRlQmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoUmlnaHRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2hSaWdodCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd25SaWdodCwgdHJ1ZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhY2hSaWdodDtcbiIsInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZXZlcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIHBhc3MgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWBcbiAqL1xuZnVuY3Rpb24gYmFzZUV2ZXJ5KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0ID0gISFwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRXZlcnk7XG4iLCJ2YXIgYmFzZUVhY2ggPSByZXF1aXJlKCcuL19iYXNlRWFjaCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbHRlcmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbHRlcjtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kSW5kZXg7XG4iLCJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNGbGF0dGVuYWJsZSA9IHJlcXVpcmUoJy4vX2lzRmxhdHRlbmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG4iLCJ2YXIgY3JlYXRlQmFzZUZvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG4iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vX2Jhc2VGb3InKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yT3duO1xuIiwidmFyIGJhc2VGb3JSaWdodCA9IHJlcXVpcmUoJy4vX2Jhc2VGb3JSaWdodCcpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25SaWdodGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd25SaWdodChvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvclJpZ2h0KG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JPd25SaWdodDtcbiIsInZhciBjcmVhdGVCYXNlRm9yID0gcmVxdWlyZSgnLi9fY3JlYXRlQmFzZUZvcicpO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYmFzZUZvcmAgZXhjZXB0IHRoYXQgaXQgaXRlcmF0ZXMgb3ZlciBwcm9wZXJ0aWVzXG4gKiBpbiB0aGUgb3Bwb3NpdGUgb3JkZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yUmlnaHQgPSBjcmVhdGVCYXNlRm9yKHRydWUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JSaWdodDtcbiIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgaXNLZXkgPSByZXF1aXJlKCcuL19pc0tleScpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUhhc0luO1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUlzTmFOID0gcmVxdWlyZSgnLi9fYmFzZUlzTmFOJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xuICB9XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUluZGV4T2Y7XG4iLCJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4vX2lzS2V5JyksXG4gICAgbGFzdCA9IHJlcXVpcmUoJy4vbGFzdCcpLFxuICAgIHBhcmVudCA9IHJlcXVpcmUoJy4vX3BhcmVudCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbnZva2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICogbWV0aG9kIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIHRoZSBtZXRob2Qgd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIGludm9rZWQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiYXNlSW52b2tlKG9iamVjdCwgcGF0aCwgYXJncykge1xuICBpZiAoIWlzS2V5KHBhdGgsIG9iamVjdCkpIHtcbiAgICBwYXRoID0gY2FzdFBhdGgocGF0aCk7XG4gICAgb2JqZWN0ID0gcGFyZW50KG9iamVjdCwgcGF0aCk7XG4gICAgcGF0aCA9IGxhc3QocGF0aCk7XG4gIH1cbiAgdmFyIGZ1bmMgPSBvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IG9iamVjdFt0b0tleShwYXRoKV07XG4gIHJldHVybiBmdW5jID09IG51bGwgPyB1bmRlZmluZWQgOiBhcHBseShmdW5jLCBvYmplY3QsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJbnZva2U7XG4iLCJ2YXIgYmFzZUlzRXF1YWxEZWVwID0gcmVxdWlyZSgnLi9fYmFzZUlzRXF1YWxEZWVwJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy5cbiAqICBUaGUgYml0bWFzayBtYXkgYmUgY29tcG9zZWQgb2YgdGhlIGZvbGxvd2luZyBmbGFnczpcbiAqICAgICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAgICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGVxdWFsQXJyYXlzID0gcmVxdWlyZSgnLi9fZXF1YWxBcnJheXMnKSxcbiAgICBlcXVhbEJ5VGFnID0gcmVxdWlyZSgnLi9fZXF1YWxCeVRhZycpLFxuICAgIGVxdWFsT2JqZWN0cyA9IHJlcXVpcmUoJy4vX2VxdWFsT2JqZWN0cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0hvc3RPYmplY3QgPSByZXF1aXJlKCcuL19pc0hvc3RPYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IGdldFRhZyhvYmplY3QpO1xuICAgIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBnZXRUYWcob3RoZXIpO1xuICAgIG90aFRhZyA9IG90aFRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvYmplY3QpLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob3RoZXIpLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsRGVlcDtcbiIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRywgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNNYXRjaDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmFOO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0hvc3RPYmplY3QgPSByZXF1aXJlKCcuL19pc0hvc3RPYmplY3QnKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNUeXBlZEFycmF5O1xuIiwidmFyIGJhc2VNYXRjaGVzID0gcmVxdWlyZSgnLi9fYmFzZU1hdGNoZXMnKSxcbiAgICBiYXNlTWF0Y2hlc1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9fYmFzZU1hdGNoZXNQcm9wZXJ0eScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBwcm9wZXJ0eSA9IHJlcXVpcmUoJy4vcHJvcGVydHknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBpdGVyYXRlZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gIC8vIERvbid0IHN0b3JlIHRoZSBgdHlwZW9mYCByZXN1bHQgaW4gYSB2YXJpYWJsZSB0byBhdm9pZCBhIEpJVCBidWcgaW4gU2FmYXJpIDkuXG4gIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXRlcmF0ZWU7XG4iLCJ2YXIgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcbiIsInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWFwYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBpc0FycmF5TGlrZShjb2xsZWN0aW9uKSA/IEFycmF5KGNvbGxlY3Rpb24ubGVuZ3RoKSA6IFtdO1xuXG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBpdGVyYXRlZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hcDtcbiIsInZhciBiYXNlSXNNYXRjaCA9IHJlcXVpcmUoJy4vX2Jhc2VJc01hdGNoJyksXG4gICAgZ2V0TWF0Y2hEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWF0Y2hEYXRhJyksXG4gICAgbWF0Y2hlc1N0cmljdENvbXBhcmFibGUgPSByZXF1aXJlKCcuL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIG1hdGNoRGF0YSA9IGdldE1hdGNoRGF0YShzb3VyY2UpO1xuICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShtYXRjaERhdGFbMF1bMF0sIG1hdGNoRGF0YVswXVsxXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT09IHNvdXJjZSB8fCBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWF0Y2hlcztcbiIsInZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsJyksXG4gICAgZ2V0ID0gcmVxdWlyZSgnLi9nZXQnKSxcbiAgICBoYXNJbiA9IHJlcXVpcmUoJy4vaGFzSW4nKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4vX2lzS2V5JyksXG4gICAgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9faXNTdHJpY3RDb21wYXJhYmxlJyksXG4gICAgbWF0Y2hlc1N0cmljdENvbXBhcmFibGUgPSByZXF1aXJlKCcuL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZScpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyA9IDEsXG4gICAgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gIGlmIChpc0tleShwYXRoKSAmJiBpc1N0cmljdENvbXBhcmFibGUoc3JjVmFsdWUpKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKHRvS2V5KHBhdGgpLCBzcmNWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBvYmpWYWx1ZSA9IGdldChvYmplY3QsIHBhdGgpO1xuICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICA/IGhhc0luKG9iamVjdCwgcGF0aClcbiAgICAgIDogYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCB1bmRlZmluZWQsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hdGNoZXNQcm9wZXJ0eTtcbiIsInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZU1hcCA9IHJlcXVpcmUoJy4vX2Jhc2VNYXAnKSxcbiAgICBiYXNlU29ydEJ5ID0gcmVxdWlyZSgnLi9fYmFzZVNvcnRCeScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIGNvbXBhcmVNdWx0aXBsZSA9IHJlcXVpcmUoJy4vX2NvbXBhcmVNdWx0aXBsZScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm9yZGVyQnlgIHdpdGhvdXQgcGFyYW0gZ3VhcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IGl0ZXJhdGVlcyBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcmRlcnMgVGhlIHNvcnQgb3JkZXJzIG9mIGBpdGVyYXRlZXNgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgc29ydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlT3JkZXJCeShjb2xsZWN0aW9uLCBpdGVyYXRlZXMsIG9yZGVycykge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaXRlcmF0ZWVzID0gYXJyYXlNYXAoaXRlcmF0ZWVzLmxlbmd0aCA/IGl0ZXJhdGVlcyA6IFtpZGVudGl0eV0sIGJhc2VVbmFyeShiYXNlSXRlcmF0ZWUpKTtcblxuICB2YXIgcmVzdWx0ID0gYmFzZU1hcChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGNyaXRlcmlhID0gYXJyYXlNYXAoaXRlcmF0ZWVzLCBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGl0ZXJhdGVlKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyAnY3JpdGVyaWEnOiBjcml0ZXJpYSwgJ2luZGV4JzogKytpbmRleCwgJ3ZhbHVlJzogdmFsdWUgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJhc2VTb3J0QnkocmVzdWx0LCBmdW5jdGlvbihvYmplY3QsIG90aGVyKSB7XG4gICAgcmV0dXJuIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlT3JkZXJCeTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuIiwidmFyIGJhc2VHZXQgPSByZXF1aXJlKCcuL19iYXNlR2V0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUHJvcGVydHlgIHdoaWNoIHN1cHBvcnRzIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5RGVlcChwYXRoKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eURlZXA7XG4iLCIvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlRmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIG5hdGl2ZVJhbmRvbSA9IE1hdGgucmFuZG9tO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJhbmRvbWAgd2l0aG91dCBzdXBwb3J0IGZvciByZXR1cm5pbmdcbiAqIGZsb2F0aW5nLXBvaW50IG51bWJlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3dlciBUaGUgbG93ZXIgYm91bmQuXG4gKiBAcGFyYW0ge251bWJlcn0gdXBwZXIgVGhlIHVwcGVyIGJvdW5kLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgcmFuZG9tIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gYmFzZVJhbmRvbShsb3dlciwgdXBwZXIpIHtcbiAgcmV0dXJuIGxvd2VyICsgbmF0aXZlRmxvb3IobmF0aXZlUmFuZG9tKCkgKiAodXBwZXIgLSBsb3dlciArIDEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUmFuZG9tO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZWR1Y2VgIGFuZCBgXy5yZWR1Y2VSaWdodGAsIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMsIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYGNvbGxlY3Rpb25gIHVzaW5nIGBlYWNoRnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IGFjY3VtdWxhdG9yIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBpbml0QWNjdW0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3Qgb3IgbGFzdCBlbGVtZW50IG9mXG4gKiAgYGNvbGxlY3Rpb25gIGFzIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBgY29sbGVjdGlvbmAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZWR1Y2UoY29sbGVjdGlvbiwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0sIGVhY2hGdW5jKSB7XG4gIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIGFjY3VtdWxhdG9yID0gaW5pdEFjY3VtXG4gICAgICA/IChpbml0QWNjdW0gPSBmYWxzZSwgdmFsdWUpXG4gICAgICA6IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICB9KTtcbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VSZWR1Y2U7XG4iLCJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VSZXN0O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTbGljZTtcbiIsInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc29tZWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTb21lKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0O1xuXG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIHJlc3VsdCA9IHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiAhcmVzdWx0O1xuICB9KTtcbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTb21lO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zb3J0QnlgIHdoaWNoIHVzZXMgYGNvbXBhcmVyYCB0byBkZWZpbmUgdGhlXG4gKiBzb3J0IG9yZGVyIG9mIGBhcnJheWAgYW5kIHJlcGxhY2VzIGNyaXRlcmlhIG9iamVjdHMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyZXIgVGhlIGZ1bmN0aW9uIHRvIGRlZmluZSBzb3J0IG9yZGVyLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTb3J0QnkoYXJyYXksIGNvbXBhcmVyKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgYXJyYXkuc29ydChjb21wYXJlcik7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGFycmF5W2xlbmd0aF0gPSBhcnJheVtsZW5ndGhdLnZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU29ydEJ5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG4iLCJ2YXIgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIG9mIGBwcm9wc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHJldHVybiBhcnJheU1hcChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVmFsdWVzO1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBzdHJpbmdUb1BhdGggPSByZXF1aXJlKCcuL19zdHJpbmdUb1BhdGgnKTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RQYXRoO1xuIiwidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKipcbiAqIENvbXBhcmVzIHZhbHVlcyB0byBzb3J0IHRoZW0gaW4gYXNjZW5kaW5nIG9yZGVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHNvcnQgb3JkZXIgaW5kaWNhdG9yIGZvciBgdmFsdWVgLlxuICovXG5mdW5jdGlvbiBjb21wYXJlQXNjZW5kaW5nKHZhbHVlLCBvdGhlcikge1xuICBpZiAodmFsdWUgIT09IG90aGVyKSB7XG4gICAgdmFyIHZhbElzRGVmaW5lZCA9IHZhbHVlICE9PSB1bmRlZmluZWQsXG4gICAgICAgIHZhbElzTnVsbCA9IHZhbHVlID09PSBudWxsLFxuICAgICAgICB2YWxJc1JlZmxleGl2ZSA9IHZhbHVlID09PSB2YWx1ZSxcbiAgICAgICAgdmFsSXNTeW1ib2wgPSBpc1N5bWJvbCh2YWx1ZSk7XG5cbiAgICB2YXIgb3RoSXNEZWZpbmVkID0gb3RoZXIgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgb3RoSXNOdWxsID0gb3RoZXIgPT09IG51bGwsXG4gICAgICAgIG90aElzUmVmbGV4aXZlID0gb3RoZXIgPT09IG90aGVyLFxuICAgICAgICBvdGhJc1N5bWJvbCA9IGlzU3ltYm9sKG90aGVyKTtcblxuICAgIGlmICgoIW90aElzTnVsbCAmJiAhb3RoSXNTeW1ib2wgJiYgIXZhbElzU3ltYm9sICYmIHZhbHVlID4gb3RoZXIpIHx8XG4gICAgICAgICh2YWxJc1N5bWJvbCAmJiBvdGhJc0RlZmluZWQgJiYgb3RoSXNSZWZsZXhpdmUgJiYgIW90aElzTnVsbCAmJiAhb3RoSXNTeW1ib2wpIHx8XG4gICAgICAgICh2YWxJc051bGwgJiYgb3RoSXNEZWZpbmVkICYmIG90aElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAoIXZhbElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgIXZhbElzUmVmbGV4aXZlKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKCghdmFsSXNOdWxsICYmICF2YWxJc1N5bWJvbCAmJiAhb3RoSXNTeW1ib2wgJiYgdmFsdWUgPCBvdGhlcikgfHxcbiAgICAgICAgKG90aElzU3ltYm9sICYmIHZhbElzRGVmaW5lZCAmJiB2YWxJc1JlZmxleGl2ZSAmJiAhdmFsSXNOdWxsICYmICF2YWxJc1N5bWJvbCkgfHxcbiAgICAgICAgKG90aElzTnVsbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICghb3RoSXNEZWZpbmVkICYmIHZhbElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAhb3RoSXNSZWZsZXhpdmUpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUFzY2VuZGluZztcbiIsInZhciBjb21wYXJlQXNjZW5kaW5nID0gcmVxdWlyZSgnLi9fY29tcGFyZUFzY2VuZGluZycpO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8ub3JkZXJCeWAgdG8gY29tcGFyZSBtdWx0aXBsZSBwcm9wZXJ0aWVzIG9mIGEgdmFsdWUgdG8gYW5vdGhlclxuICogYW5kIHN0YWJsZSBzb3J0IHRoZW0uXG4gKlxuICogSWYgYG9yZGVyc2AgaXMgdW5zcGVjaWZpZWQsIGFsbCB2YWx1ZXMgYXJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIuIE90aGVyd2lzZSxcbiAqIHNwZWNpZnkgYW4gb3JkZXIgb2YgXCJkZXNjXCIgZm9yIGRlc2NlbmRpbmcgb3IgXCJhc2NcIiBmb3IgYXNjZW5kaW5nIHNvcnQgb3JkZXJcbiAqIG9mIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW5bXXxzdHJpbmdbXX0gb3JkZXJzIFRoZSBvcmRlciB0byBzb3J0IGJ5IGZvciBlYWNoIHByb3BlcnR5LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc29ydCBvcmRlciBpbmRpY2F0b3IgZm9yIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb21wYXJlTXVsdGlwbGUob2JqZWN0LCBvdGhlciwgb3JkZXJzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgb2JqQ3JpdGVyaWEgPSBvYmplY3QuY3JpdGVyaWEsXG4gICAgICBvdGhDcml0ZXJpYSA9IG90aGVyLmNyaXRlcmlhLFxuICAgICAgbGVuZ3RoID0gb2JqQ3JpdGVyaWEubGVuZ3RoLFxuICAgICAgb3JkZXJzTGVuZ3RoID0gb3JkZXJzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciByZXN1bHQgPSBjb21wYXJlQXNjZW5kaW5nKG9iakNyaXRlcmlhW2luZGV4XSwgb3RoQ3JpdGVyaWFbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAoaW5kZXggPj0gb3JkZXJzTGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICB2YXIgb3JkZXIgPSBvcmRlcnNbaW5kZXhdO1xuICAgICAgcmV0dXJuIHJlc3VsdCAqIChvcmRlciA9PSAnZGVzYycgPyAtMSA6IDEpO1xuICAgIH1cbiAgfVxuICAvLyBGaXhlcyBhbiBgQXJyYXkjc29ydGAgYnVnIGluIHRoZSBKUyBlbmdpbmUgZW1iZWRkZWQgaW4gQWRvYmUgYXBwbGljYXRpb25zXG4gIC8vIHRoYXQgY2F1c2VzIGl0LCB1bmRlciBjZXJ0YWluIGNpcmN1bXN0YW5jZXMsIHRvIHByb3ZpZGUgdGhlIHNhbWUgdmFsdWUgZm9yXG4gIC8vIGBvYmplY3RgIGFuZCBgb3RoZXJgLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL3B1bGwvMTI0N1xuICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAvL1xuICAvLyBUaGlzIGFsc28gZW5zdXJlcyBhIHN0YWJsZSBzb3J0IGluIFY4IGFuZCBvdGhlciBlbmdpbmVzLlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9OTAgZm9yIG1vcmUgZGV0YWlscy5cbiAgcmV0dXJuIG9iamVjdC5pbmRleCAtIG90aGVyLmluZGV4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVNdWx0aXBsZTtcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlBcnJheTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgYXJyYXlBZ2dyZWdhdG9yID0gcmVxdWlyZSgnLi9fYXJyYXlBZ2dyZWdhdG9yJyksXG4gICAgYmFzZUFnZ3JlZ2F0b3IgPSByZXF1aXJlKCcuL19iYXNlQWdncmVnYXRvcicpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5ncm91cEJ5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0dGVyIFRoZSBmdW5jdGlvbiB0byBzZXQgYWNjdW11bGF0b3IgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2luaXRpYWxpemVyXSBUaGUgYWNjdW11bGF0b3Igb2JqZWN0IGluaXRpYWxpemVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWdncmVnYXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQWdncmVnYXRvcihzZXR0ZXIsIGluaXRpYWxpemVyKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5QWdncmVnYXRvciA6IGJhc2VBZ2dyZWdhdG9yLFxuICAgICAgICBhY2N1bXVsYXRvciA9IGluaXRpYWxpemVyID8gaW5pdGlhbGl6ZXIoKSA6IHt9O1xuXG4gICAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgc2V0dGVyLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDIpLCBhY2N1bXVsYXRvcik7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQWdncmVnYXRvcjtcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRWFjaDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG4iLCJ2YXIgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5maW5kYCBvciBgXy5maW5kTGFzdGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbmRJbmRleEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGZpbmQgdGhlIGNvbGxlY3Rpb24gaW5kZXguXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmaW5kIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGaW5kKGZpbmRJbmRleEZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZnJvbUluZGV4KSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpdGVyYXRlZSA9IGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpO1xuICAgICAgY29sbGVjdGlvbiA9IGtleXMoY29sbGVjdGlvbik7XG4gICAgICBwcmVkaWNhdGUgPSBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpOyB9O1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXhGdW5jKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZnJvbUluZGV4KTtcbiAgICByZXR1cm4gaW5kZXggPiAtMSA/IGl0ZXJhYmxlW2l0ZXJhdGVlID8gY29sbGVjdGlvbltpbmRleF0gOiBpbmRleF0gOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRmluZDtcbiIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlTb21lID0gcmVxdWlyZSgnLi9fYXJyYXlTb21lJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgPSAxLFxuICAgIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFzZWVuLmhhcyhvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4uYWRkKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgVWludDhBcnJheSA9IHJlcXVpcmUoJy4vX1VpbnQ4QXJyYXknKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgbWFwVG9BcnJheSA9IHJlcXVpcmUoJy4vX21hcFRvQXJyYXknKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gVU5PUkRFUkVEX0NPTVBBUkVfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEJ5VGFnO1xuIiwidmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hcERhdGE7XG4iLCJ2YXIgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9faXNTdHJpY3RDb21wYXJhYmxlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXRjaERhdGE7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VGFnO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzS2V5ID0gcmVxdWlyZSgnLi9faXNLZXknKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgdmFyIHJlc3VsdCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzUGF0aDtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZjAnLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHdpdGggW3plcm8td2lkdGggam9pbmVycyBvciBjb2RlIHBvaW50cyBmcm9tIHRoZSBhc3RyYWwgcGxhbmVzXShodHRwOi8vZWV2LmVlL2Jsb2cvMjAxNS8wOS8xMi9kYXJrLWNvcm5lcnMtb2YtdW5pY29kZS8pLiAqL1xudmFyIHJlSGFzVW5pY29kZSA9IFJlZ0V4cCgnWycgKyByc1pXSiArIHJzQXN0cmFsUmFuZ2UgICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgcnNWYXJSYW5nZSArICddJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIFVuaWNvZGUgc3ltYm9scy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYSBzeW1ib2wgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZShzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZS50ZXN0KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzVW5pY29kZTtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaERlbGV0ZTtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwcmVhZGFibGVTeW1ib2wgPSBTeW1ib2wgPyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmxhdHRlbmFibGUgYGFyZ3VtZW50c2Agb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzRmxhdHRlbmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSB8fFxuICAgICEhKHNwcmVhZGFibGVTeW1ib2wgJiYgdmFsdWUgJiYgdmFsdWVbc3ByZWFkYWJsZVN5bWJvbF0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRmxhdHRlbmFibGU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSG9zdE9iamVjdDtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5YWJsZTtcbiIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgaXRlcmF0b3JgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlcmF0b3IgVGhlIGl0ZXJhdG9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yKSB7XG4gIHZhciBkYXRhLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCEoZGF0YSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgIHJlc3VsdC5wdXNoKGRhdGEudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0b3JUb0FycmF5O1xuIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUNsZWFyO1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlRGVsZXRlO1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUdldDtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlSGFzO1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZVNldDtcbiIsIi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwVG9BcnJheTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVDcmVhdGU7XG4iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUtleXM7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgYmFzZUdldCA9IHJlcXVpcmUoJy4vX2Jhc2VHZXQnKSxcbiAgICBiYXNlU2xpY2UgPSByZXF1aXJlKCcuL19iYXNlU2xpY2UnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwYXJlbnQgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIHRvIGdldCB0aGUgcGFyZW50IHZhbHVlIG9mLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHBhcmVudCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gcGFyZW50KG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5sZW5ndGggPT0gMSA/IG9iamVjdCA6IGJhc2VHZXQob2JqZWN0LCBiYXNlU2xpY2UocGF0aCwgMCwgLTEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUhhcztcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0NsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrRGVsZXRlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrR2V0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0hhcztcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKSxcbiAgICBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja1NldDtcbiIsInZhciBhc2NpaVNpemUgPSByZXF1aXJlKCcuL19hc2NpaVNpemUnKSxcbiAgICBoYXNVbmljb2RlID0gcmVxdWlyZSgnLi9faGFzVW5pY29kZScpLFxuICAgIHVuaWNvZGVTaXplID0gcmVxdWlyZSgnLi9fdW5pY29kZVNpemUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBudW1iZXIgb2Ygc3ltYm9scyBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdHJpbmcgc2l6ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nU2l6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgID8gdW5pY29kZVNpemUoc3RyaW5nKVxuICAgIDogYXNjaWlTaXplKHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nU2l6ZTtcbiIsInZhciBhc2NpaVRvQXJyYXkgPSByZXF1aXJlKCcuL19hc2NpaVRvQXJyYXknKSxcbiAgICBoYXNVbmljb2RlID0gcmVxdWlyZSgnLi9faGFzVW5pY29kZScpLFxuICAgIHVuaWNvZGVUb0FycmF5ID0gcmVxdWlyZSgnLi9fdW5pY29kZVRvQXJyYXknKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgID8gdW5pY29kZVRvQXJyYXkoc3RyaW5nKVxuICAgIDogYXNjaWlUb0FycmF5KHN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nVG9BcnJheTtcbiIsInZhciBtZW1vaXplID0gcmVxdWlyZSgnLi9tZW1vaXplJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvUGF0aDtcbiIsInZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9LZXk7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCIvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNBc3RyYWxSYW5nZSA9ICdcXFxcdWQ4MDAtXFxcXHVkZmZmJyxcbiAgICByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyMycsXG4gICAgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGYwJyxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0FzdHJhbCA9ICdbJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9NYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSArICddJyxcbiAgICByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJyxcbiAgICByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknLFxuICAgIHJzTm9uQXN0cmFsID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JyxcbiAgICByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXScsXG4gICAgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIHJlZ2V4ZXMuICovXG52YXIgcmVPcHRNb2QgPSByc01vZGlmaWVyICsgJz8nLFxuICAgIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPycsXG4gICAgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNTeW1ib2wgPSAnKD86JyArIFtyc05vbkFzdHJhbCArIHJzQ29tYm8gKyAnPycsIHJzQ29tYm8sIHJzUmVnaW9uYWwsIHJzU3VyclBhaXIsIHJzQXN0cmFsXS5qb2luKCd8JykgKyAnKSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIFtzdHJpbmcgc3ltYm9sc10oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtdW5pY29kZSkuICovXG52YXIgcmVVbmljb2RlID0gUmVnRXhwKHJzRml0eiArICcoPz0nICsgcnNGaXR6ICsgJyl8JyArIHJzU3ltYm9sICsgcnNTZXEsICdnJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgc2l6ZSBvZiBhIFVuaWNvZGUgYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3RyaW5nIHNpemUuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVTaXplKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gcmVVbmljb2RlLmxhc3RJbmRleCA9IDA7XG4gIHdoaWxlIChyZVVuaWNvZGUudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0Kys7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmljb2RlU2l6ZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZjAnLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXN0cmFsID0gJ1snICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggW3N0cmluZyBzeW1ib2xzXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC11bmljb2RlKS4gKi9cbnZhciByZVVuaWNvZGUgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZSkgfHwgW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pY29kZVRvQXJyYXk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ2NvdW50QnknOiByZXF1aXJlKCcuL2NvdW50QnknKSxcbiAgJ2VhY2gnOiByZXF1aXJlKCcuL2VhY2gnKSxcbiAgJ2VhY2hSaWdodCc6IHJlcXVpcmUoJy4vZWFjaFJpZ2h0JyksXG4gICdldmVyeSc6IHJlcXVpcmUoJy4vZXZlcnknKSxcbiAgJ2ZpbHRlcic6IHJlcXVpcmUoJy4vZmlsdGVyJyksXG4gICdmaW5kJzogcmVxdWlyZSgnLi9maW5kJyksXG4gICdmaW5kTGFzdCc6IHJlcXVpcmUoJy4vZmluZExhc3QnKSxcbiAgJ2ZsYXRNYXAnOiByZXF1aXJlKCcuL2ZsYXRNYXAnKSxcbiAgJ2ZsYXRNYXBEZWVwJzogcmVxdWlyZSgnLi9mbGF0TWFwRGVlcCcpLFxuICAnZmxhdE1hcERlcHRoJzogcmVxdWlyZSgnLi9mbGF0TWFwRGVwdGgnKSxcbiAgJ2ZvckVhY2gnOiByZXF1aXJlKCcuL2ZvckVhY2gnKSxcbiAgJ2ZvckVhY2hSaWdodCc6IHJlcXVpcmUoJy4vZm9yRWFjaFJpZ2h0JyksXG4gICdncm91cEJ5JzogcmVxdWlyZSgnLi9ncm91cEJ5JyksXG4gICdpbmNsdWRlcyc6IHJlcXVpcmUoJy4vaW5jbHVkZXMnKSxcbiAgJ2ludm9rZU1hcCc6IHJlcXVpcmUoJy4vaW52b2tlTWFwJyksXG4gICdrZXlCeSc6IHJlcXVpcmUoJy4va2V5QnknKSxcbiAgJ21hcCc6IHJlcXVpcmUoJy4vbWFwJyksXG4gICdvcmRlckJ5JzogcmVxdWlyZSgnLi9vcmRlckJ5JyksXG4gICdwYXJ0aXRpb24nOiByZXF1aXJlKCcuL3BhcnRpdGlvbicpLFxuICAncmVkdWNlJzogcmVxdWlyZSgnLi9yZWR1Y2UnKSxcbiAgJ3JlZHVjZVJpZ2h0JzogcmVxdWlyZSgnLi9yZWR1Y2VSaWdodCcpLFxuICAncmVqZWN0JzogcmVxdWlyZSgnLi9yZWplY3QnKSxcbiAgJ3NhbXBsZSc6IHJlcXVpcmUoJy4vc2FtcGxlJyksXG4gICdzYW1wbGVTaXplJzogcmVxdWlyZSgnLi9zYW1wbGVTaXplJyksXG4gICdzaHVmZmxlJzogcmVxdWlyZSgnLi9zaHVmZmxlJyksXG4gICdzaXplJzogcmVxdWlyZSgnLi9zaXplJyksXG4gICdzb21lJzogcmVxdWlyZSgnLi9zb21lJyksXG4gICdzb3J0QnknOiByZXF1aXJlKCcuL3NvcnRCeScpXG59O1xuIiwidmFyIGNyZWF0ZUFnZ3JlZ2F0b3IgPSByZXF1aXJlKCcuL19jcmVhdGVBZ2dyZWdhdG9yJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2Yga2V5cyBnZW5lcmF0ZWQgZnJvbSB0aGUgcmVzdWx0cyBvZiBydW5uaW5nXG4gKiBlYWNoIGVsZW1lbnQgb2YgYGNvbGxlY3Rpb25gIHRocnUgYGl0ZXJhdGVlYC4gVGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2ZcbiAqIGVhY2gga2V5IGlzIHRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGtleSB3YXMgcmV0dXJuZWQgYnkgYGl0ZXJhdGVlYC4gVGhlXG4gKiBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC41LjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV1cbiAqICBUaGUgaXRlcmF0ZWUgdG8gdHJhbnNmb3JtIGtleXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb21wb3NlZCBhZ2dyZWdhdGUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmNvdW50QnkoWzYuMSwgNC4yLCA2LjNdLCBNYXRoLmZsb29yKTtcbiAqIC8vID0+IHsgJzQnOiAxLCAnNic6IDIgfVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5jb3VudEJ5KFsnb25lJywgJ3R3bycsICd0aHJlZSddLCAnbGVuZ3RoJyk7XG4gKiAvLyA9PiB7ICczJzogMiwgJzUnOiAxIH1cbiAqL1xudmFyIGNvdW50QnkgPSBjcmVhdGVBZ2dyZWdhdG9yKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICBoYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwga2V5KSA/ICsrcmVzdWx0W2tleV0gOiAocmVzdWx0W2tleV0gPSAxKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvdW50Qnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZm9yRWFjaCcpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZvckVhY2hSaWdodCcpO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXE7XG4iLCJ2YXIgYXJyYXlFdmVyeSA9IHJlcXVpcmUoJy4vX2FycmF5RXZlcnknKSxcbiAgICBiYXNlRXZlcnkgPSByZXF1aXJlKCcuL19iYXNlRXZlcnknKSxcbiAgICBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IgKiphbGwqKiBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAuXG4gKiBJdGVyYXRpb24gaXMgc3RvcHBlZCBvbmNlIGBwcmVkaWNhdGVgIHJldHVybnMgZmFsc2V5LiBUaGUgcHJlZGljYXRlIGlzXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHJldHVybnMgYHRydWVgIGZvclxuICogW2VtcHR5IGNvbGxlY3Rpb25zXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FbXB0eV9zZXQpIGJlY2F1c2VcbiAqIFtldmVyeXRoaW5nIGlzIHRydWVdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1ZhY3VvdXNfdHJ1dGgpIG9mXG4gKiBlbGVtZW50cyBvZiBlbXB0eSBjb2xsZWN0aW9ucy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBwYXNzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmV2ZXJ5KFt0cnVlLCAxLCBudWxsLCAneWVzJ10sIEJvb2xlYW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2LCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAsICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmV2ZXJ5KHVzZXJzLCB7ICd1c2VyJzogJ2Jhcm5leScsICdhY3RpdmUnOiBmYWxzZSB9KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5ldmVyeSh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5ldmVyeSh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gZXZlcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBndWFyZCkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUV2ZXJ5IDogYmFzZUV2ZXJ5O1xuICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBndWFyZCkpIHtcbiAgICBwcmVkaWNhdGUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZXJ5O1xuIiwidmFyIGFycmF5RmlsdGVyID0gcmVxdWlyZSgnLi9fYXJyYXlGaWx0ZXInKSxcbiAgICBiYXNlRmlsdGVyID0gcmVxdWlyZSgnLi9fYmFzZUZpbHRlcicpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIGFuIGFycmF5IG9mIGFsbCBlbGVtZW50c1xuICogYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yLiBUaGUgcHJlZGljYXRlIGlzIGludm9rZWQgd2l0aCB0aHJlZVxuICogYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogKipOb3RlOioqIFVubGlrZSBgXy5yZW1vdmVgLCB0aGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldXG4gKiAgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICogQHNlZSBfLnJlamVjdFxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2LCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAqIF07XG4gKlxuICogXy5maWx0ZXIodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuICFvLmFjdGl2ZTsgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ2ZyZWQnXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbHRlcih1c2VycywgeyAnYWdlJzogMzYsICdhY3RpdmUnOiB0cnVlIH0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgWydiYXJuZXknXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmlsdGVyKHVzZXJzLCBbJ2FjdGl2ZScsIGZhbHNlXSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ2ZyZWQnXVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maWx0ZXIodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnYmFybmV5J11cbiAqL1xuZnVuY3Rpb24gZmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUZpbHRlciA6IGJhc2VGaWx0ZXI7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXI7XG4iLCJ2YXIgY3JlYXRlRmluZCA9IHJlcXVpcmUoJy4vX2NyZWF0ZUZpbmQnKSxcbiAgICBmaW5kSW5kZXggPSByZXF1aXJlKCcuL2ZpbmRJbmRleCcpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgdGhlIGZpcnN0IGVsZW1lbnRcbiAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogdHJ1ZSB9XG4gKiBdO1xuICpcbiAqIF8uZmluZCh1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gby5hZ2UgPCA0MDsgfSk7XG4gKiAvLyA9PiBvYmplY3QgZm9yICdiYXJuZXknXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZCh1c2VycywgeyAnYWdlJzogMSwgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gKiAvLyA9PiBvYmplY3QgZm9yICdwZWJibGVzJ1xuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZCh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gb2JqZWN0IGZvciAnZnJlZCdcbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gb2JqZWN0IGZvciAnYmFybmV5J1xuICovXG52YXIgZmluZCA9IGNyZWF0ZUZpbmQoZmluZEluZGV4KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZmluZGAgZXhjZXB0IHRoYXQgaXQgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0XG4gKiBlbGVtZW50IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvciBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDEuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZm91bmQgZWxlbWVudCwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FjdGl2ZSc6IHRydWUgfVxuICogXTtcbiAqXG4gKiBfLmZpbmRJbmRleCh1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gby51c2VyID09ICdiYXJuZXknOyB9KTtcbiAqIC8vID0+IDBcbiAqXG4gKiAvLyBUaGUgYF8ubWF0Y2hlc2AgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maW5kSW5kZXgodXNlcnMsIHsgJ3VzZXInOiAnZnJlZCcsICdhY3RpdmUnOiBmYWxzZSB9KTtcbiAqIC8vID0+IDFcbiAqXG4gKiAvLyBUaGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbmRJbmRleCh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gMFxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maW5kSW5kZXgodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IDJcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggPT0gbnVsbCA/IDAgOiB0b0ludGVnZXIoZnJvbUluZGV4KTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGluZGV4ID0gbmF0aXZlTWF4KGxlbmd0aCArIGluZGV4LCAwKTtcbiAgfVxuICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyksIGluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kSW5kZXg7XG4iLCJ2YXIgY3JlYXRlRmluZCA9IHJlcXVpcmUoJy4vX2NyZWF0ZUZpbmQnKSxcbiAgICBmaW5kTGFzdEluZGV4ID0gcmVxdWlyZSgnLi9maW5kTGFzdEluZGV4Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5maW5kYCBleGNlcHQgdGhhdCBpdCBpdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mXG4gKiBgY29sbGVjdGlvbmAgZnJvbSByaWdodCB0byBsZWZ0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD1jb2xsZWN0aW9uLmxlbmd0aC0xXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZpbmRMYXN0KFsxLCAyLCAzLCA0XSwgZnVuY3Rpb24obikge1xuICogICByZXR1cm4gbiAlIDIgPT0gMTtcbiAqIH0pO1xuICogLy8gPT4gM1xuICovXG52YXIgZmluZExhc3QgPSBjcmVhdGVGaW5kKGZpbmRMYXN0SW5kZXgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRMYXN0O1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZmluZEluZGV4YCBleGNlcHQgdGhhdCBpdCBpdGVyYXRlcyBvdmVyIGVsZW1lbnRzXG4gKiBvZiBgY29sbGVjdGlvbmAgZnJvbSByaWdodCB0byBsZWZ0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldXG4gKiAgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZnJvbUluZGV4PWFycmF5Lmxlbmd0aC0xXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZm91bmQgZWxlbWVudCwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLmZpbmRMYXN0SW5kZXgodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udXNlciA9PSAncGViYmxlcyc7IH0pO1xuICogLy8gPT4gMlxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbmRMYXN0SW5kZXgodXNlcnMsIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maW5kTGFzdEluZGV4KHVzZXJzLCBbJ2FjdGl2ZScsIGZhbHNlXSk7XG4gKiAvLyA9PiAyXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbmRMYXN0SW5kZXgodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IDBcbiAqL1xuZnVuY3Rpb24gZmluZExhc3RJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgdmFyIGluZGV4ID0gbGVuZ3RoIC0gMTtcbiAgaWYgKGZyb21JbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaW5kZXggPSB0b0ludGVnZXIoZnJvbUluZGV4KTtcbiAgICBpbmRleCA9IGZyb21JbmRleCA8IDBcbiAgICAgID8gbmF0aXZlTWF4KGxlbmd0aCArIGluZGV4LCAwKVxuICAgICAgOiBuYXRpdmVNaW4oaW5kZXgsIGxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXRlcmF0ZWUocHJlZGljYXRlLCAzKSwgaW5kZXgsIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRMYXN0SW5kZXg7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpLFxuICAgIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZsYXR0ZW5lZCBhcnJheSBvZiB2YWx1ZXMgYnkgcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gYGNvbGxlY3Rpb25gXG4gKiB0aHJ1IGBpdGVyYXRlZWAgYW5kIGZsYXR0ZW5pbmcgdGhlIG1hcHBlZCByZXN1bHRzLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldXG4gKiAgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gZHVwbGljYXRlKG4pIHtcbiAqICAgcmV0dXJuIFtuLCBuXTtcbiAqIH1cbiAqXG4gKiBfLmZsYXRNYXAoWzEsIDJdLCBkdXBsaWNhdGUpO1xuICogLy8gPT4gWzEsIDEsIDIsIDJdXG4gKi9cbmZ1bmN0aW9uIGZsYXRNYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGbGF0dGVuKG1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSksIDEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXRNYXA7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpLFxuICAgIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5mbGF0TWFwYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBmbGF0dGVucyB0aGVcbiAqIG1hcHBlZCByZXN1bHRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC43LjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV1cbiAqICBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBkdXBsaWNhdGUobikge1xuICogICByZXR1cm4gW1tbbiwgbl1dXTtcbiAqIH1cbiAqXG4gKiBfLmZsYXRNYXBEZWVwKFsxLCAyXSwgZHVwbGljYXRlKTtcbiAqIC8vID0+IFsxLCAxLCAyLCAyXVxuICovXG5mdW5jdGlvbiBmbGF0TWFwRGVlcChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZsYXR0ZW4obWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSwgSU5GSU5JVFkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXRNYXBEZWVwO1xuIiwidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICBtYXAgPSByZXF1aXJlKCcuL21hcCcpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5mbGF0TWFwYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBmbGF0dGVucyB0aGVcbiAqIG1hcHBlZCByZXN1bHRzIHVwIHRvIGBkZXB0aGAgdGltZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjcuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XVxuICogIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2RlcHRoPTFdIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gZHVwbGljYXRlKG4pIHtcbiAqICAgcmV0dXJuIFtbW24sIG5dXV07XG4gKiB9XG4gKlxuICogXy5mbGF0TWFwRGVwdGgoWzEsIDJdLCBkdXBsaWNhdGUsIDIpO1xuICogLy8gPT4gW1sxLCAxXSwgWzIsIDJdXVxuICovXG5mdW5jdGlvbiBmbGF0TWFwRGVwdGgoY29sbGVjdGlvbiwgaXRlcmF0ZWUsIGRlcHRoKSB7XG4gIGRlcHRoID0gZGVwdGggPT09IHVuZGVmaW5lZCA/IDEgOiB0b0ludGVnZXIoZGVwdGgpO1xuICByZXR1cm4gYmFzZUZsYXR0ZW4obWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSwgZGVwdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXRNYXBEZXB0aDtcbiIsInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL19hcnJheUVhY2gnKSxcbiAgICBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggZWxlbWVudC5cbiAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogKipOb3RlOioqIEFzIHdpdGggb3RoZXIgXCJDb2xsZWN0aW9uc1wiIG1ldGhvZHMsIG9iamVjdHMgd2l0aCBhIFwibGVuZ3RoXCJcbiAqIHByb3BlcnR5IGFyZSBpdGVyYXRlZCBsaWtlIGFycmF5cy4gVG8gYXZvaWQgdGhpcyBiZWhhdmlvciB1c2UgYF8uZm9ySW5gXG4gKiBvciBgXy5mb3JPd25gIGZvciBvYmplY3QgaXRlcmF0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBhbGlhcyBlYWNoXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBzZWUgXy5mb3JFYWNoUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgY29uc29sZS5sb2codmFsdWUpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzIGAxYCB0aGVuIGAyYC5cbiAqXG4gKiBfLmZvckVhY2goeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RWFjaCA6IGJhc2VFYWNoO1xuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuIiwidmFyIGFycmF5RWFjaFJpZ2h0ID0gcmVxdWlyZSgnLi9fYXJyYXlFYWNoUmlnaHQnKSxcbiAgICBiYXNlRWFjaFJpZ2h0ID0gcmVxdWlyZSgnLi9fYmFzZUVhY2hSaWdodCcpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZvckVhY2hgIGV4Y2VwdCB0aGF0IGl0IGl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2ZcbiAqIGBjb2xsZWN0aW9uYCBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjAuMFxuICogQGFsaWFzIGVhY2hSaWdodFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZvckVhY2hSaWdodChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMmAgdGhlbiBgMWAuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hSaWdodChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2hSaWdodCA6IGJhc2VFYWNoUmlnaHQ7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2hSaWdodDtcbiIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0O1xuIiwidmFyIGNyZWF0ZUFnZ3JlZ2F0b3IgPSByZXF1aXJlKCcuL19jcmVhdGVBZ2dyZWdhdG9yJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2Yga2V5cyBnZW5lcmF0ZWQgZnJvbSB0aGUgcmVzdWx0cyBvZiBydW5uaW5nXG4gKiBlYWNoIGVsZW1lbnQgb2YgYGNvbGxlY3Rpb25gIHRocnUgYGl0ZXJhdGVlYC4gVGhlIG9yZGVyIG9mIGdyb3VwZWQgdmFsdWVzXG4gKiBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmRlciB0aGV5IG9jY3VyIGluIGBjb2xsZWN0aW9uYC4gVGhlIGNvcnJlc3BvbmRpbmdcbiAqIHZhbHVlIG9mIGVhY2gga2V5IGlzIGFuIGFycmF5IG9mIGVsZW1lbnRzIHJlc3BvbnNpYmxlIGZvciBnZW5lcmF0aW5nIHRoZVxuICoga2V5LiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldXG4gKiAgVGhlIGl0ZXJhdGVlIHRvIHRyYW5zZm9ybSBrZXlzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29tcG9zZWQgYWdncmVnYXRlIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5ncm91cEJ5KFs2LjEsIDQuMiwgNi4zXSwgTWF0aC5mbG9vcik7XG4gKiAvLyA9PiB7ICc0JzogWzQuMl0sICc2JzogWzYuMSwgNi4zXSB9XG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmdyb3VwQnkoWydvbmUnLCAndHdvJywgJ3RocmVlJ10sICdsZW5ndGgnKTtcbiAqIC8vID0+IHsgJzMnOiBbJ29uZScsICd0d28nXSwgJzUnOiBbJ3RocmVlJ10gfVxuICovXG52YXIgZ3JvdXBCeSA9IGNyZWF0ZUFnZ3JlZ2F0b3IoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwga2V5KSkge1xuICAgIHJlc3VsdFtrZXldLnB1c2godmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ3JvdXBCeTtcbiIsInZhciBiYXNlSGFzSW4gPSByZXF1aXJlKCcuL19iYXNlSGFzSW4nKSxcbiAgICBoYXNQYXRoID0gcmVxdWlyZSgnLi9faGFzUGF0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EuYicpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzSW47XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnLi9fYmFzZUluZGV4T2YnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpLFxuICAgIHZhbHVlcyA9IHJlcXVpcmUoJy4vdmFsdWVzJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiBgY29sbGVjdGlvbmAuIElmIGBjb2xsZWN0aW9uYCBpcyBhIHN0cmluZywgaXQnc1xuICogY2hlY2tlZCBmb3IgYSBzdWJzdHJpbmcgb2YgYHZhbHVlYCwgb3RoZXJ3aXNlXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogaXMgdXNlZCBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuIElmIGBmcm9tSW5kZXhgIGlzIG5lZ2F0aXZlLCBpdCdzIHVzZWQgYXNcbiAqIHRoZSBvZmZzZXQgZnJvbSB0aGUgZW5kIG9mIGBjb2xsZWN0aW9uYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ucmVkdWNlYC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaW5jbHVkZXMoWzEsIDIsIDNdLCAxKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmluY2x1ZGVzKFsxLCAyLCAzXSwgMSwgMik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaW5jbHVkZXMoeyAnYSc6IDEsICdiJzogMiB9LCAxKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmluY2x1ZGVzKCdhYmNkJywgJ2JjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGluY2x1ZGVzKGNvbGxlY3Rpb24sIHZhbHVlLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gIGNvbGxlY3Rpb24gPSBpc0FycmF5TGlrZShjb2xsZWN0aW9uKSA/IGNvbGxlY3Rpb24gOiB2YWx1ZXMoY29sbGVjdGlvbik7XG4gIGZyb21JbmRleCA9IChmcm9tSW5kZXggJiYgIWd1YXJkKSA/IHRvSW50ZWdlcihmcm9tSW5kZXgpIDogMDtcblxuICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG4gIGlmIChmcm9tSW5kZXggPCAwKSB7XG4gICAgZnJvbUluZGV4ID0gbmF0aXZlTWF4KGxlbmd0aCArIGZyb21JbmRleCwgMCk7XG4gIH1cbiAgcmV0dXJuIGlzU3RyaW5nKGNvbGxlY3Rpb24pXG4gICAgPyAoZnJvbUluZGV4IDw9IGxlbmd0aCAmJiBjb2xsZWN0aW9uLmluZGV4T2YodmFsdWUsIGZyb21JbmRleCkgPiAtMSlcbiAgICA6ICghIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihjb2xsZWN0aW9uLCB2YWx1ZSwgZnJvbUluZGV4KSA+IC0xKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmNsdWRlcztcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5JyksXG4gICAgYmFzZUVhY2ggPSByZXF1aXJlKCcuL19iYXNlRWFjaCcpLFxuICAgIGJhc2VJbnZva2UgPSByZXF1aXJlKCcuL19iYXNlSW52b2tlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzS2V5ID0gcmVxdWlyZSgnLi9faXNLZXknKTtcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBtZXRob2QgYXQgYHBhdGhgIG9mIGVhY2ggZWxlbWVudCBpbiBgY29sbGVjdGlvbmAsIHJldHVybmluZ1xuICogYW4gYXJyYXkgb2YgdGhlIHJlc3VsdHMgb2YgZWFjaCBpbnZva2VkIG1ldGhvZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzXG4gKiBhcmUgcHJvdmlkZWQgdG8gZWFjaCBpbnZva2VkIG1ldGhvZC4gSWYgYHBhdGhgIGlzIGEgZnVuY3Rpb24sIGl0J3MgaW52b2tlZFxuICogZm9yLCBhbmQgYHRoaXNgIGJvdW5kIHRvLCBlYWNoIGVsZW1lbnQgaW4gYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgbWV0aG9kIHRvIGludm9rZSBvclxuICogIHRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBlYWNoIG1ldGhvZCB3aXRoLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmludm9rZU1hcChbWzUsIDEsIDddLCBbMywgMiwgMV1dLCAnc29ydCcpO1xuICogLy8gPT4gW1sxLCA1LCA3XSwgWzEsIDIsIDNdXVxuICpcbiAqIF8uaW52b2tlTWFwKFsxMjMsIDQ1Nl0sIFN0cmluZy5wcm90b3R5cGUuc3BsaXQsICcnKTtcbiAqIC8vID0+IFtbJzEnLCAnMicsICczJ10sIFsnNCcsICc1JywgJzYnXV1cbiAqL1xudmFyIGludm9rZU1hcCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHBhdGgsIGFyZ3MpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpc0Z1bmMgPSB0eXBlb2YgcGF0aCA9PSAnZnVuY3Rpb24nLFxuICAgICAgaXNQcm9wID0gaXNLZXkocGF0aCksXG4gICAgICByZXN1bHQgPSBpc0FycmF5TGlrZShjb2xsZWN0aW9uKSA/IEFycmF5KGNvbGxlY3Rpb24ubGVuZ3RoKSA6IFtdO1xuXG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIGZ1bmMgPSBpc0Z1bmMgPyBwYXRoIDogKChpc1Byb3AgJiYgdmFsdWUgIT0gbnVsbCkgPyB2YWx1ZVtwYXRoXSA6IHVuZGVmaW5lZCk7XG4gICAgcmVzdWx0WysraW5kZXhdID0gZnVuYyA/IGFwcGx5KGZ1bmMsIHZhbHVlLCBhcmdzKSA6IGJhc2VJbnZva2UodmFsdWUsIHBhdGgsIGFyZ3MpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZU1hcDtcbiIsInZhciBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG4iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlT2JqZWN0O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzdHJpbmcsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N0cmluZygnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N0cmluZygxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3RyaW5nVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmluZztcbiIsInZhciBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIGJhc2VJc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19iYXNlSXNUeXBlZEFycmF5JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgY3JlYXRlQWdncmVnYXRvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFnZ3JlZ2F0b3InKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiBrZXlzIGdlbmVyYXRlZCBmcm9tIHRoZSByZXN1bHRzIG9mIHJ1bm5pbmdcbiAqIGVhY2ggZWxlbWVudCBvZiBgY29sbGVjdGlvbmAgdGhydSBgaXRlcmF0ZWVgLiBUaGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvZlxuICogZWFjaCBrZXkgaXMgdGhlIGxhc3QgZWxlbWVudCByZXNwb25zaWJsZSBmb3IgZ2VuZXJhdGluZyB0aGUga2V5LiBUaGVcbiAqIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XVxuICogIFRoZSBpdGVyYXRlZSB0byB0cmFuc2Zvcm0ga2V5cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbXBvc2VkIGFnZ3JlZ2F0ZSBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFtcbiAqICAgeyAnZGlyJzogJ2xlZnQnLCAnY29kZSc6IDk3IH0sXG4gKiAgIHsgJ2Rpcic6ICdyaWdodCcsICdjb2RlJzogMTAwIH1cbiAqIF07XG4gKlxuICogXy5rZXlCeShhcnJheSwgZnVuY3Rpb24obykge1xuICogICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShvLmNvZGUpO1xuICogfSk7XG4gKiAvLyA9PiB7ICdhJzogeyAnZGlyJzogJ2xlZnQnLCAnY29kZSc6IDk3IH0sICdkJzogeyAnZGlyJzogJ3JpZ2h0JywgJ2NvZGUnOiAxMDAgfSB9XG4gKlxuICogXy5rZXlCeShhcnJheSwgJ2RpcicpO1xuICogLy8gPT4geyAnbGVmdCc6IHsgJ2Rpcic6ICdsZWZ0JywgJ2NvZGUnOiA5NyB9LCAncmlnaHQnOiB7ICdkaXInOiAncmlnaHQnLCAnY29kZSc6IDEwMCB9IH1cbiAqL1xudmFyIGtleUJ5ID0gY3JlYXRlQWdncmVnYXRvcihmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleUJ5O1xuIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sYXN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGFycmF5W2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxhc3Q7XG4iLCJ2YXIgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGJhc2VNYXAgPSByZXF1aXJlKCcuL19iYXNlTWFwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdmFsdWVzIGJ5IHJ1bm5pbmcgZWFjaCBlbGVtZW50IGluIGBjb2xsZWN0aW9uYCB0aHJ1XG4gKiBgaXRlcmF0ZWVgLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czpcbiAqICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiBNYW55IGxvZGFzaCBtZXRob2RzIGFyZSBndWFyZGVkIHRvIHdvcmsgYXMgaXRlcmF0ZWVzIGZvciBtZXRob2RzIGxpa2VcbiAqIGBfLmV2ZXJ5YCwgYF8uZmlsdGVyYCwgYF8ubWFwYCwgYF8ubWFwVmFsdWVzYCwgYF8ucmVqZWN0YCwgYW5kIGBfLnNvbWVgLlxuICpcbiAqIFRoZSBndWFyZGVkIG1ldGhvZHMgYXJlOlxuICogYGFyeWAsIGBjaHVua2AsIGBjdXJyeWAsIGBjdXJyeVJpZ2h0YCwgYGRyb3BgLCBgZHJvcFJpZ2h0YCwgYGV2ZXJ5YCxcbiAqIGBmaWxsYCwgYGludmVydGAsIGBwYXJzZUludGAsIGByYW5kb21gLCBgcmFuZ2VgLCBgcmFuZ2VSaWdodGAsIGByZXBlYXRgLFxuICogYHNhbXBsZVNpemVgLCBgc2xpY2VgLCBgc29tZWAsIGBzb3J0QnlgLCBgc3BsaXRgLCBgdGFrZWAsIGB0YWtlUmlnaHRgLFxuICogYHRlbXBsYXRlYCwgYHRyaW1gLCBgdHJpbUVuZGAsIGB0cmltU3RhcnRgLCBhbmQgYHdvcmRzYFxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gc3F1YXJlKG4pIHtcbiAqICAgcmV0dXJuIG4gKiBuO1xuICogfVxuICpcbiAqIF8ubWFwKFs0LCA4XSwgc3F1YXJlKTtcbiAqIC8vID0+IFsxNiwgNjRdXG4gKlxuICogXy5tYXAoeyAnYSc6IDQsICdiJzogOCB9LCBzcXVhcmUpO1xuICogLy8gPT4gWzE2LCA2NF0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JyB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnIH1cbiAqIF07XG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLm1hcCh1c2VycywgJ3VzZXInKTtcbiAqIC8vID0+IFsnYmFybmV5JywgJ2ZyZWQnXVxuICovXG5mdW5jdGlvbiBtYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlNYXAgOiBiYXNlTWFwO1xuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXA7XG4iLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBBc3NpZ24gY2FjaGUgdG8gYF8ubWVtb2l6ZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcbiIsIi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG5lZ2F0ZXMgdGhlIHJlc3VsdCBvZiB0aGUgcHJlZGljYXRlIGBmdW5jYC4gVGhlXG4gKiBgZnVuY2AgcHJlZGljYXRlIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgYW5kIGFyZ3VtZW50cyBvZiB0aGVcbiAqIGNyZWF0ZWQgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIHByZWRpY2F0ZSB0byBuZWdhdGUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBuZWdhdGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBpc0V2ZW4obikge1xuICogICByZXR1cm4gbiAlIDIgPT0gMDtcbiAqIH1cbiAqXG4gKiBfLmZpbHRlcihbMSwgMiwgMywgNCwgNSwgNl0sIF8ubmVnYXRlKGlzRXZlbikpO1xuICogLy8gPT4gWzEsIDMsIDVdXG4gKi9cbmZ1bmN0aW9uIG5lZ2F0ZShwcmVkaWNhdGUpIHtcbiAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gIXByZWRpY2F0ZS5jYWxsKHRoaXMpO1xuICAgICAgY2FzZSAxOiByZXR1cm4gIXByZWRpY2F0ZS5jYWxsKHRoaXMsIGFyZ3NbMF0pO1xuICAgICAgY2FzZSAyOiByZXR1cm4gIXByZWRpY2F0ZS5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgY2FzZSAzOiByZXR1cm4gIXByZWRpY2F0ZS5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZWdhdGU7XG4iLCJ2YXIgYmFzZU9yZGVyQnkgPSByZXF1aXJlKCcuL19iYXNlT3JkZXJCeScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNvcnRCeWAgZXhjZXB0IHRoYXQgaXQgYWxsb3dzIHNwZWNpZnlpbmcgdGhlIHNvcnRcbiAqIG9yZGVycyBvZiB0aGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuIElmIGBvcmRlcnNgIGlzIHVuc3BlY2lmaWVkLCBhbGwgdmFsdWVzXG4gKiBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLCBzcGVjaWZ5IGFuIG9yZGVyIG9mIFwiZGVzY1wiIGZvclxuICogZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlciBvZiBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtBcnJheVtdfEZ1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IFtpdGVyYXRlZXM9W18uaWRlbnRpdHldXVxuICogIFRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IFtvcmRlcnNdIFRoZSBzb3J0IG9yZGVycyBvZiBgaXRlcmF0ZWVzYC5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLnJlZHVjZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzb3J0ZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDggfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzQgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAgfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICogXTtcbiAqXG4gKiAvLyBTb3J0IGJ5IGB1c2VyYCBpbiBhc2NlbmRpbmcgb3JkZXIgYW5kIGJ5IGBhZ2VgIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gKiBfLm9yZGVyQnkodXNlcnMsIFsndXNlcicsICdhZ2UnXSwgWydhc2MnLCAnZGVzYyddKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFtbJ2Jhcm5leScsIDM2XSwgWydiYXJuZXknLCAzNF0sIFsnZnJlZCcsIDQ4XSwgWydmcmVkJywgNDBdXVxuICovXG5mdW5jdGlvbiBvcmRlckJ5KGNvbGxlY3Rpb24sIGl0ZXJhdGVlcywgb3JkZXJzLCBndWFyZCkge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNBcnJheShpdGVyYXRlZXMpKSB7XG4gICAgaXRlcmF0ZWVzID0gaXRlcmF0ZWVzID09IG51bGwgPyBbXSA6IFtpdGVyYXRlZXNdO1xuICB9XG4gIG9yZGVycyA9IGd1YXJkID8gdW5kZWZpbmVkIDogb3JkZXJzO1xuICBpZiAoIWlzQXJyYXkob3JkZXJzKSkge1xuICAgIG9yZGVycyA9IG9yZGVycyA9PSBudWxsID8gW10gOiBbb3JkZXJzXTtcbiAgfVxuICByZXR1cm4gYmFzZU9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9yZGVyQnk7XG4iLCJ2YXIgY3JlYXRlQWdncmVnYXRvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFnZ3JlZ2F0b3InKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIGVsZW1lbnRzIHNwbGl0IGludG8gdHdvIGdyb3VwcywgdGhlIGZpcnN0IG9mIHdoaWNoXG4gKiBjb250YWlucyBlbGVtZW50cyBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IsIHRoZSBzZWNvbmQgb2Ygd2hpY2hcbiAqIGNvbnRhaW5zIGVsZW1lbnRzIGBwcmVkaWNhdGVgIHJldHVybnMgZmFsc2V5IGZvci4gVGhlIHByZWRpY2F0ZSBpc1xuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBncm91cGVkIGVsZW1lbnRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLnBhcnRpdGlvbih1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gby5hY3RpdmU7IH0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgW1snZnJlZCddLCBbJ2Jhcm5leScsICdwZWJibGVzJ11dXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ucGFydGl0aW9uKHVzZXJzLCB7ICdhZ2UnOiAxLCAnYWN0aXZlJzogZmFsc2UgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydwZWJibGVzJ10sIFsnYmFybmV5JywgJ2ZyZWQnXV1cbiAqXG4gKiAvLyBUaGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnBhcnRpdGlvbih1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgW1snYmFybmV5JywgJ3BlYmJsZXMnXSwgWydmcmVkJ11dXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnBhcnRpdGlvbih1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgW1snZnJlZCddLCBbJ2Jhcm5leScsICdwZWJibGVzJ11dXG4gKi9cbnZhciBwYXJ0aXRpb24gPSBjcmVhdGVBZ2dyZWdhdG9yKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICByZXN1bHRba2V5ID8gMCA6IDFdLnB1c2godmFsdWUpO1xufSwgZnVuY3Rpb24oKSB7IHJldHVybiBbW10sIFtdXTsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFydGl0aW9uO1xuIiwidmFyIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2Jhc2VQcm9wZXJ0eScpLFxuICAgIGJhc2VQcm9wZXJ0eURlZXAgPSByZXF1aXJlKCcuL19iYXNlUHJvcGVydHlEZWVwJyksXG4gICAgaXNLZXkgPSByZXF1aXJlKCcuL19pc0tleScpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiB7ICdiJzogMiB9IH0sXG4gKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAqIF07XG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAqIC8vID0+IFsxLCAyXVxuICovXG5mdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gIHJldHVybiBpc0tleShwYXRoKSA/IGJhc2VQcm9wZXJ0eSh0b0tleShwYXRoKSkgOiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb3BlcnR5O1xuIiwidmFyIGFycmF5UmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXlSZWR1Y2UnKSxcbiAgICBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlZHVjZSA9IHJlcXVpcmUoJy4vX2Jhc2VSZWR1Y2UnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKlxuICogUmVkdWNlcyBgY29sbGVjdGlvbmAgdG8gYSB2YWx1ZSB3aGljaCBpcyB0aGUgYWNjdW11bGF0ZWQgcmVzdWx0IG9mIHJ1bm5pbmdcbiAqIGVhY2ggZWxlbWVudCBpbiBgY29sbGVjdGlvbmAgdGhydSBgaXRlcmF0ZWVgLCB3aGVyZSBlYWNoIHN1Y2Nlc3NpdmVcbiAqIGludm9jYXRpb24gaXMgc3VwcGxpZWQgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgcHJldmlvdXMuIElmIGBhY2N1bXVsYXRvcmBcbiAqIGlzIG5vdCBnaXZlbiwgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGNvbGxlY3Rpb25gIGlzIHVzZWQgYXMgdGhlIGluaXRpYWxcbiAqIHZhbHVlLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIGZvdXIgYXJndW1lbnRzOlxuICogKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiBNYW55IGxvZGFzaCBtZXRob2RzIGFyZSBndWFyZGVkIHRvIHdvcmsgYXMgaXRlcmF0ZWVzIGZvciBtZXRob2RzIGxpa2VcbiAqIGBfLnJlZHVjZWAsIGBfLnJlZHVjZVJpZ2h0YCwgYW5kIGBfLnRyYW5zZm9ybWAuXG4gKlxuICogVGhlIGd1YXJkZWQgbWV0aG9kcyBhcmU6XG4gKiBgYXNzaWduYCwgYGRlZmF1bHRzYCwgYGRlZmF1bHRzRGVlcGAsIGBpbmNsdWRlc2AsIGBtZXJnZWAsIGBvcmRlckJ5YCxcbiAqIGFuZCBgc29ydEJ5YFxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgXy5yZWR1Y2VSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnJlZHVjZShbMSwgMl0sIGZ1bmN0aW9uKHN1bSwgbikge1xuICogICByZXR1cm4gc3VtICsgbjtcbiAqIH0sIDApO1xuICogLy8gPT4gM1xuICpcbiAqIF8ucmVkdWNlKHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMSB9LCBmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAqICAgKHJlc3VsdFt2YWx1ZV0gfHwgKHJlc3VsdFt2YWx1ZV0gPSBbXSkpLnB1c2goa2V5KTtcbiAqICAgcmV0dXJuIHJlc3VsdDtcbiAqIH0sIHt9KTtcbiAqIC8vID0+IHsgJzEnOiBbJ2EnLCAnYyddLCAnMic6IFsnYiddIH0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24gcmVkdWNlKGNvbGxlY3Rpb24sIGl0ZXJhdGVlLCBhY2N1bXVsYXRvcikge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheVJlZHVjZSA6IGJhc2VSZWR1Y2UsXG4gICAgICBpbml0QWNjdW0gPSBhcmd1bWVudHMubGVuZ3RoIDwgMztcblxuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDQpLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtLCBiYXNlRWFjaCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlO1xuIiwidmFyIGFycmF5UmVkdWNlUmlnaHQgPSByZXF1aXJlKCcuL19hcnJheVJlZHVjZVJpZ2h0JyksXG4gICAgYmFzZUVhY2hSaWdodCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoUmlnaHQnKSxcbiAgICBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlUmVkdWNlID0gcmVxdWlyZSgnLi9fYmFzZVJlZHVjZScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnJlZHVjZWAgZXhjZXB0IHRoYXQgaXQgaXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZlxuICogYGNvbGxlY3Rpb25gIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIF8ucmVkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFtbMCwgMV0sIFsyLCAzXSwgWzQsIDVdXTtcbiAqXG4gKiBfLnJlZHVjZVJpZ2h0KGFycmF5LCBmdW5jdGlvbihmbGF0dGVuZWQsIG90aGVyKSB7XG4gKiAgIHJldHVybiBmbGF0dGVuZWQuY29uY2F0KG90aGVyKTtcbiAqIH0sIFtdKTtcbiAqIC8vID0+IFs0LCA1LCAyLCAzLCAwLCAxXVxuICovXG5mdW5jdGlvbiByZWR1Y2VSaWdodChjb2xsZWN0aW9uLCBpdGVyYXRlZSwgYWNjdW11bGF0b3IpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlSZWR1Y2VSaWdodCA6IGJhc2VSZWR1Y2UsXG4gICAgICBpbml0QWNjdW0gPSBhcmd1bWVudHMubGVuZ3RoIDwgMztcblxuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDQpLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtLCBiYXNlRWFjaFJpZ2h0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWR1Y2VSaWdodDtcbiIsInZhciBhcnJheUZpbHRlciA9IHJlcXVpcmUoJy4vX2FycmF5RmlsdGVyJyksXG4gICAgYmFzZUZpbHRlciA9IHJlcXVpcmUoJy4vX2Jhc2VGaWx0ZXInKSxcbiAgICBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgbmVnYXRlID0gcmVxdWlyZSgnLi9uZWdhdGUnKTtcblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgYF8uZmlsdGVyYDsgdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gXG4gKiB0aGF0IGBwcmVkaWNhdGVgIGRvZXMgKipub3QqKiByZXR1cm4gdHJ1dGh5IGZvci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKiBAc2VlIF8uZmlsdGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYsICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfVxuICogXTtcbiAqXG4gKiBfLnJlamVjdCh1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gIW8uYWN0aXZlOyB9KTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnZnJlZCddXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ucmVqZWN0KHVzZXJzLCB7ICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ2Jhcm5leSddXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5yZWplY3QodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnZnJlZCddXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnJlamVjdCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgWydiYXJuZXknXVxuICovXG5mdW5jdGlvbiByZWplY3QoY29sbGVjdGlvbiwgcHJlZGljYXRlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RmlsdGVyIDogYmFzZUZpbHRlcjtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgbmVnYXRlKGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVqZWN0O1xuIiwidmFyIGJhc2VSYW5kb20gPSByZXF1aXJlKCcuL19iYXNlUmFuZG9tJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgdmFsdWVzID0gcmVxdWlyZSgnLi92YWx1ZXMnKTtcblxuLyoqXG4gKiBHZXRzIGEgcmFuZG9tIGVsZW1lbnQgZnJvbSBgY29sbGVjdGlvbmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjAuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNhbXBsZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByYW5kb20gZWxlbWVudC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zYW1wbGUoWzEsIDIsIDMsIDRdKTtcbiAqIC8vID0+IDJcbiAqL1xuZnVuY3Rpb24gc2FtcGxlKGNvbGxlY3Rpb24pIHtcbiAgdmFyIGFycmF5ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBjb2xsZWN0aW9uIDogdmFsdWVzKGNvbGxlY3Rpb24pLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHJldHVybiBsZW5ndGggPiAwID8gYXJyYXlbYmFzZVJhbmRvbSgwLCBsZW5ndGggLSAxKV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2FtcGxlO1xuIiwidmFyIGJhc2VDbGFtcCA9IHJlcXVpcmUoJy4vX2Jhc2VDbGFtcCcpLFxuICAgIGJhc2VSYW5kb20gPSByZXF1aXJlKCcuL19iYXNlUmFuZG9tJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHRvQXJyYXkgPSByZXF1aXJlKCcuL3RvQXJyYXknKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpO1xuXG4vKipcbiAqIEdldHMgYG5gIHJhbmRvbSBlbGVtZW50cyBhdCB1bmlxdWUga2V5cyBmcm9tIGBjb2xsZWN0aW9uYCB1cCB0byB0aGVcbiAqIHNpemUgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzYW1wbGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW249MV0gVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byBzYW1wbGUuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSByYW5kb20gZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc2FtcGxlU2l6ZShbMSwgMiwgM10sIDIpO1xuICogLy8gPT4gWzMsIDFdXG4gKlxuICogXy5zYW1wbGVTaXplKFsxLCAyLCAzXSwgNCk7XG4gKiAvLyA9PiBbMiwgMywgMV1cbiAqL1xuZnVuY3Rpb24gc2FtcGxlU2l6ZShjb2xsZWN0aW9uLCBuLCBndWFyZCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRvQXJyYXkoY29sbGVjdGlvbiksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcblxuICBpZiAoKGd1YXJkID8gaXNJdGVyYXRlZUNhbGwoY29sbGVjdGlvbiwgbiwgZ3VhcmQpIDogbiA9PT0gdW5kZWZpbmVkKSkge1xuICAgIG4gPSAxO1xuICB9IGVsc2Uge1xuICAgIG4gPSBiYXNlQ2xhbXAodG9JbnRlZ2VyKG4pLCAwLCBsZW5ndGgpO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHZhciByYW5kID0gYmFzZVJhbmRvbShpbmRleCwgbGFzdEluZGV4KSxcbiAgICAgICAgdmFsdWUgPSByZXN1bHRbcmFuZF07XG5cbiAgICByZXN1bHRbcmFuZF0gPSByZXN1bHRbaW5kZXhdO1xuICAgIHJlc3VsdFtpbmRleF0gPSB2YWx1ZTtcbiAgfVxuICByZXN1bHQubGVuZ3RoID0gbjtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzYW1wbGVTaXplO1xuIiwidmFyIHNhbXBsZVNpemUgPSByZXF1aXJlKCcuL3NhbXBsZVNpemUnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdGhlIG1heGltdW0gbGVuZ3RoIGFuZCBpbmRleCBvZiBhbiBhcnJheS4gKi9cbnZhciBNQVhfQVJSQVlfTEVOR1RIID0gNDI5NDk2NzI5NTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHNodWZmbGVkIHZhbHVlcywgdXNpbmcgYSB2ZXJzaW9uIG9mIHRoZVxuICogW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXItWWF0ZXNfc2h1ZmZsZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNodWZmbGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzaHVmZmxlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zaHVmZmxlKFsxLCAyLCAzLCA0XSk7XG4gKiAvLyA9PiBbNCwgMSwgMywgMl1cbiAqL1xuZnVuY3Rpb24gc2h1ZmZsZShjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBzYW1wbGVTaXplKGNvbGxlY3Rpb24sIE1BWF9BUlJBWV9MRU5HVEgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNodWZmbGU7XG4iLCJ2YXIgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzU3RyaW5nID0gcmVxdWlyZSgnLi9pc1N0cmluZycpLFxuICAgIHN0cmluZ1NpemUgPSByZXF1aXJlKCcuL19zdHJpbmdTaXplJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJztcblxuLyoqXG4gKiBHZXRzIHRoZSBzaXplIG9mIGBjb2xsZWN0aW9uYCBieSByZXR1cm5pbmcgaXRzIGxlbmd0aCBmb3IgYXJyYXktbGlrZVxuICogdmFsdWVzIG9yIHRoZSBudW1iZXIgb2Ygb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgZm9yIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29sbGVjdGlvbiBzaXplLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnNpemUoWzEsIDIsIDNdKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnNpemUoeyAnYSc6IDEsICdiJzogMiB9KTtcbiAqIC8vID0+IDJcbiAqXG4gKiBfLnNpemUoJ3BlYmJsZXMnKTtcbiAqIC8vID0+IDdcbiAqL1xuZnVuY3Rpb24gc2l6ZShjb2xsZWN0aW9uKSB7XG4gIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoY29sbGVjdGlvbikgPyBzdHJpbmdTaXplKGNvbGxlY3Rpb24pIDogY29sbGVjdGlvbi5sZW5ndGg7XG4gIH1cbiAgdmFyIHRhZyA9IGdldFRhZyhjb2xsZWN0aW9uKTtcbiAgaWYgKHRhZyA9PSBtYXBUYWcgfHwgdGFnID09IHNldFRhZykge1xuICAgIHJldHVybiBjb2xsZWN0aW9uLnNpemU7XG4gIH1cbiAgcmV0dXJuIGJhc2VLZXlzKGNvbGxlY3Rpb24pLmxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaXplO1xuIiwidmFyIGFycmF5U29tZSA9IHJlcXVpcmUoJy4vX2FycmF5U29tZScpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGJhc2VTb21lID0gcmVxdWlyZSgnLi9fYmFzZVNvbWUnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IgKiphbnkqKiBlbGVtZW50IG9mIGBjb2xsZWN0aW9uYC5cbiAqIEl0ZXJhdGlvbiBpcyBzdG9wcGVkIG9uY2UgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkuIFRoZSBwcmVkaWNhdGUgaXNcbiAqIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc29tZShbbnVsbCwgMCwgJ3llcycsIGZhbHNlXSwgQm9vbGVhbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAqIF07XG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uc29tZSh1c2VycywgeyAndXNlcic6ICdiYXJuZXknLCAnYWN0aXZlJzogZmFsc2UgfSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uc29tZSh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5zb21lKHVzZXJzLCAnYWN0aXZlJyk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIHNvbWUoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBndWFyZCkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheVNvbWUgOiBiYXNlU29tZTtcbiAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZ3VhcmQpKSB7XG4gICAgcHJlZGljYXRlID0gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzb21lO1xuIiwidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICBiYXNlT3JkZXJCeSA9IHJlcXVpcmUoJy4vX2Jhc2VPcmRlckJ5JyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9faXNJdGVyYXRlZUNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIGVsZW1lbnRzLCBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IHRoZSByZXN1bHRzIG9mXG4gKiBydW5uaW5nIGVhY2ggZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24gdGhydSBlYWNoIGl0ZXJhdGVlLiBUaGlzIG1ldGhvZFxuICogcGVyZm9ybXMgYSBzdGFibGUgc29ydCwgdGhhdCBpcywgaXQgcHJlc2VydmVzIHRoZSBvcmlnaW5hbCBzb3J0IG9yZGVyIG9mXG4gKiBlcXVhbCBlbGVtZW50cy4gVGhlIGl0ZXJhdGVlcyBhcmUgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHsuLi4oRnVuY3Rpb258RnVuY3Rpb25bXSl9IFtpdGVyYXRlZXM9W18uaWRlbnRpdHldXVxuICogIFRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IHNvcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0OCB9LFxuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCB9LFxuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNCB9XG4gKiBdO1xuICpcbiAqIF8uc29ydEJ5KHVzZXJzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLnVzZXI7IH0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgW1snYmFybmV5JywgMzZdLCBbJ2Jhcm5leScsIDM0XSwgWydmcmVkJywgNDhdLCBbJ2ZyZWQnLCA0MF1dXG4gKlxuICogXy5zb3J0QnkodXNlcnMsIFsndXNlcicsICdhZ2UnXSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydiYXJuZXknLCAzNF0sIFsnYmFybmV5JywgMzZdLCBbJ2ZyZWQnLCA0MF0sIFsnZnJlZCcsIDQ4XV1cbiAqXG4gKiBfLnNvcnRCeSh1c2VycywgJ3VzZXInLCBmdW5jdGlvbihvKSB7XG4gKiAgIHJldHVybiBNYXRoLmZsb29yKG8uYWdlIC8gMTApO1xuICogfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydiYXJuZXknLCAzNl0sIFsnYmFybmV5JywgMzRdLCBbJ2ZyZWQnLCA0OF0sIFsnZnJlZCcsIDQwXV1cbiAqL1xudmFyIHNvcnRCeSA9IGJhc2VSZXN0KGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlcykge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciBsZW5ndGggPSBpdGVyYXRlZXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoID4gMSAmJiBpc0l0ZXJhdGVlQ2FsbChjb2xsZWN0aW9uLCBpdGVyYXRlZXNbMF0sIGl0ZXJhdGVlc1sxXSkpIHtcbiAgICBpdGVyYXRlZXMgPSBbXTtcbiAgfSBlbHNlIGlmIChsZW5ndGggPiAyICYmIGlzSXRlcmF0ZWVDYWxsKGl0ZXJhdGVlc1swXSwgaXRlcmF0ZWVzWzFdLCBpdGVyYXRlZXNbMl0pKSB7XG4gICAgaXRlcmF0ZWVzID0gW2l0ZXJhdGVlc1swXV07XG4gIH1cbiAgcmV0dXJuIGJhc2VPcmRlckJ5KGNvbGxlY3Rpb24sIGJhc2VGbGF0dGVuKGl0ZXJhdGVlcywgMSksIFtdKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRCeTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBpdGVyYXRvclRvQXJyYXkgPSByZXF1aXJlKCcuL19pdGVyYXRvclRvQXJyYXknKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB2YWx1ZXMgPSByZXF1aXJlKCcuL3ZhbHVlcycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGl0ZXJhdG9yU3ltYm9sID0gU3ltYm9sID8gU3ltYm9sLml0ZXJhdG9yIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0FycmF5KHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiBfLnRvQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddXG4gKlxuICogXy50b0FycmF5KDEpO1xuICogLy8gPT4gW11cbiAqXG4gKiBfLnRvQXJyYXkobnVsbCk7XG4gKiAvLyA9PiBbXVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyBzdHJpbmdUb0FycmF5KHZhbHVlKSA6IGNvcHlBcnJheSh2YWx1ZSk7XG4gIH1cbiAgaWYgKGl0ZXJhdG9yU3ltYm9sICYmIHZhbHVlW2l0ZXJhdG9yU3ltYm9sXSkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkodmFsdWVbaXRlcmF0b3JTeW1ib2xdKCkpO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgZnVuYyA9IHRhZyA9PSBtYXBUYWcgPyBtYXBUb0FycmF5IDogKHRhZyA9PSBzZXRUYWcgPyBzZXRUb0FycmF5IDogdmFsdWVzKTtcblxuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9BcnJheTtcbiIsInZhciB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfSU5URUdFUiA9IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBmaW5pdGUgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9GaW5pdGUoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9GaW5pdGU7XG4iLCJ2YXIgdG9GaW5pdGUgPSByZXF1aXJlKCcuL3RvRmluaXRlJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2ludGVnZXIpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9JbnRlZ2VyKDMuMik7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gdG9GaW5pdGUodmFsdWUpLFxuICAgICAgcmVtYWluZGVyID0gcmVzdWx0ICUgMTtcblxuICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9JbnRlZ2VyO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVRvU3RyaW5nJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nO1xuIiwidmFyIGJhc2VWYWx1ZXMgPSByZXF1aXJlKCcuL19iYXNlVmFsdWVzJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udmFsdWVzKG5ldyBGb28pO1xuICogLy8gPT4gWzEsIDJdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy52YWx1ZXMoJ2hpJyk7XG4gKiAvLyA9PiBbJ2gnLCAnaSddXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA/IGJhc2VWYWx1ZXMob2JqZWN0LCBrZXlzKG9iamVjdCkpIDogW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzO1xuIiwiIWZ1bmN0aW9uIHQoZSxyKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1yKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxyKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLlJhcGhhZWw9cigpOmUuUmFwaGFlbD1yKCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShpKXtpZihyW2ldKXJldHVybiByW2ldLmV4cG9ydHM7dmFyIG49cltpXT17ZXhwb3J0czp7fSxpZDppLGxvYWRlZDohMX07cmV0dXJuIHRbaV0uY2FsbChuLmV4cG9ydHMsbixuLmV4cG9ydHMsZSksbi5sb2FkZWQ9ITAsbi5leHBvcnRzfXZhciByPXt9O3JldHVybiBlLm09dCxlLmM9cixlLnA9XCJcIixlKDApfShbZnVuY3Rpb24odCxlLHIpe3ZhciBpLG47aT1bcigxKSxyKDMpLHIoNCldLG49ZnVuY3Rpb24odCl7cmV0dXJuIHR9LmFwcGx5KGUsaSksISh2b2lkIDAhPT1uJiYodC5leHBvcnRzPW4pKX0sZnVuY3Rpb24odCxlLHIpe3ZhciBpLG47aT1bcigyKV0sbj1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHIpe2lmKGUuaXMocixcImZ1bmN0aW9uXCIpKXJldHVybiB3P3IoKTp0Lm9uKFwicmFwaGFlbC5ET01sb2FkXCIscik7aWYoZS5pcyhyLFEpKXJldHVybiBlLl9lbmdpbmUuY3JlYXRlW3pdKGUsci5zcGxpY2UoMCwzK2UuaXMoclswXSwkKSkpLmFkZChyKTt2YXIgaT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMCk7aWYoZS5pcyhpW2kubGVuZ3RoLTFdLFwiZnVuY3Rpb25cIikpe3ZhciBuPWkucG9wKCk7cmV0dXJuIHc/bi5jYWxsKGUuX2VuZ2luZS5jcmVhdGVbel0oZSxpKSk6dC5vbihcInJhcGhhZWwuRE9NbG9hZFwiLGZ1bmN0aW9uKCl7bi5jYWxsKGUuX2VuZ2luZS5jcmVhdGVbel0oZSxpKSl9KX1yZXR1cm4gZS5fZW5naW5lLmNyZWF0ZVt6XShlLGFyZ3VtZW50cyl9ZnVuY3Rpb24gcih0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fHxPYmplY3QodCkhPT10KXJldHVybiB0O3ZhciBlPW5ldyB0LmNvbnN0cnVjdG9yO2Zvcih2YXIgaSBpbiB0KXRbVF0oaSkmJihlW2ldPXIodFtpXSkpO3JldHVybiBlfWZ1bmN0aW9uIGkodCxlKXtmb3IodmFyIHI9MCxpPXQubGVuZ3RoO2k+cjtyKyspaWYodFtyXT09PWUpcmV0dXJuIHQucHVzaCh0LnNwbGljZShyLDEpWzBdKX1mdW5jdGlvbiBuKHQsZSxyKXtmdW5jdGlvbiBuKCl7dmFyIGE9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApLHM9YS5qb2luKFwi4pCAXCIpLG89bi5jYWNoZT1uLmNhY2hlfHx7fSxsPW4uY291bnQ9bi5jb3VudHx8W107cmV0dXJuIG9bVF0ocyk/KGkobCxzKSxyP3Iob1tzXSk6b1tzXSk6KGwubGVuZ3RoPj0xZTMmJmRlbGV0ZSBvW2wuc2hpZnQoKV0sbC5wdXNoKHMpLG9bc109dFt6XShlLGEpLHI/cihvW3NdKTpvW3NdKX1yZXR1cm4gbn1mdW5jdGlvbiBhKCl7cmV0dXJuIHRoaXMuaGV4fWZ1bmN0aW9uIHModCxlKXtmb3IodmFyIHI9W10saT0wLG49dC5sZW5ndGg7bi0yKiFlPmk7aSs9Mil7dmFyIGE9W3t4Oit0W2ktMl0seTordFtpLTFdfSx7eDordFtpXSx5Oit0W2krMV19LHt4Oit0W2krMl0seTordFtpKzNdfSx7eDordFtpKzRdLHk6K3RbaSs1XX1dO2U/aT9uLTQ9PWk/YVszXT17eDordFswXSx5Oit0WzFdfTpuLTI9PWkmJihhWzJdPXt4Oit0WzBdLHk6K3RbMV19LGFbM109e3g6K3RbMl0seTordFszXX0pOmFbMF09e3g6K3Rbbi0yXSx5Oit0W24tMV19Om4tND09aT9hWzNdPWFbMl06aXx8KGFbMF09e3g6K3RbaV0seTordFtpKzFdfSksci5wdXNoKFtcIkNcIiwoLWFbMF0ueCs2KmFbMV0ueCthWzJdLngpLzYsKC1hWzBdLnkrNiphWzFdLnkrYVsyXS55KS82LChhWzFdLngrNiphWzJdLngtYVszXS54KS82LChhWzFdLnkrNiphWzJdLnktYVszXS55KS82LGFbMl0ueCxhWzJdLnldKX1yZXR1cm4gcn1mdW5jdGlvbiBvKHQsZSxyLGksbil7dmFyIGE9LTMqZSs5KnItOSppKzMqbixzPXQqYSs2KmUtMTIqcis2Kmk7cmV0dXJuIHQqcy0zKmUrMypyfWZ1bmN0aW9uIGwodCxlLHIsaSxuLGEscyxsLGgpe251bGw9PWgmJihoPTEpLGg9aD4xPzE6MD5oPzA6aDtmb3IodmFyIHU9aC8yLGM9MTIsZj1bLS4xMjUyLC4xMjUyLC0uMzY3OCwuMzY3OCwtLjU4NzMsLjU4NzMsLS43Njk5LC43Njk5LC0uOTA0MSwuOTA0MSwtLjk4MTYsLjk4MTZdLHA9Wy4yNDkxLC4yNDkxLC4yMzM1LC4yMzM1LC4yMDMyLC4yMDMyLC4xNjAxLC4xNjAxLC4xMDY5LC4xMDY5LC4wNDcyLC4wNDcyXSxkPTAsZz0wO2M+ZztnKyspe3ZhciB4PXUqZltnXSt1LHY9byh4LHQscixuLHMpLHk9byh4LGUsaSxhLGwpLG09dip2K3kqeTtkKz1wW2ddKlkuc3FydChtKX1yZXR1cm4gdSpkfWZ1bmN0aW9uIGgodCxlLHIsaSxuLGEscyxvLGgpe2lmKCEoMD5ofHxsKHQsZSxyLGksbixhLHMsbyk8aCkpe3ZhciB1PTEsYz11LzIsZj11LWMscCxkPS4wMTtmb3IocD1sKHQsZSxyLGksbixhLHMsbyxmKTtIKHAtaCk+ZDspYy89MixmKz0oaD5wPzE6LTEpKmMscD1sKHQsZSxyLGksbixhLHMsbyxmKTtyZXR1cm4gZn19ZnVuY3Rpb24gdSh0LGUscixpLG4sYSxzLG8pe2lmKCEoVyh0LHIpPEcobixzKXx8Ryh0LHIpPlcobixzKXx8VyhlLGkpPEcoYSxvKXx8RyhlLGkpPlcoYSxvKSkpe3ZhciBsPSh0KmktZSpyKSoobi1zKS0odC1yKSoobipvLWEqcyksaD0odCppLWUqcikqKGEtbyktKGUtaSkqKG4qby1hKnMpLHU9KHQtcikqKGEtbyktKGUtaSkqKG4tcyk7aWYodSl7dmFyIGM9bC91LGY9aC91LHA9K2MudG9GaXhlZCgyKSxkPStmLnRvRml4ZWQoMik7aWYoIShwPCtHKHQscikudG9GaXhlZCgyKXx8cD4rVyh0LHIpLnRvRml4ZWQoMil8fHA8K0cobixzKS50b0ZpeGVkKDIpfHxwPitXKG4scykudG9GaXhlZCgyKXx8ZDwrRyhlLGkpLnRvRml4ZWQoMil8fGQ+K1coZSxpKS50b0ZpeGVkKDIpfHxkPCtHKGEsbykudG9GaXhlZCgyKXx8ZD4rVyhhLG8pLnRvRml4ZWQoMikpKXJldHVybnt4OmMseTpmfX19fWZ1bmN0aW9uIGModCxlKXtyZXR1cm4gcCh0LGUpfWZ1bmN0aW9uIGYodCxlKXtyZXR1cm4gcCh0LGUsMSl9ZnVuY3Rpb24gcCh0LHIsaSl7dmFyIG49ZS5iZXppZXJCQm94KHQpLGE9ZS5iZXppZXJCQm94KHIpO2lmKCFlLmlzQkJveEludGVyc2VjdChuLGEpKXJldHVybiBpPzA6W107Zm9yKHZhciBzPWwuYXBwbHkoMCx0KSxvPWwuYXBwbHkoMCxyKSxoPVcofn4ocy81KSwxKSxjPVcofn4oby81KSwxKSxmPVtdLHA9W10sZD17fSxnPWk/MDpbXSx4PTA7aCsxPng7eCsrKXt2YXIgdj1lLmZpbmREb3RzQXRTZWdtZW50LmFwcGx5KGUsdC5jb25jYXQoeC9oKSk7Zi5wdXNoKHt4OnYueCx5OnYueSx0OngvaH0pfWZvcih4PTA7YysxPng7eCsrKXY9ZS5maW5kRG90c0F0U2VnbWVudC5hcHBseShlLHIuY29uY2F0KHgvYykpLHAucHVzaCh7eDp2LngseTp2LnksdDp4L2N9KTtmb3IoeD0wO2g+eDt4KyspZm9yKHZhciB5PTA7Yz55O3krKyl7dmFyIG09Zlt4XSxiPWZbeCsxXSxfPXBbeV0sdz1wW3krMV0saz1IKGIueC1tLngpPC4wMDE/XCJ5XCI6XCJ4XCIsQj1IKHcueC1fLngpPC4wMDE/XCJ5XCI6XCJ4XCIsQz11KG0ueCxtLnksYi54LGIueSxfLngsXy55LHcueCx3LnkpO2lmKEMpe2lmKGRbQy54LnRvRml4ZWQoNCldPT1DLnkudG9GaXhlZCg0KSljb250aW51ZTtkW0MueC50b0ZpeGVkKDQpXT1DLnkudG9GaXhlZCg0KTt2YXIgUz1tLnQrSCgoQ1trXS1tW2tdKS8oYltrXS1tW2tdKSkqKGIudC1tLnQpLFQ9Xy50K0goKENbQl0tX1tCXSkvKHdbQl0tX1tCXSkpKih3LnQtXy50KTtTPj0wJiYxLjAwMT49UyYmVD49MCYmMS4wMDE+PVQmJihpP2crKzpnLnB1c2goe3g6Qy54LHk6Qy55LHQxOkcoUywxKSx0MjpHKFQsMSl9KSl9fXJldHVybiBnfWZ1bmN0aW9uIGQodCxyLGkpe3Q9ZS5fcGF0aDJjdXJ2ZSh0KSxyPWUuX3BhdGgyY3VydmUocik7Zm9yKHZhciBuLGEscyxvLGwsaCx1LGMsZixkLGc9aT8wOltdLHg9MCx2PXQubGVuZ3RoO3Y+eDt4Kyspe3ZhciB5PXRbeF07aWYoXCJNXCI9PXlbMF0pbj1sPXlbMV0sYT1oPXlbMl07ZWxzZXtcIkNcIj09eVswXT8oZj1bbixhXS5jb25jYXQoeS5zbGljZSgxKSksbj1mWzZdLGE9Zls3XSk6KGY9W24sYSxuLGEsbCxoLGwsaF0sbj1sLGE9aCk7Zm9yKHZhciBtPTAsYj1yLmxlbmd0aDtiPm07bSsrKXt2YXIgXz1yW21dO2lmKFwiTVwiPT1fWzBdKXM9dT1fWzFdLG89Yz1fWzJdO2Vsc2V7XCJDXCI9PV9bMF0/KGQ9W3Msb10uY29uY2F0KF8uc2xpY2UoMSkpLHM9ZFs2XSxvPWRbN10pOihkPVtzLG8scyxvLHUsYyx1LGNdLHM9dSxvPWMpO3ZhciB3PXAoZixkLGkpO2lmKGkpZys9dztlbHNle2Zvcih2YXIgaz0wLEI9dy5sZW5ndGg7Qj5rO2srKyl3W2tdLnNlZ21lbnQxPXgsd1trXS5zZWdtZW50Mj1tLHdba10uYmV6MT1mLHdba10uYmV6Mj1kO2c9Zy5jb25jYXQodyl9fX19fXJldHVybiBnfWZ1bmN0aW9uIGcodCxlLHIsaSxuLGEpe251bGwhPXQ/KHRoaXMuYT0rdCx0aGlzLmI9K2UsdGhpcy5jPStyLHRoaXMuZD0raSx0aGlzLmU9K24sdGhpcy5mPSthKToodGhpcy5hPTEsdGhpcy5iPTAsdGhpcy5jPTAsdGhpcy5kPTEsdGhpcy5lPTAsdGhpcy5mPTApfWZ1bmN0aW9uIHgoKXtyZXR1cm4gdGhpcy54K0krdGhpcy55fWZ1bmN0aW9uIHYoKXtyZXR1cm4gdGhpcy54K0krdGhpcy55K0krdGhpcy53aWR0aCtcIiDDlyBcIit0aGlzLmhlaWdodH1mdW5jdGlvbiB5KHQsZSxyLGksbixhKXtmdW5jdGlvbiBzKHQpe3JldHVybigoYyp0K3UpKnQraCkqdH1mdW5jdGlvbiBvKHQsZSl7dmFyIHI9bCh0LGUpO3JldHVybigoZCpyK3ApKnIrZikqcn1mdW5jdGlvbiBsKHQsZSl7dmFyIHIsaSxuLGEsbyxsO2ZvcihuPXQsbD0wOzg+bDtsKyspe2lmKGE9cyhuKS10LEgoYSk8ZSlyZXR1cm4gbjtpZihvPSgzKmMqbisyKnUpKm4raCxIKG8pPDFlLTYpYnJlYWs7bi09YS9vfWlmKHI9MCxpPTEsbj10LHI+bilyZXR1cm4gcjtpZihuPmkpcmV0dXJuIGk7Zm9yKDtpPnI7KXtpZihhPXMobiksSChhLXQpPGUpcmV0dXJuIG47dD5hP3I9bjppPW4sbj0oaS1yKS8yK3J9cmV0dXJuIG59dmFyIGg9MyplLHU9MyooaS1lKS1oLGM9MS1oLXUsZj0zKnIscD0zKihuLXIpLWYsZD0xLWYtcDtyZXR1cm4gbyh0LDEvKDIwMCphKSl9ZnVuY3Rpb24gbSh0LGUpe3ZhciByPVtdLGk9e307aWYodGhpcy5tcz1lLHRoaXMudGltZXM9MSx0KXtmb3IodmFyIG4gaW4gdCl0W1RdKG4pJiYoaVtodChuKV09dFtuXSxyLnB1c2goaHQobikpKTtyLnNvcnQoQnQpfXRoaXMuYW5pbT1pLHRoaXMudG9wPXJbci5sZW5ndGgtMV0sdGhpcy5wZXJjZW50cz1yfWZ1bmN0aW9uIGIocixpLG4sYSxzLG8pe249aHQobik7dmFyIGwsaCx1LGM9W10sZixwLGQseD1yLm1zLHY9e30sbT17fSxiPXt9O2lmKGEpZm9yKHc9MCxCPUVlLmxlbmd0aDtCPnc7dysrKXt2YXIgXz1FZVt3XTtpZihfLmVsLmlkPT1pLmlkJiZfLmFuaW09PXIpe18ucGVyY2VudCE9bj8oRWUuc3BsaWNlKHcsMSksdT0xKTpoPV8saS5hdHRyKF8udG90YWxPcmlnaW4pO2JyZWFrfX1lbHNlIGE9K207Zm9yKHZhciB3PTAsQj1yLnBlcmNlbnRzLmxlbmd0aDtCPnc7dysrKXtpZihyLnBlcmNlbnRzW3ddPT1ufHxyLnBlcmNlbnRzW3ddPmEqci50b3Ape249ci5wZXJjZW50c1t3XSxwPXIucGVyY2VudHNbdy0xXXx8MCx4PXgvci50b3AqKG4tcCksZj1yLnBlcmNlbnRzW3crMV0sbD1yLmFuaW1bbl07YnJlYWt9YSYmaS5hdHRyKHIuYW5pbVtyLnBlcmNlbnRzW3ddXSl9aWYobCl7aWYoaCloLmluaXRzdGF0dXM9YSxoLnN0YXJ0PW5ldyBEYXRlLWgubXMqYTtlbHNle2Zvcih2YXIgQyBpbiBsKWlmKGxbVF0oQykmJihwdFtUXShDKXx8aS5wYXBlci5jdXN0b21BdHRyaWJ1dGVzW1RdKEMpKSlzd2l0Y2godltDXT1pLmF0dHIoQyksbnVsbD09dltDXSYmKHZbQ109ZnRbQ10pLG1bQ109bFtDXSxwdFtDXSl7Y2FzZSAkOmJbQ109KG1bQ10tdltDXSkveDticmVhaztjYXNlXCJjb2xvdXJcIjp2W0NdPWUuZ2V0UkdCKHZbQ10pO3ZhciBTPWUuZ2V0UkdCKG1bQ10pO2JbQ109e3I6KFMuci12W0NdLnIpL3gsZzooUy5nLXZbQ10uZykveCxiOihTLmItdltDXS5iKS94fTticmVhaztjYXNlXCJwYXRoXCI6dmFyIEE9UXQodltDXSxtW0NdKSxFPUFbMV07Zm9yKHZbQ109QVswXSxiW0NdPVtdLHc9MCxCPXZbQ10ubGVuZ3RoO0I+dzt3Kyspe2JbQ11bd109WzBdO2Zvcih2YXIgTj0xLE09dltDXVt3XS5sZW5ndGg7TT5OO04rKyliW0NdW3ddW05dPShFW3ddW05dLXZbQ11bd11bTl0pL3h9YnJlYWs7Y2FzZVwidHJhbnNmb3JtXCI6dmFyIEw9aS5fLHo9bGUoTFtDXSxtW0NdKTtpZih6KWZvcih2W0NdPXouZnJvbSxtW0NdPXoudG8sYltDXT1bXSxiW0NdLnJlYWw9ITAsdz0wLEI9dltDXS5sZW5ndGg7Qj53O3crKylmb3IoYltDXVt3XT1bdltDXVt3XVswXV0sTj0xLE09dltDXVt3XS5sZW5ndGg7TT5OO04rKyliW0NdW3ddW05dPShtW0NdW3ddW05dLXZbQ11bd11bTl0pL3g7ZWxzZXt2YXIgRj1pLm1hdHJpeHx8bmV3IGcsUj17Xzp7dHJhbnNmb3JtOkwudHJhbnNmb3JtfSxnZXRCQm94OmZ1bmN0aW9uKCl7cmV0dXJuIGkuZ2V0QkJveCgxKX19O3ZbQ109W0YuYSxGLmIsRi5jLEYuZCxGLmUsRi5mXSxzZShSLG1bQ10pLG1bQ109Ui5fLnRyYW5zZm9ybSxiW0NdPVsoUi5tYXRyaXguYS1GLmEpL3gsKFIubWF0cml4LmItRi5iKS94LChSLm1hdHJpeC5jLUYuYykveCwoUi5tYXRyaXguZC1GLmQpL3gsKFIubWF0cml4LmUtRi5lKS94LChSLm1hdHJpeC5mLUYuZikveF19YnJlYWs7Y2FzZVwiY3N2XCI6dmFyIEk9aihsW0NdKVtxXShrKSxEPWoodltDXSlbcV0oayk7aWYoXCJjbGlwLXJlY3RcIj09Qylmb3IodltDXT1ELGJbQ109W10sdz1ELmxlbmd0aDt3LS07KWJbQ11bd109KElbd10tdltDXVt3XSkveDttW0NdPUk7YnJlYWs7ZGVmYXVsdDpmb3IoST1bXVtQXShsW0NdKSxEPVtdW1BdKHZbQ10pLGJbQ109W10sdz1pLnBhcGVyLmN1c3RvbUF0dHJpYnV0ZXNbQ10ubGVuZ3RoO3ctLTspYltDXVt3XT0oKElbd118fDApLShEW3ddfHwwKSkveH12YXIgVj1sLmVhc2luZyxPPWUuZWFzaW5nX2Zvcm11bGFzW1ZdO2lmKCFPKWlmKE89aihWKS5tYXRjaChzdCksTyYmNT09Ty5sZW5ndGgpe3ZhciBZPU87Tz1mdW5jdGlvbih0KXtyZXR1cm4geSh0LCtZWzFdLCtZWzJdLCtZWzNdLCtZWzRdLHgpfX1lbHNlIE89U3Q7aWYoZD1sLnN0YXJ0fHxyLnN0YXJ0fHwrbmV3IERhdGUsXz17YW5pbTpyLHBlcmNlbnQ6bix0aW1lc3RhbXA6ZCxzdGFydDpkKyhyLmRlbHx8MCksc3RhdHVzOjAsaW5pdHN0YXR1czphfHwwLHN0b3A6ITEsbXM6eCxlYXNpbmc6Tyxmcm9tOnYsZGlmZjpiLHRvOm0sZWw6aSxjYWxsYmFjazpsLmNhbGxiYWNrLHByZXY6cCxuZXh0OmYscmVwZWF0Om98fHIudGltZXMsb3JpZ2luOmkuYXR0cigpLHRvdGFsT3JpZ2luOnN9LEVlLnB1c2goXyksYSYmIWgmJiF1JiYoXy5zdG9wPSEwLF8uc3RhcnQ9bmV3IERhdGUteCphLDE9PUVlLmxlbmd0aCkpcmV0dXJuIE1lKCk7dSYmKF8uc3RhcnQ9bmV3IERhdGUtXy5tcyphKSwxPT1FZS5sZW5ndGgmJk5lKE1lKX10KFwicmFwaGFlbC5hbmltLnN0YXJ0LlwiK2kuaWQsaSxyKX19ZnVuY3Rpb24gXyh0KXtmb3IodmFyIGU9MDtlPEVlLmxlbmd0aDtlKyspRWVbZV0uZWwucGFwZXI9PXQmJkVlLnNwbGljZShlLS0sMSl9ZS52ZXJzaW9uPVwiMi4yLjBcIixlLmV2ZT10O3ZhciB3LGs9L1ssIF0rLyxCPXtjaXJjbGU6MSxyZWN0OjEscGF0aDoxLGVsbGlwc2U6MSx0ZXh0OjEsaW1hZ2U6MX0sQz0vXFx7KFxcZCspXFx9L2csUz1cInByb3RvdHlwZVwiLFQ9XCJoYXNPd25Qcm9wZXJ0eVwiLEE9e2RvYzpkb2N1bWVudCx3aW46d2luZG93fSxFPXt3YXM6T2JqZWN0LnByb3RvdHlwZVtUXS5jYWxsKEEud2luLFwiUmFwaGFlbFwiKSxpczpBLndpbi5SYXBoYWVsfSxOPWZ1bmN0aW9uKCl7dGhpcy5jYT10aGlzLmN1c3RvbUF0dHJpYnV0ZXM9e319LE0sTD1cImFwcGVuZENoaWxkXCIsej1cImFwcGx5XCIsUD1cImNvbmNhdFwiLEY9XCJvbnRvdWNoc3RhcnRcImluIEEud2lufHxBLndpbi5Eb2N1bWVudFRvdWNoJiZBLmRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gsUj1cIlwiLEk9XCIgXCIsaj1TdHJpbmcscT1cInNwbGl0XCIsRD1cImNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZW1vdmUgbW91c2VvdXQgbW91c2VvdmVyIG1vdXNldXAgdG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWxcIltxXShJKSxWPXttb3VzZWRvd246XCJ0b3VjaHN0YXJ0XCIsbW91c2Vtb3ZlOlwidG91Y2htb3ZlXCIsbW91c2V1cDpcInRvdWNoZW5kXCJ9LE89ai5wcm90b3R5cGUudG9Mb3dlckNhc2UsWT1NYXRoLFc9WS5tYXgsRz1ZLm1pbixIPVkuYWJzLFg9WS5wb3csVT1ZLlBJLCQ9XCJudW1iZXJcIixaPVwic3RyaW5nXCIsUT1cImFycmF5XCIsSj1cInRvU3RyaW5nXCIsSz1cImZpbGxcIix0dD1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLGV0PXt9LHJ0PVwicHVzaFwiLGl0PWUuX0lTVVJMPS9edXJsXFwoWydcIl0/KC4rPylbJ1wiXT9cXCkkL2ksbnQ9L15cXHMqKCgjW2EtZlxcZF17Nn0pfCgjW2EtZlxcZF17M30pfHJnYmE/XFwoXFxzKihbXFxkXFwuXSslP1xccyosXFxzKltcXGRcXC5dKyU/XFxzKixcXHMqW1xcZFxcLl0rJT8oPzpcXHMqLFxccypbXFxkXFwuXSslPyk/KVxccypcXCl8aHNiYT9cXChcXHMqKFtcXGRcXC5dKyg/OmRlZ3xcXHhiMHwlKT9cXHMqLFxccypbXFxkXFwuXSslP1xccyosXFxzKltcXGRcXC5dKyg/OiU/XFxzKixcXHMqW1xcZFxcLl0rKT8pJT9cXHMqXFwpfGhzbGE/XFwoXFxzKihbXFxkXFwuXSsoPzpkZWd8XFx4YjB8JSk/XFxzKixcXHMqW1xcZFxcLl0rJT9cXHMqLFxccypbXFxkXFwuXSsoPzolP1xccyosXFxzKltcXGRcXC5dKyk/KSU/XFxzKlxcKSlcXHMqJC9pLGF0PXtOYU46MSxJbmZpbml0eToxLFwiLUluZmluaXR5XCI6MX0sc3Q9L14oPzpjdWJpYy0pP2JlemllclxcKChbXixdKyksKFteLF0rKSwoW14sXSspLChbXlxcKV0rKVxcKS8sb3Q9WS5yb3VuZCxsdD1cInNldEF0dHJpYnV0ZVwiLGh0PXBhcnNlRmxvYXQsdXQ9cGFyc2VJbnQsY3Q9ai5wcm90b3R5cGUudG9VcHBlckNhc2UsZnQ9ZS5fYXZhaWxhYmxlQXR0cnM9e1wiYXJyb3ctZW5kXCI6XCJub25lXCIsXCJhcnJvdy1zdGFydFwiOlwibm9uZVwiLGJsdXI6MCxcImNsaXAtcmVjdFwiOlwiMCAwIDFlOSAxZTlcIixjdXJzb3I6XCJkZWZhdWx0XCIsY3g6MCxjeTowLGZpbGw6XCIjZmZmXCIsXCJmaWxsLW9wYWNpdHlcIjoxLGZvbnQ6JzEwcHggXCJBcmlhbFwiJyxcImZvbnQtZmFtaWx5XCI6J1wiQXJpYWxcIicsXCJmb250LXNpemVcIjpcIjEwXCIsXCJmb250LXN0eWxlXCI6XCJub3JtYWxcIixcImZvbnQtd2VpZ2h0XCI6NDAwLGdyYWRpZW50OjAsaGVpZ2h0OjAsaHJlZjpcImh0dHA6Ly9yYXBoYWVsanMuY29tL1wiLFwibGV0dGVyLXNwYWNpbmdcIjowLG9wYWNpdHk6MSxwYXRoOlwiTTAsMFwiLHI6MCxyeDowLHJ5OjAsc3JjOlwiXCIsc3Ryb2tlOlwiIzAwMFwiLFwic3Ryb2tlLWRhc2hhcnJheVwiOlwiXCIsXCJzdHJva2UtbGluZWNhcFwiOlwiYnV0dFwiLFwic3Ryb2tlLWxpbmVqb2luXCI6XCJidXR0XCIsXCJzdHJva2UtbWl0ZXJsaW1pdFwiOjAsXCJzdHJva2Utb3BhY2l0eVwiOjEsXCJzdHJva2Utd2lkdGhcIjoxLHRhcmdldDpcIl9ibGFua1wiLFwidGV4dC1hbmNob3JcIjpcIm1pZGRsZVwiLHRpdGxlOlwiUmFwaGFlbFwiLHRyYW5zZm9ybTpcIlwiLHdpZHRoOjAseDowLHk6MCxcImNsYXNzXCI6XCJcIn0scHQ9ZS5fYXZhaWxhYmxlQW5pbUF0dHJzPXtibHVyOiQsXCJjbGlwLXJlY3RcIjpcImNzdlwiLGN4OiQsY3k6JCxmaWxsOlwiY29sb3VyXCIsXCJmaWxsLW9wYWNpdHlcIjokLFwiZm9udC1zaXplXCI6JCxoZWlnaHQ6JCxvcGFjaXR5OiQscGF0aDpcInBhdGhcIixyOiQscng6JCxyeTokLHN0cm9rZTpcImNvbG91clwiLFwic3Ryb2tlLW9wYWNpdHlcIjokLFwic3Ryb2tlLXdpZHRoXCI6JCx0cmFuc2Zvcm06XCJ0cmFuc2Zvcm1cIix3aWR0aDokLHg6JCx5OiR9LGR0PS9bXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjldL2csZ3Q9L1tcXHgwOVxceDBhXFx4MGJcXHgwY1xceDBkXFx4MjBcXHhhMFxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHUyMDI4XFx1MjAyOV0qLFtcXHgwOVxceDBhXFx4MGJcXHgwY1xceDBkXFx4MjBcXHhhMFxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHUyMDI4XFx1MjAyOV0qLyx4dD17aHM6MSxyZzoxfSx2dD0vLD8oW2FjaGxtcXJzdHZ4el0pLD8vZ2kseXQ9LyhbYWNobG1ycXN0dnpdKVtcXHgwOVxceDBhXFx4MGJcXHgwY1xceDBkXFx4MjBcXHhhMFxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHUyMDI4XFx1MjAyOSxdKigoLT9cXGQqXFwuP1xcZCooPzplW1xcLStdP1xcZCspP1tcXHgwOVxceDBhXFx4MGJcXHgwY1xceDBkXFx4MjBcXHhhMFxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHUyMDI4XFx1MjAyOV0qLD9bXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjldKikrKS9naSxtdD0vKFtyc3RtXSlbXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjksXSooKC0/XFxkKlxcLj9cXGQqKD86ZVtcXC0rXT9cXGQrKT9bXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjldKiw/W1xceDA5XFx4MGFcXHgwYlxceDBjXFx4MGRcXHgyMFxceGEwXFx1MTY4MFxcdTE4MGVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwYVxcdTIwMmZcXHUyMDVmXFx1MzAwMFxcdTIwMjhcXHUyMDI5XSopKykvZ2ksYnQ9LygtP1xcZCpcXC4/XFxkKig/OmVbXFwtK10/XFxkKyk/KVtcXHgwOVxceDBhXFx4MGJcXHgwY1xceDBkXFx4MjBcXHhhMFxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHUyMDI4XFx1MjAyOV0qLD9bXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjldKi9naSxfdD1lLl9yYWRpYWxfZ3JhZGllbnQ9L15yKD86XFwoKFteLF0rPylbXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjldKixbXFx4MDlcXHgwYVxceDBiXFx4MGNcXHgwZFxceDIwXFx4YTBcXHUxNjgwXFx1MTgwZVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBhXFx1MjAyZlxcdTIwNWZcXHUzMDAwXFx1MjAyOFxcdTIwMjldKihbXlxcKV0rPylcXCkpPy8sd3Q9e30sa3Q9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5rZXktZS5rZXl9LEJ0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGh0KHQpLWh0KGUpfSxDdD1mdW5jdGlvbigpe30sU3Q9ZnVuY3Rpb24odCl7cmV0dXJuIHR9LFR0PWUuX3JlY3RQYXRoPWZ1bmN0aW9uKHQsZSxyLGksbil7cmV0dXJuIG4/W1tcIk1cIix0K24sZV0sW1wibFwiLHItMipuLDBdLFtcImFcIixuLG4sMCwwLDEsbixuXSxbXCJsXCIsMCxpLTIqbl0sW1wiYVwiLG4sbiwwLDAsMSwtbixuXSxbXCJsXCIsMipuLXIsMF0sW1wiYVwiLG4sbiwwLDAsMSwtbiwtbl0sW1wibFwiLDAsMipuLWldLFtcImFcIixuLG4sMCwwLDEsbiwtbl0sW1wielwiXV06W1tcIk1cIix0LGVdLFtcImxcIixyLDBdLFtcImxcIiwwLGldLFtcImxcIiwtciwwXSxbXCJ6XCJdXX0sQXQ9ZnVuY3Rpb24odCxlLHIsaSl7cmV0dXJuIG51bGw9PWkmJihpPXIpLFtbXCJNXCIsdCxlXSxbXCJtXCIsMCwtaV0sW1wiYVwiLHIsaSwwLDEsMSwwLDIqaV0sW1wiYVwiLHIsaSwwLDEsMSwwLC0yKmldLFtcInpcIl1dfSxFdD1lLl9nZXRQYXRoPXtwYXRoOmZ1bmN0aW9uKHQpe3JldHVybiB0LmF0dHIoXCJwYXRoXCIpfSxjaXJjbGU6ZnVuY3Rpb24odCl7dmFyIGU9dC5hdHRycztyZXR1cm4gQXQoZS5jeCxlLmN5LGUucil9LGVsbGlwc2U6ZnVuY3Rpb24odCl7dmFyIGU9dC5hdHRycztyZXR1cm4gQXQoZS5jeCxlLmN5LGUucngsZS5yeSl9LHJlY3Q6ZnVuY3Rpb24odCl7dmFyIGU9dC5hdHRycztyZXR1cm4gVHQoZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LGUucil9LGltYWdlOmZ1bmN0aW9uKHQpe3ZhciBlPXQuYXR0cnM7cmV0dXJuIFR0KGUueCxlLnksZS53aWR0aCxlLmhlaWdodCl9LHRleHQ6ZnVuY3Rpb24odCl7dmFyIGU9dC5fZ2V0QkJveCgpO3JldHVybiBUdChlLngsZS55LGUud2lkdGgsZS5oZWlnaHQpfSxzZXQ6ZnVuY3Rpb24odCl7dmFyIGU9dC5fZ2V0QkJveCgpO3JldHVybiBUdChlLngsZS55LGUud2lkdGgsZS5oZWlnaHQpfX0sTnQ9ZS5tYXBQYXRoPWZ1bmN0aW9uKHQsZSl7aWYoIWUpcmV0dXJuIHQ7dmFyIHIsaSxuLGEscyxvLGw7Zm9yKHQ9UXQodCksbj0wLHM9dC5sZW5ndGg7cz5uO24rKylmb3IobD10W25dLGE9MSxvPWwubGVuZ3RoO28+YTthKz0yKXI9ZS54KGxbYV0sbFthKzFdKSxpPWUueShsW2FdLGxbYSsxXSksbFthXT1yLGxbYSsxXT1pO3JldHVybiB0fTtpZihlLl9nPUEsZS50eXBlPUEud2luLlNWR0FuZ2xlfHxBLmRvYy5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKFwiaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZVwiLFwiMS4xXCIpP1wiU1ZHXCI6XCJWTUxcIixcIlZNTFwiPT1lLnR5cGUpe3ZhciBNdD1BLmRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLEx0O2lmKE10LmlubmVySFRNTD0nPHY6c2hhcGUgYWRqPVwiMVwiLz4nLEx0PU10LmZpcnN0Q2hpbGQsTHQuc3R5bGUuYmVoYXZpb3I9XCJ1cmwoI2RlZmF1bHQjVk1MKVwiLCFMdHx8XCJvYmplY3RcIiE9dHlwZW9mIEx0LmFkailyZXR1cm4gZS50eXBlPVI7TXQ9bnVsbH1lLnN2Zz0hKGUudm1sPVwiVk1MXCI9PWUudHlwZSksZS5fUGFwZXI9TixlLmZuPU09Ti5wcm90b3R5cGU9ZS5wcm90b3R5cGUsZS5faWQ9MCxlLl9vaWQ9MCxlLmlzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGU9Ty5jYWxsKGUpLFwiZmluaXRlXCI9PWU/IWF0W1RdKCt0KTpcImFycmF5XCI9PWU/dCBpbnN0YW5jZW9mIEFycmF5OlwibnVsbFwiPT1lJiZudWxsPT09dHx8ZT09dHlwZW9mIHQmJm51bGwhPT10fHxcIm9iamVjdFwiPT1lJiZ0PT09T2JqZWN0KHQpfHxcImFycmF5XCI9PWUmJkFycmF5LmlzQXJyYXkmJkFycmF5LmlzQXJyYXkodCl8fHR0LmNhbGwodCkuc2xpY2UoOCwtMSkudG9Mb3dlckNhc2UoKT09ZX0sZS5hbmdsZT1mdW5jdGlvbih0LHIsaSxuLGEscyl7aWYobnVsbD09YSl7dmFyIG89dC1pLGw9ci1uO3JldHVybiBvfHxsPygxODArMTgwKlkuYXRhbjIoLWwsLW8pL1UrMzYwKSUzNjA6MH1yZXR1cm4gZS5hbmdsZSh0LHIsYSxzKS1lLmFuZ2xlKGksbixhLHMpfSxlLnJhZD1mdW5jdGlvbih0KXtyZXR1cm4gdCUzNjAqVS8xODB9LGUuZGVnPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnJvdW5kKDE4MCp0L1UlMzYwKjFlMykvMWUzfSxlLnNuYXBUbz1mdW5jdGlvbih0LHIsaSl7aWYoaT1lLmlzKGksXCJmaW5pdGVcIik/aToxMCxlLmlzKHQsUSkpe2Zvcih2YXIgbj10Lmxlbmd0aDtuLS07KWlmKEgodFtuXS1yKTw9aSlyZXR1cm4gdFtuXX1lbHNle3Q9K3Q7dmFyIGE9ciV0O2lmKGk+YSlyZXR1cm4gci1hO2lmKGE+dC1pKXJldHVybiByLWErdH1yZXR1cm4gcn07dmFyIHp0PWUuY3JlYXRlVVVJRD1mdW5jdGlvbih0LGUpe3JldHVybiBmdW5jdGlvbigpe3JldHVyblwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCIucmVwbGFjZSh0LGUpLnRvVXBwZXJDYXNlKCl9fSgvW3h5XS9nLGZ1bmN0aW9uKHQpe3ZhciBlPTE2KlkucmFuZG9tKCl8MCxyPVwieFwiPT10P2U6MyZlfDg7cmV0dXJuIHIudG9TdHJpbmcoMTYpfSk7ZS5zZXRXaW5kb3c9ZnVuY3Rpb24ocil7dChcInJhcGhhZWwuc2V0V2luZG93XCIsZSxBLndpbixyKSxBLndpbj1yLEEuZG9jPUEud2luLmRvY3VtZW50LGUuX2VuZ2luZS5pbml0V2luJiZlLl9lbmdpbmUuaW5pdFdpbihBLndpbil9O3ZhciBQdD1mdW5jdGlvbih0KXtpZihlLnZtbCl7dmFyIHI9L15cXHMrfFxccyskL2csaTt0cnl7dmFyIGE9bmV3IEFjdGl2ZVhPYmplY3QoXCJodG1sZmlsZVwiKTthLndyaXRlKFwiPGJvZHk+XCIpLGEuY2xvc2UoKSxpPWEuYm9keX1jYXRjaChzKXtpPWNyZWF0ZVBvcHVwKCkuZG9jdW1lbnQuYm9keX12YXIgbz1pLmNyZWF0ZVRleHRSYW5nZSgpO1B0PW4oZnVuY3Rpb24odCl7dHJ5e2kuc3R5bGUuY29sb3I9aih0KS5yZXBsYWNlKHIsUik7dmFyIGU9by5xdWVyeUNvbW1hbmRWYWx1ZShcIkZvcmVDb2xvclwiKTtyZXR1cm4gZT0oMjU1JmUpPDwxNnw2NTI4MCZlfCgxNjcxMTY4MCZlKT4+PjE2LFwiI1wiKyhcIjAwMDAwMFwiK2UudG9TdHJpbmcoMTYpKS5zbGljZSgtNil9Y2F0Y2gobil7cmV0dXJuXCJub25lXCJ9fSl9ZWxzZXt2YXIgbD1BLmRvYy5jcmVhdGVFbGVtZW50KFwiaVwiKTtsLnRpdGxlPVwiUmFwaGHDq2wgQ29sb3VyIFBpY2tlclwiLGwuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixBLmRvYy5ib2R5LmFwcGVuZENoaWxkKGwpLFB0PW4oZnVuY3Rpb24odCl7cmV0dXJuIGwuc3R5bGUuY29sb3I9dCxBLmRvYy5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGwsUikuZ2V0UHJvcGVydHlWYWx1ZShcImNvbG9yXCIpfSl9cmV0dXJuIFB0KHQpfSxGdD1mdW5jdGlvbigpe3JldHVyblwiaHNiKFwiK1t0aGlzLmgsdGhpcy5zLHRoaXMuYl0rXCIpXCJ9LFJ0PWZ1bmN0aW9uKCl7cmV0dXJuXCJoc2woXCIrW3RoaXMuaCx0aGlzLnMsdGhpcy5sXStcIilcIn0sSXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5oZXh9LGp0PWZ1bmN0aW9uKHQscixpKXtpZihudWxsPT1yJiZlLmlzKHQsXCJvYmplY3RcIikmJlwiclwiaW4gdCYmXCJnXCJpbiB0JiZcImJcImluIHQmJihpPXQuYixyPXQuZyx0PXQuciksbnVsbD09ciYmZS5pcyh0LFopKXt2YXIgbj1lLmdldFJHQih0KTt0PW4ucixyPW4uZyxpPW4uYn1yZXR1cm4odD4xfHxyPjF8fGk+MSkmJih0Lz0yNTUsci89MjU1LGkvPTI1NSksW3QscixpXX0scXQ9ZnVuY3Rpb24odCxyLGksbil7dCo9MjU1LHIqPTI1NSxpKj0yNTU7dmFyIGE9e3I6dCxnOnIsYjppLGhleDplLnJnYih0LHIsaSksdG9TdHJpbmc6SXR9O3JldHVybiBlLmlzKG4sXCJmaW5pdGVcIikmJihhLm9wYWNpdHk9biksYX07ZS5jb2xvcj1mdW5jdGlvbih0KXt2YXIgcjtyZXR1cm4gZS5pcyh0LFwib2JqZWN0XCIpJiZcImhcImluIHQmJlwic1wiaW4gdCYmXCJiXCJpbiB0PyhyPWUuaHNiMnJnYih0KSx0LnI9ci5yLHQuZz1yLmcsdC5iPXIuYix0LmhleD1yLmhleCk6ZS5pcyh0LFwib2JqZWN0XCIpJiZcImhcImluIHQmJlwic1wiaW4gdCYmXCJsXCJpbiB0PyhyPWUuaHNsMnJnYih0KSx0LnI9ci5yLHQuZz1yLmcsdC5iPXIuYix0LmhleD1yLmhleCk6KGUuaXModCxcInN0cmluZ1wiKSYmKHQ9ZS5nZXRSR0IodCkpLGUuaXModCxcIm9iamVjdFwiKSYmXCJyXCJpbiB0JiZcImdcImluIHQmJlwiYlwiaW4gdD8ocj1lLnJnYjJoc2wodCksdC5oPXIuaCx0LnM9ci5zLHQubD1yLmwscj1lLnJnYjJoc2IodCksdC52PXIuYik6KHQ9e2hleDpcIm5vbmVcIn0sdC5yPXQuZz10LmI9dC5oPXQucz10LnY9dC5sPS0xKSksdC50b1N0cmluZz1JdCx0fSxlLmhzYjJyZ2I9ZnVuY3Rpb24odCxlLHIsaSl7dGhpcy5pcyh0LFwib2JqZWN0XCIpJiZcImhcImluIHQmJlwic1wiaW4gdCYmXCJiXCJpbiB0JiYocj10LmIsZT10LnMsaT10Lm8sdD10LmgpLHQqPTM2MDt2YXIgbixhLHMsbyxsO3JldHVybiB0PXQlMzYwLzYwLGw9ciplLG89bCooMS1IKHQlMi0xKSksbj1hPXM9ci1sLHQ9fn50LG4rPVtsLG8sMCwwLG8sbF1bdF0sYSs9W28sbCxsLG8sMCwwXVt0XSxzKz1bMCwwLG8sbCxsLG9dW3RdLHF0KG4sYSxzLGkpfSxlLmhzbDJyZ2I9ZnVuY3Rpb24odCxlLHIsaSl7dGhpcy5pcyh0LFwib2JqZWN0XCIpJiZcImhcImluIHQmJlwic1wiaW4gdCYmXCJsXCJpbiB0JiYocj10LmwsZT10LnMsdD10LmgpLCh0PjF8fGU+MXx8cj4xKSYmKHQvPTM2MCxlLz0xMDAsci89MTAwKSx0Kj0zNjA7dmFyIG4sYSxzLG8sbDtyZXR1cm4gdD10JTM2MC82MCxsPTIqZSooLjU+cj9yOjEtciksbz1sKigxLUgodCUyLTEpKSxuPWE9cz1yLWwvMix0PX5+dCxuKz1bbCxvLDAsMCxvLGxdW3RdLGErPVtvLGwsbCxvLDAsMF1bdF0scys9WzAsMCxvLGwsbCxvXVt0XSxxdChuLGEscyxpKX0sZS5yZ2IyaHNiPWZ1bmN0aW9uKHQsZSxyKXtyPWp0KHQsZSxyKSx0PXJbMF0sZT1yWzFdLHI9clsyXTt2YXIgaSxuLGEscztyZXR1cm4gYT1XKHQsZSxyKSxzPWEtRyh0LGUsciksaT0wPT1zP251bGw6YT09dD8oZS1yKS9zOmE9PWU/KHItdCkvcysyOih0LWUpL3MrNCxpPShpKzM2MCklNio2MC8zNjAsbj0wPT1zPzA6cy9hLHtoOmksczpuLGI6YSx0b1N0cmluZzpGdH19LGUucmdiMmhzbD1mdW5jdGlvbih0LGUscil7cj1qdCh0LGUsciksdD1yWzBdLGU9clsxXSxyPXJbMl07dmFyIGksbixhLHMsbyxsO3JldHVybiBzPVcodCxlLHIpLG89Ryh0LGUsciksbD1zLW8saT0wPT1sP251bGw6cz09dD8oZS1yKS9sOnM9PWU/KHItdCkvbCsyOih0LWUpL2wrNCxpPShpKzM2MCklNio2MC8zNjAsYT0ocytvKS8yLG49MD09bD8wOi41PmE/bC8oMiphKTpsLygyLTIqYSkse2g6aSxzOm4sbDphLHRvU3RyaW5nOlJ0fX0sZS5fcGF0aDJzdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5qb2luKFwiLFwiKS5yZXBsYWNlKHZ0LFwiJDFcIil9O3ZhciBEdD1lLl9wcmVsb2FkPWZ1bmN0aW9uKHQsZSl7dmFyIHI9QS5kb2MuY3JlYXRlRWxlbWVudChcImltZ1wiKTtyLnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi05OTk5ZW07dG9wOi05OTk5ZW1cIixyLm9ubG9hZD1mdW5jdGlvbigpe2UuY2FsbCh0aGlzKSx0aGlzLm9ubG9hZD1udWxsLEEuZG9jLmJvZHkucmVtb3ZlQ2hpbGQodGhpcyl9LHIub25lcnJvcj1mdW5jdGlvbigpe0EuZG9jLmJvZHkucmVtb3ZlQ2hpbGQodGhpcyl9LEEuZG9jLmJvZHkuYXBwZW5kQ2hpbGQociksci5zcmM9dH07ZS5nZXRSR0I9bihmdW5jdGlvbih0KXtpZighdHx8KHQ9aih0KSkuaW5kZXhPZihcIi1cIikrMSlyZXR1cm57cjotMSxnOi0xLGI6LTEsaGV4Olwibm9uZVwiLGVycm9yOjEsdG9TdHJpbmc6YX07aWYoXCJub25lXCI9PXQpcmV0dXJue3I6LTEsZzotMSxiOi0xLGhleDpcIm5vbmVcIix0b1N0cmluZzphfTshKHh0W1RdKHQudG9Mb3dlckNhc2UoKS5zdWJzdHJpbmcoMCwyKSl8fFwiI1wiPT10LmNoYXJBdCgpKSYmKHQ9UHQodCkpO3ZhciByLGksbixzLG8sbCxoLHU9dC5tYXRjaChudCk7cmV0dXJuIHU/KHVbMl0mJihzPXV0KHVbMl0uc3Vic3RyaW5nKDUpLDE2KSxuPXV0KHVbMl0uc3Vic3RyaW5nKDMsNSksMTYpLGk9dXQodVsyXS5zdWJzdHJpbmcoMSwzKSwxNikpLHVbM10mJihzPXV0KChsPXVbM10uY2hhckF0KDMpKStsLDE2KSxuPXV0KChsPXVbM10uY2hhckF0KDIpKStsLDE2KSxpPXV0KChsPXVbM10uY2hhckF0KDEpKStsLDE2KSksdVs0XSYmKGg9dVs0XVtxXShndCksaT1odChoWzBdKSxcIiVcIj09aFswXS5zbGljZSgtMSkmJihpKj0yLjU1KSxuPWh0KGhbMV0pLFwiJVwiPT1oWzFdLnNsaWNlKC0xKSYmKG4qPTIuNTUpLHM9aHQoaFsyXSksXCIlXCI9PWhbMl0uc2xpY2UoLTEpJiYocyo9Mi41NSksXCJyZ2JhXCI9PXVbMV0udG9Mb3dlckNhc2UoKS5zbGljZSgwLDQpJiYobz1odChoWzNdKSksaFszXSYmXCIlXCI9PWhbM10uc2xpY2UoLTEpJiYoby89MTAwKSksdVs1XT8oaD11WzVdW3FdKGd0KSxpPWh0KGhbMF0pLFwiJVwiPT1oWzBdLnNsaWNlKC0xKSYmKGkqPTIuNTUpLG49aHQoaFsxXSksXCIlXCI9PWhbMV0uc2xpY2UoLTEpJiYobio9Mi41NSkscz1odChoWzJdKSxcIiVcIj09aFsyXS5zbGljZSgtMSkmJihzKj0yLjU1KSwoXCJkZWdcIj09aFswXS5zbGljZSgtMyl8fFwiwrBcIj09aFswXS5zbGljZSgtMSkpJiYoaS89MzYwKSxcImhzYmFcIj09dVsxXS50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsNCkmJihvPWh0KGhbM10pKSxoWzNdJiZcIiVcIj09aFszXS5zbGljZSgtMSkmJihvLz0xMDApLGUuaHNiMnJnYihpLG4scyxvKSk6dVs2XT8oaD11WzZdW3FdKGd0KSxpPWh0KGhbMF0pLFwiJVwiPT1oWzBdLnNsaWNlKC0xKSYmKGkqPTIuNTUpLG49aHQoaFsxXSksXCIlXCI9PWhbMV0uc2xpY2UoLTEpJiYobio9Mi41NSkscz1odChoWzJdKSxcIiVcIj09aFsyXS5zbGljZSgtMSkmJihzKj0yLjU1KSwoXCJkZWdcIj09aFswXS5zbGljZSgtMyl8fFwiwrBcIj09aFswXS5zbGljZSgtMSkpJiYoaS89MzYwKSxcImhzbGFcIj09dVsxXS50b0xvd2VyQ2FzZSgpLnNsaWNlKDAsNCkmJihvPWh0KGhbM10pKSxoWzNdJiZcIiVcIj09aFszXS5zbGljZSgtMSkmJihvLz0xMDApLGUuaHNsMnJnYihpLG4scyxvKSk6KHU9e3I6aSxnOm4sYjpzLHRvU3RyaW5nOmF9LHUuaGV4PVwiI1wiKygxNjc3NzIxNnxzfG48PDh8aTw8MTYpLnRvU3RyaW5nKDE2KS5zbGljZSgxKSxlLmlzKG8sXCJmaW5pdGVcIikmJih1Lm9wYWNpdHk9byksdSkpOntyOi0xLGc6LTEsYjotMSxoZXg6XCJub25lXCIsZXJyb3I6MSx0b1N0cmluZzphfX0sZSksZS5oc2I9bihmdW5jdGlvbih0LHIsaSl7cmV0dXJuIGUuaHNiMnJnYih0LHIsaSkuaGV4fSksZS5oc2w9bihmdW5jdGlvbih0LHIsaSl7cmV0dXJuIGUuaHNsMnJnYih0LHIsaSkuaGV4fSksZS5yZ2I9bihmdW5jdGlvbih0LGUscil7ZnVuY3Rpb24gaSh0KXtyZXR1cm4gdCsuNXwwfXJldHVyblwiI1wiKygxNjc3NzIxNnxpKHIpfGkoZSk8PDh8aSh0KTw8MTYpLnRvU3RyaW5nKDE2KS5zbGljZSgxKX0pLGUuZ2V0Q29sb3I9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5nZXRDb2xvci5zdGFydD10aGlzLmdldENvbG9yLnN0YXJ0fHx7aDowLHM6MSxiOnR8fC43NX0scj10aGlzLmhzYjJyZ2IoZS5oLGUucyxlLmIpO3JldHVybiBlLmgrPS4wNzUsZS5oPjEmJihlLmg9MCxlLnMtPS4yLGUuczw9MCYmKHRoaXMuZ2V0Q29sb3Iuc3RhcnQ9e2g6MCxzOjEsYjplLmJ9KSksci5oZXh9LGUuZ2V0Q29sb3IucmVzZXQ9ZnVuY3Rpb24oKXtkZWxldGUgdGhpcy5zdGFydH0sZS5wYXJzZVBhdGhTdHJpbmc9ZnVuY3Rpb24odCl7aWYoIXQpcmV0dXJuIG51bGw7dmFyIHI9VnQodCk7aWYoci5hcnIpcmV0dXJuIFl0KHIuYXJyKTt2YXIgaT17YTo3LGM6NixoOjEsbDoyLG06MixyOjQscTo0LHM6NCx0OjIsdjoxLHo6MH0sbj1bXTtyZXR1cm4gZS5pcyh0LFEpJiZlLmlzKHRbMF0sUSkmJihuPVl0KHQpKSxuLmxlbmd0aHx8aih0KS5yZXBsYWNlKHl0LGZ1bmN0aW9uKHQsZSxyKXt2YXIgYT1bXSxzPWUudG9Mb3dlckNhc2UoKTtpZihyLnJlcGxhY2UoYnQsZnVuY3Rpb24odCxlKXtlJiZhLnB1c2goK2UpfSksXCJtXCI9PXMmJmEubGVuZ3RoPjImJihuLnB1c2goW2VdW1BdKGEuc3BsaWNlKDAsMikpKSxzPVwibFwiLGU9XCJtXCI9PWU/XCJsXCI6XCJMXCIpLFwiclwiPT1zKW4ucHVzaChbZV1bUF0oYSkpO2Vsc2UgZm9yKDthLmxlbmd0aD49aVtzXSYmKG4ucHVzaChbZV1bUF0oYS5zcGxpY2UoMCxpW3NdKSkpLGlbc10pOyk7fSksbi50b1N0cmluZz1lLl9wYXRoMnN0cmluZyxyLmFycj1ZdChuKSxufSxlLnBhcnNlVHJhbnNmb3JtU3RyaW5nPW4oZnVuY3Rpb24odCl7aWYoIXQpcmV0dXJuIG51bGw7dmFyIHI9e3I6MyxzOjQsdDoyLG06Nn0saT1bXTtyZXR1cm4gZS5pcyh0LFEpJiZlLmlzKHRbMF0sUSkmJihpPVl0KHQpKSxpLmxlbmd0aHx8aih0KS5yZXBsYWNlKG10LGZ1bmN0aW9uKHQsZSxyKXt2YXIgbj1bXSxhPU8uY2FsbChlKTtyLnJlcGxhY2UoYnQsZnVuY3Rpb24odCxlKXtlJiZuLnB1c2goK2UpfSksaS5wdXNoKFtlXVtQXShuKSl9KSxpLnRvU3RyaW5nPWUuX3BhdGgyc3RyaW5nLGl9KTt2YXIgVnQ9ZnVuY3Rpb24odCl7dmFyIGU9VnQucHM9VnQucHN8fHt9O3JldHVybiBlW3RdP2VbdF0uc2xlZXA9MTAwOmVbdF09e3NsZWVwOjEwMH0sc2V0VGltZW91dChmdW5jdGlvbigpe2Zvcih2YXIgciBpbiBlKWVbVF0ocikmJnIhPXQmJihlW3JdLnNsZWVwLS0sIWVbcl0uc2xlZXAmJmRlbGV0ZSBlW3JdKX0pLGVbdF19O2UuZmluZERvdHNBdFNlZ21lbnQ9ZnVuY3Rpb24odCxlLHIsaSxuLGEscyxvLGwpe3ZhciBoPTEtbCx1PVgoaCwzKSxjPVgoaCwyKSxmPWwqbCxwPWYqbCxkPXUqdCszKmMqbCpyKzMqaCpsKmwqbitwKnMsZz11KmUrMypjKmwqaSszKmgqbCpsKmErcCpvLHg9dCsyKmwqKHItdCkrZioobi0yKnIrdCksdj1lKzIqbCooaS1lKStmKihhLTIqaStlKSx5PXIrMipsKihuLXIpK2YqKHMtMipuK3IpLG09aSsyKmwqKGEtaSkrZiooby0yKmEraSksYj1oKnQrbCpyLF89aCplK2wqaSx3PWgqbitsKnMsaz1oKmErbCpvLEI9OTAtMTgwKlkuYXRhbjIoeC15LHYtbSkvVTtyZXR1cm4oeD55fHxtPnYpJiYoQis9MTgwKSx7eDpkLHk6ZyxtOnt4OngseTp2fSxuOnt4OnkseTptfSxzdGFydDp7eDpiLHk6X30sZW5kOnt4OncseTprfSxhbHBoYTpCfX0sZS5iZXppZXJCQm94PWZ1bmN0aW9uKHQscixpLG4sYSxzLG8sbCl7ZS5pcyh0LFwiYXJyYXlcIil8fCh0PVt0LHIsaSxuLGEscyxvLGxdKTt2YXIgaD1adC5hcHBseShudWxsLHQpO3JldHVybnt4OmgubWluLngseTpoLm1pbi55LHgyOmgubWF4LngseTI6aC5tYXgueSx3aWR0aDpoLm1heC54LWgubWluLngsaGVpZ2h0OmgubWF4LnktaC5taW4ueX19LGUuaXNQb2ludEluc2lkZUJCb3g9ZnVuY3Rpb24odCxlLHIpe3JldHVybiBlPj10LngmJmU8PXQueDImJnI+PXQueSYmcjw9dC55Mn0sZS5pc0JCb3hJbnRlcnNlY3Q9ZnVuY3Rpb24odCxyKXt2YXIgaT1lLmlzUG9pbnRJbnNpZGVCQm94O3JldHVybiBpKHIsdC54LHQueSl8fGkocix0LngyLHQueSl8fGkocix0LngsdC55Mil8fGkocix0LngyLHQueTIpfHxpKHQsci54LHIueSl8fGkodCxyLngyLHIueSl8fGkodCxyLngsci55Mil8fGkodCxyLngyLHIueTIpfHwodC54PHIueDImJnQueD5yLnh8fHIueDx0LngyJiZyLng+dC54KSYmKHQueTxyLnkyJiZ0Lnk+ci55fHxyLnk8dC55MiYmci55PnQueSl9LGUucGF0aEludGVyc2VjdGlvbj1mdW5jdGlvbih0LGUpe3JldHVybiBkKHQsZSl9LGUucGF0aEludGVyc2VjdGlvbk51bWJlcj1mdW5jdGlvbih0LGUpe3JldHVybiBkKHQsZSwxKX0sZS5pc1BvaW50SW5zaWRlUGF0aD1mdW5jdGlvbih0LHIsaSl7dmFyIG49ZS5wYXRoQkJveCh0KTtyZXR1cm4gZS5pc1BvaW50SW5zaWRlQkJveChuLHIsaSkmJmQodCxbW1wiTVwiLHIsaV0sW1wiSFwiLG4ueDIrMTBdXSwxKSUyPT0xfSxlLl9yZW1vdmVkRmFjdG9yeT1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24oKXt0KFwicmFwaGFlbC5sb2dcIixudWxsLFwiUmFwaGHDq2w6IHlvdSBhcmUgY2FsbGluZyB0byBtZXRob2Qg4oCcXCIrZStcIuKAnSBvZiByZW1vdmVkIG9iamVjdFwiLGUpfX07dmFyIE90PWUucGF0aEJCb3g9ZnVuY3Rpb24odCl7dmFyIGU9VnQodCk7aWYoZS5iYm94KXJldHVybiByKGUuYmJveCk7aWYoIXQpcmV0dXJue3g6MCx5OjAsd2lkdGg6MCxoZWlnaHQ6MCx4MjowLHkyOjB9O3Q9UXQodCk7Zm9yKHZhciBpPTAsbj0wLGE9W10scz1bXSxvLGw9MCxoPXQubGVuZ3RoO2g+bDtsKyspaWYobz10W2xdLFwiTVwiPT1vWzBdKWk9b1sxXSxuPW9bMl0sYS5wdXNoKGkpLHMucHVzaChuKTtlbHNle3ZhciB1PVp0KGksbixvWzFdLG9bMl0sb1szXSxvWzRdLG9bNV0sb1s2XSk7YT1hW1BdKHUubWluLngsdS5tYXgueCkscz1zW1BdKHUubWluLnksdS5tYXgueSksaT1vWzVdLG49b1s2XX12YXIgYz1HW3pdKDAsYSksZj1HW3pdKDAscykscD1XW3pdKDAsYSksZD1XW3pdKDAscyksZz1wLWMseD1kLWYsdj17eDpjLHk6Zix4MjpwLHkyOmQsd2lkdGg6ZyxoZWlnaHQ6eCxjeDpjK2cvMixjeTpmK3gvMn07cmV0dXJuIGUuYmJveD1yKHYpLHZ9LFl0PWZ1bmN0aW9uKHQpe3ZhciBpPXIodCk7cmV0dXJuIGkudG9TdHJpbmc9ZS5fcGF0aDJzdHJpbmcsaX0sV3Q9ZS5fcGF0aFRvUmVsYXRpdmU9ZnVuY3Rpb24odCl7dmFyIHI9VnQodCk7aWYoci5yZWwpcmV0dXJuIFl0KHIucmVsKTtlLmlzKHQsUSkmJmUuaXModCYmdFswXSxRKXx8KHQ9ZS5wYXJzZVBhdGhTdHJpbmcodCkpO3ZhciBpPVtdLG49MCxhPTAscz0wLG89MCxsPTA7XCJNXCI9PXRbMF1bMF0mJihuPXRbMF1bMV0sYT10WzBdWzJdLHM9bixvPWEsbCsrLGkucHVzaChbXCJNXCIsbixhXSkpO2Zvcih2YXIgaD1sLHU9dC5sZW5ndGg7dT5oO2grKyl7dmFyIGM9aVtoXT1bXSxmPXRbaF07aWYoZlswXSE9Ty5jYWxsKGZbMF0pKXN3aXRjaChjWzBdPU8uY2FsbChmWzBdKSxjWzBdKXtjYXNlXCJhXCI6Y1sxXT1mWzFdLGNbMl09ZlsyXSxjWzNdPWZbM10sY1s0XT1mWzRdLGNbNV09Zls1XSxjWzZdPSsoZls2XS1uKS50b0ZpeGVkKDMpLGNbN109KyhmWzddLWEpLnRvRml4ZWQoMyk7YnJlYWs7Y2FzZVwidlwiOmNbMV09KyhmWzFdLWEpLnRvRml4ZWQoMyk7YnJlYWs7Y2FzZVwibVwiOnM9ZlsxXSxvPWZbMl07ZGVmYXVsdDpmb3IodmFyIHA9MSxkPWYubGVuZ3RoO2Q+cDtwKyspY1twXT0rKGZbcF0tKHAlMj9uOmEpKS50b0ZpeGVkKDMpfWVsc2V7Yz1pW2hdPVtdLFwibVwiPT1mWzBdJiYocz1mWzFdK24sbz1mWzJdK2EpO2Zvcih2YXIgZz0wLHg9Zi5sZW5ndGg7eD5nO2crKylpW2hdW2ddPWZbZ119dmFyIHY9aVtoXS5sZW5ndGg7c3dpdGNoKGlbaF1bMF0pe2Nhc2VcInpcIjpuPXMsYT1vO2JyZWFrO2Nhc2VcImhcIjpuKz0raVtoXVt2LTFdO2JyZWFrO2Nhc2VcInZcIjphKz0raVtoXVt2LTFdO2JyZWFrO2RlZmF1bHQ6bis9K2lbaF1bdi0yXSxhKz0raVtoXVt2LTFdfX1yZXR1cm4gaS50b1N0cmluZz1lLl9wYXRoMnN0cmluZyxyLnJlbD1ZdChpKSxpfSxHdD1lLl9wYXRoVG9BYnNvbHV0ZT1mdW5jdGlvbih0KXt2YXIgcj1WdCh0KTtpZihyLmFicylyZXR1cm4gWXQoci5hYnMpO2lmKGUuaXModCxRKSYmZS5pcyh0JiZ0WzBdLFEpfHwodD1lLnBhcnNlUGF0aFN0cmluZyh0KSksIXR8fCF0Lmxlbmd0aClyZXR1cm5bW1wiTVwiLDAsMF1dO3ZhciBpPVtdLG49MCxhPTAsbz0wLGw9MCxoPTA7XCJNXCI9PXRbMF1bMF0mJihuPSt0WzBdWzFdLGE9K3RbMF1bMl0sbz1uLGw9YSxoKyssaVswXT1bXCJNXCIsbixhXSk7Zm9yKHZhciB1PTM9PXQubGVuZ3RoJiZcIk1cIj09dFswXVswXSYmXCJSXCI9PXRbMV1bMF0udG9VcHBlckNhc2UoKSYmXCJaXCI9PXRbMl1bMF0udG9VcHBlckNhc2UoKSxjLGYscD1oLGQ9dC5sZW5ndGg7ZD5wO3ArKyl7aWYoaS5wdXNoKGM9W10pLGY9dFtwXSxmWzBdIT1jdC5jYWxsKGZbMF0pKXN3aXRjaChjWzBdPWN0LmNhbGwoZlswXSksY1swXSl7Y2FzZVwiQVwiOmNbMV09ZlsxXSxjWzJdPWZbMl0sY1szXT1mWzNdLGNbNF09Zls0XSxjWzVdPWZbNV0sY1s2XT0rKGZbNl0rbiksY1s3XT0rKGZbN10rYSk7YnJlYWs7Y2FzZVwiVlwiOmNbMV09K2ZbMV0rYTticmVhaztjYXNlXCJIXCI6Y1sxXT0rZlsxXStuO2JyZWFrO2Nhc2VcIlJcIjpmb3IodmFyIGc9W24sYV1bUF0oZi5zbGljZSgxKSkseD0yLHY9Zy5sZW5ndGg7dj54O3grKylnW3hdPStnW3hdK24sZ1srK3hdPStnW3hdK2E7aS5wb3AoKSxpPWlbUF0ocyhnLHUpKTticmVhaztjYXNlXCJNXCI6bz0rZlsxXStuLGw9K2ZbMl0rYTtkZWZhdWx0OmZvcih4PTEsdj1mLmxlbmd0aDt2Png7eCsrKWNbeF09K2ZbeF0rKHglMj9uOmEpfWVsc2UgaWYoXCJSXCI9PWZbMF0pZz1bbixhXVtQXShmLnNsaWNlKDEpKSxpLnBvcCgpLGk9aVtQXShzKGcsdSkpLGM9W1wiUlwiXVtQXShmLnNsaWNlKC0yKSk7ZWxzZSBmb3IodmFyIHk9MCxtPWYubGVuZ3RoO20+eTt5KyspY1t5XT1mW3ldO3N3aXRjaChjWzBdKXtjYXNlXCJaXCI6bj1vLGE9bDticmVhaztjYXNlXCJIXCI6bj1jWzFdO2JyZWFrO2Nhc2VcIlZcIjphPWNbMV07YnJlYWs7Y2FzZVwiTVwiOm89Y1tjLmxlbmd0aC0yXSxsPWNbYy5sZW5ndGgtMV07ZGVmYXVsdDpuPWNbYy5sZW5ndGgtMl0sYT1jW2MubGVuZ3RoLTFdfX1yZXR1cm4gaS50b1N0cmluZz1lLl9wYXRoMnN0cmluZyxyLmFicz1ZdChpKSxpfSxIdD1mdW5jdGlvbih0LGUscixpKXtyZXR1cm5bdCxlLHIsaSxyLGldfSxYdD1mdW5jdGlvbih0LGUscixpLG4sYSl7dmFyIHM9MS8zLG89Mi8zO3JldHVybltzKnQrbypyLHMqZStvKmkscypuK28qcixzKmErbyppLG4sYV19LFV0PWZ1bmN0aW9uKHQsZSxyLGksYSxzLG8sbCxoLHUpe3ZhciBjPTEyMCpVLzE4MCxmPVUvMTgwKigrYXx8MCkscD1bXSxkLGc9bihmdW5jdGlvbih0LGUscil7dmFyIGk9dCpZLmNvcyhyKS1lKlkuc2luKHIpLG49dCpZLnNpbihyKStlKlkuY29zKHIpO3JldHVybnt4OmkseTpufX0pO2lmKHUpUz11WzBdLFQ9dVsxXSxCPXVbMl0sQz11WzNdO2Vsc2V7ZD1nKHQsZSwtZiksdD1kLngsZT1kLnksZD1nKGwsaCwtZiksbD1kLngsaD1kLnk7dmFyIHg9WS5jb3MoVS8xODAqYSksdj1ZLnNpbihVLzE4MCphKSx5PSh0LWwpLzIsbT0oZS1oKS8yLGI9eSp5LyhyKnIpK20qbS8oaSppKTtiPjEmJihiPVkuc3FydChiKSxyPWIqcixpPWIqaSk7dmFyIF89cipyLHc9aSppLGs9KHM9PW8/LTE6MSkqWS5zcXJ0KEgoKF8qdy1fKm0qbS13KnkqeSkvKF8qbSptK3cqeSp5KSkpLEI9aypyKm0vaSsodCtsKS8yLEM9ayotaSp5L3IrKGUraCkvMixTPVkuYXNpbigoKGUtQykvaSkudG9GaXhlZCg5KSksVD1ZLmFzaW4oKChoLUMpL2kpLnRvRml4ZWQoOSkpO1M9Qj50P1UtUzpTLFQ9Qj5sP1UtVDpULDA+UyYmKFM9MipVK1MpLDA+VCYmKFQ9MipVK1QpLG8mJlM+VCYmKFMtPTIqVSksIW8mJlQ+UyYmKFQtPTIqVSl9dmFyIEE9VC1TO2lmKEgoQSk+Yyl7dmFyIEU9VCxOPWwsTT1oO1Q9UytjKihvJiZUPlM/MTotMSksbD1CK3IqWS5jb3MoVCksaD1DK2kqWS5zaW4oVCkscD1VdChsLGgscixpLGEsMCxvLE4sTSxbVCxFLEIsQ10pfUE9VC1TO3ZhciBMPVkuY29zKFMpLHo9WS5zaW4oUyksRj1ZLmNvcyhUKSxSPVkuc2luKFQpLEk9WS50YW4oQS80KSxqPTQvMypyKkksRD00LzMqaSpJLFY9W3QsZV0sTz1bdCtqKnosZS1EKkxdLFc9W2wraipSLGgtRCpGXSxHPVtsLGhdO2lmKE9bMF09MipWWzBdLU9bMF0sT1sxXT0yKlZbMV0tT1sxXSx1KXJldHVybltPLFcsR11bUF0ocCk7cD1bTyxXLEddW1BdKHApLmpvaW4oKVtxXShcIixcIik7Zm9yKHZhciBYPVtdLCQ9MCxaPXAubGVuZ3RoO1o+JDskKyspWFskXT0kJTI/ZyhwWyQtMV0scFskXSxmKS55OmcocFskXSxwWyQrMV0sZikueDtyZXR1cm4gWH0sJHQ9ZnVuY3Rpb24odCxlLHIsaSxuLGEscyxvLGwpe3ZhciBoPTEtbDtyZXR1cm57eDpYKGgsMykqdCszKlgoaCwyKSpsKnIrMypoKmwqbCpuK1gobCwzKSpzLHk6WChoLDMpKmUrMypYKGgsMikqbCppKzMqaCpsKmwqYStYKGwsMykqb319LFp0PW4oZnVuY3Rpb24odCxlLHIsaSxuLGEscyxvKXt2YXIgbD1uLTIqcit0LShzLTIqbityKSxoPTIqKHItdCktMioobi1yKSx1PXQtcixjPSgtaCtZLnNxcnQoaCpoLTQqbCp1KSkvMi9sLGY9KC1oLVkuc3FydChoKmgtNCpsKnUpKS8yL2wscD1bZSxvXSxkPVt0LHNdLGc7cmV0dXJuIEgoYyk+XCIxZTEyXCImJihjPS41KSxIKGYpPlwiMWUxMlwiJiYoZj0uNSksYz4wJiYxPmMmJihnPSR0KHQsZSxyLGksbixhLHMsbyxjKSxkLnB1c2goZy54KSxwLnB1c2goZy55KSksZj4wJiYxPmYmJihnPSR0KHQsZSxyLGksbixhLHMsbyxmKSxkLnB1c2goZy54KSxwLnB1c2goZy55KSksbD1hLTIqaStlLShvLTIqYStpKSxoPTIqKGktZSktMiooYS1pKSx1PWUtaSxjPSgtaCtZLnNxcnQoaCpoLTQqbCp1KSkvMi9sLGY9KC1oLVkuc3FydChoKmgtNCpsKnUpKS8yL2wsSChjKT5cIjFlMTJcIiYmKGM9LjUpLEgoZik+XCIxZTEyXCImJihmPS41KSxjPjAmJjE+YyYmKGc9JHQodCxlLHIsaSxuLGEscyxvLGMpLGQucHVzaChnLngpLHAucHVzaChnLnkpKSxmPjAmJjE+ZiYmKGc9JHQodCxlLHIsaSxuLGEscyxvLGYpLGQucHVzaChnLngpLHAucHVzaChnLnkpKSx7bWluOnt4Okdbel0oMCxkKSx5Okdbel0oMCxwKX0sbWF4Ont4Oldbel0oMCxkKSx5Oldbel0oMCxwKX19fSksUXQ9ZS5fcGF0aDJjdXJ2ZT1uKGZ1bmN0aW9uKHQsZSl7dmFyIHI9IWUmJlZ0KHQpO2lmKCFlJiZyLmN1cnZlKXJldHVybiBZdChyLmN1cnZlKTtmb3IodmFyIGk9R3QodCksbj1lJiZHdChlKSxhPXt4OjAseTowLGJ4OjAsYnk6MCxYOjAsWTowLHF4Om51bGwscXk6bnVsbH0scz17eDowLHk6MCxieDowLGJ5OjAsWDowLFk6MCxxeDpudWxsLHF5Om51bGx9LG89KGZ1bmN0aW9uKHQsZSxyKXt2YXIgaSxuLGE9e1Q6MSxROjF9O2lmKCF0KXJldHVybltcIkNcIixlLngsZS55LGUueCxlLnksZS54LGUueV07c3dpdGNoKCEodFswXWluIGEpJiYoZS5xeD1lLnF5PW51bGwpLHRbMF0pe2Nhc2VcIk1cIjplLlg9dFsxXSxlLlk9dFsyXTticmVhaztjYXNlXCJBXCI6dD1bXCJDXCJdW1BdKFV0W3pdKDAsW2UueCxlLnldW1BdKHQuc2xpY2UoMSkpKSk7YnJlYWs7Y2FzZVwiU1wiOlwiQ1wiPT1yfHxcIlNcIj09cj8oaT0yKmUueC1lLmJ4LG49MiplLnktZS5ieSk6KGk9ZS54LG49ZS55KSx0PVtcIkNcIixpLG5dW1BdKHQuc2xpY2UoMSkpO2JyZWFrO2Nhc2VcIlRcIjpcIlFcIj09cnx8XCJUXCI9PXI/KGUucXg9MiplLngtZS5xeCxlLnF5PTIqZS55LWUucXkpOihlLnF4PWUueCxlLnF5PWUueSksdD1bXCJDXCJdW1BdKFh0KGUueCxlLnksZS5xeCxlLnF5LHRbMV0sdFsyXSkpO2JyZWFrO2Nhc2VcIlFcIjplLnF4PXRbMV0sZS5xeT10WzJdLHQ9W1wiQ1wiXVtQXShYdChlLngsZS55LHRbMV0sdFsyXSx0WzNdLHRbNF0pKTticmVhaztjYXNlXCJMXCI6dD1bXCJDXCJdW1BdKEh0KGUueCxlLnksdFsxXSx0WzJdKSk7YnJlYWs7Y2FzZVwiSFwiOnQ9W1wiQ1wiXVtQXShIdChlLngsZS55LHRbMV0sZS55KSk7YnJlYWs7Y2FzZVwiVlwiOnQ9W1wiQ1wiXVtQXShIdChlLngsZS55LGUueCx0WzFdKSk7YnJlYWs7Y2FzZVwiWlwiOnQ9W1wiQ1wiXVtQXShIdChlLngsZS55LGUuWCxlLlkpKX1yZXR1cm4gdH0pLGw9ZnVuY3Rpb24odCxlKXtpZih0W2VdLmxlbmd0aD43KXt0W2VdLnNoaWZ0KCk7Zm9yKHZhciByPXRbZV07ci5sZW5ndGg7KXVbZV09XCJBXCIsbiYmKGNbZV09XCJBXCIpLHQuc3BsaWNlKGUrKywwLFtcIkNcIl1bUF0oci5zcGxpY2UoMCw2KSkpO3Quc3BsaWNlKGUsMSksZz1XKGkubGVuZ3RoLG4mJm4ubGVuZ3RofHwwKX19LGg9ZnVuY3Rpb24odCxlLHIsYSxzKXt0JiZlJiZcIk1cIj09dFtzXVswXSYmXCJNXCIhPWVbc11bMF0mJihlLnNwbGljZShzLDAsW1wiTVwiLGEueCxhLnldKSxyLmJ4PTAsci5ieT0wLHIueD10W3NdWzFdLHIueT10W3NdWzJdLGc9VyhpLmxlbmd0aCxuJiZuLmxlbmd0aHx8MCkpfSx1PVtdLGM9W10sZj1cIlwiLHA9XCJcIixkPTAsZz1XKGkubGVuZ3RoLG4mJm4ubGVuZ3RofHwwKTtnPmQ7ZCsrKXtpW2RdJiYoZj1pW2RdWzBdKSxcIkNcIiE9ZiYmKHVbZF09ZixkJiYocD11W2QtMV0pKSxpW2RdPW8oaVtkXSxhLHApLFwiQVwiIT11W2RdJiZcIkNcIj09ZiYmKHVbZF09XCJDXCIpLGwoaSxkKSxuJiYobltkXSYmKGY9bltkXVswXSksXCJDXCIhPWYmJihjW2RdPWYsZCYmKHA9Y1tkLTFdKSksbltkXT1vKG5bZF0scyxwKSxcIkFcIiE9Y1tkXSYmXCJDXCI9PWYmJihjW2RdPVwiQ1wiKSxsKG4sZCkpLGgoaSxuLGEscyxkKSxoKG4saSxzLGEsZCk7dmFyIHg9aVtkXSx2PW4mJm5bZF0seT14Lmxlbmd0aCxtPW4mJnYubGVuZ3RoO2EueD14W3ktMl0sYS55PXhbeS0xXSxhLmJ4PWh0KHhbeS00XSl8fGEueCxhLmJ5PWh0KHhbeS0zXSl8fGEueSxzLmJ4PW4mJihodCh2W20tNF0pfHxzLngpLHMuYnk9biYmKGh0KHZbbS0zXSl8fHMueSkscy54PW4mJnZbbS0yXSxzLnk9biYmdlttLTFdfXJldHVybiBufHwoci5jdXJ2ZT1ZdChpKSksbj9baSxuXTppfSxudWxsLFl0KSxKdD1lLl9wYXJzZURvdHM9bihmdW5jdGlvbih0KXtmb3IodmFyIHI9W10saT0wLG49dC5sZW5ndGg7bj5pO2krKyl7dmFyIGE9e30scz10W2ldLm1hdGNoKC9eKFteOl0qKTo/KFtcXGRcXC5dKikvKTtpZihhLmNvbG9yPWUuZ2V0UkdCKHNbMV0pLGEuY29sb3IuZXJyb3IpcmV0dXJuIG51bGw7YS5vcGFjaXR5PWEuY29sb3Iub3BhY2l0eSxhLmNvbG9yPWEuY29sb3IuaGV4LHNbMl0mJihhLm9mZnNldD1zWzJdK1wiJVwiKSxyLnB1c2goYSl9Zm9yKGk9MSxuPXIubGVuZ3RoLTE7bj5pO2krKylpZighcltpXS5vZmZzZXQpe2Zvcih2YXIgbz1odChyW2ktMV0ub2Zmc2V0fHwwKSxsPTAsaD1pKzE7bj5oO2grKylpZihyW2hdLm9mZnNldCl7bD1yW2hdLm9mZnNldDticmVha31sfHwobD0xMDAsaD1uKSxsPWh0KGwpO2Zvcih2YXIgdT0obC1vKS8oaC1pKzEpO2g+aTtpKyspbys9dSxyW2ldLm9mZnNldD1vK1wiJVwifXJldHVybiByfSksS3Q9ZS5fdGVhcj1mdW5jdGlvbih0LGUpe3Q9PWUudG9wJiYoZS50b3A9dC5wcmV2KSx0PT1lLmJvdHRvbSYmKGUuYm90dG9tPXQubmV4dCksdC5uZXh0JiYodC5uZXh0LnByZXY9dC5wcmV2KSx0LnByZXYmJih0LnByZXYubmV4dD10Lm5leHQpfSx0ZT1lLl90b2Zyb250PWZ1bmN0aW9uKHQsZSl7ZS50b3AhPT10JiYoS3QodCxlKSx0Lm5leHQ9bnVsbCx0LnByZXY9ZS50b3AsZS50b3AubmV4dD10LGUudG9wPXQpfSxlZT1lLl90b2JhY2s9ZnVuY3Rpb24odCxlKXtlLmJvdHRvbSE9PXQmJihLdCh0LGUpLHQubmV4dD1lLmJvdHRvbSx0LnByZXY9bnVsbCxlLmJvdHRvbS5wcmV2PXQsZS5ib3R0b209dCl9LHJlPWUuX2luc2VydGFmdGVyPWZ1bmN0aW9uKHQsZSxyKXtLdCh0LHIpLGU9PXIudG9wJiYoci50b3A9dCksZS5uZXh0JiYoZS5uZXh0LnByZXY9dCksdC5uZXh0PWUubmV4dCx0LnByZXY9ZSxlLm5leHQ9dH0saWU9ZS5faW5zZXJ0YmVmb3JlPWZ1bmN0aW9uKHQsZSxyKXtLdCh0LHIpLGU9PXIuYm90dG9tJiYoci5ib3R0b209dCksZS5wcmV2JiYoZS5wcmV2Lm5leHQ9dCksdC5wcmV2PWUucHJldixlLnByZXY9dCx0Lm5leHQ9ZX0sbmU9ZS50b01hdHJpeD1mdW5jdGlvbih0LGUpe3ZhciByPU90KHQpLGk9e186e3RyYW5zZm9ybTpSfSxnZXRCQm94OmZ1bmN0aW9uKCl7cmV0dXJuIHJ9fTtyZXR1cm4gc2UoaSxlKSxpLm1hdHJpeH0sYWU9ZS50cmFuc2Zvcm1QYXRoPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE50KHQsbmUodCxlKSl9LHNlPWUuX2V4dHJhY3RUcmFuc2Zvcm09ZnVuY3Rpb24odCxyKXtpZihudWxsPT1yKXJldHVybiB0Ll8udHJhbnNmb3JtO3I9aihyKS5yZXBsYWNlKC9cXC57M318XFx1MjAyNi9nLHQuXy50cmFuc2Zvcm18fFIpO3ZhciBpPWUucGFyc2VUcmFuc2Zvcm1TdHJpbmcociksbj0wLGE9MCxzPTAsbz0xLGw9MSxoPXQuXyx1PW5ldyBnO2lmKGgudHJhbnNmb3JtPWl8fFtdLGkpZm9yKHZhciBjPTAsZj1pLmxlbmd0aDtmPmM7YysrKXt2YXIgcD1pW2NdLGQ9cC5sZW5ndGgseD1qKHBbMF0pLnRvTG93ZXJDYXNlKCksdj1wWzBdIT14LHk9dj91LmludmVydCgpOjAsbSxiLF8sdyxrO1widFwiPT14JiYzPT1kP3Y/KG09eS54KDAsMCksYj15LnkoMCwwKSxfPXkueChwWzFdLHBbMl0pLHc9eS55KHBbMV0scFsyXSksdS50cmFuc2xhdGUoXy1tLHctYikpOnUudHJhbnNsYXRlKHBbMV0scFsyXSk6XCJyXCI9PXg/Mj09ZD8oaz1rfHx0LmdldEJCb3goMSksdS5yb3RhdGUocFsxXSxrLngray53aWR0aC8yLGsueStrLmhlaWdodC8yKSxuKz1wWzFdKTo0PT1kJiYodj8oXz15LngocFsyXSxwWzNdKSx3PXkueShwWzJdLHBbM10pLHUucm90YXRlKHBbMV0sXyx3KSk6dS5yb3RhdGUocFsxXSxwWzJdLHBbM10pLG4rPXBbMV0pOlwic1wiPT14PzI9PWR8fDM9PWQ/KGs9a3x8dC5nZXRCQm94KDEpLHUuc2NhbGUocFsxXSxwW2QtMV0say54K2sud2lkdGgvMixrLnkray5oZWlnaHQvMiksbyo9cFsxXSxsKj1wW2QtMV0pOjU9PWQmJih2PyhfPXkueChwWzNdLHBbNF0pLHc9eS55KHBbM10scFs0XSksdS5zY2FsZShwWzFdLHBbMl0sXyx3KSk6dS5zY2FsZShwWzFdLHBbMl0scFszXSxwWzRdKSxvKj1wWzFdLGwqPXBbMl0pOlwibVwiPT14JiY3PT1kJiZ1LmFkZChwWzFdLHBbMl0scFszXSxwWzRdLHBbNV0scFs2XSksaC5kaXJ0eVQ9MSx0Lm1hdHJpeD11fXQubWF0cml4PXUsaC5zeD1vLGguc3k9bCxoLmRlZz1uLGguZHg9YT11LmUsaC5keT1zPXUuZiwxPT1vJiYxPT1sJiYhbiYmaC5iYm94PyhoLmJib3gueCs9K2EsaC5iYm94LnkrPStzKTpoLmRpcnR5VD0xfSxvZT1mdW5jdGlvbih0KXt2YXIgZT10WzBdO3N3aXRjaChlLnRvTG93ZXJDYXNlKCkpe2Nhc2VcInRcIjpyZXR1cm5bZSwwLDBdO2Nhc2VcIm1cIjpyZXR1cm5bZSwxLDAsMCwxLDAsMF07Y2FzZVwiclwiOnJldHVybiA0PT10Lmxlbmd0aD9bZSwwLHRbMl0sdFszXV06W2UsMF07Y2FzZVwic1wiOnJldHVybiA1PT10Lmxlbmd0aD9bZSwxLDEsdFszXSx0WzRdXTozPT10Lmxlbmd0aD9bZSwxLDFdOltlLDFdfX0sbGU9ZS5fZXF1YWxpc2VUcmFuc2Zvcm09ZnVuY3Rpb24odCxyKXtyPWoocikucmVwbGFjZSgvXFwuezN9fFxcdTIwMjYvZyx0KSx0PWUucGFyc2VUcmFuc2Zvcm1TdHJpbmcodCl8fFtdLHI9ZS5wYXJzZVRyYW5zZm9ybVN0cmluZyhyKXx8W107Zm9yKHZhciBpPVcodC5sZW5ndGgsci5sZW5ndGgpLG49W10sYT1bXSxzPTAsbyxsLGgsdTtpPnM7cysrKXtpZihoPXRbc118fG9lKHJbc10pLHU9cltzXXx8b2UoaCksaFswXSE9dVswXXx8XCJyXCI9PWhbMF0udG9Mb3dlckNhc2UoKSYmKGhbMl0hPXVbMl18fGhbM10hPXVbM10pfHxcInNcIj09aFswXS50b0xvd2VyQ2FzZSgpJiYoaFszXSE9dVszXXx8aFs0XSE9dVs0XSkpcmV0dXJuO2ZvcihuW3NdPVtdLGFbc109W10sbz0wLGw9VyhoLmxlbmd0aCx1Lmxlbmd0aCk7bD5vO28rKylvIGluIGgmJihuW3NdW29dPWhbb10pLG8gaW4gdSYmKGFbc11bb109dVtvXSl9cmV0dXJue2Zyb206bix0bzphfX07ZS5fZ2V0Q29udGFpbmVyPWZ1bmN0aW9uKHQscixpLG4pe3ZhciBhO3JldHVybiBhPW51bGwhPW58fGUuaXModCxcIm9iamVjdFwiKT90OkEuZG9jLmdldEVsZW1lbnRCeUlkKHQpLG51bGwhPWE/YS50YWdOYW1lP251bGw9PXI/e2NvbnRhaW5lcjphLHdpZHRoOmEuc3R5bGUucGl4ZWxXaWR0aHx8YS5vZmZzZXRXaWR0aCxoZWlnaHQ6YS5zdHlsZS5waXhlbEhlaWdodHx8YS5vZmZzZXRIZWlnaHR9Ontjb250YWluZXI6YSx3aWR0aDpyLGhlaWdodDppfTp7Y29udGFpbmVyOjEseDp0LHk6cix3aWR0aDppLGhlaWdodDpufTp2b2lkIDB9LGUucGF0aFRvUmVsYXRpdmU9V3QsZS5fZW5naW5lPXt9LGUucGF0aDJjdXJ2ZT1RdCxlLm1hdHJpeD1mdW5jdGlvbih0LGUscixpLG4sYSl7cmV0dXJuIG5ldyBnKHQsZSxyLGksbixhKX0sZnVuY3Rpb24odCl7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdFswXSp0WzBdK3RbMV0qdFsxXX1mdW5jdGlvbiBpKHQpe3ZhciBlPVkuc3FydChyKHQpKTt0WzBdJiYodFswXS89ZSksdFsxXSYmKHRbMV0vPWUpfXQuYWRkPWZ1bmN0aW9uKHQsZSxyLGksbixhKXt2YXIgcz1bW10sW10sW11dLG89W1t0aGlzLmEsdGhpcy5jLHRoaXMuZV0sW3RoaXMuYix0aGlzLmQsdGhpcy5mXSxbMCwwLDFdXSxsPVtbdCxyLG5dLFtlLGksYV0sWzAsMCwxXV0saCx1LGMsZjtmb3IodCYmdCBpbnN0YW5jZW9mIGcmJihsPVtbdC5hLHQuYyx0LmVdLFt0LmIsdC5kLHQuZl0sWzAsMCwxXV0pLGg9MDszPmg7aCsrKWZvcih1PTA7Mz51O3UrKyl7Zm9yKGY9MCxjPTA7Mz5jO2MrKylmKz1vW2hdW2NdKmxbY11bdV07c1toXVt1XT1mfXRoaXMuYT1zWzBdWzBdLHRoaXMuYj1zWzFdWzBdLHRoaXMuYz1zWzBdWzFdLHRoaXMuZD1zWzFdWzFdLHRoaXMuZT1zWzBdWzJdLHRoaXMuZj1zWzFdWzJdfSx0LmludmVydD1mdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LmEqdC5kLXQuYip0LmM7cmV0dXJuIG5ldyBnKHQuZC9lLC10LmIvZSwtdC5jL2UsdC5hL2UsKHQuYyp0LmYtdC5kKnQuZSkvZSwodC5iKnQuZS10LmEqdC5mKS9lKX0sdC5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBuZXcgZyh0aGlzLmEsdGhpcy5iLHRoaXMuYyx0aGlzLmQsdGhpcy5lLHRoaXMuZil9LHQudHJhbnNsYXRlPWZ1bmN0aW9uKHQsZSl7XG50aGlzLmFkZCgxLDAsMCwxLHQsZSl9LHQuc2NhbGU9ZnVuY3Rpb24odCxlLHIsaSl7bnVsbD09ZSYmKGU9dCksKHJ8fGkpJiZ0aGlzLmFkZCgxLDAsMCwxLHIsaSksdGhpcy5hZGQodCwwLDAsZSwwLDApLChyfHxpKSYmdGhpcy5hZGQoMSwwLDAsMSwtciwtaSl9LHQucm90YXRlPWZ1bmN0aW9uKHQscixpKXt0PWUucmFkKHQpLHI9cnx8MCxpPWl8fDA7dmFyIG49K1kuY29zKHQpLnRvRml4ZWQoOSksYT0rWS5zaW4odCkudG9GaXhlZCg5KTt0aGlzLmFkZChuLGEsLWEsbixyLGkpLHRoaXMuYWRkKDEsMCwwLDEsLXIsLWkpfSx0Lng9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCp0aGlzLmErZSp0aGlzLmMrdGhpcy5lfSx0Lnk9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCp0aGlzLmIrZSp0aGlzLmQrdGhpcy5mfSx0LmdldD1mdW5jdGlvbih0KXtyZXR1cm4rdGhpc1tqLmZyb21DaGFyQ29kZSg5Nyt0KV0udG9GaXhlZCg0KX0sdC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBlLnN2Zz9cIm1hdHJpeChcIitbdGhpcy5nZXQoMCksdGhpcy5nZXQoMSksdGhpcy5nZXQoMiksdGhpcy5nZXQoMyksdGhpcy5nZXQoNCksdGhpcy5nZXQoNSldLmpvaW4oKStcIilcIjpbdGhpcy5nZXQoMCksdGhpcy5nZXQoMiksdGhpcy5nZXQoMSksdGhpcy5nZXQoMyksMCwwXS5qb2luKCl9LHQudG9GaWx0ZXI9ZnVuY3Rpb24oKXtyZXR1cm5cInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5NYXRyaXgoTTExPVwiK3RoaXMuZ2V0KDApK1wiLCBNMTI9XCIrdGhpcy5nZXQoMikrXCIsIE0yMT1cIit0aGlzLmdldCgxKStcIiwgTTIyPVwiK3RoaXMuZ2V0KDMpK1wiLCBEeD1cIit0aGlzLmdldCg0KStcIiwgRHk9XCIrdGhpcy5nZXQoNSkrXCIsIHNpemluZ21ldGhvZD0nYXV0byBleHBhbmQnKVwifSx0Lm9mZnNldD1mdW5jdGlvbigpe3JldHVyblt0aGlzLmUudG9GaXhlZCg0KSx0aGlzLmYudG9GaXhlZCg0KV19LHQuc3BsaXQ9ZnVuY3Rpb24oKXt2YXIgdD17fTt0LmR4PXRoaXMuZSx0LmR5PXRoaXMuZjt2YXIgbj1bW3RoaXMuYSx0aGlzLmNdLFt0aGlzLmIsdGhpcy5kXV07dC5zY2FsZXg9WS5zcXJ0KHIoblswXSkpLGkoblswXSksdC5zaGVhcj1uWzBdWzBdKm5bMV1bMF0rblswXVsxXSpuWzFdWzFdLG5bMV09W25bMV1bMF0tblswXVswXSp0LnNoZWFyLG5bMV1bMV0tblswXVsxXSp0LnNoZWFyXSx0LnNjYWxleT1ZLnNxcnQocihuWzFdKSksaShuWzFdKSx0LnNoZWFyLz10LnNjYWxleTt2YXIgYT0tblswXVsxXSxzPW5bMV1bMV07cmV0dXJuIDA+cz8odC5yb3RhdGU9ZS5kZWcoWS5hY29zKHMpKSwwPmEmJih0LnJvdGF0ZT0zNjAtdC5yb3RhdGUpKTp0LnJvdGF0ZT1lLmRlZyhZLmFzaW4oYSkpLHQuaXNTaW1wbGU9ISgrdC5zaGVhci50b0ZpeGVkKDkpfHx0LnNjYWxleC50b0ZpeGVkKDkpIT10LnNjYWxleS50b0ZpeGVkKDkpJiZ0LnJvdGF0ZSksdC5pc1N1cGVyU2ltcGxlPSErdC5zaGVhci50b0ZpeGVkKDkpJiZ0LnNjYWxleC50b0ZpeGVkKDkpPT10LnNjYWxleS50b0ZpeGVkKDkpJiYhdC5yb3RhdGUsdC5ub1JvdGF0aW9uPSErdC5zaGVhci50b0ZpeGVkKDkpJiYhdC5yb3RhdGUsdH0sdC50b1RyYW5zZm9ybVN0cmluZz1mdW5jdGlvbih0KXt2YXIgZT10fHx0aGlzW3FdKCk7cmV0dXJuIGUuaXNTaW1wbGU/KGUuc2NhbGV4PStlLnNjYWxleC50b0ZpeGVkKDQpLGUuc2NhbGV5PStlLnNjYWxleS50b0ZpeGVkKDQpLGUucm90YXRlPStlLnJvdGF0ZS50b0ZpeGVkKDQpLChlLmR4fHxlLmR5P1widFwiK1tlLmR4LGUuZHldOlIpKygxIT1lLnNjYWxleHx8MSE9ZS5zY2FsZXk/XCJzXCIrW2Uuc2NhbGV4LGUuc2NhbGV5LDAsMF06UikrKGUucm90YXRlP1wiclwiK1tlLnJvdGF0ZSwwLDBdOlIpKTpcIm1cIitbdGhpcy5nZXQoMCksdGhpcy5nZXQoMSksdGhpcy5nZXQoMiksdGhpcy5nZXQoMyksdGhpcy5nZXQoNCksdGhpcy5nZXQoNSldfX0oZy5wcm90b3R5cGUpO2Zvcih2YXIgaGU9ZnVuY3Rpb24oKXt0aGlzLnJldHVyblZhbHVlPSExfSx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKX0sY2U9ZnVuY3Rpb24oKXt0aGlzLmNhbmNlbEJ1YmJsZT0hMH0sZmU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vcmlnaW5hbEV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfSxwZT1mdW5jdGlvbih0KXt2YXIgZT1BLmRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxBLmRvYy5ib2R5LnNjcm9sbFRvcCxyPUEuZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0fHxBLmRvYy5ib2R5LnNjcm9sbExlZnQ7cmV0dXJue3g6dC5jbGllbnRYK3IseTp0LmNsaWVudFkrZX19LGRlPWZ1bmN0aW9uKCl7cmV0dXJuIEEuZG9jLmFkZEV2ZW50TGlzdGVuZXI/ZnVuY3Rpb24odCxlLHIsaSl7dmFyIG49ZnVuY3Rpb24odCl7dmFyIGU9cGUodCk7cmV0dXJuIHIuY2FsbChpLHQsZS54LGUueSl9O2lmKHQuYWRkRXZlbnRMaXN0ZW5lcihlLG4sITEpLEYmJlZbZV0pe3ZhciBhPWZ1bmN0aW9uKGUpe2Zvcih2YXIgbj1wZShlKSxhPWUscz0wLG89ZS50YXJnZXRUb3VjaGVzJiZlLnRhcmdldFRvdWNoZXMubGVuZ3RoO28+cztzKyspaWYoZS50YXJnZXRUb3VjaGVzW3NdLnRhcmdldD09dCl7ZT1lLnRhcmdldFRvdWNoZXNbc10sZS5vcmlnaW5hbEV2ZW50PWEsZS5wcmV2ZW50RGVmYXVsdD11ZSxlLnN0b3BQcm9wYWdhdGlvbj1mZTticmVha31yZXR1cm4gci5jYWxsKGksZSxuLngsbi55KX07dC5hZGRFdmVudExpc3RlbmVyKFZbZV0sYSwhMSl9cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLG4sITEpLEYmJlZbZV0mJnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihWW2VdLGEsITEpLCEwfX06QS5kb2MuYXR0YWNoRXZlbnQ/ZnVuY3Rpb24odCxlLHIsaSl7dmFyIG49ZnVuY3Rpb24odCl7dD10fHxBLndpbi5ldmVudDt2YXIgZT1BLmRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxBLmRvYy5ib2R5LnNjcm9sbFRvcCxuPUEuZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0fHxBLmRvYy5ib2R5LnNjcm9sbExlZnQsYT10LmNsaWVudFgrbixzPXQuY2xpZW50WStlO3JldHVybiB0LnByZXZlbnREZWZhdWx0PXQucHJldmVudERlZmF1bHR8fGhlLHQuc3RvcFByb3BhZ2F0aW9uPXQuc3RvcFByb3BhZ2F0aW9ufHxjZSxyLmNhbGwoaSx0LGEscyl9O3QuYXR0YWNoRXZlbnQoXCJvblwiK2Usbik7dmFyIGE9ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZXRhY2hFdmVudChcIm9uXCIrZSxuKSwhMH07cmV0dXJuIGF9OnZvaWQgMH0oKSxnZT1bXSx4ZT1mdW5jdGlvbihlKXtmb3IodmFyIHI9ZS5jbGllbnRYLGk9ZS5jbGllbnRZLG49QS5kb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8QS5kb2MuYm9keS5zY3JvbGxUb3AsYT1BLmRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdHx8QS5kb2MuYm9keS5zY3JvbGxMZWZ0LHMsbz1nZS5sZW5ndGg7by0tOyl7aWYocz1nZVtvXSxGJiZlLnRvdWNoZXMpe2Zvcih2YXIgbD1lLnRvdWNoZXMubGVuZ3RoLGg7bC0tOylpZihoPWUudG91Y2hlc1tsXSxoLmlkZW50aWZpZXI9PXMuZWwuX2RyYWcuaWQpe3I9aC5jbGllbnRYLGk9aC5jbGllbnRZLChlLm9yaWdpbmFsRXZlbnQ/ZS5vcmlnaW5hbEV2ZW50OmUpLnByZXZlbnREZWZhdWx0KCk7YnJlYWt9fWVsc2UgZS5wcmV2ZW50RGVmYXVsdCgpO3ZhciB1PXMuZWwubm9kZSxjLGY9dS5uZXh0U2libGluZyxwPXUucGFyZW50Tm9kZSxkPXUuc3R5bGUuZGlzcGxheTtBLndpbi5vcGVyYSYmcC5yZW1vdmVDaGlsZCh1KSx1LnN0eWxlLmRpc3BsYXk9XCJub25lXCIsYz1zLmVsLnBhcGVyLmdldEVsZW1lbnRCeVBvaW50KHIsaSksdS5zdHlsZS5kaXNwbGF5PWQsQS53aW4ub3BlcmEmJihmP3AuaW5zZXJ0QmVmb3JlKHUsZik6cC5hcHBlbmRDaGlsZCh1KSksYyYmdChcInJhcGhhZWwuZHJhZy5vdmVyLlwiK3MuZWwuaWQscy5lbCxjKSxyKz1hLGkrPW4sdChcInJhcGhhZWwuZHJhZy5tb3ZlLlwiK3MuZWwuaWQscy5tb3ZlX3Njb3BlfHxzLmVsLHItcy5lbC5fZHJhZy54LGktcy5lbC5fZHJhZy55LHIsaSxlKX19LHZlPWZ1bmN0aW9uKHIpe2UudW5tb3VzZW1vdmUoeGUpLnVubW91c2V1cCh2ZSk7Zm9yKHZhciBpPWdlLmxlbmd0aCxuO2ktLTspbj1nZVtpXSxuLmVsLl9kcmFnPXt9LHQoXCJyYXBoYWVsLmRyYWcuZW5kLlwiK24uZWwuaWQsbi5lbmRfc2NvcGV8fG4uc3RhcnRfc2NvcGV8fG4ubW92ZV9zY29wZXx8bi5lbCxyKTtnZT1bXX0seWU9ZS5lbD17fSxtZT1ELmxlbmd0aDttZS0tOykhZnVuY3Rpb24odCl7ZVt0XT15ZVt0XT1mdW5jdGlvbihyLGkpe3JldHVybiBlLmlzKHIsXCJmdW5jdGlvblwiKSYmKHRoaXMuZXZlbnRzPXRoaXMuZXZlbnRzfHxbXSx0aGlzLmV2ZW50cy5wdXNoKHtuYW1lOnQsZjpyLHVuYmluZDpkZSh0aGlzLnNoYXBlfHx0aGlzLm5vZGV8fEEuZG9jLHQscixpfHx0aGlzKX0pKSx0aGlzfSxlW1widW5cIit0XT15ZVtcInVuXCIrdF09ZnVuY3Rpb24ocil7Zm9yKHZhciBpPXRoaXMuZXZlbnRzfHxbXSxuPWkubGVuZ3RoO24tLTspaVtuXS5uYW1lIT10fHwhZS5pcyhyLFwidW5kZWZpbmVkXCIpJiZpW25dLmYhPXJ8fChpW25dLnVuYmluZCgpLGkuc3BsaWNlKG4sMSksIWkubGVuZ3RoJiZkZWxldGUgdGhpcy5ldmVudHMpO3JldHVybiB0aGlzfX0oRFttZV0pO3llLmRhdGE9ZnVuY3Rpb24ocixpKXt2YXIgbj13dFt0aGlzLmlkXT13dFt0aGlzLmlkXXx8e307aWYoMD09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gbjtpZigxPT1hcmd1bWVudHMubGVuZ3RoKXtpZihlLmlzKHIsXCJvYmplY3RcIikpe2Zvcih2YXIgYSBpbiByKXJbVF0oYSkmJnRoaXMuZGF0YShhLHJbYV0pO3JldHVybiB0aGlzfXJldHVybiB0KFwicmFwaGFlbC5kYXRhLmdldC5cIit0aGlzLmlkLHRoaXMsbltyXSxyKSxuW3JdfXJldHVybiBuW3JdPWksdChcInJhcGhhZWwuZGF0YS5zZXQuXCIrdGhpcy5pZCx0aGlzLGksciksdGhpc30seWUucmVtb3ZlRGF0YT1mdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dD93dFt0aGlzLmlkXT17fTp3dFt0aGlzLmlkXSYmZGVsZXRlIHd0W3RoaXMuaWRdW3RdLHRoaXN9LHllLmdldERhdGE9ZnVuY3Rpb24oKXtyZXR1cm4gcih3dFt0aGlzLmlkXXx8e30pfSx5ZS5ob3Zlcj1mdW5jdGlvbih0LGUscixpKXtyZXR1cm4gdGhpcy5tb3VzZW92ZXIodCxyKS5tb3VzZW91dChlLGl8fHIpfSx5ZS51bmhvdmVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMudW5tb3VzZW92ZXIodCkudW5tb3VzZW91dChlKX07dmFyIGJlPVtdO3llLmRyYWc9ZnVuY3Rpb24ocixpLG4sYSxzLG8pe2Z1bmN0aW9uIGwobCl7KGwub3JpZ2luYWxFdmVudHx8bCkucHJldmVudERlZmF1bHQoKTt2YXIgaD1sLmNsaWVudFgsdT1sLmNsaWVudFksYz1BLmRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxBLmRvYy5ib2R5LnNjcm9sbFRvcCxmPUEuZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0fHxBLmRvYy5ib2R5LnNjcm9sbExlZnQ7aWYodGhpcy5fZHJhZy5pZD1sLmlkZW50aWZpZXIsRiYmbC50b3VjaGVzKWZvcih2YXIgcD1sLnRvdWNoZXMubGVuZ3RoLGQ7cC0tOylpZihkPWwudG91Y2hlc1twXSx0aGlzLl9kcmFnLmlkPWQuaWRlbnRpZmllcixkLmlkZW50aWZpZXI9PXRoaXMuX2RyYWcuaWQpe2g9ZC5jbGllbnRYLHU9ZC5jbGllbnRZO2JyZWFrfXRoaXMuX2RyYWcueD1oK2YsdGhpcy5fZHJhZy55PXUrYywhZ2UubGVuZ3RoJiZlLm1vdXNlbW92ZSh4ZSkubW91c2V1cCh2ZSksZ2UucHVzaCh7ZWw6dGhpcyxtb3ZlX3Njb3BlOmEsc3RhcnRfc2NvcGU6cyxlbmRfc2NvcGU6b30pLGkmJnQub24oXCJyYXBoYWVsLmRyYWcuc3RhcnQuXCIrdGhpcy5pZCxpKSxyJiZ0Lm9uKFwicmFwaGFlbC5kcmFnLm1vdmUuXCIrdGhpcy5pZCxyKSxuJiZ0Lm9uKFwicmFwaGFlbC5kcmFnLmVuZC5cIit0aGlzLmlkLG4pLHQoXCJyYXBoYWVsLmRyYWcuc3RhcnQuXCIrdGhpcy5pZCxzfHxhfHx0aGlzLGwuY2xpZW50WCtmLGwuY2xpZW50WStjLGwpfXJldHVybiB0aGlzLl9kcmFnPXt9LGJlLnB1c2goe2VsOnRoaXMsc3RhcnQ6bH0pLHRoaXMubW91c2Vkb3duKGwpLHRoaXN9LHllLm9uRHJhZ092ZXI9ZnVuY3Rpb24oZSl7ZT90Lm9uKFwicmFwaGFlbC5kcmFnLm92ZXIuXCIrdGhpcy5pZCxlKTp0LnVuYmluZChcInJhcGhhZWwuZHJhZy5vdmVyLlwiK3RoaXMuaWQpfSx5ZS51bmRyYWc9ZnVuY3Rpb24oKXtmb3IodmFyIHI9YmUubGVuZ3RoO3ItLTspYmVbcl0uZWw9PXRoaXMmJih0aGlzLnVubW91c2Vkb3duKGJlW3JdLnN0YXJ0KSxiZS5zcGxpY2UociwxKSx0LnVuYmluZChcInJhcGhhZWwuZHJhZy4qLlwiK3RoaXMuaWQpKTshYmUubGVuZ3RoJiZlLnVubW91c2Vtb3ZlKHhlKS51bm1vdXNldXAodmUpLGdlPVtdfSxNLmNpcmNsZT1mdW5jdGlvbih0LHIsaSl7dmFyIG49ZS5fZW5naW5lLmNpcmNsZSh0aGlzLHR8fDAscnx8MCxpfHwwKTtyZXR1cm4gdGhpcy5fX3NldF9fJiZ0aGlzLl9fc2V0X18ucHVzaChuKSxufSxNLnJlY3Q9ZnVuY3Rpb24odCxyLGksbixhKXt2YXIgcz1lLl9lbmdpbmUucmVjdCh0aGlzLHR8fDAscnx8MCxpfHwwLG58fDAsYXx8MCk7cmV0dXJuIHRoaXMuX19zZXRfXyYmdGhpcy5fX3NldF9fLnB1c2gocyksc30sTS5lbGxpcHNlPWZ1bmN0aW9uKHQscixpLG4pe3ZhciBhPWUuX2VuZ2luZS5lbGxpcHNlKHRoaXMsdHx8MCxyfHwwLGl8fDAsbnx8MCk7cmV0dXJuIHRoaXMuX19zZXRfXyYmdGhpcy5fX3NldF9fLnB1c2goYSksYX0sTS5wYXRoPWZ1bmN0aW9uKHQpe3QmJiFlLmlzKHQsWikmJiFlLmlzKHRbMF0sUSkmJih0Kz1SKTt2YXIgcj1lLl9lbmdpbmUucGF0aChlLmZvcm1hdFt6XShlLGFyZ3VtZW50cyksdGhpcyk7cmV0dXJuIHRoaXMuX19zZXRfXyYmdGhpcy5fX3NldF9fLnB1c2gocikscn0sTS5pbWFnZT1mdW5jdGlvbih0LHIsaSxuLGEpe3ZhciBzPWUuX2VuZ2luZS5pbWFnZSh0aGlzLHR8fFwiYWJvdXQ6YmxhbmtcIixyfHwwLGl8fDAsbnx8MCxhfHwwKTtyZXR1cm4gdGhpcy5fX3NldF9fJiZ0aGlzLl9fc2V0X18ucHVzaChzKSxzfSxNLnRleHQ9ZnVuY3Rpb24odCxyLGkpe3ZhciBuPWUuX2VuZ2luZS50ZXh0KHRoaXMsdHx8MCxyfHwwLGooaSkpO3JldHVybiB0aGlzLl9fc2V0X18mJnRoaXMuX19zZXRfXy5wdXNoKG4pLG59LE0uc2V0PWZ1bmN0aW9uKHQpeyFlLmlzKHQsXCJhcnJheVwiKSYmKHQ9QXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGFyZ3VtZW50cywwLGFyZ3VtZW50cy5sZW5ndGgpKTt2YXIgcj1uZXcgemUodCk7cmV0dXJuIHRoaXMuX19zZXRfXyYmdGhpcy5fX3NldF9fLnB1c2gociksci5wYXBlcj10aGlzLHIudHlwZT1cInNldFwiLHJ9LE0uc2V0U3RhcnQ9ZnVuY3Rpb24odCl7dGhpcy5fX3NldF9fPXR8fHRoaXMuc2V0KCl9LE0uc2V0RmluaXNoPWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX19zZXRfXztyZXR1cm4gZGVsZXRlIHRoaXMuX19zZXRfXyxlfSxNLmdldFNpemU9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmNhbnZhcy5wYXJlbnROb2RlO3JldHVybnt3aWR0aDp0Lm9mZnNldFdpZHRoLGhlaWdodDp0Lm9mZnNldEhlaWdodH19LE0uc2V0U2l6ZT1mdW5jdGlvbih0LHIpe3JldHVybiBlLl9lbmdpbmUuc2V0U2l6ZS5jYWxsKHRoaXMsdCxyKX0sTS5zZXRWaWV3Qm94PWZ1bmN0aW9uKHQscixpLG4sYSl7cmV0dXJuIGUuX2VuZ2luZS5zZXRWaWV3Qm94LmNhbGwodGhpcyx0LHIsaSxuLGEpfSxNLnRvcD1NLmJvdHRvbT1udWxsLE0ucmFwaGFlbD1lO3ZhciBfZT1mdW5jdGlvbih0KXt2YXIgZT10LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHI9dC5vd25lckRvY3VtZW50LGk9ci5ib2R5LG49ci5kb2N1bWVudEVsZW1lbnQsYT1uLmNsaWVudFRvcHx8aS5jbGllbnRUb3B8fDAscz1uLmNsaWVudExlZnR8fGkuY2xpZW50TGVmdHx8MCxvPWUudG9wKyhBLndpbi5wYWdlWU9mZnNldHx8bi5zY3JvbGxUb3B8fGkuc2Nyb2xsVG9wKS1hLGw9ZS5sZWZ0KyhBLndpbi5wYWdlWE9mZnNldHx8bi5zY3JvbGxMZWZ0fHxpLnNjcm9sbExlZnQpLXM7cmV0dXJue3k6byx4Omx9fTtNLmdldEVsZW1lbnRCeVBvaW50PWZ1bmN0aW9uKHQsZSl7dmFyIHI9dGhpcyxpPXIuY2FudmFzLG49QS5kb2MuZWxlbWVudEZyb21Qb2ludCh0LGUpO2lmKEEud2luLm9wZXJhJiZcInN2Z1wiPT1uLnRhZ05hbWUpe3ZhciBhPV9lKGkpLHM9aS5jcmVhdGVTVkdSZWN0KCk7cy54PXQtYS54LHMueT1lLWEueSxzLndpZHRoPXMuaGVpZ2h0PTE7dmFyIG89aS5nZXRJbnRlcnNlY3Rpb25MaXN0KHMsbnVsbCk7by5sZW5ndGgmJihuPW9bby5sZW5ndGgtMV0pfWlmKCFuKXJldHVybiBudWxsO2Zvcig7bi5wYXJlbnROb2RlJiZuIT1pLnBhcmVudE5vZGUmJiFuLnJhcGhhZWw7KW49bi5wYXJlbnROb2RlO3JldHVybiBuPT1yLmNhbnZhcy5wYXJlbnROb2RlJiYobj1pKSxuPW4mJm4ucmFwaGFlbD9yLmdldEJ5SWQobi5yYXBoYWVsaWQpOm51bGx9LE0uZ2V0RWxlbWVudHNCeUJCb3g9ZnVuY3Rpb24odCl7dmFyIHI9dGhpcy5zZXQoKTtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGkpe2UuaXNCQm94SW50ZXJzZWN0KGkuZ2V0QkJveCgpLHQpJiZyLnB1c2goaSl9KSxyfSxNLmdldEJ5SWQ9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXRoaXMuYm90dG9tO2U7KXtpZihlLmlkPT10KXJldHVybiBlO2U9ZS5uZXh0fXJldHVybiBudWxsfSxNLmZvckVhY2g9ZnVuY3Rpb24odCxlKXtmb3IodmFyIHI9dGhpcy5ib3R0b207cjspe2lmKHQuY2FsbChlLHIpPT09ITEpcmV0dXJuIHRoaXM7cj1yLm5leHR9cmV0dXJuIHRoaXN9LE0uZ2V0RWxlbWVudHNCeVBvaW50PWZ1bmN0aW9uKHQsZSl7dmFyIHI9dGhpcy5zZXQoKTtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGkpe2kuaXNQb2ludEluc2lkZSh0LGUpJiZyLnB1c2goaSl9KSxyfSx5ZS5pc1BvaW50SW5zaWRlPWZ1bmN0aW9uKHQscil7dmFyIGk9dGhpcy5yZWFsUGF0aD1FdFt0aGlzLnR5cGVdKHRoaXMpO3JldHVybiB0aGlzLmF0dHIoXCJ0cmFuc2Zvcm1cIikmJnRoaXMuYXR0cihcInRyYW5zZm9ybVwiKS5sZW5ndGgmJihpPWUudHJhbnNmb3JtUGF0aChpLHRoaXMuYXR0cihcInRyYW5zZm9ybVwiKSkpLGUuaXNQb2ludEluc2lkZVBhdGgoaSx0LHIpfSx5ZS5nZXRCQm94PWZ1bmN0aW9uKHQpe2lmKHRoaXMucmVtb3ZlZClyZXR1cm57fTt2YXIgZT10aGlzLl87cmV0dXJuIHQ/KCFlLmRpcnR5JiZlLmJib3h3dHx8KHRoaXMucmVhbFBhdGg9RXRbdGhpcy50eXBlXSh0aGlzKSxlLmJib3h3dD1PdCh0aGlzLnJlYWxQYXRoKSxlLmJib3h3dC50b1N0cmluZz12LGUuZGlydHk9MCksZS5iYm94d3QpOigoZS5kaXJ0eXx8ZS5kaXJ0eVR8fCFlLmJib3gpJiYoIWUuZGlydHkmJnRoaXMucmVhbFBhdGh8fChlLmJib3h3dD0wLHRoaXMucmVhbFBhdGg9RXRbdGhpcy50eXBlXSh0aGlzKSksZS5iYm94PU90KE50KHRoaXMucmVhbFBhdGgsdGhpcy5tYXRyaXgpKSxlLmJib3gudG9TdHJpbmc9dixlLmRpcnR5PWUuZGlydHlUPTApLGUuYmJveCl9LHllLmNsb25lPWZ1bmN0aW9uKCl7aWYodGhpcy5yZW1vdmVkKXJldHVybiBudWxsO3ZhciB0PXRoaXMucGFwZXJbdGhpcy50eXBlXSgpLmF0dHIodGhpcy5hdHRyKCkpO3JldHVybiB0aGlzLl9fc2V0X18mJnRoaXMuX19zZXRfXy5wdXNoKHQpLHR9LHllLmdsb3c9ZnVuY3Rpb24odCl7aWYoXCJ0ZXh0XCI9PXRoaXMudHlwZSlyZXR1cm4gbnVsbDt0PXR8fHt9O3ZhciBlPXt3aWR0aDoodC53aWR0aHx8MTApKygrdGhpcy5hdHRyKFwic3Ryb2tlLXdpZHRoXCIpfHwxKSxmaWxsOnQuZmlsbHx8ITEsb3BhY2l0eTpudWxsPT10Lm9wYWNpdHk/LjU6dC5vcGFjaXR5LG9mZnNldHg6dC5vZmZzZXR4fHwwLG9mZnNldHk6dC5vZmZzZXR5fHwwLGNvbG9yOnQuY29sb3J8fFwiIzAwMFwifSxyPWUud2lkdGgvMixpPXRoaXMucGFwZXIsbj1pLnNldCgpLGE9dGhpcy5yZWFsUGF0aHx8RXRbdGhpcy50eXBlXSh0aGlzKTthPXRoaXMubWF0cml4P050KGEsdGhpcy5tYXRyaXgpOmE7Zm9yKHZhciBzPTE7cisxPnM7cysrKW4ucHVzaChpLnBhdGgoYSkuYXR0cih7c3Ryb2tlOmUuY29sb3IsZmlsbDplLmZpbGw/ZS5jb2xvcjpcIm5vbmVcIixcInN0cm9rZS1saW5lam9pblwiOlwicm91bmRcIixcInN0cm9rZS1saW5lY2FwXCI6XCJyb3VuZFwiLFwic3Ryb2tlLXdpZHRoXCI6KyhlLndpZHRoL3IqcykudG9GaXhlZCgzKSxvcGFjaXR5OisoZS5vcGFjaXR5L3IpLnRvRml4ZWQoMyl9KSk7cmV0dXJuIG4uaW5zZXJ0QmVmb3JlKHRoaXMpLnRyYW5zbGF0ZShlLm9mZnNldHgsZS5vZmZzZXR5KX07dmFyIHdlPXt9LGtlPWZ1bmN0aW9uKHQscixpLG4sYSxzLG8sdSxjKXtyZXR1cm4gbnVsbD09Yz9sKHQscixpLG4sYSxzLG8sdSk6ZS5maW5kRG90c0F0U2VnbWVudCh0LHIsaSxuLGEscyxvLHUsaCh0LHIsaSxuLGEscyxvLHUsYykpfSxCZT1mdW5jdGlvbih0LHIpe3JldHVybiBmdW5jdGlvbihpLG4sYSl7aT1RdChpKTtmb3IodmFyIHMsbyxsLGgsdT1cIlwiLGM9e30sZixwPTAsZD0wLGc9aS5sZW5ndGg7Zz5kO2QrKyl7aWYobD1pW2RdLFwiTVwiPT1sWzBdKXM9K2xbMV0sbz0rbFsyXTtlbHNle2lmKGg9a2UocyxvLGxbMV0sbFsyXSxsWzNdLGxbNF0sbFs1XSxsWzZdKSxwK2g+bil7aWYociYmIWMuc3RhcnQpe2lmKGY9a2UocyxvLGxbMV0sbFsyXSxsWzNdLGxbNF0sbFs1XSxsWzZdLG4tcCksdSs9W1wiQ1wiK2Yuc3RhcnQueCxmLnN0YXJ0LnksZi5tLngsZi5tLnksZi54LGYueV0sYSlyZXR1cm4gdTtjLnN0YXJ0PXUsdT1bXCJNXCIrZi54LGYueStcIkNcIitmLm4ueCxmLm4ueSxmLmVuZC54LGYuZW5kLnksbFs1XSxsWzZdXS5qb2luKCkscCs9aCxzPStsWzVdLG89K2xbNl07Y29udGludWV9aWYoIXQmJiFyKXJldHVybiBmPWtlKHMsbyxsWzFdLGxbMl0sbFszXSxsWzRdLGxbNV0sbFs2XSxuLXApLHt4OmYueCx5OmYueSxhbHBoYTpmLmFscGhhfX1wKz1oLHM9K2xbNV0sbz0rbFs2XX11Kz1sLnNoaWZ0KCkrbH1yZXR1cm4gYy5lbmQ9dSxmPXQ/cDpyP2M6ZS5maW5kRG90c0F0U2VnbWVudChzLG8sbFswXSxsWzFdLGxbMl0sbFszXSxsWzRdLGxbNV0sMSksZi5hbHBoYSYmKGY9e3g6Zi54LHk6Zi55LGFscGhhOmYuYWxwaGF9KSxmfX0sQ2U9QmUoMSksU2U9QmUoKSxUZT1CZSgwLDEpO2UuZ2V0VG90YWxMZW5ndGg9Q2UsZS5nZXRQb2ludEF0TGVuZ3RoPVNlLGUuZ2V0U3VicGF0aD1mdW5jdGlvbih0LGUscil7aWYodGhpcy5nZXRUb3RhbExlbmd0aCh0KS1yPDFlLTYpcmV0dXJuIFRlKHQsZSkuZW5kO3ZhciBpPVRlKHQsciwxKTtyZXR1cm4gZT9UZShpLGUpLmVuZDppfSx5ZS5nZXRUb3RhbExlbmd0aD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuZ2V0UGF0aCgpO2lmKHQpcmV0dXJuIHRoaXMubm9kZS5nZXRUb3RhbExlbmd0aD90aGlzLm5vZGUuZ2V0VG90YWxMZW5ndGgoKTpDZSh0KX0seWUuZ2V0UG9pbnRBdExlbmd0aD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldFBhdGgoKTtpZihlKXJldHVybiBTZShlLHQpfSx5ZS5nZXRQYXRoPWZ1bmN0aW9uKCl7dmFyIHQscj1lLl9nZXRQYXRoW3RoaXMudHlwZV07aWYoXCJ0ZXh0XCIhPXRoaXMudHlwZSYmXCJzZXRcIiE9dGhpcy50eXBlKXJldHVybiByJiYodD1yKHRoaXMpKSx0fSx5ZS5nZXRTdWJwYXRoPWZ1bmN0aW9uKHQscil7dmFyIGk9dGhpcy5nZXRQYXRoKCk7aWYoaSlyZXR1cm4gZS5nZXRTdWJwYXRoKGksdCxyKX07dmFyIEFlPWUuZWFzaW5nX2Zvcm11bGFzPXtsaW5lYXI6ZnVuY3Rpb24odCl7cmV0dXJuIHR9LFwiPFwiOmZ1bmN0aW9uKHQpe3JldHVybiBYKHQsMS43KX0sXCI+XCI6ZnVuY3Rpb24odCl7cmV0dXJuIFgodCwuNDgpfSxcIjw+XCI6ZnVuY3Rpb24odCl7dmFyIGU9LjQ4LXQvMS4wNCxyPVkuc3FydCguMTczNCtlKmUpLGk9ci1lLG49WChIKGkpLDEvMykqKDA+aT8tMToxKSxhPS1yLWUscz1YKEgoYSksMS8zKSooMD5hPy0xOjEpLG89bitzKy41O3JldHVybiAzKigxLW8pKm8qbytvKm8qb30sYmFja0luOmZ1bmN0aW9uKHQpe3ZhciBlPTEuNzAxNTg7cmV0dXJuIHQqdCooKGUrMSkqdC1lKX0sYmFja091dDpmdW5jdGlvbih0KXt0LT0xO3ZhciBlPTEuNzAxNTg7cmV0dXJuIHQqdCooKGUrMSkqdCtlKSsxfSxlbGFzdGljOmZ1bmN0aW9uKHQpe3JldHVybiB0PT0hIXQ/dDpYKDIsLTEwKnQpKlkuc2luKCh0LS4wNzUpKigyKlUpLy4zKSsxfSxib3VuY2U6ZnVuY3Rpb24odCl7dmFyIGU9Ny41NjI1LHI9Mi43NSxpO3JldHVybiAxL3I+dD9pPWUqdCp0OjIvcj50Pyh0LT0xLjUvcixpPWUqdCp0Ky43NSk6Mi41L3I+dD8odC09Mi4yNS9yLGk9ZSp0KnQrLjkzNzUpOih0LT0yLjYyNS9yLGk9ZSp0KnQrLjk4NDM3NSksaX19O0FlLmVhc2VJbj1BZVtcImVhc2UtaW5cIl09QWVbXCI8XCJdLEFlLmVhc2VPdXQ9QWVbXCJlYXNlLW91dFwiXT1BZVtcIj5cIl0sQWUuZWFzZUluT3V0PUFlW1wiZWFzZS1pbi1vdXRcIl09QWVbXCI8PlwiXSxBZVtcImJhY2staW5cIl09QWUuYmFja0luLEFlW1wiYmFjay1vdXRcIl09QWUuYmFja091dDt2YXIgRWU9W10sTmU9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24odCl7c2V0VGltZW91dCh0LDE2KX0sTWU9ZnVuY3Rpb24oKXtmb3IodmFyIHI9K25ldyBEYXRlLGk9MDtpPEVlLmxlbmd0aDtpKyspe3ZhciBuPUVlW2ldO2lmKCFuLmVsLnJlbW92ZWQmJiFuLnBhdXNlZCl7dmFyIGE9ci1uLnN0YXJ0LHM9bi5tcyxvPW4uZWFzaW5nLGw9bi5mcm9tLGg9bi5kaWZmLHU9bi50byxjPW4udCxmPW4uZWwscD17fSxkLGc9e30seDtpZihuLmluaXRzdGF0dXM/KGE9KG4uaW5pdHN0YXR1cypuLmFuaW0udG9wLW4ucHJldikvKG4ucGVyY2VudC1uLnByZXYpKnMsbi5zdGF0dXM9bi5pbml0c3RhdHVzLGRlbGV0ZSBuLmluaXRzdGF0dXMsbi5zdG9wJiZFZS5zcGxpY2UoaS0tLDEpKTpuLnN0YXR1cz0obi5wcmV2KyhuLnBlcmNlbnQtbi5wcmV2KSooYS9zKSkvbi5hbmltLnRvcCwhKDA+YSkpaWYocz5hKXt2YXIgdj1vKGEvcyk7Zm9yKHZhciB5IGluIGwpaWYobFtUXSh5KSl7c3dpdGNoKHB0W3ldKXtjYXNlICQ6ZD0rbFt5XSt2KnMqaFt5XTticmVhaztjYXNlXCJjb2xvdXJcIjpkPVwicmdiKFwiK1tMZShvdChsW3ldLnIrdipzKmhbeV0ucikpLExlKG90KGxbeV0uZyt2KnMqaFt5XS5nKSksTGUob3QobFt5XS5iK3YqcypoW3ldLmIpKV0uam9pbihcIixcIikrXCIpXCI7YnJlYWs7Y2FzZVwicGF0aFwiOmQ9W107Zm9yKHZhciBtPTAsXz1sW3ldLmxlbmd0aDtfPm07bSsrKXtkW21dPVtsW3ldW21dWzBdXTtmb3IodmFyIHc9MSxrPWxbeV1bbV0ubGVuZ3RoO2s+dzt3KyspZFttXVt3XT0rbFt5XVttXVt3XSt2KnMqaFt5XVttXVt3XTtkW21dPWRbbV0uam9pbihJKX1kPWQuam9pbihJKTticmVhaztjYXNlXCJ0cmFuc2Zvcm1cIjppZihoW3ldLnJlYWwpZm9yKGQ9W10sbT0wLF89bFt5XS5sZW5ndGg7Xz5tO20rKylmb3IoZFttXT1bbFt5XVttXVswXV0sdz0xLGs9bFt5XVttXS5sZW5ndGg7az53O3crKylkW21dW3ddPWxbeV1bbV1bd10rdipzKmhbeV1bbV1bd107ZWxzZXt2YXIgQj1mdW5jdGlvbih0KXtyZXR1cm4rbFt5XVt0XSt2KnMqaFt5XVt0XX07ZD1bW1wibVwiLEIoMCksQigxKSxCKDIpLEIoMyksQig0KSxCKDUpXV19YnJlYWs7Y2FzZVwiY3N2XCI6aWYoXCJjbGlwLXJlY3RcIj09eSlmb3IoZD1bXSxtPTQ7bS0tOylkW21dPStsW3ldW21dK3YqcypoW3ldW21dO2JyZWFrO2RlZmF1bHQ6dmFyIEM9W11bUF0obFt5XSk7Zm9yKGQ9W10sbT1mLnBhcGVyLmN1c3RvbUF0dHJpYnV0ZXNbeV0ubGVuZ3RoO20tLTspZFttXT0rQ1ttXSt2KnMqaFt5XVttXX1wW3ldPWR9Zi5hdHRyKHApLGZ1bmN0aW9uKGUscixpKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dChcInJhcGhhZWwuYW5pbS5mcmFtZS5cIitlLHIsaSl9KX0oZi5pZCxmLG4uYW5pbSl9ZWxzZXtpZihmdW5jdGlvbihyLGksbil7c2V0VGltZW91dChmdW5jdGlvbigpe3QoXCJyYXBoYWVsLmFuaW0uZnJhbWUuXCIraS5pZCxpLG4pLHQoXCJyYXBoYWVsLmFuaW0uZmluaXNoLlwiK2kuaWQsaSxuKSxlLmlzKHIsXCJmdW5jdGlvblwiKSYmci5jYWxsKGkpfSl9KG4uY2FsbGJhY2ssZixuLmFuaW0pLGYuYXR0cih1KSxFZS5zcGxpY2UoaS0tLDEpLG4ucmVwZWF0PjEmJiFuLm5leHQpe2Zvcih4IGluIHUpdVtUXSh4KSYmKGdbeF09bi50b3RhbE9yaWdpblt4XSk7bi5lbC5hdHRyKGcpLGIobi5hbmltLG4uZWwsbi5hbmltLnBlcmNlbnRzWzBdLG51bGwsbi50b3RhbE9yaWdpbixuLnJlcGVhdC0xKX1uLm5leHQmJiFuLnN0b3AmJmIobi5hbmltLG4uZWwsbi5uZXh0LG51bGwsbi50b3RhbE9yaWdpbixuLnJlcGVhdCl9fX1FZS5sZW5ndGgmJk5lKE1lKX0sTGU9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MjU1PzI1NTowPnQ/MDp0fTt5ZS5hbmltYXRlV2l0aD1mdW5jdGlvbih0LHIsaSxuLGEscyl7dmFyIG89dGhpcztpZihvLnJlbW92ZWQpcmV0dXJuIHMmJnMuY2FsbChvKSxvO3ZhciBsPWkgaW5zdGFuY2VvZiBtP2k6ZS5hbmltYXRpb24oaSxuLGEscyksaCx1O2IobCxvLGwucGVyY2VudHNbMF0sbnVsbCxvLmF0dHIoKSk7Zm9yKHZhciBjPTAsZj1FZS5sZW5ndGg7Zj5jO2MrKylpZihFZVtjXS5hbmltPT1yJiZFZVtjXS5lbD09dCl7RWVbZi0xXS5zdGFydD1FZVtjXS5zdGFydDticmVha31yZXR1cm4gb30seWUub25BbmltYXRpb249ZnVuY3Rpb24oZSl7cmV0dXJuIGU/dC5vbihcInJhcGhhZWwuYW5pbS5mcmFtZS5cIit0aGlzLmlkLGUpOnQudW5iaW5kKFwicmFwaGFlbC5hbmltLmZyYW1lLlwiK3RoaXMuaWQpLHRoaXN9LG0ucHJvdG90eXBlLmRlbGF5PWZ1bmN0aW9uKHQpe3ZhciBlPW5ldyBtKHRoaXMuYW5pbSx0aGlzLm1zKTtyZXR1cm4gZS50aW1lcz10aGlzLnRpbWVzLGUuZGVsPSt0fHwwLGV9LG0ucHJvdG90eXBlLnJlcGVhdD1mdW5jdGlvbih0KXt2YXIgZT1uZXcgbSh0aGlzLmFuaW0sdGhpcy5tcyk7cmV0dXJuIGUuZGVsPXRoaXMuZGVsLGUudGltZXM9WS5mbG9vcihXKHQsMCkpfHwxLGV9LGUuYW5pbWF0aW9uPWZ1bmN0aW9uKHQscixpLG4pe2lmKHQgaW5zdGFuY2VvZiBtKXJldHVybiB0OyFlLmlzKGksXCJmdW5jdGlvblwiKSYmaXx8KG49bnx8aXx8bnVsbCxpPW51bGwpLHQ9T2JqZWN0KHQpLHI9K3J8fDA7dmFyIGE9e30scyxvO2ZvcihvIGluIHQpdFtUXShvKSYmaHQobykhPW8mJmh0KG8pK1wiJVwiIT1vJiYocz0hMCxhW29dPXRbb10pO2lmKHMpcmV0dXJuIGkmJihhLmVhc2luZz1pKSxuJiYoYS5jYWxsYmFjaz1uKSxuZXcgbSh7MTAwOmF9LHIpO2lmKG4pe3ZhciBsPTA7Zm9yKHZhciBoIGluIHQpe3ZhciB1PXV0KGgpO3RbVF0oaCkmJnU+bCYmKGw9dSl9bCs9XCIlXCIsIXRbbF0uY2FsbGJhY2smJih0W2xdLmNhbGxiYWNrPW4pfXJldHVybiBuZXcgbSh0LHIpfSx5ZS5hbmltYXRlPWZ1bmN0aW9uKHQscixpLG4pe3ZhciBhPXRoaXM7aWYoYS5yZW1vdmVkKXJldHVybiBuJiZuLmNhbGwoYSksYTt2YXIgcz10IGluc3RhbmNlb2YgbT90OmUuYW5pbWF0aW9uKHQscixpLG4pO3JldHVybiBiKHMsYSxzLnBlcmNlbnRzWzBdLG51bGwsYS5hdHRyKCkpLGF9LHllLnNldFRpbWU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCYmbnVsbCE9ZSYmdGhpcy5zdGF0dXModCxHKGUsdC5tcykvdC5tcyksdGhpc30seWUuc3RhdHVzPWZ1bmN0aW9uKHQsZSl7dmFyIHI9W10saT0wLG4sYTtpZihudWxsIT1lKXJldHVybiBiKHQsdGhpcywtMSxHKGUsMSkpLHRoaXM7Zm9yKG49RWUubGVuZ3RoO24+aTtpKyspaWYoYT1FZVtpXSxhLmVsLmlkPT10aGlzLmlkJiYoIXR8fGEuYW5pbT09dCkpe2lmKHQpcmV0dXJuIGEuc3RhdHVzO3IucHVzaCh7YW5pbTphLmFuaW0sc3RhdHVzOmEuc3RhdHVzfSl9cmV0dXJuIHQ/MDpyfSx5ZS5wYXVzZT1mdW5jdGlvbihlKXtmb3IodmFyIHI9MDtyPEVlLmxlbmd0aDtyKyspRWVbcl0uZWwuaWQhPXRoaXMuaWR8fGUmJkVlW3JdLmFuaW0hPWV8fHQoXCJyYXBoYWVsLmFuaW0ucGF1c2UuXCIrdGhpcy5pZCx0aGlzLEVlW3JdLmFuaW0pIT09ITEmJihFZVtyXS5wYXVzZWQ9ITApO3JldHVybiB0aGlzfSx5ZS5yZXN1bWU9ZnVuY3Rpb24oZSl7Zm9yKHZhciByPTA7cjxFZS5sZW5ndGg7cisrKWlmKEVlW3JdLmVsLmlkPT10aGlzLmlkJiYoIWV8fEVlW3JdLmFuaW09PWUpKXt2YXIgaT1FZVtyXTt0KFwicmFwaGFlbC5hbmltLnJlc3VtZS5cIit0aGlzLmlkLHRoaXMsaS5hbmltKSE9PSExJiYoZGVsZXRlIGkucGF1c2VkLHRoaXMuc3RhdHVzKGkuYW5pbSxpLnN0YXR1cykpfXJldHVybiB0aGlzfSx5ZS5zdG9wPWZ1bmN0aW9uKGUpe2Zvcih2YXIgcj0wO3I8RWUubGVuZ3RoO3IrKylFZVtyXS5lbC5pZCE9dGhpcy5pZHx8ZSYmRWVbcl0uYW5pbSE9ZXx8dChcInJhcGhhZWwuYW5pbS5zdG9wLlwiK3RoaXMuaWQsdGhpcyxFZVtyXS5hbmltKSE9PSExJiZFZS5zcGxpY2Uoci0tLDEpO3JldHVybiB0aGlzfSx0Lm9uKFwicmFwaGFlbC5yZW1vdmVcIixfKSx0Lm9uKFwicmFwaGFlbC5jbGVhclwiLF8pLHllLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJSYXBoYcOrbOKAmXMgb2JqZWN0XCJ9O3ZhciB6ZT1mdW5jdGlvbih0KXtpZih0aGlzLml0ZW1zPVtdLHRoaXMubGVuZ3RoPTAsdGhpcy50eXBlPVwic2V0XCIsdClmb3IodmFyIGU9MCxyPXQubGVuZ3RoO3I+ZTtlKyspIXRbZV18fHRbZV0uY29uc3RydWN0b3IhPXllLmNvbnN0cnVjdG9yJiZ0W2VdLmNvbnN0cnVjdG9yIT16ZXx8KHRoaXNbdGhpcy5pdGVtcy5sZW5ndGhdPXRoaXMuaXRlbXNbdGhpcy5pdGVtcy5sZW5ndGhdPXRbZV0sdGhpcy5sZW5ndGgrKyl9LFBlPXplLnByb3RvdHlwZTtQZS5wdXNoPWZ1bmN0aW9uKCl7Zm9yKHZhciB0LGUscj0wLGk9YXJndW1lbnRzLmxlbmd0aDtpPnI7cisrKXQ9YXJndW1lbnRzW3JdLCF0fHx0LmNvbnN0cnVjdG9yIT15ZS5jb25zdHJ1Y3RvciYmdC5jb25zdHJ1Y3RvciE9emV8fChlPXRoaXMuaXRlbXMubGVuZ3RoLHRoaXNbZV09dGhpcy5pdGVtc1tlXT10LHRoaXMubGVuZ3RoKyspO3JldHVybiB0aGlzfSxQZS5wb3A9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGgmJmRlbGV0ZSB0aGlzW3RoaXMubGVuZ3RoLS1dLHRoaXMuaXRlbXMucG9wKCl9LFBlLmZvckVhY2g9ZnVuY3Rpb24odCxlKXtmb3IodmFyIHI9MCxpPXRoaXMuaXRlbXMubGVuZ3RoO2k+cjtyKyspaWYodC5jYWxsKGUsdGhpcy5pdGVtc1tyXSxyKT09PSExKXJldHVybiB0aGlzO3JldHVybiB0aGlzfTtmb3IodmFyIEZlIGluIHllKXllW1RdKEZlKSYmKFBlW0ZlXT1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHM7cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihyKXtyW3RdW3pdKHIsZSl9KX19KEZlKSk7cmV0dXJuIFBlLmF0dHI9ZnVuY3Rpb24odCxyKXtpZih0JiZlLmlzKHQsUSkmJmUuaXModFswXSxcIm9iamVjdFwiKSlmb3IodmFyIGk9MCxuPXQubGVuZ3RoO24+aTtpKyspdGhpcy5pdGVtc1tpXS5hdHRyKHRbaV0pO2Vsc2UgZm9yKHZhciBhPTAscz10aGlzLml0ZW1zLmxlbmd0aDtzPmE7YSsrKXRoaXMuaXRlbXNbYV0uYXR0cih0LHIpO3JldHVybiB0aGlzfSxQZS5jbGVhcj1mdW5jdGlvbigpe2Zvcig7dGhpcy5sZW5ndGg7KXRoaXMucG9wKCl9LFBlLnNwbGljZT1mdW5jdGlvbih0LGUscil7dD0wPnQ/Vyh0aGlzLmxlbmd0aCt0LDApOnQsZT1XKDAsRyh0aGlzLmxlbmd0aC10LGUpKTt2YXIgaT1bXSxuPVtdLGE9W10scztmb3Iocz0yO3M8YXJndW1lbnRzLmxlbmd0aDtzKyspYS5wdXNoKGFyZ3VtZW50c1tzXSk7Zm9yKHM9MDtlPnM7cysrKW4ucHVzaCh0aGlzW3Qrc10pO2Zvcig7czx0aGlzLmxlbmd0aC10O3MrKylpLnB1c2godGhpc1t0K3NdKTt2YXIgbz1hLmxlbmd0aDtmb3Iocz0wO3M8bytpLmxlbmd0aDtzKyspdGhpcy5pdGVtc1t0K3NdPXRoaXNbdCtzXT1vPnM/YVtzXTppW3Mtb107Zm9yKHM9dGhpcy5pdGVtcy5sZW5ndGg9dGhpcy5sZW5ndGgtPWUtbzt0aGlzW3NdOylkZWxldGUgdGhpc1tzKytdO3JldHVybiBuZXcgemUobil9LFBlLmV4Y2x1ZGU9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTAscj10aGlzLmxlbmd0aDtyPmU7ZSsrKWlmKHRoaXNbZV09PXQpcmV0dXJuIHRoaXMuc3BsaWNlKGUsMSksITB9LFBlLmFuaW1hdGU9ZnVuY3Rpb24odCxyLGksbil7KGUuaXMoaSxcImZ1bmN0aW9uXCIpfHwhaSkmJihuPWl8fG51bGwpO3ZhciBhPXRoaXMuaXRlbXMubGVuZ3RoLHM9YSxvLGw9dGhpcyxoO2lmKCFhKXJldHVybiB0aGlzO24mJihoPWZ1bmN0aW9uKCl7IS0tYSYmbi5jYWxsKGwpfSksaT1lLmlzKGksWik/aTpoO3ZhciB1PWUuYW5pbWF0aW9uKHQscixpLGgpO2ZvcihvPXRoaXMuaXRlbXNbLS1zXS5hbmltYXRlKHUpO3MtLTspdGhpcy5pdGVtc1tzXSYmIXRoaXMuaXRlbXNbc10ucmVtb3ZlZCYmdGhpcy5pdGVtc1tzXS5hbmltYXRlV2l0aChvLHUsdSksdGhpcy5pdGVtc1tzXSYmIXRoaXMuaXRlbXNbc10ucmVtb3ZlZHx8YS0tO3JldHVybiB0aGlzfSxQZS5pbnNlcnRBZnRlcj1mdW5jdGlvbih0KXtmb3IodmFyIGU9dGhpcy5pdGVtcy5sZW5ndGg7ZS0tOyl0aGlzLml0ZW1zW2VdLmluc2VydEFmdGVyKHQpO3JldHVybiB0aGlzfSxQZS5nZXRCQm94PWZ1bmN0aW9uKCl7Zm9yKHZhciB0PVtdLGU9W10scj1bXSxpPVtdLG49dGhpcy5pdGVtcy5sZW5ndGg7bi0tOylpZighdGhpcy5pdGVtc1tuXS5yZW1vdmVkKXt2YXIgYT10aGlzLml0ZW1zW25dLmdldEJCb3goKTt0LnB1c2goYS54KSxlLnB1c2goYS55KSxyLnB1c2goYS54K2Eud2lkdGgpLGkucHVzaChhLnkrYS5oZWlnaHQpfXJldHVybiB0PUdbel0oMCx0KSxlPUdbel0oMCxlKSxyPVdbel0oMCxyKSxpPVdbel0oMCxpKSx7eDp0LHk6ZSx4MjpyLHkyOmksd2lkdGg6ci10LGhlaWdodDppLWV9fSxQZS5jbG9uZT1mdW5jdGlvbih0KXt0PXRoaXMucGFwZXIuc2V0KCk7Zm9yKHZhciBlPTAscj10aGlzLml0ZW1zLmxlbmd0aDtyPmU7ZSsrKXQucHVzaCh0aGlzLml0ZW1zW2VdLmNsb25lKCkpO3JldHVybiB0fSxQZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiUmFwaGHDq2zigJhzIHNldFwifSxQZS5nbG93PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMucGFwZXIuc2V0KCk7cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihyLGkpe3ZhciBuPXIuZ2xvdyh0KTtudWxsIT1uJiZuLmZvckVhY2goZnVuY3Rpb24odCxyKXtlLnB1c2godCl9KX0pLGV9LFBlLmlzUG9pbnRJbnNpZGU9ZnVuY3Rpb24odCxlKXt2YXIgcj0hMTtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGkpe3JldHVybiBpLmlzUG9pbnRJbnNpZGUodCxlKT8ocj0hMCwhMSk6dm9pZCAwfSkscn0sZS5yZWdpc3RlckZvbnQ9ZnVuY3Rpb24odCl7aWYoIXQuZmFjZSlyZXR1cm4gdDt0aGlzLmZvbnRzPXRoaXMuZm9udHN8fHt9O3ZhciBlPXt3OnQudyxmYWNlOnt9LGdseXBoczp7fX0scj10LmZhY2VbXCJmb250LWZhbWlseVwiXTtmb3IodmFyIGkgaW4gdC5mYWNlKXQuZmFjZVtUXShpKSYmKGUuZmFjZVtpXT10LmZhY2VbaV0pO2lmKHRoaXMuZm9udHNbcl0/dGhpcy5mb250c1tyXS5wdXNoKGUpOnRoaXMuZm9udHNbcl09W2VdLCF0LnN2Zyl7ZS5mYWNlW1widW5pdHMtcGVyLWVtXCJdPXV0KHQuZmFjZVtcInVuaXRzLXBlci1lbVwiXSwxMCk7Zm9yKHZhciBuIGluIHQuZ2x5cGhzKWlmKHQuZ2x5cGhzW1RdKG4pKXt2YXIgYT10LmdseXBoc1tuXTtpZihlLmdseXBoc1tuXT17dzphLncsazp7fSxkOmEuZCYmXCJNXCIrYS5kLnJlcGxhY2UoL1ttbGN4dHJ2XS9nLGZ1bmN0aW9uKHQpe3JldHVybntsOlwiTFwiLGM6XCJDXCIseDpcInpcIix0OlwibVwiLHI6XCJsXCIsdjpcImNcIn1bdF18fFwiTVwifSkrXCJ6XCJ9LGEuaylmb3IodmFyIHMgaW4gYS5rKWFbVF0ocykmJihlLmdseXBoc1tuXS5rW3NdPWEua1tzXSl9fXJldHVybiB0fSxNLmdldEZvbnQ9ZnVuY3Rpb24odCxyLGksbil7aWYobj1ufHxcIm5vcm1hbFwiLGk9aXx8XCJub3JtYWxcIixyPStyfHx7bm9ybWFsOjQwMCxib2xkOjcwMCxsaWdodGVyOjMwMCxib2xkZXI6ODAwfVtyXXx8NDAwLGUuZm9udHMpe3ZhciBhPWUuZm9udHNbdF07aWYoIWEpe3ZhciBzPW5ldyBSZWdFeHAoXCIoXnxcXFxccylcIit0LnJlcGxhY2UoL1teXFx3XFxkXFxzKyF+LjpfLV0vZyxSKStcIihcXFxcc3wkKVwiLFwiaVwiKTtmb3IodmFyIG8gaW4gZS5mb250cylpZihlLmZvbnRzW1RdKG8pJiZzLnRlc3Qobykpe2E9ZS5mb250c1tvXTticmVha319dmFyIGw7aWYoYSlmb3IodmFyIGg9MCx1PWEubGVuZ3RoO3U+aCYmKGw9YVtoXSxsLmZhY2VbXCJmb250LXdlaWdodFwiXSE9cnx8bC5mYWNlW1wiZm9udC1zdHlsZVwiXSE9aSYmbC5mYWNlW1wiZm9udC1zdHlsZVwiXXx8bC5mYWNlW1wiZm9udC1zdHJldGNoXCJdIT1uKTtoKyspO3JldHVybiBsfX0sTS5wcmludD1mdW5jdGlvbih0LHIsaSxuLGEscyxvLGwpe3M9c3x8XCJtaWRkbGVcIixvPVcoRyhvfHwwLDEpLC0xKSxsPVcoRyhsfHwxLDMpLDEpO3ZhciBoPWooaSlbcV0oUiksdT0wLGM9MCxmPVIscDtpZihlLmlzKG4sXCJzdHJpbmdcIikmJihuPXRoaXMuZ2V0Rm9udChuKSksbil7cD0oYXx8MTYpL24uZmFjZVtcInVuaXRzLXBlci1lbVwiXTtmb3IodmFyIGQ9bi5mYWNlLmJib3hbcV0oayksZz0rZFswXSx4PWRbM10tZFsxXSx2PTAseT0rZFsxXSsoXCJiYXNlbGluZVwiPT1zP3grICtuLmZhY2UuZGVzY2VudDp4LzIpLG09MCxiPWgubGVuZ3RoO2I+bTttKyspe2lmKFwiXFxuXCI9PWhbbV0pdT0wLHc9MCxjPTAsdis9eCpsO2Vsc2V7dmFyIF89YyYmbi5nbHlwaHNbaFttLTFdXXx8e30sdz1uLmdseXBoc1toW21dXTt1Kz1jPyhfLnd8fG4udykrKF8uayYmXy5rW2hbbV1dfHwwKStuLncqbzowLGM9MX13JiZ3LmQmJihmKz1lLnRyYW5zZm9ybVBhdGgody5kLFtcInRcIix1KnAsdipwLFwic1wiLHAscCxnLHksXCJ0XCIsKHQtZykvcCwoci15KS9wXSkpfX1yZXR1cm4gdGhpcy5wYXRoKGYpLmF0dHIoe2ZpbGw6XCIjMDAwXCIsc3Ryb2tlOlwibm9uZVwifSl9LE0uYWRkPWZ1bmN0aW9uKHQpe2lmKGUuaXModCxcImFycmF5XCIpKWZvcih2YXIgcj10aGlzLnNldCgpLGk9MCxuPXQubGVuZ3RoLGE7bj5pO2krKylhPXRbaV18fHt9LEJbVF0oYS50eXBlKSYmci5wdXNoKHRoaXNbYS50eXBlXSgpLmF0dHIoYSkpO3JldHVybiByfSxlLmZvcm1hdD1mdW5jdGlvbih0LHIpe3ZhciBpPWUuaXMocixRKT9bMF1bUF0ocik6YXJndW1lbnRzO3JldHVybiB0JiZlLmlzKHQsWikmJmkubGVuZ3RoLTEmJih0PXQucmVwbGFjZShDLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIG51bGw9PWlbKytlXT9SOmlbZV19KSksdHx8Un0sZS5mdWxsZmlsbD1mdW5jdGlvbigpe3ZhciB0PS9cXHsoW15cXH1dKylcXH0vZyxlPS8oPzooPzpefFxcLikoLis/KSg/PVxcW3xcXC58JHxcXCgpfFxcWygnfFwiKSguKz8pXFwyXFxdKShcXChcXCkpPy9nLHI9ZnVuY3Rpb24odCxyLGkpe3ZhciBuPWk7cmV0dXJuIHIucmVwbGFjZShlLGZ1bmN0aW9uKHQsZSxyLGksYSl7ZT1lfHxpLG4mJihlIGluIG4mJihuPW5bZV0pLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJmEmJihuPW4oKSkpfSksbj0obnVsbD09bnx8bj09aT90Om4pK1wiXCJ9O3JldHVybiBmdW5jdGlvbihlLGkpe3JldHVybiBTdHJpbmcoZSkucmVwbGFjZSh0LGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHIodCxlLGkpfSl9fSgpLGUubmluamE9ZnVuY3Rpb24oKXtpZihFLndhcylBLndpbi5SYXBoYWVsPUUuaXM7ZWxzZXt3aW5kb3cuUmFwaGFlbD12b2lkIDA7dHJ5e2RlbGV0ZSB3aW5kb3cuUmFwaGFlbH1jYXRjaCh0KXt9fXJldHVybiBlfSxlLnN0PVBlLHQub24oXCJyYXBoYWVsLkRPTWxvYWRcIixmdW5jdGlvbigpe3c9ITB9KSxmdW5jdGlvbih0LHIsaSl7ZnVuY3Rpb24gbigpey9pbi8udGVzdCh0LnJlYWR5U3RhdGUpP3NldFRpbWVvdXQobiw5KTplLmV2ZShcInJhcGhhZWwuRE9NbG9hZFwiKX1udWxsPT10LnJlYWR5U3RhdGUmJnQuYWRkRXZlbnRMaXN0ZW5lciYmKHQuYWRkRXZlbnRMaXN0ZW5lcihyLGk9ZnVuY3Rpb24oKXt0LnJlbW92ZUV2ZW50TGlzdGVuZXIocixpLCExKSx0LnJlYWR5U3RhdGU9XCJjb21wbGV0ZVwifSwhMSksdC5yZWFkeVN0YXRlPVwibG9hZGluZ1wiKSxuKCl9KGRvY3VtZW50LFwiRE9NQ29udGVudExvYWRlZFwiKSxlfS5hcHBseShlLGkpLCEodm9pZCAwIT09biYmKHQuZXhwb3J0cz1uKSl9LGZ1bmN0aW9uKHQsZSxyKXt2YXIgaSxuOyFmdW5jdGlvbihyKXt2YXIgYT1cIjAuNC4yXCIscz1cImhhc093blByb3BlcnR5XCIsbz0vW1xcLlxcL10vLGw9XCIqXCIsaD1mdW5jdGlvbigpe30sdT1mdW5jdGlvbih0LGUpe3JldHVybiB0LWV9LGMsZixwPXtuOnt9fSxkPWZ1bmN0aW9uKHQsZSl7dD1TdHJpbmcodCk7dmFyIHI9cCxpPWYsbj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMiksYT1kLmxpc3RlbmVycyh0KSxzPTAsbz0hMSxsLGg9W10sZz17fSx4PVtdLHY9Yyx5PVtdO2M9dCxmPTA7Zm9yKHZhciBtPTAsYj1hLmxlbmd0aDtiPm07bSsrKVwiekluZGV4XCJpbiBhW21dJiYoaC5wdXNoKGFbbV0uekluZGV4KSxhW21dLnpJbmRleDwwJiYoZ1thW21dLnpJbmRleF09YVttXSkpO2ZvcihoLnNvcnQodSk7aFtzXTwwOylpZihsPWdbaFtzKytdXSx4LnB1c2gobC5hcHBseShlLG4pKSxmKXJldHVybiBmPWkseDtmb3IobT0wO2I+bTttKyspaWYobD1hW21dLFwiekluZGV4XCJpbiBsKWlmKGwuekluZGV4PT1oW3NdKXtpZih4LnB1c2gobC5hcHBseShlLG4pKSxmKWJyZWFrO2RvIGlmKHMrKyxsPWdbaFtzXV0sbCYmeC5wdXNoKGwuYXBwbHkoZSxuKSksZilicmVhazt3aGlsZShsKX1lbHNlIGdbbC56SW5kZXhdPWw7ZWxzZSBpZih4LnB1c2gobC5hcHBseShlLG4pKSxmKWJyZWFrO3JldHVybiBmPWksYz12LHgubGVuZ3RoP3g6bnVsbH07ZC5fZXZlbnRzPXAsZC5saXN0ZW5lcnM9ZnVuY3Rpb24odCl7dmFyIGU9dC5zcGxpdChvKSxyPXAsaSxuLGEscyxoLHUsYyxmLGQ9W3JdLGc9W107Zm9yKHM9MCxoPWUubGVuZ3RoO2g+cztzKyspe2ZvcihmPVtdLHU9MCxjPWQubGVuZ3RoO2M+dTt1KyspZm9yKHI9ZFt1XS5uLG49W3JbZVtzXV0scltsXV0sYT0yO2EtLTspaT1uW2FdLGkmJihmLnB1c2goaSksZz1nLmNvbmNhdChpLmZ8fFtdKSk7ZD1mfXJldHVybiBnfSxkLm9uPWZ1bmN0aW9uKHQsZSl7aWYodD1TdHJpbmcodCksXCJmdW5jdGlvblwiIT10eXBlb2YgZSlyZXR1cm4gZnVuY3Rpb24oKXt9O2Zvcih2YXIgcj10LnNwbGl0KG8pLGk9cCxuPTAsYT1yLmxlbmd0aDthPm47bisrKWk9aS5uLGk9aS5oYXNPd25Qcm9wZXJ0eShyW25dKSYmaVtyW25dXXx8KGlbcltuXV09e246e319KTtmb3IoaS5mPWkuZnx8W10sbj0wLGE9aS5mLmxlbmd0aDthPm47bisrKWlmKGkuZltuXT09ZSlyZXR1cm4gaDtyZXR1cm4gaS5mLnB1c2goZSksZnVuY3Rpb24odCl7K3Q9PSt0JiYoZS56SW5kZXg9K3QpfX0sZC5mPWZ1bmN0aW9uKHQpe3ZhciBlPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3JldHVybiBmdW5jdGlvbigpe2QuYXBwbHkobnVsbCxbdCxudWxsXS5jb25jYXQoZSkuY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApKSl9fSxkLnN0b3A9ZnVuY3Rpb24oKXtmPTF9LGQubnQ9ZnVuY3Rpb24odCl7cmV0dXJuIHQ/bmV3IFJlZ0V4cChcIig/OlxcXFwufFxcXFwvfF4pXCIrdCtcIig/OlxcXFwufFxcXFwvfCQpXCIpLnRlc3QoYyk6Y30sZC5udHM9ZnVuY3Rpb24oKXtyZXR1cm4gYy5zcGxpdChvKX0sZC5vZmY9ZC51bmJpbmQ9ZnVuY3Rpb24odCxlKXtpZighdClyZXR1cm4gdm9pZChkLl9ldmVudHM9cD17bjp7fX0pO3ZhciByPXQuc3BsaXQobyksaSxuLGEsaCx1LGMsZixnPVtwXTtmb3IoaD0wLHU9ci5sZW5ndGg7dT5oO2grKylmb3IoYz0wO2M8Zy5sZW5ndGg7Yys9YS5sZW5ndGgtMil7aWYoYT1bYywxXSxpPWdbY10ubixyW2hdIT1sKWlbcltoXV0mJmEucHVzaChpW3JbaF1dKTtlbHNlIGZvcihuIGluIGkpaVtzXShuKSYmYS5wdXNoKGlbbl0pO2cuc3BsaWNlLmFwcGx5KGcsYSl9Zm9yKGg9MCx1PWcubGVuZ3RoO3U+aDtoKyspZm9yKGk9Z1toXTtpLm47KXtpZihlKXtpZihpLmYpe2ZvcihjPTAsZj1pLmYubGVuZ3RoO2Y+YztjKyspaWYoaS5mW2NdPT1lKXtpLmYuc3BsaWNlKGMsMSk7YnJlYWt9IWkuZi5sZW5ndGgmJmRlbGV0ZSBpLmZ9Zm9yKG4gaW4gaS5uKWlmKGkubltzXShuKSYmaS5uW25dLmYpe3ZhciB4PWkubltuXS5mO2ZvcihjPTAsZj14Lmxlbmd0aDtmPmM7YysrKWlmKHhbY109PWUpe3guc3BsaWNlKGMsMSk7YnJlYWt9IXgubGVuZ3RoJiZkZWxldGUgaS5uW25dLmZ9fWVsc2V7ZGVsZXRlIGkuZjtmb3IobiBpbiBpLm4paS5uW3NdKG4pJiZpLm5bbl0uZiYmZGVsZXRlIGkubltuXS5mfWk9aS5ufX0sZC5vbmNlPWZ1bmN0aW9uKHQsZSl7dmFyIHI9ZnVuY3Rpb24oKXtyZXR1cm4gZC51bmJpbmQodCxyKSxlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGQub24odCxyKX0sZC52ZXJzaW9uPWEsZC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiWW91IGFyZSBydW5uaW5nIEV2ZSBcIithfSxcInVuZGVmaW5lZFwiIT10eXBlb2YgdCYmdC5leHBvcnRzP3QuZXhwb3J0cz1kOihpPVtdLG49ZnVuY3Rpb24oKXtyZXR1cm4gZH0uYXBwbHkoZSxpKSwhKHZvaWQgMCE9PW4mJih0LmV4cG9ydHM9bikpKX0odGhpcyl9LGZ1bmN0aW9uKHQsZSxyKXt2YXIgaSxuO2k9W3IoMSldLG49ZnVuY3Rpb24odCl7aWYoIXR8fHQuc3ZnKXt2YXIgZT1cImhhc093blByb3BlcnR5XCIscj1TdHJpbmcsaT1wYXJzZUZsb2F0LG49cGFyc2VJbnQsYT1NYXRoLHM9YS5tYXgsbz1hLmFicyxsPWEucG93LGg9L1ssIF0rLyx1PXQuZXZlLGM9XCJcIixmPVwiIFwiLHA9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsZD17YmxvY2s6XCJNNSwwIDAsMi41IDUsNXpcIixjbGFzc2ljOlwiTTUsMCAwLDIuNSA1LDUgMy41LDMgMy41LDJ6XCIsZGlhbW9uZDpcIk0yLjUsMCA1LDIuNSAyLjUsNSAwLDIuNXpcIixvcGVuOlwiTTYsMSAxLDMuNSA2LDZcIixvdmFsOlwiTTIuNSwwQTIuNSwyLjUsMCwwLDEsMi41LDUgMi41LDIuNSwwLDAsMSwyLjUsMHpcIn0sZz17fTt0LnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJZb3VyIGJyb3dzZXIgc3VwcG9ydHMgU1ZHLlxcbllvdSBhcmUgcnVubmluZyBSYXBoYcOrbCBcIit0aGlzLnZlcnNpb259O3ZhciB4PWZ1bmN0aW9uKGksbil7aWYobil7XCJzdHJpbmdcIj09dHlwZW9mIGkmJihpPXgoaSkpO2Zvcih2YXIgYSBpbiBuKW5bZV0oYSkmJihcInhsaW5rOlwiPT1hLnN1YnN0cmluZygwLDYpP2kuc2V0QXR0cmlidXRlTlMocCxhLnN1YnN0cmluZyg2KSxyKG5bYV0pKTppLnNldEF0dHJpYnV0ZShhLHIoblthXSkpKX1lbHNlIGk9dC5fZy5kb2MuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixpKSxpLnN0eWxlJiYoaS5zdHlsZS53ZWJraXRUYXBIaWdobGlnaHRDb2xvcj1cInJnYmEoMCwwLDAsMClcIik7cmV0dXJuIGl9LHY9ZnVuY3Rpb24oZSxuKXt2YXIgaD1cImxpbmVhclwiLHU9ZS5pZCtuLGY9LjUscD0uNSxkPWUubm9kZSxnPWUucGFwZXIsdj1kLnN0eWxlLHk9dC5fZy5kb2MuZ2V0RWxlbWVudEJ5SWQodSk7aWYoIXkpe2lmKG49cihuKS5yZXBsYWNlKHQuX3JhZGlhbF9ncmFkaWVudCxmdW5jdGlvbih0LGUscil7aWYoaD1cInJhZGlhbFwiLGUmJnIpe2Y9aShlKSxwPWkocik7dmFyIG49MioocD4uNSktMTtsKGYtLjUsMikrbChwLS41LDIpPi4yNSYmKHA9YS5zcXJ0KC4yNS1sKGYtLjUsMikpKm4rLjUpJiYuNSE9cCYmKHA9cC50b0ZpeGVkKDUpLTFlLTUqbil9cmV0dXJuIGN9KSxuPW4uc3BsaXQoL1xccypcXC1cXHMqLyksXCJsaW5lYXJcIj09aCl7dmFyIGI9bi5zaGlmdCgpO2lmKGI9LWkoYiksaXNOYU4oYikpcmV0dXJuIG51bGw7dmFyIF89WzAsMCxhLmNvcyh0LnJhZChiKSksYS5zaW4odC5yYWQoYikpXSx3PTEvKHMobyhfWzJdKSxvKF9bM10pKXx8MSk7X1syXSo9dyxfWzNdKj13LF9bMl08MCYmKF9bMF09LV9bMl0sX1syXT0wKSxfWzNdPDAmJihfWzFdPS1fWzNdLF9bM109MCl9dmFyIGs9dC5fcGFyc2VEb3RzKG4pO2lmKCFrKXJldHVybiBudWxsO2lmKHU9dS5yZXBsYWNlKC9bXFwoXFwpXFxzLFxceGIwI10vZyxcIl9cIiksZS5ncmFkaWVudCYmdSE9ZS5ncmFkaWVudC5pZCYmKGcuZGVmcy5yZW1vdmVDaGlsZChlLmdyYWRpZW50KSxkZWxldGUgZS5ncmFkaWVudCksIWUuZ3JhZGllbnQpe3k9eChoK1wiR3JhZGllbnRcIix7aWQ6dX0pLGUuZ3JhZGllbnQ9eSx4KHksXCJyYWRpYWxcIj09aD97Zng6ZixmeTpwfTp7eDE6X1swXSx5MTpfWzFdLHgyOl9bMl0seTI6X1szXSxncmFkaWVudFRyYW5zZm9ybTplLm1hdHJpeC5pbnZlcnQoKX0pLGcuZGVmcy5hcHBlbmRDaGlsZCh5KTtmb3IodmFyIEI9MCxDPWsubGVuZ3RoO0M+QjtCKyspeS5hcHBlbmRDaGlsZCh4KFwic3RvcFwiLHtvZmZzZXQ6a1tCXS5vZmZzZXQ/a1tCXS5vZmZzZXQ6Qj9cIjEwMCVcIjpcIjAlXCIsXCJzdG9wLWNvbG9yXCI6a1tCXS5jb2xvcnx8XCIjZmZmXCIsXCJzdG9wLW9wYWNpdHlcIjppc0Zpbml0ZShrW0JdLm9wYWNpdHkpP2tbQl0ub3BhY2l0eToxfSkpfX1yZXR1cm4geChkLHtmaWxsOm0odSksb3BhY2l0eToxLFwiZmlsbC1vcGFjaXR5XCI6MX0pLHYuZmlsbD1jLHYub3BhY2l0eT0xLHYuZmlsbE9wYWNpdHk9MSwxfSx5PWZ1bmN0aW9uKCl7dmFyIHQ9ZG9jdW1lbnQuZG9jdW1lbnRNb2RlO3JldHVybiB0JiYoOT09PXR8fDEwPT09dCl9LG09ZnVuY3Rpb24odCl7aWYoeSgpKXJldHVyblwidXJsKCcjXCIrdCtcIicpXCI7dmFyIGU9ZG9jdW1lbnQubG9jYXRpb24scj1lLnByb3RvY29sK1wiLy9cIitlLmhvc3QrZS5wYXRobmFtZStlLnNlYXJjaDtyZXR1cm5cInVybCgnXCIrcitcIiNcIit0K1wiJylcIn0sYj1mdW5jdGlvbih0KXt2YXIgZT10LmdldEJCb3goMSk7eCh0LnBhdHRlcm4se3BhdHRlcm5UcmFuc2Zvcm06dC5tYXRyaXguaW52ZXJ0KCkrXCIgdHJhbnNsYXRlKFwiK2UueCtcIixcIitlLnkrXCIpXCJ9KX0sXz1mdW5jdGlvbihpLG4sYSl7aWYoXCJwYXRoXCI9PWkudHlwZSl7Zm9yKHZhciBzPXIobikudG9Mb3dlckNhc2UoKS5zcGxpdChcIi1cIiksbz1pLnBhcGVyLGw9YT9cImVuZFwiOlwic3RhcnRcIixoPWkubm9kZSx1PWkuYXR0cnMsZj11W1wic3Ryb2tlLXdpZHRoXCJdLHA9cy5sZW5ndGgsdj1cImNsYXNzaWNcIix5LG0sYixfLHcsaz0zLEI9MyxDPTU7cC0tOylzd2l0Y2goc1twXSl7Y2FzZVwiYmxvY2tcIjpjYXNlXCJjbGFzc2ljXCI6Y2FzZVwib3ZhbFwiOmNhc2VcImRpYW1vbmRcIjpjYXNlXCJvcGVuXCI6Y2FzZVwibm9uZVwiOnY9c1twXTticmVhaztjYXNlXCJ3aWRlXCI6Qj01O2JyZWFrO2Nhc2VcIm5hcnJvd1wiOkI9MjticmVhaztjYXNlXCJsb25nXCI6az01O2JyZWFrO2Nhc2VcInNob3J0XCI6az0yfWlmKFwib3BlblwiPT12PyhrKz0yLEIrPTIsQys9MixiPTEsXz1hPzQ6MSx3PXtmaWxsOlwibm9uZVwiLHN0cm9rZTp1LnN0cm9rZX0pOihfPWI9ay8yLHc9e2ZpbGw6dS5zdHJva2Usc3Ryb2tlOlwibm9uZVwifSksaS5fLmFycm93cz9hPyhpLl8uYXJyb3dzLmVuZFBhdGgmJmdbaS5fLmFycm93cy5lbmRQYXRoXS0tLGkuXy5hcnJvd3MuZW5kTWFya2VyJiZnW2kuXy5hcnJvd3MuZW5kTWFya2VyXS0tKTooaS5fLmFycm93cy5zdGFydFBhdGgmJmdbaS5fLmFycm93cy5zdGFydFBhdGhdLS0saS5fLmFycm93cy5zdGFydE1hcmtlciYmZ1tpLl8uYXJyb3dzLnN0YXJ0TWFya2VyXS0tKTppLl8uYXJyb3dzPXt9LFwibm9uZVwiIT12KXt2YXIgUz1cInJhcGhhZWwtbWFya2VyLVwiK3YsVD1cInJhcGhhZWwtbWFya2VyLVwiK2wrditrK0IrXCItb2JqXCIraS5pZDt0Ll9nLmRvYy5nZXRFbGVtZW50QnlJZChTKT9nW1NdKys6KG8uZGVmcy5hcHBlbmRDaGlsZCh4KHgoXCJwYXRoXCIpLHtcInN0cm9rZS1saW5lY2FwXCI6XCJyb3VuZFwiLGQ6ZFt2XSxpZDpTfSkpLGdbU109MSk7dmFyIEE9dC5fZy5kb2MuZ2V0RWxlbWVudEJ5SWQoVCksRTtBPyhnW1RdKyssRT1BLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidXNlXCIpWzBdKTooQT14KHgoXCJtYXJrZXJcIikse2lkOlQsbWFya2VySGVpZ2h0OkIsbWFya2VyV2lkdGg6ayxvcmllbnQ6XCJhdXRvXCIscmVmWDpfLHJlZlk6Qi8yfSksRT14KHgoXCJ1c2VcIikse1wieGxpbms6aHJlZlwiOlwiI1wiK1MsdHJhbnNmb3JtOihhP1wicm90YXRlKDE4MCBcIitrLzIrXCIgXCIrQi8yK1wiKSBcIjpjKStcInNjYWxlKFwiK2svQytcIixcIitCL0MrXCIpXCIsXCJzdHJva2Utd2lkdGhcIjooMS8oKGsvQytCL0MpLzIpKS50b0ZpeGVkKDQpfSksQS5hcHBlbmRDaGlsZChFKSxvLmRlZnMuYXBwZW5kQ2hpbGQoQSksZ1tUXT0xKSx4KEUsdyk7dmFyIE49YiooXCJkaWFtb25kXCIhPXYmJlwib3ZhbFwiIT12KTthPyh5PWkuXy5hcnJvd3Muc3RhcnRkeCpmfHwwLG09dC5nZXRUb3RhbExlbmd0aCh1LnBhdGgpLU4qZik6KHk9TipmLG09dC5nZXRUb3RhbExlbmd0aCh1LnBhdGgpLShpLl8uYXJyb3dzLmVuZGR4KmZ8fDApKSx3PXt9LHdbXCJtYXJrZXItXCIrbF09XCJ1cmwoI1wiK1QrXCIpXCIsKG18fHkpJiYody5kPXQuZ2V0U3VicGF0aCh1LnBhdGgseSxtKSkseChoLHcpLGkuXy5hcnJvd3NbbCtcIlBhdGhcIl09UyxpLl8uYXJyb3dzW2wrXCJNYXJrZXJcIl09VCxpLl8uYXJyb3dzW2wrXCJkeFwiXT1OLGkuXy5hcnJvd3NbbCtcIlR5cGVcIl09dixpLl8uYXJyb3dzW2wrXCJTdHJpbmdcIl09bn1lbHNlIGE/KHk9aS5fLmFycm93cy5zdGFydGR4KmZ8fDAsbT10LmdldFRvdGFsTGVuZ3RoKHUucGF0aCkteSk6KHk9MCxtPXQuZ2V0VG90YWxMZW5ndGgodS5wYXRoKS0oaS5fLmFycm93cy5lbmRkeCpmfHwwKSksaS5fLmFycm93c1tsK1wiUGF0aFwiXSYmeChoLHtkOnQuZ2V0U3VicGF0aCh1LnBhdGgseSxtKX0pLGRlbGV0ZSBpLl8uYXJyb3dzW2wrXCJQYXRoXCJdLGRlbGV0ZSBpLl8uYXJyb3dzW2wrXCJNYXJrZXJcIl0sZGVsZXRlIGkuXy5hcnJvd3NbbCtcImR4XCJdLGRlbGV0ZSBpLl8uYXJyb3dzW2wrXCJUeXBlXCJdLGRlbGV0ZSBpLl8uYXJyb3dzW2wrXCJTdHJpbmdcIl07Zm9yKHcgaW4gZylpZihnW2VdKHcpJiYhZ1t3XSl7dmFyIE09dC5fZy5kb2MuZ2V0RWxlbWVudEJ5SWQodyk7TSYmTS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKE0pfX19LHc9e1wiLVwiOlszLDFdLFwiLlwiOlsxLDFdLFwiLS5cIjpbMywxLDEsMV0sXCItLi5cIjpbMywxLDEsMSwxLDFdLFwiLiBcIjpbMSwzXSxcIi0gXCI6WzQsM10sXCItLVwiOls4LDNdLFwiLSAuXCI6WzQsMywxLDNdLFwiLS0uXCI6WzgsMywxLDNdLFwiLS0uLlwiOls4LDMsMSwzLDEsM119LGs9ZnVuY3Rpb24odCxlLGkpe2lmKGU9d1tyKGUpLnRvTG93ZXJDYXNlKCldKXtmb3IodmFyIG49dC5hdHRyc1tcInN0cm9rZS13aWR0aFwiXXx8XCIxXCIsYT17cm91bmQ6bixzcXVhcmU6bixidXR0OjB9W3QuYXR0cnNbXCJzdHJva2UtbGluZWNhcFwiXXx8aVtcInN0cm9rZS1saW5lY2FwXCJdXXx8MCxzPVtdLG89ZS5sZW5ndGg7by0tOylzW29dPWVbb10qbisobyUyPzE6LTEpKmE7eCh0Lm5vZGUse1wic3Ryb2tlLWRhc2hhcnJheVwiOnMuam9pbihcIixcIil9KX1lbHNlIHgodC5ub2RlLHtcInN0cm9rZS1kYXNoYXJyYXlcIjpcIm5vbmVcIn0pfSxCPWZ1bmN0aW9uKGksYSl7dmFyIGw9aS5ub2RlLHU9aS5hdHRycyxmPWwuc3R5bGUudmlzaWJpbGl0eTtsLnN0eWxlLnZpc2liaWxpdHk9XCJoaWRkZW5cIjtmb3IodmFyIGQgaW4gYSlpZihhW2VdKGQpKXtpZighdC5fYXZhaWxhYmxlQXR0cnNbZV0oZCkpY29udGludWU7dmFyIGc9YVtkXTtzd2l0Y2godVtkXT1nLGQpe2Nhc2VcImJsdXJcIjppLmJsdXIoZyk7YnJlYWs7Y2FzZVwidGl0bGVcIjp2YXIgeT1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGl0bGVcIik7aWYoeS5sZW5ndGgmJih5PXlbMF0pKXkuZmlyc3RDaGlsZC5ub2RlVmFsdWU9ZztlbHNle3k9eChcInRpdGxlXCIpO3ZhciBtPXQuX2cuZG9jLmNyZWF0ZVRleHROb2RlKGcpO3kuYXBwZW5kQ2hpbGQobSksbC5hcHBlbmRDaGlsZCh5KX1icmVhaztjYXNlXCJocmVmXCI6Y2FzZVwidGFyZ2V0XCI6dmFyIHc9bC5wYXJlbnROb2RlO2lmKFwiYVwiIT13LnRhZ05hbWUudG9Mb3dlckNhc2UoKSl7dmFyIEI9eChcImFcIik7dy5pbnNlcnRCZWZvcmUoQixsKSxCLmFwcGVuZENoaWxkKGwpLHc9Qn1cInRhcmdldFwiPT1kP3cuc2V0QXR0cmlidXRlTlMocCxcInNob3dcIixcImJsYW5rXCI9PWc/XCJuZXdcIjpnKTp3LnNldEF0dHJpYnV0ZU5TKHAsZCxnKTticmVhaztjYXNlXCJjdXJzb3JcIjpsLnN0eWxlLmN1cnNvcj1nO2JyZWFrO2Nhc2VcInRyYW5zZm9ybVwiOmkudHJhbnNmb3JtKGcpO2JyZWFrO2Nhc2VcImFycm93LXN0YXJ0XCI6XyhpLGcpO2JyZWFrO2Nhc2VcImFycm93LWVuZFwiOl8oaSxnLDEpO2JyZWFrO2Nhc2VcImNsaXAtcmVjdFwiOnZhciBDPXIoZykuc3BsaXQoaCk7aWYoND09Qy5sZW5ndGgpe2kuY2xpcCYmaS5jbGlwLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpLmNsaXAucGFyZW50Tm9kZSk7dmFyIFQ9eChcImNsaXBQYXRoXCIpLEE9eChcInJlY3RcIik7VC5pZD10LmNyZWF0ZVVVSUQoKSx4KEEse3g6Q1swXSx5OkNbMV0sd2lkdGg6Q1syXSxoZWlnaHQ6Q1szXX0pLFQuYXBwZW5kQ2hpbGQoQSksaS5wYXBlci5kZWZzLmFwcGVuZENoaWxkKFQpLHgobCx7XCJjbGlwLXBhdGhcIjpcInVybCgjXCIrVC5pZCtcIilcIn0pLGkuY2xpcD1BfWlmKCFnKXt2YXIgRT1sLmdldEF0dHJpYnV0ZShcImNsaXAtcGF0aFwiKTtpZihFKXt2YXIgTj10Ll9nLmRvYy5nZXRFbGVtZW50QnlJZChFLnJlcGxhY2UoLyhedXJsXFwoI3xcXCkkKS9nLGMpKTtOJiZOLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoTikseChsLHtcImNsaXAtcGF0aFwiOmN9KSxkZWxldGUgaS5jbGlwfX1icmVhaztjYXNlXCJwYXRoXCI6XCJwYXRoXCI9PWkudHlwZSYmKHgobCx7ZDpnP3UucGF0aD10Ll9wYXRoVG9BYnNvbHV0ZShnKTpcIk0wLDBcIn0pLGkuXy5kaXJ0eT0xLGkuXy5hcnJvd3MmJihcInN0YXJ0U3RyaW5nXCJpbiBpLl8uYXJyb3dzJiZfKGksaS5fLmFycm93cy5zdGFydFN0cmluZyksXCJlbmRTdHJpbmdcImluIGkuXy5hcnJvd3MmJl8oaSxpLl8uYXJyb3dzLmVuZFN0cmluZywxKSkpO2JyZWFrO2Nhc2VcIndpZHRoXCI6aWYobC5zZXRBdHRyaWJ1dGUoZCxnKSxpLl8uZGlydHk9MSwhdS5meClicmVhaztkPVwieFwiLGc9dS54O2Nhc2VcInhcIjp1LmZ4JiYoZz0tdS54LSh1LndpZHRofHwwKSk7Y2FzZVwicnhcIjppZihcInJ4XCI9PWQmJlwicmVjdFwiPT1pLnR5cGUpYnJlYWs7Y2FzZVwiY3hcIjpsLnNldEF0dHJpYnV0ZShkLGcpLGkucGF0dGVybiYmYihpKSxpLl8uZGlydHk9MTticmVhaztjYXNlXCJoZWlnaHRcIjppZihsLnNldEF0dHJpYnV0ZShkLGcpLGkuXy5kaXJ0eT0xLCF1LmZ5KWJyZWFrO2Q9XCJ5XCIsZz11Lnk7Y2FzZVwieVwiOnUuZnkmJihnPS11LnktKHUuaGVpZ2h0fHwwKSk7Y2FzZVwicnlcIjppZihcInJ5XCI9PWQmJlwicmVjdFwiPT1pLnR5cGUpYnJlYWs7Y2FzZVwiY3lcIjpsLnNldEF0dHJpYnV0ZShkLGcpLGkucGF0dGVybiYmYihpKSxpLl8uZGlydHk9MTticmVhaztjYXNlXCJyXCI6XCJyZWN0XCI9PWkudHlwZT94KGwse3J4Omcscnk6Z30pOmwuc2V0QXR0cmlidXRlKGQsZyksaS5fLmRpcnR5PTE7YnJlYWs7Y2FzZVwic3JjXCI6XCJpbWFnZVwiPT1pLnR5cGUmJmwuc2V0QXR0cmlidXRlTlMocCxcImhyZWZcIixnKTticmVhaztjYXNlXCJzdHJva2Utd2lkdGhcIjoxPT1pLl8uc3gmJjE9PWkuXy5zeXx8KGcvPXMobyhpLl8uc3gpLG8oaS5fLnN5KSl8fDEpLGwuc2V0QXR0cmlidXRlKGQsZyksdVtcInN0cm9rZS1kYXNoYXJyYXlcIl0mJmsoaSx1W1wic3Ryb2tlLWRhc2hhcnJheVwiXSxhKSxpLl8uYXJyb3dzJiYoXCJzdGFydFN0cmluZ1wiaW4gaS5fLmFycm93cyYmXyhpLGkuXy5hcnJvd3Muc3RhcnRTdHJpbmcpLFwiZW5kU3RyaW5nXCJpbiBpLl8uYXJyb3dzJiZfKGksaS5fLmFycm93cy5lbmRTdHJpbmcsMSkpO2JyZWFrO2Nhc2VcInN0cm9rZS1kYXNoYXJyYXlcIjprKGksZyxhKTticmVhaztjYXNlXCJmaWxsXCI6dmFyIE09cihnKS5tYXRjaCh0Ll9JU1VSTCk7aWYoTSl7VD14KFwicGF0dGVyblwiKTt2YXIgTD14KFwiaW1hZ2VcIik7VC5pZD10LmNyZWF0ZVVVSUQoKSx4KFQse3g6MCx5OjAscGF0dGVyblVuaXRzOlwidXNlclNwYWNlT25Vc2VcIixoZWlnaHQ6MSx3aWR0aDoxfSkseChMLHt4OjAseTowLFwieGxpbms6aHJlZlwiOk1bMV19KSxULmFwcGVuZENoaWxkKEwpLGZ1bmN0aW9uKGUpe3QuX3ByZWxvYWQoTVsxXSxmdW5jdGlvbigpe3ZhciB0PXRoaXMub2Zmc2V0V2lkdGgscj10aGlzLm9mZnNldEhlaWdodDt4KGUse3dpZHRoOnQsaGVpZ2h0OnJ9KSx4KEwse3dpZHRoOnQsaGVpZ2h0OnJ9KX0pfShUKSxpLnBhcGVyLmRlZnMuYXBwZW5kQ2hpbGQoVCkseChsLHtmaWxsOlwidXJsKCNcIitULmlkK1wiKVwifSksaS5wYXR0ZXJuPVQsaS5wYXR0ZXJuJiZiKGkpO2JyZWFrfXZhciB6PXQuZ2V0UkdCKGcpO2lmKHouZXJyb3Ipe2lmKChcImNpcmNsZVwiPT1pLnR5cGV8fFwiZWxsaXBzZVwiPT1pLnR5cGV8fFwiclwiIT1yKGcpLmNoYXJBdCgpKSYmdihpLGcpKXtcbmlmKFwib3BhY2l0eVwiaW4gdXx8XCJmaWxsLW9wYWNpdHlcImluIHUpe3ZhciBQPXQuX2cuZG9jLmdldEVsZW1lbnRCeUlkKGwuZ2V0QXR0cmlidXRlKFwiZmlsbFwiKS5yZXBsYWNlKC9edXJsXFwoI3xcXCkkL2csYykpO2lmKFApe3ZhciBGPVAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdG9wXCIpO3goRltGLmxlbmd0aC0xXSx7XCJzdG9wLW9wYWNpdHlcIjooXCJvcGFjaXR5XCJpbiB1P3Uub3BhY2l0eToxKSooXCJmaWxsLW9wYWNpdHlcImluIHU/dVtcImZpbGwtb3BhY2l0eVwiXToxKX0pfX11LmdyYWRpZW50PWcsdS5maWxsPVwibm9uZVwiO2JyZWFrfX1lbHNlIGRlbGV0ZSBhLmdyYWRpZW50LGRlbGV0ZSB1LmdyYWRpZW50LCF0LmlzKHUub3BhY2l0eSxcInVuZGVmaW5lZFwiKSYmdC5pcyhhLm9wYWNpdHksXCJ1bmRlZmluZWRcIikmJngobCx7b3BhY2l0eTp1Lm9wYWNpdHl9KSwhdC5pcyh1W1wiZmlsbC1vcGFjaXR5XCJdLFwidW5kZWZpbmVkXCIpJiZ0LmlzKGFbXCJmaWxsLW9wYWNpdHlcIl0sXCJ1bmRlZmluZWRcIikmJngobCx7XCJmaWxsLW9wYWNpdHlcIjp1W1wiZmlsbC1vcGFjaXR5XCJdfSk7eltlXShcIm9wYWNpdHlcIikmJngobCx7XCJmaWxsLW9wYWNpdHlcIjp6Lm9wYWNpdHk+MT96Lm9wYWNpdHkvMTAwOnoub3BhY2l0eX0pO2Nhc2VcInN0cm9rZVwiOno9dC5nZXRSR0IoZyksbC5zZXRBdHRyaWJ1dGUoZCx6LmhleCksXCJzdHJva2VcIj09ZCYmeltlXShcIm9wYWNpdHlcIikmJngobCx7XCJzdHJva2Utb3BhY2l0eVwiOnoub3BhY2l0eT4xP3oub3BhY2l0eS8xMDA6ei5vcGFjaXR5fSksXCJzdHJva2VcIj09ZCYmaS5fLmFycm93cyYmKFwic3RhcnRTdHJpbmdcImluIGkuXy5hcnJvd3MmJl8oaSxpLl8uYXJyb3dzLnN0YXJ0U3RyaW5nKSxcImVuZFN0cmluZ1wiaW4gaS5fLmFycm93cyYmXyhpLGkuXy5hcnJvd3MuZW5kU3RyaW5nLDEpKTticmVhaztjYXNlXCJncmFkaWVudFwiOihcImNpcmNsZVwiPT1pLnR5cGV8fFwiZWxsaXBzZVwiPT1pLnR5cGV8fFwiclwiIT1yKGcpLmNoYXJBdCgpKSYmdihpLGcpO2JyZWFrO2Nhc2VcIm9wYWNpdHlcIjp1LmdyYWRpZW50JiYhdVtlXShcInN0cm9rZS1vcGFjaXR5XCIpJiZ4KGwse1wic3Ryb2tlLW9wYWNpdHlcIjpnPjE/Zy8xMDA6Z30pO2Nhc2VcImZpbGwtb3BhY2l0eVwiOmlmKHUuZ3JhZGllbnQpe1A9dC5fZy5kb2MuZ2V0RWxlbWVudEJ5SWQobC5nZXRBdHRyaWJ1dGUoXCJmaWxsXCIpLnJlcGxhY2UoL151cmxcXCgjfFxcKSQvZyxjKSksUCYmKEY9UC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0b3BcIikseChGW0YubGVuZ3RoLTFdLHtcInN0b3Atb3BhY2l0eVwiOmd9KSk7YnJlYWt9ZGVmYXVsdDpcImZvbnQtc2l6ZVwiPT1kJiYoZz1uKGcsMTApK1wicHhcIik7dmFyIFI9ZC5yZXBsYWNlKC8oXFwtLikvZyxmdW5jdGlvbih0KXtyZXR1cm4gdC5zdWJzdHJpbmcoMSkudG9VcHBlckNhc2UoKX0pO2wuc3R5bGVbUl09ZyxpLl8uZGlydHk9MSxsLnNldEF0dHJpYnV0ZShkLGcpfX1TKGksYSksbC5zdHlsZS52aXNpYmlsaXR5PWZ9LEM9MS4yLFM9ZnVuY3Rpb24oaSxhKXtpZihcInRleHRcIj09aS50eXBlJiYoYVtlXShcInRleHRcIil8fGFbZV0oXCJmb250XCIpfHxhW2VdKFwiZm9udC1zaXplXCIpfHxhW2VdKFwieFwiKXx8YVtlXShcInlcIikpKXt2YXIgcz1pLmF0dHJzLG89aS5ub2RlLGw9by5maXJzdENoaWxkP24odC5fZy5kb2MuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShvLmZpcnN0Q2hpbGQsYykuZ2V0UHJvcGVydHlWYWx1ZShcImZvbnQtc2l6ZVwiKSwxMCk6MTA7aWYoYVtlXShcInRleHRcIikpe2ZvcihzLnRleHQ9YS50ZXh0O28uZmlyc3RDaGlsZDspby5yZW1vdmVDaGlsZChvLmZpcnN0Q2hpbGQpO2Zvcih2YXIgaD1yKGEudGV4dCkuc3BsaXQoXCJcXG5cIiksdT1bXSxmLHA9MCxkPWgubGVuZ3RoO2Q+cDtwKyspZj14KFwidHNwYW5cIikscCYmeChmLHtkeTpsKkMseDpzLnh9KSxmLmFwcGVuZENoaWxkKHQuX2cuZG9jLmNyZWF0ZVRleHROb2RlKGhbcF0pKSxvLmFwcGVuZENoaWxkKGYpLHVbcF09Zn1lbHNlIGZvcih1PW8uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0c3BhblwiKSxwPTAsZD11Lmxlbmd0aDtkPnA7cCsrKXA/eCh1W3BdLHtkeTpsKkMseDpzLnh9KTp4KHVbMF0se2R5OjB9KTt4KG8se3g6cy54LHk6cy55fSksaS5fLmRpcnR5PTE7dmFyIGc9aS5fZ2V0QkJveCgpLHY9cy55LShnLnkrZy5oZWlnaHQvMik7diYmdC5pcyh2LFwiZmluaXRlXCIpJiZ4KHVbMF0se2R5OnZ9KX19LFQ9ZnVuY3Rpb24odCl7cmV0dXJuIHQucGFyZW50Tm9kZSYmXCJhXCI9PT10LnBhcmVudE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpP3QucGFyZW50Tm9kZTp0fSxBPWZ1bmN0aW9uKGUscil7dmFyIGk9MCxuPTA7dGhpc1swXT10aGlzLm5vZGU9ZSxlLnJhcGhhZWw9ITAsdGhpcy5pZD10Ll9vaWQrKyxlLnJhcGhhZWxpZD10aGlzLmlkLHRoaXMubWF0cml4PXQubWF0cml4KCksdGhpcy5yZWFsUGF0aD1udWxsLHRoaXMucGFwZXI9cix0aGlzLmF0dHJzPXRoaXMuYXR0cnN8fHt9LHRoaXMuXz17dHJhbnNmb3JtOltdLHN4OjEsc3k6MSxkZWc6MCxkeDowLGR5OjAsZGlydHk6MX0sIXIuYm90dG9tJiYoci5ib3R0b209dGhpcyksdGhpcy5wcmV2PXIudG9wLHIudG9wJiYoci50b3AubmV4dD10aGlzKSxyLnRvcD10aGlzLHRoaXMubmV4dD1udWxsfSxFPXQuZWw7QS5wcm90b3R5cGU9RSxFLmNvbnN0cnVjdG9yPUEsdC5fZW5naW5lLnBhdGg9ZnVuY3Rpb24odCxlKXt2YXIgcj14KFwicGF0aFwiKTtlLmNhbnZhcyYmZS5jYW52YXMuYXBwZW5kQ2hpbGQocik7dmFyIGk9bmV3IEEocixlKTtyZXR1cm4gaS50eXBlPVwicGF0aFwiLEIoaSx7ZmlsbDpcIm5vbmVcIixzdHJva2U6XCIjMDAwXCIscGF0aDp0fSksaX0sRS5yb3RhdGU9ZnVuY3Rpb24odCxlLG4pe2lmKHRoaXMucmVtb3ZlZClyZXR1cm4gdGhpcztpZih0PXIodCkuc3BsaXQoaCksdC5sZW5ndGgtMSYmKGU9aSh0WzFdKSxuPWkodFsyXSkpLHQ9aSh0WzBdKSxudWxsPT1uJiYoZT1uKSxudWxsPT1lfHxudWxsPT1uKXt2YXIgYT10aGlzLmdldEJCb3goMSk7ZT1hLngrYS53aWR0aC8yLG49YS55K2EuaGVpZ2h0LzJ9cmV0dXJuIHRoaXMudHJhbnNmb3JtKHRoaXMuXy50cmFuc2Zvcm0uY29uY2F0KFtbXCJyXCIsdCxlLG5dXSkpLHRoaXN9LEUuc2NhbGU9ZnVuY3Rpb24odCxlLG4sYSl7aWYodGhpcy5yZW1vdmVkKXJldHVybiB0aGlzO2lmKHQ9cih0KS5zcGxpdChoKSx0Lmxlbmd0aC0xJiYoZT1pKHRbMV0pLG49aSh0WzJdKSxhPWkodFszXSkpLHQ9aSh0WzBdKSxudWxsPT1lJiYoZT10KSxudWxsPT1hJiYobj1hKSxudWxsPT1ufHxudWxsPT1hKXZhciBzPXRoaXMuZ2V0QkJveCgxKTtyZXR1cm4gbj1udWxsPT1uP3MueCtzLndpZHRoLzI6bixhPW51bGw9PWE/cy55K3MuaGVpZ2h0LzI6YSx0aGlzLnRyYW5zZm9ybSh0aGlzLl8udHJhbnNmb3JtLmNvbmNhdChbW1wic1wiLHQsZSxuLGFdXSkpLHRoaXN9LEUudHJhbnNsYXRlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMucmVtb3ZlZD90aGlzOih0PXIodCkuc3BsaXQoaCksdC5sZW5ndGgtMSYmKGU9aSh0WzFdKSksdD1pKHRbMF0pfHwwLGU9K2V8fDAsdGhpcy50cmFuc2Zvcm0odGhpcy5fLnRyYW5zZm9ybS5jb25jYXQoW1tcInRcIix0LGVdXSkpLHRoaXMpfSxFLnRyYW5zZm9ybT1mdW5jdGlvbihyKXt2YXIgaT10aGlzLl87aWYobnVsbD09cilyZXR1cm4gaS50cmFuc2Zvcm07aWYodC5fZXh0cmFjdFRyYW5zZm9ybSh0aGlzLHIpLHRoaXMuY2xpcCYmeCh0aGlzLmNsaXAse3RyYW5zZm9ybTp0aGlzLm1hdHJpeC5pbnZlcnQoKX0pLHRoaXMucGF0dGVybiYmYih0aGlzKSx0aGlzLm5vZGUmJngodGhpcy5ub2RlLHt0cmFuc2Zvcm06dGhpcy5tYXRyaXh9KSwxIT1pLnN4fHwxIT1pLnN5KXt2YXIgbj10aGlzLmF0dHJzW2VdKFwic3Ryb2tlLXdpZHRoXCIpP3RoaXMuYXR0cnNbXCJzdHJva2Utd2lkdGhcIl06MTt0aGlzLmF0dHIoe1wic3Ryb2tlLXdpZHRoXCI6bn0pfXJldHVybiBpLnRyYW5zZm9ybT10aGlzLm1hdHJpeC50b1RyYW5zZm9ybVN0cmluZygpLHRoaXN9LEUuaGlkZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlbW92ZWR8fCh0aGlzLm5vZGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIiksdGhpc30sRS5zaG93PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVtb3ZlZHx8KHRoaXMubm9kZS5zdHlsZS5kaXNwbGF5PVwiXCIpLHRoaXN9LEUucmVtb3ZlPWZ1bmN0aW9uKCl7dmFyIGU9VCh0aGlzLm5vZGUpO2lmKCF0aGlzLnJlbW92ZWQmJmUucGFyZW50Tm9kZSl7dmFyIHI9dGhpcy5wYXBlcjtyLl9fc2V0X18mJnIuX19zZXRfXy5leGNsdWRlKHRoaXMpLHUudW5iaW5kKFwicmFwaGFlbC4qLiouXCIrdGhpcy5pZCksdGhpcy5ncmFkaWVudCYmci5kZWZzLnJlbW92ZUNoaWxkKHRoaXMuZ3JhZGllbnQpLHQuX3RlYXIodGhpcyxyKSxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSksdGhpcy5yZW1vdmVEYXRhKCk7Zm9yKHZhciBpIGluIHRoaXMpdGhpc1tpXT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzW2ldP3QuX3JlbW92ZWRGYWN0b3J5KGkpOm51bGw7dGhpcy5yZW1vdmVkPSEwfX0sRS5fZ2V0QkJveD1mdW5jdGlvbigpe2lmKFwibm9uZVwiPT10aGlzLm5vZGUuc3R5bGUuZGlzcGxheSl7dGhpcy5zaG93KCk7dmFyIHQ9ITB9dmFyIGU9ITEscjt0aGlzLnBhcGVyLmNhbnZhcy5wYXJlbnRFbGVtZW50P3I9dGhpcy5wYXBlci5jYW52YXMucGFyZW50RWxlbWVudC5zdHlsZTp0aGlzLnBhcGVyLmNhbnZhcy5wYXJlbnROb2RlJiYocj10aGlzLnBhcGVyLmNhbnZhcy5wYXJlbnROb2RlLnN0eWxlKSxyJiZcIm5vbmVcIj09ci5kaXNwbGF5JiYoZT0hMCxyLmRpc3BsYXk9XCJcIik7dmFyIGk9e307dHJ5e2k9dGhpcy5ub2RlLmdldEJCb3goKX1jYXRjaChuKXtpPXt4OnRoaXMubm9kZS5jbGllbnRMZWZ0LHk6dGhpcy5ub2RlLmNsaWVudFRvcCx3aWR0aDp0aGlzLm5vZGUuY2xpZW50V2lkdGgsaGVpZ2h0OnRoaXMubm9kZS5jbGllbnRIZWlnaHR9fWZpbmFsbHl7aT1pfHx7fSxlJiYoci5kaXNwbGF5PVwibm9uZVwiKX1yZXR1cm4gdCYmdGhpcy5oaWRlKCksaX0sRS5hdHRyPWZ1bmN0aW9uKHIsaSl7aWYodGhpcy5yZW1vdmVkKXJldHVybiB0aGlzO2lmKG51bGw9PXIpe3ZhciBuPXt9O2Zvcih2YXIgYSBpbiB0aGlzLmF0dHJzKXRoaXMuYXR0cnNbZV0oYSkmJihuW2FdPXRoaXMuYXR0cnNbYV0pO3JldHVybiBuLmdyYWRpZW50JiZcIm5vbmVcIj09bi5maWxsJiYobi5maWxsPW4uZ3JhZGllbnQpJiZkZWxldGUgbi5ncmFkaWVudCxuLnRyYW5zZm9ybT10aGlzLl8udHJhbnNmb3JtLG59aWYobnVsbD09aSYmdC5pcyhyLFwic3RyaW5nXCIpKXtpZihcImZpbGxcIj09ciYmXCJub25lXCI9PXRoaXMuYXR0cnMuZmlsbCYmdGhpcy5hdHRycy5ncmFkaWVudClyZXR1cm4gdGhpcy5hdHRycy5ncmFkaWVudDtpZihcInRyYW5zZm9ybVwiPT1yKXJldHVybiB0aGlzLl8udHJhbnNmb3JtO2Zvcih2YXIgcz1yLnNwbGl0KGgpLG89e30sbD0wLGM9cy5sZW5ndGg7Yz5sO2wrKylyPXNbbF0sciBpbiB0aGlzLmF0dHJzP29bcl09dGhpcy5hdHRyc1tyXTp0LmlzKHRoaXMucGFwZXIuY3VzdG9tQXR0cmlidXRlc1tyXSxcImZ1bmN0aW9uXCIpP29bcl09dGhpcy5wYXBlci5jdXN0b21BdHRyaWJ1dGVzW3JdLmRlZjpvW3JdPXQuX2F2YWlsYWJsZUF0dHJzW3JdO3JldHVybiBjLTE/bzpvW3NbMF1dfWlmKG51bGw9PWkmJnQuaXMocixcImFycmF5XCIpKXtmb3Iobz17fSxsPTAsYz1yLmxlbmd0aDtjPmw7bCsrKW9bcltsXV09dGhpcy5hdHRyKHJbbF0pO3JldHVybiBvfWlmKG51bGwhPWkpe3ZhciBmPXt9O2Zbcl09aX1lbHNlIG51bGwhPXImJnQuaXMocixcIm9iamVjdFwiKSYmKGY9cik7Zm9yKHZhciBwIGluIGYpdShcInJhcGhhZWwuYXR0ci5cIitwK1wiLlwiK3RoaXMuaWQsdGhpcyxmW3BdKTtmb3IocCBpbiB0aGlzLnBhcGVyLmN1c3RvbUF0dHJpYnV0ZXMpaWYodGhpcy5wYXBlci5jdXN0b21BdHRyaWJ1dGVzW2VdKHApJiZmW2VdKHApJiZ0LmlzKHRoaXMucGFwZXIuY3VzdG9tQXR0cmlidXRlc1twXSxcImZ1bmN0aW9uXCIpKXt2YXIgZD10aGlzLnBhcGVyLmN1c3RvbUF0dHJpYnV0ZXNbcF0uYXBwbHkodGhpcyxbXS5jb25jYXQoZltwXSkpO3RoaXMuYXR0cnNbcF09ZltwXTtmb3IodmFyIGcgaW4gZClkW2VdKGcpJiYoZltnXT1kW2ddKX1yZXR1cm4gQih0aGlzLGYpLHRoaXN9LEUudG9Gcm9udD1mdW5jdGlvbigpe2lmKHRoaXMucmVtb3ZlZClyZXR1cm4gdGhpczt2YXIgZT1UKHRoaXMubm9kZSk7ZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGUpO3ZhciByPXRoaXMucGFwZXI7cmV0dXJuIHIudG9wIT10aGlzJiZ0Ll90b2Zyb250KHRoaXMsciksdGhpc30sRS50b0JhY2s9ZnVuY3Rpb24oKXtpZih0aGlzLnJlbW92ZWQpcmV0dXJuIHRoaXM7dmFyIGU9VCh0aGlzLm5vZGUpLHI9ZS5wYXJlbnROb2RlO3IuaW5zZXJ0QmVmb3JlKGUsci5maXJzdENoaWxkKSx0Ll90b2JhY2sodGhpcyx0aGlzLnBhcGVyKTt2YXIgaT10aGlzLnBhcGVyO3JldHVybiB0aGlzfSxFLmluc2VydEFmdGVyPWZ1bmN0aW9uKGUpe2lmKHRoaXMucmVtb3ZlZHx8IWUpcmV0dXJuIHRoaXM7dmFyIHI9VCh0aGlzLm5vZGUpLGk9VChlLm5vZGV8fGVbZS5sZW5ndGgtMV0ubm9kZSk7cmV0dXJuIGkubmV4dFNpYmxpbmc/aS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyLGkubmV4dFNpYmxpbmcpOmkucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChyKSx0Ll9pbnNlcnRhZnRlcih0aGlzLGUsdGhpcy5wYXBlciksdGhpc30sRS5pbnNlcnRCZWZvcmU9ZnVuY3Rpb24oZSl7aWYodGhpcy5yZW1vdmVkfHwhZSlyZXR1cm4gdGhpczt2YXIgcj1UKHRoaXMubm9kZSksaT1UKGUubm9kZXx8ZVswXS5ub2RlKTtyZXR1cm4gaS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyLGkpLHQuX2luc2VydGJlZm9yZSh0aGlzLGUsdGhpcy5wYXBlciksdGhpc30sRS5ibHVyPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXM7aWYoMCE9PStlKXt2YXIgaT14KFwiZmlsdGVyXCIpLG49eChcImZlR2F1c3NpYW5CbHVyXCIpO3IuYXR0cnMuYmx1cj1lLGkuaWQ9dC5jcmVhdGVVVUlEKCkseChuLHtzdGREZXZpYXRpb246K2V8fDEuNX0pLGkuYXBwZW5kQ2hpbGQobiksci5wYXBlci5kZWZzLmFwcGVuZENoaWxkKGkpLHIuX2JsdXI9aSx4KHIubm9kZSx7ZmlsdGVyOlwidXJsKCNcIitpLmlkK1wiKVwifSl9ZWxzZSByLl9ibHVyJiYoci5fYmx1ci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHIuX2JsdXIpLGRlbGV0ZSByLl9ibHVyLGRlbGV0ZSByLmF0dHJzLmJsdXIpLHIubm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJmaWx0ZXJcIik7cmV0dXJuIHJ9LHQuX2VuZ2luZS5jaXJjbGU9ZnVuY3Rpb24odCxlLHIsaSl7dmFyIG49eChcImNpcmNsZVwiKTt0LmNhbnZhcyYmdC5jYW52YXMuYXBwZW5kQ2hpbGQobik7dmFyIGE9bmV3IEEobix0KTtyZXR1cm4gYS5hdHRycz17Y3g6ZSxjeTpyLHI6aSxmaWxsOlwibm9uZVwiLHN0cm9rZTpcIiMwMDBcIn0sYS50eXBlPVwiY2lyY2xlXCIseChuLGEuYXR0cnMpLGF9LHQuX2VuZ2luZS5yZWN0PWZ1bmN0aW9uKHQsZSxyLGksbixhKXt2YXIgcz14KFwicmVjdFwiKTt0LmNhbnZhcyYmdC5jYW52YXMuYXBwZW5kQ2hpbGQocyk7dmFyIG89bmV3IEEocyx0KTtyZXR1cm4gby5hdHRycz17eDplLHk6cix3aWR0aDppLGhlaWdodDpuLHJ4OmF8fDAscnk6YXx8MCxmaWxsOlwibm9uZVwiLHN0cm9rZTpcIiMwMDBcIn0sby50eXBlPVwicmVjdFwiLHgocyxvLmF0dHJzKSxvfSx0Ll9lbmdpbmUuZWxsaXBzZT1mdW5jdGlvbih0LGUscixpLG4pe3ZhciBhPXgoXCJlbGxpcHNlXCIpO3QuY2FudmFzJiZ0LmNhbnZhcy5hcHBlbmRDaGlsZChhKTt2YXIgcz1uZXcgQShhLHQpO3JldHVybiBzLmF0dHJzPXtjeDplLGN5OnIscng6aSxyeTpuLGZpbGw6XCJub25lXCIsc3Ryb2tlOlwiIzAwMFwifSxzLnR5cGU9XCJlbGxpcHNlXCIseChhLHMuYXR0cnMpLHN9LHQuX2VuZ2luZS5pbWFnZT1mdW5jdGlvbih0LGUscixpLG4sYSl7dmFyIHM9eChcImltYWdlXCIpO3gocyx7eDpyLHk6aSx3aWR0aDpuLGhlaWdodDphLHByZXNlcnZlQXNwZWN0UmF0aW86XCJub25lXCJ9KSxzLnNldEF0dHJpYnV0ZU5TKHAsXCJocmVmXCIsZSksdC5jYW52YXMmJnQuY2FudmFzLmFwcGVuZENoaWxkKHMpO3ZhciBvPW5ldyBBKHMsdCk7cmV0dXJuIG8uYXR0cnM9e3g6cix5Omksd2lkdGg6bixoZWlnaHQ6YSxzcmM6ZX0sby50eXBlPVwiaW1hZ2VcIixvfSx0Ll9lbmdpbmUudGV4dD1mdW5jdGlvbihlLHIsaSxuKXt2YXIgYT14KFwidGV4dFwiKTtlLmNhbnZhcyYmZS5jYW52YXMuYXBwZW5kQ2hpbGQoYSk7dmFyIHM9bmV3IEEoYSxlKTtyZXR1cm4gcy5hdHRycz17eDpyLHk6aSxcInRleHQtYW5jaG9yXCI6XCJtaWRkbGVcIix0ZXh0Om4sXCJmb250LWZhbWlseVwiOnQuX2F2YWlsYWJsZUF0dHJzW1wiZm9udC1mYW1pbHlcIl0sXCJmb250LXNpemVcIjp0Ll9hdmFpbGFibGVBdHRyc1tcImZvbnQtc2l6ZVwiXSxzdHJva2U6XCJub25lXCIsZmlsbDpcIiMwMDBcIn0scy50eXBlPVwidGV4dFwiLEIocyxzLmF0dHJzKSxzfSx0Ll9lbmdpbmUuc2V0U2l6ZT1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLndpZHRoPXR8fHRoaXMud2lkdGgsdGhpcy5oZWlnaHQ9ZXx8dGhpcy5oZWlnaHQsdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKFwid2lkdGhcIix0aGlzLndpZHRoKSx0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIix0aGlzLmhlaWdodCksdGhpcy5fdmlld0JveCYmdGhpcy5zZXRWaWV3Qm94LmFwcGx5KHRoaXMsdGhpcy5fdmlld0JveCksdGhpc30sdC5fZW5naW5lLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciBlPXQuX2dldENvbnRhaW5lci5hcHBseSgwLGFyZ3VtZW50cykscj1lJiZlLmNvbnRhaW5lcixpPWUueCxuPWUueSxhPWUud2lkdGgscz1lLmhlaWdodDtpZighcil0aHJvdyBuZXcgRXJyb3IoXCJTVkcgY29udGFpbmVyIG5vdCBmb3VuZC5cIik7dmFyIG89eChcInN2Z1wiKSxsPVwib3ZlcmZsb3c6aGlkZGVuO1wiLGg7cmV0dXJuIGk9aXx8MCxuPW58fDAsYT1hfHw1MTIscz1zfHwzNDIseChvLHtoZWlnaHQ6cyx2ZXJzaW9uOjEuMSx3aWR0aDphLHhtbG5zOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInhtbG5zOnhsaW5rXCI6XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJ9KSwxPT1yPyhvLnN0eWxlLmNzc1RleHQ9bCtcInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6XCIraStcInB4O3RvcDpcIituK1wicHhcIix0Ll9nLmRvYy5ib2R5LmFwcGVuZENoaWxkKG8pLGg9MSk6KG8uc3R5bGUuY3NzVGV4dD1sK1wicG9zaXRpb246cmVsYXRpdmVcIixyLmZpcnN0Q2hpbGQ/ci5pbnNlcnRCZWZvcmUobyxyLmZpcnN0Q2hpbGQpOnIuYXBwZW5kQ2hpbGQobykpLHI9bmV3IHQuX1BhcGVyLHIud2lkdGg9YSxyLmhlaWdodD1zLHIuY2FudmFzPW8sci5jbGVhcigpLHIuX2xlZnQ9ci5fdG9wPTAsaCYmKHIucmVuZGVyZml4PWZ1bmN0aW9uKCl7fSksci5yZW5kZXJmaXgoKSxyfSx0Ll9lbmdpbmUuc2V0Vmlld0JveD1mdW5jdGlvbih0LGUscixpLG4pe3UoXCJyYXBoYWVsLnNldFZpZXdCb3hcIix0aGlzLHRoaXMuX3ZpZXdCb3gsW3QsZSxyLGksbl0pO3ZhciBhPXRoaXMuZ2V0U2l6ZSgpLG89cyhyL2Eud2lkdGgsaS9hLmhlaWdodCksbD10aGlzLnRvcCxoPW4/XCJ4TWlkWU1pZCBtZWV0XCI6XCJ4TWluWU1pblwiLGMscDtmb3IobnVsbD09dD8odGhpcy5fdmJTaXplJiYobz0xKSxkZWxldGUgdGhpcy5fdmJTaXplLGM9XCIwIDAgXCIrdGhpcy53aWR0aCtmK3RoaXMuaGVpZ2h0KToodGhpcy5fdmJTaXplPW8sYz10K2YrZStmK3IrZitpKSx4KHRoaXMuY2FudmFzLHt2aWV3Qm94OmMscHJlc2VydmVBc3BlY3RSYXRpbzpofSk7byYmbDspcD1cInN0cm9rZS13aWR0aFwiaW4gbC5hdHRycz9sLmF0dHJzW1wic3Ryb2tlLXdpZHRoXCJdOjEsbC5hdHRyKHtcInN0cm9rZS13aWR0aFwiOnB9KSxsLl8uZGlydHk9MSxsLl8uZGlydHlUPTEsbD1sLnByZXY7cmV0dXJuIHRoaXMuX3ZpZXdCb3g9W3QsZSxyLGksISFuXSx0aGlzfSx0LnByb3RvdHlwZS5yZW5kZXJmaXg9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLmNhbnZhcyxlPXQuc3R5bGUscjt0cnl7cj10LmdldFNjcmVlbkNUTSgpfHx0LmNyZWF0ZVNWR01hdHJpeCgpfWNhdGNoKGkpe3I9dC5jcmVhdGVTVkdNYXRyaXgoKX12YXIgbj0tci5lJTEsYT0tci5mJTE7KG58fGEpJiYobiYmKHRoaXMuX2xlZnQ9KHRoaXMuX2xlZnQrbiklMSxlLmxlZnQ9dGhpcy5fbGVmdCtcInB4XCIpLGEmJih0aGlzLl90b3A9KHRoaXMuX3RvcCthKSUxLGUudG9wPXRoaXMuX3RvcCtcInB4XCIpKX0sdC5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0LmV2ZShcInJhcGhhZWwuY2xlYXJcIix0aGlzKTtmb3IodmFyIGU9dGhpcy5jYW52YXM7ZS5maXJzdENoaWxkOyllLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7dGhpcy5ib3R0b209dGhpcy50b3A9bnVsbCwodGhpcy5kZXNjPXgoXCJkZXNjXCIpKS5hcHBlbmRDaGlsZCh0Ll9nLmRvYy5jcmVhdGVUZXh0Tm9kZShcIkNyZWF0ZWQgd2l0aCBSYXBoYcOrbCBcIit0LnZlcnNpb24pKSxlLmFwcGVuZENoaWxkKHRoaXMuZGVzYyksZS5hcHBlbmRDaGlsZCh0aGlzLmRlZnM9eChcImRlZnNcIikpfSx0LnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oKXt1KFwicmFwaGFlbC5yZW1vdmVcIix0aGlzKSx0aGlzLmNhbnZhcy5wYXJlbnROb2RlJiZ0aGlzLmNhbnZhcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtmb3IodmFyIGUgaW4gdGhpcyl0aGlzW2VdPVwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXNbZV0/dC5fcmVtb3ZlZEZhY3RvcnkoZSk6bnVsbH07dmFyIE49dC5zdDtmb3IodmFyIE0gaW4gRSlFW2VdKE0pJiYhTltlXShNKSYmKE5bTV09ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzO3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24ocil7clt0XS5hcHBseShyLGUpfSl9fShNKSl9fS5hcHBseShlLGkpLCEodm9pZCAwIT09biYmKHQuZXhwb3J0cz1uKSl9LGZ1bmN0aW9uKHQsZSxyKXt2YXIgaSxuO2k9W3IoMSldLG49ZnVuY3Rpb24odCl7aWYoIXR8fHQudm1sKXt2YXIgZT1cImhhc093blByb3BlcnR5XCIscj1TdHJpbmcsaT1wYXJzZUZsb2F0LG49TWF0aCxhPW4ucm91bmQscz1uLm1heCxvPW4ubWluLGw9bi5hYnMsaD1cImZpbGxcIix1PS9bLCBdKy8sYz10LmV2ZSxmPVwiIHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdFwiLHA9XCIgXCIsZD1cIlwiLGc9e006XCJtXCIsTDpcImxcIixDOlwiY1wiLFo6XCJ4XCIsbTpcInRcIixsOlwiclwiLGM6XCJ2XCIsejpcInhcIn0seD0vKFtjbG16XSksPyhbXmNsbXpdKikvZ2ksdj0vIHByb2dpZDpcXFMrQmx1clxcKFteXFwpXStcXCkvZyx5PS8tP1teLFxccy1dKy9nLG09XCJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2hlaWdodDoxcHg7YmVoYXZpb3I6dXJsKCNkZWZhdWx0I1ZNTClcIixiPTIxNjAwLF89e3BhdGg6MSxyZWN0OjEsaW1hZ2U6MX0sdz17Y2lyY2xlOjEsZWxsaXBzZToxfSxrPWZ1bmN0aW9uKGUpe3ZhciBpPS9bYWhxc3R2XS9naSxuPXQuX3BhdGhUb0Fic29sdXRlO2lmKHIoZSkubWF0Y2goaSkmJihuPXQuX3BhdGgyY3VydmUpLGk9L1tjbG16XS9nLG49PXQuX3BhdGhUb0Fic29sdXRlJiYhcihlKS5tYXRjaChpKSl7dmFyIHM9cihlKS5yZXBsYWNlKHgsZnVuY3Rpb24odCxlLHIpe3ZhciBpPVtdLG49XCJtXCI9PWUudG9Mb3dlckNhc2UoKSxzPWdbZV07cmV0dXJuIHIucmVwbGFjZSh5LGZ1bmN0aW9uKHQpe24mJjI9PWkubGVuZ3RoJiYocys9aStnW1wibVwiPT1lP1wibFwiOlwiTFwiXSxpPVtdKSxpLnB1c2goYSh0KmIpKX0pLHMraX0pO3JldHVybiBzfXZhciBvPW4oZSksbCxoO3M9W107Zm9yKHZhciB1PTAsYz1vLmxlbmd0aDtjPnU7dSsrKXtsPW9bdV0saD1vW3VdWzBdLnRvTG93ZXJDYXNlKCksXCJ6XCI9PWgmJihoPVwieFwiKTtmb3IodmFyIGY9MSx2PWwubGVuZ3RoO3Y+ZjtmKyspaCs9YShsW2ZdKmIpKyhmIT12LTE/XCIsXCI6ZCk7cy5wdXNoKGgpfXJldHVybiBzLmpvaW4ocCl9LEI9ZnVuY3Rpb24oZSxyLGkpe3ZhciBuPXQubWF0cml4KCk7cmV0dXJuIG4ucm90YXRlKC1lLC41LC41KSx7ZHg6bi54KHIsaSksZHk6bi55KHIsaSl9fSxDPWZ1bmN0aW9uKHQsZSxyLGksbixhKXt2YXIgcz10Ll8sbz10Lm1hdHJpeCx1PXMuZmlsbHBvcyxjPXQubm9kZSxmPWMuc3R5bGUsZD0xLGc9XCJcIix4LHY9Yi9lLHk9Yi9yO2lmKGYudmlzaWJpbGl0eT1cImhpZGRlblwiLGUmJnIpe2lmKGMuY29vcmRzaXplPWwodikrcCtsKHkpLGYucm90YXRpb249YSooMD5lKnI/LTE6MSksYSl7dmFyIG09QihhLGksbik7aT1tLmR4LG49bS5keX1pZigwPmUmJihnKz1cInhcIiksMD5yJiYoZys9XCIgeVwiKSYmKGQ9LTEpLGYuZmxpcD1nLGMuY29vcmRvcmlnaW49aSotditwK24qLXksdXx8cy5maWxsc2l6ZSl7dmFyIF89Yy5nZXRFbGVtZW50c0J5VGFnTmFtZShoKTtfPV8mJl9bMF0sYy5yZW1vdmVDaGlsZChfKSx1JiYobT1CKGEsby54KHVbMF0sdVsxXSksby55KHVbMF0sdVsxXSkpLF8ucG9zaXRpb249bS5keCpkK3ArbS5keSpkKSxzLmZpbGxzaXplJiYoXy5zaXplPXMuZmlsbHNpemVbMF0qbChlKStwK3MuZmlsbHNpemVbMV0qbChyKSksYy5hcHBlbmRDaGlsZChfKX1mLnZpc2liaWxpdHk9XCJ2aXNpYmxlXCJ9fTt0LnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJZb3VyIGJyb3dzZXIgZG9lc27igJl0IHN1cHBvcnQgU1ZHLiBGYWxsaW5nIGRvd24gdG8gVk1MLlxcbllvdSBhcmUgcnVubmluZyBSYXBoYcOrbCBcIit0aGlzLnZlcnNpb259O3ZhciBTPWZ1bmN0aW9uKHQsZSxpKXtmb3IodmFyIG49cihlKS50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiLVwiKSxhPWk/XCJlbmRcIjpcInN0YXJ0XCIscz1uLmxlbmd0aCxvPVwiY2xhc3NpY1wiLGw9XCJtZWRpdW1cIixoPVwibWVkaXVtXCI7cy0tOylzd2l0Y2gobltzXSl7Y2FzZVwiYmxvY2tcIjpjYXNlXCJjbGFzc2ljXCI6Y2FzZVwib3ZhbFwiOmNhc2VcImRpYW1vbmRcIjpjYXNlXCJvcGVuXCI6Y2FzZVwibm9uZVwiOm89bltzXTticmVhaztjYXNlXCJ3aWRlXCI6Y2FzZVwibmFycm93XCI6aD1uW3NdO2JyZWFrO2Nhc2VcImxvbmdcIjpjYXNlXCJzaG9ydFwiOmw9bltzXX12YXIgdT10Lm5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHJva2VcIilbMF07dVthK1wiYXJyb3dcIl09byx1W2ErXCJhcnJvd2xlbmd0aFwiXT1sLHVbYStcImFycm93d2lkdGhcIl09aH0sVD1mdW5jdGlvbihuLGwpe24uYXR0cnM9bi5hdHRyc3x8e307dmFyIGM9bi5ub2RlLGY9bi5hdHRycyxnPWMuc3R5bGUseCx2PV9bbi50eXBlXSYmKGwueCE9Zi54fHxsLnkhPWYueXx8bC53aWR0aCE9Zi53aWR0aHx8bC5oZWlnaHQhPWYuaGVpZ2h0fHxsLmN4IT1mLmN4fHxsLmN5IT1mLmN5fHxsLnJ4IT1mLnJ4fHxsLnJ5IT1mLnJ5fHxsLnIhPWYucikseT13W24udHlwZV0mJihmLmN4IT1sLmN4fHxmLmN5IT1sLmN5fHxmLnIhPWwucnx8Zi5yeCE9bC5yeHx8Zi5yeSE9bC5yeSksbT1uO2Zvcih2YXIgQiBpbiBsKWxbZV0oQikmJihmW0JdPWxbQl0pO2lmKHYmJihmLnBhdGg9dC5fZ2V0UGF0aFtuLnR5cGVdKG4pLG4uXy5kaXJ0eT0xKSxsLmhyZWYmJihjLmhyZWY9bC5ocmVmKSxsLnRpdGxlJiYoYy50aXRsZT1sLnRpdGxlKSxsLnRhcmdldCYmKGMudGFyZ2V0PWwudGFyZ2V0KSxsLmN1cnNvciYmKGcuY3Vyc29yPWwuY3Vyc29yKSxcImJsdXJcImluIGwmJm4uYmx1cihsLmJsdXIpLChsLnBhdGgmJlwicGF0aFwiPT1uLnR5cGV8fHYpJiYoYy5wYXRoPWsofnIoZi5wYXRoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJyXCIpP3QuX3BhdGhUb0Fic29sdXRlKGYucGF0aCk6Zi5wYXRoKSxuLl8uZGlydHk9MSxcImltYWdlXCI9PW4udHlwZSYmKG4uXy5maWxscG9zPVtmLngsZi55XSxuLl8uZmlsbHNpemU9W2Yud2lkdGgsZi5oZWlnaHRdLEMobiwxLDEsMCwwLDApKSksXCJ0cmFuc2Zvcm1cImluIGwmJm4udHJhbnNmb3JtKGwudHJhbnNmb3JtKSx5KXt2YXIgVD0rZi5jeCxFPStmLmN5LE49K2Yucnh8fCtmLnJ8fDAsTD0rZi5yeXx8K2Yucnx8MDtjLnBhdGg9dC5mb3JtYXQoXCJhcnswfSx7MX0sezJ9LHszfSx7NH0sezF9LHs0fSx7MX14XCIsYSgoVC1OKSpiKSxhKChFLUwpKmIpLGEoKFQrTikqYiksYSgoRStMKSpiKSxhKFQqYikpLG4uXy5kaXJ0eT0xfWlmKFwiY2xpcC1yZWN0XCJpbiBsKXt2YXIgej1yKGxbXCJjbGlwLXJlY3RcIl0pLnNwbGl0KHUpO2lmKDQ9PXoubGVuZ3RoKXt6WzJdPSt6WzJdKyArelswXSx6WzNdPSt6WzNdKyArelsxXTt2YXIgUD1jLmNsaXBSZWN0fHx0Ll9nLmRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLEY9UC5zdHlsZTtGLmNsaXA9dC5mb3JtYXQoXCJyZWN0KHsxfXB4IHsyfXB4IHszfXB4IHswfXB4KVwiLHopLGMuY2xpcFJlY3R8fChGLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixGLnRvcD0wLEYubGVmdD0wLEYud2lkdGg9bi5wYXBlci53aWR0aCtcInB4XCIsRi5oZWlnaHQ9bi5wYXBlci5oZWlnaHQrXCJweFwiLGMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoUCxjKSxQLmFwcGVuZENoaWxkKGMpLGMuY2xpcFJlY3Q9UCl9bFtcImNsaXAtcmVjdFwiXXx8Yy5jbGlwUmVjdCYmKGMuY2xpcFJlY3Quc3R5bGUuY2xpcD1cImF1dG9cIil9aWYobi50ZXh0cGF0aCl7dmFyIFI9bi50ZXh0cGF0aC5zdHlsZTtsLmZvbnQmJihSLmZvbnQ9bC5mb250KSxsW1wiZm9udC1mYW1pbHlcIl0mJihSLmZvbnRGYW1pbHk9J1wiJytsW1wiZm9udC1mYW1pbHlcIl0uc3BsaXQoXCIsXCIpWzBdLnJlcGxhY2UoL15bJ1wiXSt8WydcIl0rJC9nLGQpKydcIicpLGxbXCJmb250LXNpemVcIl0mJihSLmZvbnRTaXplPWxbXCJmb250LXNpemVcIl0pLGxbXCJmb250LXdlaWdodFwiXSYmKFIuZm9udFdlaWdodD1sW1wiZm9udC13ZWlnaHRcIl0pLGxbXCJmb250LXN0eWxlXCJdJiYoUi5mb250U3R5bGU9bFtcImZvbnQtc3R5bGVcIl0pfWlmKFwiYXJyb3ctc3RhcnRcImluIGwmJlMobSxsW1wiYXJyb3ctc3RhcnRcIl0pLFwiYXJyb3ctZW5kXCJpbiBsJiZTKG0sbFtcImFycm93LWVuZFwiXSwxKSxudWxsIT1sLm9wYWNpdHl8fG51bGwhPWwuZmlsbHx8bnVsbCE9bC5zcmN8fG51bGwhPWwuc3Ryb2tlfHxudWxsIT1sW1wic3Ryb2tlLXdpZHRoXCJdfHxudWxsIT1sW1wic3Ryb2tlLW9wYWNpdHlcIl18fG51bGwhPWxbXCJmaWxsLW9wYWNpdHlcIl18fG51bGwhPWxbXCJzdHJva2UtZGFzaGFycmF5XCJdfHxudWxsIT1sW1wic3Ryb2tlLW1pdGVybGltaXRcIl18fG51bGwhPWxbXCJzdHJva2UtbGluZWpvaW5cIl18fG51bGwhPWxbXCJzdHJva2UtbGluZWNhcFwiXSl7dmFyIEk9Yy5nZXRFbGVtZW50c0J5VGFnTmFtZShoKSxqPSExO2lmKEk9SSYmSVswXSwhSSYmKGo9ST1NKGgpKSxcImltYWdlXCI9PW4udHlwZSYmbC5zcmMmJihJLnNyYz1sLnNyYyksbC5maWxsJiYoSS5vbj0hMCksbnVsbCE9SS5vbiYmXCJub25lXCIhPWwuZmlsbCYmbnVsbCE9PWwuZmlsbHx8KEkub249ITEpLEkub24mJmwuZmlsbCl7dmFyIHE9cihsLmZpbGwpLm1hdGNoKHQuX0lTVVJMKTtpZihxKXtJLnBhcmVudE5vZGU9PWMmJmMucmVtb3ZlQ2hpbGQoSSksSS5yb3RhdGU9ITAsSS5zcmM9cVsxXSxJLnR5cGU9XCJ0aWxlXCI7dmFyIEQ9bi5nZXRCQm94KDEpO0kucG9zaXRpb249RC54K3ArRC55LG4uXy5maWxscG9zPVtELngsRC55XSx0Ll9wcmVsb2FkKHFbMV0sZnVuY3Rpb24oKXtuLl8uZmlsbHNpemU9W3RoaXMub2Zmc2V0V2lkdGgsdGhpcy5vZmZzZXRIZWlnaHRdfSl9ZWxzZSBJLmNvbG9yPXQuZ2V0UkdCKGwuZmlsbCkuaGV4LEkuc3JjPWQsSS50eXBlPVwic29saWRcIix0LmdldFJHQihsLmZpbGwpLmVycm9yJiYobS50eXBlIGlue2NpcmNsZToxLGVsbGlwc2U6MX18fFwiclwiIT1yKGwuZmlsbCkuY2hhckF0KCkpJiZBKG0sbC5maWxsLEkpJiYoZi5maWxsPVwibm9uZVwiLGYuZ3JhZGllbnQ9bC5maWxsLEkucm90YXRlPSExKX1pZihcImZpbGwtb3BhY2l0eVwiaW4gbHx8XCJvcGFjaXR5XCJpbiBsKXt2YXIgVj0oKCtmW1wiZmlsbC1vcGFjaXR5XCJdKzF8fDIpLTEpKigoK2Yub3BhY2l0eSsxfHwyKS0xKSooKCt0LmdldFJHQihsLmZpbGwpLm8rMXx8MiktMSk7Vj1vKHMoViwwKSwxKSxJLm9wYWNpdHk9VixJLnNyYyYmKEkuY29sb3I9XCJub25lXCIpfWMuYXBwZW5kQ2hpbGQoSSk7dmFyIE89Yy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0cm9rZVwiKSYmYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0cm9rZVwiKVswXSxZPSExOyFPJiYoWT1PPU0oXCJzdHJva2VcIikpLChsLnN0cm9rZSYmXCJub25lXCIhPWwuc3Ryb2tlfHxsW1wic3Ryb2tlLXdpZHRoXCJdfHxudWxsIT1sW1wic3Ryb2tlLW9wYWNpdHlcIl18fGxbXCJzdHJva2UtZGFzaGFycmF5XCJdfHxsW1wic3Ryb2tlLW1pdGVybGltaXRcIl18fGxbXCJzdHJva2UtbGluZWpvaW5cIl18fGxbXCJzdHJva2UtbGluZWNhcFwiXSkmJihPLm9uPSEwKSwoXCJub25lXCI9PWwuc3Ryb2tlfHxudWxsPT09bC5zdHJva2V8fG51bGw9PU8ub258fDA9PWwuc3Ryb2tlfHwwPT1sW1wic3Ryb2tlLXdpZHRoXCJdKSYmKE8ub249ITEpO3ZhciBXPXQuZ2V0UkdCKGwuc3Ryb2tlKTtPLm9uJiZsLnN0cm9rZSYmKE8uY29sb3I9Vy5oZXgpLFY9KCgrZltcInN0cm9rZS1vcGFjaXR5XCJdKzF8fDIpLTEpKigoK2Yub3BhY2l0eSsxfHwyKS0xKSooKCtXLm8rMXx8MiktMSk7dmFyIEc9Ljc1KihpKGxbXCJzdHJva2Utd2lkdGhcIl0pfHwxKTtpZihWPW8ocyhWLDApLDEpLG51bGw9PWxbXCJzdHJva2Utd2lkdGhcIl0mJihHPWZbXCJzdHJva2Utd2lkdGhcIl0pLGxbXCJzdHJva2Utd2lkdGhcIl0mJihPLndlaWdodD1HKSxHJiYxPkcmJihWKj1HKSYmKE8ud2VpZ2h0PTEpLE8ub3BhY2l0eT1WLGxbXCJzdHJva2UtbGluZWpvaW5cIl0mJihPLmpvaW5zdHlsZT1sW1wic3Ryb2tlLWxpbmVqb2luXCJdfHxcIm1pdGVyXCIpLE8ubWl0ZXJsaW1pdD1sW1wic3Ryb2tlLW1pdGVybGltaXRcIl18fDgsbFtcInN0cm9rZS1saW5lY2FwXCJdJiYoTy5lbmRjYXA9XCJidXR0XCI9PWxbXCJzdHJva2UtbGluZWNhcFwiXT9cImZsYXRcIjpcInNxdWFyZVwiPT1sW1wic3Ryb2tlLWxpbmVjYXBcIl0/XCJzcXVhcmVcIjpcInJvdW5kXCIpLFwic3Ryb2tlLWRhc2hhcnJheVwiaW4gbCl7dmFyIEg9e1wiLVwiOlwic2hvcnRkYXNoXCIsXCIuXCI6XCJzaG9ydGRvdFwiLFwiLS5cIjpcInNob3J0ZGFzaGRvdFwiLFwiLS4uXCI6XCJzaG9ydGRhc2hkb3Rkb3RcIixcIi4gXCI6XCJkb3RcIixcIi0gXCI6XCJkYXNoXCIsXCItLVwiOlwibG9uZ2Rhc2hcIixcIi0gLlwiOlwiZGFzaGRvdFwiLFwiLS0uXCI6XCJsb25nZGFzaGRvdFwiLFwiLS0uLlwiOlwibG9uZ2Rhc2hkb3Rkb3RcIn07Ty5kYXNoc3R5bGU9SFtlXShsW1wic3Ryb2tlLWRhc2hhcnJheVwiXSk/SFtsW1wic3Ryb2tlLWRhc2hhcnJheVwiXV06ZH1ZJiZjLmFwcGVuZENoaWxkKE8pfWlmKFwidGV4dFwiPT1tLnR5cGUpe20ucGFwZXIuY2FudmFzLnN0eWxlLmRpc3BsYXk9ZDt2YXIgWD1tLnBhcGVyLnNwYW4sVT0xMDAsJD1mLmZvbnQmJmYuZm9udC5tYXRjaCgvXFxkKyg/OlxcLlxcZCopPyg/PXB4KS8pO2c9WC5zdHlsZSxmLmZvbnQmJihnLmZvbnQ9Zi5mb250KSxmW1wiZm9udC1mYW1pbHlcIl0mJihnLmZvbnRGYW1pbHk9ZltcImZvbnQtZmFtaWx5XCJdKSxmW1wiZm9udC13ZWlnaHRcIl0mJihnLmZvbnRXZWlnaHQ9ZltcImZvbnQtd2VpZ2h0XCJdKSxmW1wiZm9udC1zdHlsZVwiXSYmKGcuZm9udFN0eWxlPWZbXCJmb250LXN0eWxlXCJdKSwkPWkoZltcImZvbnQtc2l6ZVwiXXx8JCYmJFswXSl8fDEwLGcuZm9udFNpemU9JCpVK1wicHhcIixtLnRleHRwYXRoLnN0cmluZyYmKFguaW5uZXJIVE1MPXIobS50ZXh0cGF0aC5zdHJpbmcpLnJlcGxhY2UoLzwvZyxcIiYjNjA7XCIpLnJlcGxhY2UoLyYvZyxcIiYjMzg7XCIpLnJlcGxhY2UoL1xcbi9nLFwiPGJyPlwiKSk7dmFyIFo9WC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTttLlc9Zi53PShaLnJpZ2h0LVoubGVmdCkvVSxtLkg9Zi5oPShaLmJvdHRvbS1aLnRvcCkvVSxtLlg9Zi54LG0uWT1mLnkrbS5ILzIsKFwieFwiaW4gbHx8XCJ5XCJpbiBsKSYmKG0ucGF0aC52PXQuZm9ybWF0KFwibXswfSx7MX1sezJ9LHsxfVwiLGEoZi54KmIpLGEoZi55KmIpLGEoZi54KmIpKzEpKTtmb3IodmFyIFE9W1wieFwiLFwieVwiLFwidGV4dFwiLFwiZm9udFwiLFwiZm9udC1mYW1pbHlcIixcImZvbnQtd2VpZ2h0XCIsXCJmb250LXN0eWxlXCIsXCJmb250LXNpemVcIl0sSj0wLEs9US5sZW5ndGg7Sz5KO0orKylpZihRW0pdaW4gbCl7bS5fLmRpcnR5PTE7YnJlYWt9c3dpdGNoKGZbXCJ0ZXh0LWFuY2hvclwiXSl7Y2FzZVwic3RhcnRcIjptLnRleHRwYXRoLnN0eWxlW1widi10ZXh0LWFsaWduXCJdPVwibGVmdFwiLG0uYmJ4PW0uVy8yO2JyZWFrO2Nhc2VcImVuZFwiOm0udGV4dHBhdGguc3R5bGVbXCJ2LXRleHQtYWxpZ25cIl09XCJyaWdodFwiLG0uYmJ4PS1tLlcvMjticmVhaztkZWZhdWx0Om0udGV4dHBhdGguc3R5bGVbXCJ2LXRleHQtYWxpZ25cIl09XCJjZW50ZXJcIixtLmJieD0wfW0udGV4dHBhdGguc3R5bGVbXCJ2LXRleHQta2VyblwiXT0hMH19LEE9ZnVuY3Rpb24oZSxhLHMpe2UuYXR0cnM9ZS5hdHRyc3x8e307dmFyIG89ZS5hdHRycyxsPU1hdGgucG93LGgsdSxjPVwibGluZWFyXCIsZj1cIi41IC41XCI7aWYoZS5hdHRycy5ncmFkaWVudD1hLGE9cihhKS5yZXBsYWNlKHQuX3JhZGlhbF9ncmFkaWVudCxmdW5jdGlvbih0LGUscil7cmV0dXJuIGM9XCJyYWRpYWxcIixlJiZyJiYoZT1pKGUpLHI9aShyKSxsKGUtLjUsMikrbChyLS41LDIpPi4yNSYmKHI9bi5zcXJ0KC4yNS1sKGUtLjUsMikpKigyKihyPi41KS0xKSsuNSksZj1lK3ArciksZH0pLGE9YS5zcGxpdCgvXFxzKlxcLVxccyovKSxcImxpbmVhclwiPT1jKXt2YXIgZz1hLnNoaWZ0KCk7aWYoZz0taShnKSxpc05hTihnKSlyZXR1cm4gbnVsbH12YXIgeD10Ll9wYXJzZURvdHMoYSk7aWYoIXgpcmV0dXJuIG51bGw7aWYoZT1lLnNoYXBlfHxlLm5vZGUseC5sZW5ndGgpe2UucmVtb3ZlQ2hpbGQocykscy5vbj0hMCxzLm1ldGhvZD1cIm5vbmVcIixzLmNvbG9yPXhbMF0uY29sb3Iscy5jb2xvcjI9eFt4Lmxlbmd0aC0xXS5jb2xvcjtmb3IodmFyIHY9W10seT0wLG09eC5sZW5ndGg7bT55O3krKyl4W3ldLm9mZnNldCYmdi5wdXNoKHhbeV0ub2Zmc2V0K3AreFt5XS5jb2xvcik7cy5jb2xvcnM9di5sZW5ndGg/di5qb2luKCk6XCIwJSBcIitzLmNvbG9yLFwicmFkaWFsXCI9PWM/KHMudHlwZT1cImdyYWRpZW50VGl0bGVcIixzLmZvY3VzPVwiMTAwJVwiLHMuZm9jdXNzaXplPVwiMCAwXCIscy5mb2N1c3Bvc2l0aW9uPWYscy5hbmdsZT0wKToocy50eXBlPVwiZ3JhZGllbnRcIixzLmFuZ2xlPSgyNzAtZyklMzYwKSxlLmFwcGVuZENoaWxkKHMpfXJldHVybiAxfSxFPWZ1bmN0aW9uKGUscil7dGhpc1swXT10aGlzLm5vZGU9ZSxlLnJhcGhhZWw9ITAsdGhpcy5pZD10Ll9vaWQrKyxlLnJhcGhhZWxpZD10aGlzLmlkLHRoaXMuWD0wLHRoaXMuWT0wLHRoaXMuYXR0cnM9e30sdGhpcy5wYXBlcj1yLHRoaXMubWF0cml4PXQubWF0cml4KCksdGhpcy5fPXt0cmFuc2Zvcm06W10sc3g6MSxzeToxLGR4OjAsZHk6MCxkZWc6MCxkaXJ0eToxLGRpcnR5VDoxfSwhci5ib3R0b20mJihyLmJvdHRvbT10aGlzKSx0aGlzLnByZXY9ci50b3Asci50b3AmJihyLnRvcC5uZXh0PXRoaXMpLHIudG9wPXRoaXMsdGhpcy5uZXh0PW51bGx9LE49dC5lbDtFLnByb3RvdHlwZT1OLE4uY29uc3RydWN0b3I9RSxOLnRyYW5zZm9ybT1mdW5jdGlvbihlKXtpZihudWxsPT1lKXJldHVybiB0aGlzLl8udHJhbnNmb3JtO3ZhciBpPXRoaXMucGFwZXIuX3ZpZXdCb3hTaGlmdCxuPWk/XCJzXCIrW2kuc2NhbGUsaS5zY2FsZV0rXCItMS0xdFwiK1tpLmR4LGkuZHldOmQsYTtpJiYoYT1lPXIoZSkucmVwbGFjZSgvXFwuezN9fFxcdTIwMjYvZyx0aGlzLl8udHJhbnNmb3JtfHxkKSksdC5fZXh0cmFjdFRyYW5zZm9ybSh0aGlzLG4rZSk7dmFyIHM9dGhpcy5tYXRyaXguY2xvbmUoKSxvPXRoaXMuc2tldyxsPXRoaXMubm9kZSxoLHU9fnIodGhpcy5hdHRycy5maWxsKS5pbmRleE9mKFwiLVwiKSxjPSFyKHRoaXMuYXR0cnMuZmlsbCkuaW5kZXhPZihcInVybChcIik7aWYocy50cmFuc2xhdGUoMSwxKSxjfHx1fHxcImltYWdlXCI9PXRoaXMudHlwZSlpZihvLm1hdHJpeD1cIjEgMCAwIDFcIixvLm9mZnNldD1cIjAgMFwiLGg9cy5zcGxpdCgpLHUmJmgubm9Sb3RhdGlvbnx8IWguaXNTaW1wbGUpe2wuc3R5bGUuZmlsdGVyPXMudG9GaWx0ZXIoKTt2YXIgZj10aGlzLmdldEJCb3goKSxnPXRoaXMuZ2V0QkJveCgxKSx4PWYueC1nLngsdj1mLnktZy55O2wuY29vcmRvcmlnaW49eCotYitwK3YqLWIsQyh0aGlzLDEsMSx4LHYsMCl9ZWxzZSBsLnN0eWxlLmZpbHRlcj1kLEModGhpcyxoLnNjYWxleCxoLnNjYWxleSxoLmR4LGguZHksaC5yb3RhdGUpO2Vsc2UgbC5zdHlsZS5maWx0ZXI9ZCxvLm1hdHJpeD1yKHMpLG8ub2Zmc2V0PXMub2Zmc2V0KCk7cmV0dXJuIG51bGwhPT1hJiYodGhpcy5fLnRyYW5zZm9ybT1hLHQuX2V4dHJhY3RUcmFuc2Zvcm0odGhpcyxhKSksdGhpc30sTi5yb3RhdGU9ZnVuY3Rpb24odCxlLG4pe2lmKHRoaXMucmVtb3ZlZClyZXR1cm4gdGhpcztpZihudWxsIT10KXtpZih0PXIodCkuc3BsaXQodSksdC5sZW5ndGgtMSYmKGU9aSh0WzFdKSxuPWkodFsyXSkpLHQ9aSh0WzBdKSxudWxsPT1uJiYoZT1uKSxudWxsPT1lfHxudWxsPT1uKXt2YXIgYT10aGlzLmdldEJCb3goMSk7ZT1hLngrYS53aWR0aC8yLG49YS55K2EuaGVpZ2h0LzJ9cmV0dXJuIHRoaXMuXy5kaXJ0eVQ9MSx0aGlzLnRyYW5zZm9ybSh0aGlzLl8udHJhbnNmb3JtLmNvbmNhdChbW1wiclwiLHQsZSxuXV0pKSx0aGlzfX0sTi50cmFuc2xhdGU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5yZW1vdmVkP3RoaXM6KHQ9cih0KS5zcGxpdCh1KSx0Lmxlbmd0aC0xJiYoZT1pKHRbMV0pKSx0PWkodFswXSl8fDAsZT0rZXx8MCx0aGlzLl8uYmJveCYmKHRoaXMuXy5iYm94LngrPXQsdGhpcy5fLmJib3gueSs9ZSksdGhpcy50cmFuc2Zvcm0odGhpcy5fLnRyYW5zZm9ybS5jb25jYXQoW1tcInRcIix0LGVdXSkpLHRoaXMpfSxOLnNjYWxlPWZ1bmN0aW9uKHQsZSxuLGEpe2lmKHRoaXMucmVtb3ZlZClyZXR1cm4gdGhpcztpZih0PXIodCkuc3BsaXQodSksdC5sZW5ndGgtMSYmKGU9aSh0WzFdKSxuPWkodFsyXSksYT1pKHRbM10pLGlzTmFOKG4pJiYobj1udWxsKSxpc05hTihhKSYmKGE9bnVsbCkpLHQ9aSh0WzBdKSxudWxsPT1lJiYoZT10KSxudWxsPT1hJiYobj1hKSxudWxsPT1ufHxudWxsPT1hKXZhciBzPXRoaXMuZ2V0QkJveCgxKTtyZXR1cm4gbj1udWxsPT1uP3MueCtzLndpZHRoLzI6bixhPW51bGw9PWE/cy55K3MuaGVpZ2h0LzI6YSx0aGlzLnRyYW5zZm9ybSh0aGlzLl8udHJhbnNmb3JtLmNvbmNhdChbW1wic1wiLHQsZSxuLGFdXSkpLHRoaXMuXy5kaXJ0eVQ9MSx0aGlzfSxOLmhpZGU9ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5yZW1vdmVkJiYodGhpcy5ub2RlLnN0eWxlLmRpc3BsYXk9XCJub25lXCIpLHRoaXN9LE4uc2hvdz1mdW5jdGlvbigpe3JldHVybiF0aGlzLnJlbW92ZWQmJih0aGlzLm5vZGUuc3R5bGUuZGlzcGxheT1kKSx0aGlzfSxOLmF1eEdldEJCb3g9dC5lbC5nZXRCQm94LE4uZ2V0QkJveD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuYXV4R2V0QkJveCgpO2lmKHRoaXMucGFwZXImJnRoaXMucGFwZXIuX3ZpZXdCb3hTaGlmdCl7dmFyIGU9e30scj0xL3RoaXMucGFwZXIuX3ZpZXdCb3hTaGlmdC5zY2FsZTtyZXR1cm4gZS54PXQueC10aGlzLnBhcGVyLl92aWV3Qm94U2hpZnQuZHgsZS54Kj1yLGUueT10LnktdGhpcy5wYXBlci5fdmlld0JveFNoaWZ0LmR5LGUueSo9cixlLndpZHRoPXQud2lkdGgqcixlLmhlaWdodD10LmhlaWdodCpyLGUueDI9ZS54K2Uud2lkdGgsZS55Mj1lLnkrZS5oZWlnaHQsZX1yZXR1cm4gdH0sTi5fZ2V0QkJveD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnJlbW92ZWQ/e306e3g6dGhpcy5YKyh0aGlzLmJieHx8MCktdGhpcy5XLzIseTp0aGlzLlktdGhpcy5ILHdpZHRoOnRoaXMuVyxoZWlnaHQ6dGhpcy5IfX0sTi5yZW1vdmU9ZnVuY3Rpb24oKXtpZighdGhpcy5yZW1vdmVkJiZ0aGlzLm5vZGUucGFyZW50Tm9kZSl7dGhpcy5wYXBlci5fX3NldF9fJiZ0aGlzLnBhcGVyLl9fc2V0X18uZXhjbHVkZSh0aGlzKSx0LmV2ZS51bmJpbmQoXCJyYXBoYWVsLiouKi5cIit0aGlzLmlkKSx0Ll90ZWFyKHRoaXMsdGhpcy5wYXBlciksdGhpcy5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKSx0aGlzLnNoYXBlJiZ0aGlzLnNoYXBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zaGFwZSk7Zm9yKHZhciBlIGluIHRoaXMpdGhpc1tlXT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzW2VdP3QuX3JlbW92ZWRGYWN0b3J5KGUpOm51bGw7dGhpcy5yZW1vdmVkPSEwfX0sTi5hdHRyPWZ1bmN0aW9uKHIsaSl7aWYodGhpcy5yZW1vdmVkKXJldHVybiB0aGlzO2lmKG51bGw9PXIpe3ZhciBuPXt9O2Zvcih2YXIgYSBpbiB0aGlzLmF0dHJzKXRoaXMuYXR0cnNbZV0oYSkmJihuW2FdPXRoaXMuYXR0cnNbYV0pO3JldHVybiBuLmdyYWRpZW50JiZcIm5vbmVcIj09bi5maWxsJiYobi5maWxsPW4uZ3JhZGllbnQpJiZkZWxldGUgbi5ncmFkaWVudCxuLnRyYW5zZm9ybT10aGlzLl8udHJhbnNmb3JtLG59aWYobnVsbD09aSYmdC5pcyhyLFwic3RyaW5nXCIpKXtpZihyPT1oJiZcIm5vbmVcIj09dGhpcy5hdHRycy5maWxsJiZ0aGlzLmF0dHJzLmdyYWRpZW50KXJldHVybiB0aGlzLmF0dHJzLmdyYWRpZW50O2Zvcih2YXIgcz1yLnNwbGl0KHUpLG89e30sbD0wLGY9cy5sZW5ndGg7Zj5sO2wrKylyPXNbbF0sciBpbiB0aGlzLmF0dHJzP29bcl09dGhpcy5hdHRyc1tyXTp0LmlzKHRoaXMucGFwZXIuY3VzdG9tQXR0cmlidXRlc1tyXSxcImZ1bmN0aW9uXCIpP29bcl09dGhpcy5wYXBlci5jdXN0b21BdHRyaWJ1dGVzW3JdLmRlZjpvW3JdPXQuX2F2YWlsYWJsZUF0dHJzW3JdO3JldHVybiBmLTE/bzpvW3NbMF1dfWlmKHRoaXMuYXR0cnMmJm51bGw9PWkmJnQuaXMocixcImFycmF5XCIpKXtmb3Iobz17fSxsPTAsZj1yLmxlbmd0aDtmPmw7bCsrKW9bcltsXV09dGhpcy5hdHRyKHJbbF0pO3JldHVybiBvfXZhciBwO251bGwhPWkmJihwPXt9LHBbcl09aSksbnVsbD09aSYmdC5pcyhyLFwib2JqZWN0XCIpJiYocD1yKTtmb3IodmFyIGQgaW4gcCljKFwicmFwaGFlbC5hdHRyLlwiK2QrXCIuXCIrdGhpcy5pZCx0aGlzLHBbZF0pO2lmKHApe2ZvcihkIGluIHRoaXMucGFwZXIuY3VzdG9tQXR0cmlidXRlcylpZih0aGlzLnBhcGVyLmN1c3RvbUF0dHJpYnV0ZXNbZV0oZCkmJnBbZV0oZCkmJnQuaXModGhpcy5wYXBlci5jdXN0b21BdHRyaWJ1dGVzW2RdLFwiZnVuY3Rpb25cIikpe3ZhciBnPXRoaXMucGFwZXIuY3VzdG9tQXR0cmlidXRlc1tkXS5hcHBseSh0aGlzLFtdLmNvbmNhdChwW2RdKSk7dGhpcy5hdHRyc1tkXT1wW2RdO2Zvcih2YXIgeCBpbiBnKWdbZV0oeCkmJihwW3hdPWdbeF0pfXAudGV4dCYmXCJ0ZXh0XCI9PXRoaXMudHlwZSYmKHRoaXMudGV4dHBhdGguc3RyaW5nPXAudGV4dCksVCh0aGlzLHApfXJldHVybiB0aGlzfSxOLnRvRnJvbnQ9ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5yZW1vdmVkJiZ0aGlzLm5vZGUucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpLHRoaXMucGFwZXImJnRoaXMucGFwZXIudG9wIT10aGlzJiZ0Ll90b2Zyb250KHRoaXMsdGhpcy5wYXBlciksdGhpc30sTi50b0JhY2s9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZW1vdmVkP3RoaXM6KHRoaXMubm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQhPXRoaXMubm9kZSYmKHRoaXMubm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm5vZGUsdGhpcy5ub2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZCksdC5fdG9iYWNrKHRoaXMsdGhpcy5wYXBlcikpLHRoaXMpfSxOLmluc2VydEFmdGVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlbW92ZWQ/dGhpczooZS5jb25zdHJ1Y3Rvcj09dC5zdC5jb25zdHJ1Y3RvciYmKGU9ZVtlLmxlbmd0aC0xXSksZS5ub2RlLm5leHRTaWJsaW5nP2Uubm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm5vZGUsZS5ub2RlLm5leHRTaWJsaW5nKTplLm5vZGUucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpLHQuX2luc2VydGFmdGVyKHRoaXMsZSx0aGlzLnBhcGVyKSx0aGlzKX0sTi5pbnNlcnRCZWZvcmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVtb3ZlZD90aGlzOihlLmNvbnN0cnVjdG9yPT10LnN0LmNvbnN0cnVjdG9yJiYoZT1lWzBdKSxlLm5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5ub2RlLGUubm9kZSksdC5faW5zZXJ0YmVmb3JlKHRoaXMsZSx0aGlzLnBhcGVyKSx0aGlzKX0sTi5ibHVyPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXMubm9kZS5ydW50aW1lU3R5bGUsaT1yLmZpbHRlcjtyZXR1cm4gaT1pLnJlcGxhY2UodixkKSwwIT09K2U/KHRoaXMuYXR0cnMuYmx1cj1lLHIuZmlsdGVyPWkrcCtmK1wiLkJsdXIocGl4ZWxyYWRpdXM9XCIrKCtlfHwxLjUpK1wiKVwiLHIubWFyZ2luPXQuZm9ybWF0KFwiLXswfXB4IDAgMCAtezB9cHhcIixhKCtlfHwxLjUpKSk6KHIuZmlsdGVyPWksci5tYXJnaW49MCxkZWxldGUgdGhpcy5hdHRycy5ibHVyKSx0aGlzfSx0Ll9lbmdpbmUucGF0aD1mdW5jdGlvbih0LGUpe3ZhciByPU0oXCJzaGFwZVwiKTtyLnN0eWxlLmNzc1RleHQ9bSxyLmNvb3Jkc2l6ZT1iK3ArYixyLmNvb3Jkb3JpZ2luPWUuY29vcmRvcmlnaW47dmFyIGk9bmV3IEUocixlKSxuPXtmaWxsOlwibm9uZVwiLHN0cm9rZTpcIiMwMDBcIn07dCYmKG4ucGF0aD10KSxpLnR5cGU9XCJwYXRoXCIsaS5wYXRoPVtdLGkuUGF0aD1kLFQoaSxuKSxlLmNhbnZhcyYmZS5jYW52YXMuYXBwZW5kQ2hpbGQocik7dmFyIGE9TShcInNrZXdcIik7cmV0dXJuIGEub249ITAsci5hcHBlbmRDaGlsZChhKSxpLnNrZXc9YSxpLnRyYW5zZm9ybShkKSxpfSx0Ll9lbmdpbmUucmVjdD1mdW5jdGlvbihlLHIsaSxuLGEscyl7dmFyIG89dC5fcmVjdFBhdGgocixpLG4sYSxzKSxsPWUucGF0aChvKSxoPWwuYXR0cnM7cmV0dXJuIGwuWD1oLng9cixsLlk9aC55PWksbC5XPWgud2lkdGg9bixsLkg9aC5oZWlnaHQ9YSxoLnI9cyxoLnBhdGg9byxsLnR5cGU9XCJyZWN0XCIsbH0sdC5fZW5naW5lLmVsbGlwc2U9ZnVuY3Rpb24odCxlLHIsaSxuKXt2YXIgYT10LnBhdGgoKSxzPWEuYXR0cnM7cmV0dXJuIGEuWD1lLWksYS5ZPXItbixhLlc9MippLGEuSD0yKm4sYS50eXBlPVwiZWxsaXBzZVwiLFQoYSx7Y3g6ZSxjeTpyLHJ4Omkscnk6bn0pLGF9LHQuX2VuZ2luZS5jaXJjbGU9ZnVuY3Rpb24odCxlLHIsaSl7dmFyIG49dC5wYXRoKCksYT1uLmF0dHJzO3JldHVybiBuLlg9ZS1pLG4uWT1yLWksbi5XPW4uSD0yKmksbi50eXBlPVwiY2lyY2xlXCIsVChuLHtjeDplLGN5OnIscjppfSksbn0sdC5fZW5naW5lLmltYWdlPWZ1bmN0aW9uKGUscixpLG4sYSxzKXt2YXIgbz10Ll9yZWN0UGF0aChpLG4sYSxzKSxsPWUucGF0aChvKS5hdHRyKHtzdHJva2U6XCJub25lXCJ9KSx1PWwuYXR0cnMsYz1sLm5vZGUsZj1jLmdldEVsZW1lbnRzQnlUYWdOYW1lKGgpWzBdO3JldHVybiB1LnNyYz1yLGwuWD11Lng9aSxsLlk9dS55PW4sbC5XPXUud2lkdGg9YSxsLkg9dS5oZWlnaHQ9cyx1LnBhdGg9byxsLnR5cGU9XCJpbWFnZVwiLGYucGFyZW50Tm9kZT09YyYmYy5yZW1vdmVDaGlsZChmKSxmLnJvdGF0ZT0hMCxmLnNyYz1yLGYudHlwZT1cInRpbGVcIixsLl8uZmlsbHBvcz1baSxuXSxsLl8uZmlsbHNpemU9W2Esc10sYy5hcHBlbmRDaGlsZChmKSxDKGwsMSwxLDAsMCwwKSxsfSx0Ll9lbmdpbmUudGV4dD1mdW5jdGlvbihlLGksbixzKXt2YXIgbz1NKFwic2hhcGVcIiksbD1NKFwicGF0aFwiKSxoPU0oXCJ0ZXh0cGF0aFwiKTtpPWl8fDAsbj1ufHwwLHM9c3x8XCJcIixsLnY9dC5mb3JtYXQoXCJtezB9LHsxfWx7Mn0sezF9XCIsYShpKmIpLGEobipiKSxhKGkqYikrMSksbC50ZXh0cGF0aG9rPSEwLGguc3RyaW5nPXIocyksaC5vbj0hMCxvLnN0eWxlLmNzc1RleHQ9bSxvLmNvb3Jkc2l6ZT1iK3ArYixvLmNvb3Jkb3JpZ2luPVwiMCAwXCI7dmFyIHU9bmV3IEUobyxlKSxjPXtmaWxsOlwiIzAwMFwiLHN0cm9rZTpcIm5vbmVcIixmb250OnQuX2F2YWlsYWJsZUF0dHJzLmZvbnQsdGV4dDpzfTt1LnNoYXBlPW8sdS5wYXRoPWwsdS50ZXh0cGF0aD1oLHUudHlwZT1cInRleHRcIix1LmF0dHJzLnRleHQ9cihzKSx1LmF0dHJzLng9aSx1LmF0dHJzLnk9bix1LmF0dHJzLnc9MSx1LmF0dHJzLmg9MSxUKHUsYyksby5hcHBlbmRDaGlsZChoKSxvLmFwcGVuZENoaWxkKGwpLGUuY2FudmFzLmFwcGVuZENoaWxkKG8pO3ZhciBmPU0oXCJza2V3XCIpO3JldHVybiBmLm9uPSEwLG8uYXBwZW5kQ2hpbGQoZiksdS5za2V3PWYsdS50cmFuc2Zvcm0oZCksdX0sdC5fZW5naW5lLnNldFNpemU9ZnVuY3Rpb24oZSxyKXt2YXIgaT10aGlzLmNhbnZhcy5zdHlsZTtyZXR1cm4gdGhpcy53aWR0aD1lLHRoaXMuaGVpZ2h0PXIsZT09K2UmJihlKz1cInB4XCIpLHI9PStyJiYocis9XCJweFwiKSxpLndpZHRoPWUsaS5oZWlnaHQ9cixpLmNsaXA9XCJyZWN0KDAgXCIrZStcIiBcIityK1wiIDApXCIsdGhpcy5fdmlld0JveCYmdC5fZW5naW5lLnNldFZpZXdCb3guYXBwbHkodGhpcyx0aGlzLl92aWV3Qm94KSx0aGlzfSx0Ll9lbmdpbmUuc2V0Vmlld0JveD1mdW5jdGlvbihlLHIsaSxuLGEpe3QuZXZlKFwicmFwaGFlbC5zZXRWaWV3Qm94XCIsdGhpcyx0aGlzLl92aWV3Qm94LFtlLHIsaSxuLGFdKTt2YXIgcz10aGlzLmdldFNpemUoKSxvPXMud2lkdGgsbD1zLmhlaWdodCxoLHU7cmV0dXJuIGEmJihoPWwvbix1PW8vaSxvPmkqaCYmKGUtPShvLWkqaCkvMi9oKSxsPm4qdSYmKHItPShsLW4qdSkvMi91KSksdGhpcy5fdmlld0JveD1bZSxyLGksbiwhIWFdLHRoaXMuX3ZpZXdCb3hTaGlmdD17ZHg6LWUsZHk6LXIsc2NhbGU6c30sdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QudHJhbnNmb3JtKFwiLi4uXCIpfSksdGhpc307dmFyIE07dC5fZW5naW5lLmluaXRXaW49ZnVuY3Rpb24odCl7dmFyIGU9dC5kb2N1bWVudDtlLnN0eWxlU2hlZXRzLmxlbmd0aDwzMT9lLmNyZWF0ZVN0eWxlU2hlZXQoKS5hZGRSdWxlKFwiLnJ2bWxcIixcImJlaGF2aW9yOnVybCgjZGVmYXVsdCNWTUwpXCIpOmUuc3R5bGVTaGVldHNbMF0uYWRkUnVsZShcIi5ydm1sXCIsXCJiZWhhdmlvcjp1cmwoI2RlZmF1bHQjVk1MKVwiKTt0cnl7IWUubmFtZXNwYWNlcy5ydm1sJiZlLm5hbWVzcGFjZXMuYWRkKFwicnZtbFwiLFwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTp2bWxcIiksTT1mdW5jdGlvbih0KXtyZXR1cm4gZS5jcmVhdGVFbGVtZW50KFwiPHJ2bWw6XCIrdCsnIGNsYXNzPVwicnZtbFwiPicpfX1jYXRjaChyKXtNPWZ1bmN0aW9uKHQpe3JldHVybiBlLmNyZWF0ZUVsZW1lbnQoXCI8XCIrdCsnIHhtbG5zPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LmNvbTp2bWxcIiBjbGFzcz1cInJ2bWxcIj4nKX19fSx0Ll9lbmdpbmUuaW5pdFdpbih0Ll9nLndpbiksdC5fZW5naW5lLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciBlPXQuX2dldENvbnRhaW5lci5hcHBseSgwLGFyZ3VtZW50cykscj1lLmNvbnRhaW5lcixpPWUuaGVpZ2h0LG4sYT1lLndpZHRoLHM9ZS54LG89ZS55O2lmKCFyKXRocm93IG5ldyBFcnJvcihcIlZNTCBjb250YWluZXIgbm90IGZvdW5kLlwiKTt2YXIgbD1uZXcgdC5fUGFwZXIsaD1sLmNhbnZhcz10Ll9nLmRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHU9aC5zdHlsZTtyZXR1cm4gcz1zfHwwLG89b3x8MCxhPWF8fDUxMixpPWl8fDM0MixsLndpZHRoPWEsbC5oZWlnaHQ9aSxhPT0rYSYmKGErPVwicHhcIiksaT09K2kmJihpKz1cInB4XCIpLGwuY29vcmRzaXplPTFlMypiK3ArMWUzKmIsbC5jb29yZG9yaWdpbj1cIjAgMFwiLGwuc3Bhbj10Ll9nLmRvYy5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxsLnNwYW4uc3R5bGUuY3NzVGV4dD1cInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTllbTt0b3A6LTk5OTllbTtwYWRkaW5nOjA7bWFyZ2luOjA7bGluZS1oZWlnaHQ6MTtcIixoLmFwcGVuZENoaWxkKGwuc3BhbiksdS5jc3NUZXh0PXQuZm9ybWF0KFwidG9wOjA7bGVmdDowO3dpZHRoOnswfTtoZWlnaHQ6ezF9O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO2NsaXA6cmVjdCgwIHswfSB7MX0gMCk7b3ZlcmZsb3c6aGlkZGVuXCIsYSxpKSwxPT1yPyh0Ll9nLmRvYy5ib2R5LmFwcGVuZENoaWxkKGgpLHUubGVmdD1zK1wicHhcIix1LnRvcD1vK1wicHhcIix1LnBvc2l0aW9uPVwiYWJzb2x1dGVcIik6ci5maXJzdENoaWxkP3IuaW5zZXJ0QmVmb3JlKGgsci5maXJzdENoaWxkKTpyLmFwcGVuZENoaWxkKGgpLGwucmVuZGVyZml4PWZ1bmN0aW9uKCl7fSxsfSx0LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3QuZXZlKFwicmFwaGFlbC5jbGVhclwiLHRoaXMpLHRoaXMuY2FudmFzLmlubmVySFRNTD1kLHRoaXMuc3Bhbj10Ll9nLmRvYy5jcmVhdGVFbGVtZW50KFwic3BhblwiKSx0aGlzLnNwYW4uc3R5bGUuY3NzVGV4dD1cInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTllbTt0b3A6LTk5OTllbTtwYWRkaW5nOjA7bWFyZ2luOjA7bGluZS1oZWlnaHQ6MTtkaXNwbGF5OmlubGluZTtcIix0aGlzLmNhbnZhcy5hcHBlbmRDaGlsZCh0aGlzLnNwYW4pLHRoaXMuYm90dG9tPXRoaXMudG9wPW51bGx9LHQucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbigpe3QuZXZlKFwicmFwaGFlbC5yZW1vdmVcIix0aGlzKSx0aGlzLmNhbnZhcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtmb3IodmFyIGUgaW4gdGhpcyl0aGlzW2VdPVwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXNbZV0/dC5fcmVtb3ZlZEZhY3RvcnkoZSk6bnVsbDtyZXR1cm4hMH07dmFyIEw9dC5zdDtmb3IodmFyIHogaW4gTilOW2VdKHopJiYhTFtlXSh6KSYmKExbel09ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzO3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24ocil7clt0XS5hcHBseShyLGUpfSl9fSh6KSl9fS5hcHBseShlLGkpLCEodm9pZCAwIT09biYmKHQuZXhwb3J0cz1uKSl9XSl9KTsiLCJcbnZhciBybmc7XG5cbmlmIChnbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgcmV0dXJuIF9ybmRzODtcbiAgfTtcbn1cblxuaWYgKCFybmcpIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBfcm5kcztcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG5cbiIsIi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4vLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbnZhciBfcm5nID0gcmVxdWlyZSgnLi9ybmcnKTtcblxuLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbnZhciBfYnl0ZVRvSGV4ID0gW107XG52YXIgX2hleFRvQnl0ZSA9IHt9O1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG59XG5cbi8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG4vLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbmZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbnZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4vLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbnZhciBfbm9kZUlkID0gW1xuICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuXTtcblxuLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbnZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbn1cblxuLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xufVxuXG4vLyBFeHBvcnQgcHVibGljIEFQSVxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcbnV1aWQucGFyc2UgPSBwYXJzZTtcbnV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiJdfQ==
