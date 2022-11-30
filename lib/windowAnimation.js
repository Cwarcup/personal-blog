export function showHoverAnimation(e) {
  const rect = e.target.getBoundingClientRect()
  const x = e.clientX - rect.left //x position within the element.
  const y = e.clientY - rect.top //y position within the element.

  e.target.style.background = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2),rgba(255,255,255,0) )`
  e.target.style.borderImage = `radial-gradient(20% 75% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 1 / 1px / 0px stretch `
}

export function removeHoverAnimation(e) {
  e.target.style.background = null
  e.target.style.borderImage = null
}
