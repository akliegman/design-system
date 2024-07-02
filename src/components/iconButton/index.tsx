import { ButtonLayout, LinkButtonLayout } from "@/components/button/layout";

import { IconButtonContent } from "@/components/iconButton/content";

import { getButtonClassNames } from "@/components/button/utils";

import {
  IconButtonProps,
  LinkIconButtonProps,
} from "@/components/iconButton/definitions";

import styles from "@/components/button/styles.module.scss";

const IconButton = (props: IconButtonProps) => {
  return (
    <ButtonLayout
      {...props}
      className={getButtonClassNames(props, {
        isIconButton: true,
        styles: styles,
      })}
    >
      <IconButtonContent {...props} styles={styles} />
    </ButtonLayout>
  );
};

const LinkIconButton = (props: LinkIconButtonProps) => {
  return (
    <LinkButtonLayout
      {...props}
      className={getButtonClassNames(props, {
        isIconButton: true,
        styles: styles,
      })}
    >
      <IconButtonContent {...props} styles={styles} />
    </LinkButtonLayout>
  );
};

export { IconButton, LinkIconButton };
