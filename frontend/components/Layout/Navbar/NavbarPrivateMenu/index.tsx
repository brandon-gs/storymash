import { useState, KeyboardEvent } from "react"
// Components
import { Button, TextField, InputAdornment, IconButton } from "@material-ui/core"
import { Link, MenuTabs } from "components/"
// Icons
import SearchIcon from "@material-ui/icons/Search"
// Hooks
import { useSelector } from "react-redux"
import useStyles from "./styles"
import { useRouter } from "next/router"
import AvatarMenu from "./AvatarMenu"

export default function NavbarPrivateMenu(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  const { user } = useSelector(state => state.authentication)

  const { search: querySearch } = router.query

  const initialSearch: string = querySearch && !Array.isArray(querySearch) ? querySearch : ""

  const [search, setSearch] = useState<string>(initialSearch)

  const handleSearch = () => {
    if (search) {
      router.push({
        pathname: "/stories/",
        query: { search },
      })
    }
  }

  const handleOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      handleSearch()
    }
  }

  if (user) {
    return (
      <>
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
          placeholder="Buscar por título o contenido"
          className={classes.inputSearch}
          onKeyPress={handleOnKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton className={classes.iconSearch} onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <MenuTabs />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Button
            aria-label="create account for user"
            variant="contained"
            color="secondary"
            component={Link}
            href="/story/add"
            underline="none"
            className={classes.buttonCreate}
          >
            Crear historia
          </Button>
        </div>
        <AvatarMenu />
      </>
    )
  }
  return <></>
}
