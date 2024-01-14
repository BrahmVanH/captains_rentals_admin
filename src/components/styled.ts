import styled from 'styled-components';
import { ITheme } from '../types';

export const theme: ITheme = {
	colors: {
		primary: '#5f8fa5',
		secondary: 'rgb(200, 188, 167, 0.6)',
		bg: '#ffffff',
	},
};

export const AlertRect = styled.div`
	border-radius: 6px;
	border: 1px solid red;
	background-color: #ff000081;
	padding: 0rem 0.25rem;
`;

export const AlertMessage = styled.p`
	font-family: 'Open Sans', sans-serif;
	font-size: 10px;
	margin: 0.25rem;
`;
