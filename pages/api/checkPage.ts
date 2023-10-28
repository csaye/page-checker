import type { NextApiRequest, NextApiResponse } from 'next'

export type CheckPageResponse = {
  text: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckPageResponse>
) {
  let url = req.query.url as string
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  const response = await fetch(url)
  const text = await response.text()

  res.status(200).json({ text } satisfies CheckPageResponse)
}
