
import { CssBaseline, ThemeProvider } from "@mui/material";
import HeaderComponent from "./layouts/component/HeaderComponent";
import SideBarComonent from "./layouts/component/SideBar/SideBarComonent";
import RouterApp from "./router/router";
import type { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createAppTheme } from "./theme";

function App() {
   const setmode = useSelector(
    (state: RootState) => state.darkmode.setmode
  );

  const theme = useMemo(
    () => createAppTheme(setmode),
    [setmode]
  );
  return (

        <ThemeProvider theme={theme}>
              <CssBaseline/>
    <div className="admin-layout">
      <HeaderComponent />
      <SideBarComonent />
      <main
        className="content-area"
        style={{
          position: "absolute",
          top: "64px",
          right: 0,
          width: "75%",
          height: "calc(100vh - 64px)",
          overflowY: "auto",
          padding: "20px",
          overflowX:"hidden"
        }}
      >
        <RouterApp />
      </main>
    </div>
     </ThemeProvider>
  );
}

export default App;
