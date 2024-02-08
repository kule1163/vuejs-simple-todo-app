0
<script setup>
import { ref, defineEmits, reactive } from "vue";
import TodoButton from "@/components/TodoButton.vue";

const emit = defineEmits(["create-todo"]);

const todo = ref("testing");

const todoState = reactive({
  todo: "",
  inValid: null,
  errMsg: "",
});

const createTodo = () => {
  todoState.inValid = null;
  if (todoState.todo !== "") {
    emit("create-todo", todoState.todo);
    todoState.todo = "";
    return;
  }

  todoState.inValid = true;
  todoState.errMsg = "Todo value cannot be empty";
};
</script>

<template>
  <div class="input-wrap" :class="{ 'input-err': todoState.inValid }">
    <input type="text" v-model="todoState.todo" />

    <TodoButton @click="createTodo()"> Create </TodoButton>
  </div>
  <!--  
    v-if isnt rendered
    <p v-if="todoState.inValid" class="err-msg">{{ todoState.errMsg }}</p> 
  -->
  <!-- v-show rendered but it takes display none  -->
  <p v-show="todoState.inValid" class="err-msg">{{ todoState.errMsg }}</p>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
