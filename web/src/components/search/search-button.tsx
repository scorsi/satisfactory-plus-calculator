import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SearchBox } from "~/components/search/search-box";

export const SearchButton = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div
        className="group flex gap-x-2 rounded-md py-2 px-3 bg-white/40 text-indigo-600 cursor-pointer hover:bg-gray-50"
        onClick={() => setSearchOpen(true)}
      >
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        <span className="hidden group-hover:block">Search</span>
      </div>
      {searchOpen && (<SearchBox close={() => setSearchOpen(false)} />)}
    </>
  );
}
