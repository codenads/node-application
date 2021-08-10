import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Chip as MuiChip,
  withStyles,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import {
  ICollaborator,
  ICollaboratorParams,
} from "../../components/collaborator";

import api from "../../services/api";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

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

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams<ICollaboratorParams>();

  useEffect(() => {
    const fetchCollaborator = async () => {
      try {
        const { data } = await api.get(`/collaborator/${id}`);
        setCollaborator(data.collaborator);
        setLoading(false);
      } catch (err) {
        console.log(err);
        // console.log(err.response.data.message);
      }
    };
    fetchCollaborator();
  }, [id]);

  const handleValidate = async (validate: boolean) => {
    try {
      await api.put(`/collaborator/${id}/`, { validate });
      enqueueSnackbar("Collaborator updated successfully.", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (err) {
      enqueueSnackbar("Collaborator could not be updated successfully.", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  if (loading) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          top: "calc(50% - 20px)",
          left: "calc(50% - 20px)",
        }}
      />
    );
  }

  if (!collaborator) {
    return (
      <Paper
        style={{
          background: "#ff4444",
          padding: "1rem 2rem",
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h1"
          style={{ fontSize: "1.5rem", fontWeight: 400, color: "#fff" }}
        >
          Collaborator could not be found
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      style={{ padding: "1rem 2rem 2rem", maxWidth: 500, margin: "0 auto" }}
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
          <Box mt={1}>
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
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Status
          </Typography>
          <Typography>
            {collaborator.status !== null
              ? collaborator.status
                ? "Validado"
                : "Não Validado"
              : "Não avaliado"}
          </Typography>
        </Grid>
        {collaborator.validatedAt && (
          <Grid item xs={12}>
            <Typography variant="button" color="primary">
              Validated at
            </Typography>
            <Typography>
              {new Date(collaborator.validatedAt).toLocaleString()}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider style={{ margin: "1rem 0" }} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => handleValidate(false)}
          style={{ background: "#ff4444", color: "#fff" }}
        >
          Não validar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleValidate(true)}
          style={{ background: "#00C851" }}
        >
          Validar
        </Button>
      </Box>
    </Paper>
  );
};

export default Validate;
