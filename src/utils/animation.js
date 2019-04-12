export class Animation {
  constructor(step, duration, timingFunction, reverse = false) {
    this.step = step;
    this.duration = duration || 0;
    this.timingFunction = timingFunction || TimingFunctions.Linear;
    this.reverse = reverse;
    this.startTime = null;
  }

  async start () {
    const frame = onStop => (timestamp) => {
      if (!this.startTime) this.startTime = timestamp;
      const passedTime = timestamp - this.startTime;
      let progressInPercent = this.timingFunction(passedTime / this.duration);
      if (progressInPercent > 1) progressInPercent = 1;
      const shouldAnimationContinue = progressInPercent < 1;
      this.step(this.reverse ? (1 - progressInPercent) : progressInPercent);
      if (shouldAnimationContinue) {
        window.requestAnimationFrame(frame(onStop));
      } else {
        onStop()
      }
    };
    return new Promise(resolve => window.requestAnimationFrame(frame(resolve)))
  }

  async startReverse () {
    this.reverse = true;
    return this.start()
  }
}

export const TimingFunctions = {
  Linear: t => t,
  EaseInOut: t => Math.round(((Math.sin((t - 0.5)*3.1412) + 1)/2) * 1000) / 1000
};
