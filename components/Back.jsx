import styled from 'styled-components';
import Link from 'next/link';

const Back = (props) => {
    const { url } = props;

    return <S.Link href={url}>Retour</S.Link>;
};

export default Back;

const S = {};
S.Link = styled(Link)`
    color: ${({ theme }) => theme.primary};
`;
