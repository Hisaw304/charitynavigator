// api/donation-settings.js
import { connectDB } from "./db.js";
import DonationSettings from "../models/donationSettings.js";

export default async function handler(req, res) {
  console.log("🧩 donationSettings.js handler loaded");

  await connectDB();

  if (req.method === "GET") {
    console.log("✅ GET /donation-settings route HIT");

    try {
      let settings = await DonationSettings.findOne();
      console.log("🔍 Fetched settings from DB:", settings);

      if (!settings) {
        console.log("⚠️ No settings found. Creating default...");
        settings = new DonationSettings({
          cryptoAddress: "",
          cashAppTag: "",
          zelleInfo: "",
          wireTransfer: "",
          paypalEmail: "",
        });
        await settings.save();
        console.log("✅ Default settings saved:", settings);
      }

      res.status(200).json(settings);
    } catch (error) {
      console.error("❌ Failed to fetch donation settings:", error);
      res.status(500).json({ error: "Failed to fetch donation settings" });
    }
  } else if (req.method === "PUT") {
    console.log("✅ PUT /donation-settings route HIT");

    try {
      const {
        cryptoAddress,
        cashAppTag,
        zelleInfo,
        wireTransfer,
        paypalEmail,
      } = req.body;
      console.log("📝 Received data:", req.body);

      // Validation
      if (
        typeof cryptoAddress !== "string" ||
        typeof cashAppTag !== "string" ||
        typeof zelleInfo !== "string" ||
        typeof wireTransfer !== "string" ||
        typeof paypalEmail !== "string"
      ) {
        console.warn("❌ Invalid input data types");
        return res
          .status(400)
          .json({ error: "Invalid donation settings data" });
      }

      let settings = await DonationSettings.findOne();

      if (!settings) {
        console.log("⚠️ No settings found. Creating new one...");
        settings = new DonationSettings({
          cryptoAddress,
          cashAppTag,
          zelleInfo,
          wireTransfer,
          paypalEmail,
        });
      } else {
        settings.cryptoAddress = cryptoAddress;
        settings.cashAppTag = cashAppTag;
        settings.zelleInfo = zelleInfo;
        settings.wireTransfer = wireTransfer;
        settings.paypalEmail = paypalEmail;
      }

      await settings.save();
      console.log("✅ Settings updated/saved:", settings);

      res.status(200).json({ success: true, settings });
    } catch (error) {
      console.error("❌ Failed to update donation settings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
