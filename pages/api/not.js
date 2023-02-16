import { getServerSession } from "next-auth";

const handler = async (req, res) => {
  const session = await getServerSession(req, res);
  console.log(session);
  res.status(200).json(req.body);
};

export default handler;
