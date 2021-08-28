import React from "react"
import { Grid, Typography } from "@material-ui/core"
import customScroll from "utils/scroll"
import { makeStyles } from "@material-ui/core"

interface StoryPartListProps {
  parts: StoryPart[]
}

export default function StoryPartList({ parts }: StoryPartListProps) {
  const classes = useStyles()

  if (parts.length <= 1) return null

  return (
    <Grid item>
      <Typography component="p" variant="body2">
        <span style={{ fontWeight: "bold" }}>Partes </span>
        {parts.map(
          (part, index) =>
            index + 1 > 1 && (
              <a
                key={`link-part-id-${part._id}`}
                onClick={() => customScroll(`part-${index}`)}
                className={classes.link}
              >
                #{index + 1}
              </a>
            )
        )}
      </Typography>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  link: {
    color: "#0984e3",
    cursor: "pointer",
    marginRight: 5,
  },
}))
