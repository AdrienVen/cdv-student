


let viz = d3.select("#container").append("svg")
    .attr("width","inherit")
    .attr("height","inherit")
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

d3.json("./assets/earwormsData.JSON").then(gotData);

let redHead = viz.append("g").attr("class","genreGroup");
redHead.append("image")
    .attr("xlink:href","./assets/head-r.jpg")
    .attr("height",600)
    .attr("y",300)
    .attr("x",200)

let greenHead = viz.append("g").attr("class","activityGroup");
greenHead.append("image")
    .attr("xlink:href","./assets/head-g.jpg")
    .attr("height",600)
    .attr("y",300)
    .attr("x",1000)

let blueHead = viz.append("g").attr("class","activityGroup");
blueHead.append("image")
    .attr("xlink:href","./assets/head-b.jpg")
    .attr("height",600)
    .attr("y",300)
    .attr("x",1800)

function gotData(inputData) {
    console.log(inputData.length)
    var redGroup = redHead.selectAll("empty").data(inputData).enter()
    var blueGroup = blueHead.selectAll("empty").data(inputData).enter()
    var greenGroup = greenHead.selectAll("empty").data(inputData).enter()

    groupByGenre(redGroup)
    groupByActivity(greenGroup)
    //groupBySinging(blueGroup)
}

function groupByGenre(group){
    function randomX(datapoint) {
        switch (datapoint.genre){
            case "Rock":
                var min = Math.ceil(50);
                var max = Math.floor(110);
                return Math.floor(Math.random() * (max - min + 1)) + min

            case "Pop":
                var min = Math.ceil(160);
                var max = Math.floor(270);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Hip Hop":
                var min = Math.ceil(320);
                var max = Math.floor(430);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Reggae":
                var min = Math.ceil(480);
                var max = Math.floor(590);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Disco":
                var min = Math.ceil(640);
                var max = Math.floor(725);
                return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }

    function placeX(datapoint){
        var result = randomX(datapoint);
        xs.push(result)
        return result;
    }

    function reset(){
        iX=0;
        iY=0;
    }

    var genres = group.append("circle")
        .attr("fill", mapGenre)
        .attr("cx", placeX)
        .attr("cy", placeY)
        .attr("r", 12)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
    reset()

    var circles = group.append("circle")
        .attr("cx", placeActivityX)
        .attr("cy", placeActivityY)
        .attr("r", 5)
        .attr("fill", "transparent")
        .attr("stroke", mapActivity)
        .attr("stroke-width", "1px")
        .attr("center")

    reset()
    var sang = group.append("use")
        .attr("xlink:href",getSangIt)
        .attr("x", placeSangX)
        .attr("y", placeSangY)
        .attr("stroke", "black")

}

function groupByActivity(group){
    function randomX(datapoint) {
        switch (datapoint.whatIWasDoing){
            case "Relaxing":
                var min = Math.ceil(825);
                var max = Math.floor(975);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Working":
                var min = Math.ceil(1025);
                var max = Math.floor(1175);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Thinking":
                var min = Math.ceil(1225);
                var max = Math.floor(1375);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Doing chores":
                var min = Math.ceil(1425);
                var max = Math.floor(1575);
                return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }

    function placeX(datapoint){
        var result = randomX(datapoint);
        xs.push(result)
        return result;
    }

    function reset(){
        iX=30;
        iY=30;
    }

    var genres = group.append("circle")
        .attr("fill", mapGenre)
        .attr("cx", placeX)
        .attr("cy", placeY)
        .attr("r", 12)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
    reset()

    var circles = group.append("circle")
        .attr("cx", placeActivityX)
        .attr("cy", placeActivityY)
        .attr("r", 10)
        .attr("fill", "transparent")
        .attr("stroke", mapActivity)
        .attr("stroke-width", 3)
        .attr("center")

    reset()
    var sang = group.append("use")
        .attr("xlink:href",getSangIt)
        .attr("x", placeSangX)
        .attr("y", placeSangY)
        .attr("stroke", "black")

}

function mapGenre(datapoint){
    switch (datapoint.genre){
        case "Rock":
            return "red"
        case "Pop":
            return "pink"
        case "Hip Hop":
            return "purple"
        case "Reggae":
            return "brown"
        case "Disco":
            return "magenta"
    }
}

function mapActivity(datapoint){
    switch (datapoint.whatIWasDoing){
        case "Relaxing":
            return "yellow"
        case "Working":
            return "orange"
        case "Thinking":
            return "green"
        case "Doing chores":
            return "cyan"
    }
}
let xs = [];
let ys = [];
let iX = 0;
let iY = 0;

function placeY(){
    let min = Math.ceil(50);
    let max = Math.abs(Math.cos(Math.PI/4000 * xs[iX])*350);
    iX+=1
    let result = Math.floor(Math.random() * (max - min + 1)) + min
    ys.push(result)
    return result;
}

function placeActivityX (datapoint) {
    var ogX = xs[iX];
    iX+=1;
    return ogX-7;
}

function placeActivityY(datapoint){
    var ogY = ys[iY];
    iY+=1
    return ogY-7;
}

function placeSangX () {
    var ogX = xs[iX];
    iX+=1;
    return ogX-10;
}

function placeSangY(){
    var ogY = ys[iY];
    iY+=1
    return ogY-10;
}

function getSangIt(datapoint){
    if(datapoint.sangIt === "Yes"){
        return "#note"
    } else {
        return "#cross"
    }
}
