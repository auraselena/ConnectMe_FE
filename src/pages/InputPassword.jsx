import React from "react";
import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_url } from "../helper";
import { useLocation } from "react-router-dom";

const InputPassword = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [resetPassword, setResetPassword] = React.useState("");
  const [inputResetPassword, setInputResetPassword] = React.useState("");

  const location = useLocation();

  const buttonReset = () => {
    // console.log("password siap di-reset");
    let token = location.search.split("=")[1];
    Axios.patch(
      API_url + "/users/inputPassword",
      {
        resetPassword,
        inputResetPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
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
        <div className="text-muted fw-bold">New password</div>
        <Input placeholder="New password" onChange={(element) => setInputResetPassword(element.target.value)} />
        <div className="mt-4 text-muted fw-bold">Repeat new password</div>
        <InputGroup size="md">
          <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="New password" onChange={(element) => setResetPassword(element.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button className="mt-4" style={{ width: "100%" }} colorScheme="twitter" onClick={buttonReset}>
          Reset password
        </Button>
      </div>
    </div>
  );
};

export default InputPassword;
