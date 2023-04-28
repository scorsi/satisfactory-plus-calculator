import { type PropsWithChildren } from "react";
import { Footer } from "~/components/footer";
import { Topbar } from "~/components/topbar";


export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-full">
      <Topbar />
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="items-start gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">{children}</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
