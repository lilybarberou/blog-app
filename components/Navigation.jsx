import Link from 'next/link';
import styled from 'styled-components';
import categories from '@contexts/categories.json';
import useModal from '@contexts/useModal';
import ModalSearch from './ModalSearch';

const Navigation = () => {
    const { isOpen, open, close } = useModal(['search']);

    const handleMobileMenu = () => {
        const el = document.querySelector('#mobile-menu');
        el.classList.toggle('active');
        document.body.style.overflowY = el.classList.contains('active') ? 'hidden' : 'unset';
    };

    return (
        <S.Container>
            {isOpen('search') && <ModalSearch onClose={() => close('search')} />}
            <S.Logo href='/'>LilyScript</S.Logo>
            <S.Links>
                <Link href='/posts'>Les posts</Link>
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
                <Link href='/snippets'>Les snippets</Link>
            </S.Links>
            <S.Search onClick={() => open('search')}>
                <S.Icon>
                    <svg fill='#C64141' width='24px' height='24px' viewBox='0 0 24 24' strokeWidth='1.5' xmlns='http://www.w3.org/2000/svg' color='#fff'>
                        <path
                            d='M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z'
                            stroke='#fff'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        ></path>
                    </svg>
                </S.Icon>
            </S.Search>
            <S.MobileMenu>
                <S.Icon onClick={handleMobileMenu}>
                    <svg id='open' width='24px' height='24px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='#fff'>
                        <path d='M3 5h18M3 12h18M3 19h18' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'></path>
                    </svg>
                </S.Icon>
                <S.MobileMenuContent id='mobile-menu'>
                    <S.MobileMenuHeader>
                        <S.Logo onClick={handleMobileMenu} href='/'>
                            LilyScript
                        </S.Logo>
                        <S.Icon onClick={handleMobileMenu}>
                            <svg width='24px' height='24px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='#fff'>
                                <path
                                    d='M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243'
                                    stroke='#fff'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                ></path>
                            </svg>
                        </S.Icon>
                    </S.MobileMenuHeader>
                    <Link onClick={handleMobileMenu} href='/posts'>
                        Les posts
                    </Link>
                    <Link onClick={handleMobileMenu} href='/snippets'>
                        Les snippets
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
    z-index: 999;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 75px;
    position: sticky;
    top: 0;
    padding: 25px 0;
    background: ${({ theme }) => theme.background};

    @media (max-width: 750px) {
        margin-bottom: 25px;
        padding: 15px 0;
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
        padding: 5px 10px;
        display: flex;
        align-items: center;

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
    background: #2d2d35;
    padding: 10px;
    border: ${({ theme }) => theme.border};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0px 20px;

    > a {
        position: relative;
        padding: 8px 15px;
        width: fit-content;
        min-width: 120px;
        transition: 0.2s;

        :hover {
            color: ${({ theme }) => theme.primary};
        }
        :hover::after {
            width: 100%;
        }
        ::after {
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
    width: 40px;
    height: 37px;

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
    width: 40px;
    height: 37px;

    svg {
        width: 23px;
    }

    #open {
        width: 20px;
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
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.background};
    z-index: 100;
    position: fixed;
    inset: 0;
    padding: 15px 20px;
    transform: translateY(-100%);
    transition: 0.3s;

    & > span {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 25px;
        font-size: 21px;
    }
    a {
        font-size: 21px;
    }
    & > a {
        margin-bottom: 40px;
    }

    &.active {
        transform: translateY(0%);
    }
`;

S.MobileMenuHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;

    a {
        font-size: 24px;
    }
`;

S.MobileCategories = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px 40px;
    margin-bottom: 40px;

    a {
        font-size: 17px;
    }
`;
