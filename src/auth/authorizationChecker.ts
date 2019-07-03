import { Action } from 'routing-controllers';
import { Container } from 'typedi';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        const claim = authService.getUserClaimFromRequest(action.request);

        if (claim === undefined) {
            log.warn('Invalid JWT provided');
            return false;
        }

        action.request.user = await authService.validateUser(claim, roles);
        if (action.request.user === undefined) {
            log.warn('Invalid claim from JWT');
            return false;
        }

        log.info('Successfully checked client claim');
        return true;
    };
}
