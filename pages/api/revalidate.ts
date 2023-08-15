import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const path = req.query?.path as string;
    if (!path) return;
    console.log(path);
    
    try {
        await res.revalidate(path);
        console.log('revalitated')
        return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
  }