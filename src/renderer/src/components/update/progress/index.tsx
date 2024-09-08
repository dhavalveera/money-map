import type { FC } from 'react'

type DownloadProgressType = { percent?: number }

const DownloadProgress: FC<DownloadProgressType> = ({ percent = 0 }) => {
  return (
    <div className="flex items-center">
      <div className="border border-black rounded-[3px] h-2 w-[300px]">
        <div
          className="h-[6px] rounded-[3px] bg-custom-gradient"
          style={{ width: `${3 * percent}px` }}
        />
      </div>
      <span className="my-0 mx-[10px]">{(percent ?? 0).toString().substring(0, 4)}%</span>
    </div>
  )
}

export default DownloadProgress
