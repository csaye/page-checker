import styles from '@/styles/pages/Index.module.scss'
import { useState } from 'react'
import { CheckPageResponse } from './api/checkPage'
import { html as formatHtml } from 'js-beautify'

type OutputType = 'text' | 'html'

export default function Index() {
  const [url, setUrl] = useState('')
  const [type, setType] = useState<OutputType>('text')
  const [text, setText] = useState('')

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          checkPage()
        }}
      >
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='https://example.com'
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as OutputType)}
        >
          <option value='text'>Text</option>
          <option value='html'>HTML</option>
        </select>

        <button>Get Page</button>
      </form>

      {text && (
        <pre>
          <code>{text}</code>
        </pre>
      )}
    </div>
  )

  async function checkPage() {
    setText('')
    const response = await fetch(`/api/checkPage?url=${url}`)
    if (!response.ok) {
      setText('Request failed')
      return
    }
    const json = (await response.json()) as CheckPageResponse
    const html = json.text

    if (type === 'html') {
      setText(formatHtml(html))
      return
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const cleanText = (doc.body.textContent?.split('\n') ?? [])
      .map((text) => text.trim())
      .filter((text) => !!text)
      .join('\n')
    setText(cleanText)
  }
}
