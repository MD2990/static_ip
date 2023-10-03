import dbConnect from "@app/dbConnect";
import handlers from "../../../lib/middleware";
import IPS from "../../../models/ips/IPS";

export default async function handler(req, res) {
  await handlers(req, res);
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const ip = await IPS.findById(id);
        if (!ip) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ ip });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const ips = await IPS.findOne({
          ip: req.body.ip,
          _id: { $ne: id },
        });
        if (ips) return res.status(409).json({ success: false });
        const ip = await IPS.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!ip) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: ip });
      } catch (error) {
        res.status(400).json({ success: error });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const ip = await IPS.findByIdAndDelete(id);
        if (!ip) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
