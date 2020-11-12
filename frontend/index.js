const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;


let mainWindow;


app.on('ready', function(){

    var openWindow = function() {
        mainWindow = new BrowserWindow({width: 800, minWidth: 800, height: 600, minHeight: 600, frame: false, webPreferences: {nodeIntegration: true}});
        mainWindow.loadURL('file://' + __dirname + '/build/index.html');
        mainWindow.on('closed', function(){mainWindow = null;});
    }

    openWindow();

    mainWindow.webContents.openDevTools()
});

app.on('window-all-closed', function(){
    
    app.quit();
});


ipcMain.on('size-change', (event, arg) => {

    if(mainWindow.isMaximized())
        event.sender.send("toolbar", true);
    else
        event.sender.send("toolbar", false);
});

ipcMain.on('toolbar', (event, arg) => {
    
    if(arg == "min-button" || arg == "min-icon")
    {
        mainWindow.minimize();
    }
    else if(arg == "max-button" || arg == "max-icon")
    {
        mainWindow.maximize();
        event.sender.send("toolbar", true);
    }
    else if(arg == "close-button" || arg == "close-icon")
    {
        mainWindow.close();
    }
    else if(arg == "restore-button" || arg == "restore-icon")
    {
        mainWindow.unmaximize();
        event.sender.send("toolbar", false);
    }
});