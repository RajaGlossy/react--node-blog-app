import { Container, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogView() {
  const { id } = useParams();

  const [data, setData] = useState({});
  console.log(data);

  const getBlog = async () => {
    try {
      const getBlogData = await axios.get(`http://localhost:5000/read/${id}`);
      setData(getBlogData.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Container my="10">
        <Text fontSize="30px" fontWeight="bold" textAlign="center" mb="5">
          {data.blogTitle}
        </Text>
        <Text
          textAlign="center"
          fontSize="1rem"
          fontWeight="300"
          lineHeight="1.75"
        >
          {data.blogContent}
        </Text>
      </Container>
    </>
  );
}

export default BlogView;
