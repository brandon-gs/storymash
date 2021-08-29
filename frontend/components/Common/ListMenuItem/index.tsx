import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from "@material-ui/core"
import React from "react"

export interface ListMenuItemProps {
  listItemIconClasses?: string
  Icon?: React.ReactElement
  primary?: string
  button?: true
}

export default function ListMenuItem<C extends React.ElementType>({
  Icon,
  primary = "",
  listItemIconClasses = "",
  ...props
}: MenuItemProps<C, { component?: C }> & ListMenuItemProps) {
  const CustomMenuItem = () => (
    <MenuItem {...props}>
      <ListItemIcon className={listItemIconClasses}>{Icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </MenuItem>
  )

  return !props.component ? (
    <CustomMenuItem />
  ) : (
    <li>
      <CustomMenuItem />
    </li>
  )
}
