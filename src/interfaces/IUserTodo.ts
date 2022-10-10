export interface IUserTodo {
  userId: number;
  todos: { id: number; title: string }[];
  completed: number;
  uncompleted: number;
}
