import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';
import { useSearchCity } from './useSearchCity';

jest.mock('swr');
describe('useSearchCity', () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: 'City 1' },
        { id: 2, name: 'City 2' },
        { id: 3, name: 'City 3' },
      ],
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the data, error, and isLoading values', () => {
    const { result } = renderHook(() => useSearchCity(''));

    expect(result.current.data).toEqual([
      { id: 1, name: 'City 1' },
      { id: 2, name: 'City 2' },
      { id: 3, name: 'City 3' },
    ]);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});