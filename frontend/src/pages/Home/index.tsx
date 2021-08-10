import {
  Grid,
  Box,
  withStyles,
  Typography as MuiTypography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiTypescript, SiPostgresql } from "react-icons/si";

const Typography = withStyles({
  h1: {
    background: "-webkit-linear-gradient(275deg, #FF3D68, #A73489)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  h2: {
    background: "-webkit-linear-gradient(275deg, #FF3D68, #A73489)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  body1: {
    fontSize: "1.15rem",
  },
  caption: {
    fontSize: "1rem",
  },
})(MuiTypography);

const techs = {
  backend: [
    {
      name: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      name: "NodeJS",
      icon: <FaNodeJs />,
    },
    {
      name: "PostegreSQL",
      icon: <SiPostgresql />,
    },
    {
      name: "TypeORM",
      icon: <CheckCircle />,
    },
  ],
  frontend: [
    {
      name: "React",
      icon: <FaReact />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      name: "Material UI",
      icon: <CheckCircle />,
    },
  ],
};

const Home = () => {
  return (
    <Box>
      <Typography gutterBottom variant="h1">
        Hey, there
      </Typography>
      <Typography gutterBottom variant="body1">
        This is a simple full stack application that was made for a <br />
        full stack NodeJS job application.
      </Typography>
      <Typography variant="caption">
        Any feedback would be highly appreciated :)
      </Typography>
      <Box mt={0.5}>
        <Button
          href="https://www.linkedin.com/in/lu%C3%ADs-ant%C3%B4nio-3191571b5/"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          style={{ background: "#FF3D68", color: "#fff" }}
        >
          Contact
        </Button>
      </Box>
      <Divider style={{ margin: "2rem 0 0.5rem" }} />
      <Typography variant="caption">
        The following technologies and libraries are being used in this project
      </Typography>
      <Grid container spacing={4} style={{ marginTop: "0.5rem" }}>
        <Grid item style={{ paddingTop: 0 }}>
          <Typography gutterBottom variant="h2">
            Backend
          </Typography>
          <Paper style={{ padding: "0 1rem" }}>
            <List>
              {techs.backend.map((tech) => (
                <ListItem>
                  <ListItemIcon>{tech.icon}</ListItemIcon>
                  <ListItemText primary={tech.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item style={{ paddingTop: 0 }}>
          <Typography gutterBottom variant="h2">
            Frontend
          </Typography>
          <Paper style={{ padding: "0 1rem" }}>
            <List>
              {techs.frontend.map((tech) => (
                <ListItem>
                  <ListItemIcon>{tech.icon}</ListItemIcon>
                  <ListItemText primary={tech.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
