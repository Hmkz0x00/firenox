'use client'

import { useEffect, useRef, useState } from 'react'

type Viewer = { playing: boolean; rotate: (delta: number) => void; reset: () => void }

export function ProductBottle() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}
    const host = stageRef.current
    if (!host) return

    async function load() {
      const [THREE, { OrbitControls }, { RoomEnvironment }, { createBottleLabel, createFirenoxBottle }] = await Promise.all([
        import('three'),
        import('three/addons/controls/OrbitControls.js'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('@/lib/firenox-bottle-model'),
      ])
      if (disposed || !host) return
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      const canvas = renderer.domElement
      canvas.setAttribute('role', 'img')
      canvas.setAttribute('aria-label', '3D FIRENOX fire spray bottle with red flame artwork. Drag or use arrow keys to rotate. Press Space to pause or resume.')
      canvas.className = 'product-bottle__canvas'
      canvas.tabIndex = 0
      host.appendChild(canvas)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
      const target = new THREE.Vector3(0, 0, 0)
      const controls = new OrbitControls(camera, canvas)
      controls.target.copy(target)
      controls.enablePan = false
      controls.enableZoom = false
      controls.enableDamping = true
      controls.dampingFactor = 0.08
      controls.rotateSpeed = 0.55
      controls.minPolarAngle = Math.PI / 2
      controls.maxPolarAngle = Math.PI / 2
      canvas.style.touchAction = 'pan-y'
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
      const viewer: Viewer = {
        playing: !motion.matches,
        rotate: () => {},
        reset: () => {},
      }

      const room = new RoomEnvironment()
      const pmrem = new THREE.PMREMGenerator(renderer)
      const environment = pmrem.fromScene(room, 0.04)
      scene.environment = environment.texture
      scene.environmentIntensity = 0.45
      room.dispose()
      pmrem.dispose()
      const key = new THREE.DirectionalLight('#ffffff', 2)
      key.position.set(-3, 5, 5)
      scene.add(key)
      const fill = new THREE.DirectionalLight('#dcecff', 0.8)
      fill.position.set(4, 1, 3)
      scene.add(fill)
      const rim = new THREE.DirectionalLight('#ffffff', 2)
      rim.position.set(1, 3, -4)
      scene.add(rim)

      cleanup = () => {
        controls.dispose()
        environment.dispose()
        renderer.dispose()
        canvas.remove()
      }

      const texture = await createBottleLabel()
      if (disposed) {
        texture.dispose()
        controls.dispose()
        environment.dispose()
        renderer.dispose()
        canvas.remove()
        return
      }
      const bottle = createFirenoxBottle(texture)
      scene.add(bottle)
      let inView = true
      let animationId = 0
      let lastTime = 0
      let dirty = true
      let dragging = false

      function render() {
        renderer.render(scene, camera)
        canvas.dataset.angle = bottle.rotation.y.toFixed(4)
        canvas.dataset.azimuth = controls.getAzimuthalAngle().toFixed(4)
        canvas.dataset.playing = String(viewer.playing)
      }
      function resize() {
        if (!host) return
        const { width, height } = host.getBoundingClientRect()
        camera.aspect = width / Math.max(height, 1)
        // Fit the complete silhouette, including the safety ring and bottom rim.
        const verticalFov = THREE.MathUtils.degToRad(camera.fov)
        const fitHeight = 7.35
        const fitWidth = 2.25
        const distance = Math.max(fitHeight / (2 * Math.tan(verticalFov / 2)), fitWidth / (2 * Math.tan(verticalFov / 2) * camera.aspect))
        const azimuth = controls.getAzimuthalAngle()
        camera.position.set(Math.sin(azimuth) * distance, 0, Math.cos(azimuth) * distance)
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        controls.update()
        dirty = true
        render()
      }
      camera.position.set(0, 0, 14)
      controls.update()
      viewer.rotate = (delta) => { bottle.rotation.y += delta; dirty = true; render() }
      viewer.reset = () => {
        bottle.rotation.y = -0.12
        camera.position.set(0, 0, camera.position.length())
        controls.update()
        dirty = true
        render()
      }
      const pause = () => { viewer.playing = false }
      const onStart = () => { dragging = true; pause() }
      const onEnd = () => { dragging = false; viewer.playing = !motion.matches; dirty = true }
      const onChange = () => { dirty = true }
      const onMotion = () => { viewer.playing = !motion.matches; dirty = true }
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
          event.preventDefault()
          viewer.playing = !viewer.playing
          dirty = true
          render()
          return
        }
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home') return
        event.preventDefault()
        pause()
        if (event.key === 'Home') viewer.reset()
        else viewer.rotate(event.key === 'ArrowLeft' ? -Math.PI / 12 : Math.PI / 12)
      }
      const onContextLost = (event: Event) => { event.preventDefault(); pause(); setFailed(true); setReady(false) }
      controls.addEventListener('start', onStart)
      controls.addEventListener('end', onEnd)
      controls.addEventListener('change', onChange)
      motion.addEventListener('change', onMotion)
      canvas.addEventListener('keydown', onKeyDown)
      canvas.addEventListener('webglcontextlost', onContextLost)
      const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; lastTime = 0; dirty = true })
      observer.observe(host)
      const resizer = new ResizeObserver(resize)
      resizer.observe(host)
      resize()
      setReady(true)

      function animate(time: number) {
        if (disposed) return
        const elapsed = lastTime ? Math.min(time - lastTime, 80) : 0
        lastTime = time
        if (inView && !document.hidden) {
          if (viewer.playing && !dragging) {
            bottle.rotation.y += elapsed * Math.PI * 2 / 180000
            dirty = true
          }
          controls.update()
          if (dirty) { render(); dirty = false }
        }
        animationId = requestAnimationFrame(animate)
      }
      animationId = requestAnimationFrame(animate)
      cleanup = () => {
        cancelAnimationFrame(animationId)
        observer.disconnect()
        resizer.disconnect()
        motion.removeEventListener('change', onMotion)
        canvas.removeEventListener('keydown', onKeyDown)
        canvas.removeEventListener('webglcontextlost', onContextLost)
        controls.dispose()
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            const materials = Array.isArray(object.material) ? object.material : [object.material]
            materials.forEach(material => material.dispose())
          }
        })
        texture.dispose()
        environment.dispose()
        renderer.dispose()
        canvas.remove()
      }
    }

    load().catch(() => {
      cleanup()
      if (!disposed) { setFailed(true); setReady(false) }
    })
    return () => { disposed = true; cleanup() }
  }, [])

  return (
    <div className="product-bottle" data-ready={ready} data-mode="3d">
      <div className="product-turntable__stage product-bottle__stage" ref={stageRef}>
        {!ready && !failed && (
          <div className="product-bottle__loading" role="status">
            <span className="product-bottle__spinner" aria-hidden="true" />
            <span>Loading 3D bottle</span>
          </div>
        )}
        {failed && <p className="product-bottle__loading" role="status">3D product view unavailable</p>}
      </div>
    </div>
  )
}
