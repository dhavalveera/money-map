/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ProgressInfo, UpdateCheckResult } from 'electron-updater'

import { type FC, useCallback, useMemo, useState } from 'react'

// COmponents
import DownloadProgress from './progress'
import Modal from './modal'

interface VersionInfo {
  update: boolean
  version: string
  newVersion?: string
}

interface ErrorType {
  message: string
  error: Error
}

const Update: FC = () => {
  const [checking, setChecking] = useState<boolean>(false)
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false)
  const [versionInfo, setVersionInfo] = useState<VersionInfo>()
  const [updateError, setUpdateError] = useState<ErrorType>()
  const [progressInfo, setProgressInfo] = useState<Partial<ProgressInfo>>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalBtn, setModalBtn] = useState<{
    cancelText?: string
    okText?: string
    onCancel?: () => void
    onOk?: () => void
  }>({
    onCancel: () => setModalOpen(false),
    onOk: () => window.electron.ipcRenderer.invoke('start-download')
  })

  const checkUpdate = useCallback(async () => {
    setChecking(true)

    /**
     * @type {import('electron-updater').UpdateCheckResult | null | { message: string, error: Error }}
     */
    const result: UpdateCheckResult | null | any =
      await window.electron.ipcRenderer.invoke('check-update')
    setProgressInfo({ percent: 0 })

    setChecking(false)

    setModalOpen(true)
    if (result?.error) {
      setUpdateAvailable(false)
      setUpdateError(result?.error)
    }
  }, [])

  const onUpdateCanAvailable = useCallback(
    async (_event: Electron.IpcRendererEvent, arg1: VersionInfo) => {
      setVersionInfo(arg1)

      setUpdateError(undefined)

      // Can be Updated
      if (arg1.update) {
        setModalBtn((state) => ({
          ...state,
          cancelText: 'Cancel',
          okText: 'Update',
          onOk: () => window.electron.ipcRenderer.invoke('start-download')
        }))
        setUpdateAvailable(true)
      } else {
        setUpdateAvailable(false)
      }
    },
    []
  )

  const onUpdateError = useCallback((_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
    setUpdateAvailable(false)
    setUpdateError(arg1)
  }, [])

  const onDownloadProgress = useCallback(
    (_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
      setProgressInfo(arg1)
    },
    []
  )

  const onUpdateDownloaded = useCallback(() => {
    setProgressInfo({ percent: 100 })

    setModalBtn((state) => ({
      ...state,
      cancelText: 'Cancel',
      okText: 'Install Now',
      onOk: () => window.electron.ipcRenderer.invoke('quite-and-install')
    }))
  }, [])

  useMemo(() => {
    // Get Version information and whether to update
    window.electron.ipcRenderer.on('update-can-available', onUpdateCanAvailable)
    window.electron.ipcRenderer.on('update-error', onUpdateError)
    window.electron.ipcRenderer.on('download-progress', onDownloadProgress)
    window.electron.ipcRenderer.on('update-downloaded', onUpdateDownloaded)
  }, [])

  return (
    <>
      <Modal
        open={modalOpen}
        cancelText={modalBtn.cancelText}
        okText={modalBtn.okText}
        onCancel={modalBtn.onCancel}
        onOk={modalBtn.onOk}
        footer={updateAvailable ? /* hide footer */ null : undefined}
        title="Update"
      >
        <div>
          {updateError ? (
            <div>
              <p className="font-primaryFont text-base font-normal">
                Error downloading the latest version.
              </p>
              <p>{updateError.message}</p>
            </div>
          ) : updateAvailable ? (
            <div>
              <p>The Last Version is: v{versionInfo?.newVersion}</p>

              <p className="font-primaryFont ml-10">
                v{versionInfo?.version} -&gt; v{versionInfo?.newVersion}
              </p>

              <div className="flex">
                <div className="ml-2">Update progress:</div>
                <div className="w-0 flex-grow">
                  <DownloadProgress percent={progressInfo?.percent} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {versionInfo ? (
                <div className="text-center flex justify-center items-center">
                  <p className="p-5 text-center flex justify-center items-center">
                    {JSON.stringify(versionInfo, null, 2)}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </Modal>

      <button type="button" disabled={checking} onClick={checkUpdate}>
        {checking ? 'Checking...' : 'Check Update'}
      </button>
    </>
  )
}

export default Update
