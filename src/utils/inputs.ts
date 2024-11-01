function throttle(cb: (...args: any[]) => void, delay = 100) {
  let shouldWait = false
  let waitingArgs: any[] | null = null;

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args: any[]) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

const debounce = (cb: Function, delay: number) => {
  let timeout: any;
  
  return (...args: any[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export {
  throttle,
  debounce,
}
