
import { AUTH_KEY } from '@env';

export const handleClerkClient = async () => {

  const url = 'https://clerk.effling.com/v1/client';
  const response = await fetch(url,);
  return response;
};

export const prepareFirstFactorLogin = async (sid: string) => {
  console.log(AUTH_KEY, 'AuthKey');
  const url = `https://clerk.effling.com/v1/client/sign_ins/${sid}/prepare_first_factor?_is_native=true`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${AUTH_KEY}`,
  };
  const newData = {
    strategy: 'email_code',
  };

  const formBody: string = Object.keys(newData)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((newData as any)[key]))
    .join('&');

  console.log('factorbody', formBody)

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: formBody,
  });


  console.log('First Factor Prepared', response);

  // return response;
};

export const prepareFirstFactorRegister = async (sid: string) => {
  console.log(AUTH_KEY, 'AuthKey');
  const url = `https://clerk.effling.com/v1/client/sign_ups/${sid}/prepare_verification?_is_native=true`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${AUTH_KEY}`,
  };
  const newData = {
    strategy: 'email_code',
  };

  const formBody: string = Object.keys(newData)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((newData as any)[key]))
    .join('&');

  console.log('factorbody', formBody);

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: formBody,
  });


  console.log('First Factor SignUp Prepared', response);
  console.log('SignUp Prepared', response.json());

  // return response;
};

