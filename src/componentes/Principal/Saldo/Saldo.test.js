import { render, screen } from '@testing-library/react';
import Saldo from './index';

describe('Saldo', () => {
  it('Deve renderizar o saldo com o valor monetario', () => {
    render(<Saldo saldo={1000} />);
    const saldo = screen.getByTestId('saldo-conta');
    expect(saldo).toBeInTheDocument();
    expect(saldo.textContent).toBe('R$ 1000');
  });
});
