# 终端风文件阅读器

## 简介

该项目是一个终端风格的文件阅读器，目前正在开发中。

本项目基本基于 [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio)，并在其的基础上增加一些功能

~~也许会有release~~

## 使用说明

如果你想使用该项目，可以按照以下步骤进行：

1. 克隆项目：

    ```bash
    git clone git@github.com:terminal-style-file-explorer/new-nextron-terminal.git
    ```

2. 进入项目目录：

    ```bash
    cd new-nextron-terminal
    ```

3. 移除原始远程仓库：

    ```bash
    git remote remove origin
    ```

4. 安装依赖：

    ```bash
    npm install
    ```

5. 运行开发服务器：

    ```bash
    npm run dev
    ```

## 修改/分发说明

### 程序加载创作者加入的内容

暂定程序加载创作者加入的内容的地址为 `/public/`。具体加载和使用方法还在设计中。

1. 将你想要加入的内容放置在 `/public/` 目录下。

2. 使用以下步骤生成客户端：

   ```bash
   npm run build:win32
   npm run build:win64
   npm run build:mac
   npm run build:mac:universal
   npm run build:linux
   ```