/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

module.exports =
    process.env.NODE_ENV === 'production'
        ? withPWA({
              pwa: {
                  dest: 'public',
              },
          })
        : {};