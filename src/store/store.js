import produce from "immer";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,
  addTask: (title, content, state) =>
    set(
      produce((store) => {
        store.tasks.push({ title, content, state });
      }),
      //(store) => ({ tasks: [...store.tasks, { title, state }] }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title, content) => set({ draggedTask: { title, content } }),
  moveTask: (title, state, content) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, content, state } : task
      ),
    })),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks, prevTasks) => {
    useStore.setState({
      tasksInOngoing: newTasks.filter((task) => task.state === "ONGOING")
        .length,
    });
  }
);
