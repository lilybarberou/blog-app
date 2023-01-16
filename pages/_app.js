import axios from 'axios';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/`;

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={globalTheme}>
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
    grey: '#787878',
    border: '1px solid #8D8D8D',
};

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Source Code Pro', monospace;
        padding-top: 25px;
        background: ${({ theme }) => theme.background};
        color: white;
    }

    * {
        margin: 0;
        padding: 0
    }

    a {
        text-decoration: none;
        color: white;
    }
`;

const S = {};
S.Container = styled.div`
    max-width: 1100px;
    padding: 0 40px;
    margin: auto;
`;
