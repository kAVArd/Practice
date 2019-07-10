const position = { x: 0, y: 0 }
let isBlank = false

const createInput = (event) => {
  event.preventDefault()
  if (isBlank) {
    isBlank = false
    return
  }
  if (document.getElementsByClassName('form-control').length) {
    console.log(document.getElementsByClassName('form-control').length)
  }

  position.x = event.clientX - 60
  position.y = event.clientY - 13

  const textWarapper = document.createElement('div')
  textWarapper.setAttribute('id', 'text-wrapper')
  textWarapper.setAttribute('style', `position: absolute; left: ${position.x}px; top: ${position.y}px`)

  const textInput = document.createElement('input')
  textInput.setAttribute('type', 'text')
  textInput.setAttribute('size', '15')
  textInput.setAttribute('id', 'tagInput')
  textInput.setAttribute('class', 'form-control')
  textInput.setAttribute('placeholder', 'Enter tag text')
  textInput.setAttribute('onblur', 'createTag()')
  textWarapper.appendChild(textInput)

  document.getElementsByClassName('input-wrapper')[0].appendChild(textWarapper)
  document.getElementById('tagInput').focus()
}

const createTag = () => {
  const textTag = document.getElementById('tagInput').value
  document.getElementById('text-wrapper').remove()

  if (textTag === '') {
    isBlank = true
    return
  }

  const tagWarapper = document.createElement('div')
  tagWarapper.setAttribute('id', 'tag-wrapper')
  tagWarapper.setAttribute('style', `position: absolute; left: ${position.x}px; top: ${position.y}px`)

  const tagSpan = document.createElement('span')
  tagSpan.setAttribute('class', 'badge badge-secondary')
  tagSpan.innerText = textTag
  tagWarapper.appendChild(tagSpan)

  document.getElementsByClassName('tags-wrapper')[0].appendChild(tagWarapper)
}

const changeIsBlank = () => {
  isBlank = false
}
