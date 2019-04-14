import {getPosition, getSize, moveElement, resizeElement} from './element';
import {Animation, TimingFunctions} from './animation';

export const createExpandAnimation = (
    originalElement, targetElement, containerElement) => {
  const containerSize = getSize(containerElement);
  const originalPosition = getPosition(originalElement);
  const originalSize = getSize(originalElement);

  const maximumChangeSize = {
    top: +originalPosition.top,
    right: containerSize.width - (originalPosition.left + originalSize.width),
    bottom: containerSize.height - (originalPosition.top + originalSize.height),
    left: +originalPosition.left,
  };
  const biggestChange = Object.values(maximumChangeSize).sort().pop();
  const calculateSpaceToAdd = (progress, maximumSpace) => {
    const spaceToAdd = progress * biggestChange;
    return spaceToAdd < maximumSpace ? spaceToAdd : maximumSpace;
  };

  const step = (progress) => {
    const newOverlayExpandSize = {
      top: calculateSpaceToAdd(progress, maximumChangeSize.top),
      right: calculateSpaceToAdd(progress, maximumChangeSize.right),
      bottom: calculateSpaceToAdd(progress, maximumChangeSize.bottom),
      left: calculateSpaceToAdd(progress, maximumChangeSize.left),
    };
    const newOverlayPosition = {
      top: originalPosition.top - newOverlayExpandSize.top,
      left: originalPosition.left - newOverlayExpandSize.left,
    };
    const newSize = {
      width: originalSize.width +
          (newOverlayExpandSize.left + newOverlayExpandSize.right),
      height: originalSize.height +
          (newOverlayExpandSize.top + newOverlayExpandSize.bottom),
    };
    resizeElement(targetElement, newSize.width, newSize.height);
    moveElement(targetElement, newOverlayPosition.top, newOverlayPosition.left);
  };
  return new Animation(step, 200, TimingFunctions.EaseInOut);
};
