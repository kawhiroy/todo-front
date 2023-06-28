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
              className="border-b py-4 px-6 text-xl font-medium flex items-center justify-between"
              key={todo.id}
            >
              <input
                className="w-full py-2 px-4 text-gray-700"
                type="text"
                required
                value={todo.content}
                disabled={todo.checked}
                onChange={(e) => {
                  props.handleContent(todo.id, e.target.value);
                }}
                onBlur={() => props.handleUpdate(todo)}
              />

              {todo.deadline < nowDateTypeString ? (
                <ExclamationCircleIcon className="h-12 w-12 text-red-500" />
              ) : null}
              <div className="relative">
                <input
                  className="w-auto py-2 px-4 text-gray-700"
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
                className="cursor-pointer h-10 w-10"
                onClick={() => {
                  props.handleChecked(todo.id, todo.checked);
                  props.handleUpdate(todo);
                }}
                defaultChecked={todo.checked ? true : false}
              />
              <button
                className=""
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
