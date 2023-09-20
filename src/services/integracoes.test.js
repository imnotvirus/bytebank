import api from './api';
import { buscaTransacoes, salvaTransacao } from './transacoes';
import { buscaSaldo } from './saldo';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'novembro',
  },
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: retorno });
    }, 200);
  });
};

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequisicaoPost = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
      });
    }, 200);
  });
};

const mockRequisicaoPostErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Requisições para API', () => {
  it('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
  it('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());

    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
  it('Deve retornar o valor do saldo', async () => {
    api.get.mockImplementation(() => mockRequisicao({ valor: 100 }));

    const saldo = await buscaSaldo();

    expect(saldo).toEqual(100);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });
  it('Deve retornar o valor de 1000 caso de erro a requisição de saldo', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());

    const saldo = await buscaSaldo();

    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });

  it('Deve retornar o status 201 ao salvar uma transação', async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());

    const status = await salvaTransacao(mockTransacao[0]);

    expect(status).toEqual(201);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });

  it('Deve retornar um saldo de 1000 quando a requisição POST falhar', async () => {
    api.post.mockImplementation(() => mockRequisicaoPostErro());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe('Erro na requisição');
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });
});
