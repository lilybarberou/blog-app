import Link from 'next/link';
import styled from 'styled-components';

const Navigation = () => {
    return (
        <S.Container>
            <S.Logo href='/'>Lily Dev</S.Logo>
            <S.Links>
                <Link href='/posts/late'>Les late</Link>
                <S.CategoryLabel>
                    <span>Catégories</span>
                    <span className='arrow'></span>
                    <S.CategoriesContainer>
                        <S.Categories>
                            <Link href=''>Html</Link>
                            <Link href=''>Css</Link>
                            <Link href=''>Javascript</Link>
                            <Link href=''>React</Link>
                            <Link href=''>Next.js</Link>
                        </S.Categories>
                    </S.CategoriesContainer>
                </S.CategoryLabel>
            </S.Links>
        </S.Container>
    );
};

export default Navigation;

const S = {};
S.Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;
`;

S.Logo = styled(Link)`
    color: ${({ theme }) => theme.primary};
    font-size: 24px;
    margin-right: 100px;
`;

S.Links = styled.div`
    display: flex;
    gap: 40px;

    & > a {
        position: relative;
        padding: 2px 10px;

        &:hover::after {
            width: 100%;
        }
        &::after {
            transition: 0.3s;
            width: 0;
            background: ${({ theme }) => theme.primary};
            height: 100%;
            content: '';
            position: absolute;
            left: 0;
            z-index: -1;
        }
    }
`;

S.CategoryLabel = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover > div {
        display: flex;
    }

    & > span:first-child {
        pointer-events: none;
    }
    // arrow
    & > .arrow {
        display: block;
        border-top: 1px solid white;
        border-left: 1px solid white;
        height: 6px;
        width: 6px;
        transform: rotate(225deg);
    }
`;

S.CategoriesContainer = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    padding-top: 10px;
`;

S.Categories = styled.div`
    background: #ffffff24;
    width: 200px;
    height: 80px;
    padding: 10px;
    border: ${({ theme }) => theme.border};
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;
