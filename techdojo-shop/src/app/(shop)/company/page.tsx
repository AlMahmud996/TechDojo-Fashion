export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            About ShopAssist
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-6">
            Smart Shopping
            <span className="block text-yellow-300">Powered by AI</span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-100">
            ShopAssist helps customers discover products faster,
            compare options intelligently, and receive personalized
            recommendations through artificial intelligence.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Who We Are
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              ShopAssist is an AI-powered e-commerce assistant designed
              to make online shopping easier, faster, and more
              personalized. We help users find products, compare
              alternatives, and make informed purchasing decisions.
            </p>

            <p className="mt-4 text-slate-600 leading-8">
              By combining modern AI technologies with user-friendly
              interfaces, ShopAssist transforms the shopping experience
              into a simple conversation.
            </p>
          </div>

          {/* Mission Box with Animation */}
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl">Mission</h3>
                <p className="text-slate-600 mt-2">
                  Simplify product discovery through AI-driven assistance.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl">Vision</h3>
                <p className="text-slate-600 mt-2">
                  Become the most trusted AI shopping assistant worldwide.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl">Values</h3>
                <p className="text-slate-600 mt-2">
                  Innovation, Trust, Simplicity, and Customer Success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            { value: "10K+", label: "Products" },
            { value: "24/7", label: "AI Support" },
            { value: "95%", label: "Satisfaction" },
            { value: "100%", label: "Secure" },
          ].map((item) => (
            <div
              key={item.label}
              className="
                bg-slate-50
                rounded-2xl
                p-8
                text-center
                shadow
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                cursor-pointer
              "
            >
              <h3 className="text-4xl font-bold text-blue-600">
                {item.value}
              </h3>
              <p className="mt-2 text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why ShopAssist?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Product Search",
              desc: "Search products using natural language.",
            },
            {
              title: "Smart Recommendations",
              desc: "Personalized suggestions based on user needs.",
            },
            {
              title: "Product Comparison",
              desc: "Compare products instantly and confidently.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                bg-white
                p-8
                rounded-2xl
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-3
                hover:shadow-2xl
                hover:scale-[1.03]
                cursor-pointer
              "
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}