const removePx = (value) => (typeof value === 'string' &&
    value.endsWith('px')) ? +value.substring(0, value.length - 2) : +value;

export const getPosition = (element) => {
  return {
    top: removePx(element.offsetTop),
    left: removePx(element.offsetLeft),
  };
};

export const getSize = (element) => {
  const styles = window.getComputedStyle(element);
  const width = styles.width;
  const height = styles.height;
  return {
    width: removePx(width),
    height: removePx(height),
  };
};

export const moveElement = (element, top, left) => {
  top += 'px';
  left += 'px';
  element.style.transform = `translate3D(${left}, ${top}, 0)`;
};

export const resizeElement = (element, width, height) => {
  width += 'px';
  height += 'px';
  element.style.maxWidth = width;
  element.style.maxHeight = height;
};
