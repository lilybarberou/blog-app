import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeBlock = (props) => {
    const { children, filename } = props;
    // console.log(children);
    // console.log(children.props.children);

    return (
        <S.Container>
            {filename && <span>{filename}</span>}
            <SyntaxHighlighter language='javascript' style={monokai} wrapLongLines={true}>
                {children.props.children}
            </SyntaxHighlighter>
        </S.Container>
    );
};

export default CodeBlock;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #252525;
    border-radius: 5px;
    padding: 10px;
    color: white;

    & > span {
        background: #2b2b2b;
        padding: 5px 10px;
        font-size: 14px;
        width: fit-content;
        border-radius: 5px 5px 0 0;
    }
`;
