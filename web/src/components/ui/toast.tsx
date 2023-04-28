import { Transition } from "@headlessui/react";
import { resolveValue, ToastIcon, type Toast as ToastType } from "react-hot-toast";

type ToastProps = {
  toast: ToastType;
}

export const Toast = ({ toast: t }: ToastProps) => {
  return (
    <Transition
      appear
      show={t.visible}
      className="transform p-4 flex bg-white rounded shadow-lg"
      enter="transition-all duration-150"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <ToastIcon toast={t} />
      <p className="px-2">{resolveValue(t.message, t)}</p>
    </Transition>
  );
};
