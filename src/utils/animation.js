export class Animation {
  constructor(step, duration, timingFunction) {
    this.step = step;
    this.duration = duration || 0;
    this.timingFunction = timingFunction || TimingFunctions.Linear;
    this.startTime = null;
    this.animationFrameInstance = null;
    this.frame = onStop => (timestamp) => {
      if (!this.startTime) this.startTime = timestamp;
      const passedTime = timestamp - this.startTime;
      let progressInPercent = this.timingFunction(passedTime / this.duration);
      if (progressInPercent > 1) progressInPercent = 1;
      const shouldAnimationContinue = progressInPercent < 1;
      this.step(progressInPercent);
      if (shouldAnimationContinue) {
        this.animationFrameInstance = window.requestAnimationFrame(this.frame(onStop));
      } else {
        onStop()
      }
    };
  }

  async start () {
    return new Promise(resolve => window.requestAnimationFrame(this.frame(resolve)))
  }

  cancel () {
    window.cancelAnimationFrame(this.animationFrameInstance)
  }
}

export const TimingFunctions = {
  Linear: t => t,
  EaseInOut: t => Math.round(((Math.sin((t - 0.5)*3.1412) + 1)/2) * 1000) / 1000
};
