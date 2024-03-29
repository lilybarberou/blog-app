import { TableOfContents } from '@contexts/types';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
    data: TableOfContents;
};

const TableOfContents = (props: Props) => {
    const { data } = props;

    useEffect(() => {
        // on scroll change the active link
        const handleScroll = () => {
            const links = document.querySelectorAll('#table-of-contents a');
            const sections = document.querySelectorAll('h2, h3') as NodeListOf<HTMLHeadingElement>;

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

const S: any = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 3px solid ${({ theme }) => theme.primary};
    padding: 15px;
    padding-top: 5px;
    font-family: var(--font-dm-sans), sans-serif;
    font-size: 16px;
    height: fit-content;
    align-self: flex-start;
    gap: 15px;
    max-height: 450px;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.primary};
    }

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
        font-family: var(--font-source-code-pro), monospace;
        font-weight: bold;
        font-size: 24px;
        color: ${({ theme }) => theme.primary};
        margin-bottom: 10px;
    }
`;

S.SubItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 20px;
    font-size: 15px;
`;
