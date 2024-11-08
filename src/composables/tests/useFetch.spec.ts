import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosError } from 'axios';
import { useFetch } from '../useFetch';


vi.mock('axios');
const mockedAxios = axios as typeof axios;

describe('useFetch', () => {
  beforeEach(() => {
    mockedAxios.create = vi.fn(() => mockedAxios);  
    mockedAxios.request = vi.fn(); 
  });

  it('should set loading to true during the request and false after completion', async () => {
    const { fetchData, loading } = useFetch();
    mockedAxios.request.mockResolvedValueOnce({ data: { message: 'sucesso' } });

    expect(loading.value).toBe(false);
    
    const promise = fetchData('GET', '/test-endpoint');
    expect(loading.value).toBe(true);

    await promise;
    expect(loading.value).toBe(false);
  });

  it('should return response data on success', async () => {
    const { fetchData, result } = useFetch();
    const mockData = { message: 'sucesso' };

    mockedAxios.request.mockResolvedValueOnce({ data: mockData });

    await fetchData('GET', '/test-endpoint');
    expect(result.value).toEqual(mockData);
  });

  it('should return error if request fails', async () => {
    const { fetchData, error } = useFetch();
    const mockError = new AxiosError('Erro na requisição');
    mockedAxios.request.mockRejectedValueOnce(mockError);
    
    await fetchData('GET', '/test-endpoint');
    expect(error.value).toStrictEqual(mockError);
  });

  it('should define the "Content-Type" header according to the given parameter', async () => {
    const { fetchData } = useFetch();
    const customContentType = 'application/xml';

    mockedAxios.request.mockResolvedValueOnce({ data: {} });

    await fetchData('POST', '/test-endpoint', {}, customContentType);
    expect(mockedAxios.request).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        'Content-Type': customContentType,
      }),
    }));
  });
});
