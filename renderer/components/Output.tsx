import { useContext } from "react";
import { termContext } from "./Terminal";
import { UsageDiv,OutputContainer } from "./styles/outout.styled";
import {AddUser} from "../components/commands/AddUser"
import {Cd} from "../components/commands/Cd"
import {Clear} from "../components/commands/Cls"
import { Dir } from "../components/commands/Dir";
import { Echo } from "../components/commands/Echo";
import { Help } from "../components/commands/Help";
import { History } from "../components/commands/History";
import { Mail } from "../components/commands/Mail";
import { Note } from "../components/commands/Note";
import { Option } from "../components/commands/Option";
import { Su } from "../components/commands/Su";
import { Themes } from "../components/commands/Themes";



type Props = {
    index: number;
    cmd: string;
}

 export const Output: React.FC<Props> = ({ index, cmd }) => {
    const { arg } = useContext(termContext);
    const specialCmds = ["themes"]
    if (specialCmds.includes(cmd) && arg.length > 0)
        return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;
    return (
        <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
            {
                {
                    addUser: <AddUser />,
                    cls: <Clear />,
                    cd: <Cd />,
                    dir: <Dir />,
                    echo: <Echo />,
                    help: <Help />,
                    history: <History />,
                    mail: <Mail />,
                    note: <Note />,
                    options: <Option />,
                    themes: <Themes />,
                    su: <Su />,
                }[cmd]
            }
        </OutputContainer>
    );
};
