import {useForm} from 'react-hook-form'

 const useAuthForm = ()=>{
    const {register, handleSubmit, formState: {errors}} = useForm()

    return {register, handleSubmit, errors}
}   

export default useAuthForm