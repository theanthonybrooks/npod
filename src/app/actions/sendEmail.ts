"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
  name: string;
  email: string;
  poster: string;
  message?: string;
}) {
  try {
    await resend.emails.send({
      from: "No Point of Departure Contact Form <mail@app.zerenoruc.com>",
      to: "zerenoruc@gmail.com",
      subject: `NPOD Poster Request: ${formData.poster}`,
      html: `
      <p >Ahoy there! Seems ya have some interest in a poster! Below ye shall find the details :) - Captain Charlie Barley</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Poster:</strong> ${formData.poster}</p>
        <p><strong>Message:</strong> ${formData.message || "—"}</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to send email" };
  }
}
