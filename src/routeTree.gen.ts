/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router';

// Import Routes

import { Route as rootRoute } from './routes/__root';

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')();
const PaymentIndexLazyImport = createFileRoute('/payment/')();
const NotificationIndexLazyImport = createFileRoute('/notification/')();
const HistoryIndexLazyImport = createFileRoute('/history/')();
const FlightIndexLazyImport = createFileRoute('/flight/')();
const CheckoutIndexLazyImport = createFileRoute('/checkout/')();
const AccountIndexLazyImport = createFileRoute('/account/')();
const FlightSelectFlightLazyImport = createFileRoute('/flight/selectFlight')();
const AuthRegisterLazyImport = createFileRoute('/auth/register')();
const AuthLogoutLazyImport = createFileRoute('/auth/logout')();
const AuthLoginLazyImport = createFileRoute('/auth/login')();
const AuthPasswordResetVerifyEmailLazyImport = createFileRoute('/auth/password-reset/verify-email')();
const AuthPasswordResetTokenLazyImport = createFileRoute('/auth/password-reset/$token')();

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route));

const PaymentIndexLazyRoute = PaymentIndexLazyImport.update({
  id: '/payment/',
  path: '/payment/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/payment/index.lazy').then((d) => d.Route));

const NotificationIndexLazyRoute = NotificationIndexLazyImport.update({
  id: '/notification/',
  path: '/notification/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notification/index.lazy').then((d) => d.Route));

const HistoryIndexLazyRoute = HistoryIndexLazyImport.update({
  id: '/history/',
  path: '/history/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/history/index.lazy').then((d) => d.Route));

const FlightIndexLazyRoute = FlightIndexLazyImport.update({
  id: '/flight/',
  path: '/flight/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/flight/index.lazy').then((d) => d.Route));

const CheckoutIndexLazyRoute = CheckoutIndexLazyImport.update({
  id: '/checkout/',
  path: '/checkout/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/checkout/index.lazy').then((d) => d.Route));

const AccountIndexLazyRoute = AccountIndexLazyImport.update({
  id: '/account/',
  path: '/account/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/account/index.lazy').then((d) => d.Route));

