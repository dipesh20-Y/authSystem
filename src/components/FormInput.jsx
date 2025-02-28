export  const FormInput = ({label, placeholder, register, name,validation, error, type}) => {
    return (
        <div className=" mb-4">
            <div className="flex flex-col items-start">
            <label>{label}</label>
            <input
            className="border border-gray-400 p-2 w-80 my-2"
             type={type} 
             placeholder={placeholder} 
             {...register(name, validation)} 
             />
            {error && <p className="text-red-700">{error.message}</p>}
            </div>
        </div>
    )
}