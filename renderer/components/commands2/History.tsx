
import _ from "lodash";
import { Wrapper } from "../../components/styles/outout.styled";


export function History(setHistorytoReturn, CmdHistory: string[]) {
    //const currentHistory = _.reverse(_.slice(CmdHistory));

    setHistorytoReturn(
        <Wrapper >
            {CmdHistory.map(cmd => (
                <div key={_.uniqueId(`${cmd}_`)}>{cmd}</div>
            ))}
        </Wrapper>);
}


