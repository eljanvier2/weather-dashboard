import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const data = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${req.query.inputValue?.toString() ?? ''}&limit=3&type=city&format=json&apiKey=${process.env.GEOAPIFY_KEY}`
  )
  const response = await data.json()

  res.status(200).json(response)
}
