import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ProfileHeader } from "widgets/profileHeader/ui";

export const Header = () => {
  return (
    <HStack spacing={2} alignItems={"center"}>
      <Heading as={Link} to="/" flexGrow={1} flexBasis="auto" color="white">
        <Text as="span" color="blue.800">Ticket</Text>
        <Text as="span" color="red.700">
          Buy
        </Text>
      </Heading>
      <Box flexShrink={0}>
        <ProfileHeader />
      </Box>
    </HStack>
  );
};
