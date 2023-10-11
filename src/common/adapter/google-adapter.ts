import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleAPIAdapter {
  private sheets: sheets_v4.Sheets;
  private readonly spreadsheetIdLvl1 =
    '1PXPNQZb7cUOHPSl0Tsoi25lkB5x4oiE0GUV3GP_DAgk';
  private readonly spreadsheetIdAudit =
    '17VmsSZsCIJ9BKX_62NgrrtBVq4NXF2LVP-fe_p21mTQ';
  private readonly rangeLvl1 = 'Respuestas de formulario 1!A:K';
  private readonly auditTickets = 'Auditoria TKS!A:M';
  constructor() {
    // Configura la autenticación con las credenciales de servicio de Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: 'planilla-fer@sia-interactive.iam.gserviceaccount.com',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDj0GnrGbXsy4rA\nQv2M7Mr7T7s4F/AHstpfKsmsL/ZRBuOiA+Q6s8ocF7JzaOW/dmLP3c9gZH00ZFe4\nA22aT0B4YpL4YCRmiT2DFI2JGvlgqJq150I8ibuowZqUfTPRqMy5OYL3xWe3+BIV\nyWI2AGqIHP15mWaXOmH8nQ2HDUIoiUts4XXCfmZrQQ+Md7fEJoxMaxhRyXNDVOCw\nvc8txJR2sjHIzbhwBcT51SnQYaHXUgtVwkwalIOctK7oFWdlqIpJNuLNeF8DWw3T\nkGfltPnFG2H5M9zQ2+trH7AU0XVWHcSvkQw+knJ0Ouhr14ncjAx7X+H+KmUhIfyH\nsvOKN6kRAgMBAAECggEAC/b8OR7GkUM3bFWYX3hoSL6tRIrtTlo0Yd8rbGGwfBzy\ng6XUrMiYitUryCfwORgMpIIvzA47DS9f9AgqD3quFiSHN4hFISWAF4xSyqqiAlOY\nnIkiz28kbf6NEdNpj09gQTImEMFLazwaJw7Gm7N15OQw49wMqVClqNDOzxMBMIO8\nE0QtuNCWvkpAD7rc6C0Bg8JpyyXYlggYbqtFOt7MEI/SxCCDEJzFeBLfo3Enwby0\nlV17Mh37OlhEFM26Wpu9fjAlMXe4kHp248Y0BfuWAOjVCLLxrXmLdJ7+5JJSTnYw\n9pBYlxUffGUtDuFE4G2jyQ6mORc4PK9Z9wiQ5hsU4QKBgQD5HTxLTausp70J6v8B\nuJ2T44SeBdQ4Tbr7Dc4tkZ7VPZ0sbjqiyb46fcP4gmhZJYaa/IzZ5dBLEnhUG+4F\nn8RmMmuG8hsb6HuUwCKZvfaS7qntne6RMy/AHE2NaPy4UAGC4mAFRpKn6C4IGElG\n/qqIDMo0GX8ikYH9xfpSaBNwrQKBgQDqHHS/lFXO0isK/LxYZ1Iattnd/goTQIVV\nvNc+Yfvg42j3X/u3aB0kFM8FGiZEKmWrZbLzM+9oQ8P70KFrkMe42FiRu8LbQxud\ngIfaCp4fsq5MOowSnPyS+Y2Y9dGMnyNKhYuH1FICESIKHwW548rkLPQKb36vTg53\n9b6VoS0SdQKBgQCgELbzM98BO25t9v8Png4yPliyKNCptNhWBBLcmNrT7ZkWOWWX\nv8VpU/Idtb1Supf48hmW0OG7uwxyDtgr6PKLMA6DUQE2N3VgqOwSmUrcMlohgf8O\ncTNXX1g9ap4n19CAxvAns6b8GGWrcd9zrKLqdD1gqJlWHuTFqPYlCRakqQKBgQDB\n8u0twiAMhcUvBw6qVn6Iry9zYADMzkkoLJhNkDNxrjTJq/UHjvOFbs/LNEy7cDxm\ncIx+O2p9gJaeycrRKFKt6l4F7f2SVNhN9auWkfFJ5WfMszxUN0ZwJNqP/CasTzKX\njGd6EgYWvEbtB6JgzDzMKAnNk2zqosoNy8Mmhy6l+QKBgCMx4x/hvDMZ7D9H34Hl\na7uj7W2ThMXIX1J6xXzDJdmH97jCk473SirureuOnCTQQbKjl51NwtEz2CddcHZt\nBPlOoWiCkTWwpJjD0dZ1ixylVhXMvw6/qpAZYx4BIZ7BpVK0bdeRbTnjOZMoK2RG\nMDfwEJ7UTf5Fic0Dr8WDdvdq\n-----END PRIVATE KEY-----\n',
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Crea una instancia de la API de Google Sheets
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getDataLvl1(): Promise<any[][]> {
    try {
      // Realiza una solicitud para obtener datos de la hoja de cálculo
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetIdLvl1,
        range: this.rangeLvl1,
      });

      // Devuelve los datos como una matriz bidimensional
      return response.data.values;
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw new Error('Error fetching data from Google Sheets');
    }
  }

  async getDataAudit(): Promise<any[][]> {
    try {
      // Realiza una solicitud para obtener datos de la hoja de cálculo
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetIdAudit,
        range: this.auditTickets,
      });

      // Devuelve los datos como una matriz bidimensional
      return response.data.values;
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw new Error('Error fetching data from Google Sheets');
    }
  }
}
