'use client';

export default function Navbar() {
  const scrollToSignup = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-extrabold tracking-tight text-gray-900">
          Content<span className="text-green-primary">PH</span>
        </div>
        <button
          onClick={scrollToSignup}
          className="bg-green-primary hover:bg-green-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-150"
        >
          Get early access
        </button>
      </div>
    </nav>
  );
}
