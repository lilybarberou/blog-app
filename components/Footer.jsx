import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => {
    const copyDiscord = () => {};

    return (
        <S.Container>
            <S.Content>
                <S.LeftContent>
                    <S.Logo>Lily Dev</S.Logo>
                    <span>Merci de me lire !</span>
                    <span>@2023-present Lily Barberou. All Rights Reserved</span>
                </S.LeftContent>
                <S.RightContent>
                    <S.Column>
                        <span>Des catégories</span>
                        <Link href=''>Html</Link>
                        <Link href=''>Css</Link>
                        <Link href=''>React</Link>
                        <Link href=''>Javascript</Link>
                    </S.Column>
                    <S.Column>
                        <span>Des liens</span>
                        <Link href='mailto:lily.barberou@gmail.com'>Contact</Link>
                        <span onClick={copyDiscord}>Discord</span>
                        <Link href='https://github.com/Nahay'>Github</Link>
                        <Link href=''>Term</Link>
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
`;

S.Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1100px;
    padding: 0 40px;

    & > div {
        display: flex;
    }
`;

S.LeftContent = styled.div`
    display: flex;
    flex-direction: column;

    & > span:last-child {
        margin-top: auto;
        font-size: 13px;
    }
`;

S.RightContent = styled.div`
    display: flex;
    gap: 100px;
`;

S.Logo = styled.span`
    color: ${({ theme }) => theme.primary};
    font-size: 24px;
    margin-bottom: 10px;
`;

S.Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;

    & > span:first-child {
        color: ${({ theme }) => theme.primary};
        font-size: 16px;
        margin-bottom: 10px;
    }
`;
