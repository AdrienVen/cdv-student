


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
    .attr("xlink:href","./assets/left-head.png")
    .attr("height",600)
    .attr("y",300)
    .attr("x",200)

let greenHead = viz.append("g").attr("class","activityGroup");
greenHead.append("image")
    .attr("xlink:href","./assets/middle-head.png")
    .attr("height",700)
    .attr("y", 225)
    .attr("x",1000)

let blueHead = viz.append("g").attr("class","activityGroup");
blueHead.append("image")
    .attr("xlink:href","./assets/right-head.png")
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
    groupBySinging(blueGroup)
}

function groupByGenre(group){
    function randomX(datapoint) {
        switch (datapoint.genre){
            case "Rock":
                var min = Math.ceil(20);
                var max = Math.floor(70);
                return Math.floor(Math.random() * (max - min + 1)) + min

            case "Pop":
                var min = Math.ceil(200);
                var max = Math.floor(250);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Hip Hop":
                var min = Math.ceil(320);
                var max = Math.floor(430);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Reggae":
                var min = Math.ceil(530);
                var max = Math.floor(570);
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

    var lines = group.append("line")
        .attr("x1", placeX)
        .attr("y1", placeY)
        .attr("x2",350)
        .attr("y2",400)
        .attr("stroke-width","1px")
        .attr("stroke","#CFCFCF")
    reset()

    var genres = group.append("circle")
        .attr("fill", mapGenre)
        .attr("cx", placeLineX)
        .attr("cy", placeLineY)
        .attr("r", 12)
        .attr("stroke", mapActivity)
        .attr("stroke-width", "2px")
    reset()

    var circles = group.append("circle")
        .attr("cx", placeActivityX)
        .attr("cy", placeActivityY)
        .attr("r", 5)
        .attr("fill", "transparent")
        .attr("stroke", mapActivity)
        .attr("stroke-width", "2px")
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
                var min = Math.ceil(850);
                var max = Math.floor(900);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Working":
                var min = Math.ceil(1050);
                var max = Math.floor(1150);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Thinking":
                var min = Math.ceil(1300);
                var max = Math.floor(1375);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "Doing chores":
                var min = Math.ceil(1500);
                var max = Math.floor(1600);
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
    var lines = group.append("line")
        .attr("x1", placeX)
        .attr("y1", placeY)
        .attr("x2",1225)
        .attr("y2",400)
        .attr("stroke-width","1px")
        .attr("stroke","#CFCFCF")
    reset()

    var genres = group.append("circle")
        .attr("fill", mapGenre)
        .attr("cx", placeLineX)
        .attr("cy", placeLineY)
        .attr("r", 12)
        .attr("stroke", mapActivity)
        .attr("stroke-width", "2px")
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

function groupBySinging(group){
    function randomX(datapoint) {
        switch (datapoint.sangIt){
            case "Yes":
                var min = Math.ceil(1700);
                var max = Math.floor(1900);
                return Math.floor(Math.random() * (max - min + 1)) + min
            case "No":
                var min = Math.ceil(2100);
                var max = Math.floor(2400);
                return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }

    function placeX(datapoint){
        var result = randomX(datapoint);
        xs.push(result)
        return result;
    }

    function reset(){
        iX=60;
        iY=60;
    }

    function drawlines(){

    }

    var lines = group.append("line")
        .attr("x1", placeX)
        .attr("y1", placeY)
        .attr("x2",2000)
        .attr("y2",450)
        .attr("stroke-width","1px")
        .attr("stroke","#CFCFCF")
    reset()

    var genres = group.append("circle")
        .attr("fill", mapGenre)
        .attr("cx", placeLineX)
        .attr("cy", placeLineY)
        .attr("r", 12)
        .attr("stroke", mapActivity)
        .attr("stroke-width", "2px")
    reset()

    var circles = group.append("circle")
        .attr("cx", placeActivityX)
        .attr("cy", placeActivityY)
        .attr("r", 10)
        .attr("fill", "transparent")
        .attr("stroke", mapActivity)
        .attr("stroke-width", 1)
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
            return "#f72585"
        case "Pop":
            return "#7209B7"
        case "Hip Hop":
            return "#480CA8"
        case "Reggae":
            return "#3A0CA3"
        case "Disco":
            return "#18055f"
    }
}

function mapActivity(datapoint){
    switch (datapoint.whatIWasDoing){
        case "Relaxing":
            return "#3F37C9"
        case "Working":
            return "#4361EE"
        case "Thinking":
            return "#4895EF"
        case "Doing chores":
            return "#4CC9F0"
    }
}
let xs = [];
let ys = [];
let iX = 0;
let iY = 0;

function placeY(){
    let min = Math.ceil(50);
    let max = Math.abs(250);
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

function placeLineX() {
    var ogX = xs[iX];
    iX+=1;
    return ogX;
}

function placeLineY(){
    var ogY = ys[iY];
    iY+=1
    return ogY;
}

function getSangIt(datapoint){
    if(datapoint.sangIt === "Yes"){
        return "#note"
    } else {
        return "#cross"
    }
}