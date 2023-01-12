import { bundleMDX } from 'mdx-bundler';
import PostLayout from '../components/PostLayout';

export default function Post({ code }) {
    return <PostLayout code={code} />;
}

export async function getStaticProps() {
    const mdx = `
# Hello World

Here's a component used inside Markdown:

<Button/>
<CodeBlock filename="test.js">
const x = 1;
console.log(1);
</CodeBlock>
`;

    const result = await bundleMDX({
        source: mdx,
        cwd: process.cwd(),
    });

    return {
        props: {
            code: result.code,
        },
    };
}
