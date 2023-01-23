import Link from 'next/link';
import styled from 'styled-components';
import categories from '../contexts/categories.json';

const Navigation = () => {
    const handleMobileMenu = () => {
        const el = document.querySelector('#mobile-menu');
        el.classList.toggle('active');
        document.body.style.overflowY = el.classList.contains('active') ? 'hidden' : 'unset';
    };

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
                            {Object.entries(categories).map(([key, value]) => (
                                <Link key={key} href={`/posts/category/${key.toLowerCase()}`}>
                                    {value.name}
                                </Link>
                            ))}
                        </S.Categories>
                    </S.CategoriesContainer>
                </S.CategoryLabel>
            </S.Links>
            <S.Search>
                <S.Icon>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z' />
                    </svg>
                </S.Icon>
            </S.Search>
            <S.MobileMenu>
                <S.Icon onClick={handleMobileMenu}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                        <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
                    </svg>
                </S.Icon>
                <S.MobileMenuContent id='mobile-menu'>
                    <S.MobileMenuHeader>
                        <S.Logo onClick={handleMobileMenu} href='/'>
                            Lily Dev
                        </S.Logo>
                        <S.Icon onClick={handleMobileMenu}>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                                <path d='M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z' />
                            </svg>
                        </S.Icon>
                    </S.MobileMenuHeader>
                    <Link onClick={handleMobileMenu} href='/posts/late'>
                        Les late
                    </Link>
                    <span>Les catégories</span>
                    <S.MobileCategories>
                        {Object.entries(categories).map(([key, value]) => (
                            <Link onClick={handleMobileMenu} key={key} href={`/posts/category/${key.toLowerCase()}`}>
                                {value.name}
                            </Link>
                        ))}
                    </S.MobileCategories>
                </S.MobileMenuContent>
            </S.MobileMenu>
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

    @media (max-width: 750px) {
        margin-bottom: 50px;
    }
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

    @media (max-width: 750px) {
        display: none;
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
    padding: 10px;
    border: ${({ theme }) => theme.border};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px 40px;

    & > a {
        position: relative;
        padding: 2px 5px;
        width: fit-content;

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

    @media (max-width: 750px) {
        display: none;
    }
`;

S.Icon = styled.div`
    margin-left: auto;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 33px;

    & svg {
        fill: #fff;
        width: 15px;
    }
`;

// MOBILE MENU ---------------------------------------------
S.MobileMenu = styled.div`
    margin-left: auto;

    @media (min-width: 750px) {
        display: none;
    }
`;

S.MobileMenuContent = styled.div`
    display: none;
    flex-direction: column;
    background: ${({ theme }) => theme.background};
    z-index: 100;
    position: fixed;
    inset: 0;
    padding: 15px 20px;

    & > span {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 25px;
        font-size: 21px;
    }
    & a {
        font-size: 21px;
    }
    & > a {
        margin-bottom: 30px;
    }

    &.active {
        display: flex;
    }
`;

S.MobileMenuHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;

    & a {
        font-size: 24px;
    }
`;

S.MobileCategories = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px 40px;

    & a {
        font-size: 17px;
    }
`;
