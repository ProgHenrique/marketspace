export function firstLetterUppercase(word: string) {
  const firstUppercase = word
    .substring(0, 1)
    .toUpperCase()
    .concat(word.substring(1))

  return firstUppercase
}