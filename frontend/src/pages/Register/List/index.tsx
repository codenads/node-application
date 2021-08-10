import { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

import Collaborator, { ICollaborator } from "../../../components/collaborator";

import api from "../../../services/api";

const RegisterList = () => {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [displayedCollaborators, setDisplayedCollaborators] =
    useState<ICollaborator[]>(collaborators);
  const [collaboratorsFilter, setCollaboratorsFilter] = useState("");

  useEffect(() => setDisplayedCollaborators(collaborators), [collaborators]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const { data } = await api.get("/collaborator");
        setCollaborators(data.collaborators);
      } catch (err) {
        console.log(err.response.data.message);
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

  return (
    <Box>
      <Typography variant="h2" style={{ color: "#fff" }}>
        List
      </Typography>
      <TextField
        variant="outlined"
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
