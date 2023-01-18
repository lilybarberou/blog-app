import Link from 'next/link';
import styled from 'styled-components';

const PostCard = (props) => {
    const categories = {
        HTML: '#a4352e',
        CSS: '#2876AF',
        JS: '#c2cd4f',
        REACT: '',
        NEXTJS: '',
        NODEJS: '',
    };

    const { post } = props;

    return (
        <S.Container href={`posts/${post.slug}`}>
            <div>
                <S.PostCategories>
                    {post.categories.map((cat) => (
                        <S.PostCategory color={categories[cat]} key={cat}>
                            {cat}
                        </S.PostCategory>
                    ))}
                </S.PostCategories>
                <span className='date'>{post.date}</span>
                <span className='title'>{post.title}</span>
            </div>
            <div>
                <p>{post.description}</p>
                <span className='more'>Lire la suite -&gt;</span>
            </div>
        </S.Container>
    );
};

export default PostCard;

const S = {};
S.Container = styled(Link)`
    padding: 15px;
    height: 200px;
    width: 200px;
    border: ${({ theme }) => theme.border};
    overflow: hidden;

    & > div {
        display: flex;
        flex-direction: column;
        transition: 0.3s;
        height: 100%;

        &:first-child {
            margin-bottom: 15px;
        }
    }
    &:hover > div {
        transform: translateY(calc(-100% - 15px));
    }
    & .date {
        font-size: 13px;
        color: #787878;
    }
    & .title {
        margin-top: 20px;
        align-self: center;
        font-size: 20px;
        text-align: center;
    }
    & p {
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 9;
        -webkit-box-orient: vertical;
    }
    & .more {
        align-self: flex-end;
        margin-top: auto;
        font-size: 14px;
        color: ${({ theme }) => theme.primary};
    }
`;

S.PostCategories = styled.div`
    display: flex;
    gap: 10px;
`;

S.PostCategory = styled.span`
    font-size: 15px;
    color: ${({ color }) => color};
`;
