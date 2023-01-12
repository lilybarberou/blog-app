import styled from 'styled-components';
import Editor from '../components/editor';

const Playground = () => {
    return (
        <S.Container>
            <Editor />
        </S.Container>
    );
};

export default Playground;

const S = {};
S.Container = styled.div`
    display: flex;
`;
