import React from "react";
import _ from "lodash";
import { useContext } from "react";
import { termContext } from "./Terminal";
import { DidNavigateEvent } from "electron";
import { CmdNotFound, Empty } from "./styles/terminal.styled";
import { Cls } from './commands2/Cls';
import { Help } from "./commands2/Help";
import { History } from "./commands2/History";
import { checkThemeSwitch } from "../utils/funcs";
import theme from '../components/styles/themes'
const myTheme = _.keys(theme);

type Command = {
    cmd: string;
    desc: string;
    tab: number;
}[];

export const commands: Command = [
    { cmd: "cls", desc: "clear the terminal", tab: 10 },
    { cmd: "echo", desc: "print out anything", tab: 9 },
    { cmd: "help", desc: "check available commands", tab: 9 },
    { cmd: "history", desc: "view command history", tab: 6 },
    // { cmd: "pwd", desc: "print current working directory", tab: 10 },
    { cmd: "themes", desc: "check available themes", tab: 7 },
    { cmd: "adduser", desc: "create an account", tab: 6 },
    { cmd: "su", desc: "change user", tab: 11 },
    { cmd: "cd", desc: "change directory", tab: 11 },
    { cmd: "dir", desc: "list directory contents", tab: 10 },
    { cmd: "note", desc: "enter clue book", tab: 9 },
    { cmd: "mail", desc: "enter mail", tab: 9 },
    { cmd: "options", desc: "check available options", tab: 6 },

];

export function SetResult(input: string, resultHistory: any, setResuleHistory: React.Dispatch<any>, clearHistory,CmdHistory: string[]) {

    //处理input
    const commandArray = _.split(_.trim(input), ' ');
    const validCommand = _.find(commands, { cmd: commandArray[0] });
    const command = commandArray[0];
    const arg = _.drop(commandArray);
    //呼出对应的功能/输出
    const specialCmds = ["themes", "mail"];
    let historytoReturn = <Empty />;
    const setHistorytoReturn = (Element: JSX.Element) => {
        historytoReturn = Element;
    }

    if (input === "") {
        setHistorytoReturn(<Empty />);
    }
    else if (validCommand) {
        switch (command) {
            case "cls":
                if(arg.length === 0){
                    clearHistory();
                }
                else{
                    Cls(arg, clearHistory, setHistorytoReturn);
                }

                break;
            case "echo":
                break;
            case "help":
                Help(setHistorytoReturn);
                break;
            case "history":
                History(setHistorytoReturn,CmdHistory);
                break;
            case "themes":
                break;
            case "adduser":
                break;
            case "su":
                break;
            case "cd":
                break;
            case "dir":
                break;
            case "note":
                break;
            case "mail":
                break;
            case "options":
                break;
            default:
                break;
        }
    }
    else {
        setHistorytoReturn(<CmdNotFound >
            command not found: {input}
        </CmdNotFound>)
    }












    /*const historytoReturn = <div>
         <div>Command: {input}</div>
         <div>Result: {validCommand ? validCommand.desc : "Command not found"}</div>
         <div>Arguments: {arg}</div>
     </div>;
     */
    //接下来处理input
   
   // setResuleHistory([...resultHistory, historytoReturn])

}