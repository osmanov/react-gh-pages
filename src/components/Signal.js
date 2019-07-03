import React, { Component } from "react";
import * as d3 from "d3";

const getStrokeByValue = value => {
  switch (value) {
    case "Warning":
      return "#FF8900";
    case "Fail":
      return "#E24C65";
    case "Ok":
      return "green";
    default:
      return "#282828";
  }
};
const getTextByValue = value => {
  switch (value) {
    case "Warning":
      return value;
    case "Fail":
      return "Error";
    case "Ok":
      return "OK";
    default:
      return "No Signal";
  }
};
export default class Signal extends Component {
  componentDidMount() {
    this.renderSignal();
  }

  renderSignal() {
    const { values } = this.props;
    const svgWidth = "100%";
    const svgHeight = 42;
    const svg = d3
      .select(`.${this.props.className}`)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", `${this.props.className}`);

    const datasetList = values.reduce((acc, curr) => {
      return [...acc, curr.from_ts, curr.to_ts];
    }, []);

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(datasetList), d3.max(datasetList)])
      .range([0, svgWidth]);

    svg
      .selectAll("svg")
      .data(values)
      .enter()
      .append("line")
      .attr("class", "line")
      .attr("x1", ({ from_ts }) => {
        return xScale(from_ts);
      })
      .attr("x2", ({ to_ts }) => {
        return xScale(to_ts);
      })
      .attr("y1", 21)
      .attr("y2", 21)
      .attr("stroke", ({ value }) => {
        return getStrokeByValue(value);
      })
      .attr("stroke-dasharray", ({ value, type }) => {
        if (type === "no_signal") {
          return "4 4";
        }
      })
      .attr("stroke-width", 1)
      .on("mouseover", d => {
        console.log(d);
      });

    svg
      .selectAll("svg")
      .data(values)
      .enter()
      .append("line")

      .attr("x1", ({ from_ts, type }, index) => {
        if (type === "no_signal" && index) {
          return xScale(from_ts);
        }
      })
      .attr("x2", ({ from_ts, type }, index) => {
        if (type === "no_signal" && index) {
          return xScale(from_ts);
        }
      })
      .attr("y1", 26)
      .attr("y2", 16)
      .attr("stroke", ({ type }, index) => {
        if (type === "no_signal" && index) {
          return getStrokeByValue(values[index - 1].value);
        }
      });

    svg
      .selectAll("svg")
      .data(values)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("class", "circle-line")
      .style("stroke", function({ value }, i) {
        return getStrokeByValue(value);
      })
      .style("fill", function({ value }) {
        return getStrokeByValue(value);
      })
      .style("opacity", "0")
      .attr("stroke-width", 1);

    svg
      .selectAll("svg")
      .data(values)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("class", "circle-line-static")
      .style("stroke", function({ value }, i) {
        return getStrokeByValue(value);
      })
      .style("fill", function({ value }) {
        return getStrokeByValue(value);
      })
      .style("opacity", "0")
      .attr("stroke-width", 1);

    svg
      .selectAll("svg")
      .data(values)
      .enter()
      .append("text")
      .attr("class", "text-label")
      .style("stroke", function({ value }, i) {
        return getStrokeByValue(value);
      })
      .style("fill", function({ value }) {
        return getStrokeByValue(value);
      })
      .style("opacity", "0")
      .attr("stroke-width", 1)
      .text(({ value }) => {
        return getTextByValue(value);
      });
    svg
      .selectAll("svg")
      .data(values)
      .enter()
      .append("text")
      .attr("class", "text-label-static")
      .style("stroke", function({ value }, i) {
        return getStrokeByValue(value);
      })
      .style("fill", function({ value }) {
        return getStrokeByValue(value);
      })
      .style("opacity", "0")
      .attr("stroke-width", 1)
      .text(({ value }) => {
        return getTextByValue(value);
      });
  }

  render() {
    return (
      <div>
        <svg className={`${this.props.className}`} />
      </div>
    );
  }
}
