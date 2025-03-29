import * as XLSX from 'xlsx';
import { Data } from '../types/interfaces';

export const saveToExcel = ({ data, fileName }: { data: Data[]; fileName: string  }) => {
    // Créer une feuille de calcul à partir des données
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
  
    // Générer un fichier Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Créer un objet Blob pour le fichier Excel
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "test_data.xlsx"; // Nom du fichier
    link.click(); // Déclencher le téléchargement
  };