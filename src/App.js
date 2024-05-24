import { ThemeProvider, createTheme } from "@mui/material";
import JobProvider from "./context/jobContext";
import { GlobalStyle } from "./global/style";
import Routers from "./routes/index";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { themeOptions } from "./theme/themeOptions";

import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import { addDoc } from "firebase/firestore";
import TalentProvider from "./context/talentContext";
import { ModalProvider } from "./context/confirmationContext";
function App() {
  const theme = createTheme(themeOptions);
  const { setUser, setAuthorized } = useAuthContext();
  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const {
            docs: [userExist],
          } = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );
          if (userExist) {
            setUser(userExist.data());
            setAuthorized(true);
          } else {
            let { photoURL, displayName, email } = user;
            const userToSave = {
              photoURL,
              displayName,
              email,
              isCompleted: false,
              connects: 100,
            };
            await addDoc(collection(db, "users"), userToSave);
            console.log(email);
            setUser(userToSave);
            setAuthorized(true);
          }
        } else setUser(null);
      }),
    [setAuthorized, setUser]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyle />
          <JobProvider>
            <TalentProvider>
              <ModalProvider>
                <Routers />
              </ModalProvider>
            </TalentProvider>
          </JobProvider>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
