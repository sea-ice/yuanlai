export function getLocalStorage (prop, val) {
  return val ? localStorage.setItem(prop, val) : localStorage.getItem(prop)
}

export function removeStorageItem (prop, session) {
  return session ? sessionStorage.removeItem(prop) : localStorage.removeItem(prop)
}

export function getSessionStorage (prop, val) {
  return val ? sessionStorage.setItem(prop, val) : sessionStorage.getItem(prop)
}
