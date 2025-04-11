function showChart(id) {
  const charts = ["lineChart", "scatterPlot", "barChart"];
  charts.forEach(chart => {
    document.getElementById(chart).style.display = chart === id ? "block" : "none";
  });
}
