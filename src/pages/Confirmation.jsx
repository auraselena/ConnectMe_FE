import React from "react";
import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { Link } from "react-router-dom";
import { API_url } from "../helper";

const Confirmation = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");

  const reset = () => {
    Axios.post(API_url + "/users/confirmation", {
      email,
      username,
    })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "85vh" }}>
      <div className="bg-light shadow p-5" style={{ width: 400 }}>
        <div>Confirm that it's really you setting up your password.</div>
        <div className="mt-4 text-muted fw-bold">Email</div>
        <Input placeholder="Email" onChange={(element) => setEmail(element.target.value)} />
        <div className="mt-4 text-muted fw-bold">Username</div>
        <Input placeholder="Username" onChange={(element) => setUsername(element.target.value)} />
        <Link>
          <Button onClick={reset} className="mt-4" style={{ width: "100%" }} colorScheme="facebook">
            Send me an email to reset my password
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
