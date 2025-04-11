d3.csv("a1-cars.csv").then(data => {
  data = data.filter(d => d.MPG && d.Horsepower);
  data.forEach(d => {
    d.Horsepower = +d.Horsepower;
    d.MPG = +d.MPG;
  });

  const margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
              .domain(d3.extent(data, d => d.Horsepower))
              .range([0, width]);
              
  const y = d3.scaleLinear()
              .domain(d3.extent(data, d => d.MPG))
              .range([height, 0]);

  // X Axis
  svg.append("g")
     .attr("transform", `translate(0,${height})`)
     .attr("class", "axis")
     .call(d3.axisBottom(x));

  // Y Axis
  svg.append("g")
     .attr("class", "axis")
     .call(d3.axisLeft(y));

  // Data points
  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", d => x(d.Horsepower))
    .attr("cy", d => y(d.MPG))
    .attr("r", 4)
    .attr("fill", "steelblue")
    .append("title")
    .text(d => `${d.Car} (${d.MPG} MPG)`);

  // Set axis color to black
  svg.selectAll(".axis path, .axis line, .axis text")
     .attr("stroke", "black")
     .attr("fill", "black");
});
