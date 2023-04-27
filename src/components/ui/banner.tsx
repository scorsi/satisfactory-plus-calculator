import { XMarkIcon } from "@heroicons/react/20/solid";
import { useBannerStore } from "~/stores/banner-store";

export const Banner = () => {
  const { isBannerDismissed, toggleBanner } = useBannerStore();

  if (isBannerDismissed) return null;

  return (
    <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-xs leading-6 text-slate-300">
        This website may contain invalid data or bugs. If you find any, please report it here.
      </p>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={toggleBanner}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
