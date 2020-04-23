<template>
	<div class='home'>
        <Header/>
        <Search shape="round"
                background="#4fc08d"
                v-model='thing' 
                @keyup.enter ='enterSubmit' 
                @blur="enterSubmit"/>
                <Tabs v-model="active">
                    <Tab title="全部事件">
                        <Cell   v-for="(todo , index) in TodoList" 
                                :key="index" :title="todo.thing" 
                                :icon="todo.isCompete?'success':'cross'" 
                                :value='todo.isCompete?"已完成":"未完成"'
                                @click="completeIt(todo)"
                                :value-class='todo.isCompete?"":"uncomplete"'/>
                    </Tab>
                    <Tab title="已做事件">
                        <Cell   v-for="(todo , index) in TodoList" 
                                :key="index" :title="todo.thing" 
                                :icon="todo.isCompete?'success':'cross'" 
                                :value='todo.isCompete?"已完成":"未完成"'
                                @click="completeIt(todo)"
                                :value-class='todo.isCompete?"":"uncomplete"'/>
                    </Tab>
                    <Tab title="未做事件">
                        <Cell   v-for="(todo , index) in TodoList" 
                                :key="index" :title="todo.thing" 
                                :icon="todo.isCompete?'success':'cross'" 
                                :value='todo.isCompete?"已完成":"未完成"'
                                @click="completeIt(todo)"
                                :value-class='todo.isCompete?"":"uncomplete"'/>
                    </Tab>
                </Tabs>
       
    </div>
</template>

<script>
import { Search , Cell  , Tab ,Tabs , Dialog  } from 'vant'
import {reactive,toRefs,computed ,getCurrentInstance,watch} from '@vue/composition-api'

import  Header  from '../components/header.vue'

export default {
	name: "home",
	setup(){
        const data = reactive({
            thing:'',
            isExit:false,
            active:0
        });
        const ctx = getCurrentInstance()
        // const todoList = ctx.$store.state.todoList;
        let todoList = []
        watch(()=>ctx.$store.state.todoList,vul=>{
                todoList=vul
                ctx.$forceUpdate()//解决数据改变，视图没有更新的情况
            })
        const TodoList = computed(()=>{
            if(data.active===0) return todoList;
            else if(data.active===1) return todoList.filter(itme=>itme.isCompete)
            else return todoList.filter(item=>!item.isCompete)
        })
        const completeIt = (todo) => {
            Dialog.confirm({
                title: todo.isCompete?'取消':'确认',
                message: todo.isCompete?'取消完成？':'确认完成？',
                })
                .then(() => {
                    todoList.forEach(item=>{
                        if(item.thing===todo.thing && todo.isCompete===false)item.isCompete=true
                        else if(item.thing===todo.thing && todo.isCompete===true)item.isCompete=false
                    })
                })
        }
        const enterSubmit=()=>{
            ctx.$store.dispatch('pushTodoList',{isExit:data.isExit,thing:data.thing})
        }
        return{
            ...toRefs(data),
            enterSubmit,TodoList,
            completeIt,
            todoList
        }
    },
    components:{
        Search,Cell,
        Header,Tab,
        Tabs
    }
};
</script>

<style lang="css" scoped>
.home{
    color: rgb(54, 75, 75);
}
.uncomplete{
    color:rgb(255, 0, 0);
    text-decoration: underline;
}
</style>