// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)

console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data!=='undefined'?data:"nothing here");
console.log(typeof data!=='undefined'?"seems like it ;-) it comes from the dataManager.js script.":"...damnit! let's see what is going wrong in the dataManager.js script.");

let w = 900
let h = 600
let pad = 75

let valExtent = d3.extent(data, function(d, i){
    return d.value;
});
let yScale = d3.scaleLinear().domain(valExtent).range([50, h-pad*2]);

let allNames = data.map(function(d){return d.key});
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([pad, w-pad])
    .paddingInner(0.15);

let viz = d3.select("#container").append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("margin","auto")
    .style("max-width",900);

let xAxis = d3.axisBottom(xScale)
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
let xAxisGroup = viz.append("g").classed("xAxis", true);
xAxisGroup.call(xAxis);
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
xAxisGroup.selectAll("line").remove();
xAxisGroup.attr("transform", "translate(0,"+ (h-pad) +")")

let graphGroup = viz.append("g").classed("graphGroup", true);

let groups = graphGroup.selectAll(".datapoints").data(data)
let enterGroup = groups.enter()
let exitGroup = groups.exit()

let enteringData = enterGroup.append("g").classed("datapoint",true)
enteringData.attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - pad) + ")"
})

var bars = enteringData.append("rect")
    .attr("width", function(){
        return xScale.bandwidth()
    })

    .attr("height", function (d, i) {
        return yScale(d.value);
    })
    .attr("y", function(d,i){return -yScale(d.value)})
    .attr("fill", "black")
    .attr("stroke", "white")

function updateRemaining() {
    allNames = data.map(function (d) {
        return d.key
    });
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => {
        return data.filter(dd => dd.key == d)[0].name;
    });
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);
    yMax = d3.max(data, function (d) {
        return d.value
    });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);
    groups = graphGroup.selectAll(".datapoint").data(data);
    groups.transition().duration(1000).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - pad) + ")"
    });

    groups.select("rect")
        .transition()
        .delay(1000)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        });
}
function handleIncoming() {
    enterGroup = groups.enter();
    let incomingDataGroups = enterGroup
        .append("g")
        .classed("datapoint", true);
    incomingDataGroups.attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - pad) + ")"
    });
    incomingDataGroups
        .append("rect")
        .attr("y", function (d, i) {
            return 0;
        })
        .attr("height", function (d, i) {
            return 0;
        })
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("fill", function (d, i) {
            return "#" + d.key
        })
        .transition()
        .delay(1200)
        .duration(500)
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        .attr("fill", "black");
}

function updateRemaining2(scaleDelay) {
    allNames = data.map(function (d) {
        return d.key
    });
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => {
        return data.filter(dd => dd.key == d)[0].name;
    });
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18).attr("class","emojis");
    yMax = d3.max(data, function (d) {
        return d.value
    });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);
    groups = graphGroup.selectAll(".datapoint").data(data);
    groups.transition().delay(scaleDelay).duration(1000).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - pad) + ")"
    });

    groups.select("rect")
        .transition()
        .delay(1000)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        });
}
function handleOutgoing() {
    groups = graphGroup.selectAll(".datapoint").data(data);
    exitGroup = groups.exit()
    let outgoingDataGroups = exitGroup
        .classed("datapoint", true);
    outgoingDataGroups.attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - pad) + ")"
    });
    outgoingDataGroups.select("rect")
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        .attr("fill", function (d, i) {
            return "#" + d.key;
        })
        .transition()
        .duration(1000)
        .attr("y", function (d, i) {
            return 0;
        })
        .attr("height", function (d, i) {
            return 0;
        })
        .attr("fill", "black")
    exitGroup.transition().delay(2000).remove()

}



function add(num){
    addDatapoints(num);
    updateRemaining2(0);
    handleIncoming();
}
document.getElementById("buttonA").addEventListener("click", function(){
    add(1)
})

function remove(num){
    removeDatapoints(num);
    handleOutgoing();
    updateRemaining2(1000);

}
document.getElementById("buttonB").addEventListener("click", function(){
    remove(1)
})

document.getElementById("buttonC").addEventListener("click", function(){
    let pickRandom = d3.randomNormal(3,2)
    let addNum = Math.abs(Math.floor(pickRandom()))
    let removeNum = Math.abs(Math.floor(pickRandom()))
    remove(removeNum)
    add(addNum)

})

document.getElementById("buttonD").addEventListener("click", function(){
    sortDatapoints();
    updateRemaining2(0);
})

document.getElementById("buttonE").addEventListener("click",function (){
    shuffleDatapoints();
    updateRemaining2(0);
})

document.getElementById("buttonF").addEventListener("click", function(){
    party = !party
    if (party){
        d3.select("#bod").transition().duration(15000).style("background-color","black");
        d3.select("#bod").style("background-image","disco.gif");
        document.getElementById("PARTY").play()
        document.getElementsByClassName("dance").innerHTML = "DANCE"
    } else {
        document.getElementById("PARTY").pause()
        d3.select("#bod").transition().duration(500).style("background-color","white");
        updateRemaining();
    }

})
function randomChange(){
    let pickRandom = d3.randomNormal(50,20)
    for (let i = 0; i < data.length; i++){
        data[i].value = pickRandom()
        data[i].name = "😎";
    }
    allNames = data.map(function (d) {
        return d.key
    });
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => {
        return data.filter(dd => dd.key == d)[0].name;
    });
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 36).attr("class","emojis");
    yMax = d3.max(data, function (d) {
        return d.value
    });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);
    groups = graphGroup.selectAll(".datapoint").data(data);
    groups.select("rect").attr("fill",function (d, i) {
        return "#" + d.key;
    })
        .transition().duration(50)
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        .attr("width", function(){
            return xScale.bandwidth();
        })
}
let party = false
setInterval(function(){
    if (party === true) {
        randomChange()
    }
}, 100);

setInterval(function(){
    if (party === true) {
        shuffleDatapoints();
    }
}, 400);