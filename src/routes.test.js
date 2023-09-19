import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import Cartoes from './componentes/Cartoes';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';

describe('Rotas', () => {
  it('Deve renderizar a rota principal', () => {
    const { getByText } = render(<App />, { wrapper: MemoryRouter });
    const linkElement = getByText('Olá, Joana :)!');
    expect(linkElement).toBeInTheDocument();
  });
  it('Deve renderizar a rota de cartoes', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toBeInTheDocument();
  });

  it('Deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const localizacaoAtual = screen.getByTestId('local');
    expect(localizacaoAtual).toHaveTextContent(rota);
  });

  it('Deve renderizar a rota 404', () => {
    const rota = '/extrato';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const pagina404 = screen.getByTestId('pagina-404');
    const title404 = screen.getByRole('heading', {
      name: 'Ops! Não encontramos a página',
    });
    expect(pagina404).toBeInTheDocument();
    expect(pagina404).toContainElement(title404);
  });
});
