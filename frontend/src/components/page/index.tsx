import React from "react";
import { Container } from "@material-ui/core";

const Page: React.FC = ({ children }) => {
  //Material-UI Container parece não functionar
  //passando children como nó filho,
  //portanto foi adicionado o React Fragment para mitigar o problema.
  return (
    <Container style={{ marginTop: "2rem" }}>
      <>{children}</>
    </Container>
  );
};
export default Page;
