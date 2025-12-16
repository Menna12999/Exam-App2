import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";


interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export default function InputField({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  

}: InputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field,fieldState }) => (
        <FormItem className="mb-4">
          <FormLabel className="font-mono text-base text-gray-800">{label}</FormLabel>

          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className={`border rounded-none border-gray-200 p-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${fieldState.error ? "border-red-600" : ""}`}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
