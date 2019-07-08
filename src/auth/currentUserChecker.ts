import { Action } from 'routing-controllers';
import { IUser } from '../api/types/UserType';

export function currentUserChecker(): (action: Action) => Promise<IUser | undefined> {
    return async function innerCurrentUserChecker(action: Action): Promise<IUser | undefined> {
        return action.request.user;
    };
}
