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
      <form className="w-full font-medium text-lg pl-2 flex items-center bg-white rounded-lg mb-6 shadow-lg overflow-hidden">
        <input
          className="outline-none w-full py-2 px-2 text-gray-700"
          type="text"
          placeholder="Todoを入力"
          value={text}
          onChange={changeText}
        />
        <input
          className="outline-none w-full py-2 px-8"
          type="date"
          min={nowDateTypeString}
          value={date}
          onChange={changeDate}
        />
        <button
          className="py-2 bg-blue-500 text-white hover:bg-blue-600 duration-200"
          type="submit"
          onClick={handleAdd}
        >
          <PlusCircleIcon className="h-8 w-12" />
        </button>
      </form>
    </>
  );
};

export default InputForm;
