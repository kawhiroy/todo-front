import React, { MouseEventHandler } from "react";
import { nowDateTypeString } from "@/pages/validate";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const InputForm = ({
  text,
  date,
  changeText,
  changeDate,
  handleAdd,
}: {
  text: string;
  date: string;
  changeText: React.ChangeEventHandler<HTMLInputElement>;
  changeDate: React.ChangeEventHandler<HTMLInputElement>;
  handleAdd: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <form className="w-full flex items-center bg-white rounded-lg mb-6 shadow-lg overflow-hidden">
        <input
          className="w-full py-2 px-4 text-gray-700"
          type="text"
          placeholder="Todoを入力"
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
    </>
  );
};

export default InputForm;
