d3.json("earwormsData.JSON").then(gotData);
console.log("working");

function gotData(inputData) {

    var groups = viz.selectAll("empty").data(inputData).enter()
        .append("g")
        .attr("fill", mapColor)
        .attr("stroke", "black")
        .attr("class", "groups")

    var rectangles = groups.append("rect")
        .attr("width" , 160)
        .attr("height", 160)
        .attr("x", incrementX)
        .attr("y", incrementY)

    reset()
    var circles = groups.append("circle")
        .attr("cx", incrementX)
        .attr("cy", incrementY)
        .attr("r", 50)
        .attr("fill", "none")
        .attr("stroke", mapColor2)
        .attr("stroke-width", "7px")

    reset()
    var images = groups.append("image")
        .attr("x", incrementX)
        .attr("y", incrementY)
        .attr("width", 150)
        .attr("height",150)
        .attr("xlink:href", getImgUrl);

}

let viz = d3.select("#container-div").append("svg")
    .attr("width",window.innerWidth)
    .attr("height", window.innerHeight*1.4)
    .attr("id","viz");

function mapColor(datapoint){
    switch (datapoint.genre){
        case "Rock":
            return "red"
        case "Pop":
            return "pink"
        case "Hip Hop":
            return "purple"
    }
}

function mapColor2(datapoint){
    switch (datapoint.whatIWasDoing){
        case "Relaxing":
            return "yellow"
        case "Working":
            return "orange"
        case "Daydreaming":
            return "green"
        case "Doing chores":
            return "blue"
    }
}

function chooseShape(datapoint){
    switch (datapoint.sangIt){
        case "Yes":
            return "rect"
        case "No":
            return "circle"
    }
}

function incrementX (datapoint){
    let pos = datapoint.timestamp[9]-8;
    return xPos+250*pos;
}


function incrementY(datapoint){
    if (datapoint.timestamp[9]-8 > currDay){
        yPos=50;
        currDay += 1;
    }
    yPos += 100;
    return yPos;
}


var yPos=50;
var xPos = 60;
var currDay=0;

function reset(){
    yPos = 50;
    xPos = 60;
    currDay = 0;
}

function getImgUrl (datapoint){
    return datapoint.arturl;
    //return json.tracks.items[0].album.images[0].url;
}