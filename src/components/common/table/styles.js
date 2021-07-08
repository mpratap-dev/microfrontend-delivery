import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
  },
  tableContainer: {
    overflow: "auto",
  },
  table: {
    // minWidth: 650,
  },
  divider: {
    margin: "15px 0",
  },
  popover: {
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
    position: "absolute",
  },
  footer: {
    flexGrow: 1,
    padding: "0 15px",
    overflow: "hidden",
  },
  tableCell: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableScroll: {
    '& th, & td': {
      whiteSpace: "nowrap"
    }
  },
  stripRow: {
    '&:nth-child(4n-3)': {
      backgroundColor: '#FAFAFA'
    }
  },
  disableRow: {
    backgroundColor: '#EEE',
    '& td': {
      opacity: 0.4
    }
  }
}));

export default useStyles;