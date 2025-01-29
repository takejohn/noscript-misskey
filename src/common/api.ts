import type { api, Endpoints } from 'misskey-js';
import { Result } from './result.js';

const ERROR_CODE_STATUS_MAP = new Map([['NO_SUCH_NOTE', 404]]);

export async function misskeyApi<
    E extends keyof Endpoints,
    P extends Endpoints[E]['req'],
>(
    host: string,
    endpoint: E,
    params: P,
): Promise<Result<api.SwitchCaseResponseType<E, P>>> {
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
            return Result.ok(undefined as api.SwitchCaseResponseType<E, P>);
        } else {
            const { error }: { error: api.APIError } = await res.json();
            const status = ERROR_CODE_STATUS_MAP.get(error.code) ?? res.status;
            return Result.err(status, error.message);
        }
    } catch (e) {
        console.error(e);
        return Result.err(500, String(e));
    }
}
