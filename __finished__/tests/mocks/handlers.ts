import { PathParams, rest, RestRequest } from 'msw';

const SWAPI_PEOPLE_ENDPOINT = `https://swapi.dev/api/people/*`;

import lukeResponse from '../../testdata/response-swapi-people-luke-skywalker.json';

const MsgSetMswInterceptedDataFromApi = (url: string) =>
  `[MSW] - Mocking intercepted fetch request data from API: ${url}`;

const logInterceptedRequest = (req: RestRequest<any, PathParams>) =>
  console.log(MsgSetMswInterceptedDataFromApi(req.url.href));

export const handlers = [
  rest.get(`${SWAPI_PEOPLE_ENDPOINT}`, (req, res, ctx) => {
    logInterceptedRequest(req);
    return res(ctx.status(200), ctx.json(lukeResponse));
  })
  /*
  rest.post(`${SWAPI_PEOPLE_ENDPOINT}`, (req, res, ctx) => {
    logInterceptedRequest(req);
    return res(
      ctx.status(200),
      ctx.json({
        something: '123456789012345678'
      })
    );
  }),
  rest.get(`https://fail-non-200-status`, (req, res, ctx) => {
    logInterceptedRequest(req);
    return res(ctx.status(401), ctx.text(''));
  }),
  */
];
