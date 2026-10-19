# Website enquiry email

The contact form sends enquiries to `info@firenoxglobal.com` through the Hostinger mailbox. The address is also linked in the contact section and footer.

1. In Hostinger, confirm `info@firenoxglobal.com` can receive and send mail in Webmail. The mailbox password is needed for SMTP; do not put it in GitHub or send it in chat.
2. In Vercel, open the FIRENOX project, then **Settings > Environment Variables**. Add `SMTP_USER` = `info@firenoxglobal.com` and `SMTP_PASSWORD` = that mailbox's password. Apply them to Production (and Preview if testing preview deployments). Do not prefix either name with `NEXT_PUBLIC_`.
3. Redeploy the site so the new variables reach the server. The form will report an error until both variables are set.
4. Submit a test enquiry from the live site using another email address. Check the Hostinger inbox and spam folder, then use Reply to verify it addresses the visitor rather than the website mailbox.

The server uses Hostinger SMTP (`smtp.hostinger.com`, SSL port 465). The form displays success only after SMTP accepts the message. If SMTP fails, the visitor's entered details remain on the form and a direct email link is shown.
