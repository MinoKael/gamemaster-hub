import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            light: {
                colors: {
                    primary: '#FFB53B',
                    secondary: '#5CBBF6',
                    background: '#F8F7F5',
                    tormenta: '#CE2A28',
                },
            },
            dark: {
                colors: {
                    primary: '#2B2343',
                    secondary: '#5CBBF6',
                    background: '#3A3A3A',
                    tormenta: '#D32F2F',
                },
            },
        },
    },
});
