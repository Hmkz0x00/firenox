'use client'

import { useEffect, useRef, useState } from 'react'

export default function FireCan3D() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setIsLoaded(true)
    video.addEventListener('canplaythrough', handleCanPlay)

    if (video.readyState >= 4) setIsLoaded(true)
    video.play().catch(() => {})

    return () => video.removeEventListener('canplaythrough', handleCanPlay)
  }, [])

  return (
    <div className="hero-video-wrapper">
      {/* Subtle ember glow behind the can */}
      <div className="hero-video-glow" aria-hidden />

      <video
        ref={videoRef}
        className={`hero-video ${isLoaded ? 'hero-video--visible' : ''}`}
        src="/firenox-hero-new.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/firenox-hero-new-poster.webp"
        disablePictureInPicture
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
      />

      {/* Edge fade masks to dissolve the video borders into the background */}
      <div className="hero-video-mask hero-video-mask--top" aria-hidden />
      <div className="hero-video-mask hero-video-mask--bottom" aria-hidden />
      <div className="hero-video-mask hero-video-mask--left" aria-hidden />
      <div className="hero-video-mask hero-video-mask--right" aria-hidden />
    </div>
  )
}
