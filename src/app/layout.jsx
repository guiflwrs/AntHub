'use client';

import './globals.css'
import styles from './layout.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({href, children}) => {
	const pathname = usePathname();
	const [isActive, setIsActive] = useState(false);
	
	useEffect(() => {
		const keyword = href.match(/[a-zA-Z]/g).join("");
		const baseURL = `/${keyword}`;
		setIsActive(String(pathname).includes(baseURL));
	}, [pathname]);

	return (
		<Link
			href={href}
			className={isActive ? styles.active : undefined}
		>
			{children}
		</Link>
	)
}

export default function RootLayout({ children }) {
	const [screenSize, setScreenSize] = useState(1000);
	const isDesktop = screenSize > 795;
	const [openMobileMenu, setOpenMobileMenu] = useState(false);
	const [currentTheme, setCurrentTheme] = useState('dark');
	
	useEffect(() => {
		let oldValue;
		setCurrentTheme(oldTheme => oldValue = oldTheme);
		oldValue !== currentTheme &&
			localStorage.setItem('theme', currentTheme === 'dark' ? 'dark' : 'light');
	}, [currentTheme])

	useEffect(() => {
		setCurrentTheme(localStorage.getItem('theme'));
		window.onresize = () => setScreenSize(window.innerWidth);
		window.onscroll = () => setOpenMobileMenu(false);
		setScreenSize(window.innerWidth);
	}, []);

	return (
		<html
			lang="en"
			theme={currentTheme}
		>
			<head>
				<title>Anthub</title>
				<meta charSet='UTF-8'/>
				<meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
				<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
				<link rel="shortcut icon" href="/favicon.ico"/>
			</head>
			<body>
				<header className={styles.header}>
					<nav>
						<Link
							href="/"
							className={styles.logotype}
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						>
							{isDesktop
								? <Image
									src={currentTheme === 'dark' ? '/logoFormiga.svg' : '/logoFormiga.svg'}
									width={120}
									height={70}
									priority
									alt="Logotipo do Anthub"
								/> 
								: <Image
									src={currentTheme === 'dark' ? '/logoFormiga.svg' : '/logoFormiga.svg'}
									width={50}
									height={75}
									priority
									alt="Logotipo do AntHub"
								/>
							}
							
						</Link>

						<ul className={!isDesktop && openMobileMenu ? styles.active : undefined}>
							<li>
								<NavLink href="/relevantes">
									Relevantes
								</NavLink>
							</li>
							<li>
								<NavLink href="/recentes">
									Recentes
								</NavLink>
							</li>
						</ul>

						<div className={styles.buttons}>
							<span onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
								<Image
									src={currentTheme === 'dark' ? '/sun_light.svg' : '/sun_dark.svg'}
									width={35}
									height={33}
									alt="Ícone de alternador de tema"
								/>
							</span>
							{!isDesktop && (
								<span onClick={() => setOpenMobileMenu(!openMobileMenu)}>
									<span></span>
									<span></span>
									<span></span>
								</span>
							)}
						</div>
					</nav>
				</header>

				<main className={styles.main}>
					{children}
				</main>

				<footer className={styles.footer}>
					<div className={styles.logotype}>
						<Image
							src={currentTheme === 'dark' ? '/logoFormiga.svg' : '/logoFormiga.svg'}
							width={120}
							height={60}
							alt="Logotipo do AntHub"
						/>
					</div>

					<ul>
						<li>Contato</li>
						<li>Github</li>
						<li>Museu</li>
						<li>RSS</li>
						<li>Sobre</li>
						<li>Status</li>
						<li>Termos de Uso</li>
					</ul>
				</footer>
			</body>
		</html>
	)
}
