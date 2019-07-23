// @flow

const apiHost = 'https://personaltest13.herokuapp.com/test-provider/v1/';

const request = async (url, options = {}) => {
  let response;
  try {
    response = await fetch(`${apiHost}${url}`, options);

    switch (response.status) {
      case 404:
        throw Error('not_found');
      case 405:
        throw Error('not_allowed');
      default:
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return response.json();
};
const get = url => request(url);
const post = (url, options) => request(url, { method: 'POST', ...options });
// http://ergast.com/api/f1/2018/driverStandings
// lsit with winner
export { get, post };
