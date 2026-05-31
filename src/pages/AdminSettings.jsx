import React, { useEffect, useState } from "react";
import AdminGallery from "../components/AdminGallery";

const AdminSettings = () => {
  const [form, setForm] = useState({
    cryptoAddress: "",
    cashAppTag: "",
    zelleInfo: "",
    wireTransfer: "",
    paypalEmail: "",
    secret: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/donation-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch settings");
        return res.json();
      })
      .then((data) => {
        setForm((prev) => ({
          ...prev,
          cryptoAddress: data.cryptoAddress || "",
          cashAppTag: data.cashAppTag || "",
          zelleInfo: data.zelleInfo || "",
          wireTransfer: data.wireTransfer || "",
          paypalEmail: data.paypalEmail || "",
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    if (form.secret !== "mySecret123") {
      setStatus("❌ Invalid secret code.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/donation-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      setStatus("✅ Settings updated successfully.");

      setForm((prev) => ({
        ...prev,
        secret: "",
      }));
    } catch (err) {
      setStatus("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cn-admin-page">
      <div className="cn-admin-container">
        <h2 className="cn-admin-title">Admin Settings</h2>

        <form onSubmit={handleSubmit} className="cn-admin-form">
          <div className="cn-form-grid">
            <input
              type="text"
              name="cryptoAddress"
              placeholder="Crypto Address"
              value={form.cryptoAddress}
              onChange={handleChange}
            />

            <input
              type="text"
              name="cashAppTag"
              placeholder="CashApp Tag"
              value={form.cashAppTag}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="zelleInfo"
            placeholder="Zelle Info"
            value={form.zelleInfo}
            onChange={handleChange}
          />

          <input
            type="text"
            name="paypalEmail"
            placeholder="PayPal Email"
            value={form.paypalEmail}
            onChange={handleChange}
          />

          <textarea
            name="wireTransfer"
            placeholder="Wire Transfer Instructions"
            value={form.wireTransfer}
            onChange={handleChange}
            className="cn-admin-textarea"
          />

          <input
            type="password"
            name="secret"
            placeholder="Secret Code"
            value={form.secret}
            onChange={handleChange}
          />

          {status && <p className="cn-admin-status">{status}</p>}

          <button type="submit" disabled={loading} className="cn-submit-btn">
            {loading ? "Updating..." : "Update Settings"}
          </button>
        </form>
      </div>

      <AdminGallery />
    </div>
  );
};

export default AdminSettings;
