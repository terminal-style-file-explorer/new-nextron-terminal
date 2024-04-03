import React from "react";
import _ from "lodash";
import { useContext } from "react";
import { termContext } from "./Terminal";
import { DidNavigateEvent } from "electron";
import { CmdNotFound, Empty, Hints } from "./styles/terminal.styled";
import { Cls } from './commands2/Cls';
import { Help } from "./commands2/Help";
import { History } from "./commands2/History";
import { checkThemeSwitch } from "../utils/funcs";
import theme from '../components/styles/themes'
import { ThemesInvalid } from "./commands2/Themes";
import { Router } from "next/router";
const myTheme = _.keys(theme);
import { useRouter } from "next/router";
import { UsageDiv } from "./styles/outout.styled";
import { Cmd } from "./styles/help.styled";
import { User } from "./Terminal";
import { Su } from "./commands2/Su";
import { setUserToLS } from "../utils/storage";
import { setgid } from "process";

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
    { cmd: 'open', desc: 'open a file', tab: 9 },

];

export async function SetResult(
    input: string,
    resultHistory: any,
    setResuleHistory: React.Dispatch<any>,
    clearHistory, CmdHistory: string[],
    setThemeByResult,
    handleRouter,
    setUser,) {
    //处理input
    const commandArray = _.split(_.trim(input), ' ');
    const validCommand = _.find(commands, { cmd: commandArray[0] });
    const command = commandArray[0];
    const arg = _.drop(commandArray);
    //呼出对应的功能/输出
    // const specialCmds = ["themes", "mail"];
    let historytoReturn = <Empty />;
    const setHistorytoReturn = (Element: JSX.Element) => {
        historytoReturn = Element;
    }
    const themeToReturn = (theme: string) => {
        setThemeByResult(theme)
    }
    const notFinished = () => {
        return <div>Not finished</div>
    }

    function checkUser(user: User) {
        try {
            const response = window.ipc.invoke('checkUser', user);
            return response;
        } catch (err) {
            console.log(err);
            const response = 'Error checking user';
            return response;
        }
    }

    function addUser(user: User) {
        try {
            const response = window.ipc.invoke('addUser', user);
            return response;
        } catch (err) {
            console.log(err);
            const response = 'Error adding user';
            return response;
        }
    }

    function getPath() {
        try {
            const response = window.ipc.invoke('getContentPath', 'contentPath');
            return response;
        } catch (err) {
            console.log(err);
            const response = 'Error reading directory';
            return response;
        }
    }

    function showFilesAndFoldersNames() {
        try {
            const response = window.ipc.invoke('getContents', 'contentPath');
            return response;
        } catch (err) {
            console.log(err);
            const response: string[] = ['Error reading directory'];
            return response;
        }
    }

    if (input === "") {
        setHistorytoReturn(<Empty />);
        setResuleHistory([...resultHistory, historytoReturn])
    }
    else if (validCommand) {
        switch (command) {
            case "cls":
                if (arg.length === 0) {
                    clearHistory();
                }
                else {
                    Cls(arg, clearHistory, setHistorytoReturn);
                    setResuleHistory([...resultHistory, historytoReturn])

                }
                break;
            case "echo":
                const path = await getPath();
                setHistorytoReturn(<UsageDiv>{path}</UsageDiv>)
                setResuleHistory([...resultHistory, historytoReturn])
                break;
            case "help":
                Help(setHistorytoReturn);
                setResuleHistory([...resultHistory, historytoReturn])
                break;
            case "history":
                History(setHistorytoReturn, CmdHistory);
                setResuleHistory([...resultHistory, historytoReturn])
                break;
            case "themes":
                if (checkThemeSwitch(commandArray, myTheme)) {
                    //themeSwitcher([theme[commandArray[2]]]);
                    console.log("theme switcher");
                    themeToReturn(commandArray[2]);
                }
                else {
                    console.log("theme invalid");
                    ThemesInvalid(setHistorytoReturn, myTheme);
                    setResuleHistory([...resultHistory, historytoReturn])
                }
                break;
            case "adduser":
                if (arg.length === 2 && arg[0] && arg[1]) {
                    const userToAdd = { name: arg[0], password: arg[1], auth: 0 };
                    const addUserResponse = await addUser(userToAdd);
                    if (addUserResponse) {
                        setHistorytoReturn(<UsageDiv> user added as {arg[0]}</UsageDiv>)
                        setUser(userToAdd);
                        setUserToLS(userToAdd);
                        setResuleHistory([...resultHistory, historytoReturn])
                    }
                    else {
                        setHistorytoReturn(<UsageDiv>user already exists</UsageDiv>)
                        setResuleHistory([...resultHistory, historytoReturn])
                    }
                }
                else {
                    setHistorytoReturn(<UsageDiv>please input: <Cmd>adduser `username` `password`</Cmd></UsageDiv>)
                    setResuleHistory([...resultHistory, historytoReturn])
                }

                break;
            case "su":
                if (arg.length === 2 && arg[0] && arg[1]) {
                    const userToCheck = { name: arg[0], password: arg[1], auth: 0 };
                    const checkUserResponse = await checkUser(userToCheck);
                    if (checkUserResponse) {
                        setHistorytoReturn(<Empty />)
                        setUser(userToCheck);
                        setUserToLS(userToCheck);
                        setResuleHistory([...resultHistory, historytoReturn])
                    }
                    else {
                        setHistorytoReturn(<UsageDiv>please check your username or password</UsageDiv>)
                        setResuleHistory([...resultHistory, historytoReturn])
                    }
                }
                else {
                    setHistorytoReturn(<UsageDiv>please input: <Cmd>su `username` `password`</Cmd></UsageDiv>)
                    setResuleHistory([...resultHistory, historytoReturn])
                }

                break;
            case "cd":
                if (arg.length === 1) {
                    const result = await window.ipc.invoke('changeDirectory', arg[0]);
                    console.log('result in invoke changedir', result);
                    if (result) {
                        setHistorytoReturn(<UsageDiv>cd: {arg} success</UsageDiv>)
                        setResuleHistory([...resultHistory, historytoReturn])
                    }
                    else {
                        setHistorytoReturn(<UsageDiv>cd: no such directory: {arg[0]}</UsageDiv>)
                        setResuleHistory([...resultHistory, historytoReturn])
                    }
                }
                else {
                    setHistorytoReturn(<UsageDiv>please input: <Cmd>cd `foldername`</Cmd></UsageDiv>)
                    setResuleHistory([...resultHistory, historytoReturn])
                }
                break;
            case "dir":
                const dir = await showFilesAndFoldersNames();
                setHistorytoReturn(<UsageDiv>{
                    dir.map((item, index) => {
                        return <Hints key={index}>{item} </Hints>
                    })
                }</UsageDiv>)
                setResuleHistory([...resultHistory, historytoReturn])
                break;
            case "note":
                if (arg.length === 0) {
                    handleRouter('/note');
                    setHistorytoReturn(<Empty />)
                    setResuleHistory([...resultHistory, historytoReturn])
                }
                else{
                    setHistorytoReturn(<UsageDiv>Would you like to input: <Cmd>note</Cmd></UsageDiv>)
                    setResuleHistory([...resultHistory, historytoReturn])
                }
                break;
            case "mail":
                //router.push('/mail'); 应该在terminal里面实现，然后导入function进来 如 pushRouter('mail')
                //应检查是否有参数
                if (arg.length === 0) {
                    handleRouter('/mail');
                    setHistorytoReturn(<Empty />)
                    setResuleHistory([...resultHistory, historytoReturn])
                } else {
                    setHistorytoReturn(<UsageDiv>Would you like to input: <Cmd>mail</Cmd></UsageDiv>)
                    setResuleHistory([...resultHistory, historytoReturn])
                }
                break;
            case "options":
                setResuleHistory([...resultHistory, notFinished()])
                break;
            case "open":
                if (arg.length === 1) { }
                else {
                    setHistorytoReturn(<UsageDiv>please input: <Cmd>open `filename`</Cmd></UsageDiv>)
                    setResuleHistory([...resultHistory, historytoReturn])
                }
            default:
                break;
        }
    }
    else {
        setHistorytoReturn(<CmdNotFound >
            command not found: {input}
        </CmdNotFound>)
        setResuleHistory([...resultHistory, historytoReturn])
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