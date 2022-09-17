export const refreshWindow = () => {
  if (window.location.href.indexOf('#reloaded') == -1) {
    window.location.href = window.location.href + '#reloaded'
    window.location.reload()
  }
}
