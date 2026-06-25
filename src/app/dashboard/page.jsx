'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [form, setForm] = useState({ businessName: '', tone: 'friendly', description: '' });
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!form.businessName || !form.description) return;
    setLoading(true);
    setCaptions([]);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setCaptions(data.captions || []);
    setLoading(false);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-extrabold tracking-tight">
          Content<span className="text-[#1D9E75]">PH</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Welcome back! 👋</span>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-600">Logout</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Caption Generator
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in your details and get 3 ready-to-post captions instantly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Business / Brand name
              </label>
              <input
                name="businessName"
                type="text"
                placeholder="e.g. Mama's Kitchen"
                value={form.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-[#1D9E75] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Tone</label>
              <select
                name="tone"
                value={form.tone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-[#1D9E75] transition-colors"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="funny">Funny</option>
                <option value="exciting">Exciting</option>
                <option value="heartfelt">Heartfelt</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              What are you posting about?
            </label>
            <textarea
              name="description"
              placeholder="e.g. We're having a 20% sale on all pasta dishes this weekend only!"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-[#1D9E75] transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !form.businessName || !form.description}
            className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-150 disabled:opacity-40"
          >
            {loading ? 'Generating captions...' : '✨ Generate captions'}
          </button>
        </div>

        {/* Results */}
        {captions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-700">
              Your captions — pick your favorite:
            </h3>
            {captions.map((caption, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-start justify-between gap-4"
              >
                <p className="text-sm text-gray-700 leading-relaxed flex-1">{caption}</p>
                <button
                  onClick={() => handleCopy(caption, index)}
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors"
                >
                  {copied === index ? '✅ Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && captions.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-sm">Fill in the form above and generate your first caption!</p>
          </div>
        )}
      </div>
    </div>
  );
}