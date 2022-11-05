//need to use this function in order to create a store 
import { defineStore } from 'pinia'


//define store takes two parameters, the name of the store and an object where you can define the state

//want to export the store to be used in other files, so we store the result of the define store function in constant. use'VariableName' is naming convention 

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
    }),
    getters:{
        //getter for returning the a task list where the isFav property is true
       favs(){
        return this.tasks.filter(task => task.isFav)
       },
       favCount(){
        // return this.tasks.reduce((p,c)=> {
        //     return c.isFav ? p + 1 : p
        // }, 0)
        return this.tasks.filter(task => task.isFav).length
       },
       totalCount: (state) => {
        return state.tasks.length
       }
    },
    actions:{
        //adding async action in order to get tasks and keep them updated
        async getTasks(){
            this.loading = true

            //used json server to create an endpoint
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()
           
            this.tasks = data
            this.loading = false
        },

        async addTask(task){
            //adding a new task to the tasks array
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-type' : 'application/json'}
            })

            if(res.error){
                console.log(res.error)
            }
        },
        async deleteTask(id){
            //updates the task array by setting it to a new array with the filtererd id
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if(res.error){
                console.log(res.error)
            }
        },
        async toggleFav(id){
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({isFav : task.isFav}),
                headers: {'Content-type' : 'application/json'}
            })

            if(res.error){
                console.log(res.error)
            }
        }
    }
})