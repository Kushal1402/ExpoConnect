const nodemailer = require("nodemailer");
require("dotenv").config();

exports.SendMail = async (to, subject, data) => {
    try {
        const mailtemplate = MailTemplate(data);

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_AUTH_USER, // generated ethereal user
                pass: process.env.EMAIL_AUTH_PASS, // generated ethereal password
            },
        });

        const info = transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: to,
            subject: subject,
            html: mailtemplate,
        })
        return info
    } catch (error) {
        console.log(error)
        return error;
    }
}

const MailTemplate = (data) => {
    let logo = 'https://raw.githubusercontent.com/Kushal1402/ExpoConnect/main/node-api/static_assets/MainLogo.png';

    let emailBody = `
    <!DOCTYPE html>
    <html>

    <head>
        <title>ExpoConnect</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <style>
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            @media screen and (max-width:600px) {
                h1 {
                    font-size: 30px !important;
                    line-height: 34px !important;
                }

                h2 {
                    font-size: 18px !important;
                    line-height: 26px !important;
                }

                .profile {
                    width: 180px;
                }
            }
        </style>
    </head>

    <body style="margin: 0 !important; padding: 0 !important; font-family: 'Rubik', sans-serif;">
        <div style="margin: 0 auto; padding: 0; width: 100%;">

            <!-- body content -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td bgcolor="#fff" style="padding: 0 33px 0px 0px; color: #000; ">
                            <p style="font-size:14px; line-height: 28px; margin-top:18px; margin-bottom: 8px">
                                Hello ${data.user_name},
                            </p>
                            <p style="font-size:14px; line-height: 28px; margin-top:0; margin-bottom: 8px">
                                Thank you for your interest, you can refer company information from below link,</p>
                            <p style="font-size:14px; line-height: 28px; margin-top:0; margin-bottom: 8px">
                            <a href="https://www.github.com/Kushal1402"  target="_blank" style="text-decoration: none;">https://expo-connect.vercel.app</a>
                            
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#fff" style="padding: 0px 33px 10px 0px; color: #000;">
                            <p style="font-size:14px; line-height: 22px; margin: 0; padding:0; margin-bottom: 4px;padding: 5px 0px;">
                                Kind Regards,

                            </p>

                            <img src=${logo} alt="ExpoConnect Logo" style="width:200px">
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#fff" style="padding: 0px 33px 10px 0px; color: #000;">
                            <p style="font-size:14px; line-height: 6px; margin: 0; padding:0;">
                                ExpoConnect Team
                            </p>
                            <p style="font-size:14px; line-height: 28px; margin-top:0; margin-bottom: 8px">
                            <a href="https://www.github.com/Kushal1402"  target="_blank" style="text-decoration: none;">https://expo-connect.vercel.app</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                    </tr>

                </tbody>
            </table>

        </div>
    </body>

    </html>
    `;

    return emailBody;
}