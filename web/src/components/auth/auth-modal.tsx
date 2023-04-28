import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import ClerkIcon from "../../../public/images/clerk-icon.svg";
import { classNames } from "~/utils/classNames";
import { SignUpForm } from "~/components/auth/sign-up/sign-up-form";
import { SignInForm } from "~/components/auth/sign-in/sign-in-form";

type AuthFormProps = {
  open: boolean;
  close: () => void;
}

export const AuthModal = (props: AuthFormProps) => {
  const { open, close } = props;

  const [type, setType] = useState<"signIn" | "signUp">("signIn");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-slate-100 px-12 py-14 w-96 shadow-xl transition-all flex flex-col justify-center gap-10"
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Authenticate
                  </h2>

                  <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                          className={classNames(
                            type === "signIn"
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium"
                          )}
                          onClick={() => setType("signIn")}
                        >
                          Sign In
                        </button>
                        <button
                          className={classNames(
                            type === "signUp"
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium"
                          )}
                          onClick={() => setType("signUp")}
                        >
                          Sign Up
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>

                <div>
                  {type === "signIn" ? <SignInForm onDone={close} /> : <SignUpForm onDone={close} />}
                </div>

                <a
                  href="https://clerk.dev"
                  className="text-xs text-slate-400 text-center flex flex-row items-center justify-center gap-0.5"
                >
                  <span>secured by</span>
                  <Image
                    priority
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={ClerkIcon}
                    alt="Clerk Icon"
                    className="h-4 w-4 opacity-75"
                  />
                </a>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};