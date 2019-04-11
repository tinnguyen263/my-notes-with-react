const getPosition = element => {
  return {
    x: element.offsetTop,
    y: element.offsetLeft
  }
};

const getSize = element => {
  return {
    width: 0,
    height: 0
  }
};

module.exports = {
  getPosition,
  getSize
};
