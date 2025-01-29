export type Result<T> = Ok<T> | Err;

export const Result = {
    ok<T>(content: T): Result<T> {
        return new Ok(content);
    },
    err<T>(status: number, message: string): Result<T> {
        return new Err(status, message);
    },
};

export interface ResultBase<T> {
    map<U>(func: (content: T) => U): Result<U>;
}

export class Ok<T> implements ResultBase<T> {
    public readonly ok = true;

    public readonly status = 200;

    constructor(public readonly content: T) {}

    public map<U>(func: (content: T) => U): Ok<U> {
        return new Ok(func(this.content));
    }
}

export class Err implements ResultBase<never> {
    public readonly ok = false;

    constructor(
        public readonly status: number,
        public readonly message: string,
    ) {}

    public map(func: (content: never) => unknown): Err {
        return new Err(this.status, this.message);
    }
}
