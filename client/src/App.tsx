import React, { useEffect } from "react";
import Header from "./components/Header";
import { Box } from "@chakra-ui/core";
import useUserStore from "./store/User.store";

const App: React.FC = () => {
  const checkAuthStatus = useUserStore((state) => state.status);
  const error = useUserStore((state) => state.error);

  // Check if we have a valid session on initial page load.
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <Box>
      {error && (
        <Box backgroundColor="red.300" color="red.800" p={2} px={4}>
          {error}
        </Box>
      )}
      <Header />
    </Box>
  );
};

export default App;
