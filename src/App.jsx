import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import './App.scss'
import Sidebar from './components/Sidebar'
import ThemeToggle from './components/ThemeToggle'
import { darkTheme, lightTheme } from './utils/theme'

library.add(fas)

export default function App() {
	const [theme, setTheme] = useState('light')
	const [sidebarOpened, setSidebarOpened] = useState(() => {
		const saved = localStorage.getItem('sidebarOpened')
		return saved === null ? true : saved === 'true'
	})

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === 'light' || savedTheme === 'dark') {
			setTheme(savedTheme)
		}
		document.documentElement.style = `background-color: ${
			!savedTheme || savedTheme === 'light' ? '#E2E8F0' : '#1E293B'
		};`
	}, [])

	useEffect(() => {
		localStorage.setItem('sidebarOpened', sidebarOpened)
	}, [sidebarOpened])

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		document.documentElement.style = `background-color: ${
			newTheme === 'light' ? '#E2E8F0' : '#1E293B'
		};`
	}

	const handleSidebarToggle = () => setSidebarOpened(v => !v)

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<div className={`theme-${theme}`}>
				<ThemeToggle theme={theme} toggleTheme={toggleTheme} />
				<div className='sidebar-outer'>
					<Sidebar color={theme} isOpened={sidebarOpened} />
					<div
						className='sidebar-toggle-outer'
						onClick={handleSidebarToggle}
						title={sidebarOpened ? 'SHRINK' : 'EXPAND'}
					>
						<FontAwesomeIcon
							icon={sidebarOpened ? 'angle-left' : 'angle-right'}
						/>
					</div>
				</div>
			</div>
		</ThemeProvider>
	)
}
