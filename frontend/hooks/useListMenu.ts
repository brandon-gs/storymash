import { useEffect, useRef, useState } from "react"

export default function useListMenu<TypeRef extends HTMLElement>() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<TypeRef>(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return {
    open,
    anchorRef,
    handleToggle,
    handleClose,
    handleListKeyDown,
  }
}
