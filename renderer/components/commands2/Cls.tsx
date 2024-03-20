import { UsageDiv } from '../styles/outout.styled';
import { Cmd } from "../styles/help.styled";

export function Cls(arg, clearHistory, setHistorytoReturn: React.Dispatch<JSX.Element>) {
    setHistorytoReturn(<UsageDiv>Would you like to input: <Cmd>cls</Cmd></UsageDiv>);
}