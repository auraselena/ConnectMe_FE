import React from "react";
import { Avatar, AvatarBadge, Center, Flex, Spacer, Grid, GridItem, Box, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react";
import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineLogout, AiFillMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/usersAction";
import { API_url } from "../helper";

const Navbar = (props) => {
  const dispatch = useDispatch();

  const { username, pfp } = useSelector((state) => {
    return {
      username: state.usersReducer.username,
      pfp: API_url + state.usersReducer.pfp,
    };
  });

  const logoutButton = () => {
    dispatch(logoutAction());
  };

  const buttonLogin = () => {
    console.log("user sudah siap login");
  };

  return (
    <div id="navbar" className="navbar d-flex flex-row">
      <Box w="100%" p={3} color="#1e3a8a" marginTop="0px">
        <Grid templateColumns="repeat(5, 1fr)" gap={100}>
          <GridItem w="100%" h="10">
            <Flex>
              {/* <FaBookReader size={28} style={({ marginLeft: 10 }, { marginRight: 10 })} /> */}
              <Link to="/">
                <Text fontSize="2xl" as="b" marginLeft="8">
                  ConnectMe!
                </Text>
              </Link>
            </Flex>
          </GridItem>
          <Spacer />
          <Flex gap="0">
            <GridItem w="180px" p={1.5}>
              <Link to="/landing">
                <IoNotifications size={28} />
              </Link>
            </GridItem>
            <Spacer />
            <GridItem w="180px" p={1.5}>
              <Link to="/createpost">
                <FiPlusSquare size={28} />
              </Link>
            </GridItem>
            <Spacer />
            <GridItem w="180px" p={1.5}>
              <Link>
                <AiFillMessage size={28} />
              </Link>
            </GridItem>
            <Spacer />
          </Flex>
          <Spacer />
          <GridItem w="100%">
            {props.loading ? (
              <Spinner color="red.500" />
            ) : username ? (
              <Menu>
                <MenuButton type="button">
                  <Avatar name={username} size="md" src={pfp}>
                    <AvatarBadge boxSize="1em" bg="green.500" />
                  </Avatar>
                </MenuButton>
                <MenuList textColor="black">
                  <div>
                    <Link to="/landing">
                      <MenuItem>My Feed</MenuItem>
                    </Link>
                    <Link to="/displayinfo">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                  </div>
                  <MenuDivider />
                  <Link to="/login">
                    <MenuItem onClick={() => dispatch(logoutAction())}>
                      Log out
                      <AiOutlineLogout className="ms-2" />
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            ) : (
              <Flex gap={5}>
                <Link to="/register">
                  <Button colorScheme="facebook" onClick={buttonLogin}>
                    <Text fontSize="lg" as="b">
                      Register
                    </Text>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button colorScheme="facebook" onClick={buttonLogin}>
                    <Text fontSize="lg" as="b">
                      Login
                    </Text>
                  </Button>
                </Link>
              </Flex>
            )}
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default Navbar;
