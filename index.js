// index.js
const { google } = require('googleapis');
const fs = require('fs');

// Load the service account credentials from the JSON file using the new path
const credentials = JSON.parse(fs.readFileSync('C:\\Users\\josep\\Desktop\\Google_Sheets\\credentials.json', 'utf8'));

// Set up Google Sheets API credentials
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

// Create the Google Sheets API client
const sheets = google.sheets({ version: 'v4', auth });

async function readSheet() {
    // Replace with your Google Sheet ID (you can find it in the URL of your sheet)
    const spreadsheetId = '1-LjuU7xDL7G0xEVyr2udEElTgMqXB-0A1FY_hiGzF3c';;
    
    // Replace with the range of the data you want to read from (e.g., 'Sheet1!A1:C10')
    const range = 'Sheet1!A1:B1';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        if (rows.length) {
            console.log('Data from the sheet:');
            rows.forEach((row) => {
                console.log(`Row: ${row}`);
            });
        } else {
            console.log('No data found.');
        }
    } catch (err) {
        console.error('Error reading the Google Sheet:', err);
    }
}

// Run the function to read data from the sheet
readSheet();
