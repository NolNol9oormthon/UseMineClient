declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': any;
  }
}

// @TODO find a better way to make it work
interface Process {
  browser: boolean;
}
declare var process: Process;

// enable devtools to play with the api
if (process.browser) {
  window.scrollIntoViewIfNeeded = scrollIntoViewIfNeeded;
}
