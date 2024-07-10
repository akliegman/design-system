import { AriaLinkOptions } from "react-aria";
import { Link as ReactAriaLink } from "react-aria-components";

import { CustomIconButtonProps } from "@/components/buttons/IconButton";
import { IconButtonContent } from "@/components/buttons/IconButtonContent";
import { getButtonClassNames } from "@/components/buttons/utils/getButtonClassNames";

import styles from "@/components/buttons/styles.module.scss";

export interface LinkIconButtonProps
  extends CustomIconButtonProps,
    AriaLinkOptions {
  href: string;
}

export const LinkIconButton = (props: LinkIconButtonProps) => {
  return (
    <ReactAriaLink
      {...props}
      className={getButtonClassNames(props, {
        isIconButton: true,
        styles: styles,
      })}
    >
      <IconButtonContent {...props} styles={styles} />
    </ReactAriaLink>
  );
};
