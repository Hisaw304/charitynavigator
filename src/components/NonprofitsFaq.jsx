import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const nonprofitFaqs = [
  {
    q: "How can my nonprofit get listed on the Charity Navigator website?",
    a: "All 501(c)(3) organizations that file IRS Form 990 are automatically included in our database. If your organization is missing, you can submit a request through our nonprofit support portal.",
  },
  {
    q: "How does my nonprofit become Encompass Rated?",
    a: "Encompass Ratings are assigned based on verified financial, accountability, and impact data. Organizations must meet eligibility requirements and provide sufficient documentation.",
  },
  {
    q: "Why did my organization receive donations via the Giving Basket?",
    a: "Donations are directed through our Giving Basket when users select your nonprofit from our platform. Funds are processed and delivered through our trusted payment partners.",
  },
  {
    q: "How can I update my charity’s rating/information?",
    a: "You can submit updated financial reports, governance changes, or program data through your nonprofit profile dashboard or by contacting your assigned representative.",
  },
  {
    q: "When will my charity’s rating be updated?",
    a: "Ratings are updated on a rolling basis after new IRS filings or verified data submissions are processed, typically within each reporting cycle.",
  },
  {
    q: "We do have a 990 policy your website says we do not have. How can we update that?",
    a: "You can submit corrected documentation through your nonprofit portal or contact support to review and update your organizational policy records.",
  },
];

export default function NonprofitsFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="cn-faq-section">
      <div className="cn-container">
        <div className="cn-faq-header">
          <h2>For Nonprofits</h2>
          <p>
            Information and support for organizations listed or rated on our
            platform.
          </p>
        </div>

        <div className="cn-faq-list">
          {nonprofitFaqs.map((item, index) => (
            <div
              key={index}
              className={`cn-faq-item ${openIndex === index ? "active" : ""}`}
            >
              <button className="cn-faq-question" onClick={() => toggle(index)}>
                <span>{item.q}</span>
                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>

              <div className="cn-faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
