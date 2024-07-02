"use client";

import { useRef } from "react";
import { useButton, useLink } from "react-aria";
import Link from "next/link";

import { ButtonProps, LinkButtonProps } from "./definitions";

const ButtonLayout = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref) as any; // TODO: Fix this type

  return (
    <button {...buttonProps} className={props?.className} ref={ref}>
      {props?.children}
    </button>
  );
};

const LinkButtonLayout = (props: LinkButtonProps) => {
  const { isDisabled } = props;
  const ref = useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink(props, ref);

  return (
    <Link
      {...linkProps}
      href={props?.href}
      passHref
      ref={ref}
      className={props.className}
      aria-disabled={isDisabled}
    >
      {props.children}
    </Link>
  );
};

export { ButtonLayout, LinkButtonLayout };
