import React, { Component } from "react";
import * as d3 from "d3";

export default class Cursor extends Component {
  componentDidMount() {
    this.renderCursor();
  }
  renderCursor() {
    const svg = d3.select(`.cursor`);
    const xScale = d3
      .scaleLinear()
      .domain([1561631363959, 1561631374018])
      .range([0, window.innerWidth]);

    svg
      .append("g")
      .classed("x", true)
      .classed("grid", true)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(window.innerWidth / 52)
          .tickSize(window.innerHeight, 0)
          .tickFormat("")
      );

    const mouseG = svg.append("g").attr("class", "mouse-over-effects");
    mouseG
      .append("path")
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
    mouseG
      .append("path")
      .attr("class", "mouse-line-static")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    const lines = document.getElementsByClassName("line");

    mouseG
      .append("svg:rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mouseout", function() {
        d3.select(".mouse-line").style("opacity", "0");
      })
      .on("mouseover", function() {
        d3.select(".mouse-line").style("opacity", "1");
      })
      .on("mousemove", function() {
        var mouse = d3.mouse(this);
        d3.select(".mouse-line").attr("d", function() {
          let d = "M" + mouse[0] + "," + window.innerWidth;
          d += " " + mouse[0] + "," + 0;
          return d;
        });
        const xDate = xScale.invert(mouse[0]);
        d3.selectAll(".circle-line")
          .attr("transform", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              let beginning = 0;
              let end = lines[i].getTotalLength();
              let target = null;
              let pos = null;
              while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                if (
                  (target === end || target === beginning) &&
                  pos.x !== mouse[0]
                ) {
                  break;
                }
                if (pos.x > mouse[0]) end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break;
              }
              return "translate(" + mouse[0] + "," + pos.y + ")";
            }
          })
          .style("opacity", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              return "1";
            } else {
              return "0";
            }
          });
        d3.selectAll(".text-label")
          .attr("transform", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              let beginning = 0;
              let end = lines[i].getTotalLength();
              let target = null;
              let pos = null;
              while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                if (
                  (target === end || target === beginning) &&
                  pos.x !== mouse[0]
                ) {
                  break;
                }
                if (pos.x > mouse[0]) end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break;
              }
              return "translate(" + mouse[0] + "," + pos.y + ")";
            }
          })
          .style("opacity", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              return "1";
            } else {
              return "0";
            }
          });
      })
      .on("click", function() {
        const mouse = d3.mouse(this);
        d3.select(".mouse-line-static").style("opacity", "1");
        d3.select(".mouse-line-static").attr("d", function() {
          let d = "M" + mouse[0] + "," + window.innerWidth;
          d += " " + mouse[0] + "," + 0;
          return d;
        });
        const xDate = xScale.invert(mouse[0]);
        d3.selectAll(".circle-line-static")
          .attr("transform", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              let beginning = 0;
              let end = lines[i].getTotalLength();
              let target = null;
              let pos = null;
              while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                if (
                  (target === end || target === beginning) &&
                  pos.x !== mouse[0]
                ) {
                  break;
                }
                if (pos.x > mouse[0]) end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break;
              }
              return "translate(" + mouse[0] + "," + pos.y + ")";
            }
          })
          .style("opacity", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              return "1";
            } else {
              return "0";
            }
          });
        d3.selectAll(".text-label-static")
          .attr("transform", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              let beginning = 0;
              let end = lines[i].getTotalLength();
              let target = null;
              let pos = null;
              while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                if (
                  (target === end || target === beginning) &&
                  pos.x !== mouse[0]
                ) {
                  break;
                }
                if (pos.x > mouse[0]) end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break;
              }
              return "translate(" + mouse[0] + "," + pos.y + ")";
            }
          })
          .style("opacity", (d, i) => {
            if (d.from_ts <= xDate && d.to_ts >= xDate) {
              return "1";
            } else {
              return "0";
            }
          });
      });
  }

  render() {
    return <svg className="cursor" />;
  }
}
