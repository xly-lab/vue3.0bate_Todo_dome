import Vue from 'vue'
import Vuex from 'vuex'

import { Toast} from 'vant'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        todoList:[],
        isExit:false
    },
    mutations:{
        push_todoList(state,data){
            if(state.todoList.length>=1){
                state.todoList.forEach(thing=>{ 
                    if(thing.thing===data.todoThing.thing){
                        data.isExit = true ;
                        return Toast.fail('已添加改事件');                           
                    }               
                })
                if(!data.isExit){
                    state.todoList.push(data.todoThing)
                }
            }else state.todoList.push(data.todoThing)

        }
    },
    actions:{
        pushTodoList({commit},data){
            console.log(data)
            data.isExit = false
            let todoThing = {
                    thing:data.thing,
                    isCompete:false
                }
            if(data.thing==='')return
            // if(data.todoList.length>=1){
            //     data.todoList.forEach(thing=>{ 
            //         if(thing.thing===data.thing){
            //             data.isExit = true ;
            //             return Toast.fail('已添加改事件');                           
            //         }               
            //     })
            //     if(!data.isExit){
            //         data.todoList.push(todoThing)
            //     }
            // }else data.todoList.push(todoThing)
            commit('push_todoList',{todoThing,isExit:data.isExit})
        }
    }
})