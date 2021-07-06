const { app, BrowserWindow } = require('electron')

let win
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true
  })

  win.loadFile(__dirname + '/src/public/index.html')
}


app.whenReady()
.then(createWindow)
.catch(err) {
  console.log(err)
}

// Evente Windows closeds
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Event activate
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
