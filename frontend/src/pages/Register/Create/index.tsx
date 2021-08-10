<<<<<<< HEAD
import { FormEvent, useState, ChangeEvent } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import Header from "../../../components/header";
import Page from "../../../components/page";
import checkCPFValidity from "../../../utils/checkCPFValidity";

import techsOptions from "./techs.json";
import api from "../../../services/api";

const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [CPF, setCPF] = useState("");
  const [CPFError, setCPFError] = useState(false);
  const [CPFHelperText, setCPFHelperText] = useState("");

  const [phone, setPhone] = useState("");

  const [techs, setTechs] = useState<String[]>([]);
  const [techsError, setTechsError] = useState(false);
  const [techsHelperText, setTechsHelperText] = useState("");

  const handleChangeCPF = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedCPF = event.target.value.replace(/[^\d]/g, "");
    const formatedCPF = parsedCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    setCPF(formatedCPF);
  };

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedPhone = event.target.value.replace(/[^\d]/g, "");
    const formatedPhone = parsedPhone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );
    setPhone(formatedPhone);
  };

  const handleAddTech = (addedTechs: string[]) => {
    if (addedTechs.length > 3) {
      alert("You can only add 3 techs");
    } else {
      setTechs(addedTechs);
    }
  };

  const handleRemoveTech = (addedTechs: string[]) => {
    setTechs(addedTechs);
  };

  const validateEmail = () => {
    const emailValidationRegex = new RegExp(
      // eslint-disable-next-line
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
    const isEmailValid = emailValidationRegex.test(email);
    if (isEmailValid) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true);
      setEmailHelperText("Invalid Email");
      return false;
    }
  };

  const validateCPF = () => {
    const parsedCPF = CPF.replaceAll(".", "").replaceAll("-", "");
    let isCPFValid = checkCPFValidity(parsedCPF);
    if (isCPFValid) {
      setCPFError(false);
      return true;
    } else {
      setCPFError(true);
      setCPFHelperText("Invalid CPF");
      return false;
    }
  };

  const validateTechs = () => {
    if (techs.length > 0 && techs.length <= 3) {
      setTechsError(false);
      setTechsHelperText("");
      return true;
    } else {
      setTechsError(true);
      setTechsHelperText("At least one tech is required");
      return false;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const isCPFValid = validateCPF();
      const isEmailValid = validateEmail();
      const isTechsValid = validateTechs();
      // Como o documento de avaliação técnica
      // não solicita explicitamente a validação de telefone,
      // a mesma não está sendo feita.
      if (isCPFValid && isEmailValid && isTechsValid) {
        const response = await api.post("/registros", {
          name,
          email,
          CPF,
          phone,
          techs,
        });
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
=======
import { Box, Typography } from "@material-ui/core";
>>>>>>> feature/list

  return (
    <>
      <Header />
      <Page>
        <Paper
          variant="outlined"
          style={{ maxWidth: 500, padding: "1rem 1.5rem 2rem" }}
        >
          <Typography variant="button" color="primary">
            Information
          </Typography>
          <FormControl component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  placeholder="Ex.: João Santos"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  inputProps={{ maxLength: 100 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  placeholder="Ex.: joaosantos@email.com"
                  error={emailError}
                  helperText={emailHelperText}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  inputProps={{ maxLength: 100 }}
                  FormHelperTextProps={{
                    style: {
                      marginLeft: 0,
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="cpf"
                  label="CPF"
                  placeholder="Ex.: 123.456.789-01"
                  variant="outlined"
                  size="small"
                  error={CPFError}
                  helperText={CPFHelperText}
                  value={CPF}
                  onChange={handleChangeCPF}
                  inputProps={{ maxLength: 14 }}
                  FormHelperTextProps={{
                    style: {
                      marginLeft: 0,
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone"
                  placeholder="Ex.: (xx) xxxxx-xxxx"
                  variant="outlined"
                  size="small"
                  value={phone}
                  onChange={handleChangePhone}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="techs"
                  options={techsOptions}
                  value={techs}
                  onChange={(event, value, reason) => {
                    // Material-UI value está com tipo String[] em vez de string[],
                    // map com coerção do tipo para mitigar o problema
                    if (reason === "select-option") {
                      handleAddTech(
                        value.map((value: String) => String(value))
                      );
                    } else if (reason === "remove-option") {
                      handleRemoveTech(
                        value.map((value: String) => String(value))
                      );
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Technologies"
                      placeholder="Insert your Techs"
                      size="small"
                      error={techsError}
                      helperText={techsHelperText}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0,
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Paper>
      </Page>
    </>
  );
};

export default Register;
