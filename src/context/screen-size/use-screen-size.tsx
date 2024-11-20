import { createContext, useContext } from "react";

export interface ScreenSize {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
}

export const ScreenSizeContext = createContext<ScreenSize>({
  xs: false,
  sm: false,
  md: false,
  lg: false,
});

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);

  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }

  console.log(context);

  return context;
};
