// Components
import { Grow } from "@material-ui/core"
import { CardStory } from "../../index"
// Hooks
import useStyles from "./styles"

type Props = {
  columns?: number
  stories: Array<Story>
  timeout?: number
  firstColumn?: React.ReactNode
  styles?: any
}

export default function ShowStories({
  stories,
  timeout,
  firstColumn,
  columns,
  styles = "",
}: Props) {
  const classes = useStyles()
  const columnCount = columns ? columns : stories.length + (firstColumn ? 1 : 0)
  const style = columns ? { columnCount } : {}
  return (
    <div className={styles.container ? styles.container : "list_stories--container"} style={style}>
      {firstColumn && <div className={classes.cardContainer}>{firstColumn}</div>}
      {stories.map((story, index) => (
        <Grow
          in={true}
          key={`story-${story._id}-${index}`}
          {...{ timeout: timeout ? timeout : 1500 * index < 2000 ? 400 * index : 2000 }}
        >
          <div className={classes.cardContainer}>
            <CardStory story={story} />
          </div>
        </Grow>
      ))}
    </div>
  )
}
