const inputWrapper = document.getElementById('input-wrapper')
const position = { x: '', y: '' }
const tagInput = document.getElementById('tag-input')
inputWrapper.style.visibility = 'hidden'
let drugObject = null

const tagSource = {
  tagArray: [],
  editing: null,
  printTags: () => {
    tagSource.tagArray.forEach((tag, index) => {
      if (!tag.isPrinted) {
        const tagSpan = document.createElement('span')
        tagSpan.setAttribute('class', tag.class)
        tagSpan.id = index
        tagSpan.innerHTML = tag.text
        tagSpan.style.left = tag.position.x
        tagSpan.style.top = tag.position.y

        tagSpan.onmousedown = function () {
          drugObject = this
        }
        tagSpan.onmouseup = () => {
          drugObject = null
        }
        tagSpan.ondblclick = tagToInput

        tag.element = tagSpan
        document.getElementById('tags-wrapper').appendChild(tagSpan)
        tag.isPrinted = true
      }
      if (tag.isEditing) {
        tag.element.style.visibility = 'hidden'
      } else {
        tag.element.style.visibility = 'visible'
      }
    })
  },
  deleteTag: (id) => {
    if (id === null) return
    tagSource.tagArray[id].element.remove()
    tagSource.tagArray.splice(id, 1)
  }
}

function Tag (text = '', position = { x: 0, y: 0 }) {
  this.text = `<h6>${text}</h6>`
  this.isEditing = false
  this.position = position
  this.isPrinted = false
  this.class = 'tag badge badge-secondary'
  this.isVisible = true
  this.element = {}
}

const createTag = (e) => {
  if (e && e.target.id === 'image' && inputWrapper.style.visibility === 'hidden') {
    position.x = e.clientX - inputWrapper.offsetWidth / 2 + 'px'
    position.y = e.clientY - inputWrapper.offsetHeight / 2 + 'px'

    inputWrapper.style.left = position.x
    inputWrapper.style.top = position.y
    inputWrapper.style.visibility = 'visible'
    tagInput.focus()
    return
  }

  if (tagInput.value === '') {
    return
  }

  if (tagSource.editing !== null) {
    tagSource.tagArray[tagSource.editing].isEditing = false
  } else tagSource.tagArray.push(new Tag(tagInput.value, { x: position.x, y: position.y }))

  tagInput.value = ''
  inputWrapper.style.visibility = 'hidden'
  tagSource.printTags()
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
  const tagSpan = e.target.parentElement
  tagInput.value = tagSpan.textContent
  position.x = tagSpan.offsetLeft + 'px'
  position.y = tagSpan.offsetTop + 'px'
  tagSource.tagArray[tagSpan.id].isEditing = true
  tagSource.editing = tagSpan.id

  inputWrapper.style.left = position.x
  inputWrapper.style.top = position.y
  inputWrapper.style.visibility = 'visible'

  tagInput.focus()
  tagSource.printTags()
}

document.getElementById('close').addEventListener('click', (e) => {
  tagSource.deleteTag(tagSource.editing)
  tagInput.value = ''
  inputWrapper.style.visibility = 'hidden'
})
