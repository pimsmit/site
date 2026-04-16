import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { description, projectType } = (await request.json()) as {
      description: string;
      projectType: string;
    };

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please write at least a short description first." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI enhancement not available." },
        { status: 500 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ainomiq.com",
        "X-Title": "Ainomiq Project Form",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: `You are a project brief assistant for Ainomiq, an AI automation agency. A potential client is filling in a project request form. They selected project type: "${projectType}".

Your job: take their rough description and expand it into a clear, concrete project brief that a developer can work from. Fill in reasonable assumptions based on the project type - be specific, not vague.

Rules:
- The client may write in ANY language - understand it fully but ALWAYS output in English
- No translation errors - write natural, fluent English
- Keep it concise (100-200 words max)
- Be SPECIFIC and CONCRETE - never ask questions back, never say "further details needed"
- Make reasonable assumptions about features based on what they described
- Use bullet points for features/requirements
- Don't add unrelated features - but DO flesh out what they mentioned with concrete details
- Don't use corporate jargon or fluff
- Don't mention Ainomiq or pricing
- Output ONLY the enhanced description, no intro text or commentary`,
          },
          {
            role: "user",
            content: description,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", res.status, await res.text());
      return NextResponse.json(
        { error: "AI enhancement failed. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const enhanced =
      data.choices?.[0]?.message?.content?.trim() || description;

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("Enhance description error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
