import React from 'react';
import _ from 'lodash';
import { Form, Input, User, Wrapper } from '../styles/terminal.styled';

type User = {
  name: string;
  password: string;
  auth: number;
};

export default function LoginTerminal() {
  const [inputValue, setInputValue] = React.useState('');
  const [cmdHistory, setCmdHistory] = React.useState<string[]>([]);
  const [resultHistory, setResultHistory] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [user, setUser] = React.useState<User>(
    { name: 'visitor', password: '000000', auth: 0 }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCmdHistory([...cmdHistory, inputValue]);
    setResultHistory([...resultHistory, inputValue]);
    setInputValue('');
  }


  return (
    <Wrapper >
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
                  <User>{user.name + "@: "}</User>
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