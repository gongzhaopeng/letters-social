if (process.env.NODE_ENV === 'production') {
    window.Raven.config('https://3578aee2ae8b44ad9e2cd67a98e19678@sentry.io/1768058').install();
}
