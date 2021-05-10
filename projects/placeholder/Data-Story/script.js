let w = 1200;
let h = 800;
let padding = 90;
let rotationOn = true;

let viz1 = d3.select("#hubs").append("svg")
    .style("width", w)
    .style("height", h)
d3.csv("research/hubs.csv").then(gotHubsData)
function gotHubsData(nodes){
    d3.csv("research/hunters.csv").then(function(hunters){
        d3.csv("research/hub-links.csv").then(function (links) {
            d3.json("research/countries.geojson").then(function (geoData) {


                let hubProjection = d3.geoEquirectangular().scale(200).translate([w / 2, ((h / 2) -100)]);
                let xScale = function (x, y) {
                    var pos = hubProjection([x, y]);
                    return pos[0];
                }
                let yScale = function (x, y) {
                    var pos = hubProjection([x, y]);
                    return pos[1];
                }
                let hubPathMaker = d3.geoPath(hubProjection)
                viz1.selectAll(".province").data(geoData.features).enter()
                    .append("path")
                    .attr("class", "countries")
                    .attr("d", hubPathMaker)
                    .attr("fill", "none")
                    .attr("stroke", "white");


                let simulation = d3.forceSimulation(nodes)
                    .force("link", d3.forceLink(links)
                        .id(d => d.Name)
                        .distance(d => d.dist))
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
                    .selectAll("rect")
                    .data(nodes)
                    .join("g") .attr("class","hubs")
                    .append("rect")
                    .attr("fill", "red")
                    .attr("width", 30)
                    .attr("height", 20)
                node.append("title")
                    .text(d => d.Name);
                let hub_cards = viz1.selectAll(".hubs")

                hub_cards.on("click", function (event,data) {
                    hub_cards.selectAll("rect")
                        .transition().attr("fill", "red")
                        .attr("width", 30)
                        .attr("height", 20)
                        .attr("transform", function() {
                            if (d3.select(this).attr("transform") === "translate(-75,0)"){
                                return "translate(75,0)";
                            } else {
                                return "translate(0,0)"
                            }
                        })
                    hub_cards.selectAll("image").transition().remove()
                    hub_cards.selectAll("text").transition().remove()
                    let rect = d3.select(this).select("rect")

                    rect.transition().attr("width","150")
                        .attr("height","125")
                        .attr("fill","lavender")
                        .attr("transform", function() {
                            return "translate(-75,0)";
                        })
                    hub_cards.append("image")
                        .transition().attr("transform", function() {
                            return "translate(-65,20)";
                        })
                        .attr('width', 130)
                        .attr("xlink:href",data.image)
                        .attr('x', rect.attr("x")+10)
                        .attr('y', rect.attr("y")+10)

                    hub_cards.append("text")
                        .text(function(){
                            return data.Name+', '+data.country
                        }).transition()
                        .attr('x', rect.attr("x"))
                        .attr('y', rect.attr("y"))
                        .attr("dy", ".35em")
                        .attr("stroke","black")
                        .attr("stroke-width",0.5)
                        .attr("transform", function(){
                            return "translate(-65,10)";
                        })
                    hub_cards.append("title")
                        .text(function(d){
                            return d.desc
                        })
                    viz1.selectAll(".hunters").transition().remove()
                    let people = viz1.selectAll(".hunters").data(hunters.filter(function (d){
                        return d.hub === data.Name
                    })).enter().append("g").attr("class","hunters")

                    people.append("image").transition()
                        .attr("height","100")
                        .attr("xlink:href",function(d){
                            return d.pic
                        })
                        .attr("x",function(d,i){
                            if (i === 0){
                                return parseInt(rect.attr("x")) - 100
                            } else {
                                return parseInt(rect.attr("x")) + 100
                            }

                        })
                        .attr("y",function(){
                            return parseInt(rect.attr("y")) + 200
                        })
                    people.append("text").text(function(d){
                        return d.name
                    })
                        .attr("stroke","red")
                        .attr("stroke-width",".5")
                        .attr("x",function(d,i){
                            if (i === 0){
                                return parseInt(rect.attr("x")) - 100
                            } else {
                                return parseInt(rect.attr("x")) + 100
                            }

                        })
                        .attr("y",function(){
                            return parseInt(rect.attr("y")) + 200
                        })
                        people.append("title")
                        .text(function(d){return d.bio})

                })

                simulation.on("tick", () => {
                    link.attr("x1", function (d) {
                        return xScale(d.source.Long, d.source.Lat)
                    })
                        .attr("y1", function (d) {
                            return yScale(d.source.Long, d.source.Lat)
                        })
                        .attr("x2", function (d) {
                            return xScale(d.target.Long, d.target.Lat)
                        })
                        .attr("y2", function (d) {
                            return yScale(d.target.Long, d.target.Lat)
                        });

                    node.attr("x", function (d) {
                        return xScale(d.Long, d.Lat)
                    })
                        .attr("y", function (d) {
                            return yScale(d.Long, d.Lat)
                        });
                    return viz1.node();
                })
            })
        })
    })
}

