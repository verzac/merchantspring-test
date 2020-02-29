export default function <T>(resolvedValue: T, timeoutMs: number = 1000): Promise<T> {
  return new Promise((res) => {
    setTimeout(() => res(resolvedValue), timeoutMs);
  });
}