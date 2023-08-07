export const generateColor = () => {
    // random hue value between 0 and 360 (representing the color wheel)
    const hue = Math.floor(Math.random() * 360);

    // Keeping the saturation moderate (40-70)
    const saturation = Math.floor(Math.random() * 31) + 40

    // Keeping the lightness relatively low (20-40)
    const lightness = Math.floor(Math.random() * 31) + 40;

    // Convert HSL (Hue, Saturation Lightness) to RGB
    const rgb = hsbToRgb(hue, saturation, lightness);

    // Return the RGB color as a CSS-friendly string
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

const hsbToRgb = (h: number, s: number, l: number): number[] => {
    // Convert HSL to RGB
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2;

    let r, g, b;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x
    }

    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255),
    ];
}