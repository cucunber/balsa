import { VStack, Text, Avatar } from "@chakra-ui/react";
import { IPerson } from "entities/person/model";
import fallbackImage from "shared/assets/img/poster.jpg";

interface IPersonAvatar
  extends Pick<IPerson, "avatar" | "firstName" | "lastName"> {}

export const PersonAvatar = ({
  firstName,
  lastName,
  avatar,
}: IPersonAvatar) => (
  <VStack minW={"100px"} alignItems={"center"} spacing={2}>
    <Avatar src={avatar || fallbackImage} name={`${firstName} ${lastName}`} />
    <Text textAlign="center">
      {firstName} {lastName}
    </Text>
  </VStack>
);
