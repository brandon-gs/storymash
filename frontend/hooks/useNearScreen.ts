// Hooks
import { useEffect, useRef, useState } from "react"

type Props = {
  distance?: number
  once?: boolean
}

export default function useNearScreen({ distance = 100, once = true }: Props) {
  const [isNearScreen, setIsNearScreen] = useState(false)
  const fromRef = useRef<Element>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    const onChange: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setIsNearScreen(true)
        once && observer.disconnect()
      } else {
        !once && setIsNearScreen(false)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: `${distance}px`,
      })
      if (fromRef.current) {
        observer.observe(fromRef.current)
      }
    })
    return () => observer && observer.disconnect()
  }, [fromRef, distance])

  return { isNearScreen, fromRef }
}
