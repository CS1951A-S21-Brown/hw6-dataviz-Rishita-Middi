//const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const MARGIN1 = {TOP: 40, RIGHT: 100, BOTTOM: 100, LEFT:175};

const WIDTH = 600 - MARGIN1.LEFT - MARGIN1.RIGHT
const HEIGHT = 400 - MARGIN1.TOP - MARGIN1.BOTTOM

const svg_barplot = d3.select("#graph2").append("svg")
  .attr("width", WIDTH + MARGIN1.LEFT + MARGIN1.RIGHT)
  .attr("height", HEIGHT + MARGIN1.TOP + MARGIN1.BOTTOM)

const g_barplot = svg_barplot.append("g")
  .attr("transform", `translate(${MARGIN1.LEFT}, ${MARGIN1.TOP})`)

// X label
g_barplot.append("text")
  .attr("class", "x axis-label")
  .attr("x", (WIDTH / 2)-10)
  .attr("y", HEIGHT + 95)
  .attr("font-size", "15px")
  .attr("text-anchor", "middle")
  .text("Names of the games")

// Y label
g_barplot.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Global Sales")

// Graph title
g_barplot.append("text")
  .attr("class", "Title")
  .attr("x", 200)
  .attr("y", 50)
  .attr("font-size", "17px")
  .attr("text-anchor", "middle")
  .text("1) Top 10 games based on Global sales")

d3.csv("data/video_games.csv", function(data) {
  data=cleanData(data,function(a,b){
      return parseInt(b.Global_Sales)-parseInt(a.Global_Sales)
  },10)

  const x = d3.scaleBand()
    .domain(data.map(function(d) {return d.Name}))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d){return d.Global_Sales})])
    .range([HEIGHT, 0])

  const xAxisCall = d3.axisBottom(x)
  g_barplot.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")

  const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(function (d){return (d + "m")})
  g_barplot.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)

    let color = d3.scaleOrdinal()
           .domain(data.map(function(d) { return d["Global_Sales"] }))
           .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));

  const rects = g_barplot.selectAll("rect")
    .data(data)

  rects.enter().append("rect")
    .attr("y", function(d) {return y(d.Global_Sales)})
    .attr("x", function(d) {return x(d.Name)})
    .attr("width", x.bandwidth)
    .attr("height", function(d){return  HEIGHT - y(d.Global_Sales)})
    .attr("fill", function(d){return color(d.Global_Sales)})
})

function cleanData(data, comparator, numExamples) {
    return data.sort(comparator).slice(0,10);
}
