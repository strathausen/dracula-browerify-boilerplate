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

