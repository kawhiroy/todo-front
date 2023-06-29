import React from "react";
import { nowDateTypeString } from "@/pages/validate";
import { TrashIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Todo } from "@/pages/schema";

const TodoItems = (props: any) => {
  // Todo[]を並べ替え
  const sortedTodo = props.todos.sort(
    (a: { id: number }, b: { id: number }) => a.id - b.id
  );

  return (
    <>
      <div>
        <ul className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          {sortedTodo.map((todo: Todo) => (
            <li
              className="border-b py-3 px-4 text-xl font-medium flex items-center justify-between"
              key={todo.id}
            >
              <input
                className="outline-none w-full py-2 px-2 text-gray-700"
                type="text"
                placeholder="Todoを入力"
                required
                value={todo.content}
                disabled={todo.checked}
                onChange={(e) => {
                  props.handleContent(todo.id, e.target.value);
                }}
                onBlur={() => props.handleUpdate(todo)}
              />

              <div className="relative w-full">
                <input
                  className={
                    todo.deadline < nowDateTypeString
                      ? "outline-none py-2 text-red-500"
                      : "outline-none py-2 text-gray-700"
                  }
                  type="date"
                  required
                  min={nowDateTypeString}
                  value={todo.deadline}
                  disabled={todo.checked}
                  onChange={(e) => {
                    props.handleDeadline(todo.id, e.target.value);
                  }}
                  onBlur={() => props.handleUpdate(todo)}
                />
              </div>
              <input
                type="checkbox"
                className="cursor-pointer h-10 w-10 pr-2"
                onClick={() => {
                  props.handleChecked(todo.id, todo.checked);
                  props.handleUpdate(todo);
                }}
                defaultChecked={todo.checked ? true : false}
              />
              <button
                className="px-1 py-2 hover:bg-slate-200"
                onClick={() => {
                  props.handleDelete(todo.id);
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoItems;
