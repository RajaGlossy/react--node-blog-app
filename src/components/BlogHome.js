import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

function BlogHome() {
  const [data, setData] = useState([]);
  const getEmail = localStorage.getItem("email");
  const getPassword = localStorage.getItem("password");
  console.log(getEmail, getPassword);

  const getBlog = async () => {
    try {
      const getBlogData = await axios.get("http://localhost:5000/read");
      setData(getBlogData.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        align="center"
        pos="relative"
        justify="center"
        bg="blackAlpha.700"
        position="sticky"
      >
        hello
      </Flex>
      <Box>
        <Image src="../images/blog-banner.jpg" alt="Dan Abramov" />
      </Box>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />

                  <MenuItem>Your Blog</MenuItem>
                  {getEmail && getPassword ? (
                    <MenuItem>Logout</MenuItem>
                  ) : (
                    <MenuItem>
                      <Link to="/Login">Login</Link>
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Container maxW="1xl" my="10" px="10rem" justifyContent="center">
        <Grid templateColumns="repeat(6, 1fr)" gap={5}>
          {data.map((value, i) => {
            // return value.blogImage.map((image) => {
            return (
              <GridItem colSpan={2} key={i}>
                <Link to={"/BlogView/" + value._id}>
                  <BlogCard title={value.blogTitle} blog={value.blogContent} />
                </Link>
              </GridItem>
            );
            // });
          })}
        </Grid>
      </Container>
    </>
  );
}

export default BlogHome;
