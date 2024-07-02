"use client";

import { ButtonContent } from "./content";
import { ButtonLayout, LinkButtonLayout } from "./layout";
import { getButtonClassNames } from "./utils";

import { ButtonProps, LinkButtonProps } from "./definitions";

import styles from "./styles.module.scss";

const Button = (props: ButtonProps) => {
  return (
    <ButtonLayout
      {...props}
      className={getButtonClassNames(props, { styles: styles })}
    >
      <ButtonContent {...props} styles={styles} />
    </ButtonLayout>
  );
};

const LinkButton = (props: LinkButtonProps) => {
  return (
    <LinkButtonLayout
      {...props}
      className={getButtonClassNames(props, { styles: styles })}
    >
      <ButtonContent {...props} styles={styles} />
    </LinkButtonLayout>
  );
};

export { Button, LinkButton };
