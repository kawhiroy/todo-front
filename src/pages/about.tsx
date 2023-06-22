function TodoAppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-700">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-bold text-white mb-8">ToDo App</h1>
        <form className="w-full flex items-center bg-white rounded-lg mb-6 shadow-lg overflow-hidden">
          <input
            type="text"
            placeholder="Input your todo item..."
            className="w-full py-2 px-4 text-gray-700 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white"
          ></button>
        </form>
        <ul className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <li className="border-b py-4 px-6 text-xl font-medium flex items-center justify-between">
            Some To Do Item
            <input type="checkbox" className="cursor-pointer" />
          </li>
          <li className="border-b py-4 px-6 text-xl font-medium flex items-center justify-between">
            Another To Do Item
            <input type="checkbox" className="cursor-pointer" checked />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TodoAppLayout;
