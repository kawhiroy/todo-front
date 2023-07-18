import * as React from "react";
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
import Cookies from "js-cookie";

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

let config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const username = event.currentTarget.elements.namedItem("username").value;
    const password = event.currentTarget.elements.namedItem("password").value;

    const accountData: AccountData = {
      username: username,
      password: password,
    };
    console.log(accountData);

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/token/`,
        accountData,
        config
      )
      .then((res) => {
        const accessToken = Cookies.set("access_token", res.data.access_token);

        // const { access_token } = res.data;
        const access_token = res.data.access_token;

        // CookieにJWTトークンをセット
        Cookies.set("access_token", access_token, { httpOnly: true });
        if (accessToken) {
          const cookie = Cookies.get("access_token");
          router.push("/");
          console.log(cookie);
          return;
        }
        return console.log("accessToken nothing");
      })
      .catch((error) => {
        console.log(error);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="fontWeightBold">
            ログイン
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
              ログイン
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"アカウントを作成"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
