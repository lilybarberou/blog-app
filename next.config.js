const withPWA = require('next-pwa')({
    dest: 'public',
});

module.exports = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: {
            displayName: true,
            ssr: true,
        },
    },
});
