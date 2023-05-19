import { Avatar, Image, Button, Container, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { API_url } from "../helper";
import { useSelector } from "react-redux";
import Axios from "axios";

const DisplayInfo = () => {
  const { username, email, fullname, bio, pfp, status } = useSelector((state) => {
    return {
      username: state.usersReducer.username,
      email: state.usersReducer.email,
      fullname: state.usersReducer.fullname,
      bio: state.usersReducer.bio,
      pfp: API_url + state.usersReducer.pfp,
      status: state.usersReducer.status,
    };
  });

  const toast = useToast();
  const verifyButton = () => {
    let getLocalStorage = localStorage.getItem("socmed_login");
    Axios.patch(
      API_url + "/users/verifyAgain",
      {},
      {
        headers: { Authorization: `Bearer ${getLocalStorage}` },
      }
    )
      .then((response) => {
        toast({
          title: "Verification success!",
          description: "Your account is now verified.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      })
      .catch((err) => {
        toast({
          title: "Verification failed.",
          description: `${err.message}`,
          status: "warning",
          duration: 9000,
          isClosable: true,
          isCloseComplete: () => window.location.reload(false)
        });
      });
  };

  return (
    <div id="coba" className="d-flex flex-column align-items-center">
      <Container marginTop="150px">
        <Avatar boxSize="150px" src={pfp} />
        {status == "verified" ? null : (
          <Button colorScheme="facebook" className="mb-5" onClick={verifyButton}>
            Verify your email address
          </Button>
        )}
      </Container>
      <Container marginTop="50px">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Tbody>
              <Tr>
                <Td>Full name</Td>
                <Td>{fullname}</Td>
              </Tr>
              <Tr>
                <Td>Bio</Td>
                <Td>{bio}</Td>
              </Tr>
              <Tr>
                <Td>Username</Td>
                <Td>{username}</Td>
              </Tr>
              <Tr>
                <Td>E-mail</Td>
                <Td>{email}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
      <Link to="/profile">
        <Button colorScheme="facebook" className="mb-5" marginTop="50px">
          Edit my profile info
        </Button>
      </Link>
    </div>
  );
};

export default DisplayInfo;
