import { useContext } from "react";
import _ from "lodash";
import { Wrapper } from "../../components/styles/outout.styled";
import { termContext } from "../Terminal";

export function History() {
    const { CmdHistory, index } = useContext(termContext);
    const currentHistory = _.reverse(_.slice(CmdHistory, index));
    return (
        <Wrapper data-testid="history">
          {currentHistory.map(cmd => (
            <div key={_.uniqueId(`${cmd}_`)}>{cmd}</div>
          ))} 
        </Wrapper>
      );
    };