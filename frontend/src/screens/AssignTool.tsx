import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomSelect from "@/app-components/CustomSelect"
import { ToolsCategory } from "@/constants/ToolsCategory"
import { Checkbox } from "@/components/ui/checkbox"
import Spinner from "@/app-components/Spinner"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import privateClient from "@/config/api"

const tools = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
] as const


const formSchema = z.object({
    employee: z.string().min(1, {
        message: "Title must be at least 2 characters.",
    }),
    tools: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),

})


function AssignTool() {

    const [loading,setLoading] = useState(false)
    const [toolsData,setToolsData] = useState([])
    const [mechanicsData,setMechanicsData] = useState([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tools: [],
            employee: "",
        },
    })

    useEffect(()=>{

        async function getData() {
            try {
                setLoading(true)
            const toolRes = await privateClient.get("/tools/all")
            const mechanicRes = await privateClient.get("/mechanic/all")

            setToolsData(toolRes.data.map((item:any)=>({...item,value:item._id,displayName:item.toolTitle})))
            setMechanicsData(mechanicRes.data.map((item:any)=>({...item,value:item._id,displayName:item.name})))
            } catch (e) {
                toast.error("Something went wrong")
            } finally{
                setLoading(false)
            }
        }

        getData()

    },[])

    console.log(mechanicsData)
    console.log(toolsData)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // return 
        setLoading(true)
        try {
           

            const res = await privateClient.post("/assign-tool/add",values,{
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                //   }
            })
            console.log(res,"hello")
            toast.success("Tools Assigned Added Successfully")
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
                            name="employee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Tool Category</FormLabel>
                                    <FormControl>
                                        <CustomSelect title={"Tool Category"} items={mechanicsData} props={field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tools"
                            render={() => (
                                <FormItem>
                                    {toolsData.map((item:any) => (
                                        <FormField
                                            key={item?._id}
                                            control={form.control}
                                            name="tools"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item?._id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item?._id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item?._id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item?._id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item?.toolTitle} - 
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="px-8" type="submit">Assign</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AssignTool