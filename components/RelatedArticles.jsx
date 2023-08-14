import Link from 'next/link';
import styled from 'styled-components';

const RelatedArticles = ({ urls }) => {
    if (!urls) return null;

    return (
        <S.Container>
            <p>À lire aussi</p>
            {urls.map((url) => (
                <Link href={url.link} key={url.link}>
                    {url.text}
                </Link>
            ))}
        </S.Container>
    );
};

export default RelatedArticles;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-left: 5px solid ${({ theme }) => theme.primary};
    margin: 40px 0;
    padding: 10px 0 15px 25px;

    p {
        font-family: 'Source Code Pro', monospace;
        font-weight: bold;
        font-size: 24px;
        color: ${({ theme }) => theme.primary};
    }

    a {
        font-family: 'DM Sans', sans-serif;
        font-size: 17px;
    }
`;
