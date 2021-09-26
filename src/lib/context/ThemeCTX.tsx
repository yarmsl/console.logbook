import { Theme, ThemeProvider } from '@material-ui/core';
import { ReactElement, useContext, useReducer, createContext } from 'react';
import lightTheme from '../../UI/lightTheme';
import darkTheme from '../../UI/darkTheme';

interface ThemeCtx {
	theme?: Theme;
	switchTheme: (str: 'light' | 'dark') => void;
}

const ThemeCTX = createContext({} as ThemeCtx );

export const useThemes = (): ThemeCtx => useContext(ThemeCTX);

const LIGHT = 'light',
	DARK = 'dark';

const reducer = (theme: Theme, action: LDTheme) => {
	switch (action.type) {
	case LIGHT:
		return lightTheme;
	case DARK:
		return darkTheme;
	default:
		return theme;
	}
};

const ThemesProvider = ({ children }: Child): ReactElement => {

	const [theme, dispatch] = useReducer(reducer, lightTheme);
	const switchTheme = (str: 'light' | 'dark') => dispatch({type: str});

	return (
		<ThemeCTX.Provider value={{switchTheme}}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</ThemeCTX.Provider>
	);
};

export default ThemesProvider;