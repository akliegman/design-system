"use client";

import { ColorsProvider } from "./colors";

import { ProvidersProps } from "./definitions";

const Providers = ({ children }: ProvidersProps) => {
  return <ColorsProvider>{children}</ColorsProvider>;
};

export { Providers };
