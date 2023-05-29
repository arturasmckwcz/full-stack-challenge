export interface RGB {
  red: number;
  green: number;
  blue: number;
}

export const cssColorToRGB = (computedColor: string): RGB => {
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/;
  const hexRegex = /#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;
  const hslRegex = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)/;

  let match: RegExpMatchArray | null;

  // Check if the computedColor is in the RGB format
  match = computedColor.match(rgbRegex) || computedColor.match(rgbaRegex);
  if (match) {
    const red = Number(match[1]);
    const green = Number(match[2]);
    const blue = Number(match[3]);

    return { red, green, blue };
  }

  // Check if the computedColor is in the HSL format
  match = computedColor.match(hslRegex);
  if (match) {
    const hue = parseFloat(match[1]);
    const saturation = parseFloat(match[2]) / 100;
    const lightness = parseFloat(match[3]) / 100;

    const hslToRgb = (h: number, s: number, l: number): number[] => {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0,
        g = 0,
        b = 0;

      if (0 <= h && h < 60) {
        r = c;
        g = x;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
      } else if (120 <= h && h < 180) {
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        b = x;
      }

      const red = Math.round((r + m) * 255);
      const green = Math.round((g + m) * 255);
      const blue = Math.round((b + m) * 255);

      return [red, green, blue];
    };

    const [red, green, blue] = hslToRgb(hue, saturation, lightness);
    return { red, green, blue };
  }

  // Check if the computedColor is in the hexadecimal format
  match = computedColor.match(hexRegex);
  if (match) {
    let hexValue = match[1];

    if (hexValue.length === 3) {
      hexValue = hexValue.replace(/./g, '$&$&');
    }

    const red = parseInt(hexValue.substring(0, 2), 16);
    const green = parseInt(hexValue.substring(2, 4), 16);
    const blue = parseInt(hexValue.substring(4, 6), 16);

    return { red, green, blue };
  }

  throw new Error('Invalid color format');
};

export const isColorCloseToRGB = (
  rgb: RGB,
  colorString: string,
  closenessThreshold: number = 0.4,
): boolean => {
  const { red, green, blue } = cssColorToRGB(colorString);

  // Calculate the closeness thresholds for each color component
  const redThreshold = Math.round(closenessThreshold * 255);
  const greenThreshold = Math.round(closenessThreshold * 255);
  const blueThreshold = Math.round(closenessThreshold * 255);

  // Check if the difference between the RGB values is within the closeness thresholds
  const isRedClose = Math.abs(rgb.red - red) <= redThreshold;
  const isGreenClose = Math.abs(rgb.green - green) <= greenThreshold;
  const isBlueClose = Math.abs(rgb.blue - blue) <= blueThreshold;

  // Return true if all color components are close, otherwise false
  return isRedClose && isGreenClose && isBlueClose;
};
