import dbConnect from "@app/dbConnect";
import handlers from "../../../lib/middleware";
import IPS from "../../../models/ips/IPS";

export default async function handler(req, res) {
  await handlers(req, res);
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const ip = await IPS.find({});
        const ips = await IPS.find({});
        /* find all the data in our database */
        res.status(200).json({ ip, ips });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const ips = await IPS.findOne({ ip: req.body.ip });
        if (ips) return res.status(409).json({ success: false });
        const ip = await IPS.create(req.body);

        /* create a new model in the database */
        res.status(201).json({ ip });
      } catch (error) {
        res.status(400).json(error.message);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
