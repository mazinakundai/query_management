// src/components/Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, useMediaQuery } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import ReportIcon from '@mui/icons-material/Assessment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SurveyIcon from '@mui/icons-material/Assignment';
import DocumentIcon from '@mui/icons-material/Description';
import QueryInboxIcon from '@mui/icons-material/Inbox';
import LeaveIcon from '@mui/icons-material/Event';
import EmployeeIcon from '@mui/icons-material/Group';
import WageAccessIcon from '@mui/icons-material/AttachMoney';
import HelpCenterIcon from '@mui/icons-material/HelpOutline';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';

const Sidebar = () => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return !isSmallScreen && (
    <Box sx={{ width: 250, paddingRight: '16px', borderRight: '2px solid #ccc' }}>
      <List>
        <ListItem>
          <img src="/path/to/jem-logo.png" alt="Jem Logo" style={{ width: '50px' }} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Reporting" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SurveyIcon />
          </ListItemIcon>
          <ListItemText primary="Surveys" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DocumentIcon />
          </ListItemIcon>
          <ListItemText primary="My Documents" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <QueryInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Query Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LeaveIcon />
          </ListItemIcon>
          <ListItemText primary="Leave" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <EmployeeIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <WageAccessIcon />
          </ListItemIcon>
          <ListItemText primary="Earned Wage Access" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <HelpCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Help Centre" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Brightness6OutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Coming Soon!" />
          <Typography variant="caption" color="secondary" style={{ marginLeft: '10px' }}>
            NEW
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
