d3.csv("a1-cars.csv").then(data => {
  let mpgByMaker = d3.rollups(data, v => d3.mean(v, d => +d.MPG), d => d.Manufacturer)
                     .filter(([key, val]) => !isNaN(val))
                     .sort((a, b) => d3.descending(a[1], b[1]));

  const margin = {top: 20, right: 30, bottom: 120, left: 60},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#barChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand().domain(mpgByMaker.map(d => d[0])).range([0, width]).padding(0.2);
  const y = d3.scaleLinear().domain([0, d3.max(mpgByMaker, d => d[1])]).range([height, 0]);

  svg.append("g").attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x)).selectAll("text")
     .attr("transform", "rotate(-45)").style("text-anchor", "end");

  svg.append("g").call(d3.axisLeft(y));

  svg.selectAll("rect")
    .data(mpgByMaker)
    .enter().append("rect")
    .attr("x", d => x(d[0]))
    .attr("y", d => y(d[1]))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d[1]))
    .attr("fill", "#ff7f0e");

  svg.append("text").attr("x", width / 2).attr("y", -10)
    .attr("text-anchor", "middle").style("font-size", "16px").text("Average MPG by Manufacturer");
  
  svg.append("g")
   .attr("class", "axis")
   .call(d3.axisBottom(x));

  svg.append("g")
   .attr("class", "axis")
   .call(d3.axisLeft(y));


});
