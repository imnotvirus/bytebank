import {render} from '@testing-library/react';
import Extrato from './index';

describe('Teste do componente Extrato', () => {
    it('Deve renderizar uma lista de transações', () => {
        const transações = [
            {
                transacao: 'Deposito',
                valor: '100',
            }
        ];
        const {getByRole} = render(<Extrato transacoes={transações} />);
        const lista = getByRole('listitem');
        expect(lista).toBeInTheDocument();
    });
});