import { useState } from "react";

export default function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Application Received!
        </h3>
        <p className="text-green-700">
          Thanks for applying for the {jobTitle} position. We'll be in touch
          soon.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-green-700 font-medium hover:underline"
        >
          Send another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6"
    >
      <h3 className="text-xl font-bold text-earthy-brown">Apply Now</h3>

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-stone-700"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold outline-none transition-colors"
          placeholder="Jane Doe"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-stone-700"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold outline-none transition-colors"
          placeholder="jane@example.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-stone-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          required
          className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold outline-none transition-colors"
          placeholder="+61 400 000 000"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-stone-700"
        >
          Resume / CV
        </label>
        <input
          type="file"
          id="resume"
          accept=".pdf,.doc,.docx"
          required
          className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-warm-beige file:text-earthy-brown hover:file:bg-warm-gold/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="coverLetter"
          className="block text-sm font-medium text-stone-700"
        >
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-warm-gold focus:ring-1 focus:ring-warm-gold outline-none transition-colors resize-none"
          placeholder="Tell us why you'd be a great fit..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-earthy-brown text-white rounded-xl font-bold hover:bg-earthy-brown/90 transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Submit Application"}
      </button>
    </form>
  );
}
