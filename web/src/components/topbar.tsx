import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Searchbar } from "~/components/searchbar";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Navbar } from "~/components/navbar";
import { AuthMenu } from "~/components/auth/auth-menu";
import { SearchButton } from "~/components/search/search-button";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

export const Topbar = () => {
  return (
    <Popover as="header" className="bg-indigo-600 pb-24">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex items-center justify-center py-5 lg:justify-between">
              <div
                className="text-white font-cabin text-3xl antialiased font-bold tracking-wider uppercase drop-shadow">
                SF+ Calculator
              </div>

              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                <AuthMenu />
              </div>

              <div className="min-w-0 flex-1 px-12 lg:hidden">
                <Searchbar />
              </div>

              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                <Popover.Button
                  className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
            <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
              <div className="flex items-center justify-between">
                <Navbar />
                <div>
                  <SearchButton />
                </div>
                {/*<div className="flex-grow">*/}
                {/*  <Searchbar />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                >
                  <div
                    className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pb-2 pt-3">
                      <div className="flex items-center justify-between px-4">
                        <div
                          className="text-indigo-600 font-cabin text-3xl antialiased font-bold tracking-wider uppercase drop-shadow">
                          SF+ Calculator
                        </div>
                        <div className="-mr-2">
                          <Popover.Button
                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        Navigation not compatible in mobile view
                      </div>
                    </div>
                    <div className="pb-2 pt-4">
                      <AuthMenu />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
};