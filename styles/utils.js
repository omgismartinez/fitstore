export const randomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    if (color.length === 6) {
        return `#${color}`;
    } else {
        return randomColor();
    }
}