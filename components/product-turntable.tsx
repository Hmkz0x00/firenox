'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const FRAME_COUNT = 12
const FRAME_WIDTH = 360
const FRAME_HEIGHT = 720
const CYCLE_MS = 100000
const FRONT_FRAME = 5

export function ProductTurntable() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLCanvasElement[]>([])
  const positionRef = useRef(FRONT_FRAME)
  const directionRef = useRef(1)
  const playingRef = useRef(true)
  const [playing, setPlaying] = useState(true)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  function paint(position: number) {
    const canvas = canvasRef.current
    const frames = framesRef.current
    if (!canvas || !frames.length) return
    const context = canvas.getContext('2d')
    if (!context) return
    const lower = Math.floor(position)
    const upper = Math.min(lower + 1, FRAME_COUNT - 1)
    const mix = position - lower
    context.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT)
    // Add weighted photographs so transitions cannot expose a black rectangle.
    context.globalCompositeOperation = 'lighter'
    context.globalAlpha = 1 - mix
    context.drawImage(frames[lower], 0, 0)
    context.globalAlpha = mix
    context.drawImage(frames[upper], 0, 0)
    context.globalAlpha = 1
    context.globalCompositeOperation = 'source-over'
    canvas.dataset.frame = position.toFixed(2)
  }

  useEffect(() => {
    let disposed = false
    let animationId = 0
    let lastTime = 0
    let inView = true
    const canvas = canvasRef.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyMotionPreference = () => {
      playingRef.current = !motion.matches
      setPlaying(!motion.matches)
    }
    applyMotionPreference()
    motion.addEventListener('change', applyMotionPreference)

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      lastTime = 0
    })
    if (canvas) observer.observe(canvas)

    const sheet = new window.Image()
    sheet.onload = () => {
      if (disposed) return
      const cellWidth = sheet.naturalWidth / 6
      const cellHeight = sheet.naturalHeight / 2
      const source = document.createElement('canvas')
      source.width = cellWidth
      source.height = cellHeight
      const sourceContext = source.getContext('2d', { willReadFrequently: true })
      if (!sourceContext) {
        setFailed(true)
        return
      }

      try {
        framesRef.current = Array.from({ length: FRAME_COUNT }, (_, index) => {
          sourceContext.clearRect(0, 0, cellWidth, cellHeight)
          sourceContext.drawImage(sheet, (index % 6) * cellWidth, Math.floor(index / 6) * cellHeight,
            cellWidth, cellHeight, 0, 0, cellWidth, cellHeight)
          const { data } = sourceContext.getImageData(0, 0, cellWidth, cellHeight)
          let left = cellWidth, top = cellHeight, right = 0, bottom = 0
          // Register the photographic silhouettes to one height and baseline.
          for (let y = 0; y < cellHeight; y++) {
            for (let x = 0; x < cellWidth; x++) {
              const offset = (y * cellWidth + x) * 4
              if (Math.max(data[offset], data[offset + 1], data[offset + 2]) > 38) {
                left = Math.min(left, x)
                right = Math.max(right, x)
                top = Math.min(top, y)
                bottom = Math.max(bottom, y)
              }
            }
          }
          if (bottom <= top || right <= left) throw new Error('Empty product frame')
          left = Math.max(0, left - 4)
          right = Math.min(cellWidth - 1, right + 4)
          top = Math.max(0, top - 3)
          bottom = Math.min(cellHeight - 1, bottom + 3)
          const frame = document.createElement('canvas')
          frame.width = FRAME_WIDTH
          frame.height = FRAME_HEIGHT
          const context = frame.getContext('2d')
          if (!context) throw new Error('Product canvas unavailable')
          const height = FRAME_HEIGHT * 0.94
          const scale = height / (bottom - top + 1)
          const width = (right - left + 1) * scale
          context.drawImage(source, left, top, right - left + 1, bottom - top + 1,
            (FRAME_WIDTH - width) / 2, FRAME_HEIGHT * 0.025, width, height)
          return frame
        })
        paint(positionRef.current)
        setReady(true)
      } catch {
        setFailed(true)
        return
      }

      const animate = (time: number) => {
        if (disposed) return
        const elapsed = lastTime ? Math.min(time - lastTime, 80) : 0
        lastTime = time
        if (playingRef.current && inView && !document.hidden) {
          let position = positionRef.current + directionRef.current * elapsed * (FRAME_COUNT - 1) * 2 / CYCLE_MS
          if (position >= FRAME_COUNT - 1 || position <= 0) {
            position = Math.max(0, Math.min(FRAME_COUNT - 1, position))
            directionRef.current *= -1
          }
          positionRef.current = position
          paint(position)
        }
        animationId = requestAnimationFrame(animate)
      }
      animationId = requestAnimationFrame(animate)
    }
    sheet.onerror = () => { if (!disposed) setFailed(true) }
    sheet.src = '/firenox-turntable-sheet-v1.png'

    return () => {
      disposed = true
      cancelAnimationFrame(animationId)
      observer.disconnect()
      motion.removeEventListener('change', applyMotionPreference)
      sheet.onload = null
      sheet.onerror = null
    }
  }, [])

  function togglePlayback() {
    playingRef.current = !playingRef.current
    setPlaying(playingRef.current)
  }

  function step(direction: number) {
    playingRef.current = false
    setPlaying(false)
    positionRef.current = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(positionRef.current) + direction))
    paint(positionRef.current)
  }

  return (
    <div className="product-turntable" data-ready={ready}>
      <div className="product-turntable__stage">
        {!ready && !failed && <div className="product-turntable__poster" role="img" aria-label="FIRENOX fire spray with a yellow safety handle and vertical label" />}
        <canvas
          ref={canvasRef}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          role="img"
          aria-label="FIRENOX fire spray, slowly turning through photographic views; complete bottle from safety handle to base"
          className={ready ? 'product-turntable__canvas is-ready' : 'product-turntable__canvas'}
        />
        {failed && <p role="status" className="product-turntable__error">Product image unavailable. Please refresh.</p>}
      </div>
      <div className="product-turntable__controls" role="group" aria-label="Product views">
        <button type="button" onClick={() => step(-1)} disabled={!ready} title="Previous bottle view" aria-label="Previous bottle view"><ChevronLeft aria-hidden="true" size={18} /></button>
        <button type="button" onClick={togglePlayback} disabled={!ready} title={playing ? 'Pause bottle rotation' : 'Play bottle rotation'} aria-label={playing ? 'Pause bottle rotation' : 'Play bottle rotation'}>
          {playing ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
        </button>
        <button type="button" onClick={() => step(1)} disabled={!ready} title="Next bottle view" aria-label="Next bottle view"><ChevronRight aria-hidden="true" size={18} /></button>
      </div>
    </div>
  )
}
