import { useContext, useEffect} from "react";
import { UsageDiv } from "../styles/outout.styled";
import { termContext } from "../Terminal";
import { Cmd } from "../styles/help.styled";

export const Clear: React.FC = () => {
    const { arg, clearHistory } = useContext(termContext);
    useEffect(() => {
        if(arg.length === 0) clearHistory();
    }
    , [arg, clearHistory]);

    return <UsageDiv>Would you like to input: <Cmd>cls</Cmd></UsageDiv>  // 根据参数长度决定显示清屏提示
};
