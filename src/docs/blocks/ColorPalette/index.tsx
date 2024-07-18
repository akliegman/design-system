import { ColorPalette as ColorBlock, ColorItem } from "@storybook/blocks";
import { Fragment } from "react";

import { getColorVariables } from "@/utils/colors";

import { colors as data } from "../../../../data";

export const ColorPalette = () => {
  const { colorsJson: colors } = getColorVariables(data);

  return (
    <ColorBlock>
      {colors &&
        Object.entries(colors).map(([name, value]) => {
          let allColors = Object.entries(value).reduce(
            (acc, [key, value]) => {
              acc[key] = value;
              return acc;
            },
            {} as Record<string, string>,
          );

          const half = Math.ceil(Object.keys(allColors).length / 2);
          const lightColors = Object.fromEntries(Object.entries(allColors).slice(0, half));

          const darkColors = Object.fromEntries(Object.entries(allColors).slice(half));

          let lightColorsTitle = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

          return (
            <Fragment key={name}>
              <ColorItem title={lightColorsTitle} subtitle={""} colors={lightColors} />
              <ColorItem title={""} subtitle={""} colors={darkColors} />
            </Fragment>
          );
        })}
    </ColorBlock>
  );
};
