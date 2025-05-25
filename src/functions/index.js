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
