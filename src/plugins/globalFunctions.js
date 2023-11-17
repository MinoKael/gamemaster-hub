function colorNav(pathName) {
    switch (pathName) {
        case 'home':
            return 'primary';
        case 'magias':
            return 'tormenta';
        case 'dice':
            return 'primary';
    }
}
function isDarkTheme(theme, item1, item2) {
    return theme.global.current.value.dark ? item1 : item2;
}
function toggleTheme(theme) {
    theme.global.name.value = theme.global.current.value.dark
        ? 'light'
        : 'dark';
}

export { colorNav, isDarkTheme, toggleTheme };
