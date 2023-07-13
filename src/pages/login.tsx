import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Login = {
  username: string;
  password: string;
};

let config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    console.log(data);
    const formData: Login = {
      username: data.username,
      password: data.password,
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/token`, formData, config)
      .then((res) => {
        // console.log(res);
        // console.log(res.data.access_token);
        // Cookieからトークンを取得
        const accessToken = Cookies.set("access_token", res.data.access_token);

        // const { access_token } = res.data;
        const access_token = res.data.access_token;

        console.log(access_token);
        // console.log(access_token_test);

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96 mx-auto space-y-3 items-center justify-between rounded-lg shadow-lg">
        <div className="px-3 py-3">
          <h1 className="text-center text-3xl font-bold">ログイン</h1>
          <div className="form-container mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3 flex flex-col ">
                <label className="px-2 font-medium">ユーザー名</label>
                <input
                  placeholder="username"
                  {...register("username", { required: true })}
                  className="py-2 px-2 text-gray-700 border-2 border-black"
                  id="name"
                  type="text"
                />
                {errors.username && <span>必須項目です</span>}

                <label className="px-2 font-medium">パスワード</label>
                <input
                  placeholder="password"
                  {...register("password", { required: true })}
                  className="py-2 px-2 text-gray-700 border-2 border-black"
                  id="password"
                  type="password"
                />
                <button type="submit" className=" text-xl py-4 font-bold">
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
