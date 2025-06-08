import type { Route } from "./+types/Post";
import {useDispatch, useSelector} from "react-redux";
import type {Dispatch, RootState} from "~/state/store";
import {decrement, double, increase, increment, incrementAsync} from "~/state/Counter/counterSlice";

export async function loader({params}:Route.LoaderArgs){
    return params

}
export async function action(){

}


export default function Counter(){
    const count = useSelector((state:RootState) => state.counter.counter);
    const dispatch = useDispatch<Dispatch>();

    // @ts-ignore
    return (<div>Counter : {count}
            <button type='button' onClick={()=>dispatch(increment(null))}>Increment</button>
            <button type='button' onClick={()=>dispatch(decrement(null))}>Decrement</button>
            <button type='button' onClick={()=>dispatch(increase(2))}>Increase</button>
            <button type='button' onClick={()=>dispatch(double())}>Double</button>
            <button type='button' onClick={()=>dispatch(incrementAsync(12))}>incrementAsync</button>

    </div>)
}
