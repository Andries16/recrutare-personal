import { ThemeProvider, createTheme } from "@mui/material";
import JobProvider from "./context/jobContext";
import { GlobalStyle } from "./global/style";
import Routers from "./routes/index";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { themeOptions } from "./theme/themeOptions";

function App() {
  const theme = createTheme(themeOptions);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyle />
          <JobProvider>
            <Routers />
          </JobProvider>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
