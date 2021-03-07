// Components
import { Grid, Grow, Typography } from "@material-ui/core"
import clsx from "clsx"
import { CardStory } from "../../index"
// Hooks
import useStyles from "./styles"

type Props = {
  stories: Array<Story>
  timeout?: number
  firstColumn?: React.ReactNode
  styles?: any
}

// export default function ShowStories({ stories, timeout, firstColumn }: Props) {
//   const classes = useStyles()
//   return (
//     <Grid container justify="center" spacing={2}>
//       {firstColumn && (
//         <Grid item className={classes.cardContainer}>
//           {firstColumn}
//         </Grid>
//       )}
//       {stories.map((story, index) => (
//         <Grow
//           in={true}
//           key={`story-${story._id}-${index}`}
//           {...{ timeout: timeout ? timeout : 1500 * index < 2000 ? 400 * index : 2000 }}
//         >
//           <Grid item className={classes.cardContainer}>
//             <CardStory story={story} />
//           </Grid>
//         </Grow>
//       ))}
//     </Grid>
//   )
// }

export default function ShowStories({ stories, timeout, firstColumn, styles = "" }: Props) {
  const classes = useStyles()
  return (
    <div className={styles.container ? styles.container : "list_stories--container"}>
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
