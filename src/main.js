const { app, BrowserWindow, ipcMain } = require('electron')
// const { path } = require('path')
const fs = require('fs')

let win
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.loadFile(__dirname + '/public/index.html')

  win.webContents.openDevTools()
}

app
  .whenReady()
  .then(createWindow)
  .then(getStore)
  .then(saveStore)
  .catch(err => console.log(err))

// Evente Windows closeds
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Event activate
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

function getStore() {
  ipcMain.on('get-store', function (event, args) {
    let data = JSON.parse(
      fs.readFileSync(`${__dirname}/database/store.json`, 'utf-8')
    )
    console.log(data)
    event.reply('get-store-reply', data)
  })
}
function saveStore() {
  ipcMain.on('save-store', function (event, args) {
    let data = fs.readFileSync(`${__dirname}/database/store.json`, 'utf-8')
    let arrData = JSON.parse(data)
    arrData.push(args)
    fs.writeFileSync(
      `${__dirname}/database/store.json`,
      JSON.stringify(arrData)
    )
    console.log(arrData.length)
  })
}
