"use client";

import { Button, LinkButton } from "@/components/button";
import { IconButton, LinkIconButton } from "@/components/iconButton";

import { FaAlignJustify } from "react-icons/fa";

const HomeButton = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      <Button
        text="Primary Button"
        variant="primary"
        size="medium"
        radius="none"
        iconTrailing={FaAlignJustify}
      />
      <IconButton
        icon={FaAlignJustify}
        variant="secondary"
        size="medium"
        radius="pill"
        text="Icon Button"
      />
      <LinkButton
        text="Link Button"
        variant="tertiaryInverted"
        size="small"
        radius="large"
        iconLeading={FaAlignJustify}
        href="/?x=y"
        isDisabled
      />
      <LinkIconButton
        icon={FaAlignJustify}
        variant="none"
        size="large"
        radius="medium"
        text="Icon Link Button"
        href="/?z=a"
      />
    </div>
  );
};

export { HomeButton };
