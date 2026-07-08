import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { ToastProvider, useToast } from './toast';

// react-spring's leave transition keeps a toast mounted in the DOM until its
// exit animation finishes, which depends on real animation frames and isn't
// something this app controls. Mocking it lets these tests assert on *our*
// state logic (does removeToast take the message out of the list) instead of
// on react-spring's animation timing.
vi.mock('@react-spring/web', () => ({
  useTransition:
    (items: unknown[]) =>
    (renderItem: (style: object, item: unknown) => React.ReactNode) =>
      items.map(item => renderItem({}, item)),
  animated: new Proxy(
    {},
    {
      get: () => 'div',
    },
  ),
}));

const AddToastButton: React.FC = () => {
  const { addToast } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Seu pet foi cadastrado com sucesso.',
        })
      }
    >
      Cadastrar
    </button>
  );
};

describe('useToast', () => {
  it('renders a toast with title and description when addToast is called', () => {
    render(
      <ToastProvider>
        <AddToastButton />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(screen.getByText('Cadastro realizado')).toBeInTheDocument();
    expect(
      screen.getByText('Seu pet foi cadastrado com sucesso.'),
    ).toBeInTheDocument();
  });

  it('removes the toast when its close button is clicked', () => {
    render(
      <ToastProvider>
        <AddToastButton />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));
    expect(screen.getByText('Cadastro realizado')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '' }));

    expect(screen.queryByText('Cadastro realizado')).not.toBeInTheDocument();
  });

  it('auto-dismisses the toast after its timeout elapses', () => {
    vi.useFakeTimers();

    render(
      <ToastProvider>
        <AddToastButton />
      </ToastProvider>,
    );

    act(() => {
      screen.getByRole('button', { name: 'Cadastrar' }).click();
    });
    expect(screen.getByText('Cadastro realizado')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Cadastro realizado')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('throws when used outside of a ToastProvider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<AddToastButton />)).toThrow(
      'useToast must be used within a ToastProvider',
    );

    consoleError.mockRestore();
  });
});
