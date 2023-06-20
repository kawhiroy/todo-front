"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Todo, UpdateTodo } from "./schema";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // const urls = {
  //   todos: "http://127.0.0.1:8000/todos",
  // };

  //初期画面でTodo一覧を取得
  useEffect(() => {
    getTodos();
  }, [setTodos]);

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

  // Todoを取得
  const getTodos = () => {
    axios.get("http://127.0.0.1:8000/todos").then((res) => {
      setTodos(res.data);
      console.log(todos);
    });
  };

  // Todoを追加
  const addTodo = async () => {
    const newTodo: UpdateTodo = {
      content: text,
      deadline: date,
    };
    axios
      .post("http://127.0.0.1:8000/todos", newTodo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setText("");
    setDate("");
  };

  //  Todoの削除
  const deleteTodo = (id: number) => {
    axios
      .delete("http://127.0.0.1:8000/todos/" + id, { params: { id: id } })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  今日の日付を取得
  const nowDate = new Date();
  const nowDateTypeString =
    nowDate.getFullYear() +
    "-" +
    ("0" + (nowDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + nowDate.getDate()).slice(-2);

  return (
    <div className="index">
      <main>
        <h1>Todo</h1>

        {/* Todo追加 */}
        <div>
          <input
            className="inputText"
            type="text"
            value={text}
            onChange={changeText}
          />
          <input
            className="inputText"
            type="date"
            min={nowDateTypeString}
            value={date}
            onChange={changeDate}
          />
          <button
            className="submitButton"
            onClick={() => {
              if (text == "") {
                alert("Todoを入力してください");
              } else if (date == "") {
                alert("期日を選択してください");
              } else {
                addTodo();
                getTodos();
              }
            }}
          >
            追加
          </button>
        </div>

        <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input type="text" value={todo.content} readOnly />
                <input
                  type="date"
                  min={nowDateTypeString}
                  value={todo.deadline}
                  readOnly
                />

                <button
                  onClick={() => {
                    deleteTodo(todo.id);
                    getTodos();
                  }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button onClick={getTodos}>GET Todo</button>
        </div>
      </main>
    </div>
  );
}
