import { useRouter } from 'next/router';
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  User,
  Wrapper,
} from './styles/terminal.styled';
import React, { useCallback, useEffect, createContext } from 'react'
import _ from "lodash";
import { Output } from './Output';
import { SetResult } from './SetResult';
import { themeContext } from '../pages/home';
export type User = {
  name: string;
  password: string;
  auth: number;
};
type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];


import theme from './styles/themes';

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
type Term = {
  arg: string[];
  CmdHistory: string[];
  index: number;
  clearHistory?: () => void;
};

export const termContext = createContext<Term>({
  arg: [],
  CmdHistory: [],
  index: 0,
});

export default function HomePage() {
  const Router = useRouter();
  const [user, setUser] = React.useState<User>({ name: '', password: '', auth: 0 });
  const [cmdHistory, setCmdHistory] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')
  const [pointer, setPointer] = React.useState(0)
  const [userHistory, setUserHistory] = React.useState([])
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hints, setHints] = React.useState<string[]>([]);
  const [event, setEvent] = React.useState([]);
  const [resultHistory, setResultHistory] = React.useState<JSX.Element[]>([]);
  const themeSwitcher = React.useContext(themeContext);
  const [ThemeByResult, setThemeByResult] = React.useState("dark");
  const router = useRouter();


  const handleRouter = (path: string) => {
    router.push(path);
  }



  React.useEffect(() => {
    console.log('ThemeByResult', ThemeByResult);
    themeSwitcher(theme[ThemeByResult]);
  }, [ThemeByResult]);

  React.useEffect(() => {
    console.log('cmdH', cmdHistory);
    console.log('userH', userHistory);
    console.log('resultH', resultHistory);
  }, [cmdHistory, userHistory, resultHistory]);

  React.useEffect(() => {
    if (!localStorage.getItem('user')) {
      Router.push('/login')
    }
  })

  React.useEffect(() => {
    if (!localStorage.getItem('user')) {
      setUser({ name: 'user', password: '', auth: 0 })
    }
    else {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }
    , []);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
    , [inputValue]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认提交行为
    // setCmdHistory([...cmdHistory, inputValue]);
    setUserHistory([...userHistory, user.name])
    setCmdHistory([...cmdHistory, inputValue]);
    SetResult(inputValue, resultHistory, setResultHistory, clearHistory, cmdHistory, setThemeByResult, handleRouter);
    setInputValue('');
    setHints([]);
    setPointer(0);

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";


    if (e.key === "Tab") {
      e.preventDefault();
      // setInputValue(inputValue + "  ")
    }
    if (e.key === "ArrowUp") {
      const newPointer = pointer - 1;
      if (Math.abs(newPointer) <= cmdHistory.length) {
        setInputValue(cmdHistory[cmdHistory.length + newPointer]);
        setPointer(newPointer);
        console.log('pointer', newPointer, 'CmdH', cmdHistory.length);
        inputRef?.current?.blur();
      }
    }


    if (e.key === "ArrowDown") {
      if (pointer >= -1) return;
      const newPointer = pointer + 1;
      setInputValue(cmdHistory[cmdHistory.length + newPointer]);
      setPointer(newPointer);
      console.log('pointer', newPointer);
      inputRef?.current?.blur();
    }


    if (ctrlL) {
      router.push('/login')
    }


  }

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputValue, pointer]);


  const clearHistory = () => {
    setCmdHistory([]);
    setUserHistory([]);
    setResultHistory([]);
  }

  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };
  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  return (
    <Wrapper ref={containerRef} className=''>
      {/**  <Hint /> */}
      <Form onSubmit={handleSubmit} className='flex'>
        <label>
          <User>{user.name ? user.name + "@:  " : "user" + "@:   "}</User>
        </label>
        <Input title="terminal-input " className='w-full flex-1'
          type="text"
          id='terminal-input'
          autoFocus
          spellCheck="false"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          ref={inputRef}
        />
      </Form>
      <div id='history' className=''>
        {cmdHistory.map((cmdH, index) => {
          return (
            <div key={_.uniqueId(`${cmdH}_`)}>
              <div key={index}>
                <div id='terminal-info'>
                  <User> {userHistory[userHistory.length - 1]}</User>
                  <span>@: {cmdH}</span>
                </div>
                <div id='terminal-output'>
                  {resultHistory[index]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className='flex'>
        <span className=''>Hints:</span>
        {event.map((e, index) => {
          return <span key={index}>{e}</span>
        }
        )}
      </div>
    </Wrapper>


  )
}
