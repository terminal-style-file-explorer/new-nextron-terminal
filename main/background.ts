import path from 'path'
import { BrowserView, app, ipcMain } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import { createWindow } from './helpers'
import { fsync } from 'fs'
import { isContext } from 'vm'

import * as fs from 'fs';
type User = {
  name: string;
  password: string;
  auth: number;
};




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

// 获取应用程序路径
const appPath = app.getAppPath();

// 定义 users.json 文件路径
let usersJsonPath;

// 如果是生产环境，则设置 JSON 文件路径
if (process.env.NODE_ENV === 'production') {
  console.log('production evn');
  usersJsonPath = path.join(appPath,'../','../','stores/', 'users.json');
} else {
  // 如果是开发环境，则设置 JSON 文件路径
  console.log('development evn');
  usersJsonPath = path.join(appPath, 'public/', 'users.json');
}


// 读取 users.json 文件并解析为对象
let users = [];
try {
  console.log("usersJsonPath: ", usersJsonPath)
  const usersData = fs.readFileSync(usersJsonPath).toString();
  users = JSON.parse(usersData);
} catch (error) {
  console.error('Error reading users.json:', error);
}

// 添加用户
ipcMain.handle('addUser', async (_event, newUser) => {
  console.log("addUser: ", newUser);
  console.log("users in images", users[0]?.name);

  // 检查是否存在相同用户名
  const existingUser = users.find(user => user.name === newUser.name);
  if (existingUser) {
    console.log('用户名已存在');
    return false;
  }

  // 将新用户添加到用户列表中
  users.push(newUser);

  // 将更新后的用户信息写回 JSON 文件
  try {
    fs.writeFileSync(usersJsonPath, JSON.stringify(users, null, 2));
    console.log('用户添加成功');
    return true;
  } catch (error) {
    console.error('Error writing users.json:', error);
    return false;
  }
});

// 检查用户
ipcMain.handle('checkUser', async (_event, { name, password }) => {
  console.log("checkUser: ", name);

  // 查找用户
  const user = users.find(user => user.name === name && user.password === password);
  if (user) {
    console.log('用户存在且密码正确');
    return true;
  }

  console.log('用户不存在或密码错误');
  return false;
});



// 获取指定路径内的所有文件和文件夹的名称
function getFilesAndFoldersNames(directoryPath) {
  try {
    // 读取目录内容
    const items = fs.readdirSync(directoryPath);
    return items;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}
ipcMain.handle('getPath', async (_event, arg) => {
  const appPath1 = usersJsonPath;
  return appPath1;
});