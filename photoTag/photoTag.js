const inputWrapper = document.getElementById('input-wrapper')
const position = { x: 0, y: 0 }
const tagInput = document.getElementById('tag-input')
inputWrapper.style.visibility = 'hidden'
let drugObject = null

const createTag = (e) => {
  if (e && e.target.id === 'image' && inputWrapper.style.visibility === 'hidden') {
    position.x = e.clientX
    position.y = e.clientY

    inputWrapper.style.position = 'absolute'
    inputWrapper.style.left = position.x + 'px'
    inputWrapper.style.top = position.y + 'px'
    inputWrapper.style.visibility = 'visible'
    tagInput.focus()
    return
  }

  const textTag = tagInput.value
  tagInput.value = ''
  inputWrapper.style.visibility = 'hidden'

  if (textTag === '') {
    return
  }

  const tagSpan = document.createElement('span')
  tagSpan.setAttribute('class', 'badge badge-secondary')
  tagSpan.id = 'tag'
  tagSpan.innerHTML = `<h6>${textTag}</h6>`
  tagSpan.style.position = 'absolute'
  tagSpan.style.left = position.x + 'px'
  tagSpan.style.top = position.y + 'px'

  tagSpan.onmousedown = function (e) {
    drugObject = this
  }

  tagSpan.onmouseup = (e) => {
    drugObject = null
  }

  tagSpan.ondblclick = tagToInput

  document.getElementById('tags-wrapper').appendChild(tagSpan)
}
document.body.addEventListener('click', createTag)

document.getElementById('tag-input').addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    createTag()
  }
})

document.getElementById('image').onmousemove = function (e) {
  if (drugObject !== null) {
    drugObject.style.left = e.pageX - drugObject.offsetWidth / 2 + 'px'
    drugObject.style.top = e.pageY - drugObject.offsetHeight / 2 + 'px'
  }
}

const tagToInput = (e) => {
  console.dir(e)
  const text = e.target.textContent
  position.x = e.clientX - e.offsetWidth
  position.y = e.clientY - e.offsetHeight
  e.target.parentNode.remove()
  inputWrapper.style.left = position.x + 'px'
  inputWrapper.style.top = position.y + 'px'
  inputWrapper.style.visibility = 'visible'
  tagInput.value = text

  tagInput.focus()
}

document.getElementById('close').addEventListener('click', (e) => {
  tagInput.value = ''
  inputWrapper.style.visibility = 'hidden'
})
