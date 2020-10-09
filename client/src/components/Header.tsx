import React from "react";
import { Box, Stack, Button, ButtonGroup, Text } from "@chakra-ui/core";
import shallow from "zustand/shallow";
import useUserStore from "../store/User.store";

const dummyUser: User = {
  username: "admin",
  password: "admin",
};

interface IHeaderProps {}

const mapUserStateToProps = (state: UserState) => ({
  user: state.user,
  login: state.login,
  logout: state.logout,
  isAuthenticated: state.isAuthenticated(),
});

const Header: React.FC<IHeaderProps> = () => {
  const { user, login, logout, isAuthenticated } = useUserStore(
    mapUserStateToProps,
    shallow
  );

  return (
    <Box
      as="header"
      padding="4"
      display="flex"
      justifyContent="space-between"
      backgroundColor="gray.200"
    >
      <Stack isInline spacing={8} align="center" flex="1" justify="flex-end">
        {isAuthenticated && (
          <Box>
            <Text as="h2">
              Hello,
              <Text as="strong"> {user!.username}</Text>
            </Text>
          </Box>
        )}
        <ButtonGroup>
          {!isAuthenticated && (
            <Button onClick={(e) => login(e, dummyUser)}>login</Button>
          )}
          {isAuthenticated && <Button onClick={logout}>Logout</Button>}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default Header;
