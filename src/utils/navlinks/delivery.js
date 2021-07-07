import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import StoreIcon from '@material-ui/icons/Store';
import ViewListIcon from '@material-ui/icons/ViewList';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const links = [
  {
    label: "Delivery dashboard",
    path: "/delivery",
    key: '@oye/delivery',
    menuItem: [
      {
        label: "Clients",
        path: "/clients",
        Icon: SupervisedUserCircleIcon
      },
      {
        label: "Hubs",
        path: "/hubs",
        Icon: StoreIcon
      },
      {
        label: "Rate cards",
        path: "/rate-cards",
        Icon: MonetizationOnIcon
      },
      {
        label: "Requirements",
        path: "/requirements",
        Icon: ViewListIcon
      },
      {
        label: "Client driver details",
        path: "/driver-details",
        Icon: AccountCircleIcon
      },
      {
        label: "Client transactions",
        path: "/client-transactions",
        Icon: AssignmentTurnedInIcon
      },
      {
        label: "Uploaded files",
        path: "/uploaded-files",
        Icon: InsertDriveFileIcon
      },
    ]
  },
];

export default links;
