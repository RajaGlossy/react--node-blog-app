import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Blog from "./components/Blog";
import Layout from "./components/Layout";
import GetBlog from "./components/GetBlog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import BlogHome from "./components/BlogHome";
import BlogView from "./components/BlogView";

function App() {
  return (
    <div>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<BlogHome />} />
              <Route path="Login" element={<Login />} />
              <Route path="SignIn" element={<SignIn />} />
              <Route path="BlogView/:id" element={<BlogView />} />
              <Route path="createBlogs/:loginId" element={<Blog />} />
              <Route path="blogs" element={<GetBlog />} />
              <Route path="Login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
