window.onload = function () {
  let add = document.getElementById('add')
  let addText = document.getElementById('add-text')
  let titleInput = document.querySelector('#title input')
  let titleSvg = document.querySelector('#title svg')
  // Event of click in Add
  add.onclick = function (event) {
    this.classList.toggle('active')
    addText.classList.toggle('hide')
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
    })
  })
}
