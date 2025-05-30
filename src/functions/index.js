export function invertColor(hex) {
  hex = hex.replace('#', '')

  let r = 255 - parseInt(hex.substring(0, 2), 16)
  let g = 255 - parseInt(hex.substring(2, 4), 16)
  let b = 255 - parseInt(hex.substring(4, 6), 16)

  return `#${[r, g, b]
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')}`
}


export function darkenColor(hex, amount=20) {
  hex = hex.replace('#', '')

  let r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount)
  let g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount)
  let b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount)

  return `#${[r, g, b]
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')}`
}


export function colormap(value, nmax) {
  const v = Math.min(Math.max(value, 0), nmax)

  const t = v / nmax

  const r = Math.round(255 * t)
  const g = 0
  const b = Math.round(255 * (1 - t))

  return { r, g, b }
}


export function rgb2Hex({ r, g, b }) {
  const toHex = (c) => c.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}


export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


export function getRandomSign() {
  return Math.sign(2*Math.random()-1)
}


export function shuffle(array) {
  const arr = [...array]

  let currentIndex = arr.length

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]
    ]
  }

  return arr
}



export function σ(t) {
  return 1 / (1 + Math.exp(-t))
}


export function adjacency(V, E) {
  const labels = V.map((vertex) => (vertex.id))
  const matrix = Array.from({ length: V.length }, () => Array(V.length).fill(0))

  for (const edge of E) {
    const fromIndex = labels.indexOf(edge.from)
    const toIndex = labels.indexOf(edge.to)
  
    if (fromIndex !== -1 && toIndex !== -1) {
      matrix[fromIndex][toIndex] = 1
      matrix[toIndex][fromIndex] = 1
    }
  }

  return matrix
}


export function getNlinksPerNode(V, E) {
  const NlinksPerNode = new Object()

  const labels = V.map((vertex) => (vertex.id))

  for (const label of labels) {
    NlinksPerNode[label] = E.filter((link) => link.to === label || link.from === label).length
  }

  return NlinksPerNode
}


export function isOverlapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  )
}