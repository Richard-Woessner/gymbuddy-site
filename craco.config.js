const path = require('path');

const webpack = {
  alias: {
    '@api': path.resolve(__dirname, 'src/api/'),
    '@assets': path.resolve(__dirname, 'src/assets/'),
    '@components': path.resolve(__dirname, 'src/components/'),
    '@hooks': path.resolve(__dirname, 'src/hooks/'),
    '@i18n': path.resolve(__dirname, 'src/i18n/'),
    '@models': path.resolve(__dirname, 'src/models/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@store': path.resolve(__dirname, 'src/store/'),
    '@themes': path.resolve(__dirname, 'src/themes/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
  },
};

module.exports = { webpack };
