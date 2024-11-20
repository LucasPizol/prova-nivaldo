import { ReactNode, useEffect, useState } from "react";
import { ScreenSize, ScreenSizeContext } from "./use-screen-size";

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
  });

  const getScreenSize = () => {
    const width = window.innerWidth;

    return {
      xs: width < 576,
      sm: width >= 576 && width < 768,
      md: width >= 768 && width < 992,
      lg: width >= 992,
    };
  };

  useEffect(() => {
    setScreenSize(getScreenSize());
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
