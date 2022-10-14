import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignInForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/signin", values)
        .then((res) => {
          res.data.success === true &&
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          console.log(res.data);
          navigate("/Login");
        })
        .catch((res) => {
          console.log(res);
          !res.response.data.success &&
            toast({
              title: "Error.",
              description: "Email Already Exist",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box w={{ base: "100%", md: "70%" }}>
        <Input
          type="text"
          placeholder="Name"
          borderRadius="none"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Input
          placeholder="Email"
          mt="3"
          id="email"
          name="email"
          type="email"
          borderRadius="none"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text color="red">{formik.errors.email}</Text>
        ) : null}
        <InputGroup mt="3">
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
        {formik.touched.password && formik.errors.password ? (
          <Text color="red">{formik.errors.password}</Text>
        ) : null}
        <Button
          colorScheme="teal"
          size="lg"
          borderRadius="50px"
          w="100%"
          type="submit"
          my="5"
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default SignInForm;
