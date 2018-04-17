export function getLocalStorage (prop, val) {
  return val ? localStorage.setItem(prop, val) : localStorage.getItem(prop)
}
