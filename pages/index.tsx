import styles from '@/styles/pages/Index.module.scss'
import { useState } from 'react'
import { CheckPageResponse } from './api/checkPage'

export default function Index() {
  const [url, setUrl] = useState(
    'https://www.law.nyu.edu/housing/summerliving/apply'
  )
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
        <button>Get Page</button>
      </form>

      <p>{text}</p>
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
    setText(json.text)
  }
}
