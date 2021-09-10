import { ChangeEvent, ReactNode } from "react"
// Components
import SwipeableViews from "react-swipeable-views"
import { AppBar, Tabs, Tab, Box } from "@material-ui/core"
import { Link } from "components"
// Icons
import { Home, Book, Favorite, WhatshotSharp, TrendingUp } from "@material-ui/icons"
// Hooks
import useStyles from "./styles"
import { useTheme } from "@material-ui/core/styles"
import { useRouter } from "next/router"
// Tabs
import { getMenuTabIndex, MenuRoutes, MenuTabsRoutesArray } from "utils/tabs"
import { useSelector } from "react-redux"

interface TabPanelProps {
  children?: ReactNode
  dir?: string
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  }
}

// Bottom menu
export default function FullWidthTabs(): JSX.Element {
  const { auth } = useSelector(state => state.authentication)
  const classes = useStyles()
  const theme = useTheme()
  const { pathname, push } = useRouter()

  const index = getMenuTabIndex(pathname)

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    push(MenuTabsRoutesArray[newValue])
  }

  const handleChangeIndex = (newIndex: number) => {
    push(MenuTabsRoutesArray[newIndex])
  }

  if (!auth) return <></>

  return (
    <>
      <AppBar component="footer" color="default" className={classes.stickToBottom}>
        <Tabs
          value={index}
          onChange={handleChange}
          indicatorColor="secondary"
          color={"primary"}
          textColor="secondary"
          aria-label="Tabs menu"
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab
            component={Link}
            href="/"
            icon={<Home />}
            {...a11yProps(MenuRoutes.HomeIndex)}
            className={classes.tab}
          />
          <Tab
            component={Link}
            href="/plank"
            icon={<Book />}
            {...a11yProps(MenuRoutes.PlankIndex)}
            className={classes.tab}
          />
          <Tab
            component={Link}
            href="/favorites"
            icon={<Favorite />}
            {...a11yProps(MenuRoutes.FavoriteIndex)}
            className={classes.tab}
          />
          <Tab
            component={Link}
            href="/rank"
            icon={<TrendingUp />}
            {...a11yProps(MenuRoutes.TrendingIndex)}
            className={classes.tab}
          />
          <Tab
            component={Link}
            href="/trending"
            icon={<WhatshotSharp />}
            {...a11yProps(MenuRoutes.RankIndex)}
            className={classes.tab}
          />
          <Tab {...a11yProps(5)} style={{ display: "none" }} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        className={classes.stickToBottom}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={index}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={index} index={0} dir={theme.direction}></TabPanel>
        <TabPanel value={index} index={1} dir={theme.direction}></TabPanel>
        <TabPanel value={index} index={2} dir={theme.direction}></TabPanel>
        <TabPanel value={index} index={3} dir={theme.direction}></TabPanel>
        <TabPanel value={index} index={4} dir={theme.direction}></TabPanel>
        <TabPanel value={index} index={5} dir={theme.direction}></TabPanel>
      </SwipeableViews>
    </>
  )
}
