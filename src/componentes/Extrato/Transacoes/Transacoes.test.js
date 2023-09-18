import { render } from '@testing-library/react';
import Transacao from './index';
import estilos from './../Extrato.module.css';

describe('Transacao', () => {
  it('Deve renderizar o mesmo componente com props atualizadas', () => {
    const transacao = {
      transacao: 'Depósito',
      valor: 100,
    };
    const { getByTestId, rerender } = render(
      <Transacao estilos={estilos} transacao={transacao} />,
    );

    const tipoTransacao = getByTestId('tipoTransacao');
    const valorTransacao = getByTestId('valorTransacao');

    expect(tipoTransacao).toHaveTextContent('Depósito');
    expect(valorTransacao).toHaveTextContent('R$ 100');

    const novaTransacao = {
      transacao: 'Transferencia',
      valor: 50,
    };

    rerender(<Transacao estilos={estilos} transacao={novaTransacao} />);

    expect(tipoTransacao).toHaveTextContent('Transferencia');
    expect(valorTransacao).toHaveTextContent('R$ 50');
  });

  it('Deve renderizar valor negativo quando for saque', () => {
    const transacao = {
      transacao: 'Saque',
      valor: 50,
    };
    const { getByTestId } = render(
      <Transacao estilos={estilos} transacao={transacao} />,
    );
    const valorTransacao = getByTestId('valorTransacao');
    expect(valorTransacao.textContent).toBe('- R$ 50');
  });
});
