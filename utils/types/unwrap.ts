export type Unwrap<T> = T extends Array<infer U> ? U : T;

export default function unwrap<T>(arr: T) {
  return arr as unknown as Unwrap<T> | null;
}