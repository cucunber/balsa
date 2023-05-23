import { Box } from "@chakra-ui/layout";
import { Register } from "widgets/register/ui/form";

const RegisterPage = () => {
  return (
    <Box sx={{ w: "100%", h: "100%", display: "grid", placeItems: "center" }}>
      <Register/>
    </Box>
  );
};

export default RegisterPage;