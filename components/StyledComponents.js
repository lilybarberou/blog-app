import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    background: ${({ theme }) => theme.primary};
    border-radius: 5px;
    color: white;
    padding: 10px 0;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    > label {
        color: white;
        font-size: 14px;
        margin-bottom: 5px;
    }

    input {
        border: none;
        padding: 8px 10px;
        font-size: 15px;

        :focus {
            outline: none;
        }
    }

    ${({ width }) => (width ? `width: ${width};` : '')}
`;
