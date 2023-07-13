import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Register = {
  username: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const onSubmit: SubmitHandler<Register> = async (data) => {
    console.log(data);
    const formData: Register = {
      username: data.username,
      password: data.password,
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-96 mx-auto space-y-3 items-center justify-between rounded-lg shadow-lg">
          <div className="px-3 py-3">
            <h1 className="text-center text-3xl font-bold">アカウント作成</h1>

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
                    登録する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
