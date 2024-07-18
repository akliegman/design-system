import tinyColor from "tinycolor2";

import { Color } from "@/global";

interface GenerateShadesProps {
  colors: Color[];
  step?: number;
}

const generateShades = ({ colors, step = 5 }: GenerateShadesProps) => {
  let shades = {};
  colors?.map((colorObj) => {
    const { color, name } = colorObj;
    const shade = 700;
    const colorName = name.toLowerCase();

    let colorInstance = tinyColor(color);
    const targetBrightness = 128 / 255;
    const currentBrightness = colorInstance.getBrightness() / 255;

    if (currentBrightness < targetBrightness) {
      while (colorInstance.getBrightness() / 255 < targetBrightness) {
        colorInstance = colorInstance.lighten(0.05);
      }
    } else {
      while (colorInstance.getBrightness() / 255 > targetBrightness) {
        colorInstance = colorInstance.darken(0.05);
      }
    }
    let multiplier = 10;
    let color50 = colorInstance.clone().lighten(multiplier * step);

    // if white, darken a tiny bit
    let i1 = 0;
    while (color50.getBrightness() > 240) {
      color50 = colorInstance.clone().lighten((multiplier - i1) * step);
      i1 += 0.01;
    }
    shades = {
      ...shades,
      [`${colorName}-50`]: color50.toString(),
    };

    let i = 100;
    while (i <= 1500) {
      if (i < shade) {
        const percentageToLighten = ((shade - i) / 100) * step;
        shades = {
          ...shades,
          [`${colorName}-${i}`]: colorInstance.clone().lighten(percentageToLighten).toString(),
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
          [`${colorName}-${i}`]: colorInstance.clone().darken(percentageToDarken).toString(),
        };
      }
      i += 100;
    }
  });

  return shades;
};

const getColorVariables = (colors: Color[]) => {
  const shades = generateShades({ colors }) as Record<string, string>;

  // reduce shades to object formatted variant: { [shade]: color, ... }
  const shadesObject = Object.entries(shades).reduce(
    (acc, [key, value]) => {
      const [colorName, shade] = key.split("-");
      if (!acc[colorName]) {
        acc[colorName] = {};
      }
      acc[colorName][shade] = value;
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );
  let styles = {} as Record<string, string>;

  Object.entries(shades).forEach(([name, color]) => {
    styles[`--color-${name}`] = color;
  });

  colors.map((colorObj) => {
    const { color, name } = colorObj;
    const colorName = name.toLowerCase();

    styles[`--color-${colorName}`] = color;
  });

  return { colorsVars: styles, colorsJson: shadesObject };
};

export { generateShades, getColorVariables };
