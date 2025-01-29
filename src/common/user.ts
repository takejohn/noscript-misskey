import { type Acct, acct } from 'misskey-js';

export function userPage(user: Acct): string {
    return `/@${acct.toString(user)}`;
}
