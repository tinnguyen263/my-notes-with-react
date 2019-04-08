const removePx = value => (typeof value === "string" && value.endsWith('px')) ? +value.substring(0, value.length - 2) : +value;

const getPosition = element => {
  return {
    x: removePx(element.offsetTop),
    y: removePx(element.offsetLeft)
  }
};

const getSize = element => {
  const styles = window.getComputedStyle(element);
  const width = styles.width;
  const height = styles.height;
  return {
    width: removePx(width),
    height: removePx(height)
  }
};

module.exports = {
  getPosition,
  getSize
};
