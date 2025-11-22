import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Please add RESEND_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's test email
      to: ['merigodavi.dev@gmail.com'], // Seu email
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #E5D4FF 0%, #C8E6F5 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #6B5B4F; margin: 0; font-size: 28px;">Nova Mensagem do Portfólio</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #6B5B4F; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Nome</h3>
              <p style="color: #333; font-size: 16px; margin: 0; padding: 10px; background: #FFF8E7; border-radius: 6px;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #6B5B4F; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Email</h3>
              <p style="color: #333; font-size: 16px; margin: 0; padding: 10px; background: #E0F2FE; border-radius: 6px;">
                <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #6B5B4F; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Mensagem</h3>
              <div style="color: #333; font-size: 16px; line-height: 1.6; padding: 15px; background: #FAF7FF; border-radius: 6px; border-left: 4px solid #C5AAFF;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Esta mensagem foi enviada através do formulário de contato do seu portfólio
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
