interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  Icon,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      {Icon && (
        <Icon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
      )}
      <input
        className="bg-transparent rounded-3xl w-full h-10 focus:outline-none ring-2 transition ring-neutral-200 focus:ring-neutral-300 border-none placeholder:text-neutral-400 px-8 focus:ring-2 focus:shadow-[inset_0_0_0_2px] focus:shadow-slate-200"
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
