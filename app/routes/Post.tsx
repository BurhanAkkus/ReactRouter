import type { Route } from "./+types/Post";

export async function clientLoader({params}:Route.LoaderArgs){

    const postId = params.postId;
    const res = await  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    return await res.json()

}
export async function action(){

}


export default function Post({res}:Route.ComponentProps) {
    return (<div>Post{res}</div>)
}
