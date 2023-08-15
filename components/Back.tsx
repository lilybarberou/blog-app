import styled from 'styled-components';
import Link from 'next/link';

const Back = (props: { url: string }) => {
    const { url } = props;

    return <S.Link href={url}>Retour</S.Link>;
};

export default Back;

const S: any = {};
S.Link = styled(Link)`
    color: ${({ theme }) => theme.primary};
`;
