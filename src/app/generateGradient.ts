export const generateGradient = () => {
  const colors = ["#F7F2D7", "#94E8D5"];
  const stopSize = 2;
  const colorArray = [];
  for (let i = 0; i < 100; i += stopSize) {
    const color = colors.at(colorArray.length % colors.length);
    colorArray.push(`${color} 0 ${i * 2}%`);
  }

  const output = `conic-gradient(${colorArray.join(", ")})`;
  return output;
};
