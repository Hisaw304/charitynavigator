import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Does it cost to use Charity Navigator?",
    a: "No, you do not have to pay to use our service. Charity Navigator is a nonprofit organization that depends on support from donors, foundations, and partners to keep our data free and accessible to everyone.",
  },
  {
    q: "Which charities do you evaluate?",
    a: "We evaluate charities registered with the IRS under section 501(c)(3) that file standard IRS Form 990 and provide sufficient financial and operational data for review.",
  },
  {
    q: "What is the Giving Basket?",
    a: "The Giving Basket allows you to support multiple charities in one checkout, manage donation amounts, and control what information is shared with each organization.",
  },
  {
    q: "How does the Giving Basket work?",
    a: "You select charities, choose donation amounts, and complete payment through supported methods like PayPal, crypto, or other options. Receipts are automatically sent after completion.",
  },
  {
    q: "How can I contact a charity listed on your website?",
    a: "Each charity profile includes verified contact details such as email, website links, and available communication channels to help you connect directly.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="cn-faq-section">
      <div className="cn-container">
        <div className="cn-faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>
            Below are some of the most common questions from donors and
            charities.
          </p>
        </div>

        <div className="cn-faq-list">
          {faqs.map((item, index) => (
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
