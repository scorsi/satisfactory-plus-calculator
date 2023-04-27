import { Fragment, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "~/utils/classNames";
import { useController } from "react-hook-form";
import { type UseControllerProps } from "react-hook-form/dist/types/controller";

type SelectProps =
  {
    label?: string;
    options: { id: string; name: string }[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  & UseControllerProps<any>;

export const Select = ({ label, options, name, control, rules }: SelectProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    field: { ref, value, onChange }
  } = useController({
    name,
    control,
    rules
  });

  const selected = useMemo(() => options.find((v) => v.id === value), [options, value]);

  return (
    <Listbox ref={ref} value={selected} onChange={(v) => onChange(v.id)}>
      {({ open }) => (
        <>
          {label &&
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>}
          <div className={classNames("relative", label && "mt-2")}>
            <Listbox.Button
              className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
