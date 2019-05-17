import React from "react";
import { Container, Row, Col } from "reactstrap";

// Components
import PostModal from "../components/PostModal";
import UserHead from "../components/UserHead";
import ListPost from "../components/ListPost";

const HomePage = () => (
  <Container>
    <Row>
      <Col sm="12" md={{ size: 3, offset: 1 }}>
        <UserHead />
        <PostModal />
      </Col>
      <Col sm="12" md="7">
        <ListPost />
      </Col>
    </Row>
  </Container>
);

export default HomePage;
