import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { API_url } from "../helper";
import { useEffect } from "react";

export const Verification = () => {
  const location = useLocation();
  const verifyButton = () => {
    let token = location.search.split("=")[1];
    Axios.patch(
      API_url + `/users/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Terjadi kesalahan di server!");
      });
  };

  useEffect(() => {
    verifyButton();
  }, []);

  return (
    <div className="d-flex flex-column mt-5">
      <Text fontSize="3xl" as="b">
        Email verification success!
      </Text>
      <Link to="/landing">
        <Button colorScheme="facebook" className="my-5">
          Alright! Take me to home page
        </Button>
      </Link>
      <Link to="/profile">
        <Button className="mb-5">Complete my profile first</Button>
      </Link>
    </div>
  );
};
