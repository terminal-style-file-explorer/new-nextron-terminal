import { Wrapper } from "../styles/outout.styled";
import { ThemesWrapper, ThemeSpan } from "../styles/themes.styled";
import { Usage } from "../Usage";

export function ThemesInvalid(setHistorytoReturn, myThemes) {
    setHistorytoReturn(
        <Wrapper >

            <Usage cmd="themes" />
            <ThemesWrapper>
                available themes:
            </ThemesWrapper>
            <ThemesWrapper>

                {myThemes.map(myTheme => (
                    <ThemeSpan key={myTheme}>{myTheme}</ThemeSpan>
                ))}
            </ThemesWrapper>
        </Wrapper>
    );
}