import tinyColor from "tinycolor2";

export interface Colors {
  [key: string]: { COLOR: string; SHADE: number };
}

interface GenerateShadesProps {
  colors: Colors;
  step?: number;
}

const generateShades = ({ colors, step = 8 }: GenerateShadesProps) => {
  let shades = {};
  Object.entries(colors).forEach(([name, colorProps]) => {
    const { COLOR: color, SHADE: shade } = colorProps;
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

const setColors = (colors: Colors) => {
  const shades = generateShades({ colors }) as Record<string, string>;
  let styles = {} as Record<string, string>;

  Object.entries(shades).forEach(([name, color]) => {
    styles[`--color-${name}`] = color;
  });

  Object.entries(colors).forEach(([name, colorProps]) => {
    const { COLOR: color, SHADE: shade } = colorProps;
    const colorName = name.toLowerCase();

    styles[`--color-${colorName}`] = color;
  });

  return styles;
};

export { generateShades, setColors };
