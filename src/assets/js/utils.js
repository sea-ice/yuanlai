export function debounce (fn, delay) {
  var timer
  return function () {
    if (timer) clearTimeout(timer)
    var args = arguments
    timer = setTimeout(() => {
      return fn.apply(null, args)
    }, delay)
  }
}
