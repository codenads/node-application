import React from "react";
import { Container } from "@material-ui/core";

const Page: React.FC = ({ children }) => {
  //Material-UI Container doesn't seem to work with children props, therefore the react fragment to mitigate the problem
  return (
    <Container style={{ marginTop: "2rem" }}>
      <>{children}</>
    </Container>
  );
};
export default Page;
