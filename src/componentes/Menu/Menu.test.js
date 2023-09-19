import { render } from '@testing-library/react';
import Menu from './index';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = (props) =>
  render(
    <BrowserRouter>
      <Menu {...props} />
    </BrowserRouter>
  );

describe('Teste do componente Menu', () => {
  it('deve renderizar o link para pagina inicial', () => {
    const { getByText } = renderComponent();
    const linkElement = getByText(/início/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('deve renderizar uma lista de links', () => {
    const { getAllByRole } = renderComponent();
    const links = getAllByRole('link');
    expect(links).toHaveLength(4);
  });
  it('Não deve renderizar o link para extrato', () => {
    const { queryByText } = renderComponent();
    const linkElement = queryByText(/extrato/i);
    expect(linkElement).not.toBeInTheDocument();
  });
  it('deve renderizar uma lista de links com a classe link', () => {
    const { getAllByRole } = renderComponent();
    const links = getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass('link');
    });
    expect(links).toMatchSnapshot();
  });
});
