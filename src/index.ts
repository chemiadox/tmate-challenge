import 'module-alias/register';
import { Environment } from '@/types/Environment';
import { ConfigService } from '@/services/ConfigService';

const config = new ConfigService();

console.log('HTTP_PORT', config.get(Environment.HTTP_PORT));