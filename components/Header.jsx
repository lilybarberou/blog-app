import styled from 'styled-components';
import categories from '@contexts/categories.json';

const Header = (props) => {
    const { data } = props;

    return (
        <S.Container>
            <S.Subtitle>
                <span className='date'>{data.date}</span>
                {data.categories.map((cat) => (
                    <S.Category color={categories[cat].color} key={cat}>
                        {cat}
                    </S.Category>
                ))}
            </S.Subtitle>
            <h1>{data.title}</h1>
        </S.Container>
    );
};

export default Header;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    h1 {
        font-weight: 500;
        font-size: 40px;
        padding: 20px 0;
        border-bottom: ${({ theme }) => `4px solid ${theme.primary}`};
    }

    @media (max-width: 1100px) {
        h1 {
            font-size: 30px;
        }
    }
`;

S.Subtitle = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    font-size: 14px;

    & .date {
        margin-right: auto;
        color: ${({ theme }) => theme.primary};
    }
`;

S.Category = styled.span`
    color: ${({ color }) => color};
`;
