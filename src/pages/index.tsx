"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Todo, UpdateTodo } from "./schema";
import { nowDateTypeString } from "./validate";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // const url = "http://127.0.0.1:8000/todos";

  //初期画面でTodo一覧を取得
  useEffect(() => {
    getTodos();
  }, []);

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
      checked: false,
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

  // Todoの編集
  const handleContent = (id: number, content: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.content = content;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //  deadlineの編集
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
  const updateTodos = async (todo: Todo) => {
    const newTodo: UpdateTodo = {
      content: todo.content, //対象のtodoをとってくる
      deadline: todo.deadline,
      checked: todo.checked,
    };
    axios
      .put("http://127.0.0.1:8000/todos/" + todo.id, newTodo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Todoの削除
  const deleteTodo = async (id: number) => {
    axios
      .delete("http://127.0.0.1:8000/todos/" + id, { params: { id: id } })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-700">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <div className="index">
          <main>
            <h1 className="text-4xl font-bold text-white mb-8">Todo</h1>
            {/* Todo追加 */}
            <form className="w-full flex items-center bg-white rounded-lg mb-6 shadow-lg overflow-hidden">
              <input
                className="w-full py-2 px-4 text-gray-700 focus:outline-none"
                type="text"
                placeholder="Input your todo item..."
                required
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
                className="px-4 py-2 bg-blue-500 text-white"
                type="submit"
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
            </form>
            <div>
              <ul className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                {todos.map((todo) => (
                  <li
                    className="border-b py-4 px-6 text-xl font-medium flex items-center justify-between"
                    key={todo.id}
                  >
                    <input
                      type="text"
                      value={todo.content}
                      disabled={todo.checked}
                      onChange={(e) => {
                        handleContent(todo.id, e.target.value);
                      }}
                    />
                    <input
                      type="date"
                      min={nowDateTypeString}
                      value={todo.deadline}
                      disabled={todo.checked}
                      onChange={(e) => {
                        handleDeadline(todo.id, e.target.value);
                      }}
                    />
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onClick={() => {
                        handleChecked(todo.id, todo.checked);
                      }}
                      defaultChecked={todo.checked ? true : false}
                    />
                    <button
                      className=""
                      onClick={() => {
                        deleteTodo(todo.id);
                        getTodos();
                      }}
                    >
                      ✖
                    </button>
                    <button
                      className="text-black"
                      onClick={() => {
                        updateTodos(todo);
                        getTodos();
                      }}
                    >
                      保存
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white"
                onClick={getTodos}
              >
                GET Todo
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
