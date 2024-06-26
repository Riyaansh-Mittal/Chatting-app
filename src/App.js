// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import React from "react";
import MuiAlert from "@mui/material/Alert";
import ThemeSettings from "./components/settings";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/slices/app";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function App() {
  const { severity, message, open } = useSelector(
    (state) => state.app.snackbar
  );
  const dispatch = useDispatch();
  return (
    <>
      {" "}
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackbar());
          }}
        >
          <Alert
            onClose={() => {}}
            severity={severity} // has 4 options: success, warning, error or info
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
