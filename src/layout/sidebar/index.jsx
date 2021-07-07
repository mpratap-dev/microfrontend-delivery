import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { NavLink } from "react-router-dom";
import useStyles from "./style";
import navLinks from "@oyerickshaw/common.utils.navlinks";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

const Sidebar = ({ appName }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [disableHoverListener, setDisableHoverListener] = useState(false);
  const classes = useStyles();
  const hideSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const menuItems = navLinks.find(
    (dashboard) => dashboard.key === appName
  ).menuItem;

  useEffect(() => {
    setDisableHoverListener(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <>
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        onClose={hideSidebar}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpen,
          [classes.drawerClose]: !isSidebarOpen,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: isSidebarOpen,
            [classes.drawerClose]: !isSidebarOpen,
          }),
        }}
      >
        <List>
          {menuItems.map(({ label, path, Icon }) => (
            <Tooltip
              key={label}
              title={label}
              placement="right"
              arrow
              disableFocusListener
              disableHoverListener={disableHoverListener}
              disableTouchListener
            >
              <NavLink
                to={`/delivery${path}`}
                activeClassName="selected"
                className={classes.navLinks}
              >
                <ListItem button>
                  <ListItemIcon className={classes.listItem}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    className={classes.listItem}
                    primaryTypographyProps={{
                      variant: "button",
                    }}
                  />
                </ListItem>
              </NavLink>
            </Tooltip>
          ))}
        </List>
        <Button
          fullWidth
          size="large"
          disableRipple
          onClick={toggleSidebar}
          className={`${classes.listItem} ${classes.hamburger}`}
        >
          {isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </Button>
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default Sidebar;
