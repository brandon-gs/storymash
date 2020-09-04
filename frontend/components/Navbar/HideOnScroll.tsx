import { useScrollTrigger, Slide } from "@material-ui/core"

type Props = {
  children: React.ReactElement
  window?: () => Window
}

export default function HideOnScroll({ children, window }: Props): React.ReactElement {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
