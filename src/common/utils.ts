export function assertNonNull(
    value: unknown,
): asserts value is NonNullable<unknown> {
    if (value == null) {
        throw new TypeError('expected non-null');
    }
}
