import Papa, { LocalFile, ParseResult } from "papaparse"
import { ref } from "vue";

export function useFileConverter() {
  const results = ref<ParseResult<any>>();

  function csvToJson(file: LocalFile) {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: ((parseResult: ParseResult<any>) => {
          results.value = parseResult
        })
      })
    }
  }

  function jsonToCsv(data: any[], fileName: string = 'export.csv') {
    if (data && data.length > 0) {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Dados inválidos ou vazios para exportação.');
    }
  }

  return { 
    csvToJson, 
    jsonToCsv,
    results
  };
}