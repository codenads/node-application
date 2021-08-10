import { FC } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Grid, Box, Button } from "@material-ui/core";

export interface ICollaborator {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  status?: boolean;
  validatedAt?: Date;
  techs: string[];
}

export interface ICollaboratorParams {
  id: string;
}

interface CollaboratorProps extends ICollaborator {}

const Collaborator: FC<CollaboratorProps> = ({ id, name, cpf, status }) => {
  return (
    <Paper style={{ padding: "1rem 2rem" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Name
          </Typography>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            CPF
          </Typography>
          <Typography>{cpf}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button" color="primary">
            Status
          </Typography>
          <Box>
            <Typography>
              {status !== null
                ? status
                  ? "Validado"
                  : "Não Validado"
                : "Não avaliado"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Link to={`/${id}/validar`}>
          <Button variant="contained" color="primary">
            Details
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default Collaborator;
