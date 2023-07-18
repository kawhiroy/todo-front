import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// const StyledButton = styled(Button)`
//   background-color: #1976d2;
//   color: white;
//   &:hover {
//     background-color: #135ba3;
//   }
// `;

type AccountData = {
  username: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get("username"),
    //   password: data.get("password"),
    // });
    const username: string =
      event.currentTarget.elements.namedItem("username").value;
    const password: string =
      event.currentTarget.elements.namedItem("password").value;

    console.log(username);
    console.log(password);

    const accountData: AccountData = {
      username: username,
      password: password,
    };
    console.log(accountData);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, accountData)
      .then((res) => {
        console.log(res);
        router.push("/signin");
      })
      .catch((error) => {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {errorMessage}
          <Alert severity="error">{errorMessage}</Alert>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="fontWeightBold">
            アカウント作成
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ユーザー名"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained">
              登録する
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"ログインする"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
