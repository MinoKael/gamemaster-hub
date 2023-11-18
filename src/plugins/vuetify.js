import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors: {
                    primary: '#FFB53B', // Yellow
                    secondary: '#8BCFF9', // Light Sky Blue
                    background: '#FFFCF8', // Light Cream
                    tormenta: '#AC262B', // Red Tormenta
                },
            },
            dark: {
                colors: {
                    primary: '#2B2343', // Dark Purple
                    secondary: '#5CBBF6', // Light Sky Blue
                    background: '#3B3B40', // Gray Onyx
                    tormenta: '#AC262B', // Red Tormenta
                },
            },
        },
    },
});
