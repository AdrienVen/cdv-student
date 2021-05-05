let w = 1200;
let h = 800;
let padding = 90
const path = d3.geoPath();
const projection = d3.geoConicConformal()
    .center([6, 44.279229])
    .scale(20000)
    .translate([w / 2, h / 2])

path.projection(projection);
// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender");

let viz_group = viz.append("g")



d3.json("paca-communes.geojson").then(function(incomingData){
    console.log(incomingData.features);
    let data_bound = viz_group.selectAll("path").data(incomingData.features);
    let entering = data_bound.enter();
    let exiting = data_bound.exit();
    entering.append("path").attr("d", path);
});