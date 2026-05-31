import mongoose from "mongoose";

const donationSettingsSchema = new mongoose.Schema(
  {
    cryptoAddress: { type: String, default: "" },
    cashAppTag: { type: String, default: "" },
    zelleInfo: { type: String, default: "" },
    wireTransfer: { type: String, default: "" },
    paypalEmail: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.DonationSettings ||
  mongoose.model("DonationSettings", donationSettingsSchema);
