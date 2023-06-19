"use client";
import axios from "axios";
import { useState } from "react";
import { Todo, UpdateTodo } from "./schema";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [data, setData] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // const urls = {
  //   todos: "http://127.0.0.1:8000/todos",
  // };

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
      setData(res.data);
    });
  };

  // Todoを追加
  const addTodo = () => {
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

  //  Todoの編集
  const editTodo = (id: number, content: string) => {
    //  todosオブジェクトの中身を書き換えないようにmap()を使ってディープコピー
    const copyTodo = todos.map((todo) => ({ ...todo }));
    console.log(copyTodo);

    const newTodos = copyTodo.map((todo) => {
      if (todo.id === id) {
        todo.content = content;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //  期日の編集
  const editDate = (id: number, deadline: string) => {
    //
    const copyDate = todos.map((todo) => ({ ...todo }));
    console.log(copyDate);

    const newDate = copyDate.map((todo) => {
      if (todo.id === id) {
        todo.deadline = deadline;
      }
      return todo;
    });

    setTodos(newDate);
  };

  //  todoを削除
  // const deleteTodo = (id: number) => {
  //   //idが正しくないのは残す。正しいと消す。
  //   const newTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(newTodos);
  // };

  //  Todoの削除
  const deleteTodo = (id: number) => {
    axios
      .delete("http://127.0.0.1:8000/todos/{id}", { params: { id: id } })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    //idが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //  今日の日付を取得
  const nowDate = new Date();
  const nowDateString =
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
            min={nowDateString}
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
              }
            }}
          >
            追加
          </button>
        </div>

        {/* Todo一覧 */}
        {/* <div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  value={todo.content}
                  onChange={(e) => editTodo(todo.id, e.target.value)}
                />
                <input
                  type="date"
                  min={nowDateString}
                  value={todo.deadline}
                  onChange={(e) => editDate(todo.id, e.target.value)}
                />

                <button
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div> */}

        <div>
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  value={todo.content}
                  onChange={(e) => editTodo(todo.id, e.target.value)}
                />
                <input
                  type="date"
                  min={nowDateString}
                  value={todo.deadline}
                  onChange={(e) => editDate(todo.id, e.target.value)}
                />

                <button
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  削除
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
