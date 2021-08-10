export default function MaxStringCharacters(text, count) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
};

//Just a reusable function to add "..." after a string is too long.