import { API_URL } from "@/constants/constants";
import { ITodo } from "@/interfaces/ITodo";
import { IUserTodo } from "@/interfaces/IUserTodo";
import { useNotificationStore } from "@/store/notification";
import axios from "axios";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as IUserTodo[],
  }),
  actions: {
    async getTodos(): Promise<string | IUserTodo[]> {
      const { showNotification } = useNotificationStore();
      try {
        this.todos = [];

        const response = await axios.get<ITodo[]>(API_URL);

        this.groupTodos(response.data);
      } catch (e) {
        if (e instanceof Error) {
          showNotification("error", e.message);
          return e.message;
        }
      }
      showNotification("success", "Данные успешно получены");
      return this.todos;
    },

    groupTodos(resTodos: ITodo[]): IUserTodo[] {
      const mapTodos = resTodos.reduce((acc: any, cur) => {
        acc[cur.userId] = acc[cur.userId] || {
          userId: cur.userId,
          todos: [],
          completed: 0,
          uncompleted: 0,
        };

        acc[cur.userId].todos.push({ id: cur.id, title: cur.title });
        cur.completed
          ? (acc[cur.userId].completed += 1)
          : (acc[cur.userId].uncompleted += 1);

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
