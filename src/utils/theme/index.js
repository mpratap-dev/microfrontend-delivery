import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const globalTheme = createMuiTheme({
  palette: {
    primary: { main: purple[900] },
    default: { main: '#f5f5f5' },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: ['"Nunito"', 'Open Sans'].join(','),
    button: {
      textTransform: "none"
    }
  }
});

export default globalTheme;
