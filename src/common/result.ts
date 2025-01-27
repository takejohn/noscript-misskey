export type Result<T> =
    | { ok: true; status: 200; content: T }
    | { ok: false; status: number; message: string };

export const Result = {
    ok<T>(content: T): Result<T> {
        return { ok: true, status: 200, content };
    },
    err<T>(status: number, message: string): Result<T> {
        return { ok: false, status, message };
    },
};
