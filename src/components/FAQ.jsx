import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FAQ() {
  const faqs = [
    {
      question: "How do I participate in a giveaway?",
      answer:
        "Create an account, choose an active giveaway, and complete the required steps before the closing date.",
    },
    {
      question: "Is participation free?",
      answer:
        "Some giveaways are free to enter, while others may have their own entry requirements. Each giveaway clearly explains its rules.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are selected according to the published rules for each giveaway and are announced after the giveaway closes.",
    },
    {
      question: "How will I know if I win?",
      answer:
        "If you are selected, you will receive a notification through your account and the contact information you provided.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-500 text-center mt-4 mb-14">
          Find answers to the questions we receive most often.
        </p>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {openIndex === index && (
                <div className="p-6 text-gray-600 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;