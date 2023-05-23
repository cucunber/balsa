import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ComponentProps } from "react";

type ILink = Omit<ComponentProps<typeof ChakraLink>, "as"> &
  ComponentProps<typeof RouterLink>;

export const Link = (properties: ILink) => (
  <ChakraLink as={RouterLink} {...properties} />
);
