import React from "react";

export default function login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96 mx-auto space-y-3 items-center justify-between rounded-lg shadow-lg">
        <div className="px-3 py-3">
          <h1 className="text-center text-3xl font-bold">ログイン</h1>
          <div className="form-container mx-auto">
            <form>
              <div className="space-y-3 flex flex-col ">
                <label className="px-2 font-medium">ユーザー名</label>
                <input
                  className="py-2 px-2 text-gray-700 border-2 border-black"
                  id="name"
                  type="text"
                />
                <label className="px-2 font-medium">パスワード</label>
                <input
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
