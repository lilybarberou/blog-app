import Link from 'next/link';
import styled from 'styled-components';
import categories from '../contexts/categories.json';

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
                            {Object.keys(categories).map(cat => (
                                <Link  key={cat} href={`/posts/category/${cat.toLowerCase()}`}>{cat.toLowerCase()}</Link>
                            ))}
                        </S.Categories>
                    </S.CategoriesContainer>
                </S.CategoryLabel>
            </S.Links>
            <S.Search>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                    <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z' />
                </svg>
            </S.Search>
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
    text-transform: capitalize;
`;

S.Search = styled.div`
    margin-left: auto;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 33px;

    & > svg {
        fill: #fff;
        width: 15px;
    }
`;
