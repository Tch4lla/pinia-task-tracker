<template>
  <main>

    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!--new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!--filter-->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!--loading-->
    <div class="loading" v-if="taskStore.loading">Loading Tasks...</div>

    <!--Task list-->
    
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task">
       <TaskDetails :task="task" />
      </div>
    </div>

    
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} tasks left to do</p> 
      <div v-for="task in taskStore.favs" :key="task">
       <TaskDetails :task="task" />
      </div>
    </div>

  </main>
</template>

<script>
  //auto imported ref
  import { ref } from '@vue/reactivity';

  //importing TaskDetails Component
  import TaskDetails from './components/TaskDetails.vue'

  //import task form component 
  import TaskForm from './components/TaskForm.vue'

  //importing task store from folder
  import { useTaskStore } from './stores/TaskStore';

  //need to invoke task store function with setup (composition API)
  export default {
    components: { TaskDetails, TaskForm },
    setup() {
      //this is our store
      const taskStore = useTaskStore()

      //fetch tasks
      taskStore.getTasks()

      //creating a new ref to to filter out favs
      const filter = ref('all')

      //this return makes it available in our Vue Template
      return { taskStore, filter }
    }
  }
</script>