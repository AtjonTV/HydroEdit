// Including the Electron Framework
const electron = require('electron');
// Including jQuery
const jQuery = require('jquery');

// Getting elements from Electron
const {app, BrowserWindow, Menu, ipcMain} = electron;

// Debugging Settings
let debug = true; // true  = with debugging
if(debug)
    process.env.NODE_ENV = 'developmet';
else
    process.env.NODE_ENV = 'production';

// Windows
let mainWindow;
let aboutWindow;
let changesWindow;
let licensesWindow;
let updateWindow;

/*
    Opens Mainwindow on start
*/
app.on('ready', function(){
    // Window Centering
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - 900) / 2);
    let y = bounds.y + ((bounds.height - 600) / 2);
    mainWindow = new BrowserWindow({
        width:900,
        height:600,
        x: x,
        y: y
    });
    mainWindow.$ = mainWindow.jQuery = jQuery;
    mainWindow.electron = electron;
    mainWindow.loadURL("file://"+__dirname+"/windows/mainWindow.html");
    mainWindow.on('closed', function(){
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// Create Windows
function createAboutWindow()
{
    // Window Centering
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - 460) / 2);
    let y = bounds.y + ((bounds.height - 340) / 2);

    aboutWindow = new BrowserWindow({
        width:460,
        height:380,
        title:'About this Program',
        x: x,
        y: y
    });
    aboutWindow.loadURL("file://"+__dirname+"/windows/aboutWindow.html");
    aboutWindow.on('close', function(){
        aboutWindow = null;
    });
       
    if(process.env.NODE_ENV !== 'production')
    {
        aboutWindow.setMenu(Menu.buildFromTemplate([{
            label:'Developer Tools',
            submenu:[
                {
                    label:'Dev Tools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role:'reload'
                }
            ]
        }]));
    }
    else{
        aboutWindow.setMenu(null);
    }
}

function createChangesWindow()
{
    // Window Centering
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - 500) / 2);
    let y = bounds.y + ((bounds.height - 500) / 2);
    
    changesWindow = new BrowserWindow({
        width:500,
        height:500,
        title:'Changelog',
        x: x,
        y: y
    });
    changesWindow.loadURL("file://"+__dirname+"/windows/changesWindow.html");
    changesWindow.on('close', function(){
        changesWindow = null;
    });
    const changesMenu = Menu.buildFromTemplate(changesMenuTemplate);
    changesWindow.setMenu(changesMenu);
}

function createLicensesWindow()
{
    // Window Centering
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - 450) / 2);
    let y = bounds.y + ((bounds.height - 330) / 2);
    
    licensesWindow = new BrowserWindow({
        width:450,
        height:330,
        title:'Licenses',
        x: x,
        y: y
    });
    licensesWindow.loadURL("file://"+__dirname+"/windows/licensesWindow.html");
    licensesWindow.on('close', function(){
        licensesWindow = null;
    });
    const licensesMenu = Menu.buildFromTemplate(licensesMenuTemplate);
    licensesWindow.setMenu(licensesMenu);
}

function createUpdateWindow()
{
    // Window Centering
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - 450) / 2);
    let y = bounds.y + ((bounds.height - 330) / 2);
    
    updateWindow = new BrowserWindow({
        width:450,
        height:350,
        title:'Update HydroEdit',
        x: x,
        y: y
    });

    updateWindow.$ = updateWindow.jQuery = jQuery;
    updateWindow.loadURL("file://"+__dirname+"/windows/updateWindow.html");
    updateWindow.on('close', function(){
        updateWindow = null;
    });

    if(process.env.NODE_ENV !== 'production')
    {
        updateWindow.setMenu(Menu.buildFromTemplate([{
            label:'Developer Tools',
            submenu:[
                {
                    label:'Dev Tools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role:'reload'
                }
            ]
        }]));
    }
    else{
        updateWindow.setMenu(null);
    }
}

// Menu Templates
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'New File',
                accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
                click(){
                    mainWindow.webContents.send('file:new');
                }
            },
            {type: 'separator'},
            {
                label:'Open File',
                accelerator: process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',
                click(){
                    mainWindow.webContents.send('file:open');
                }
            },
            {type: 'separator'},
            {
                label:'Save File',
                accelerator: process.platform == 'darwin' ? 'Command+S' : 'Ctrl+S',
                click(){
                    mainWindow.webContents.send('file:save');
                }
            },
            {
                label:'Save File as ..',
                accelerator: process.platform == 'darwin' ? 'Shift+Command+S' : 'Ctrl+Shift+S',
                click(){
                    mainWindow.webContents.send('file:save_as');
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
        ]
    },
    {
        label: 'Language',
        submenu: [
            {
                label:'Batch',
                click(){
                    mainWindow.webContents.send('lang:bat');
                }
            },
            {type: 'separator'},
            {
                label:'C#',
                click(){
                    mainWindow.webContents.send('lang:cs');
                }
            },
            {
                label:'C++',
                click(){
                    mainWindow.webContents.send('lang:cpp');
                }
            },
            {
                label:'CSS',
                click(){
                    mainWindow.webContents.send('lang:css');
                }
            },
            {type: 'separator'},
            {
                label:'HTML',
                click(){
                    mainWindow.webContents.send('lang:html');
                }
            },
            {type: 'separator'},
            {
                label:'Ini',
                click(){
                    mainWindow.webContents.send('lang:ini');
                }
            },
            {type: 'separator'},
            {
                label:'JavaScript',
                click(){
                    mainWindow.webContents.send('lang:js');
                }
            },
            {
                label:'JSON',
                click(){
                    mainWindow.webContents.send('lang:json');
                }
            },
            {type: 'separator'},
            {
                label:'Lua',
                click(){
                    mainWindow.webContents.send('lang:lua');
                }
            },
            {type: 'separator'},
            {
                label:'PHP',
                click(){
                    mainWindow.webContents.send('lang:php');
                }
            },
            {
                label:'Python',
                click(){
                    mainWindow.webContents.send('lang:python');
                }
            },
            {type: 'separator'},
            {
                label:'SQL',
                click(){
                    mainWindow.webContents.send('lang:sql');
                }
            },
            {type: 'separator'},
            {
                label:'Visual Basic',
                click(){
                    mainWindow.webContents.send('lang:vb');
                }
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    },
    {
        label:'Help',
        submenu:[
            {
                label:'About',
                click(){
                    createAboutWindow();
                }
            },
            {
                label:'Update',
                click(){
                    createUpdateWindow();
                }
            },
            {type: 'separator'},
            {
                label:'Changes',
                click(){
                    createChangesWindow();
                }
            },
            {
                label:'Licenses',
                click(){
                    createLicensesWindow();
                }
            }
        ]
    }
];

const changesMenuTemplate = [
    {
        label:'Control',
        submenu:[
            {
                label:'Back',
                click(){
                    changesWindow.webContents.goBack();
                }
            },
            {role:'reload'}
        ]
    }
];

const licensesMenuTemplate = [
    {
        label:'Control',
        submenu:[
            {
                label:'Back',
                click(){
                    licensesWindow.webContents.goBack();
                }
            }
        ]
    }
];

// Menu fix for macOS
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Development/Debugging Tools
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    });
  
    changesMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    });
  
    licensesMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    });
}