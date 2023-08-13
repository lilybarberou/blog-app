import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import styled from 'styled-components';

const TableOfContents = ({ data }) => {
    useEffect(() => {
        // on scroll change the active link
        const handleScroll = () => {
            const links = document.querySelectorAll('#table-of-contents a');
            const sections = document.querySelectorAll('h2, h3');

            const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

            sections.forEach((section, index) => {
                // le 200 permet de capter plus tôt le changement de section
                if (section.offsetTop <= scrollPosition + 200) {
                    links.forEach((link) => {
                        link.classList.remove('active');
                    });
                    links[index].classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // remove event listener on unmount
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <S.Container id='table-of-contents'>
            <p>Table des matières</p>
            {data.map((title) => {
                return (
                    <Fragment key={title.link}>
                        <Link href={title.link}>{title.text}</Link>
                        {title.children && (
                            <S.SubItems>
                                {title.children.map((subtitle) => {
                                    return (
                                        <Fragment key={subtitle.link}>
                                            <Link href={subtitle.link}>{subtitle.text}</Link>
                                        </Fragment>
                                    );
                                })}
                            </S.SubItems>
                        )}
                    </Fragment>
                );
            })}
        </S.Container>
    );
};

export default TableOfContents;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 3px solid ${({ theme }) => theme.primary};
    padding: 15px;
    padding-top: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    height: fit-content;
    position: sticky;
    top: 100px;
    align-self: flex-start;
    gap: 15px;
    max-height: 400px;
    overflow-y: auto;

    a {
        color: hsl(0, 0%, 82.5%);
        transition: 0.2s;

        &:hover {
            color: #fff;
        }

        &.active {
            color: ${({ theme }) => theme.primary};
        }
    }

    p {
        font-family: 'Source Code Pro', monospace;
        font-weight: bold;
        font-size: 24px;
        color: ${({ theme }) => theme.primary};
        margin-bottom: 10px;
    }

    @media (max-width: 1100px) {
        display: none;
    }
`;

S.SubItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 20px;
    font-size: 15px;
`;
