import type { api, Endpoints } from 'misskey-js';
import { Result } from './result.js';

const ERROR_CODE_STATUS_MAP = new Map([['NO_SUCH_NOTE', 404]]);

export async function misskeyApi<E extends keyof Endpoints>(
    host: string,
    endpoint: E,
    params: Endpoints[E]['req'],
): Promise<Result<Endpoints[E]['res']>> {
    try {
        const res = await fetch(`https://${host}/api/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(params),
            credentials: 'omit',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const status = res.status;
        if (status == 200) {
            return Result.ok(await res.json());
        } else if (res.status == 204) {
            return Result.ok(undefined);
        } else {
            const error: api.APIError = await res.json();
            const status = ERROR_CODE_STATUS_MAP.get(error.code) ?? res.status;
            return Result.err(status, error.message);
        }
    } catch (e) {
        return Result.err(500, String(e));
    }
}
