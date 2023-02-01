import Ajv from 'ajv';

import { assertions } from './assertions';

const INTEGRATION_ENDPOINT =
  process.env.INTEGRATION_ENDPOINT || 'https://eqovm9x2h8.execute-api.eu-north-1.amazonaws.com/dev';

async function runIntegrationTests() {
  if (!INTEGRATION_ENDPOINT) throw new Error('Missing INTEGRATION_ENDPOINT!');
  let testsFailed = false;

  const tests = assertions.map(async (assertion: any) => {
    return new Promise(async (resolve, reject) => {
      const { name, payload, schema, is } = assertion;
      const { method, path, headers, body, urlParams } = payload;

      console.log(`Running integration test: "${name}"`);

      const response = await fetchData(
        `${INTEGRATION_ENDPOINT}/${path}`,
        headers,
        method,
        body,
        urlParams
      );
      if (!response) throw new Error('❌ No response!');

      /**
       * If there is an Ajv matching schema use that to check,
       * else check for a directly provided `is` match or use
       * an exact comparison for `OK` response as a fallback.
       */
      const isMatch = (() => {
        if (schema) return test(schema, response);
        if (is) response === schema?.is;
        return JSON.stringify(response) === JSON.stringify('OK');
      })();

      if (isMatch) resolve(true);
      else {
        testsFailed = true;
        reject({ name, response });
      }
    });
  });

  Promise.all(tests)
    .catch((error) => error)
    .then((result) => {
      if (testsFailed) {
        console.log(
          `❌ Failed integration test: "${result.name}" --> ${JSON.stringify(result.response)}`
        );
        process.exit(1);
      } else {
        console.log('✅ Passed all integration tests');
      }
    });
}

/**
 * @description Wrapper for fetching data.
 */
async function fetchData(
  url: string,
  headers: Record<string, any>,
  method: 'POST' | 'PATCH' | 'GET',
  body: any,
  urlParams: Record<string, any>
): Promise<any> {
  const fetchUrl = urlParams ? `${url}${getParamsString(urlParams)}` : url;

  const response = await fetch(fetchUrl, {
    headers,
    body: body ? JSON.stringify(body) : undefined,
    method
  });

  // If this is OK and status 204 ("No content") then we can safely return
  if (response.ok && response.status === 204) return 'OK';

  const text = await response.text();

  // Return text or JSON depending on what it actually was
  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    return text;
  }
}

const escapeString = (value: any) => {
  if (typeof value === 'string') return value;
  return JSON.stringify(value).replace(/\s/g, '%20').replace(/"/gi, '\\"');
};

const getParamsString = (urlParams: Record<string, any>) =>
  Object.entries(urlParams).reduce(
    (previousValue: [string, any], currentValue: any[], index: number): any => {
      let paramValue = index === 1 ? `?` : `${previousValue}&`;

      // On the first run this will include the "zeroth" value
      if (index === 1) {
        const [key, value] = previousValue;
        paramValue += `${key}=${escapeString(value)}&`;
      }

      const [key, value] = currentValue;
      paramValue += `${key}=${escapeString(escapeString(value))}`;

      return paramValue;
    }
  );

/**
 * @description Run a test by validating a schema with Ajv.
 */
function test(schema: Record<string, any>, data: any): boolean {
  const isArray = Array.isArray(data);
  if (isArray) data = data[0]; // Use the first item in an array if this is one

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  // @ts-ignore
  return isValid;
}

runIntegrationTests();
