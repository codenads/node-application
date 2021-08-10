import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

import Collaborator, { ICollaborator } from "../../../components/collaborator";

import api from "../../../services/api";

const RegisterList = () => {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [displayedCollaborators, setDisplayedCollaborators] =
    useState<ICollaborator[]>(collaborators);
  const [collaboratorsFilter, setCollaboratorsFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => setDisplayedCollaborators(collaborators), [collaborators]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const { data } = await api.get("/collaborator");
        setCollaborators(data.collaborators);
        setLoading(false);
      } catch (err) {
        console.log(err.response?.data.message);
      }
    };
    fetchCollaborators();
  }, []);

  useEffect(() => {
    const newDisplayedCollaborators = collaborators.filter((collaborator) => {
      return (
        collaborator.name
          .toLowerCase()
          .includes(collaboratorsFilter.toLowerCase()) ||
        collaborator.cpf
          .toLowerCase()
          .includes(collaboratorsFilter.toLowerCase()) ||
        collaborator.email
          .toLowerCase()
          .includes(collaboratorsFilter.toLowerCase()) ||
        collaborator.id
          .toLowerCase()
          .includes(collaboratorsFilter.toLowerCase()) ||
        collaborator.phone
          ?.toLowerCase()
          .includes(collaboratorsFilter.toLowerCase()) ||
        collaborator.techs.find((tech) =>
          tech.toLowerCase().includes(collaboratorsFilter.toLowerCase())
        )
      );
    });
    setDisplayedCollaborators(newDisplayedCollaborators);
  }, [collaborators, collaboratorsFilter]);

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
  } else if (!collaborators.length) {
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
          There's no collaborators to be displayed
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <TextField
        size="small"
        label="Filter"
        value={collaboratorsFilter}
        onChange={(event: any) => setCollaboratorsFilter(event.target.value)}
        InputProps={{
          endAdornment: <SearchRounded htmlColor="#fff" />,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: "1rem" }}
      />
      <Grid container spacing={2}>
        {displayedCollaborators.map((collaborator) => (
          <Grid item key={collaborator.cpf} xs={12} sm={4}>
            <Collaborator {...collaborator} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RegisterList;
