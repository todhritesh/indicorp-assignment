import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const CustomSelect = ({title="",items=[],props}:{items:any[],props:any,title:string}) => {
    return (
        <Select onValueChange={props?.onChange} defaultValue={props?.value}>
            <SelectTrigger >
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {
                    items?.map(s => (
                        <SelectItem key={s._id} value={s.value}>{s.displayName}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

export default CustomSelect