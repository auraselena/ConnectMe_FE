import React from "react";
import { Text, Input, InputGroup, InputRightElement, Button, ButtonGroup, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { API_url } from "../helper";
import { useDispatch } from "react-redux";
import { loginAction } from "../actions/usersAction";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [inputEmail, setInputEmail] = React.useState("");
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputMix, setInputMix] = React.useState("");

  const toast = useToast()

  const buttonLogin = () => {
    Axios.post(API_url + `/users/login`, {
      // username: inputUsername,
      mix: inputMix,
      password: inputPassword,
      // email: inputEmail,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(loginAction(response.data.value));
          localStorage.setItem("socmed_login", response.data.value.token);
          navigate("/", { replace: true });
          toast({
            title: 'Login success!',
            description: "You are logged in successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch((err) => {
        toast({
          title: 'Login failed.',
          description: `${err.message}`,
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      });
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "85vh" }}>
      <div className="bg-light shadow p-5" style={{ width: 400 }}>
        <Text fontSize="2xl" as="b">
          Sign in to be connected!
        </Text>
        <div>
          Not have account ? <Link to="/register">Sign up</Link>
        </div>
        <div className="mt-4 text-muted fw-bold">Email or username</div>
        <Input placeholder="Email or Username" onChange={(element) => setInputMix(element.target.value)} />
        {/* <div className="mt-4 text-muted fw-bold">Username</div>
        <Input placeholder="Username" onChange={(element) => setInputUsername(element.target.value)} /> */}
        <div className="mt-4 text-muted fw-bold">Password</div>
        <InputGroup size="md">
          <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Password" onChange={(element) => setInputPassword(element.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </Button>
          </InputRightElement>
        </InputGroup>

        <div className="text-end mt-5">
          Forgot password ? Click <Link to="/confirmation">here</Link>
        </div>
        <Button className="mt-2" style={{ width: "100%" }} colorScheme="twitter" onClick={buttonLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
