import { Grid, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { Link } from "components"

interface StoryPartOptions {
  story: Story
  index: number
  handleDelete: () => void
  isAuthor: boolean
}

export default function StoryPartActions({
  isAuthor,
  story,
  index,
  handleDelete,
}: StoryPartOptions) {
  const classes = useStyles()
  return isAuthor ? (
    <>
      <Grid item className={classes.bottomLink}>
        <Link
          href="/story/part/[id]/[part]"
          as={`/story/part/${story._id}/${index}`}
          underline="none"
        >
          Editar
        </Link>
      </Grid>
      {index > 0 && (
        <Grid item className={classes.bottomLink}>
          <a onClick={handleDelete} className={clsx(classes.link, classes.deletePartLink)}>
            Eliminar
          </a>
        </Grid>
      )}
    </>
  ) : null
}

const useStyles = makeStyles(theme => ({
  bottomLink: {
    marginRight: theme.spacing(2),
    fontSize: "1.2em",
  },
  link: {
    color: "#0984e3",
    cursor: "pointer",
    marginRight: 5,
  },
  deletePartLink: {
    color: theme.palette.red.main,
  },
}))
