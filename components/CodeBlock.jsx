import styled from 'styled-components';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import darcula from 'react-syntax-highlighter/dist/cjs/styles/prism/darcula';

const CodeBlock = (props) => {
    const { filename, code } = props;

    return (
        <S.Container>
            {filename && <span>{filename}</span>}
            <SyntaxHighlighter language='jsx' style={darcula}>
                {code}
            </SyntaxHighlighter>
        </S.Container>
    );
};

export default CodeBlock;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #555564;
    border-radius: 5px;
    padding: 4px;
    color: white;

    & > span {
        background: #2d2d35;
        padding: 5px 10px;
        font-size: 14px;
        width: fit-content;
        border-radius: 5px 5px 0 0;
    }

    & code {
        background: unset !important;
        padding: unset !important;
        border-radius: unset;
    }

    & pre {
        margin: 0 !important;
        background: #2d2d35 !important;
    }

    @media (max-width: 1100px) {
        & code {
            font-size: 12px;
        }
    }
`;
