import { ChangeEvent, ReactNode } from "react"
// Components
import SwipeableViews from "react-swipeable-views"
import { AllStories, FavoritesStories } from "../../index"
import { AppBar, Tabs, Tab, Box, Container } from "@material-ui/core"
// Icons
import { Home, Book, Favorite, WhatshotSharp, TrendingUp } from "@material-ui/icons"
// Hooks
import useStyles from "./styles"
import { useTheme } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../../store/actions"

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

export default function FullWidthTabs(): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { indexTab } = useSelector(state => state.tabs)

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    dispatch(actions.updateIndexTab(newValue))
  }

  const handleChangeIndex = (index: number) => {
    dispatch(actions.updateIndexTab(index))
  }

  return (
    <>
      <>
        <AppBar color="default" className={classes.stickToBottom}>
          <Tabs
            value={indexTab}
            onChange={handleChange}
            indicatorColor="secondary"
            color={"primary"}
            textColor="secondary"
            aria-label="Tabs menu"
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab icon={<Home />} {...a11yProps(0)} className={classes.tab} />
            <Tab icon={<Book />} {...a11yProps(1)} className={classes.tab} />
            <Tab icon={<Favorite />} {...a11yProps(2)} className={classes.tab} />
            <Tab icon={<TrendingUp />} {...a11yProps(3)} className={classes.tab} />
            <Tab icon={<WhatshotSharp />} {...a11yProps(4)} className={classes.tab} />
          </Tabs>
        </AppBar>
      </>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={indexTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={indexTab} index={0} dir={theme.direction}>
          <AllStories />
        </TabPanel>
        <TabPanel value={indexTab} index={1} dir={theme.direction}>
          Mi tablón
        </TabPanel>
        <TabPanel value={indexTab} index={2} dir={theme.direction}>
          <FavoritesStories />
        </TabPanel>
        <TabPanel value={indexTab} index={3} dir={theme.direction}>
          Ranking
        </TabPanel>
        <TabPanel value={indexTab} index={4} dir={theme.direction}>
          Tendencias
        </TabPanel>
      </SwipeableViews>
    </>
  )
}
