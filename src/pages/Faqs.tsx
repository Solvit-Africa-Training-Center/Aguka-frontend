
const faqs = [
  {
    question: "1. How do I become a member?",
    answer:
      "To become a member, you need to be invited by your group president. The president will provide you with a unique code that allows you to log in for the first time.",
  },
  {
    question: "2. How do I log in?",
    answer:
      "Use the membership code provided by your president. After your first login, you may be asked to set up your personal details (phone number, password, etc.) for future access.",
  },
  {
    question: "3. How do I make contributions?",
    answer:
      "Log into your account, go to the Contributions section, and make your payment. Every payment is recorded in the system automatically.",
  },
  {
    question: "4. What is a contribution cycle?",
    answer:
      "A contribution cycle is the agreed period (from start date to end date) in which all members are expected to make their contributions.",
  },
  {
    question: "5. What happens if I miss a contribution?",
    answer:
      "If you miss your payment by the due date, a penalty fee will be applied. This penalty is recorded separately in your account.",
  },
  {
    question: "6. How do loans work?",
    answer:
      "Members can apply for loans within the platform. Once approved by the group officials, the loan will be disbursed and you’ll be given a repayment schedule.",
  },
  {
    question: "7. How do I repay my loan?",
    answer:
      "Repayments must be made according to your loan agreement. If you delay, penalties will be applied.",
  },
  {
    question: "8. What are dividends?",
    answer:
      "At the end of a cycle, profits (dividends) are calculated and distributed among members based on their contributions.",
  },
  {
    question: "9. Can I see my transactions?",
    answer:
      "Yes, Each member has a dashboard where you can view contributions, penalties, loans, repayments, and dividends.",
  },
  {
    question: "10. Who manages the group?",
    answer:
      "The group is managed by the officials (Admin, President, Treasurer, Secretary). Only The president can generates and distribute membership codes.",
  },
  {
    question: "11. What if I lose my code or forget my login?",
    answer:
      "Contact your group president to get a new code or reset access to your account.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary-300)] text-[var(--color-secondary-50)] flex justify-center items-start py-10">
      <div className="w-full max-w-3xl rounded-lg p-6" style={{ fontFamily: "var(--font-poppins)" }}>
       
        <h1 className="text-3xl font-bold mb-8 text-center">FAQs</h1>

        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pb-4">
            
              <p className="text-2xl font-bold mb-4">{faq.question}</p>
              <p className="text-2xl leading-relaxed font-normal">{faq.answer}</p>
            </div>
          ))}
        </div>
        <hr className=" mt-10 flex-grow border-[var(--color-border)]" />
        <p className="mt-10 text-sm text-center">
          &copy; 2025 Unguka. All rights reserved. Building wealth through
          community.
        </p>
      </div>
    </div>
  );
}


