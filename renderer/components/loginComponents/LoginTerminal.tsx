import React from 'react';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { CmdNotFound, Empty, Form, Input, User, Wrapper } from '../styles/terminal.styled';
import { setUserToLS } from '../../utils/storage';
import { useRouter } from 'next/router';

type User = {
  name: string;
  password: string;
  auth: number;
};

type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];



export const commands: Command = [
  { cmd: "addUser", desc: "create an account", tab: 6 },
  { cmd: "su", desc: "change user", tab: 11 },
];

export default function LoginTerminal() {
  const [inputValue, setInputValue] = React.useState('');
  const [cmdHistory, setCmdHistory] = React.useState<string[]>([]);
  const [resultHistory, setResultHistory] = React.useState<JSX.Element[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [user, setUser] = React.useState<User>(
    { name: 'visitor', password: '000000', auth: 0 }
  );
  function checkUser(user: User) {
    return true;

  }
  function addUser(user: User) {
    return true;
  
  }

  const cmdParse = (cmd: string) => {
    let cmdArray = _.split(_.trim(cmd), ' ');
    let validCmd = _.find(commands, { cmd: cmdArray[0] });
    let currentCmd = cmdArray[0];
    if (cmd === '') {
      return <Empty />;
    }
    else if (validCmd) {
      if (cmdArray.length === 3) {
        let userToCheck = { name: cmdArray[1], password: cmdArray[2], auth: 0 };
        switch (currentCmd) {
          case "addUser":
            if (addUser(userToCheck)) {
              // 库中不存在对应用户名，可以新建用户
              cleanHisotry();
              setUser(userToCheck);
              setUserToLS(userToCheck);
              router.push('/home');
            }
            else {
              return <div>user already exists</div>
            }
            break;
          case "su":
            if (checkUser(userToCheck)) {
              // 用户存在，可以切换用户
              return <div>user changed</div>
            }
            else {
              return <div>user not found</div>
            }
            break;
        }
      }
      else {
        return <CmdNotFound>
          invalid command: {cmd}
        </CmdNotFound>
      }
    }
    else {
      return <CmdNotFound>
        command not found: {cmd}
      </CmdNotFound>
    }
  }


  const cleanHisotry = () => {
    setCmdHistory([]);
    setResultHistory([]);
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCmdHistory([...cmdHistory, inputValue]);
    setResultHistory([...resultHistory, cmdParse(inputValue)]);
    setInputValue('');
  }

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputValue]);


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
    <Wrapper ref={containerRef}>
      <Form onSubmit={handleSubmit} className='flex'>
        <label>
          <User>{user.name + "@: "}</User>
        </label>
        <Input title="termianl-input" className='w-full flex-1'
          type='text'
          id='terminal-input'
          autoFocus
          spellCheck="false"
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
        />
      </Form>
      <div id='history'>
        {cmdHistory.map((cmdH, index) => {
          return (
            <div key={_.uniqueId(`${cmdH}_`)}>
              <div key={index}>
                <div id='terminal-info'>
                  <User>{user.name}</User>
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
    </Wrapper>
  );
}