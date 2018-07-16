<template>
    <section class="real-app">
        <input 
        type="text"
        class="add-input"
        autofocus='autofocus'
        placeholder="Next what to do？"
        @keyup.enter="handleKeyUp"
        >
        <item 
        :todo="todo"
        v-for="todo in filterTodos"
        :key="todo.id"
        @del="deleteTodo"
        />
        <Tabs 
        :filter="filter" 
        :todos="todos"
        @toggle="toggleFilter"
        @clearCompleted="clearCompleted"
        />
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  data () {
    return {
      todos: [],
      filter: 'All'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filterTodos () {
      if (this.filter === 'All') {
        return this.todos
      }
      const completed = this.filter === 'Completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    handleKeyUp (e) {
      e.preventDefault()
      if (!e.target.value) {
        return
      }
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style scoped>
    .real-app{
        width: 600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666;
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border:0;
        outline:none;
        color: inherit;
        padding: 6px;
        border:1px solid #999;
        box-sizing: border-box;
        padding: 16px 16px 16px 40px;
        border: none;
        box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.2);
    }
</style>

