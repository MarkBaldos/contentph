const FREE_TEXT_MODELS = [
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-12b-it:free',
];

async function generateWithOpenRouter(prompt) {
  for (const model of FREE_TEXT_MODELS) {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    console.log(`Tried ${model}:`, data.error?.code || 'success');

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }
  }
  throw new Error('All models failed');
}

function parseCaptions(content) {
  try {
    const match = content.match(/\[[\s\S]*?\]/);
    if (match) return JSON.parse(match[0]);

    return content
      .split('\n')
      .filter(line => line.trim().length > 20)
      .slice(0, 3)
      .map(line => line.replace(/^[\d\.\-\*\"]+/, '').trim());
  } catch (e) {
    const parts = content.split('\n\n').filter(p => p.trim().length > 0).slice(0, 3);
    return parts.length >= 3 ? parts : [content];
  }
}

export async function POST(req) {
  try {
    const { businessName, tone, description } = await req.json();

    const prompt = `You are a social media content expert for Filipino businesses.
Generate exactly 3 different social media captions for the following:

Business name: ${businessName}
Tone: ${tone}
What they're posting about: ${description}

Rules:
- Write in a mix of English and Filipino (Taglish) naturally
- Each caption should be different in style and approach
- Include relevant emojis
- Add 3-5 hashtags at the end of each caption
- Keep each caption under 150 words
- Make it feel authentic, not robotic

Return ONLY a JSON array with exactly 3 strings, no other text:
["caption 1 here", "caption 2 here", "caption 3 here"]`;

    const content = await generateWithOpenRouter(prompt);
    console.log('Raw content:', content);

    const captions = parseCaptions(content);
    return Response.json({ captions }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to generate captions' }, { status: 500 });
  }
}