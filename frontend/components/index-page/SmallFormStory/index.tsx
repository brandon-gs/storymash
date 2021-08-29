import { useState } from "react"
// Components
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core"
// Redux
import { useDispatch, useSelector } from "react-redux"
import actions from "store/actions"
// Styles
import useStyles from "./styles"
import clsx from "clsx"

export default function SmallFormStory() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const {
    temp: { formStory },
  } = useSelector(state => state)

  const [story, setStory] = useState(formStory.story)
  const [storyPart, setStoryPart] = useState(formStory.storyPart)

  const handleChangeStory = (prop: string) => (event: OnChangeInputType) => {
    const { value } = event.target
    setStory({ ...story, [prop]: value })
  }

  const handleChangeStoryPart = (prop: string) => (event: OnChangeInputType) => {
    const { value } = event.target
    if (value.length <= 1500) {
      setStoryPart({ ...storyPart, [prop]: value })
    } else {
      const allowValue = value.substr(0, 1500)
      setStoryPart({ ...storyPart, [prop]: allowValue })
    }
  }

  const handleSubmit = () => {
    const data = {
      story,
      storyPart,
    }
    dispatch(actions.updateTempStory(data))
  }

  return (
    <div className={classes.form}>
      <Grid container spacing={0}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h4" className={classes.title}>
              Escribe tu historia
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              className={classes.input}
              label="Título"
              name="title"
              value={story.title}
              onChange={handleChangeStory("title")}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              className={classes.input}
              placeholder="Escribe el comienzo de tu historia aquí..."
              name="content"
              value={storyPart.content}
              onChange={handleChangeStoryPart("content")}
              variant="outlined"
              minRows={4}
              maxRows={5}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} className={clsx(classes.input, classes.characters)}>
            <Typography component="p" variant="body2">
              {storyPart.content.length}/1500
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Publicar historia
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}
