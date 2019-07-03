import { Action } from 'routing-controllers';
import { IUserModel } from '../api/models/UserModel';

export function currentUserChecker(): (action: Action) => Promise<IUserModel | undefined> {
    return async function innerCurrentUserChecker(action: Action): Promise<IUserModel | undefined> {
        return action.request.user;
    };
}
