import { Request } from 'express';

import { AuthService } from './AuthService';
import { ConfigService } from './ConfigService';

class MockConfigService {
  get = jest.fn().mockImplementation(() => {
    return 'correct_token';
  });
}

describe(AuthService, () => {
  const mockedConfigService = new MockConfigService() as unknown as ConfigService;
  const service = new AuthService(mockedConfigService);

  it('Successful authorization', () => {
    const request= { headers: { authorization: 'correct_token' } } as unknown as Request;

    const result = service.isAuthorized(request);

    expect(result).toBeTruthy();
  });

  it('Failed authorization', () => {
    const request= { headers: { authorization: 'wrong_token' } } as unknown as Request;

    const result = service.isAuthorized(request);

    expect(result).toBeFalsy();
  });
});