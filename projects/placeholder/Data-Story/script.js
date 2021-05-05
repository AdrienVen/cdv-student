let w = 1200;
let h = 800;
let padding = 90;
let rotationOn = true;

let viz1 = d3.select("#hubs").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender");
d3.csv("research/hubs.csv").then(gotHubsData)
function gotHubsData(nodes){
    d3.csv("research/hub-links.csv").then(function(links){
        d3.json("research/countries.geojson").then(function(geoData){


            let hubProjection = d3.geoEquirectangular().scale(200).translate([w/2, h/2+100]);
            let xScale = function(x,y){
                var pos = hubProjection([x,y]);
                return pos[0];
            }
            let yScale = function(x,y){
                var pos = hubProjection([x,y]);
                return pos[1];
            }
            let hubPathMaker = d3.geoPath(hubProjection)
            viz1.selectAll(".province").data(geoData.features).enter()
                .append("path")
                .attr("class", "countries")
                .attr("d", hubPathMaker)
                .attr("fill", function(d,i){
                    if (d.id == "CHN" || d.id == "FRA" || d.id == "MAR" || d.id == "USA"){
                        return "black";
                    } else {
                        return "none";
                    }
                })
                .attr("stroke", "black");



            let simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links)
                    .id(d => d.Name)
                    .distance(d => d.dist ))
                .force("charge", d3.forceManyBody().strength(-160))
                .force("center", d3.forceCenter(w / 2, h / 2))
            let link = viz1.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", d => Math.sqrt(d.dist));
            const node = viz1.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", 15)
                .attr("fill", "red");
            node.append("title")
                .text(d => d.Name);

            simulation.on("tick", () => {
                link.attr("x1", function(d){
                    return xScale(d.source.Long,d.source.Lat)
                })
                    .attr("y1", function(d){
                        return yScale(d.source.Long, d.source.Lat)
                    })
                    .attr("x2", function(d){
                        return xScale(d.target.Long,d.target.Lat)
                    })
                    .attr("y2", function(d){
                        return yScale(d.target.Long, d.target.Lat)
                    });

                node.attr("cx", function(d){
                    return xScale(d.Long,d.Lat)
                })
                    .attr("cy", function(d){
                        return yScale(d.Long, d.Lat)
                    });
                return viz1.node();

            })

        })
    })
}

let viz2 = d3.select("#prices").append("svg")
    .style("width", w)
    .style("height", h)

d3.csv("research/prices.csv").then(gotData)
function gotData(dataset) {
    let priceExtent = d3.extent(dataset, function(d, i){
        return d.Price;
    });
    let greenScale = d3.scaleLinear().domain(priceExtent).range([200,230]);
    let data = {"children":dataset}
    var diameter = 700
    let bubble = d3.pack(data)
        .size([diameter, diameter])
        .padding(1.5);
    var nodes = d3.hierarchy(data)
        .sum(function(d) { return d.Price; });
    var node = viz2.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + (d.x+200) + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.data.Name + "Meteorite: " + d.data.Price + "K";
        });
    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .attr("stroke","white")
        .style("fill", function(d,i) {
            let gVal = parseInt(greenScale(d.data.Price))
            return "rgb(0,"+gVal+','+"0"+')';
        });
    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return (d.data.Name).substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");
    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return "$" +d.data.Price + "K";
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");

}

let viz3 = d3.select("#locator").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender");
d3.csv("research/Meteorite-Landings.csv").then(function(landings){
    d3.csv("research/prices.csv").then(function(prices){
        d3.json("research/countries.geojson").then(function(geoData){
            const sensitivity = 75;
            let projection = d3.geoEquirectangular()
                .translate([w/2, h/2])
                .scale(190);
            let generator = d3.geoPath().projection(projection);
            // .fitExtent([[padding, padding], [w-padding, h-padding]], geoData);

            let pathMaker = d3.geoPath(projection);

            // CREATE SHAPES ON THE PAGE!
            viz_group = viz3.append("g").selectAll(".province").data(geoData.features).enter()
                .append("path")
                .attr("class", "province")
                .attr("d", pathMaker)
                .attr("fill", "grey")
                .attr("stroke", "white");

            function findSimilar(meteoriteClass){
                viz3.selectAll("sightings")
                    .data(landings.filter(function(d){
                        return d.recclass.includes(meteoriteClass);}))
                    .enter()
                    .append('path')
                    .attr('d', function(d){
                        let finds = projection([d.reclat,d.reclong]);
                        circle2 = d3.geoCircle()
                            .center(finds)
                            .radius(1);
                        return generator(circle2());
                    })
                    .attr("class","sightings")
                    .attr("fill","blue")
            }

            function findClosest(coords, prices){
                let minDist = 99999;
                let closest;
                for (let i = 0; i < prices.length; i++){
                    let x1 = coords[1]
                    let y1 = coords[0]
                    let dist = (x1 - prices[i].long)**2 + (y1 - prices[i].lat)**2
                    console.log(prices[i].Name,dist)
                    if (dist < minDist){
                        minDist = dist
                        closest = prices[i];
                    }

                }
                console.log(closest)
                viz3.append("text")
                    .attr("id","close")
                    .attr("fill","black")
                    .attr("y", 600)
                    .text("Closest high selling meteorite: "+ closest.Name + " meteorite. Highlighting similar meteorite sightings in blue!");
                findSimilar(closest.Class)
            }

            viz_group.on("click", function(event, d){
                let yPos = event.x - 155
                let xPos = event.y +10
                var coords = projection.invert([yPos,xPos])
                var circle = d3.geoCircle()
                    .center(coords)
                    .radius(1);
                viz3.select("#location").remove()
                viz3.select("#close").remove()
                viz3.selectAll(".sightings").remove()
                viz3.append('path')
                    .attr('d', function(d){
                        return generator(circle());
                    })
                    .attr("fill","red")
                    .attr("id","location");
                findClosest(coords, prices)

            })
        })

    })
})
