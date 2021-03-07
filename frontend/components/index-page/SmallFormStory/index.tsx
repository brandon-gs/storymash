import { useState } from "react"
// Components
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core"
// Styles
import useStyles from "./styles"
import clsx from "clsx"

export default function SmallFormStory() {
  const classes = useStyles()

  const [story, setStory] = useState({ title: "" })
  const [storyPart, setStoryPart] = useState({ content: "" })

  const handleChangeStory = (prop: string) => (event: OnChangeInputType) => {
    const { value } = event.target
    setStory({ ...story, [prop]: value })
  }

  const handleChangeStoryPart = (prop: string) => (event: OnChangeInputType) => {
    const { value } = event.target
    setStoryPart({ ...storyPart, [prop]: value })
  }

  // TODO: Store this on redux as a storyTemp and redirect to add story page
  const handleSubmit = () => ({})

  const currentChars = 0

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
              autoFocus
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
              rows={4}
              rowsMax={5}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} className={clsx(classes.input, classes.characters)}>
            <Typography component="p" variant="body2">
              {currentChars}/1500
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
