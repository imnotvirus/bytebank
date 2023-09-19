import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from './App';
import AppRoutes from '../../routes';

describe('App', () => {
    it('Deve permitir adicionar uma transação em extrato', ()=>{
        render(<App />, {wrapper: BrowserRouter});

        const campoValor = screen.getByPlaceholderText('Digite um valor');
        const select = screen.getByRole('combobox');
        const botao = screen.getByRole('button')

        userEvent.selectOptions(select, ['Depósito']);
        userEvent.type(campoValor, '10');

        userEvent.click(botao);

        const novaTransacao = screen.getByTestId('lista-transacoes');
        const itemExtrato = screen.getByRole('listitem');

        expect(novaTransacao).toContainElement(itemExtrato);

    })

    it('Deve Navegar até a pagina correspondente ao link clicado', async () =>{
        render(<AppRoutes />, {wrapper: BrowserRouter});
        
        const linkPaginaCartoes = screen.getByRole('link', {name: 'Cartões'});
        const linkPaginaServiços = screen.getByRole('link', {name: 'Serviços'});
        const linkPaginaHome = screen.getByRole('link', {name: 'Início'});
        const linkInvestimentos = screen.getByRole('link', {name: 'Investimentos'});

        expect(linkPaginaCartoes).toHaveAttribute('href', '/cartoes');
        expect(linkPaginaServiços).toHaveAttribute('href', '/servicos');
        expect(linkInvestimentos).toHaveAttribute('href', '/investimentos');
        expect(linkPaginaHome).toHaveAttribute('href', '/');

        userEvent.click(linkPaginaCartoes);

        const tituloPaginaCartoes = await screen.findByRole('heading', {name: 'Meus cartões'});

        expect(tituloPaginaCartoes).toBeInTheDocument();

        userEvent.click(linkInvestimentos);

        const tituloPaginaInvestimentos = await screen.findByRole('heading', {name: 'Investimentos'});

        expect(tituloPaginaInvestimentos).toBeInTheDocument();

        userEvent.click(linkPaginaServiços);

        const listaServicos = await screen.findByTestId('lista-servicos');

        expect(listaServicos).toBeInTheDocument();

        userEvent.click(linkPaginaHome);

        const tituloHome = await screen.findByRole('heading', {name: 'Nova Transação'});

        expect(tituloHome).toBeInTheDocument();

    })
}); 