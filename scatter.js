
var margin = {top: 10, right: 30, bottom: 60, left: 125},
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_scatter = d3.select("#graph3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


         svg_scatter.append("text")
            .attr("class", "x axis-label")
            .attr("x", (WIDTH / 4)-10)
            .attr("y", HEIGHT + 160)
            .attr("font-size", "15px")
            .attr("text-anchor", "middle")
            .text("Genre")

          // Y label
          svg_scatter.append("text")
            .attr("class", "y axis-label")
            .attr("x", - (HEIGHT / 2))
            .attr("y", -60)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Publisher")

svg_scatter.append("text")
            .attr("class", "Title")
            .attr("x", 160)
            .attr("y", 20)
            .attr("font-size", "15px")
            .attr("text-anchor", "middle")
            .text("Top publisher per genre based on Global_Sales")
svg_scatter.append("text")
              .attr("class", "sub_title")
              .attr("x", 160)
              .attr("y", 50)
              .attr("font-size", "10px")
              .attr("text-anchor", "middle")
              .text("(Tooltip:Hover over dots to see the Global_Sales value)")

//Read the data
d3.csv("data/genre_publisher.csv", function(data) {

  // Add X axis
  var x = d3.scaleBand()
    .domain(['Sports' ,'Platform', 'Racing', 'Role-Playing', 'Puzzle', 'Misc' ,'Shooter','Simulation' ,'Action' ,'Fighting' ,'Adventure', 'Strategy'])
    .range([ 0, width ]);
  svg_scatter.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")

  // Add Y axis
  var y = d3.scaleBand()
    .domain(['Nintendo', 'Microsoft Game Studios' ,'Take-Two Interactive','Sony Computer Entertainment', 'Activision' ,'Ubisoft' ,'Bethesda Softworks'])
    .range([ height, 0]);
  svg_scatter.append("g")
    .call(d3.axisLeft(y));


  var tooltip = d3.select("#graph3")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")




  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    tooltip
      .html("The Global_Sales<br>for the best selling game: " + d.Global_Sales+" million")
      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]-50) + "px")

  }


  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(20000)
      .style("opacity", 0)
  }


  svg_scatter.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return (x(d.Genre)+16); } )
      .attr("cy", function (d) { return (y(d.Publisher)+25); } )
      .attr("r", 7)
      .style("fill", "#06D6A0")
      .style("opacity", 0.3)
      .style("stroke", "white")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

})
