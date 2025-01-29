export type Result<T> = Ok<T> | Err;

export const Result = {
    ok<T>(content: T): Ok<T> {
        return new Ok(content);
    },
    err(status: number, message: string): Err {
        return new Err(status, message);
    },
};

export interface ResultBase<T> {
    map<U>(func: (content: T) => U): Result<U>;

    unwrapOrElse(func: (err: Err) => T): T;
}

export class Ok<T> implements ResultBase<T> {
    public readonly ok = true;

    public readonly status = 200;

    constructor(public readonly content: T) {}

    public map<U>(func: (content: T) => U): Ok<U> {
        return new Ok(func(this.content));
    }

    public unwrapOrElse(func: (err: Err) => T): T {
        return this.content;
    }
}

export class Err implements ResultBase<never> {
    public readonly ok = false;

    constructor(
        public readonly status: number,
        public readonly message: string,
    ) {}

    public map<U>(func: (content: never) => U): Err {
        return this;
    }

    unwrapOrElse<T>(func: (error: Err) => T): T {
        return func(this);
    }
}
