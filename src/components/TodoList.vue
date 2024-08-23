<template>
  <div>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Add new todo"
    />
    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        @click="toggleCompletion(todo.id)"
      >
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      </li>
    </ul>
    <div class="text-black flex gap-6 mt-6">
      <button @click="currentFilter = 'all'">All</button>
      <button @click="currentFilter = 'active'">Active</button>
      <button @click="currentFilter = 'completed'">Completed</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default defineComponent({
  name: "TodoList",
  setup() {
    const todos = ref<TodoItem[]>([]);
    const newTodo = ref<String>("");
    const currentFilter = ref<String>("all");

    const addTodo = () => {
      const text = newTodo.value.trim();
      if (text) {
        todos.value.push({
          id: Date.now(),
          text,
          completed: false,
        });
        newTodo.value = "";
      }
    };

    const toggleCompletion = (id: number) => {
      const todo = todos.value.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    };

    const filteredTodos = computed(() => {
      switch (currentFilter.value) {
        case "active":
          return todos.value.filter((todo: TodoItem) => !todo.completed);
        case "completed":
          return todos.value.filter((todo: TodoItem) => todo.completed);
        default:
          return todos.value;
      }
    });

    return {
      todos,
      newTodo,
      addTodo,
      toggleCompletion,
      filteredTodos,
      currentFilter,
    };
  },
});
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
