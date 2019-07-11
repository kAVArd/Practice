const position = { x: 0, y: 0 }
const tagInput = document.getElementById('tag-input')
tagInput.style.visibility = 'hidden'
let drugObject = null

const createTag = (e) => {
  if (e && e.target.id === 'image' && tagInput.style.visibility === 'hidden') {
    position.x = e.clientX
    position.y = e.clientY

    const inputWrapper = document.getElementById('input-wrapper')
    inputWrapper.style.position = 'absolute'
    inputWrapper.style.left = position.x + 'px'
    inputWrapper.style.top = position.y + 'px'
    tagInput.style.visibility = 'visible'
    tagInput.focus()
    return
  }

  const textTag = tagInput.value
  tagInput.value = ''
  tagInput.style.visibility = 'hidden'

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

  tagSpan.onmouseup = () => {
    drugObject = null
  }

  document.getElementById('tags-wrapper').appendChild(tagSpan)
}
document.body.addEventListener('click', createTag)

document.getElementById('tag-input').addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    createTag()
  }
})

document.getElementById('image').onmousemove = function (e) {
  console.log(1)
  if (drugObject !== null) {
    drugObject.style.left = e.pageX - drugObject.offsetWidth / 2 + 'px'
    drugObject.style.top = e.pageY - drugObject.offsetHeight / 2 + 'px'
  }
}
