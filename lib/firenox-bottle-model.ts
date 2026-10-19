import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

export async function createBottleLabel() {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 2048
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Label canvas unavailable')
  context.fillStyle = '#08090b'
  context.fillRect(0, 0, 2048, 2048)
  context.textBaseline = 'middle'

  // Typeset the wrap directly so the brand remains sharp at every camera angle.
  context.save()
  context.translate(512, 625)
  context.rotate(-Math.PI / 2)
  context.font = '900 240px Arial, sans-serif'
  const fireWidth = context.measureText('FIRE').width
  const noxWidth = context.measureText('NOX').width
  const start = -(fireWidth + noxWidth) / 2
  context.fillStyle = '#f51f29'
  context.fillText('FIRE', start, 0)
  context.fillStyle = '#ffffff'
  context.fillText('NOX', start + fireWidth, 0)
  context.restore()

  context.textAlign = 'center'
  context.font = '700 67px Arial, sans-serif'
  context.fillStyle = '#fa2530'
  context.fillText('FIGHTS ALL', 512, 1280)
  context.fillText('CLASS OF FIRE', 512, 1355)

  // A second printed face makes the back of the product useful when inspected.
  context.textAlign = 'center'
  context.fillStyle = '#ffffff'
  context.font = 'italic 900 79px Arial, sans-serif'
  context.fillText('FIRENOX', 1536, 340)
  context.font = '600 51px Arial, sans-serif'
  context.fillText('Fire Spray', 1536, 425)
  context.fillStyle = '#f51f29'
  context.font = '700 36px Arial, sans-serif'
  context.fillText('Fights All class of fires', 1536, 510)
  context.fillRect(1296, 595, 480, 3)
  const features = ['FAST ACTION', 'POWERFUL PROTECTION', 'EASY TO USE', 'SAFE & RELIABLE']
  context.font = '700 30px Arial, sans-serif'
  features.forEach((text, index) => {
    const y = 680 + index * 145
    context.strokeStyle = '#ef2530'
    context.lineWidth = 5
    context.beginPath()
    context.arc(1305, y, 36, 0, Math.PI * 2)
    context.stroke()
    context.fillStyle = '#ffffff'
    context.font = '700 30px Arial, sans-serif'
    context.fillText(String(index + 1), 1305, y)
    context.textAlign = 'left'
    context.fillText(text, 1370, y)
    context.textAlign = 'center'
  })
  context.fillStyle = '#ffffff'
  context.font = '700 33px Arial, sans-serif'
  context.fillText('A  •  B  •  C  •  D  •  F/K', 1536, 1260)
  context.fillStyle = '#ef2530'
  context.font = '700 28px Arial, sans-serif'
  context.fillText('NEXT GENERATION FIRE SAFETY', 1536, 1340)

  // Print the flames around the full circumference, above the red footer band.
  const flameInk = context.createLinearGradient(0, 1400, 0, 1910)
  flameInk.addColorStop(0, '#ff351f')
  flameInk.addColorStop(1, '#e20b18')
  context.fillStyle = flameInk
  for (let index = -1; index < 9; index++) {
    const x = index * 280 + 80
    const height = [420, 490, 355, 510][((index % 4) + 4) % 4]
    context.beginPath()
    context.moveTo(x - 150, 1908)
    context.bezierCurveTo(x - 210, 1810, x - 130, 1908 - height * 0.82, x + 30, 1908 - height)
    context.bezierCurveTo(x - 35, 1908 - height * 0.57, x + 110, 1740, x + 75, 1800)
    context.bezierCurveTo(x + 155, 1750, x + 165, 1845, x + 150, 1908)
    context.closePath()
    context.fill()
  }
  context.fillStyle = '#ed1823'
  context.fillRect(0, 1925, 2048, 123)
  context.fillStyle = '#08090b'
  context.fillRect(0, 1910, 2048, 12)

  // Lucide house, car, flame and zap outlines, printed as small package badges.
  const badges = [
    ['M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
    ['M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2', 'M9 17h6', 'M9 17a2 2 0 1 0-4 0 2 2 0 1 0 4 0', 'M19 17a2 2 0 1 0-4 0 2 2 0 1 0 4 0'],
    ['M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4'],
    ['M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'],
  ]
  for (const center of [512, 1536]) badges.forEach((paths, index) => {
    const x = center - 180 + index * 120
    context.save()
    context.strokeStyle = '#ffffff'
    context.lineWidth = 3
    context.beginPath()
    context.arc(x, 1985, 46, 0, Math.PI * 2)
    context.stroke()
    context.translate(x - 26, 1959)
    context.scale(52 / 24, 52 / 24)
    context.lineWidth = 1.5
    context.lineCap = 'round'
    context.lineJoin = 'round'
    paths.forEach(path => context.stroke(new Path2D(path)))
    context.restore()
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function extrudedShape(shape: THREE.Shape, depth: number, material: THREE.Material) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true, bevelSegments: 4, steps: 1,
    bevelSize: 0.025, bevelThickness: 0.025, curveSegments: 40,
  })
  geometry.translate(0, 0, -depth / 2)
  return new THREE.Mesh(geometry, material)
}

function ringShape(outerX: number, outerY: number, innerX: number, innerY: number) {
  const shape = new THREE.Shape()
  shape.absellipse(0, 0, outerX, outerY, 0, Math.PI * 2, false, 0)
  const hole = new THREE.Path()
  hole.absellipse(0, 0, innerX, innerY, 0, Math.PI * 2, true, 0)
  shape.holes.push(hole)
  return shape
}

export function createFirenoxBottle(labelTexture: THREE.Texture) {
  const bottle = new THREE.Group()
  bottle.name = 'FIRENOX fire spray'
  const shell = new THREE.MeshPhysicalMaterial({ color: '#090a0c', metalness: 0.55, roughness: 0.25, clearcoat: 0.65, clearcoatRoughness: 0.2, envMapIntensity: 0.7 })
  const plastic = new THREE.MeshPhysicalMaterial({ color: '#0b0c0e', roughness: 0.38, metalness: 0.02, clearcoat: 0.2, envMapIntensity: 0.3 })
  const rubber = new THREE.MeshStandardMaterial({ color: '#060708', roughness: 0.65 })
  const metal = new THREE.MeshStandardMaterial({ color: '#474a4d', metalness: 0.95, roughness: 0.25 })
  const red = new THREE.MeshPhysicalMaterial({ color: '#d60013', roughness: 0.4, clearcoat: 0.25, envMapIntensity: 0.2 })
  const yellow = new THREE.MeshPhysicalMaterial({ color: '#ffc400', roughness: 0.4, metalness: 0, clearcoat: 0.25, envMapIntensity: 0.2 })
  const ink = new THREE.MeshPhysicalMaterial({
    map: labelTexture, emissiveMap: labelTexture, emissive: '#ffffff', emissiveIntensity: 0.18,
    roughness: 0.38, metalness: 0.08, clearcoat: 0.25, clearcoatRoughness: 0.25, envMapIntensity: 0.4,
  })

  function cylinder(radius: number, height: number, y: number, material: THREE.Material) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 96), material)
    mesh.position.y = y
    bottle.add(mesh)
    return mesh
  }

  function roundedBox(width: number, height: number, depth: number, material: THREE.Material, position: [number, number, number], radius = 0.06) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 4, radius), material)
    mesh.position.set(...position)
    bottle.add(mesh)
    return mesh
  }

  const profile = [
    [0, -3], [0.56, -3], [0.66, -2.98], [0.7, -2.92], [0.71, -2.82],
    [0.71, 1.1], [0.704, 1.25], [0.69, 1.38], [0.66, 1.49],
    [0.61, 1.59], [0.54, 1.68], [0.45, 1.75], [0.38, 1.79],
    [0.36, 1.83], [0.36, 1.97], [0, 1.97],
  ].map(([radius, y]) => new THREE.Vector2(radius, y))
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 128), shell)
  body.name = 'Spun metal canister'
  bottle.add(body)
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.713, 0.713, 3.9, 160, 1, true, -Math.PI / 2), ink)
  label.position.y = -0.85
  label.name = 'Printed wrap with vertical FIRENOX wordmark'
  bottle.add(label)

  cylinder(0.711, 0.09, -2.92, metal)
  cylinder(0.698, 0.035, -2.83, shell)
  cylinder(0.4, 0.19, 1.9, plastic)
  cylinder(0.425, 0.07, 1.99, plastic)
  for (let index = 0; index < 36; index++) {
    const angle = index * Math.PI * 2 / 36
    const rib = roundedBox(0.025, 0.13, 0.035, plastic, [Math.sin(angle) * 0.398, 1.91, Math.cos(angle) * 0.398], 0.006)
    rib.rotation.y = angle
  }

  roundedBox(1.02, 0.66, 0.72, plastic, [-0.04, 2.33, 0], 0.12)
  roundedBox(0.77, 0.14, 0.76, plastic, [-0.1, 2.05, 0], 0.035)
  roundedBox(0.39, 0.51, 0.1, red, [-0.275, 2.39, 0.39], 0.035)
  roundedBox(0.35, 0.12, 0.115, red, [-0.275, 2.07, 0.4], 0.025)
  roundedBox(0.03, 0.58, 0.1, rubber, [-0.045, 2.36, 0.37], 0.01)

  const grip = extrudedShape(ringShape(0.3, 0.37, 0.19, 0.25), 0.19, plastic)
  grip.position.set(0.405, 2.28, 0.13)
  grip.rotation.z = 0.1
  bottle.add(grip)

  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.22, 64), plastic)
  nozzle.rotation.x = Math.PI / 2
  nozzle.position.set(0.16, 2.48, 0.43)
  bottle.add(nozzle)
  const outlet = new THREE.Mesh(new THREE.CircleGeometry(0.09, 48), rubber)
  outlet.position.set(0.16, 2.48, 0.548)
  bottle.add(outlet)
  for (const x of [-0.46, 0.36]) {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.043, 0.02, 32), metal)
    pin.rotation.x = Math.PI / 2
    pin.position.set(x, 2.59, 0.373)
    bottle.add(pin)
  }

  roundedBox(0.66, 0.12, 0.38, yellow, [-0.02, 2.75, -0.04], 0.045)
  const paddleShape = new THREE.Shape()
  paddleShape.moveTo(-0.48, 2.75)
  paddleShape.bezierCurveTo(-0.57, 2.91, -0.65, 3.25, -0.59, 3.37)
  paddleShape.quadraticCurveTo(-0.56, 3.43, -0.48, 3.37)
  paddleShape.lineTo(-0.22, 3.17)
  paddleShape.quadraticCurveTo(-0.16, 3.12, -0.18, 3.01)
  paddleShape.lineTo(-0.12, 2.78)
  paddleShape.closePath()
  const paddle = extrudedShape(paddleShape, 0.16, yellow)
  paddle.position.z = -0.06
  bottle.add(paddle)
  const safetyRing = extrudedShape(ringShape(0.275, 0.355, 0.145, 0.21), 0.15, yellow)
  safetyRing.position.set(0.2, 3.09, 0)
  safetyRing.rotation.z = -0.32
  bottle.add(safetyRing)
  const safetySpoon = roundedBox(0.44, 0.095, 0.4, yellow, [-0.02, 2.88, 0.07], 0.04)
  safetySpoon.rotation.z = 0.35

  for (let index = 0; index < 11; index++) {
    const link = new THREE.Mesh(new THREE.TorusGeometry(0.029, 0.011, 8, 16), yellow)
    link.position.set(0.44 + Math.sin(index * 0.25) * 0.055, 3.0 - index * 0.064, 0.17 + index * 0.013)
    link.rotation.y = index % 2 ? Math.PI / 2 : 0
    bottle.add(link)
  }

  bottle.position.y = -0.23
  bottle.rotation.y = -0.12
  return bottle
}
