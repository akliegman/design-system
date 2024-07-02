import tinyColor from "tinycolor2";

import { Color } from "@/global";

interface GenerateShadesProps {
  colors: Color[];
  step?: number;
}

const generateShades = ({ colors, step = 8 }: GenerateShadesProps) => {
  let shades = {};
  colors?.map((colorObj) => {
    const { color, shade, name } = colorObj;
    const colorName = name.toLowerCase();

    const colorInstance = tinyColor(color);

    let i = 100;
    while (i <= 1000) {
      if (i < shade) {
        const percentageToLighten = ((shade - i) / 100) * step;
        shades = {
          ...shades,
          [`${colorName}-${i}`]: colorInstance
            .clone()
            .lighten(percentageToLighten)
            .toString(),
        };
      } else if (i === shade) {
        shades = {
          ...shades,
          [`${colorName}-${i}`]: colorInstance.clone().toString(),
        };
      } else {
        const percentageToDarken = ((i - shade) / 100) * step;
        shades = {
          ...shades,
          [`${colorName}-${i}`]: colorInstance
            .clone()
            .darken(percentageToDarken)
            .toString(),
        };
      }
      i += 100;
    }
  });

  return shades;
};

const getColorVariables = (colors: Color[]) => {
  const shades = generateShades({ colors }) as Record<string, string>;
  let styles = {} as Record<string, string>;

  Object.entries(shades).forEach(([name, color]) => {
    styles[`--color-${name}`] = color;
  });

  colors.map((colorObj) => {
    const { color, shade, name } = colorObj;
    const colorName = name.toLowerCase();

    styles[`--color-${colorName}`] = color;
  });

  return styles;
};

export { generateShades, getColorVariables };
