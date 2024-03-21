import { UsageDiv } from '../components/styles/outout.styled';

type Props = {
  cmd: "themes" | "projects" | "socials";
  marginY?: boolean;
};

const arg = {
  themes: { placeholder: "theme-name", example: "ubuntu" },
  projects: { placeholder: "project-no", example: "4" },
  socials: { placeholder: "social-no", example: "1" },
};

export const Usage: React.FC<Props> = ({ cmd, marginY = false }) => {
  const action = cmd === "themes" ? "set" : "go";
  return (
    <UsageDiv data-testid={`${cmd}-invalid-arg`} as="div">
      Usage: {cmd} {action} &#60;{arg[cmd].placeholder}&#62; <br />
      eg: {cmd} {action} {arg[cmd].example}
    </UsageDiv>
  );
};

