import { Container, Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <Container
      maxW={{ base: "md", md: "1400px" }}
      px={{ base: "1.5rem", md: "3rem" }}
    >
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem my="auto">
          <LoginForm />
        </GridItem>
        <GridItem>
          <Image src="../images/19197307.jpg" alt="Dan Abramov" />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Login;
