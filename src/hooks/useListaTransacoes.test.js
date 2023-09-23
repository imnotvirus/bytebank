import { act, renderHook, waitFor } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

jest.mock('../services/transacoes');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'novembro',
  },
];

describe('useListaTransacoes', () => {
  it('Deve retornar a lista de transações', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);

    const { result } = renderHook(() => useListaTransacoes());
    expect(result.current[0]).toEqual([]);

    await act(async () => {
        result.current[1]();
    });
    
    expect(buscaTransacoes).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toEqual(mockTransacao);
   
  });
});
