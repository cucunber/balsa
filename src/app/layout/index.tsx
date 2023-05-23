import { Grid, GridItem } from "@chakra-ui/react";
import { Header } from "app/ui/header";
import { useGetGlobalGenres } from "entities/genre/hooks";
import { useProfile } from "entities/user/api/useProfile";
import { User } from "entities/user/model";
import { useAuth } from "features/auth/process";
import { observer } from "mobx-react-lite";
import { Routing } from "pages";
import { useEffect } from "react";
import { authKeys } from "shared/constants/localStorage";
import { useMst } from "shared/hooks/useMst";

const useAuthUser = () => {
  const { authByToken } = useAuth();
  const { getMe } = useProfile();
  const state = useMst((state) => state);
  useEffect(() => {
    const auth = async () => {
      const result = await authByToken();
      if ("error" in result) {
        return;
      }
      const [meError, data] = await getMe();
      if (meError) {
        return;
      }
      state.updateUser(
        User.create({
          ...data,
          access: localStorage.getItem(authKeys.accessToken),
          refresh: result.token,
        })
      );
    };
    auth();
  }, [authByToken, getMe, state]);
};

const Main = observer(() => {
  useGetGlobalGenres();
  useAuthUser();
  return <Routing />;
});

export const AppLayout = () => {
  return (
    <Grid
      templateAreas={`"header"
        "main"`}
      gridTemplateRows={"auto 1fr"}
      width="100vw"
      height="100vh"
      overflow="hidden"
    >
      <GridItem p="2" bg="blue.100" area={"header"}>
        <Header />
      </GridItem>
      <GridItem overflowX="hidden" overflowY="auto" area={"main"}>
        <Main />
      </GridItem>
    </Grid>
  );
};
