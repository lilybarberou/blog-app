import styled from 'styled-components';

type CalloutType = 'pin' | 'help' | 'error' | 'warning' | 'success';

const Callout = (props: { type: CalloutType; text: string | TrustedHTML }) => {
    const { type, text } = props;

    const emotes = {
        pin: '📌',
        help: '💡',
        error: '❌',
        warning: '⚠️',
        success: '✔️',
    };

    return (
        <S.Container type={type}>
            {type && emotes[type] && <p className='emote'>{emotes[type]}</p>}
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </S.Container>
    );
};

export default Callout;

const S: any = {};
S.Container = styled.div<{ type: CalloutType }>`
    display: flex;
    gap: 15px;
    background: ${({ type }) => {
        switch (type) {
            case 'warning':
                return '#392E1E';
            case 'success':
                return '#4e8458';
            case 'error':
                return '#784646';
            default:
                return '#2D2D35';
        }
    }};
    border-radius: 5px;
    padding: 15px;

    p:not(.emote) {
        line-height: 1.5 !important;
        font-size: 16px !important;
    }

    .emote {
        font-size: 20px;
        line-height: 1.4;
    }

    @media (max-width: 1100px) {
        & p:not(.emote) {
            font-size: 15px !important;
        }

        .emote {
            font-size: 18px;
        }
    }
`;
