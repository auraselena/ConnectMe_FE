import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, IconButton, Image, Button, Container } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_url } from "../helper";
import { getContentAction } from "../actions/contentAction";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const { contentList } = useSelector((state) => {
    return {
      contentList: state.contentReducer.content,
    };
  });

  const { username } = useSelector((state) => {
    return {
      username: state.usersReducer.username,
    };
  });

  const getContentData = () => {
    Axios.get(API_url + `/content/getAllContent`)
      .then((response) => {
        console.log(response.data);
        dispatch(getContentAction(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContentData();
  }, []);

  const printContentData = () => {
    return contentList.map((value) => {
      return (
        <Card>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={value.username} src={API_url + value.pfp} />

                <Box>
                  <Heading size="sm">{value.username}</Heading>
                  <Text>{value.dateCreated}</Text>
                </Box>
              </Flex>
              <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{value.caption}</Text>
          </CardBody>
          <Image objectFit="cover" src={API_url + value.image} alt="Chakra UI" />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
              Like
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
              Comment
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
              Share
            </Button>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <div className="d-flex flex-row">
      <Container maxW="300px" marginTop="30px"></Container>
      <Container marginTop="30px">{printContentData()}</Container>
      <Container maxW="300px" marginTop="30px"></Container>
    </div>
  );
};
