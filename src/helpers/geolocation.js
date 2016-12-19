export function getCurrentPositon(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export function watchPosition(resolve, reject) {
  navigator.geolocation.watchPosition(resolve, reject);
}
