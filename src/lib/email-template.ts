export type ContactTemplateData = {
  name: string;
  email: string;
  message: string;
  sentAt?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactEmail({ name, email, message, sentAt }: ContactTemplateData): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeDate = sentAt
    ? escapeHtml(sentAt)
    : escapeHtml(
        new Date().toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>The Ahsan Bashir Times — New Message</title>
</head>
<body style="margin:0; padding:0; background-color:#F8F5F0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5F0; font-family:Georgia, 'Times New Roman', serif; color:#1d1b18;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#F8F5F0; border:2px solid #1d1b18;">

          <!-- Masthead -->
          <tr>
            <td style="padding:22px 28px 14px; border-bottom:3px double #1d1b18;">
              <p style="margin:0 0 8px; font-family:Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#7C3A2D; text-align:center;">Portfolio Contact Desk</p>
              <h1 style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:26px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#1d1b18; text-align:center;">The Ahsan Bashir Times</h1>
              <p style="margin:8px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#6b6257; text-align:center;">${safeDate}</p>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:24px 28px 6px;">
              <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#7C3A2D; font-weight:bold;">BREAKING — NEW MESSAGE</p>
              <h2 style="margin:8px 0 0; font-family:Georgia, 'Times New Roman', serif; font-size:20px; font-weight:700; color:#1d1b18;">A new letter has arrived at the contact desk</h2>
            </td>
          </tr>

          <!-- Sender details -->
          <tr>
            <td style="padding:6px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:120px; padding:8px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#6b6257; border-bottom:1px solid #1d1b18;">Letter From</td>
                  <td style="padding:8px 0 8px 12px; font-family:Georgia, 'Times New Roman', serif; font-size:15px; color:#1d1b18; border-bottom:1px solid #1d1b18;"><strong>${safeName}</strong></td>
                </tr>
                <tr>
                  <td style="width:120px; padding:8px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#6b6257; border-bottom:1px solid #1d1b18;">Reply To</td>
                  <td style="padding:8px 0 8px 12px; font-family:Georgia, 'Times New Roman', serif; font-size:15px; color:#1d1b18; border-bottom:1px solid #1d1b18;">${safeEmail}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:16px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FBF9F5; border:1px solid #1d1b18;">
                <tr>
                  <td style="padding:16px 18px; font-family:Georgia, 'Times New Roman', serif; font-size:15px; line-height:1.7; color:#1d1b18;">
                    ${safeMessage}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px 22px; border-top:3px double #1d1b18;">
              <p style="margin:0 0 4px; font-family:Georgia, 'Times New Roman', serif; font-size:14px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#1d1b18; text-align:center;">Ahsan Bashir</p>
              <p style="margin:0 0 12px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#7C3A2D; text-align:center;">Full-Stack &amp; Shopify Developer</p>
              <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:10px; line-height:1.6; color:#6b6257; text-align:center;">
                Printed on the open web · <a href="https://ahsanbashir.dev" style="color:#7C3A2D; text-decoration:underline;">ahsanbashir.dev</a> · Faisalabad, Pakistan
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
