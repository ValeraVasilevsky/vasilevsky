import { http } from "@/api/http";
import { ITodo } from "@/interfaces/ITodo";
import { IUserTodo } from "@/interfaces/IUserTodo";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as IUserTodo[],
  }),
  actions: {
    async getTodos(): Promise<string | IUserTodo[]> {
      this.todos = [];
      const { data } = await http.get<ITodo[]>(
        `${import.meta.env.VITE_BASE_URL}`
      );

      this.groupTodos(data);
      return this.todos;
    },

    groupTodos(resTodos: ITodo[]): IUserTodo[] {
      const mapTodos = resTodos.reduce((acc: any, current) => {
        acc[current.userId] = acc[current.userId] || {
          userId: current.userId,
          todos: [],
          completed: 0,
          uncompleted: 0,
        };

        acc[current.userId].todos.push({
          id: current.id,
          title: current.title,
        });
        current.completed
          ? (acc[current.userId].completed += 1)
          : (acc[current.userId].uncompleted += 1);

        return acc;
      }, {});

      const groupedTodos: IUserTodo[] = Object.values(mapTodos);
      return this.sortTodos(groupedTodos);
    },

    sortTodos(groupedTodos: IUserTodo[]): IUserTodo[] {
      const sortedTodos: IUserTodo[] = groupedTodos.sort((a, b) => {
        return b.completed - a.completed || b.userId - a.userId;
      });
      return this.setTodos(sortedTodos);
    },

    setTodos(sortedTodos: IUserTodo[]): IUserTodo[] {
      this.todos = sortedTodos;
      return this.todos;
    },
  },
});
