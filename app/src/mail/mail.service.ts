import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateMailDto } from './mail.dto';

@Injectable()
export class MailService {
  async create(createMailDto: CreateMailDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log(transporter);
    const info = await transporter.sendMail({
      from: '"KUSRC" <buntakan0703@gmail.com>',
      to: createMailDto.email,
      subject: 'reset password',
      text: `Please click the link`,
      html: `<!DOCTYPE html>
  <html lang="th">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>รีเซ็ตรหัสผ่านของคุณ</title>
  </head>
  <body style="font-family: 'Sarabun', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="padding: 40px 30px; background-color: #F5B21F; text-align: center;">
                  <h1 style="color: #302782; margin: 0; font-size: 28px; font-weight: bold;">รีเซ็ตรหัสผ่านของคุณ</h1>
              </td>
          </tr>
          <tr>
              <td style="padding: 30px;">
                  <p style="margin-bottom: 20px; font-size: 16px;">เราได้รับคำขอให้รีเซ็ตรหัสผ่านของคุณ หากคุณไม่ได้ทำการร้องขอนี้ คุณสามารถละเว้นอีเมลนี้ได้</p>
                  <p style="margin-bottom: 30px; font-size: 16px;">เพื่อรีเซ็ตรหัสผ่านของคุณ กรุณาคลิกที่ปุ่มด้านล่าง:</p>
                  <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                      <tr>
                          <td style="border-radius: 4px; background-color: #302782; text-align: center;">
                              <a href="${process.env.FE_URL}/sign-in/reset-password/${createMailDto.otp}" style="background-color: #302782; border: none; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; border-radius: 4px;">รีเซ็ตรหัสผ่าน</a>
                          </td>
                      </tr>
                  </table>
                  <p style="margin-top: 30px; font-size: 14px; color: #666666;">หากปุ่มไม่ทำงาน คุณสามารถคัดลอกและวางลิงก์นี้ลงในเบราว์เซอร์ของคุณ:</p>
                  <p style="margin-bottom: 30px; font-size: 14px; color: #666666; word-break: break-all;">
                      <a href="${process.env.FE_URL}/sign-in/reset-password/${createMailDto.otp}" style="color: #302782; text-decoration: underline;">${process.env.FE_URL}/sign-in/reset-password/${createMailDto.otp}</a>
                  </p>
                  <p style="margin-bottom: 20px; font-size: 16px;">หากคุณมีคำถามใดๆ โปรดอย่าลังเลที่จะติดต่อทีมสนับสนุนของเรา</p>
                  <p style="margin-bottom: 0; font-size: 16px;">ขอแสดงความนับถือ<br>ทีม KUSRC</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px; background-color: #f4f4f4; text-align: center; font-size: 14px; color: #666666;">
                  &copy; 2024 KUSRC สงวนลิขสิทธิ์
              </td>
          </tr>
      </table>
  </body>
  </html>`,
    });
    if (!info) {
      return {
        message: 'Failed to send email',
        status: 400,
      };
    }
    return {
      message: 'Email sent',
      status: 200,
    };
  }
}
