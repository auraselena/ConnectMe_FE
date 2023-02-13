import React from "react";
// import img from "../assets/forms.png";
import { Text, Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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

  const buttonEdit = () => {
    let getLocalStorage = localStorage.getItem("socmed_login");
    console.log(getLocalStorage);
    const formData = new FormData();
    formData.append("images", pfp);
    formData.append("data", JSON.stringify({ username, fullname, bio, password }));
    Axios.patch(API_url + `/users/editProfile`, formData, {
      headers: {
        Authorization: `Bearer ${getLocalStorage}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-column shadow-lg">
      <div className="d-flex flex-row justify-content-center">
        {/* <img src={img} style={{ width: 700 }} /> */}
        <div className="my-5 mx-5 px-5 text-start">
          <div>
            <Text fontSize="xl" as="b">
              Edit your profile
            </Text>
          </div>
          <div className="mt-4 text-muted fw-bold text-start">
            <Text fontSize="md">Username</Text>
            <Input placeholder="username" size="md" onChange={(element) => setUsername(element.target.value)} />
          </div>
          {/* <div className="mt-4 text-muted fw-bold text-start">
            <Text fontSize="md">E-mail</Text>
            <Input placeholder="e-mail" size="md" onChange={(element) => setEmail(element.target.value)} />
          </div> */}
          <div className="mt-4 text-muted fw-bold text-start">
            <Text fontSize="md">Password</Text>
            <InputGroup size="md">
              <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="password" onChange={(element) => setPassword(element.target.value)} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
        </div>
        <div className="my-5 mx-5 px-5">
          <div className="mt-5 pt-5 text-muted fw-bold text-start">
            <Text fontSize="md">Fullname</Text>
            <Input placeholder="fullname" size="md" onChange={(element) => setFullname(element.target.value)} />
          </div>
          <div>
            <div className="mt-4 text-muted fw-bold text-start">
              <Text fontSize="md">Bio</Text>
              <Input placeholder="bio" size="md" onChange={(element) => setBio(element.target.value)} />
            </div>
            <div className="mt-4 text-muted text-start fw-bold">
              <Text fontSize="md">Profile photo</Text>
              <InputGroup size="md">
                <Input type="file" placeholder="profile photo" onChange={(element) => setPfp(element.target.files[0])} />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
      <Button colorScheme="facebook" style={{ width: "15%", marginInline: "auto", marginBottom: 50 }} onClick={buttonEdit}>
        Save changes
      </Button>
    </div>
  );
};

export default Profile;
