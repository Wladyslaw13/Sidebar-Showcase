import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import logo from '../../assets/logo.png'

const cubic = 'cubic-bezier(0.77, 0, 0.175, 1)'

const SidebarContainer = styled.div`
	position: relative;
	width: ${props => (props.$opened ? '180px' : '50px')};
	height: calc(100vh - 50px);
	max-height: 100vh;
	overflow-y: hidden;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	padding: ${props => (props.$opened ? '1rem' : '0.5rem')};
	transition: width 0.4s ${cubic}, padding 0.4s ${cubic};
	border: 1px solid lightgray;
	border-radius: 8px;
	background-color: ${props => props.theme.sidebarBg};
`

const SidebarHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: ${props => (props.$opened ? 'flex-start' : 'center')};
	margin-bottom: 1.5rem;
	position: relative;

	img {
		width: ${props => (props.$opened ? '40px' : '32px')};
		height: ${props => (props.$opened ? '40px' : '32px')};
		margin-right: ${props => (props.$opened ? '0.5rem' : '0')};
		flex-shrink: 0;
		transition: width 0.4s ${cubic}, height 0.4s ${cubic},
			margin-right 0.4s ${cubic};
	}
`

const SidebarSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${props =>
		props.$content &&
		css`
			flex-grow: 1;
			margin-bottom: auto;
		`}
`

const SidebarItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: ${props => (props.$opened ? 'flex-start' : 'center')};
	padding: ${props => (props.$opened ? '0.5rem 1rem' : '0.5rem')};
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 0.2s, color 0.2s;
	text-decoration: none;
	text-align: ${props => (props.$opened ? 'left' : 'center')};
	font-size: ${props => (props.$opened ? '1rem' : '0.8rem')};
	color: ${props => props.theme.text};

	svg {
		width: 24px;
		height: 24px;
		margin-right: ${props => (props.$opened ? '1rem' : '0')};
		transition: margin-right 0.4s ${cubic};
	}

	&:hover {
		background-color: ${props => props.theme.sidebarBgHover};
		color: ${props => props.theme.textHover};
	}
	&:active,
	&:focus {
		background-color: ${props => props.theme.sidebarBgActive};
		color: ${props => props.theme.textActive};
	}
`

const Sidebar = ({ color, isOpened }) => {
	const focusRef = useRef(null)

	useEffect(() => {
		if (focusRef.current) {
			focusRef.current.focus()
		}
	}, [])

	const containerClassnames = classnames('sidebar', {
		open: isOpened,
		[`theme-${color}`]: true,
	})

	const routes = [
		{ title: 'Home', icon: 'fas-solid fa-house', path: '/' },
		{ title: 'Sales', icon: 'chart-line', path: '/sales' },
		{ title: 'Costs', icon: 'chart-column', path: '/costs' },
		{ title: 'Payments', icon: 'wallet', path: '/payments' },
		{ title: 'Finances', icon: 'chart-pie', path: '/finances' },
		{ title: 'Messages', icon: 'envelope', path: '/messages' },
	]

	const bottomRoutes = [
		{ title: 'Settings', icon: 'sliders', path: '/settings' },
		{ title: 'Support', icon: 'phone-volume', path: '/support' },
	]

	const goToRoute = path => {
		console.log(`going to "${path}"`)
	}

	return (
		<SidebarContainer className={containerClassnames} $opened={isOpened}>
			<SidebarHeader $opened={isOpened}>
				<img src={logo} alt='TensorFlow logo' />
				{isOpened && <span className='logo-text'>TensorFlow</span>}
			</SidebarHeader>

			<SidebarSection $content>
				{routes.map(route => (
					<SidebarItem
						key={route.title}
						tabIndex={0}
						$opened={isOpened}
						onClick={() => goToRoute(route.path)}
						title={route.title}
						aria-label={route.title}
						ref={route.title === 'Home' ? focusRef : null}
					>
						<FontAwesomeIcon icon={route.icon} />
						{isOpened && <span>{route.title}</span>}
					</SidebarItem>
				))}
			</SidebarSection>

			<SidebarSection>
				{bottomRoutes.map(route => (
					<SidebarItem
						key={route.title}
						tabIndex={0}
						$opened={isOpened}
						onClick={() => goToRoute(route.path)}
						title={route.title}
						aria-label={route.title}
					>
						<FontAwesomeIcon icon={route.icon} />
						{isOpened && <span>{route.title}</span>}
					</SidebarItem>
				))}
			</SidebarSection>
		</SidebarContainer>
	)
}

Sidebar.propTypes = {
	color: PropTypes.oneOf(['light', 'dark']),
	isOpened: PropTypes.bool,
}

export default Sidebar
