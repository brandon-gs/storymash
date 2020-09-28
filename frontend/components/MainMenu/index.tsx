import React, { useState } from "react"
// Components
import SwipeableViews from "react-swipeable-views"
import { AppBar, Tabs, Tab, Typography, Box, Container } from "@material-ui/core"
// Icons
import { Home, Book, Favorite, WhatshotSharp, TrendingUp } from "@material-ui/icons"
// Hooks
import useStyles from "./styles"
import { useTheme } from "@material-ui/core/styles"

interface TabPanelProps {
  children?: React.ReactNode
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="Tabs menu"
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab label="Inicio" icon={<Home />} {...a11yProps(0)} />
            <Tab label="Mi tablón" icon={<Book />} {...a11yProps(1)} />
            <Tab label="Mis Favoritas" icon={<Favorite />} {...a11yProps(3)} />
            <Tab label="Ranking" icon={<TrendingUp />} {...a11yProps(2)} />
            <Tab label="Tendencias" icon={<WhatshotSharp />} {...a11yProps(4)} />
          </Tabs>
        </AppBar>
      </Container>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Todas las historias
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Mi tablón
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Mis favoritas
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Ranking
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Tendencias
        </TabPanel>
      </SwipeableViews>
    </>
  )
}
