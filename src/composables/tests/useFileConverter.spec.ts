import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import Papa, { ParseMeta, ParseResult } from 'papaparse';
import { useFileConverter } from '../useFileConverter';

vi.mock('papaparse');

describe('useFileConverter', () => {
  const mockParseResult: ParseResult<any> = {
    data: [{ name: 'John Doe', age: '30' }],
    errors: [],
    meta: {
      fields: ['name', 'age'],
      delimiter: ',',
      linebreak: '\n',
      aborted: false,
      truncated: false,
      cursor: 0,
    } as ParseMeta,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the result after converting CSV to JSON', () => {
    const { csvToJson, results } = useFileConverter();
    const file = new File(['name,age\nJohn Doe,30'], 'test.csv', { type: 'text/csv' });

    (Papa.parse as Mock).mockImplementationOnce((inputFile: any, options: any) => {
      options.complete(mockParseResult); 
    });

    csvToJson(file as any);
    expect(results.value).toStrictEqual(mockParseResult); 
  });

  it('should not define results if file is not provided', () => {
    const { csvToJson, results } = useFileConverter();

    csvToJson(null as any); 

    expect(results.value).toBeUndefined();
  });
});