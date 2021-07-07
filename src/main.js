const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')

let win
function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    minWidth: 500,
    minHeight: 500,
    maxWidth: 800,
    maxHeight: 600,
    center: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.loadFile(__dirname + '/public/index.html')
}

app
  .whenReady()
  .then(createWindow)
  .then(getStore)
  .then(saveStore)
  .then(deleteStore)
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
  })
}
function deleteStore() {
  ipcMain.on('delete-store', function (event, title) {
    newArr = []
    let data = JSON.parse(
      fs.readFileSync(`${__dirname}/database/store.json`, 'utf-8')
    )
    data = data.filter(d => d.title != title)
    newArr = newArr.concat(data)
    fs.writeFileSync(`${__dirname}/database/store.json`, JSON.stringify(newArr))
  })
}
