import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  console.log(userData);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    const getSignInData = async () => {
      try {
        const SignInData = await axios.get("http://localhost:5000/signInData");
        setUserData(SignInData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSignInData();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      userData.map((value) => {
        if (
          value.email === values.email &&
          value.password === values.password
        ) {
          localStorage.setItem("email", value.email);
          localStorage.setItem("password", value.password);
          navigate("/blogs", { state: value._id });
          return console.log("email correct");
        } else {
          return console.log("error");
        }
      });
    },
  });

  return (
    <Box>
      <Text
        fontSize={{ base: "2xl", md: "5xl" }}
        fontWeight="bold"
        color="green.700"
        lineHeight={{ base: "2rem", md: "3.4rem" }}
        mt="4"
      >
        Welcome to Your
      </Text>
      <Text
        fontSize={{ base: "2xl", md: "5xl" }}
        fontWeight="bold"
        color="green.700"
        lineHeight={{ base: "2rem", md: "3.4rem" }}
      >
        Proffessional community
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Box w={{ base: "100%", md: "70%" }}>
          <Input
            placeholder="Email"
            my="3"
            id="email"
            name="email"
            type="email"
            borderRadius="none"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="password"
              borderRadius="none"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                bg="white"
                _active={{ bg: "white" }}
                _hover={{ bg: "white" }}
              >
                {show ? (
                  <BsFillEyeFill fontSize="1rem" />
                ) : (
                  <BsFillEyeSlashFill fontSize="1rem" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box my="4">{/* <Link color="gray">Forgot password?</Link> */}</Box>
          <Button
            colorScheme="teal"
            size="lg"
            borderRadius="50px"
            w="100%"
            type="submit"
          >
            Login
          </Button>

          <Flex my="5" alignItems="center">
            <Divider orientation="horizontal" borderBottomWidth="2px" />
            <Text px="5">or</Text>
            <Divider orientation="horizontal" borderBottomWidth="2px" />
          </Flex>
          <Link to="/SignIn">
            <Button colorScheme="teal" size="lg" borderRadius="50px" w="100%">
              Sign In
            </Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
