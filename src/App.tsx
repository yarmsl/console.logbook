import { ReactElement, useEffect, useMemo } from "react";
import { useRoutes } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./UI/theme";
import { useAppSelector, useAppDispatch } from "./store";
import { logout, useCheckAuthQuery } from "./store/Auth";
import { setUser } from "./store/User";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((st) => st.auth);
  const id = useAppSelector((st) => st.user.id);
  const routes = useRoutes(isAuth);
  const skipQuery = useMemo(() => !token || !!id, [token, id]);
  const { data, isError } = useCheckAuthQuery("", { skip: skipQuery });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
    if (isError) {
      dispatch(logout())
    }
  }, [data, dispatch, isError]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout>{routes}</MainLayout>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
