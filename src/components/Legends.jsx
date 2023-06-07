import * as d3 from "d3";

const width = 600;
const height = 250;
const Legends = ({ jsonUrl }) => {
  const fader = (color) => {
    return d3.interpolateRgb(color, "#fff")(0.2);
  };

  const color = d3.scaleOrdinal().range(d3.schemePaired.map(fader));

  d3.json(jsonUrl).then((data) => {
    const dataName = (d) =>
      d.children.map((d) => {
        return d.name;
      });

    const SVG = d3
      .select("svg")
      .attr("width", width)
      .attr("id", "legend")
      .attr("height", height);

    const size = 20;
    SVG.selectAll("rect")
      .data(dataName(data))
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        if (i > 6 && i < 14) {
          return 300;
        } else if (i > 13) {
          return 450;
        }

        return 100;
      })
      .attr("class", "legend-item")
      .attr("y", function (d, i) {
        if (i > 6 && i < 14) {
          return i * (size + 5) - 120;
        } else if (i > 13) {
          return i * (size + 5) - 300;
        }
        return 50 + i * (size + 5);
      })
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d) {
        return color(d);
      });

    SVG.selectAll("text")
      .data(dataName(data))
      .enter()
      .append("text")
      .attr("x", (d, i) => {
        if (i > 6 && i < 14) {
          return 300 + size * 1.2;
        } else if (i > 13) {
          return 450 + size * 1.2;
        }
        return 100 + size * 1.2;
      })
      .attr("y", function (d, i) {
        if (i > 6 && i < 14) {
          return i * (size + 5) + size / 2 - 120;
        } else if (i > 13) {
          return i * (size + 5) + size / 2 - 300;
        }
        return 50 + i * (size + 5) + size / 2;
      })
      .style("fill", function (d) {
        return color(d);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  });

  return (
    <svg>
      {" "}
      <use href="#legend" />
    </svg>
  );
};
export default Legends;
