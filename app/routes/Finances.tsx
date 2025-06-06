import type { Route } from "./+types/Post";
import {type SubmitHandler, useForm} from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

export async function loader({params}:Route.LoaderArgs){
    return params

}
export async function action(){

}

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type formFields = z.infer<typeof schema>
export default function Finances({params}:Route.LoaderArgs){

    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm<formFields>({
        defaultValues:{
            email:"darari@barari.carari",
        },
        resolver: zodResolver(schema)
    });
    const onSubmit: SubmitHandler<formFields> = async (data)=>{
        try {
            await new Promise(resolve => {
                setTimeout(resolve, 1000)
            });
            throw new Error()
            console.log(data);
        }
        catch(error){
            setError("root",{
                message:"Yarra yedin",
            })
        }
    }
    // @ts-ignore
    return (<>
            <div>Finances</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email",{
                        required:"Email is required",
                        pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Please enter valid email address"},
                        validate: (value) => value.includes("burhan")
                        })}
                    type="text" placeholder="Email" name="email" required />
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                <input
                    {...register("password",{
                            required:"Password is required",
                        minLength:{value:6,
                        message:"Password must be at least 6 characters"},
                        })} type="password" placeholder="Password" name="password" required />
                {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                {errors.root && <div className="text-red-500">{errors.root.message}</div>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting?"submitting":"submit"}
                </button>
            </form>
        </>
    )
}
