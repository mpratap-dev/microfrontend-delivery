import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { NavLink } from 'react-router-dom';
import useStyles from './style';
import navLinks from '@oyerickshaw/common.utils.navlinks';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const classes = useStyles();
  const hideSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const menuItems = navLinks.find(dashboard => dashboard.label === 'Delivery dashboard').menuItem;

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
          {menuItems.map(({label, path}, index) => (
            <NavLink 
              key={label} 
              to={`/delivery${path}`} 
              activeClassName="selected"
              className={classes.navLinks}
            >
              <ListItem button>
                <ListItemIcon className={classes.listItem}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText 
                  primary={label} 
                  className={classes.listItem}
                  primaryTypographyProps={{
                    variant: 'button'
                  }}
                />
              </ListItem>
            </NavLink>
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
  )
}

export default Sidebar;
