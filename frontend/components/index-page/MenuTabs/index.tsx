// Types and helpers
import { ChangeEvent } from "react"
import actions from "../../../store/actions/"
// Components
import { Tab, Tabs } from "@material-ui/core"
// Icons
import { Book, Favorite, Home, TrendingUp, WhatshotSharp } from "@material-ui/icons"
// Hooks
import { useSelector, useDispatch } from "react-redux"
import useStyles from "./styles"
import { useRouter } from "next/router"
import { route } from "next/dist/next-server/server/router"

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  }
}

export default function CustomTabs() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const { indexTab } = useSelector(state => state.tabs)

  function handleChange(event: ChangeEvent<unknown>, newValue: number) {
    dispatch(actions.updateIndexTab(newValue))
  }

  if (router.pathname === "/") {
    return (
      <div className={classes.tabsContainer}>
        <Tabs
          value={indexTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="Tabs menu"
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab icon={<Home />} className={classes.tab} {...a11yProps(0)} />
          <Tab icon={<Book />} className={classes.tab} {...a11yProps(1)} />
          <Tab icon={<Favorite />} className={classes.tab} {...a11yProps(2)} />
          <Tab icon={<TrendingUp />} className={classes.tab} {...a11yProps(3)} />
          <Tab icon={<WhatshotSharp />} className={classes.tab} {...a11yProps(4)} />
        </Tabs>
      </div>
    )
  }
  return null
}
