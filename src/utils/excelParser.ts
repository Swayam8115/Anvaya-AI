
import * as XLSX from 'xlsx';

export const parseExcelFile = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Naively return the first sheet as JSON for now
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`Parsed ${filePath}:`, jsonData.length, 'rows');
    return jsonData;
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return [];
  }
};
