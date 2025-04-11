// D3 Line Chart: MPG by Year + Origin
d3.csv("a1-cars.csv").then(data => {
  // Parse data
  data.forEach(d => {
    d["Model Year"] = +d["Model Year"];
    d.MPG = +d.MPG;
  });

  // Nest data by origin
  const nested = d3.groups(data, d => d["Origin"]);

  // Set up SVG
  const margin = {top: 40, right: 80, bottom: 50, left: 60},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#lineChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([70, 82]).range([0, width]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.MPG)]).range([height, 0]);
  const color = d3.scaleOrdinal(d3.schemeSet2);

  svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).tickFormat(d => 1900 + d));
  svg.append("g").call(d3.axisLeft(y));

  // Line generator
  const line = d3.line()
    .defined(d => !isNaN(d.MPG))
    .x(d => x(d["Model Year"]))
    .y(d => y(d.MPG));

  nested.forEach(([origin, values], i) => {
    svg.append("path")
      .datum(values)
      .attr("fill", "none")
      .attr("stroke", color(origin))
      .attr("stroke-width", 2)
      .attr("d", line);

    // Label
    svg.append("text")
      .attr("x", width - 60)
      .attr("y", y(values[values.length - 1].MPG))
      .attr("fill", color(origin))
      .text(origin);
  });

  svg.append("text").attr("x", width / 2).attr("y", -15)
    .attr("text-anchor", "middle").style("font-size", "16px").text("MPG Over Years by Origin");

  svg.append("g")
   .attr("class", "axis")
   .call(d3.axisBottom(x));

  svg.append("g")
   .attr("class", "axis")
   .call(d3.axisLeft(y));

});
