const cds = require('@sap/cds');
const { MailClient } = require('@sap-cloud-sdk/mail-client');
require('dotenv').config();

module.exports = cds.service.impl(async function () {

    const { sendEmail } = this.entities;


    this.on('sendEmail', async (req) => {
        const { to, subject, text } = req.data;

        try {
            const mailClient = MailClient.forDestination(process.env.DESTINATION_NAME);
            await mailClient.send({
                from: process.env.EMAIL_FROM,
                to: [to],
                subject,
                text
            });
            return 'Email sent successfully';
        } catch (error) {
            console.error('Error sending email:', error);
            return `Failed to send email: ${error.message}`;
        }
    });
});
