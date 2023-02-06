import axios from 'axios';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Script from 'next/script';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/`;

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={globalTheme}>
            <Script src='https://www.googletagmanager.com/gtag/js?id=G-5DY6WZY9RQ' strategy='afterInteractive' />
            <Script id='google-analytics' strategy='afterInteractive'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-5DY6WZY9RQ');
                `}
            </Script>
            <ToastContainer />
            <GlobalStyle />
            <S.Container>
                <Navigation />
                <Component {...pageProps} />
            </S.Container>
            <Footer />
        </ThemeProvider>
    );
}

export default MyApp;

const globalTheme = {
    background: '#25262C',
    primary: '#C64141',
    secondary: '#c5a186',
    grey: '#8F8F8F',
    border: '1px solid #8D8D8D',
};

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Source Code Pro', monospace;
        padding-top: 25px;
        background: ${({ theme }) => theme.background};
        color: white;

        @media (max-width: 750px) {
            padding-top: 15px;
        }
    }

    p {
        /* font-family: 'Poppins', sans-serif; */
    }

    *::selection {
        color: #fff;
        background-color: ${({ theme }) => theme.primary};
    }

    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: white;
    }

    &::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #fff;
    }

    &::-webkit-scrollbar-track {
        border-radius: 0px;
        background-color: transparent;
    }
`;

const S = {};
S.Container = styled.div`
    max-width: 1100px;
    padding: 0 40px;
    margin: auto;

    @media (max-width: 750px) {
        padding: 0 20px;
    }
`;
