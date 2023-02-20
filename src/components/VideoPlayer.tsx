import { useEffect, useRef, useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
interface IProps {
    src: string,
}

export default function VideoPlayer({ src }: IProps) {
    const [isVideoPaused, setIsVideoPaused] = useState(true)
    const [videDuration, setVideoDuration] = useState<number>(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [watchedTime, setWatchedTime] = useState<number>(0)
    const [videoCurrentTime, setVideoCurrentTime] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    useEffect(() => {
        const watchedTimeInterval = setInterval(() => {
            if(isVideoPaused) return 
            setWatchedTime(watchedTime + 1) 
            if(watchedTime >= videDuration) {
                setIsVideoPaused(true)
                setWatchedTime(0)
                toggleIsVideoPaused()
                return 
            }
        }, 1000)
        return () => clearInterval(watchedTimeInterval)
    })
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.currentTime = videoCurrentTime
        }
    }, [videoCurrentTime])
    if(src) {
        return (
        <div className="relative cursor-pointer">
            <video ref={videoRef} src={src} onLoadedMetadata={handleVideoLoaded}></video>
            <div className="absolute left-0 right-0 bottom-4 h-6 text-white z-10">
                <div className="flex justify-start items-center gap-5 p-2">
                    <button onClick={toggleIsVideoPaused}>{isVideoPaused ? <FaPlay /> : <FaPause />}</button>
                    <button className="text-xl" onClick={toggleIsMuted}>{isMuted ? <BsFillMicMuteFill /> : <BsFillMicFill/>}</button>
                    <p>{formatSecondsToMinutes(watchedTime) + "/" + formatSecondsToMinutes(videDuration)}</p>
                    <input 
                        className="w-full tracker text-red-500" 
                        type="range" 
                        value={watchedTime} 
                        min={0} 
                        max={videDuration} 
                        onChange={(e) => {
                            setWatchedTime(Number(e.target.value))
                            setVideoCurrentTime(Number(e.target.value))
                        }}
                    />
                </div>
            </div>

            {isVideoPaused && <div className="text-8xl transition-all text-white absolute top-0 left-0 right-0 bottom-0 bg-black/60 grid place-content-center">
                <FaPlay />
            </div>}
        </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center font-semibold text-4xl text-white">
                No video Source 
            </div>
        )
    }

    function toggleIsVideoPaused() {
        setIsVideoPaused(!isVideoPaused)
        if(isVideoPaused) videoRef.current?.play()
        else videoRef.current?.pause()
    }
    function toggleIsMuted() {
        setIsMuted(!isMuted)
        if(isMuted) videoRef.current!.muted = false
        else videoRef.current!.muted = true
    }

    function handleVideoLoaded() {
        setVideoDuration(videoRef.current?.duration!)
    }

    function formatSecondsToMinutes(secondsToFormat:number) {
        // 140 -> 2:40
        const minutes = Math.floor(secondsToFormat / 60)
        const seconds = Math.floor(secondsToFormat % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    }
}
