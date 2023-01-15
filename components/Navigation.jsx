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
    margin-bottom: 50px;
`;

S.Logo = styled(Link)`
    color: ${({ theme }) => theme.primary};
    font-size: 24px;
    margin-right: 100px;
`;

S.Links = styled.div`
    display: flex;
    gap: 40px;
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
