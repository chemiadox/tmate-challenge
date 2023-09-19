import { ConfigService } from './ConfigService';
import { Environment } from '../types/Environment';

jest.mock('dotenv');
import { configDotenv } from 'dotenv';

describe(ConfigService, () => {
  const testValue = 'TEST_VALUE' as unknown as Environment;

  beforeEach(() => {
    jest.resetAllMocks();
    delete process.env[testValue];
  })

  it('Should return value from environment (override dotenv)', () => {
    const service = new ConfigService();
    process.env[testValue] = 'from_environment';

    const result = service.get(testValue);

    expect(result).toEqual('from_environment');
  });

  it('Should return value from dotenv (if set)', () => {
    // @ts-ignore
    configDotenv.mockReturnValue({ parsed: { [testValue]: 'from_dotenv' } });

    const service = new ConfigService();

    const result = service.get(testValue);

    expect(result).toEqual('from_dotenv');
  });

  it('Should return empty string if none exists', () => {
    const service = new ConfigService();

    // @ts-ignore
    configDotenv.mockReturnValue({ parsed: { } });

    const result = service.get(testValue);

    expect(result).toEqual('');
  });
});
