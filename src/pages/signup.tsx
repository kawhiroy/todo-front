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

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountData>({
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<AccountData> = async (data) => {
    const accountData: AccountData = {
      username: data.username,
      password: data.password,
    };
    // console.log(accountData);
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
          {errorMessage !== null && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="fontWeightBold">
            アカウント作成
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
