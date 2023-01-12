import axios from 'axios';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/`;

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={globalTheme}>
            <Component {...pageProps} />
            <GlobalStyle />
        </ThemeProvider>
    );
}

export default MyApp;

const globalTheme = {};

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Poppins', sans-serif;
        display: flex;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }

    * {
        margin: 0;
        padding: 0
    }

    a {
        text-decoration: none;
    }
`;
