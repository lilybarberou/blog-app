import Link from 'next/link';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Footer = () => {
    const copyDiscord = () => {
        navigator.clipboard.writeText('Lily.#7476');
        toast.success('Pseudo discord copié');
    };

    return (
        <S.Container>
            <S.Content>
                <S.LeftContent>
                    <S.Logo as={Link} href='/'>
                        LilyScript
                    </S.Logo>
                    <span>Merci de me lire !</span>
                    <span>@{new Date().getFullYear()}-present Lily Barberou. All Rights Reserved</span>
                </S.LeftContent>
                <S.RightContent>
                    <S.Column>
                        <span>Des catégories</span>
                        <Link href='/posts/category/react'>React</Link>
                        <Link href='/posts/category/js'>Javascript</Link>
                        <Link href='/posts/category/nextjs'>Next.Js</Link>
                        <Link href='/posts/category/css'>Css</Link>
                    </S.Column>
                    <S.Column>
                        <span>Des liens</span>
                        <Link href='mailto:lily.barberou@gmail.com'>Contact</Link>
                        <span className='discord' onClick={copyDiscord}>
                            Discord
                        </span>
                        <Link target='_blank' rel='noopener noreferrer' href='https://github.com/Nahay'>
                            Github
                        </Link>
                        <Link href='/'>Term</Link>
                    </S.Column>
                </S.RightContent>
            </S.Content>
        </S.Container>
    );
};

export default Footer;

const S = {};
S.Container = styled.div`
    display: flex;
    justify-content: center;
    border-top: ${({ theme }) => theme.border};
    padding: 40px 0;
    width: 100%;
    margin-top: 100px;

    @media (max-width: 750px) {
        margin-top: 70px;
        padding: 20px 0;
    }
`;

S.Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1100px;
    padding: 0 40px;
    gap: 30px 20px;

    & > div {
        display: flex;
    }

    @media (max-width: 750px) {
        padding: 0 20px;
    }
`;

S.LeftContent = styled.div`
    display: flex;
    flex-direction: column;

    & > span:last-child {
        margin-top: auto;
        font-size: 13px;

        @media (max-width: 750px) {
            font-size: 12px;
            margin-top: 5px;
        }
    }
`;

S.RightContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px 100px;
`;

S.Logo = styled.span`
    color: ${({ theme }) => theme.primary};
    font-size: 24px;
    margin-bottom: 10px;

    @media (max-width: 750px) {
        font-size: 20px;
    }
`;

S.Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;

    > span:first-child {
        color: ${({ theme }) => theme.primary};
        font-size: 16px;
        margin-bottom: 10px;
    }
    a {
        transition: 0.2s;

        :hover {
            color: ${({ theme }) => theme.primary};
        }
    }
    .discord {
        cursor: pointer;
    }

    @media (max-width: 750px) {
        font-size: 15px;
    }
`;
