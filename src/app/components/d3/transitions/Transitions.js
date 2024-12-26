import * as d3 from 'd3';

const fast_speed = 1000;
const avg_speed = 3000;
const slow_speed = 5000;

export const fast_linear = () => d3.transition().duration(fast_speed).ease(d3.easeLinear);

export const avg_cubic = () => d3.transition().duration(avg_speed).ease(d3.easeCubic);
export const slow_cubic = () => d3.transition().duration(slow_speed).ease(d3.easeCubic);

export const avg_bounce = () => d3.transition().duration(slow_speed).ease(d3.easeBounce);