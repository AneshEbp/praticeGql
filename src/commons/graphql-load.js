import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 2 }, // ramp up
    { duration: '10s', target: 2 }, // steady
    { duration: '5s', target: 0 }, // ramp down
  ],
};

const URL = 'https://northeastwardly-subcultrate-perla.ngrok-free.dev/graphql';

const headers = {
  'Content-Type': 'application/json',
  // Uncomment if auth required
  // 'Authorization': 'Bearer YOUR_JWT_TOKEN',
};

export default function () {
  const query = `
    query GetProfile {
      getProfile {
        _id
        email
      }
    }
  `;

  const payload = JSON.stringify({ query });

  const res = http.post(URL, payload, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'no graphql errors': (r) => !JSON.parse(r.body).errors,
  });

  sleep(1);
}
