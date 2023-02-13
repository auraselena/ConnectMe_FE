import React from "react";
// import img from "../assets/forms.png";
import { Text, Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Axios from "axios";
import { API_url } from "../helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export function Register(props) {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = React.useState(""); // username: "" --> "selena01" pake setUsername
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");

  const schema = yup.object().shape({
    username: yup.string().required("This field can't be blank."),
    email: yup.string().email().required("This field can't be blank."),
    password: yup
      .string()
      .required("Please re-enter your password")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"),
    inputPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password doesn't match")
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const buttonRegister = () => {
    Axios.post(API_url + `/users/register`, {
      username,
      email,
      password,
      inputPassword,
    })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        if (response.data.success) {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-row justify-content-center shadow-lg">
      {/* <img src={img} style={{ width: 700 }} /> */}
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <div className="shadow my-5 mx-5 px-5">
          <div className="mt-4">
            <Text fontSize="xl" as="b">
              REGISTER FOR FREE!
            </Text>
          </div>
          <div>
            <Text fontSize="xl" as="b">
              We help you to connect and share with people around the world.
            </Text>
          </div>
          <div>
            <Text fontSize="md">
              Already registered?{" "}
              <Link to="/login">
                <b>Log In</b>
              </Link>
            </Text>
          </div>
          <div className="mt-4 text-muted fw-bold">
            <Text fontSize="md">Username</Text>
            <Input placeholder="username" {...register("username")} size="md" onChange={(element) => setUsername(element.target.value)} />
            <p>{errors.username?.message}</p>
          </div>
          <div className="mt-4 text-muted fw-bold">
            <Text fontSize="md">E-mail</Text>
            <Input placeholder="e-mail" {...register("email")} size="md" onChange={(element) => setEmail(element.target.value)} />
            <p>{errors.email?.message}</p>
          </div>
          <div className="mt-4 text-muted fw-bold">
            <Text fontSize="md">Password</Text>
            <InputGroup size="md">
              <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="password" {...register("password")} onChange={(element) => setPassword(element.target.value)} />
              <p>{errors.password?.message}</p>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {/* {show ? "Hide" : "Show"} */}
                  {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <div className="mt-4 text-muted fw-bold">Repeat password</div>
          <InputGroup size="md">
            <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="password" {...register("inputPassword")} onChange={(element) => setInputPassword(element.target.value)} />
            <p>{errors.inputPassword?.message}</p>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" colorScheme="twitter" style={{ width: "100%", marginTop: 30 }} onClick={buttonRegister}>
            Create an account
          </Button>
          <div className="text-center text-muted">or</div>
          <Button colorScheme="gray" style={{ width: "100%", marginBottom: 30 }}>
            Sign up with Google <FcGoogle size={28} style={{ marginLeft: 10, marginRight: 10 }} />
          </Button>
        </div>
      </form>
    </div>
  );
}
