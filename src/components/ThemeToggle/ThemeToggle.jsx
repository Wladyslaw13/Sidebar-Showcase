import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ToggleButton = styled.button`
	position: absolute;
	top: 2rem;
	right: 2rem;
	background-color: ${({ theme }) =>
		theme.toggleBg || 'var(--color-button-background-light-default)'};
	border: none;
	cursor: pointer;
	font-size: 3rem;
	padding: 1rem;
	border-radius: 12px;
	transition: color 0.4s cubic-bezier(0.77, 0, 0.175, 1),
		background-color 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	color: ${({ theme }) =>
		theme.toggleColor || 'var(--color-text-light-default)'};

	&:active {
		background-color: ${({ theme }) =>
			theme.toggleBgActive || 'var(--color-button-background-light-active)'};
	}
`

const ThemeToggle = ({ theme, toggleTheme }) => {
	const isDark = theme === 'dark'

	return (
		<ToggleButton
			onClick={toggleTheme}
			title='Change theme'
			aria-label='Change theme'
		>
			<FontAwesomeIcon icon={isDark ? 'sun' : 'moon'} />
		</ToggleButton>
	)
}

ThemeToggle.propTypes = {
	theme: PropTypes.oneOf(['light', 'dark']).isRequired,
	toggleTheme: PropTypes.func.isRequired,
}

export default ThemeToggle
