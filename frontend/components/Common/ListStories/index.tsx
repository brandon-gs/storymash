// Components
import { Grid, Grow } from "@material-ui/core"
import { useWindowSize } from "hooks"
import { useEffect, useState } from "react"
import { CardStory } from "../../index"
// Hooks
import useStyles from "./styles"

interface ListStoriesProps {
  stories: Array<Story>
  redirect?: boolean
  timeout?: number
  columns?: number
  firstColumn?: React.ReactNode
}

export default function ShowStories({
  stories,
  timeout,
  columns,
  firstColumn,
  redirect = true,
}: ListStoriesProps) {
  const classes = useStyles()

  const [storyColumns, setStoryColumns] = useState<Story[][]>([])
  const [currentNCols, setCurrentNCols] = useState<number>(0)
  const [storiesLength, setStoriesLength] = useState<number>(stories.length)

  const { width } = useWindowSize()

  /* Create story ordered by columns ex: [[1, 5], [2], [3], [4]] */
  useEffect(() => {
    const nCols = columns ? columns : width <= 679 ? 1 : width <= 980 ? 2 : width <= 1280 ? 3 : 4
    if (nCols != currentNCols || stories.length !== storiesLength) {
      const fillStoryColumns: Story[][] = []
      for (let i = 0; i < nCols; i++) {
        fillStoryColumns.push([])
      }
      stories.forEach((s, i) => {
        // if has a first column add 1 to the index
        const idx = firstColumn && i < nCols ? i + 1 : i
        fillStoryColumns[idx % nCols].push(s)
      })
      setStoryColumns(fillStoryColumns)
      setCurrentNCols(nCols)
      setStoriesLength(stories.length)
    }
  }, [stories, width])

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      {storyColumns.map((column, idxCol) => (
        <Grid container item key={`story-column-${idxCol}`} className={classes.root}>
          {idxCol === 0 && firstColumn && (
            <Grid item className={classes.cardContainer}>
              {firstColumn}
            </Grid>
          )}
          {column.map((story, idxStory) => (
            <Grow
              in={true}
              key={`story-${story._id}-${idxStory}`}
              {...{ timeout: timeout ? timeout : 500 * idxStory < 2000 ? 400 * idxStory : 2000 }}
            >
              <Grid item className={classes.cardContainer}>
                <CardStory story={story} redirect={redirect} />
              </Grid>
            </Grow>
          ))}
        </Grid>
      ))}
    </Grid>
  )
}
