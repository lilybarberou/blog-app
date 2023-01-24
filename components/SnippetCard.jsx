import Link from 'next/link';
import styled from 'styled-components';
import categories from '@contexts/categories.json';

const SnippetCard = (props) => {
    const { snippet } = props;

    return (
        <S.Container href={`/snippets/${snippet.slug}`}>
            <S.SnippetCategories>
                {snippet.categories?.map((cat) => (
                    <S.SnippetCategory color={categories[cat].color} key={cat}>
                        {cat}
                    </S.SnippetCategory>
                ))}
                <span className='date'>{snippet.date}</span>
            </S.SnippetCategories>
            <span className='title'>{snippet.title}</span>
        </S.Container>
    );
};

export default SnippetCard;

const S = {};
S.Container = styled(Link)`
    flex: 1;
    min-height: 80px;
    padding: 15px;
    border: ${({ theme }) => theme.border};
    overflow: hidden;
    position: relative;

    & .date {
        font-size: 13px;
        color: #787878;
        margin-left: auto;
    }
    & .title {
        z-index: 10;
        margin-top: 10px;
        align-self: center;
        font-size: 20px;
        text-align: center;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: relative;
    }
    &:hover::after {
        width: 100%;
    }
    &::after {
        content: '';
        background: ${({ theme }) => theme.primary};
        transition: 0.3s;
        position: absolute;
        z-index: 9;
        height: 100%;
        width: 0;
        top: 0;
        bottom: 0;
        left: 0;
    }
`;

S.SnippetCategories = styled.div`
    display: flex;
    gap: 10px;
`;

S.SnippetCategory = styled.span`
    font-size: 15px;
    color: ${({ color }) => color};
`;
