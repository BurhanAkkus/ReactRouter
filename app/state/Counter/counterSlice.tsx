import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface CounterState{
    counter: number
}

const initialState: CounterState = {counter:0}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.counter +=1;
        },
        decrement: (state, action) => {
            state.counter -= 1;
        },
        increase: (state, action:PayloadAction<number>) => {
            state.counter += action.payload;
        },
        double: (state) => {
            state.counter *= 2;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {
            console.log("increaseAsync pending", state.counter);
        }).addCase(incrementAsync.fulfilled, (state, action:PayloadAction<number>) => {
          state.counter += action.payload;
      })
    }
})

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async(amount:number)=> {
        await new Promise(resolve => setTimeout(resolve,1000))
        return amount
    }
)

export const {increment,decrement,increase,double} = counterSlice.actions;
export default counterSlice.reducer;
