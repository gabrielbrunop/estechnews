const minContentLength = 10;
const maxContentLength = 2000;

type TestList = {
  test: (props: { content: string }) => boolean,
  message: string
}[];

const tests: TestList = [
  {
    test: ({ content }) => content.length < minContentLength,
    message: `O comentário precisa conter no mínimo ${minContentLength} caracteres.`
  },
  {
    test: ({ content }) => content.length > maxContentLength,
    message: `O comentário não pode conter mais que ${maxContentLength} caracteres.`
  }
]

export default function validateComment(content: string) {
  const test = tests.filter(t => t.test({ content }));

  return { messages: test.map(t => t.message), valid: test.length === 0 };
}