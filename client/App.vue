<template>
    <div id="app">
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
      name: 'app',
      components: { Header, Footer, Todo}
    }
</script>

<style scoped>

</style>