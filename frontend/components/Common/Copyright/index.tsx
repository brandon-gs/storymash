import { Typography } from "@material-ui/core"
import { Link } from "../../index"

export default function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://brandongs.herokuapp.com/">
        BrandonGS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
