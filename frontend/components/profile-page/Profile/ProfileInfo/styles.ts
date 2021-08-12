import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    marginTop: theme.spacing(3),
    minWidth: 366,
  },
  itemAbout: {
    position: "relative",
    top: -20,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  imageProfile: {
    width: 150,
    height: 150,
    maxWidth: 150,
    maxHeight: 150,
  },
  buttonChangeImage: {
    marginTop: theme.spacing(1),
    maxWidth: 150,
  },
  username: {
    display: "flex",
    margin: 0,
    marginBottom: theme.spacing(1),
    fontSize: "2.5em",
  },
  iconHeart: {
    color: theme.palette.pink.light,
  },
  spaceButtonFollow: {
    height: 60,
  },
  followersContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  iconFollowers: {
    marginRight: 4,
  },
  borderBottom: {
    maxWidth: 600,
    display: "flex",
    margin: "0 auto",
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
}))
