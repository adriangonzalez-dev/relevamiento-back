import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
@Injectable()
export class GoogleAPIAdapter {
  private sheets: sheets_v4.Sheets;
  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SECRET_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getData({
    spreedsheetId,
    range,
  }: {
    spreedsheetId: string;
    range: string;
  }): Promise<any[][]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: spreedsheetId,
        range: range,
      });
      return response.data.values;
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw new Error('Error fetching data from Google Sheets');
    }
  }
}
