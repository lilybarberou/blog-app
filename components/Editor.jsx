import styled from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { mdx } from '@mdx-js/runtime';
import BrowserFS from 'browserfs';

// const scope = { mdx };

const Editor = () => {
    return (
        <S.Container>
            <LiveProvider>
                <LiveEditor />
                <LiveError />
                <LivePreview />
            </LiveProvider>
        </S.Container>
    );
};

// BrowserFS.configure(
//     {
//         fs: 'LocalStorage',
//     },
//     (e) => {
//         if (e) {
//             console.log(e);
//         } else {
//             // Your code
//             const Editor = () => {
//                 return (
//                     <LiveProvider
//                         code={`
//                   # This is an h1 heading
//                   ## This is an h2 heading
//                   ### This is an h3 heading
//                   - This
//                   - is
//                   - a
//                   - list
//                   1. this
//                   2. is
//                   3. a
//                   4. numbered
//                   5. list
//               `}
//                         scope={scope}
//                     >
//                         <LiveEditor />
//                         <LiveError />
//                         <LivePreview />
//                     </LiveProvider>
//                 );
//             };
//         }
//     }
// );

export default Editor;

const S = {};
S.Container = styled.div`
    display: flex;
`;
