import SyntaxHighlighter from 'react-syntax-highlighter'
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function Code({ type, text }) {
  return (
    <>
      <SyntaxHighlighter language={type}>{text}</SyntaxHighlighter>
    </>
  )
}
