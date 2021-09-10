import { alpha, Tooltip, withStyles } from "@material-ui/core"

const TabTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: alpha(theme.palette.secondary.main, 0.9),
    color: theme.palette.primary.contrastText,
    maxWidth: 220,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
  },
  arrow: {
    color: alpha(theme.palette.secondary.main, 0.9),
  },
}))(Tooltip)

export default TabTooltip
