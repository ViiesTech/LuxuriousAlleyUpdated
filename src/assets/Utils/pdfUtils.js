import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
const PdfPrinter = require('pdfmake/src/printer');

const vfsFonts = require('pdfmake/build/vfs_fonts.js');

const fonts = {
  Roboto: {
    normal: vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'],
    bold: vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'],
    italics: vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'],
    bolditalics: vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'],
  },
};
export const generateReceiptPDF = async ({
  id,
  salonName,
  customerName,
  phone,
  date,
  time,
  stylist,
  service,
  total,
}) => {
  try {
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'Receipt', style: 'header', alignment: 'center' },
        '\n',
        { text: `Booking ID: ${id}` },
        { text: `Salon: ${salonName}` },
        { text: `Customer: ${customerName}` },
        { text: `Phone: ${phone}` },
        { text: `Date: ${date}` },
        { text: `Time: ${time}` },
        { text: `Stylist: ${stylist}` },
        '\n',
        { text: `Service: ${service}` },
        { text: `Total: $${total}`, bold: true },
      ],
      styles: {
        header: { fontSize: 22, bold: true },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    pdfDoc.on('data', chunk => chunks.push(chunk));

    const path = `${RNFS.DownloadDirectoryPath}/Receipt_${id}.pdf`;

    pdfDoc.on('end', async () => {
      const pdfBuffer = Buffer.concat(chunks);
      await RNFS.writeFile(path, pdfBuffer.toString('base64'), 'base64');
      console.log('✅ PDF saved at:', path);
    });

    pdfDoc.end();

    return path;
  } catch (err) {
    console.error('PDF generation failed:', err);
    throw err;
  }
};
