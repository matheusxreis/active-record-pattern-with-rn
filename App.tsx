import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Todo } from './src/data/models/todo';

export default function App() {

  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(()=> {
    (async () => {
      getAll()  
    })()
  }, [])

  async function getAll() {
     const t = await Todo.findAll()
      console.log(t)
      setTodos(t)
  }
 async function handleAddTodos() {

    const todo = new Todo() 
    todo._id = String(Math.random());
    todo.text = text || 'Sem descrição'
    todo.done = false 
    todo.createdAt = Date.now();

    try {
      await todo.save()
      await getAll()
    }catch(err) {
      console.log(err)
    }
  }

 async function handleMarkTodo(id:string){
    const todo = await Todo.findBy({_id: id, text: "EU"})
    if(!todo) { console.log("not exist"); return; }
    await todo.update({done: !todo.done })
    await todo.save()
    await getAll()
 }
async function handleRemove(id:string){
    const todo = await Todo.findBy({_id: id })
    await todo.destroy()
    await getAll()
 }
  return (
    <View style={styles.container}>
        <View style={{flex:1, width:'100%'}}>

        <Text>Add a Todo</Text>
      
         <TextInput
            style={{height:30, width:'100%', borderWidth:2}}
           value={text}
           onChangeText={setText} 
          />
        <Button
          title='Add'
          onPress={handleAddTodos}
        />
        </View>

        <FlatList 
        data={todos}
        style={{flex:2}}
        renderItem={({item}) => (<View>
            <Button title="Mark" onPress={()=>handleMarkTodo(item._id)}/>
           <Text>{item.text} - {item.done ? 'DONE' : 'not done' }</Text>
        </View>)}
        />
    
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding:30
  },
});
