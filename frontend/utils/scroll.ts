function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop
  return 0
}

function elmYPosition(eID: string) {
  const elm = document.getElementById(eID)
  if (elm) {
    let y = elm.offsetTop
    let node: HTMLElement | any = elm
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent
      y += node.offsetTop
    }
    return y
  }
  return 0
}

export default function smoothScroll(eID: string): void {
  const startY = currentYPosition()
  const stopY = elmYPosition(eID)
  const distance = stopY > startY ? stopY - startY : startY - stopY
  if (distance < 100) {
    scrollTo(0, stopY)
    return
  }
  let speed = Math.round(distance / 100)
  if (speed >= 20) speed = 20
  const step = Math.round(distance / 25)
  let leapY = stopY > startY ? startY + step : startY - step
  let timer = 0
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      setTimeout(() => window.scrollTo(0, leapY), timer * speed)
      leapY += step
      if (leapY > stopY) leapY = stopY
      timer++
    }
    return
  }
  for (let i = startY; i > stopY; i -= step) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    setTimeout(() => window.scrollTo(0, leapY), timer * speed)
    leapY -= step
    if (leapY < stopY) leapY = stopY
    timer++
  }
}
