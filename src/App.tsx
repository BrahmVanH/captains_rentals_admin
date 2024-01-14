import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LogRocket from 'logrocket';

import ToastNotif from './components/ToastNotif';
import ErrorProvider, { ErrorContext } from './context/ErrorContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrFallBack from './components/ErrFallback';
import '@csstools/normalize.css';

import { theme } from './components/styled';

const typeDefs = gql`
	type imageObject {
		original: String
		thumbnail: String
		originalAlt: String
		thumbnailAlt: String
	}
	type homePgImgPack {
		headerImgUrl: String
		hideawayImgUrl: String
		cottageImgUrl: String
	}
	type hideawayImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}
	type cottageImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}
	type Query {
		getHomePgImgs: homePgImgPack
		getHideawayImgs: hideawayImgPack
		getCottageImgs: cottageImgPack
		getAboutPgImg: String
	}
`;

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) => {
			LogRocket.captureMessage(`[GraphQL error]: ${message}`);
		});
	}

	if (networkError) {
		LogRocket.captureMessage(`[Network error]: ${networkError}`);
	}
});

const httpLink = new HttpLink({
	uri: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:3001/graphql',
});
const link = ApolloLink.from([errorLink, httpLink]);

// Define cache policies
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				getHomePgImgs: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
				getHideawayImgs: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
				getCottageImgs: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
				getAboutPgImg: {
					keyArgs: [],
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	link,
	cache: cache,
	typeDefs: typeDefs,
});
function App() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	return (
		<ApolloProvider client={client}>
			<Router>
				<ErrorProvider>
					<ErrorBoundary fallback={<ErrFallBack />}>
						<ThemeProvider theme={theme}>
							<Navbar />
							<Routes>
								<Route path='/' element={<Home />} />
							</Routes>
						</ThemeProvider>
					</ErrorBoundary>
				</ErrorProvider>
			</Router>
		</ApolloProvider>
	);
}

export default App;
