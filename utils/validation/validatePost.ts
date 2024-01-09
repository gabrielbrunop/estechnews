const minTitleLength = 10;
const maxTitleLength = 100;
const minContentLength = 100;
const maxContentLength = 10000;

type TestList = {
  test: (props: { title: string, content: string }) => boolean,
  message: string
}[];

const tests: TestList = [
  {
    test: ({ title }) => title.length < minTitleLength,
    message: `O título precisa conter no mínimo ${minTitleLength} caracteres.`
  },
  {
    test: ({ title }) => title.length > maxTitleLength,
    message: `O título não pode conter mais que ${maxTitleLength} caracteres.`
  },
  {
    test: ({ content }) => content.length < minContentLength,
    message: `A postagem precisa conter no mínimo ${minContentLength} caracteres.`
  },
  {
    test: ({ content }) => content.length > maxContentLength,
    message: `A postagem não pode conter mais que ${maxContentLength} caracteres.`
  }
]

export default function validatePost(title: string, content: string) {
  const test = tests.filter(t => t.test({ title, content }));

  return { messages: test.map(t => t.message), valid: test.length === 0 };
}