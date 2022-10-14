import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
  const [file, setFile] = useState([]);
  console.log(file);

  const { loginId } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      blog: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:5000/insert", {
          blog: values.blog,
          title: values.title,
          loginId: loginId,
          image: file,
        })
        .then((res) => console.log(res));
      navigate("/blogs", { state: loginId });
    },
  });

  const onDrop = (acceptedFiles) => {
    let image = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    for (let i = 0; i < image.length; i++) {
      setFile(image[i].preview);
    }
  };

  return (
    <Container my="5">
      <form onSubmit={formik.handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Title"
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </FormControl>
        <Text my="3">Blog: </Text>
        <Textarea
          id="blog"
          name="blog"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.blog}
          placeholder="Type your blog here"
          size="sm"
        />
        <Dropzone
          useFsAccessApi={false}
          onDrop={onDrop}
          accept={{
            "image/jpeg": [".jpeg", ".png", ".jpg"],
            "video/mp4": [".mp4"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Flex
              align="center"
              justify="center"
              {...getRootProps()}
              border="1px"
              borderRadius="md"
              borderColor="blue.300"
              borderStyle="dashed"
              bg="white"
              height="10em"
              cursor="pointer"
              maxW="16em"
            >
              <input {...getInputProps()} />
              <Stack align="center" justifyContent="center">
                <Text mx="2" textAlign="center">
                  Drag and drop OR Click here to Upload a file
                </Text>
              </Stack>
            </Flex>
          )}
        </Dropzone>
        <Button colorScheme="blue" mt="5" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Blog;
