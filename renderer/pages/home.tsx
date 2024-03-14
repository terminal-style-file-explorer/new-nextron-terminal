import { useRouter } from 'next/router';

import React, { useCallback } from 'react'

type User = {
  name: string;
  password: string;
  auth: number;
};


export default function HomePage() {
  const Router = useRouter();
  const [user, setUser] = React.useState<User>({ name: '', password: '', auth: 0 });
  const [history, setHistory] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')
  const [pointer, setPointer] = React.useState(-1)
  const [userHistory, setUserHistory] = React.useState([])

  /*   React.useEffect(() => {
      if (!localStorage.getItem('user')) {
        Router.push('/login')
      }
    }) */

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
    , [inputValue]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认提交行为
    setHistory([...history, inputValue]);
    setUserHistory([...userHistory, user.name])
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      // setInputValue(inputValue + "  ")
    }
    if (e.key === "ArrowUp") {
    }
    if (e.key === "ArrowDown") {
    }

  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <>

      <div id='history' className=''>
        {history.map((item, index) => (
          <div key={index}>{userHistory[userHistory.length - 1]}@: {item}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='flex'>
        <label>{user.name ? user.name : " " + "@"}</label>
        <input title="terminal-input " className='w-full flex-1'
          type="text"
          id='terminal-input'
          autoFocus
          spellCheck="false"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </form>
    </>
  )
}
