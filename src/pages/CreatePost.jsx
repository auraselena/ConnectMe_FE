import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, IconButton, Image, Button, Container } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import Axios from "axios";
import { API_url } from "../helper";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [caption, setCaption] = React.useState("");
  const [postImg, setPostImg] = React.useState(null);

  const { username, pfp } = useSelector((state) => {
    return {
      username: state.usersReducer.username,
      pfp: state.usersReducer.pfp
    };
  });

  const buttonPost = () => {
    const formData = new FormData();
    formData.append("images", postImg); // ini harusnya
    formData.append("data", JSON.stringify({ caption, username, pfp }));
    Axios.post(API_url + `/content/addContent`, formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <Container>Create new post</Container> */}
      <div>
        {/* <div className="d-flex flex-row justify-content-center"> */}
        {/* <img src={img} style={{ width: 700 }} /> */}
        <div className="my-5 mx-5 px-5 text-start">
          {/* <div> */}
          <Text fontSize="xl" as="b"></Text>
        </div>
        <div className="mt-4 text-muted fw-bold text-start">
          <Text fontSize="md">Caption</Text>
          <Input placeholder="insert caption here..." size="md" onChange={(element) => setCaption(element.target.value)} />
        </div>
        {/* </div> */}
        <div className="mt-4 text-muted text-start fw-bold">
          <Text fontSize="md">Profile photo</Text>
          <InputGroup size="md">
            <Input type="file" placeholder="profile photo" onChange={(element) => setPostImg(element.target.files[0])} />
          </InputGroup>
        </div>
        {/* </div> */}
        <Button colorScheme="facebook" style={{ width: "15%", marginInline: "auto", marginBottom: 50, marginTop: 50 }} onClick={buttonPost}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
