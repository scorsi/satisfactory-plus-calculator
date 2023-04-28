import { classNames } from "~/utils/classNames";
import { mainNavigation } from "~/mainNavigation";

export const Navbar = () => {
  return (
    <nav className="flex space-x-4">
      {mainNavigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-50 text-indigo-600"
              : "text-slate-200 hover:text-indigo-600 hover:bg-gray-50",
            "group flex gap-x-2 rounded-md py-2 px-3 text-sm leading-6 font-semibold"
          )}
        >
          <item.icon
            className={classNames(
              item.current ? "text-indigo-600" : "text-slate-300 group-hover:text-indigo-600",
              "h-6 w-6 shrink-0"
            )}
            aria-hidden="true"
          />
          {item.name}
        </a>
      ))}
    </nav>
  );
};