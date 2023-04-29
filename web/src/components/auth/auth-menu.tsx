import { useSession, useUser } from "@clerk/nextjs";
import { LogOutIcon, LogInIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { AuthModal } from "~/components/auth/auth-modal";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

export const AuthMenu = () => {
  const { user, isSignedIn } = useUser();
  const { session } = useSession();

  const [formOpened, setFormOpened] = useState(false);

  if (isSignedIn) {
    return (
      <Menu as="div" className="relative ml-4 flex-shrink-0">
        <div>
          <Menu.Button
            className="group flex items-center gap-2 rounded-full bg-white text-sm ring-4 ring-white ring-opacity-20 hover:ring-0 focus:outline-none hover:p-1 hover:rounded-md mr-1 my-1 hover:m-0"
          >
            <span className="sr-only">Open user menu</span>
            <span className="hidden group-hover:block ml-3">
              {user?.username || user?.emailAddresses?.[0]?.emailAddress || ""}
            </span>
            <Image
              priority
              className="h-8 w-8 rounded-full"
              src={user?.profileImageUrl}
              width={32} height={32}
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <Menu.Item>
              <Link
                className="w-full text-slate-700 hover:text-indigo-700 hover:bg-gray-100 group flex gap-x-2 rounded-md py-2 px-3 text-xs leading-6 font-semibold items-center"
                href="/profile"
              >
                <UserIcon
                  className={"text-slate-600 group-hover:text-indigo-700 h-4 w-4 shrink-0"}
                  aria-hidden="true"
                />
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="w-full text-slate-700 hover:text-indigo-700 hover:bg-gray-100 group flex gap-x-2 rounded-md py-2 px-3 text-xs leading-6 font-semibold items-center"
                onClick={() => void session?.remove()}
              >
                <LogOutIcon
                  className={"text-slate-600 group-hover:text-indigo-700 h-4 w-4 shrink-0"}
                  aria-hidden="true"
                />
                Logout
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  return (
    <>
      <AuthModal open={formOpened} close={() => setFormOpened(false)} />
      <button
        className="bg-gray-50 text-indigo-600 group flex gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold items-center transition-all"
        onClick={() => setFormOpened(true)}
      >
        <div className="hidden group-hover:block pl-1">Login</div>
        <div className="h-6 w-6 flex items-center">
          <LogInIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </button>
    </>
  );
};
