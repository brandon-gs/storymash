import { Avatar, ClickAwayListener, Grow, MenuList, Paper, Popper } from "@material-ui/core"
import { Link, ListMenuItem } from "components"
import useStyles from "./styles"
import { useSelector, useDispatch } from "react-redux"
import actions from "store/actions"
import { AccountCircle, AddCircle, Help, ExitToApp } from "@material-ui/icons"
import useListMenu from "hooks/useListMenu"
import clsx from "clsx"

interface AvatarMenuProps {}

export default function AvatarMenu({}: AvatarMenuProps): JSX.Element {
  const { user } = useSelector(state => state.authentication)
  const dispatch = useDispatch()
  const classes = useStyles()

  const { open, anchorRef, handleToggle, handleClose, handleListKeyDown } =
    useListMenu<HTMLDivElement>()

  if (!user) return <></>

  const logOut = () => {
    handleToggle()
    dispatch(actions.deauthenticate())
  }

  const menuItems = [
    {
      component: Link,
      href: `/profile/${user.username}`,
      Icon: <AccountCircle className={classes.icon} />,
      primary: "Tu perfil",
    },
    {
      component: Link,
      href: "/story/add",
      Icon: <AddCircle className={classes.icon} />,
      primary: "Crear historia",
      className: clsx(classes.menuItem, classes.onlyMobile),
    },
    {
      component: Link,
      href: "/help",
      Icon: <Help className={classes.icon} />,
      primary: "Ayuda",
    },
    {
      onClick: logOut,
      Icon: <ExitToApp className={classes.icon} />,
      primary: "Salir",
    },
  ]

  return (
    <>
      <Avatar
        alt="mostrar mas"
        color="inherit"
        className={classes.avatar}
        src={user.image}
        ref={anchorRef}
        onClick={handleToggle}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="left-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper className={classes.menu}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={false} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {menuItems.map((props, index) => (
                    <ListMenuItem
                      key={`avatar-appbar-menu-item-${index}`}
                      onClick={handleClose}
                      className={classes.menuItem}
                      listItemIconClasses={classes.listIcon}
                      {...props}
                    />
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
