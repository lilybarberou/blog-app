import Link from 'next/link';
import styled from 'styled-components';

type Props = {
    urls: {
        text: string;
        link: string;
    }[];
};

const RelatedArticles = (props: Props) => {
    const { urls } = props;
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

const S: any = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-left: 5px solid ${({ theme }) => theme.primary};
    margin: 40px 0;
    padding: 10px 0 15px 25px;

    p {
        font-family: 'Source Code Pro', monospace !important;
        color: ${({ theme }) => theme.primary} !important;
        font-size: 24px !important;
        font-weight: bold !important;
    }

    a {
        font-family: 'DM Sans', sans-serif;
        font-size: 17px;
    }
`;
