//  Todoオブジェクトの型定義
export type Todo = {
  content: string;
  id: number; //key指定のため
  deadline: string;
};

export type UpdateTodo = {
  content: string;
  deadline: string;
};
