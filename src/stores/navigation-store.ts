import { atom, useAtom } from "jotai";

const isNavigationOpenAtom = atom(false);

export const useNavigationStore = () => {
  const [isNavOpen, setIsNavOpen] = useAtom(isNavigationOpenAtom);

  const toggleNav = () => setIsNavOpen((state) => !state);
  const closeNav = () => setIsNavOpen(false);
  const openNav = () => setIsNavOpen(true);

  return {
    isNavOpen,
    toggleNav,
    closeNav,
    openNav,
  };
};