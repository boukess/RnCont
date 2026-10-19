const { app, BrowserWindow, session } = require('electron');
const path = require('node:path');
app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  function createWindow() {
    const win = new BrowserWindow({ width: 1440, height: 960, minWidth: 900, minHeight: 650, backgroundColor: '#f6f7f3', title: 'CreatorOS', webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true } });
    win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    win.webContents.on('will-navigate', event => event.preventDefault());
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
