import styled from 'styled-components';

const Callout = (props) => {
    const {type, text} = props;

    const emotes = {
        pin: '📌',
        help: '💡',
        error: '❌',
        warning: '⚠️',
        success: '✔️'
    }

    return <S.Container type={type}>
        {type && emotes[type] && <p className='emote'>{emotes[type]}</p>}
        <p dangerouslySetInnerHTML={{__html: text}}></p>
    </S.Container>;
};

export default Callout;

const S = {};
S.Container = styled.div`
    display: flex;
    gap: 15px;
    background: ${({type}) => {
        switch (type) {
            case 'warning': return '#392E1E'
            case 'success': return '#4e8458'
            case 'error': return '#784646'
            default: return '#2b2b2b'
        }
    }};
    border-radius: 5px;
    padding: 15px;

    & p:not(.emote) {
        line-height: 1.5 !important;
        font-size: 14px !important;
    }

    & .emote {
        font-size: 20px;
        line-height: 1.4;
    }
`;
