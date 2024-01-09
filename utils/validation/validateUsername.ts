const minUsernameLength = 6;
const maxUsernameLength = 32;
const matchWhitespaceRegex = /\s/g;
const consecutiveDotsRegex = /^(?!.*\.{2}).*$/;
const alphanumericDotsAndUnderline = /^[a-zA-Z0-9_.]+$/;
const noLetters = /^[^a-zA-Z]*$/;

type TestList = {
  test: (username: string) => boolean,
  message: string
}[];

const tests: TestList = [
  {
    test: (username) => username.length < minUsernameLength,
    message: `O nome de usuário precisa ter no mínimo ${minUsernameLength} caracteres.`
  },
  {
    test: (username) => username.length > maxUsernameLength,
    message: `O nome de usuário não pode ter mais que ${maxUsernameLength} caracteres.`
  },
  {
    test: (username) => matchWhitespaceRegex.test(username),
    message: `O nome de usuário não pode conter espaço.`
  },
  {
    test: (username) => !consecutiveDotsRegex.test(username),
    message: `O nome de usuário não pode conter pontuação consecutiva.`
  },
  {
    test: (username) => noLetters.test(username),
    message: `O nome de usuário deve conter letras.`
  },
  {
    test: (username) => !alphanumericDotsAndUnderline.test(username),
    message: `O nome de usuário não pode conter caracteres especiais.`
  },
  {
    test: (username) => username.startsWith("."),
    message: `O nome de usuário não pode começar com pontuação.`
  },
  {
    test: (username) => username.endsWith("."),
    message: `O nome de usuário não pode terminar com pontuação.`
  }
]

export default function validateUsername(username: string) {
  const test = tests.filter(t => t.test(username));

  return { messages: test.map(t => t.message), valid: test.length === 0 };
}