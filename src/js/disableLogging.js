if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
  ["log", "info", "debug", "table", "dir", "trace"].forEach((method) => {
    console[method] = () => {};
  });
  // console.warn() and console.error() still work, so that you do not miss them in production
}
