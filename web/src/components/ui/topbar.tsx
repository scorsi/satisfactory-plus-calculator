import { BellIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export const Topbar = () => {
  const [height, setHeight] = useState("64px");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setHeight(`${ref.current?.offsetHeight ?? 64}px`);
  }, [ref.current?.offsetHeight]);

  return (
    <>
      <header ref={ref} className="shrink-0 bg-slate-900 shadow-lg fixed w-full">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div
            className="text-slate-300 font-cabin text-3xl antialiased font-bold tracking-wider uppercase drop-shadow">
            SF+ Calculator
          </div>
          <div className="flex items-center gap-x-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your profile</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </a>
          </div>
        </div>
      </header>
      <div style={{ height }} />
    </>
  );
};
