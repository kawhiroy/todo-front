import { CreateTodo, Todo } from "@/pages/schema";
import { nowDateTypeString } from "@/pages/validate";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { MouseEvent, useState, createContext, useContext } from "react";
import getTodos from "@/pages/index";

const InputForm = () => {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  //  changeText関数
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value); //  e.target.valueで入力されたものを取り出しtextを変更
  };

  //  日付を取得するchangeDate関数
  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDate(e.target.value); //  e.target.valueで入力されたものを取り出しdateを変更
  };

  const getTodos = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos`)
      .then((res) => {
        setTodos(res.data);
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Todoを追加
  const handleAdd = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Todoを入力してください");
      return;
    }
    if (date == "") {
      alert("期日を選択してください");
      return;
    }
    const newTodo: CreateTodo = {
      content: text,
      deadline: date,
      checked: false,
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos`, newTodo)
      .then((res) => {
        console.log(res);
        setText("");
        setDate("");
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className="w-full flex items-center bg-white rounded-lg mb-6 shadow-lg overflow-hidden">
      <input
        className="w-full py-2 px-4 text-gray-700"
        type="text"
        placeholder="Todoを入力"
        // required
        value={text}
        onChange={changeText}
      />
      <input
        className="w-full py-2 px-12"
        type="date"
        min={nowDateTypeString}
        value={date}
        onChange={changeDate}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white"
        type="submit"
        onClick={handleAdd}
      >
        <PlusCircleIcon className="h-8 w-8" />
      </button>
    </form>
  );
};

export default InputForm;
