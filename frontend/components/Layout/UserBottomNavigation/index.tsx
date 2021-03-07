import { BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import { Home, Book, Favorite } from "@material-ui/icons"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useStyles from "./styles"

export default function UserBottomNavigation() {
  const classes = useStyles()
  const router = useRouter()

  const { auth } = useSelector(state => state.authentication)

  const [value, setValue] = useState(router.pathname)
  const handleChangeValue = (_: React.ChangeEvent<{}>, newValue: string) => {
    router.push(newValue)
  }
  const getClass = (page: string) => {
    return page === router.pathname ? classes.itemActive : classes.item
  }

  useEffect(() => {
    setValue(router.pathname)
  }, [])

  if (auth) {
    return (
      <BottomNavigation
        value={value}
        onChange={handleChangeValue}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          className={getClass("/")}
          label="Inicio"
          value="/"
          icon={<Home />}
        />
        <BottomNavigationAction
          className={getClass("/dashboard")}
          label="Tablon"
          value="/dashboard"
          icon={<Book />}
        />
        <BottomNavigationAction
          className={getClass("/favorites")}
          label="Favoritas"
          value="/favorites"
          icon={<Favorite />}
        />
      </BottomNavigation>
    )
  }
  return null
}
