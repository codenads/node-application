import { Link } from "react-router-dom";
import {
  withStyles,
  Container,
  useTheme,
  List,
  ListItem,
  ListItemText as MuiListItemText,
} from "@material-ui/core";

import { ReactComponent as Logo } from "../../assets/logo.svg";

const ListItemText = withStyles({
  root: {
    color: "#fff",
  },
  primary: {
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: 1,
  },
})(MuiListItemText);

const Header = () => {
  const theme = useTheme();

  return (
    <header
      style={{
        background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%`,
        marginBottom: "2rem",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo style={{ width: 40, height: 40 }} />
        <List style={{ display: "flex" }}>
          <Link to="/">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/registros">
            <ListItem button>
              <ListItemText primary="Registry" />
            </ListItem>
          </Link>
        </List>
      </Container>
    </header>
  );
};

export default Header;
