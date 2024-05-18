

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
import { useState } from "react"
import privateClient from "@/config/api"
import { toast } from "react-toastify"
import Spinner from "@/app-components/Spinner"

const MAX_FILE_SIZE = 2000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export const fileSchema = z.any().optional()
.refine(file => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
.refine(file => file?.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 8MB.')


const formSchema = z.object({
    toolTitle: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    toolCount: z.string().min(1, {
        message: "Count is required",
    }),
    toolCategory: z.string().min(2, {
        message: "Title Category must be at least 2 characters.",
    }),
    toolImage: fileSchema,

})


function ToolsInventory() {

    const [loading,setLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            toolCategory:"",
            toolImage:"",
            toolCount:""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
           

            const res = await privateClient.post("/tools/add",values,{
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                //   }
            })
            console.log(res,"hello")
            toast.success("Tools Added Successfully")
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
                            name="toolTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tool Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toolCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Count*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tool Count" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toolCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Tool Category</FormLabel>
                                    <FormControl>
                                        <CustomSelect title={"Tool Category"} items={ToolsCategory} props={field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toolImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tool Image*</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="px-8" type="submit">Add</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ToolsInventory