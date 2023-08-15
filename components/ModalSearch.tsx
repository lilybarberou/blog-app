import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import { FileMeta } from '@contexts/types';

type FileMetaWithType = FileMeta & { type: 'posts' | 'snippets' };

const ModalSearch = (props: { onClose: () => void }) => {
    const { onClose } = props;
    const [results, setResults] = useState<{ initial: FileMetaWithType[]; filtered: FileMetaWithType[] }>({ initial: [], filtered: [] });

    // get all files
    useEffect(() => {
        const getFiles = async () => {
            const { data } = await axios.get('files');
            const arr = [
                ...data.data.posts.map((post: File) => ({ ...post, type: 'posts' })),
                ...data.data.snippets.map((snippet: File) => ({ ...snippet, type: 'snippets' })),
            ];

            setResults({ initial: arr, filtered: arr });
        };

        getFiles();
    }, []);

    // handle search change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!value) return setResults((prev) => ({ ...prev, filtered: prev.initial }));

        const filtered = results.initial.filter((result) => result.title.toLowerCase().includes(value.toLowerCase()));
        setResults((prev) => ({ ...prev, filtered }));
    };

    return (
        <>
            <S.Modal>
                <S.Content>
                    <S.Header>
                        <S.Input autoFocus type='text' onChange={handleChange} />
                        <S.Icon onClick={onClose}>
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
                    </S.Header>
                    {results.filtered.map((result) => (
                        <S.Result onClick={onClose} key={result.title} href={`/${result.type}/${result.slug}`}>
                            <p>{result.title}</p>
                        </S.Result>
                    ))}
                </S.Content>
            </S.Modal>
            <S.Background onClick={onClose} />
        </>
    );
};

export default ModalSearch;

const S: any = {};
S.Modal = styled.form`
    z-index: 100;
    border: 1px solid #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1d1e23;
    width: 400px;
    height: 70vh;
`;

S.Content = styled.div`
    overflow-y: scroll;
    max-height: calc(100% - 40px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

S.Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    gap: 15px;
    height: 40px;
`;

S.Input = styled.input`
    padding: 10px;
    background: none;
    border: 1px solid #fff;
    color: #fff;
    outline: none;
    height: 100%;
    box-sizing: border-box;
    font-size: 15px;
`;

S.Icon = styled.div`
    margin-left: auto;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    svg {
        fill: #fff;
        width: 30px;
    }
`;

S.Result = styled(Link)`
    padding: 10px;
    border-radius: 5px;
    transition: 0.2s;
    background: #2d2d35;

    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

S.Background = styled.div`
    z-index: 99;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
`;
