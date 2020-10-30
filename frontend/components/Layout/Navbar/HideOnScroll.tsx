import { ReactElement } from "react"
import { useScrollTrigger, Slide } from "@material-ui/core"

type Props = {
  children: ReactElement
  window?: () => Window
}

export default function HideOnScroll({ children, window }: Props) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
