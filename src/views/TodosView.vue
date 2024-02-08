<script setup>
import TodoCreator from "@/components/TodoCreator.vue";
import { uid } from "uid";
import { ref, watch, computed } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import { Icon } from "@iconify/vue";

const todoList = ref([]);

watch(
  todoList,
  () => {
    setTodoListLocalStorage();
  },
  {
    deep: true,
  }
);

const todosCompleted = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted);
});

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));

  if (savedTodoList) {
    todoList.value = savedTodoList;
  }
};

fetchTodoList();

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: false,
    isEditing: false,
  });
};

const toggleComplete = (currentId) => {
  const currentTodo = todoList.value.find((todo) => todo.id === currentId);
  currentTodo.isCompleted = !currentTodo.isCompleted;
  /*  todoList.value = todoList.value.map((todo) =>
    todo.id === currentTodo ? { ...todo, isCompleted: !todo.isCompleted } : todo
  ); */
};

const editTodo = (currentId) => {
  const currentTodo = todoList.value.find((todo) => todo.id === currentId);
  currentTodo.isEditing = !currentTodo.isEditing;
};

const updateTodo = (currentValue, currentId) => {
  const currentTodo = todoList.value.find((todo) => todo.id === currentId);
  currentTodo.todo = currentValue;
};

const deleteTodo = (currentId) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== currentId);
};
</script>

<template>
  <main>
    <h1>Create Todo</h1>
    <TodoCreator @create-todo="createTodo" />
    <ul v-if="todoList.length > 0" class="todo-list">
      <TodoItem
        v-for="todo in todoList"
        :todo="todo"
        @toggle-complete="toggleComplete"
        @edit-todo="editTodo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" />
      <span>You have no todo's to complete! Add one!</span>
    </p>
    <p v-if="todosCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your todos!</span>
    </p>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
