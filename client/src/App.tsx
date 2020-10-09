import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Box, Button } from "@chakra-ui/core";
import useUserStore from "./store/User.store";
import makeRequest from "./utils/makeRequest";

const App: React.FC = () => {
  const [response, setResponse] = useState({});
  const checkAuthStatus = useUserStore((state) => state.status);

  // Check if we have a valid session on initial page load.
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <Box>
      <Header />
      <Button onClick={() => makeRequest("/protected", { method: "POST" })}>
        Test csrf
      </Button>
    </Box>
  );
};

export default App;
