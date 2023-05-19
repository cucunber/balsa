import { Box } from "@chakra-ui/layout";
import { Auth } from "widgets/auth/ui/form";

const TestPage = () => {
  return (
    <Box sx={{ w: "100%", h: "100%", display: "grid", placeItems: "center" }}>
      <Auth />
    </Box>
  );
};

export default TestPage;
