import path from 'path'
import { BrowserView, app, ipcMain } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import { createWindow } from './helpers'
import { fsync } from 'fs'
import { isContext } from 'vm'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

/*
ipcMain.on('message', (event, arg) => {
  console.log("向主进程里发送input： ", arg)
  event.reply('input-reply', `${arg} World!`)
})
*/
ipcMain.handle('message', async (_event, arg) => {
  console.log("向主进程里发送input： ", arg)
  return `${arg} World!`
})


ipcMain.on('input', (event, arg) => {
  console.log("input: ", arg ?? "new window")

  event.reply('input-reply', `input: ${arg}`)

})



ipcMain.handle('checkUser', async (_event, arg) => {
  console.log("checkUser: ", arg)
  return true
})

ipcMain.handle('addUser', async (_event, arg) => {
  console.log("addUser: ", arg)
  return true
})