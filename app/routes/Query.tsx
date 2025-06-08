import type { Route } from "./+types/Post";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {addTodo, fetchTodos} from "~/api/toDo";
import {useState} from "react";

export async function loader({params}:Route.LoaderArgs){
    return params

}
export async function action(){

}


export default function Query(){

    const [title,setTitle] = useState('');
    const [search, setSearch] = useState('');

    const queryClient = useQueryClient();
    const {data:todos,isLoading} = useQuery({
        queryFn: () => fetchTodos(search),
        queryKey: ["todos",{search}],
    })

    const {mutateAsync: addToDoMutation} = useMutation({
        mutationFn: addTodo,
        onSuccess :(todos) =>{
            queryClient.invalidateQueries(["todos"]);
        }
    })

    if(isLoading){
        return <div>Loading...</div>
    }
    return (<div>
        <div>
            <input type="text"
                   onChange={(e) =>  setTitle(e.target.value)}
                   value={title}>
            </input>
            <button type='button' onClick={async () => {
                try{
                    await addToDoMutation({title:title});
                    setTitle("")
                }
                catch(e){
                    console.error(e);
                }
            }}>Add ToDo</button>
        </div>
        {todos?.map((todo) => {
        return <p>{todo.title}</p>
    })}</div>)
}
