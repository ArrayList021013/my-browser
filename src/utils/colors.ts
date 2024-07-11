export const getColorBrightness = (color: string) => {
  let r: number;
  let g: number;
  let b: number;

  if (color.match(/^rgb/)) {
    const match = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,);

      r = match && match[1] ? parseInt(match[1], 10) : 0;
      g = match && match[2] ? parseInt(match[2], 10) : 0;
      b = match && match[3] ? parseInt(match[3], 10) : 0;
  } else {
    const num = +(color.length < 5 ?
      `0x${color.slice(1).replace(/./g, '$&$&')}` :
      `0x${color.slice(1)}`);

    r = num >> 16;
    g = (num >> 8) & 255;
    b = num & 255;
  }

  return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
};

const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (rgba: number[]) => {
  return ('#' + 
    componentToHex(Math.round(rgba[0])) +
    componentToHex(Math.round(rgba[1])) +
    componentToHex(Math.round(rgba[2]))
  );
};

export const hexToRgb = (hex: any) => {
  // expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m: any, r: any, g: any, b:any) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};