let viz2 = d3.select("#prices").append("svg")
    .style("width", w)
    .style("height", h-100)

d3.csv("research/prices.csv").then(gotData)
function gotData(dataset) {
    let priceExtent = d3.extent(dataset, function(d){
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
        .style("fill", function(d) {
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

d3.csv("research/Meteorite-Landings.csv").then(function(landings){
    d3.csv("research/prices.csv").then(function(prices){
        d3.json("research/countries.geojson").then(function(geoData){
            const sensitivity = 75;
            let projection = d3.geoOrthographic().scale(280).translate([w / 2, h / 2]);
            let generator = d3.geoPath().projection(projection);
            let pathMaker = d3.geoPath(projection);

            viz_group = viz3.append("g").attr("id","mapping")

            viz_group.selectAll(".province").data(geoData.features).enter()
                .append("path")
                .attr("class", "province")
                .attr("d", pathMaker)
                .attr("fill", "black")
                .attr("stroke", "white");

            viz_group.on("click", function(event){
                viz3.select("#close").remove()
                viz3.select("#location").remove()
                viz3.selectAll(".sightings").remove()
                let mousePos = d3.pointer(event,d3.select("#mapping").node())
                let xPos = mousePos[0]
                let yPos = mousePos[1]
                let coords = projection.invert([xPos,yPos])
                var circle = d3.geoCircle()
                    .center(coords)
                    .radius(2);
                viz3.append("path")
                    .attr('d', function(){
                        return generator(circle());
                    })
                    .attr("id","location")
                    .attr("fill","red")
                showClosest(coords, prices)

            })
            viz_group.call(d3.drag().on('drag', function(event){
                const rotate = projection.rotate()
                const k = sensitivity / projection.scale()
                projection.rotate([
                    rotate[0] + event.dx * k,
                    rotate[1] - event.dy * k
                ])
                viz3.selectAll("path").attr("d", generator)

            }))

            function showSimilar(meteoriteClass, meteoriteName){
                viz3.selectAll("sightings").data(landings.filter(function(d){
                        return d.recclass.includes(meteoriteClass);})
                    )
                    .enter().append('path').transition()
                    .attr('d', function(d){
                        let finds = [d.reclat,d.reclong];
                        circle2 = d3.geoCircle()
                            .center(finds)
                            .radius(1);
                        return generator(circle2());
                    })
                        .attr("fill","blue")
                viz3.selectAll("text").remove()
                viz3.append("text").text(function(){
                    return "Closest high-seller: "+meteoriteName+" meteorite."
                }).attr("stroke","white")
                    .attr("fill", "white")
                    .attr("stroke-width",.5)
                    .attr("y", 650)
                viz3.append("text").text(function(){
                    return "Meteorite class: "+meteoriteClass+" meteorite. Highlighting similar in blue!"
                }).attr("stroke","white")
                    .attr("fill", "white")
                    .attr("stroke-width",.5)
                    .attr("y", 700)
            }

            function findClosest(prices, coords) {
                let minDist = 99999;
                let closest;
                for (let i = 0; i < prices.length; i++) {
                    let x1 = coords[0]
                    let y1 = coords[1]
                    let dist = (x1 - prices[i].long) ** 2 + (y1 - prices[i].lat) ** 2
                    if (dist < minDist) {
                        minDist = dist
                        closest = prices[i];
                    }
                }
                return closest;
            }

            function showClosest(coords, prices){
                let closest = findClosest(prices, coords);
                var circle = d3.geoCircle()
                    .center([closest.long,closest.lat])
                    .radius(3);
                viz3.append('path')
                    .attr('d', function(){
                        return generator(circle());
                    })
                    .attr("fill","green")
                    .attr("id","close")
                showSimilar(closest.Class, closest.Name)
            }
        })

    })
})
