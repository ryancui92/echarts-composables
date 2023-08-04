export function debug(...values: unknown[]) {
  console.debug(...values.map(value =>
    typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value
  ))
}
