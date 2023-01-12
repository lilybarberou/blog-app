import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import styled from 'styled-components';
import Header from './Header';
import Button from './Button';
import CodeBlock from './CodeBlock';

const PostLayout = ({ code, data = {} }) => {
    const { title, date, categories } = data;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    const PostContent = useMemo(() => getMDXComponent(code), [code]);

    return (
        <S.Container>
            {Boolean(Object.values(data).length) && <Header title={title} date={formatDate(date)} />}
            <section>
                <PostContent components={{ Button, CodeBlock }} />
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
`;
