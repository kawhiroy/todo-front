"use client";
import axios from "axios";
import InputForm from "@/components/InputForm";
import TodoItems from "@/components/TodoItems";
import { MouseEvent, useEffect, useState } from "react";
import { Todo, UpdateTodo, CreateTodo } from "./schema";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初期画面でTodo一覧を取得
  useEffect(() => {
    getTodos();
  }, []);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length > 20) {
      alert("Todo名は20文字以内にしてください");
      return;
    }
    setText(e.target.value); //  e.target.valueで入力されたものを取り出しtextを変更
  };

  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDate(e.target.value); //  e.target.valueで入力されたものを取り出しdateを変更
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
      content: text.trim(),
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

  // Todoを取得
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

  // Todoの編集
  const handleContent = (id: number, content: string) => {
    if (content.length > 20) {
      alert("Todo名は20文字以内にしてください");
      return;
    }
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.content = content;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // deadlineの編集
  const handleDeadline = (id: number, deadline: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.deadline = deadline;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // checkedの変更
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //  Todoの更新
  const handleUpdate = async (todo: Todo) => {
    const newTodo: UpdateTodo = {
      content: todo.content.trim(),
      deadline: todo.deadline,
      checked: todo.checked,
    };
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos/${todo.id}`, newTodo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Todoの削除
  const handleDelete = async (id: number) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/todos/${id}`, {
        params: { id: id },
      })
      .then((res) => {
        console.log(res);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-700">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <main>
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Todo
          </h1>

          <InputForm
            text={text}
            date={date}
            changeText={changeText}
            changeDate={changeDate}
            handleAdd={handleAdd}
          />

          <TodoItems
            todos={todos}
            handleContent={handleContent}
            handleUpdate={handleUpdate}
            handleDeadline={handleDeadline}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}
