let viz = d3.select("#container").append("svg")
    .attr("width",innerWidth)
    .attr("height", innerHeight)
    .style("background-color","black")
let defs = d3.select("#container").append("svg").attr("width",0).attr("height",0);
createUses()
function createUses(){
    let note = defs.append("g")
        .attr("id", "note")
        .attr("fill", "white")
    note.append("polygon")
        .attr("points", "56 36 124 24 124 116 144 116 144 0 36 20 36 136 56 136")
    note.append("path")
        .attr("d", "M56,136 C56,149.254 43.469,160 28,160 C12.531,160 0,149.254 0,136 C0,122.746 12.531,112 28,112 C43.469,112 56,122.746 56,136 Z")
    note.append("path")
        .attr("d", "M144,116 C144,129.254 131.469,140 116,140 C100.531,140 88,129.254 88,116 C88,102.746 100.531,92 116,92 C131.469,92 144,102.746 144,116 Z")

    let cross = defs.append("g")
        .attr("id","cross")
        .attr("fill","red")
    cross.append("line")
        .attr("x1","10")
        .attr("y1", "10")
        .attr("x2","50")
        .attr("y2","50")
        .attr("stroke","red")
        .attr("stroke-width","10")
    cross.append("line")
        .attr("x1","50")
        .attr("y1", "10")
        .attr("x2","10")
        .attr("y2","50")
        .attr("stroke","red")
        .attr("stroke-width","10")
}

let group = viz.append("g")
let image = group.append("image")
    .attr("xlink:href","./assets/right-head.png")
    .attr("x", -450)
    .attr("y",10)
    .attr("width", innerWidth)
    .attr("height", innerHeight);
let ear = group.append("image")
    .attr("xlink:href","./assets/ear.png")
    .attr("x", 350)
    .attr("y",250)
    .attr("width", 120)
    .attr("height", 275);

group.append("circle")
    .attr("r", 18)
    .attr("cx", 700)
    .attr("cy", 100)
    .attr("fill","#f72585")

group.append("image")
    .attr("xlink:href","./assets/legend2.png")
    .attr("x", 730)
    .attr("y",62)
    .attr("width", 150);


group.append("circle")
    .attr("r", 18)
    .attr("cx", 700)
    .attr("cy", 200)
    .attr("fill","#7209B7")

group.append("image")
    .attr("xlink:href","./assets/legend3.png")
    .attr("x", 740)
    .attr("y",162)
    .attr("width", 100);

group.append("circle")
    .attr("r", 18)
    .attr("cx", 700)
    .attr("cy", 300)
    .attr("fill","#480CA8")

group.append("image")
    .attr("xlink:href","./assets/legend1.png")
    .attr("x", 730)
    .attr("y",262)
    .attr("width", 200);


group.append("circle")
    .attr("r", 18)
    .attr("cx", 700)
    .attr("cy", 400)
    .attr("fill","#3A0CA3")

group.append("image")
    .attr("xlink:href","./assets/legend4.png")
    .attr("x", 740)
    .attr("y",362)
    .attr("width", 130);

group.append("circle")
    .attr("r", 18)
    .attr("cx", 700)
    .attr("cy", 500)
    .attr("fill","#18055f")

group.append("image")
    .attr("xlink:href","./assets/legend5.png")
    .attr("x", 740)
    .attr("y",462)
    .attr("width", 130);



group.append("circle")
    .attr("r", 18)
    .attr("cx", 1000)
    .attr("cy", 100)
    .attr("fill","black")
    .attr("stroke","#3F37C9")
    .attr("stroke-width", 3)

group.append("image")
    .attr("xlink:href","./assets/legend6.png")
    .attr("x", 1040)
    .attr("y",70)
    .attr("width", 150);

group.append("circle")
    .attr("r", 18)
    .attr("cx", 1000)
    .attr("cy", 200)
    .attr("fill","black")
    .attr("stroke","#4361EE")
    .attr("stroke-width", 3)

group.append("image")
    .attr("xlink:href","./assets/legend7.png")
    .attr("x", 1040)
    .attr("y",180)
    .attr("width", 150);

group.append("circle")
    .attr("r", 18)
    .attr("cx", 1000)
    .attr("cy", 300)
    .attr("fill","black")
    .attr("stroke","#4895EF")
    .attr("stroke-width", 3)

group.append("image")
    .attr("xlink:href","./assets/legend8.png")
    .attr("x", 1040)
    .attr("y",270)
    .attr("width", 150);

group.append("circle")
    .attr("r", 18)
    .attr("cx", 1000)
    .attr("cy", 400)
    .attr("fill","black")
    .attr("stroke","#4CC9F0")
    .attr("stroke-width", 3)

group.append("image")
    .attr("xlink:href","./assets/legend9.png")
    .attr("x", 1030)
    .attr("y",380)
    .attr("width", 160);

group.append("use")
    .attr("x", 1000)
    .attr("y", 500)
    .attr("size", 10)
    .attr("xlink:href","#note")
    .attr("fill","white")

group.append("image")
    .attr("xlink:href","./assets/legend10.png")
    .attr("x", 1030)
    .attr("y",480)
    .attr("width", 160);


group.append("use")
    .attr("x", 1000)
    .attr("y", 600)
    .attr("xlink:href","#cross")

group.append("image")
    .attr("xlink:href","./assets/legend11.png")
    .attr("x", 1030)
    .attr("y",580)
    .attr("width", 160);
