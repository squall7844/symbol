"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export const ChangeTheme: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
