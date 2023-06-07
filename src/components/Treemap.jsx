import * as d3 from "d3";

const Treemap = ({ jsonUrl }) => {
  const width = 970;
  const height = 600;

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "grey")
    .style("padding", "10px")
    .style("opacity", 1)
    .style("color", "white")
    .style("border-radius", "5px");

  d3.json(jsonUrl).then((data) => {
    const svg = d3
      .select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "flex")
      .style("font-family", "Helvetica");

    const fader = (color) => {
      return d3.interpolateRgb(color, "#fff")(0.2);
    };

    const color = d3.scaleOrdinal().range(d3.schemePaired.map(fader));

    const treemap = d3
      .treemap()
      .tile(d3.treemapResquarify)
      .size([width, height])
      .paddingInner(1);

    const root = d3
      .hierarchy(data)
      .eachBefore(function (d) {
        d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
      })
      .sum(sumBySize)
      .sort(function (a, b) {
        return b.height - a.height || b.value - a.value;
      });

    treemap(root);

    /* **************** mouse move functions ******************** */

    const mouseOver = () => {
      return tooltip.style("visibility", "visible");
    };

    const mouseMove = (d, i) => {
      tooltip
        .attr("data-value", `${i.data.value}`)
        .style("left", d.pageX + 10 + "px")
        .style("top", d.pageY + 20 + "px");

      d3.selectAll("#tooltip")
        .html(
          `Name: ${i.data.name}<br> Category: ${i.data.category}<br> Value: ${i.data.value}`
        )
        .style("font-size", "0.8rem")
        .style("font-family", "Helvetica");

      return tooltip.style("visibility", "visible");
    };

    const mouseOut = () => {
      return tooltip.style("visibility", "hidden");
    };

    /* **************** end mouse move functions ******************** */


    const cell = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    cell
      .append("rect")
      .attr("id", function (d) {
        return d.data.id;
      })
      .attr("class", "tile")
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("fill", function (d) {
        return color(d.data.category);
      })
      .attr("data-name", function (d) {
        return d.data.name;
      })
      .attr("data-category", function (d) {
        return d.data.category;
      })
      .attr("data-value", function (d) {
        return d.data.value;
      })
      .on("mouseover", (d, i) => mouseOver())
      .on("mousemove", (d, i) => mouseMove(d, i))
      .on("mouseout", (d, i) => mouseOut());

    cell
      .append("text")
      .selectAll("tspan")
      .data(function (d) {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append("tspan")
      .attr("x", 4)
      .attr("y", function (d, i) {
        return 13 + i * 10;
      })
      .text(function (d) {
        return d;
      });

    function sumBySize(d) {
      return d.value;
    }
  });
  return <svg width={width} height={height} id="map"></svg>;
};
export default Treemap;
