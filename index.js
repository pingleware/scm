"use strict"

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const os = require('os');
const fs = require('fs');
const path = require('path');

var express = require("express");
var cors = require('cors');

var rest = express();
rest.use(express.json());
rest.use(express.urlencoded({extended:true}));
rest.use(cors({origin: '*'}));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 975,
    height: 600,
    resizable: false,
    icon: path.join(__dirname,'views/images/side.jpg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(`views/index.html`)

  // Wait for the window to finish loading
  mainWindow.webContents.on('did-finish-load', () => {
    // Send the value 10 to the renderer process
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.once('ready-to-show', () => {
    //autoUpdater.checkForUpdatesAndNotify();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// API Server
//
// START SERVER LISTENING ON PORT config.port
//
rest.get("/",async (req,res) => {
  res.json(req);
})
rest.get("/end",async (req,res) => {
  mainWindow.loadFile(`views/index.html`);
  res.end();
})
rest.get("/customer",async (req,res) => {
  mainWindow.height = 600;
  mainWindow.loadFile(`views/customer.html`)
  res.end()
})
rest.get("/newcust",async (req,res) => {
  mainWindow.height = 900;
  mainWindow.loadFile(`views/newcust.html`)
  res.end()
});
rest.post("/newcust",async (req,res) => {
  console.log(req.body);
  mainWindow.height = 900;
  mainWindow.loadFile(`views/newcust.html`)
  res.end()
})
rest.get("/custinfo",async (req,res) => {
  mainWindow.loadFile(`views/custinfo.html`)
  res.end()
});
rest.post("/custinfo",async (req,res) => {
  console.log(req.body);
  const data = {
    cid: req.body.custid,
    compname: "Sample Company",
    address: "10 Market Street",
    city: "Miami",
    state: "FL",
    postal: "33157",
    contact: "305-555-1212",
    fax: "305-555-1212",
    email: "buyer@sample.company"
  }
  res.json(data)
});
rest.get("/custup",async (req,res) => {
  mainWindow.loadFile(`views/custup.html`)
  res.end()
});
rest.put("/custup",async (req,res) => {
  console.log(req.body)
  res.end("success");
});
rest.get("/custdel",async (req,res) => {
  mainWindow.loadFile(`views/custdel.html`)
  res.end()
});
rest.delete("/custdel",async (req,res) => {
  console.log(req.body);
  mainWindow.loadFile(`views/cust.html`)
  res.end("success")
});
rest.get("/item",async (req,res) => {
  mainWindow.loadFile(`views/item.html`)
  res.end()
})
rest.get("/newitem",async (req,res) => {
  mainWindow.loadFile(`views/newitem.html`)
  res.end()
})
rest.post("/newitem",async (req,res) => {
  console.log(req.body)
  mainWindow.loadFile(`views/newitem.html`)
  res.end()
})
rest.post("/iteminfo",async (req,res) => {
  console.log(req.body);

  const data = {
    itemid: req.body.itemid,
    name: 'Widget',
    category: 'Widgets',
    cost: 3.03,
    qty: 100,
    price: 10.49,
    description: 'A new fangled widget',
    date: '2023-12-14'
  }
  res.json(data)
})
rest.get("/iteminfo",async (req,res) => {
  mainWindow.loadFile(`views/iteminfo.html`)
  res.end()
})
rest.get("/itemup",async (req,res) => {
  mainWindow.loadFile(`views/itemup.html`)
  res.end()
})
rest.put("/itemup",async (req,res) => {
  console.log(req.body)
  mainWindow.loadFile(`views/itemup.html`)
  res.end("success")
})
rest.get("/delitem",async (req,res) => {
  mainWindow.loadFile(`views/delitem.html`)
  res.end()
})
rest.delete("/delitem",async (req,res) => {
  console.log(req.body)
  mainWindow.loadFile(`views/item.html`)
  res.end("success")
})
rest.get("/sales",async (req,res) => {
  mainWindow.loadFile(`views/sales.html`)
  res.end()
})
rest.get("/ordent",async (req,res) => {
  mainWindow.loadFile(`views/ordent.html`)
  res.end()
})
rest.get("/salesinfo",async (req,res) => {
  mainWindow.loadFile(`views/salesinfo.html`)
  res.end()
})
rest.get("/salesret",async (req,res) => {
  mainWindow.loadFile(`views/salesret.html`)
  res.end()
})
rest.get("/supplier",async (req,res) => {
  mainWindow.loadFile(`views/supplier.html`)
  res.end()
})
rest.get("/newsup",async (req,res) => {
  mainWindow.loadFile(`views/newsup.html`)
  res.end()
})
rest.post("/newsup",async (req,res) => {
  console.log(req.body)
  mainWindow.loadFile(`views/newsup.html`)
  res.end()
})
rest.get("/supinfo",async (req,res) => {
  mainWindow.loadFile(`views/supinfo.html`)
  res.end()
})
rest.post("/supinfo",async (req,res) => {
  console.log(req.body);
  const data = {
    supid: req.body.supid,
    compname: "Sample Company",
    address: "10 Market Street",
    city: "Miami",
    state: "FL",
    postal: "33157",
    contact: "305-555-1212",
    fax: "305-555-1212",
    email: "buyer@sample.company"
  }
  res.json(data);
})
rest.get("/supup",async (req,res) => {
  mainWindow.loadFile(`views/supup.html`)
  res.end()
})
rest.put("/supup",async (req,res) => {
  console.log(req.body);
  res.end("success")
})
rest.get("/supdel",async (req,res) => {
  mainWindow.loadFile(`views/supdel.html`)
  res.end()
})
rest.delete("/supdel",async (req,res) => {
  console.log(req.body);
  mainWindow.loadFile(`views/supdel.html`)
  res.end()
})
rest.get("/purchase",async (req,res) => {
  mainWindow.loadFile(`views/purchase.html`)
  res.end()
})
rest.get("/purent",async (req,res) => {
  mainWindow.loadFile(`views/purent.html`)
  res.end()
})
rest.post("/purent",async (req,res) => {
  console.log(req.body)
  mainWindow.loadFile(`views/purent.html`)
  res.end()
})
rest.get("/purinfo",async (req,res) => {
  mainWindow.loadFile(`views/purinfo.html`)
  res.end()
})
rest.post("/purinfo",async (req,res) => {
  const data = {
    purid: req.body.purid,
    supid: 1,
    itemid: 1,
    itemname: "Widget",
    category: "Widgets",
    qty: 100,
    price: 3.03,
    purchase_date: "2023-12-01",
    receiving_date: "2023-12-10",
    return_date: "2023-12-23"
  }
  res.json(data)
})
rest.get("/purret",async (req,res) => {
  mainWindow.loadFile(`views/purret.html`)
  res.end()
})
rest.post("/purret",async (req,res) => {
  console.log(req.body)
  mainWindow.loadFile(`views/purret.html`)
  res.end()
})
rest.get("/report",async (req,res) => {
  mainWindow.loadFile(`views/report.html`)
  res.end()
})
rest.get("/end",async (req,res) => {
  mainWindow.loadFile(`views/index.html`);
  res.end();
})

rest.post('/login',async (req,res) => {
  try {
    mainWindow.loadFile(`views/default.html`)
    res.end()
  } catch(error) {
    res.json({success: false, message: error.message, error: error});
  }
})
function startServer(callback) {
    var server = rest.listen(0, () => {
        console.log("server running on port " + server.address().port);
        callback(server.address().port)
    })    
}

ipcMain.on("server_settings", function(evt, data){
  startServer(function(port){
    mainWindow.webContents.send('server_settings',port);
  })
})