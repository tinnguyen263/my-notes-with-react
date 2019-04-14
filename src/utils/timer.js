export const wait = (duration, callback) => new Promise((resolve) => setTimeout(() => {
    callback && callback();
    resolve();
}, duration));