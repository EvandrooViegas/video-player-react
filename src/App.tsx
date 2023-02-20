import React, { useState } from 'react'
import VideoPlayer from './components/VideoPlayer'

export default function App() {
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [videoDuration, setVideoDuration] = useState(0)
  function handleVideoSubmit(e:React.ChangeEvent<HTMLInputElement>) {
    const video = e.target.files?.[0]
    if(!video) return
    const blob = new Blob([video], {
      type: video?.type
    })
    const url = URL.createObjectURL(blob)
    setVideoUrl(url)
  }
  const [isShowVideoForm, setIsShowVideoForm] = useState(true)

  return (
    <div>
      {isShowVideoForm && (
        <div className='flex justify-center items-center my-4'>
          <label htmlFor="video-input" className='cursor-pointer bg-indigo-600 px-6 py-2 font-semibold text-white rounded-sm'>Upload a Video</label>
          <input type="file" id='video-input' accept='mp4' className='hidden' onChange={handleVideoSubmit} />

        </div>
      )}
      <VideoPlayer
      src={videoUrl}
      />
    </div>
  )
}
