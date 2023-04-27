import { type PropsWithChildren } from "react";
import { Sidebar } from "~/components/ui/sidebar";
import { Topbar } from "~/components/ui/topbar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section>
      <Sidebar />

      <div className="lg:pl-20">
        <Topbar />

        <main className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          {children}
        </main>
      </div>
    </section>
  );
};
