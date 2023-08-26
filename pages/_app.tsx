import axios from 'axios';
import { AppProps } from 'next/app';
import Script from 'next/script';
import localFont from 'next/font/local';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/`;

const sourceCodePro = localFont({
    src: [
        { path: '../public/fonts/SourceCodePro/SourceCodePro-Regular.ttf', weight: '400' },
        { path: '../public/fonts/SourceCodePro/SourceCodePro-Medium.ttf', weight: '500' },
        { path: '../public/fonts/SourceCodePro/SourceCodePro-Bold.ttf', weight: '700' },
        { path: '../public/fonts/SourceCodePro/SourceCodePro-ExtraBold.ttf', weight: '800' },
    ],
    variable: '--font-source-code-pro',
});
const dmSans = localFont({
    src: [
        { path: '../public/fonts/DMSans/DMSans-Regular.ttf', weight: '400' },
        { path: '../public/fonts/DMSans/DMSans-Medium.ttf', weight: '500' },
        { path: '../public/fonts/DMSans/DMSans-Bold.ttf', weight: '700' },
    ],
    variable: '--font-dm-sans',
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={globalTheme}>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} strategy='afterInteractive' />
            <Script id='google-analytics' strategy='afterInteractive'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}}');
                `}
            </Script>
            <main className={`${sourceCodePro.className} ${sourceCodePro.variable} ${dmSans.variable}`}>
                <ToastContainer theme='dark' />
                <GlobalStyle />
                <S.Container>
                    <Navigation />
                    <Component {...pageProps} />
                </S.Container>
                <Footer />
            </main>
        </ThemeProvider>
    );
}

export default MyApp;

const globalTheme = {
    background: '#1A1A1E',
    primary: '#C64141',
    secondary: '#c5a186',
    grey: '#8F8F8F',
    border: '1px solid #8D8D8D',
};

const GlobalStyle = createGlobalStyle`
    html {
        scroll-behavior: smooth !important;
    }
    
    * {
        scroll-margin-top: 100px !important;
    }
    
    body {
        background: ${({ theme }) => theme.background};
        color: white;
    }

    h1, h2, h3, h4, h5, h6 {
        word-spacing: -5px;
    }

    input {
        --webkit-appearance: none;
        --moz-appearance: none;
        appearance: none;
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

const S: any = {};
S.Container = styled.div`
    max-width: 1150px;
    padding: 0 40px;
    margin: auto;

    @media (max-width: 750px) {
        padding: 0 20px;
    }
`;
