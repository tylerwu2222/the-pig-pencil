import * as d3 from 'd3';

export function createEphemeralD3Tooltip(className = "tooltip", initialStyles = {}) {
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", className)
        .style("opacity", 0)
        .style("position", "absolute");

    // Apply any additional styles passed as an argument
    Object.entries(initialStyles).forEach(([key, value]) => {
        tooltip.style(key, value);
    });

    return tooltip;
}
