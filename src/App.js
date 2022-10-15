import Router from "./routes";
import {createTheme, ThemeProvider,} from "@mui/material";


// Set color themes
const theme = createTheme({
    palette: {
        primary: {
            main: '#586A57'
        },
        secondary: {
            main: '#91C14B'
        }
    }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
  );
}

export default App;
