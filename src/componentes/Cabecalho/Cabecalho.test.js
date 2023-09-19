import { render, screen } from '@testing-library/react';
import Cabecalho from './index';

test('deve renderizar o nome do usuario logado', () => {
  render(<Cabecalho />);
  const nomeUsuario = screen.getByText(/Joana Fonseca Gomes/i);
  expect(nomeUsuario).toBeInTheDocument();
});
