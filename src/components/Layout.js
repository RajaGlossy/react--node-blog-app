import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        {/* <GridItem colSpan={1}>
          <Image src="./images/1.png" alt="logo"></Image>
          <Link to="/Login">
            <Button colorScheme="teal" variant="outline">
              Login
            </Button>
          </Link>
          <Link to="/SignIn">
            <Button colorScheme="teal" variant="outline">
              Sign In
            </Button>
          </Link>
        </GridItem> */}
        <GridItem colSpan={6}>
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
