import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import styled from 'styled-components';
import Header from './Header';
import CodeBlock from './CodeBlock';

const PostLayout = ({ code = '', data = {} }) => {
    const { title, date, description, slug } = data;

    const PostContent = useMemo(() => getMDXComponent(code), [code]);

    return (
        <S.Container>
            {Boolean(Object.values(data).length) && <Header title={title} date={date} />}
            <section>
                <PostContent components={{ CodeBlock }} />
            </section>
        </S.Container>
    );
};

export default PostLayout;

const S = {};
S.Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding: 10px;
    max-width: 500px;
`;
