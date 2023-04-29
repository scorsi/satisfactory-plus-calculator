import { createElement, Fragment, type PropsWithChildren, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { type NextRouter, useRouter } from "next/router";
import { useLazyRef } from "~/hooks/use-lazy-ref";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { searchClient } from "~/client/algoliasearch";
import { createRoot, type Root } from "react-dom/client";
import { autocomplete, type AutocompleteOptions } from "@algolia/autocomplete-js";
import { RouterContext } from "next/dist/shared/lib/router-context";
import Link from "next/link";

type AutocompleteItemProps = {
  router: NextRouter;
  actions?: JSX.Element;
  item: Record<string, unknown>;
}

const AutocompleteItem = (props: PropsWithChildren<AutocompleteItemProps>) => {
  const { item, router, children, actions } = props;

  return (
    <RouterContext.Provider value={router}>
      <Link
        href={`/wiki/${item["type"] as string}s/${item["objectID"] as string}`}
        className="flex items-stretch justify-between px-2 py-1 hover:bg-gray-100 cursor-pointer"
      >
        <div className="flex items-center">
          <span>{item["type"] as string}</span>
          {" : "}
          <span className="[&>mark]:bg-transparent [&>mark]:font-bold">{children}</span>
        </div>
        {/*<div className="flex mr-1.5">*/}
        {/*  {actions}*/}
        {/*</div>*/}
      </Link>
    </RouterContext.Provider>
  );
};

const useQuerySuggestionsPlugin = (router: NextRouter) => {
  return useLazyRef(() =>
    createQuerySuggestionsPlugin({
      searchClient,
      indexName: "prod_main",
      transformSource: ({ source, onTapAhead }) => ({
        ...source,
        templates: {
          ...source.templates,
          item: ({ item, components }) => (
            <AutocompleteItem router={router} item={item}>
              <components.Highlight hit={item} attribute={["name"]} />
            </AutocompleteItem>
          )
        }
      })
    })
  );
};

const useRecentSearchesPlugin = (router: NextRouter) => {
  return useLazyRef(() =>
    createLocalStorageRecentSearchesPlugin({
      key: "recent-searches",
      limit: 5,
      transformSource: ({ source }) => ({
        ...source,
        templates: {
          item: ({ item }) => (
            <AutocompleteItem router={router} item={item}>
              {item.label}
            </AutocompleteItem>
          )
        }
      })
    })
  );
};

const Autocomplete = <TItem extends Record<string, unknown>>(props: Partial<AutocompleteOptions<TItem>>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelContainerRef = useRef<HTMLDivElement>(null);
  const panelRootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) return;

    const search = autocomplete({
      container: containerRef.current,
      panelContainer: panelContainerRef.current,
      renderer: {
        createElement,
        Fragment,
        render: () => { /* noop */
        }
      },
      render: ({ elements }) => {
        if (!panelRootRef.current) {
          if (!panelContainerRef.current) throw new Error("Panel container is not defined");
          panelRootRef.current = createRoot(panelContainerRef.current);
        }

        panelRootRef.current.render(
          <section>
            <div>
              <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-500">Recent searches</h2>
              {elements.recentSearchesPlugin}
            </div>
            <div className="border-t">
              {elements.querySuggestionsPlugin}
            </div>
          </section>
        );
      },
      classNames: ({
        form: "relative rounded-md flex-1",
        inputWrapperPrefix: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none pl-3",
        inputWrapperSuffix: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none pr-3",
        label: "flex items-center",
        submitButton: "h-5 w-5 text-gray-400",
        clearButton: "h-5 w-5 text-gray-400",
        input: "block w-full rounded-md border-gray-300 pl-10",
        panelLayout: "mt-4",
        item: ""
      }),
      ...props
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return (
    <section
      className="relative mx-auto max-w-xl p-2 transform rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
    >
      <div ref={containerRef} className="" />
      <div ref={panelContainerRef} className="" />
    </section>
  );
};

type SearchBoxProps = {
  close: () => void;
  url?: string;
}

export const SearchBox = (props: SearchBoxProps) => {
  const { close } = props;

  const router = useRouter();
  const querySuggestionsPlugin = useQuerySuggestionsPlugin(router);
  const recentSearchesPlugin = useRecentSearchesPlugin(router);

  return (
    <Transition.Root show={true} as={Fragment} appear>
      <Dialog as="div" className="relative z-100" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-100 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className=""
            >
              <Autocomplete
                placeholder="Search..."
                detachedMediaQuery="none"
                openOnFocus={true}
                plugins={[
                  recentSearchesPlugin(),
                  querySuggestionsPlugin(),
                ]}
                navigator={{
                  navigate: ({ itemUrl }) => {
                    void router.push(itemUrl)
                      .then(close);
                  }
                }}
                onSubmit={({state}) => {
                  void router.push("/wiki/search?q=" + state.query)
                    .then(close);
                }}
                initialState={{
                  query: router.query.q as string ?? "",
                }}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
