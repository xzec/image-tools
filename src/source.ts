export async function* randomValuesGenerator() {
  while (true) {
    yield Math.floor(Math.random() * 1000) + 1
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}
