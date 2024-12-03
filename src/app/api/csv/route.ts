// app/api/csv/route.ts
// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
// import Papa from 'papaparse';

// export async function GET() {
// const filePath = path.resolve('./public/2021-07-13-an-intro-to-tortoise-physiology.csv'); // Ensure the CSV is in the public folder
// const fileContent = fs.readFileSync(filePath, 'utf8');

// const parsedData = Papa.parse(fileContent, {
//     header: true,
//     skipEmptyLines: true,
// });

// console.log('papa data', parsedData);

// return NextResponse.json(parsedData.data);
// }
