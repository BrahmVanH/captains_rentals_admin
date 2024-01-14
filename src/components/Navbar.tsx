import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useTheme } from 'styled-components';
import mobileLogoSvg from '../../assets/logo/logo.svg';
import logoSvg from '../../assets/logo/logo_no_trees.svg';
import styled from 'styled-components';
import { ITheme } from '../types';

const Nav = styled.nav<{ $theme: ITheme }>`
	border-bottom: ${(props) => ` 5px solid ${props.$theme.colors.secondary} `};
	z-index: 1000;
	width: 100%;
	background-color: ${(props) => props.$theme.colors.bg};
`;

const NLink = styled(NavLink)`
  `&.active`: 
`

export default function Navbar() {
	const [mobileViewport, setMobileViewport] = useState(false);
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [dropdownMenuDisplay, setDropdownMenuDisplay] = useState('none');
	const [brandLogo, setBrandLogo] = useState({
		image: mobileLogoSvg,
		width: '100px',
	});
	const nav = useRef();
	const dropdown = useRef();

	const isMediumViewport = () => {
		return window.innerWidth < 766;
	};

	const toggleDropDown = () => {
		showDropdownMenu ? setShowDropdownMenu(false) : setShowDropdownMenu(true);
	};

	useEffect(() => {
		const mobile = isMediumViewport();
		mobile ? setMobileViewport(true) : setMobileViewport(false);
		mobile
			? setBrandLogo({
					image: mobileLogoSvg,
					width: '75px',
			  })
			: setBrandLogo({
					image: logoSvg,
					width: '125px',
			  });
	}, []);

	useEffect(() => {
		showDropdownMenu ? setDropdownMenuDisplay('') : setDropdownMenuDisplay('none');
	}, [showDropdownMenu]);
}
