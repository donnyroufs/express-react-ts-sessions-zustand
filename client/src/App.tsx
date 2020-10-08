import React, { useEffect } from "react";
import Header from "./components/Header";
import { Box } from "@chakra-ui/core";
import useUserStore from "./store/User.store";

const App: React.FC = () => {
  const checkAuthStatus = useUserStore((state) => state.status);

  // Check if we have a valid session on initial page load.
  useEffect(checkAuthStatus, []);

  return (
    <Box>
      <Header />
    </Box>
  );
};

export default App;
