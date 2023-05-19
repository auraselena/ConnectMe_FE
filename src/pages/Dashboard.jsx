import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, IconButton, Image, Button, Container, useToast } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_url } from "../helper";
import { getContentAction } from "../actions/contentAction";
import { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";

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

  const toast = useToast()
  const getContentData = () => {
    Axios.get(API_url + `/content/getAllContent`)
      .then((response) => {
        dispatch(getContentAction(response.data));
      })
      .catch((err) => {
        toast({
          title: 'Cannot get content data.',
          description: `${err.message}`,
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      });
  };

  useEffect(() => {
    getContentData();
  }, []);

  const printContentData = () => {
    return contentList.map((value) => {
      return (
        <Card shadow="xl" marginBottom="8">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={value.username} src={API_url + value.pfp} />

                <Box>
                  <Heading size="sm" textAlign="left">
                    {value.username}
                  </Heading>
                  <Text>{format(new Date(value.dateCreated), "d LLL u KK:m b")}</Text>
                </Box>
              </Flex>
              <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
            </Flex>
          </CardHeader>
          <Image shadow="md" objectFit="cover" src={API_url + value.image} alt="Chakra UI" />
          <CardBody>
            <Flex>
              <Text textAlign="left" as="b" marginRight="3">
                {value.username}
              </Text>
              <Text textAlign="left">{value.caption}</Text>
            </Flex>
          </CardBody>

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
    <div id="bg-landing" className="d-flex flex-row">
      <Container maxW="300px" marginTop="120px"></Container>
      <Container marginTop="120px">{printContentData()}</Container>
      <Container maxW="300px" marginTop="120px"></Container>
    </div>
  );
};
