import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import { withProviders } from "./providers";
import { Routing } from "pages";

const App = withProviders(function App() {
  return <Routing />;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
