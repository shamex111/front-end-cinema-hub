import { userService } from "@/services/user.service"
import { IUser, IUserEditInput } from "@/types/user.types"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"

export const useProfileChange = (
user: any
) => {
    const {mutateAsync} = useMutation({
        mutationKey:['change user data'],
        mutationFn:(data:IUserEditInput) => userService.update(user.id,data),
        onSuccess() {
            toast.success('Вы успешно изменили свои данные!')
        },
        onError(error:any){
            if(error?.response?.data?.message) {
                toast.error(error.response.data.message)
            }else {
                toast.error('Ошибка')
            }
        }
    })
    const onSubmit: SubmitHandler<IUserEditInput> = async data => {
        await mutateAsync(data)
    }
    return {onSubmit}
}