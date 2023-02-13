import { Avatar, Image, Button, Container, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
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
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Container>
        <Avatar boxSize="150px" src={pfp} />
        {status == "verified" ? null : (
          <Button colorScheme="facebook" className="mb-5" onClick={verifyButton}>
            Verify your email address
          </Button>
        )}
      </Container>
      <Container>
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
                {/* <Td isNumeric>30.48</Td> */}
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
        <Button colorScheme="facebook" className="mb-5">
          Edit my profile info
        </Button>
      </Link>
    </div>
  );
};

export default DisplayInfo;
