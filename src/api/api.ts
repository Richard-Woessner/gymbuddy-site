import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('dashboard-console') === 'true')
      console.log(`[Api-Req]: ${config.url}`, config);

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    if (localStorage.getItem('dashboard-console') === 'true')
      console.log(`[Api-Res]: ${response.config.url}`, response);
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          if (localStorage.getItem('dashboard-console') === 'true')
            console.log('Not Found 404');
          break;
        case 500:
          if (localStorage.getItem('dashboard-console') === 'true')
            console.log('Server Error 500');
          break;
        default:
          if (localStorage.getItem('dashboard-console') === 'true')
            console.log(error);
      }
    }
    if (localStorage.getItem('dashboard-console') === 'true')
      console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
