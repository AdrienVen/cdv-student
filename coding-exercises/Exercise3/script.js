d3.json("earwormsData.JSON").then(gotData);
console.log("working");

function gotData(inputData) {
    console.log("running");
    viz.selectAll("empty").data(inputData).enter()
        .append("image")
        .attr("x", incrementX)
        .attr("y", incrementY)
        .attr("width", 150)
        .attr("height",150)
        .attr("xlink:href", getImgUrl);

}

let viz = d3.select("#container-div").append("svg")
    .attr("width",window.innerWidth)
    .attr("height", window.innerHeight*.8)
    .attr("id","viz");

function incrementX (datapoint){
    let pos = datapoint.timestamp[9]-8;
    return 20+250*pos;

}

function reset(){
    yPos = 0;
    currDay = 0;
}

function incrementY(datapoint){
    if (datapoint.timestamp[9]-8 > currDay){
        yPos=50;
        currDay += 1;
    }
    yPos += 50;
    return yPos;

}
var yPos=50;
var currDay=0;

function getImgUrl (datapoint){
    return datapoint.arturl;
    //return json.tracks.items[0].album.images[0].url;
}