import { render } from '@testing-library/react';
import Menu from './index';

describe('Teste do componente Menu', () => {
  it('deve renderizar o link para pagina inicial', () => {
    const { getByText } = render(<Menu />);
    const linkElement = getByText(/inicial/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('deve renderizar uma lista de links', () => {
    const { getAllByRole } = render(<Menu />);
    const links = getAllByRole('link');
    expect(links).toHaveLength(4);
  });
  it('Não deve renderizar o link para extrato', () => {
    const { queryByText } = render(<Menu />);
    const linkElement = queryByText(/extrato/i);
    expect(linkElement).not.toBeInTheDocument();
  });
  it('deve renderizar uma lista de links com a classe link', () => {
    const { getAllByRole } = render(<Menu />);
    const links = getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass('link');
    });
    expect(links).toMatchSnapshot();
  });
});
