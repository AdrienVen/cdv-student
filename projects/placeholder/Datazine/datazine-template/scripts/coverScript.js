let viz = d3.select("#container").append("svg")
    .attr("width",innerWidth)
    .attr("height", innerHeight)

let defs = d3.select("#container").append("svg").attr("width",0).attr("height",0)
createNotes();

let group = viz.append("g")
let image = group.append("image")
    .attr("xlink:href","./assets/ear.jpg")
    .attr("x", -400)
    .attr("y",25)
    .attr("width", innerWidth*1.3)
    .attr("height", innerHeight);

let note4 = group.append("use")
    .attr("x", 675)
    .attr("y", 600)
    .attr("xlink:href","#note3")
    .attr("stroke", "black")
    .attr("id", "n3")

let note = group.append("use")
    .attr("x", 600)
    .attr("y", 525)
    .attr("xlink:href","#note1")
    .attr("stroke", "black")

let note2 = group.append("use")
    .attr("x", 435)
    .attr("y", 475)
    .attr("xlink:href","#note2")
    .attr("stroke", "black")
    .attr("id", "n2")

let note3 = group.append("use")
    .attr("x", 325)
    .attr("y", 400)
    .attr("xlink:href","#note3")
    .attr("stroke", "black")
    .attr("id", "n3")

function createNotes() {
    let note1 = defs.append("g")
        .attr("id", "note1")
        .attr("fill", "black")
    note1.append("polygon")
        .attr("points", "56 36 124 24 124 116 144 116 144 0 36 20 36 136 56 136")
    note1.append("path")
        .attr("d", "M56,136 C56,149.254 43.469,160 28,160 C12.531,160 0,149.254 0,136 C0,122.746 12.531,112 28,112 C43.469,112 56,122.746 56,136 Z")
    note1.append("path")
        .attr("d", "M144,116 C144,129.254 131.469,140 116,140 C100.531,140 88,129.254 88,116 C88,102.746 100.531,92 116,92 C131.469,92 144,102.746 144,116 Z")

    let note2 = defs.append("g")
        .attr("id", "note2")
        .attr("fill", "black")
    note2.append("polygon")
        .attr("points", "124 0 124 116 144 116 144 0")
    note2.append("path")
        .attr("d", "M144,116 C144,129.254 131.469,140 116,140 C100.531,140 88,129.254 88,116 C88,102.746 100.531,92 116,92 C131.469,92 144,102.746 144,116 Z")

    let note3 = defs.append("g")
        .attr("id", "note3")
        .attr("fill", "black")
    note3.append("polygon")
        .attr("points","124 0 124 116 144 116 144 24 198 46")
    note3.append("path")
        .attr("d", "M144,116 C144,129.254 131.469,140 116,140 C100.531,140 88,129.254 88,116 C88,102.746 100.531,92 116,92 C131.469,92 144,102.746 144,116 Z")

}