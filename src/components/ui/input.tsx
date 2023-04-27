import { type UseControllerProps } from "react-hook-form/dist/types/controller";
import { useController } from "react-hook-form";
import { classNames } from "~/utils/classNames";

type InputProps =
  {
    label?: string;
  }
  & Partial<HTMLInputElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  & UseControllerProps<any>;

export const Input = ({ label, type, name, control, rules , ...propsRest }: InputProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    field: { ref, value, onChange, onBlur },
  } = useController({
    name,
    control,
    rules
  });

  return (
    <div>
      {label &&
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>}
      <div className={classNames(label && "mt-2")}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <input
          type={type}
          id={name}
          name={name}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ref={ref}
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          {...propsRest}
        />
      </div>
    </div>
  );
};
