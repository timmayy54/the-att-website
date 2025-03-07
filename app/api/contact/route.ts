import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate the request
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real implementation, you would send an email here
    // For example, using a service like SendGrid, Mailgun, or AWS SES
    
    // For now, we'll just log the data
    console.log("Contact form submission:", {
      name,
      email,
      message,
      recipient: "theattreviews@gmail.com",
      timestamp: new Date().toISOString(),
    });

    // Return a success response
    return NextResponse.json(
      { message: "Message received! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
} 