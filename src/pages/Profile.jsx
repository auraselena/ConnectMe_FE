import React from "react";
// import img from "../assets/forms.png";
import { Text, Input, InputGroup, Button, InputRightElement, Container, Card, CardHeader, CardBody, CardFooter, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Axios from "axios";
import { API_url } from "../helper";

const Profile = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  // const [email, setEmail] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pfp, setPfp] = React.useState(null);

  const toast = useToast();
  const navigate = useNavigate()
  
  const buttonEdit = () => {
    let getLocalStorage = localStorage.getItem("socmed_login");
    const formData = new FormData();
    formData.append("images", pfp);
    formData.append("data", JSON.stringify({ username, fullname, bio, password }));
    Axios.patch(API_url + `/users/editProfile`, formData, {
      headers: {
        Authorization: `Bearer ${getLocalStorage}`,
      },
    })
      .then((response) => {
        toast({
          title: "Edit profile success!",
          description: "Your profile is now up to date.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/displayinfo")
        }, 2000);
      })
      .catch((err) => {
        toast({
          title: "Edit profile failed!",
          description: `${err.message}`,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload(false);
      });
  };

  return (
    <div id="coba" className="d-flex flex-column shadow-lg">
      <div className="mt-5 pt-5 d-flex flex-row justify-content-center">
        <Card marginY="8">
          <CardBody>
            <Text marginTop="4" fontSize="xl" as="b">
              Edit your profile
            </Text>
            <Text marginTop="8" fontSize="md">
              Username
            </Text>
            <Input placeholder="username" size="md" onChange={(element) => setUsername(element.target.value)} />
            <Text marginTop="4" fontSize="md">
              Password
            </Text>
            <InputGroup size="md">
              <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="password" onChange={(element) => setPassword(element.target.value)} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text marginTop="4" fontSize="md">
              Fullname
            </Text>
            <Input placeholder="fullname" size="md" onChange={(element) => setFullname(element.target.value)} />
            <Text marginTop="4" fontSize="md">
              Bio
            </Text>
            <Input placeholder="bio" size="md" onChange={(element) => setBio(element.target.value)} />
            <Text marginTop="4" fontSize="md">
              Profile photo
            </Text>
            <InputGroup size="md">
              <Input type="file" placeholder="profile photo" onChange={(element) => setPfp(element.target.files[0])} />
            </InputGroup>
            <Button colorScheme="facebook" marginTop="5" onClick={buttonEdit}>
              Save changes
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
