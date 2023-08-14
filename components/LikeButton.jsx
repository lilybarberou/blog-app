import styled, { css } from 'styled-components';
import axios from 'axios';

const LikeButton = (props) => {
    const { hasLiked, setHasLiked, nbLikes, setNbLikes, style, file } = props;

    // add like to file
    const addLike = async () => {
        // add like in localstorage
        const liked = localStorage.getItem('liked') ? JSON.parse(localStorage.getItem('liked')) : [];
        liked.push(file.meta?.slug);
        localStorage.setItem('liked', JSON.stringify(liked));

        // add like in server file
        axios.post('files/like', { slug: file.meta?.slug });

        // update states
        setHasLiked(true);
        setNbLikes(nbLikes + 1);
    };

    return (
        <S.Like style={style} onClick={hasLiked ? undefined : addLike} $active={hasLiked}>
            {nbLikes}
            <svg width='24px' height='24px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z'
                    strokeWidth='1.5'
                    strokeLinejoin='round'
                ></path>
            </svg>
        </S.Like>
    );
};

export default LikeButton;

const S = {};
S.Like = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin: auto;

    svg {
        fill: ${({ $active, theme }) => ($active ? theme.primary : 'none')};
        stroke: ${({ $active, theme }) => ($active ? theme.primary : '#fff')};
        transition: 0.2s;
    }

    &:hover {
        svg {
            transform: scale(1.2);
        }
    }

    ${({ $active }) =>
        $active &&
        css`
            animation: like 0.2s ease-in-out;

            @keyframes like {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }
        `};
`;
