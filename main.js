// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT1 = 720;
const MARGIN = {TOP: 40, RIGHT: 100, BOTTOM: 100, LEFT:175};



    WIDTH= (MAX_WIDTH / 2) - 10, HEIGHT = 275
    console.log(WIDTH)
    const svg = d3.select("#graph1").append("svg")
      .attr("width", WIDTH )
      .attr("height", HEIGHT )
      .append("g")
      .attr("transform", `translate( ${WIDTH/2-50} , ${HEIGHT/2})`)

     svg.append("text")
        .attr("class", "Title")
        .attr("x", 75)
        .attr("y", -125)
        .attr("font-size", "15px")
        .attr("text-anchor", "middle")
        .text("2) Genre Sales broken down per region")

    svg.append("text")
          .attr("class", "sub_title")
          .attr("x", 75)
          .attr("y", -110)
          .attr("font-size", "10px")
          .attr("text-anchor", "middle")
          .text("(Please press the buttons above for interactivity)")


var radius = Math.min(WIDTH, HEIGHT) / 2 - MARGIN.TOP

var data1 = {Sports: 683.35, Platform: 447.05, Racing:359.42, RolePlaying:327.28, Puzzle:123.78,Misc:410.24,Shooter:582.6,Simulation:183.31,Action:877.83,Fighting:223.59,Adventure:105.80,Strategy:68.70}
var data2 = {Sports: 376.85, Platform: 201.63, Racing:238.39, RolePlaying:188.06, Puzzle:50.780,Misc:215.980,Shooter:313.270,Simulation:113.38,Action:525.0,Fighting:101.32,Adventure:64.13,Strategy:45.34}
var data3={Sports: 135.37, Platform: 130.77, Racing:56.69, RolePlaying:352.31, Puzzle:57.31,Misc:107.76,Shooter:38.28,Simulation:63.7,Action:159.95,Fighting:87.35,Adventure:52.07,Strategy:49.46}
// set the color scale
var color = d3.scaleOrdinal()
  .domain(["Sports", "Platform", "Racing","RolePlaying","Puzzle","Misc","Shooter","Simulation","Action","Fighting","Adventure","Strategy"])
  .range(d3.schemePaired);
keys=["Sports", "Platform", "Racing","RolePlaying","Puzzle","Misc","Shooter","Simulation","Action","Fighting","Adventure","Strategy"]

  var size = 20
  svg.selectAll("mydots")
    .data(keys)
    .enter()
    .append("rect")
      .attr("x", 100)
      .attr("y", function(d,i){ return  i*11})
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})




  svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
      .attr("x", 100 + size*1.2)
      .attr("y", function(d,i){ return  i*11 + (size/2)})
      .style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")



function update(data) {


  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} )
  var data_final = pie(d3.entries(data))


  var chart = svg.selectAll("path")
    .data(data_final)



  chart
    .enter()
    .append('path')
    .merge(chart)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)




  chart
    .exit()
    .remove()

}


update(data1)
