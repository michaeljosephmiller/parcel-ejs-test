'use strict'
const contentElement = document.getElementById('content')
const pathname = window.location.pathname
let content

switch (pathname) {
  case '/powerball':
    content = `/pages${pathname}.html`
    break
  case '/mega_millions':
    content = `/pages${pathname}.html`
    break
  default:
    content = '/pages/home.html'
    break
}

const loadContent = () => {
  fetch(content)
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      contentElement.innerHTML = text
    })
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    loadContent()
  })
} else {
  loadContent()
}
