import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Editable,
  EditablePreview,
  EditableTextarea,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EditableControls from "./Editable";

function GetBlog() {
  const { state } = useLocation();

  console.log(state, "STATE");

  const [data, setData] = useState([]);
  const [newBlog, setnewBlog] = useState("");
  const [id, setId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginId, setLoginId] = useState();
  const cancelRef = React.useRef();

  const updateBlog = (id) => {
    if (id) {
      axios.put(`http://localhost:5000/update/${id}`, {
        blogContent: newBlog,
      });
      getBlog();
    }
  };

  const getBlog = async () => {
    try {
      const getBlogData = await axios.get("http://localhost:5000/read");
      setData(getBlogData.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    axios.delete(`http://localhost:5000/delete/${id}`);
    onClose();
    getBlog();
  };
  const deleteBlogModal = (id) => {
    onOpen();
    setId(id);
  };

  useEffect(() => {
    getBlog();
    setLoginId(state);
  }, []);

  return (
    <Container maxW="1xl" my="5">
      <Link to={`/createBlogs/${loginId}`}>
        <Button colorScheme="red" ml={3}>
          Create new Blog
        </Button>
      </Link>
      {data &&
        data.map((value, key) =>
          value.createdBy === loginId ? (
            <Box key={key} boxShadow="2xl" p="6" rounded="md" mt="3" bg="white">
              <Text fontSize="1xl" fontWeight="extrabold" textAlign="center">
                {value.blogTitle}
              </Text>
              <Text
                mt="3"
                fontSize="1xl"
                textAlign="center"
                fontWeight="extrabold"
              >
                Blog
              </Text>
              <Editable defaultValue={value.blogContent} textAlign="center">
                <EditablePreview />
                <EditableTextarea
                  onChange={(e) => setnewBlog(e.target.value)}
                />
                <EditableControls
                  onClick={() => updateBlog(value._id)}
                  deleteBlog={() => deleteBlogModal(value._id)}
                />
              </Editable>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={deleteBlog} ml={3}>
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          ) : (
            ""
          )
        )}
    </Container>
  );
}

export default GetBlog;
