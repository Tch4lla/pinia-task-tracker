<template>
    <form @submit.prevent="handleSubmit">
        <input 
            type="text"
            placeholder="I need to..."
            v-model="newTask"
        >
        <button>Add</button>
    </form>
</template>

<script>
//auto imported 
import { useTaskStore } from '../stores/TaskStore';

import { ref } from '@vue/reactivity';

    export default {
        setup(){
            //need to use the task store 
            const taskStore = useTaskStore()

            //this is data bound to the newTask v-model, so when a user types here, it will be updated 
            const newTask = ref('')  

            //this is what happens when a user submits 
            const handleSubmit = () => {
                //to get value out of ref, we need the .value property 
                //only want to call the action if someone typed something 
                
                if(newTask.value.length > 0){
                    taskStore.addTask({
                        //tasks are objects, so we need to send them an object
                        title: newTask.value,
                        isFav: false,
                        id: Math.floor(Math.random() * 10000)
                    })
                    //this will update the ref so what it will be empty after a user submits 
                    newTask.value = ''
                }
            }
            //return the values what we used in the template 
            return {handleSubmit , newTask}
        }
        
    }
</script>