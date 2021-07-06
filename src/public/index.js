window.onload = function () {
  let add = document.getElementById('add')
  let addText = document.getElementById('add-text')
  // Event of click in Add
  add.onclick = function (event) {
    this.classList.toggle('active')
    addText.classList.toggle('hide')
  }
}
