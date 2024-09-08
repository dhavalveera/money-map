import { app, ipcMain } from 'electron'

// electron-updater
import { autoUpdater } from 'electron-updater'
import type { ProgressInfo, UpdateDownloadedEvent, UpdateInfo } from 'electron-updater'

export const update = (mainWindow: Electron.BrowserWindow): void => {
  // When set to false, the update download will be triggered through the API
  autoUpdater.autoDownload = false
  autoUpdater.disableWebInstaller = false
  autoUpdater.allowDowngrade = false

  // start Check
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for Update')
  })

  // Update Available
  autoUpdater.on('update-available', (arg: UpdateInfo) => {
    mainWindow.webContents.send('update-can-available', {
      update: true,
      version: app.getVersion(),
      newVersion: arg?.version
    })
  })

  //   Update Not Available
  autoUpdater.on('update-not-available', (arg: UpdateInfo) => {
    mainWindow.webContents.send('update-can-available', {
      update: false,
      version: app.getVersion(),
      newVersion: arg?.version
    })
  })

  //   Checking for Updates
  ipcMain.handle('check-update', async () => {
    if (!app.isPackaged) {
      const error = new Error('The update feature is only available after the package/distributed')
      return { message: error.message, error }
    }

    try {
      return await autoUpdater.checkForUpdatesAndNotify()
    } catch (error) {
      return { message: 'Network Error', error }
    }
  })

  ipcMain.handle('start-download', (event: Electron.IpcMainInvokeEvent) => {
    startDownload(
      (error, progressInfo) => {
        if (error) {
          // feedback download error message
          event.sender.send('update-error', { message: error.message, error })
        } else {
          // feedback update progress message
          event.sender.send('download-progress', progressInfo)
        }
      },
      () => {
        // feedback update downloaded message
        event.sender.send('update-downloaded')
      }
    )
  })

  // Install now
  ipcMain.handle('quit-and-install', () => {
    autoUpdater.quitAndInstall(false, true)
  })
}

const startDownload = (
  callback: (error: Error | null, info: ProgressInfo | null) => void,
  complete: (event: UpdateDownloadedEvent) => void
): void => {
  autoUpdater.on('download-progress', (info: ProgressInfo) => callback(null, info))
  autoUpdater.on('error', (error: Error) => callback(error, null))
  autoUpdater.on('update-downloaded', complete)
  autoUpdater.downloadUpdate()
}
