import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Searchbar = () => {
  return (
    <>
      <div className="mx-auto w-full">
        <label htmlFor="desktop-search" className="sr-only">
          Search
        </label>
        <div className="relative text-white focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="desktop-search"
            className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </div>
    </>
  );
};