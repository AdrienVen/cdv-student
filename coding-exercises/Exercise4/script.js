let viz = d3.select("#container-div").append("svg")
    .attr("width",window.innerWidth)
    .attr("height", window.innerHeight)
    .attr("id","viz");

d3.json("earwormsData.JSON").then(gotData);

function gotData(inputData) {

    var spaces = viz.selectAll("empty").data(inputData).enter()
    var groups = spaces.append("g")
        .attr("stroke", "black")
        .attr("class", "groups")

    populateGroup(groups)
}

function populateGroup(group){
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

function randomX() {
    let result;
    let min = Math.ceil(70);
    let max = Math.floor(1250);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function placeX(){
    var result = randomX();
    xs.push(result)
    return result;
}

function placeY(){
    let min = Math.ceil(100);
    let max = Math.abs(Math.cos(Math.PI/1180 * xs[iX]) * 700);
    iX+=1
    console.log(max);
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

function reset(){
    iX=0;
    iY=0;
}

function getSangIt(datapoint){
    if(datapoint.sangIt === "Yes"){
        return "#music"
    } else {
        return "#cross"
    }
}