window.onload = function () {
  let arrText = []
  let list = document.getElementById('list')
  let addText = document.getElementById('add-text')
  addValuesStore(arrText, addText, list)
  listText(arrText, list, addText)
}

function addValuesStore(store, addText, list) {
  let add = document.getElementById('add')
  let titleInput = document.querySelector('#title input')
  let titleSvg = document.querySelector('#title svg')
  let textTextArea = document.querySelector('#text textarea')
  let textSvg = document.querySelector('#text svg')
  let confirm = document.getElementById('confirm')

  // Event of click in Add
  add.onclick = function (event) {
    this.classList.toggle('active')
    list.classList.add('hide')
    addText.classList.toggle('hide')
    if (this.classList.contains('active')) {
      resetClass()
    }
  }
  // Event of inputs
  titleInput.addEventListener('input', function () {
    if (titleInput.value.length > 0) {
      titleSvg.classList.remove('hide')
    } else {
      titleSvg.classList.add('hide')
    }
    // Click titleSvg event
    titleSvg.addEventListener('click', function () {
      titleInput.value = ''
      titleSvg.classList.add('hide')
      confirm.classList.add('disable')
    })
    // Verify input length and remove class disable of button confirm
    changeConfirmClass(titleInput, textTextArea)
  })

  textTextArea.addEventListener('input', function () {
    if (textTextArea.value.length > 0) {
      textSvg.classList.remove('hide')
    } else {
      textSvg.classList.add('hide')
    }
    // Click textSvg event
    textSvg.addEventListener('click', function () {
      textTextArea.value = ''
      textSvg.classList.add('hide')
      confirm.classList.add('disable')
    })
    // Verify input length and remove class disable of button confirm
    changeConfirmClass(titleInput, textTextArea)
  })

  // Event click button confirm
  confirm.addEventListener('click', function () {
    if (!confirm.classList.contains('disable')) {
      saveText()
      resetClass()
    }
  })
  // Verify inputs contains any value
  function changeConfirmClass(title, textarea) {
    if (
      textarea.value.length > 0 &&
      title.value.length > 0 &&
      titleInput.value != ' ' &&
      textTextArea.value != ' '
    ) {
      confirm.classList.remove('disable')
    } else {
      confirm.classList.add('disable')
    }
  }
  // Reset class list
  function resetClass() {
    titleInput.value = ''
    textTextArea.value = ''
    titleSvg.classList.add('hide')
    textSvg.classList.add('hide')
    confirm.classList.add('disable')
  }
  // Save text in storage
  function saveText() {
    obj = {
      title: titleInput.value.trim(),
      text: textTextArea.value.trim()
    }
    store.push(obj)
  }
}

function listText(store, list, addText) {
  let listText = document.getElementById('list-text')
  let inputText = document.getElementById('input-text')
  let add = document.getElementById('add')
  // Event focus in inputText
  inputText.addEventListener('focusin', function () {
    list.classList.remove('hide')
    add.classList.remove('active')
    addText.classList.add('hide')
    addLi(listText)
  })

  // Add li in ul
  function addLi(listText) {
    store.forEach(function (element) {
      let li = createElement(element)
      listText.appendChild(li)
    })
  }

  // Create li
  function createElement(objText) {
    let li = document.createElement('li')
    let span = document.createElement('span')
    span.innerText = objText.text
    li.innerText = objText.title
    li.appendChild(span)
    return li
  }
}
