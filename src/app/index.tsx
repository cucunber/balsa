import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "./index.css";
import { withRouter } from "./providers";
import { StoreContext, store } from "shared/store";
import { AppLayout } from "./layout";

import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

const App = withRouter(() => (
  <StoreContext.Provider value={store}>
    <AppLayout />
  </StoreContext.Provider>
));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
