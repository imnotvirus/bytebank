import { calculaNovoSaldo } from './index';
describe('utils', () => {
  it('Quando reliza transação o saldo deve aumentar', () => {
    const transacao = {
      transacao: 'Depósito',
      valor: 50,
    };
    const saldo = 100;
    const novoSaldo = calculaNovoSaldo(transacao, saldo);
    expect(novoSaldo).toBe(150);
  });

  it('Quando reliza transação o saldo deve diminuir', () => {
    const transacao = {
      transacao: 'Saque',
      valor: 50,
    };
    const saldo = 100;
    const novoSaldo = calculaNovoSaldo(transacao, saldo);
    expect(novoSaldo).toBe(50);
  });
});
