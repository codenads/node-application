import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Chip as MuiChip,
  withStyles,
} from "@material-ui/core";
import {
  ICollaborator,
  ICollaboratorParams,
} from "../../components/collaborator";

import api from "../../services/api";
import { useParams } from "react-router-dom";

const Chip = withStyles((theme) => ({
  root: {
    padding: "0 8px",
    marginLeft: "8px",
    transition: "all .2s ease",
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      background: theme.palette.primary.dark,
    },
  },
}))(MuiChip);

const Validate = () => {
  const [collaborator, setCollaborator] = useState<ICollaborator>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams<ICollaboratorParams>();

  useEffect(() => {
    const fetchCollaborator = async () => {
      try {
        const { data } = await api.get(`/collaborator/${id}`);
        setCollaborator(data.collaborator);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchCollaborator();
  }, [id]);

  const handleValidate = async (validate: boolean) => {
    try {
      const { data } = await api.put(`/collaborator/${id}/`, { validate });
      console.log(data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  if (!collaborator) {
    return (
      <div>
        <h1>Collaborator does not exist</h1>
      </div>
    );
  }

  return (
    <Paper
      variant="outlined"
      style={{ padding: "1rem 2rem", maxWidth: "300px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Name
          </Typography>
          <Typography>{collaborator.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Email
          </Typography>
          <Typography>{collaborator.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            CPF
          </Typography>
          <Typography>{collaborator.cpf}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Phone
          </Typography>
          <Typography>{collaborator.phone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Technologies
          </Typography>
          <Box>
            {collaborator.techs.map((tech) => (
              <Chip
                key={tech}
                clickable={false}
                size="small"
                label={<Typography variant="caption">{tech}</Typography>}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleValidate(false)}
        >
          Não validar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleValidate(true)}
        >
          Validar
        </Button>
      </Box>
    </Paper>
  );
};

export default Validate;
