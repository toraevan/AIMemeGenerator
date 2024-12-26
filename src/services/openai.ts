import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateMemeText(prompt: string): Promise<{
  topText: string;
  bottomText: string;
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a meme generator. Generate funny and witty meme text based on the user's prompt. Return only the top and bottom text for the meme, separated by a | character. Keep each text part short and impactful."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 50
    });

    const response = completion.choices[0]?.message?.content || "";
    const [topText, bottomText] = response.split("|").map(text => text.trim());

    return {
      topText: topText || "",
      bottomText: bottomText || ""
    };
  } catch (error) {
    console.error('Error generating meme text:', error);
    throw new Error('Failed to generate meme text');
  }
}