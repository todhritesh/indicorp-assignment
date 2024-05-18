

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { fileSchema } from "./ToolsInventory"
import { MechanicLevel } from "@/constants/MechanicLevel"
import CustomSelect from "@/app-components/CustomSelect"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import client from "@/config/api"
import privateClient from "@/config/api"
import Spinner from "@/app-components/Spinner"
import { toast } from "react-toastify"

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    mechanicLevel: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    mobileNo: z.string().min(10, { message: "Mobile no. must have 10 digits" }).max(10, { message: "Mobile no. must have 10 digits" }),
    password: z.string().regex(passwordRegex, { message: "Password must be a combination of alphanumeric and special symbols" }),
    image: fileSchema,

})


function Register() {

    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        async function apiTest(){
            const res = await client.get("/api/test")
            console.log(res)
        }

        // apiTest()
    },[])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"email@gmail.com",
            mobileNo:"3423232323",
            name:"hello name",
            password:"pass@123",
            mechanicLevel:"Expert",
            image:""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
           

            const res = await privateClient.post("/mechanic/register",values,{
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                //   }
            })
            console.log(res,"hello")
            toast.success("Registered Successfully")

        } catch (e:any) {
            console.log("something went wrong")
            toast.error(e?.response?.data?.message||"Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container flex mx-auto justify-center my-12 px-2">
            {
                loading && <Spinner/>
            }
            <div className="md:w-[400px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Full Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobileNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile No.*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Mobile No." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mechanicLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Mechanic Level*</FormLabel>
                                    <FormControl>
                                        <CustomSelect title={"Mechanic Level"} items={MechanicLevel} props={field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Image*</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Password" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-sm">
                                        Password must be a combination of alphabets, numbers, and symbols
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-1 items-center justify-between">
                            <Button className="px-8" type="submit">Register</Button>
                            <FormDescription>
                                Already have account? <Link to={"/login"} className="pl-2 underline" >Login</Link>
                            </FormDescription>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Register