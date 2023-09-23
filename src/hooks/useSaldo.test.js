import { act, renderHook, waitFor } from '@testing-library/react';
import useSaldo from './useSaldo';
import { buscaSaldo } from '../services/saldo';

jest.mock('../services/saldo');

describe('useSaldo', () => {
  it('Deve retornar o saldo', async () => {
    buscaSaldo.mockImplementation(() => 10);
    const { result } = renderHook(() => useSaldo());
    expect(result.current[0]).toEqual(0);
    await act(async () => {
      result.current[1]();
    });
    expect(result.current[0]).toEqual(10);
  });
});
