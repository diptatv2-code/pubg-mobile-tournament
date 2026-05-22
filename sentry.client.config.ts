import * as Sentry from '@sentry/nextjs'
Sentry.init({
  dsn: 'https://placeholder@sentry.io/pubg-tournament',
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === 'production',
})
