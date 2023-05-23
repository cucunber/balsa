import { Box, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

const FallbackPage = () => (
  <Box
    sx={{
      w: "100vw",
      h: "100vh",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Spinner />
  </Box>
);

export const withRouter =
  <T extends () => React.ReactNode>(component: T) =>
  () =>
    (
      <BrowserRouter>
        <Suspense fallback={<FallbackPage />}>{component()}</Suspense>
      </BrowserRouter>
    );
