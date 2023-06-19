"use client";
import { useState } from "react";

export default function Home() {
  // setTextでtextを更新。初期値は空で定義
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [deadlines, setDeadlines] = useState<string[]>([]);

  //  changeText関数
  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value); //  event.target.valueで入力されたものを取り出しtextを変更
  };

  //  日付を取得するchangeDate関数
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value); //  event.target.valueで入力されたものを取り出しdateを変更
  };

  //  todoを追加するaddTodo関数
  const addTodos = () => {
    const newTodos = [...todos]; //  todosをすべて取り出す
    newTodos.push(text); //  newTodos配列にtextを挿入
    setTodos(newTodos); //  todosをnewTodosに更新
    setText(""); //  textを初期化
  };

  //  deadlineを追加するaddDeadline関数
  const addDeadlines = () => {
    const newDeadlines = [...deadlines]; //  deadlinesをすべて取り出す
    newDeadlines.push(date); //  newTodos配列にtextを挿入
    setDeadlines(newDeadlines); //  todosをnewTodosに更新
    setDate(""); //  textを初期化
  };

  //  todoを削除するdeleteTodo関数
  //  number型の引数index
  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    //  newTodos配列のindex番目を1つ削除する
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  //  deaelineを削除するdeleteDeadline関数
  //  number型の引数index
  const deleteDeadline = (index: number) => {
    const newDeadlines = [...deadlines];
    //  newDeadlines配列のindex番目を1つ削除する
    newDeadlines.splice(index, 1);
    setDeadlines(newDeadlines);
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
    <>
      <main>
        <h1>Todo</h1>
        <div className="form">
          <input type="text" value={text} onChange={changeText} />
          <input
            type="date"
            min={nowDateString}
            value={date}
            onChange={changeDate}
          />
          <button
            onClick={() => {
              if (text == "") {
                window.alert("Todoを入力してください");
              } else if (date == "") {
                window.alert("期日を選択してください");
              } else {
                addTodos();
                addDeadlines();
              }
            }}
          >
            追加
          </button>
        </div>

        <div>
          <ul>
            {todos.map((todo, index) => (
              <li key={todo}>
                <p>{todo}</p>
                <p>{deadlines[index]}</p>
                <button
                  onClick={() => {
                    deleteTodo(index);
                    deleteDeadline(index);
                  }}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
