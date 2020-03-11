import axios from 'axios';

export default () => axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ? 'https://simple-bank-form.herokuapp.com' : 'http://localhost:8081',
});
