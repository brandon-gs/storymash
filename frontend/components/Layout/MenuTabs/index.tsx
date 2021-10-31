// Components
import { Tab, Tabs } from "@material-ui/core"
// Icons
import { Book, Favorite, Home, TrendingUp } from "@material-ui/icons"
// Hooks
import useStyles from "./styles"
import { Link, SecondaryTooltip } from "components"
import { getMenuTabIndex, MenuTabsRoutes } from "utils/tabs"
import { useRouter } from "next/router"

// Desktop tabs
export default function CustomTabs() {
  const classes = useStyles()
  const { pathname } = useRouter()

  const index = getMenuTabIndex(pathname)

  return (
    <div className={classes.tabsContainer}>
      <Tabs
        value={index}
        onChange={() => null}
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Tabs menu"
        variant="fullWidth"
        className={classes.tabs}
      >
        <SecondaryTooltip arrow title="Inicio">
          <Tab
            component={Link}
            href="/"
            icon={<Home />}
            className={classes.tab}
            {...a11yProps(MenuTabsRoutes.HomeIndex)}
          />
        </SecondaryTooltip>
        <SecondaryTooltip arrow title="Tablón">
          <Tab
            component={Link}
            href="/plank"
            icon={<Book />}
            className={classes.tab}
            {...a11yProps(MenuTabsRoutes.PlankIndex)}
          />
        </SecondaryTooltip>
        <SecondaryTooltip arrow title="Favoritas">
          <Tab
            component={Link}
            href="/favorites"
            icon={<Favorite />}
            className={classes.tab}
            {...a11yProps(MenuTabsRoutes.FavoriteIndex)}
          />
        </SecondaryTooltip>
        <SecondaryTooltip arrow title="Ranking">
          <Tab
            component={Link}
            href="/rank"
            icon={<TrendingUp />}
            className={classes.tab}
            {...a11yProps(MenuTabsRoutes.RankIndex)}
          />
        </SecondaryTooltip>
        {/* <SecondaryTooltip arrow title="Tendencias">
          <Tab
            component={Link}
            href="/trending"
            icon={<WhatshotSharp />}
            className={classes.tab}
            {...a11yProps(MenuTabsRoutes.TrendingIndex)}
          />
        </SecondaryTooltip> */}
        <Tab style={{ display: "none" }} {...a11yProps(MenuTabsRoutes.TrendingIndex)} />
        <Tab style={{ display: "none" }} {...a11yProps(5)} />
      </Tabs>
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  }
}
