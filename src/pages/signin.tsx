import * as React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import Alert from "@mui/material/Alert";
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

// バリデーションルール
const schema = yup.object({
  username: yup
    .string()
    .required("必須項目です")
    .max(20, "20文字以内で設定してください"),
  password: yup
    .string()
    .required("必須項目です")
    .min(6, "6文字以上で設定してください"),
});

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export default function SignIn() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const { sessionError } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AccountData> = async (data) => {
    const accountData: AccountData = {
      username: data.username,
      password: data.password,
    };
    // console.log(accountData);

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
        Cookies.set("access_token", access_token);
        if (accessToken) {
          router.push("/");
          // const cookie = Cookies.get("access_token");
          // console.log(cookie);
          return;
        }
        return console.log("accessToken nothing");
      })
      .catch((error) => {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
          return setErrorMessage(error.response.data.detail);
        }
        return setErrorMessage("An unexpected error occurred.");
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
          {errorMessage !== null && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
          {/* {sessionError !== undefined && (
            <Alert severity="error">{sessionError}</Alert>
          )} */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="fontWeightBold">
            ログイン
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ユーザー名"
              {...register("username")}
              error={"username" in errors}
              helperText={errors.username?.message}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="パスワード"
              {...register("password")}
              error={"password" in errors}
              helperText={errors.password?.message}
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
