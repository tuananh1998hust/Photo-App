import React from "react";
import { Container } from "reactstrap";

// Components
import ProfileHead from "../components/ProfileHead";

const ProfilePage = ({ match }) => (
  <Container>
    <ProfileHead id={match.params.id} />
  </Container>
);

export default ProfilePage;
