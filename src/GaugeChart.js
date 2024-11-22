import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GaugeChart = ({ value, min = 0, max = 100 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous drawings

    const width = 200;
    const height = 120;
    const arc = d3.arc()
      .innerRadius(70)
      .outerRadius(80)
      .startAngle(d3.scaleLinear().domain([min, max]).range([-Math.PI / 2, Math.PI / 2])(min))
      .endAngle(d3.scaleLinear().domain([min, max]).range([-Math.PI / 2, Math.PI / 2])(value));

    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height})`)
      .append('path')
      .attr('d', arc)
      .style('fill', '#4CAF50');

    // Add more customizations like ticks, labels, etc.
  }, [value, min, max]);

  return <svg ref={ref}></svg>;
};

export default GaugeChart;