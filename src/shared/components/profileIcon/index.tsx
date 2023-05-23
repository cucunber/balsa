import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getLinkPath } from "shared/constants/routes";
import { IProfileIcon } from "./type";

export const ProfileAvatar = ({ username, id }: IProfileIcon) => {
  const profileLink = getLinkPath("profile.path", { id });
  return (
    <Link to={profileLink}>
      <Avatar
        sx={{
          transition: '0.25s ease-in-out',
          _hover: {
            transform: 'translateY(-3px)',
            boxShadow: "0px 6px 5px 0px rgba(34, 60, 80, 0.4);",
          },
        }}
        size="sm"
        name={username}
      />
    </Link>
  );
};
