import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    primary: string;
    secondary: string;
    grey: string;
    border: string;
  }
}