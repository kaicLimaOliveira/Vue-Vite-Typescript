import Papa, { LocalFile, ParseResult } from "papaparse"
import { ref } from "vue";

export function useFileConverter() {
  const results = ref<ParseResult<any>>();

  function CsvToJson(file: LocalFile) {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: ((parseResult: ParseResult<any>) => {
          results.value = parseResult
        })
      })
    }
  }

  return { 
    CsvToJson, 
    results
  };
}