import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const bannerDismissedAtom = atomWithStorage("bannerDismissed", false);

export const useBannerStore = () => {
  const [bannerDismissed, setBannerDismissed] = useAtom(bannerDismissedAtom);

  const toggleBanner = () => setBannerDismissed((state) => !state);

  return {
    isBannerDismissed: bannerDismissed,
    toggleBanner
  };
};
