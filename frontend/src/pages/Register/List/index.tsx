import { useState, useEffect } from "react";
import { Grid, Box, TextField, Typography } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

import Collaborator, { ICollaborator } from "../../../components/collaborator";

// import api from "../../../services/api";

const RegisterList = () => {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [displayedCollaborators, setDisplayedCollaborators] =
    useState<ICollaborator[]>(collaborators);
  const [collaboratorsFilter, setCollaboratorsFilter] = useState("");

  useEffect(() => setDisplayedCollaborators(collaborators), [collaborators]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      // const { data } = await api.get("/registros");
      setCollaborators([
        {
          id: "someid",
          name: "Luís",
          email: "someemail@gmail.com",
          cpf: "123.123.123-06",
          phone: "82999999999",
          techs: ["some", "tech", "here"],
        },
        {
          id: "someid",
          name: "Luís",
          email: "someemail@gmail.com",
          cpf: "123.123.123-06",
          phone: "82999999999",
          techs: ["some", "tech", "here"],
        },
        {
          id: "someid",
          name: "Luís",
          email: "someemail@gmail.com",
          cpf: "123.123.123-06",
          phone: "82999999999",
          techs: ["some", "tech", "here"],
        },
        {
          id: "someid",
          name: "Luís",
          email: "someemail@gmail.com",
          cpf: "123.123.123-06",
          phone: "82999999999",
          techs: ["humoungous", "tech", "here"],
        },
      ]);
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
  }, [collaboratorsFilter]);

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
          <Grid item key={collaborator.cpf}>
            <Collaborator {...collaborator} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RegisterList;
