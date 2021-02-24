d3.json("earwormsData.JSON").then(gotData);

const URL = "https://accounts.spotify.com/api/token";
const params = {"client_id" : "24894c42f78f4460a980085f20ece0b1", "client_secret": "ce4e111e0f1e4052a114f88de38b1552","grant_type" : "client_credentials"};
axios.post(URL,params).then(data=>console.log(data)).catch(err=>console.log(err));

function gotData(inputData) {

    var groups = viz.selectAll("empty").data(inputData).enter()
        .append("g")
        .attr("fill", mapGenre)
        .attr("stroke", "black")
        .attr("class", "groups")

    var genres = groups.append("circle")
        .attr("cx", placeX)
        .attr("cy", placeY)
        .attr("r", 12)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
    reset()

    var circles = groups.append("circle")
        .attr("cx", placeActivityX)
        .attr("cy", placeActivityY)
        .attr("r", 5)
        .attr("fill", "transparent")
        .attr("stroke", mapActivity)
        .attr("stroke-width", "1px")

   reset()
    var images = groups.append("image")
        .attr("x", placeImageX)
        .attr("y", placeImageY)
        .attr("width", 15)
        .attr("height",15)
        .attr("xlink:href", getImgUrl);

    reset()
    var sang = groups.append("use")
        .attr("xlink:href",getSangIt)
        .attr("x", placeSangX)
        .attr("y", placeSangY)
        .attr("stroke", "black")

}

let viz = d3.select("#container-div").append("svg")
    .attr("width",window.innerWidth)
    .attr("height", window.innerHeight)
    .attr("id","viz");

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
function placeX(){
    let min = Math.ceil(70);
    let max = Math.floor(1250);
    let result = Math.floor(Math.random() * (max - min + 1)) + min
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

function placeImageX () {
    var ogX = xs[iX];
    iX+=1;
    return ogX-7;
}

function placeImageY(){
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

function getImgUrl (datapoint){
    return datapoint.arturl;
    //return json.tracks.items[0].album.images[0].url;
}

function getSangIt(datapoint){
    if(datapoint.sangIt === "Yes"){
        return "#music"
    } else {
        return "#cross"
    }
}