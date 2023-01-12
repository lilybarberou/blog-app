import styled from 'styled-components';

const Header = (props) => {
    const { title, date } = props;

    return (
        <S.Container>
            <p>{title}</p>
            <p>{date}</p>
        </S.Container>
    );
};

export default Header;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding: 10px;
`;
