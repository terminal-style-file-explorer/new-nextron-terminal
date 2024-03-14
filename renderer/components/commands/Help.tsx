import {
    Cmd,
    CmdDesc,
    CmdList,
    HelpWrapper,
    KeyContainer,
  } from "../styles/help.styled";
  import { commands } from "../Terminal";
  import { generateTabs } from "../../utils/funcs";
  
 export  const Help: React.FC = () => {
    return (
      <HelpWrapper data-testid="help">
        {commands.map(({ cmd, desc, tab }) => (
          <CmdList key={cmd}>
            <Cmd>{cmd}</Cmd>
            {generateTabs(tab)}
            <CmdDesc>- {desc}</CmdDesc>
          </CmdList>
        ))}
        <KeyContainer>
          <div>Tab {generateTabs(10)} =&gt; autocompletes the command</div>
          <div>Up Arrow {generateTabs(5)} =&gt; go back to previous command</div>
          <div>Ctrl + l {generateTabs(5)} =&gt; clear the terminal</div>
        </KeyContainer>
      </HelpWrapper>
    );
  };
  
