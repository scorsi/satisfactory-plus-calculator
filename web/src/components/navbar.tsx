import { classNames } from "~/utils/classNames";
import { mainNavigation } from "~/client/mainNavigation";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex space-x-4">
      {mainNavigation.map((item) => {
        const current = item.href === "/" ? router.pathname === "/" : router.pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              current
                ? "bg-gray-50 text-indigo-600"
                : "text-slate-200 hover:text-indigo-600 hover:bg-gray-50",
              "group flex gap-x-2 rounded-md py-2 px-3 text-sm leading-6 font-semibold"
            )}
          >
            <item.icon
              className={classNames(
                current ? "text-indigo-600" : "text-slate-300 group-hover:text-indigo-600",
                "h-6 w-6 shrink-0"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};