const FlightSelectFlightLazyRoute = FlightSelectFlightLazyImport.update({
  id: '/flight/selectFlight',
  path: '/flight/selectFlight',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/flight/selectFlight.lazy').then((d) => d.Route));

const AuthRegisterLazyRoute = AuthRegisterLazyImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/register.lazy').then((d) => d.Route));

const AuthLogoutLazyRoute = AuthLogoutLazyImport.update({
  id: '/auth/logout',
  path: '/auth/logout',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/logout.lazy').then((d) => d.Route));

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route));

const AuthPasswordResetVerifyEmailLazyRoute = AuthPasswordResetVerifyEmailLazyImport.update({
  id: '/auth/password-reset/verify-email',
  path: '/auth/password-reset/verify-email',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/password-reset/verify-email.lazy').then((d) => d.Route));

const AuthPasswordResetTokenLazyRoute = AuthPasswordResetTokenLazyImport.update({
  id: '/auth/password-reset/$token',
  path: '/auth/password-reset/$token',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/password-reset/$token.lazy').then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/login': {
      id: '/auth/login';
      path: '/auth/login';
      fullPath: '/auth/login';
      preLoaderRoute: typeof AuthLoginLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/logout': {
      id: '/auth/logout';
      path: '/auth/logout';
      fullPath: '/auth/logout';
      preLoaderRoute: typeof AuthLogoutLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/register': {
      id: '/auth/register';
      path: '/auth/register';
      fullPath: '/auth/register';
      preLoaderRoute: typeof AuthRegisterLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/flight/selectFlight': {
      id: '/flight/selectFlight';
      path: '/flight/selectFlight';
      fullPath: '/flight/selectFlight';
      preLoaderRoute: typeof FlightSelectFlightLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/account/': {
      id: '/account/';
      path: '/account';
      fullPath: '/account';
      preLoaderRoute: typeof AccountIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/checkout/': {
      id: '/checkout/';
      path: '/checkout';
      fullPath: '/checkout';
      preLoaderRoute: typeof CheckoutIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/flight/': {
      id: '/flight/';
      path: '/flight';
      fullPath: '/flight';
      preLoaderRoute: typeof FlightIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/history/': {
      id: '/history/';
      path: '/history';
      fullPath: '/history';
      preLoaderRoute: typeof HistoryIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/notification/': {
      id: '/notification/';
      path: '/notification';
      fullPath: '/notification';
      preLoaderRoute: typeof NotificationIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/payment/': {
      id: '/payment/';
      path: '/payment';
      fullPath: '/payment';
      preLoaderRoute: typeof PaymentIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/password-reset/$token': {
      id: '/auth/password-reset/$token';
      path: '/auth/password-reset/$token';
      fullPath: '/auth/password-reset/$token';
      preLoaderRoute: typeof AuthPasswordResetTokenLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/password-reset/verify-email': {
      id: '/auth/password-reset/verify-email';
      path: '/auth/password-reset/verify-email';
      fullPath: '/auth/password-reset/verify-email';
      preLoaderRoute: typeof AuthPasswordResetVerifyEmailLazyImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute;
  '/auth/login': typeof AuthLoginLazyRoute;
  '/auth/logout': typeof AuthLogoutLazyRoute;
  '/auth/register': typeof AuthRegisterLazyRoute;
  '/flight/selectFlight': typeof FlightSelectFlightLazyRoute;
  '/account': typeof AccountIndexLazyRoute;
  '/checkout': typeof CheckoutIndexLazyRoute;
  '/flight': typeof FlightIndexLazyRoute;
  '/history': typeof HistoryIndexLazyRoute;
  '/notification': typeof NotificationIndexLazyRoute;
  '/payment': typeof PaymentIndexLazyRoute;
  '/auth/password-reset/$token': typeof AuthPasswordResetTokenLazyRoute;
  '/auth/password-reset/verify-email': typeof AuthPasswordResetVerifyEmailLazyRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute;
  '/auth/login': typeof AuthLoginLazyRoute;
  '/auth/logout': typeof AuthLogoutLazyRoute;
  '/auth/register': typeof AuthRegisterLazyRoute;
  '/flight/selectFlight': typeof FlightSelectFlightLazyRoute;
  '/account': typeof AccountIndexLazyRoute;
  '/checkout': typeof CheckoutIndexLazyRoute;
  '/flight': typeof FlightIndexLazyRoute;
  '/history': typeof HistoryIndexLazyRoute;
  '/notification': typeof NotificationIndexLazyRoute;
  '/payment': typeof PaymentIndexLazyRoute;
  '/auth/password-reset/$token': typeof AuthPasswordResetTokenLazyRoute;
  '/auth/password-reset/verify-email': typeof AuthPasswordResetVerifyEmailLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexLazyRoute;
  '/auth/login': typeof AuthLoginLazyRoute;
  '/auth/logout': typeof AuthLogoutLazyRoute;
  '/auth/register': typeof AuthRegisterLazyRoute;
  '/flight/selectFlight': typeof FlightSelectFlightLazyRoute;
  '/account/': typeof AccountIndexLazyRoute;
  '/checkout/': typeof CheckoutIndexLazyRoute;
  '/flight/': typeof FlightIndexLazyRoute;
  '/history/': typeof HistoryIndexLazyRoute;
  '/notification/': typeof NotificationIndexLazyRoute;
  '/payment/': typeof PaymentIndexLazyRoute;
  '/auth/password-reset/$token': typeof AuthPasswordResetTokenLazyRoute;
  '/auth/password-reset/verify-email': typeof AuthPasswordResetVerifyEmailLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | '/'
    | '/auth/login'
    | '/auth/logout'
    | '/auth/register'
    | '/flight/selectFlight'
    | '/account'
    | '/checkout'
    | '/flight'
    | '/history'
    | '/notification'
    | '/payment'
    | '/auth/password-reset/$token'
    | '/auth/password-reset/verify-email';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/'
    | '/auth/login'
    | '/auth/logout'
    | '/auth/register'
    | '/flight/selectFlight'
    | '/account'
    | '/checkout'
    | '/flight'
    | '/history'
    | '/notification'
    | '/payment'
    | '/auth/password-reset/$token'
    | '/auth/password-reset/verify-email';
  id:
    | '__root__'
    | '/'
    | '/auth/login'
    | '/auth/logout'
    | '/auth/register'
    | '/flight/selectFlight'
    | '/account/'
    | '/checkout/'
    | '/flight/'
    | '/history/'
    | '/notification/'
    | '/payment/'
    | '/auth/password-reset/$token'
    | '/auth/password-reset/verify-email';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute;
  AuthLoginLazyRoute: typeof AuthLoginLazyRoute;
  AuthLogoutLazyRoute: typeof AuthLogoutLazyRoute;
  AuthRegisterLazyRoute: typeof AuthRegisterLazyRoute;
  FlightSelectFlightLazyRoute: typeof FlightSelectFlightLazyRoute;
  AccountIndexLazyRoute: typeof AccountIndexLazyRoute;
  CheckoutIndexLazyRoute: typeof CheckoutIndexLazyRoute;
  FlightIndexLazyRoute: typeof FlightIndexLazyRoute;
  HistoryIndexLazyRoute: typeof HistoryIndexLazyRoute;
  NotificationIndexLazyRoute: typeof NotificationIndexLazyRoute;
  PaymentIndexLazyRoute: typeof PaymentIndexLazyRoute;
  AuthPasswordResetTokenLazyRoute: typeof AuthPasswordResetTokenLazyRoute;
  AuthPasswordResetVerifyEmailLazyRoute: typeof AuthPasswordResetVerifyEmailLazyRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthLoginLazyRoute: AuthLoginLazyRoute,
  AuthLogoutLazyRoute: AuthLogoutLazyRoute,
  AuthRegisterLazyRoute: AuthRegisterLazyRoute,
  FlightSelectFlightLazyRoute: FlightSelectFlightLazyRoute,
  AccountIndexLazyRoute: AccountIndexLazyRoute,
  CheckoutIndexLazyRoute: CheckoutIndexLazyRoute,
  FlightIndexLazyRoute: FlightIndexLazyRoute,
  HistoryIndexLazyRoute: HistoryIndexLazyRoute,
  NotificationIndexLazyRoute: NotificationIndexLazyRoute,
  PaymentIndexLazyRoute: PaymentIndexLazyRoute,
  AuthPasswordResetTokenLazyRoute: AuthPasswordResetTokenLazyRoute,
  AuthPasswordResetVerifyEmailLazyRoute: AuthPasswordResetVerifyEmailLazyRoute,
};

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/auth/login",
        "/auth/logout",
        "/auth/register",
        "/flight/selectFlight",
        "/account/",
        "/checkout/",
        "/flight/",
        "/history/",
        "/notification/",
        "/payment/",
        "/auth/password-reset/$token",
        "/auth/password-reset/verify-email"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/auth/login": {
      "filePath": "auth/login.lazy.jsx"
    },
    "/auth/logout": {
      "filePath": "auth/logout.lazy.jsx"
    },
    "/auth/register": {
      "filePath": "auth/register.lazy.jsx"
    },
    "/flight/selectFlight": {
      "filePath": "flight/selectFlight.lazy.jsx"
    },
    "/account/": {
      "filePath": "account/index.lazy.jsx"
    },
    "/checkout/": {
      "filePath": "checkout/index.lazy.jsx"
    },
    "/flight/": {
      "filePath": "flight/index.lazy.jsx"
    },
    "/history/": {
      "filePath": "history/index.lazy.jsx"
    },
    "/notification/": {
      "filePath": "notification/index.lazy.jsx"
    },
    "/payment/": {
      "filePath": "payment/index.lazy.jsx"
    },
    "/auth/password-reset/$token": {
      "filePath": "auth/password-reset/$token.lazy.jsx"
    },
    "/auth/password-reset/verify-email": {
      "filePath": "auth/password-reset/verify-email.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
