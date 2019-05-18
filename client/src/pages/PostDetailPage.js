import React from "react";
import { Container, Col, Row } from "reactstrap";

// Component
import ListPost from "../components/ListPost";

const PostDetailPage = ({ match }) => (
  <Container>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <ListPost postId={match.params.id} />
      </Col>
    </Row>
  </Container>
);

export default PostDetailPage;
