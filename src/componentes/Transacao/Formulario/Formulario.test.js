import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from './index';

describe('Formulario', () => {
  it('Deve renderizar o campo de input', () => {
    const { getByPlaceholderText } = render(<Formulario />);
    const input = getByPlaceholderText('Digite um valor');
    expect(input).toBeInTheDocument();
  });
  it('Deve renderizar o campo de input com o type number', () => {
    const { getByPlaceholderText } = render(<Formulario />);
    const input = getByPlaceholderText('Digite um valor');
    expect(input).toHaveAttribute('type', 'number');
  });
  it('Deve renderizar o campo de input como um campo requerido', () => {
    const { getByPlaceholderText } = render(<Formulario />);
    const input = getByPlaceholderText('Digite um valor');

    expect(input).toHaveAttribute('required');
    expect(input.required).toBe(true);
  });
  it('Deve renderizar o campo de input que pode ser preenchido', () => {
    const { getByPlaceholderText } = render(<Formulario />);
    const input = getByPlaceholderText('Digite um valor');
    userEvent.type(input, '50');
    expect(input).toHaveValue(50);
  });
  it('Deve chamar a função onSubmit quando o botão é clicado', () => {
    const funcaoOnSubmit = jest.fn();
    const { getByRole } = render(
      <Formulario realizarTransacao={funcaoOnSubmit} />,
    );
    const botao = getByRole('button');
    userEvent.click(botao);
    expect(funcaoOnSubmit).toHaveBeenCalledTimes(1);
  });
  
  it('Deve ser possivel selecionar um tipo de transação', () => {
    const { getByRole } = render(<Formulario />);
    const select = getByRole('combobox');
    const optionDefault = getByRole('option', {
      name: /selecione um tipo de transação/i,
    });
    userEvent.selectOptions(select, ['Depósito']);
    expect(optionDefault.selected).toBe(false);

    const optionDeposito = getByRole('option', { name: /depósito/i });
    expect(optionDeposito.selected).toBe(true);
    expect(select.required).toBe(true);
  });
});
