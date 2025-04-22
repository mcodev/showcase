import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUp from '../components/SignUp';

// Mocks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/components/ShowNotification/ShowNotification', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/providers/ModulesProvider', () => ({
  useModulesContext: () => ({
    closeAuthModal: jest.fn(),
  }),
}));

jest.mock('@/providers/ApiConnectionProvider', () => ({
  useApiConnection: () => ({
    request: jest.fn(),
  }),
}));

jest.mock('../context/AuthSelectionProvider', () => ({
  useAuthContext: () => ({
    changeSelectedComponent: jest.fn(),
  }),
}));

describe('SignUp component', () => {
  const mockRequest = require('@/providers/ApiConnectionProvider').useApiConnection().request;
  const mockCloseAuthModal = require('@/providers/ModulesProvider').useModulesContext()
    .closeAuthModal;
  const mockChangeSelectedComponent = require('../context/AuthSelectionProvider').useAuthContext()
    .changeSelectedComponent;
  const mockShowNotification = require('@/components/ShowNotification/ShowNotification').default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields', () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repeat_password/i)).toBeInTheDocument();
    expect(screen.getByText(/terms_and_conditions/i)).toBeInTheDocument();
  });

  it('shows validation errors if form is incomplete', async () => {
    render(<SignUp />);
    fireEvent.click(screen.getByRole('button', { name: /sign_up/i }));
    await waitFor(() => {
      expect(mockRequest).not.toHaveBeenCalled();
    });
  });

  it('submits valid form and calls API', async () => {
    mockRequest.mockResolvedValueOnce({ success: true });

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'newuser' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'newuser@example.com' },
    });

    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: 'Password123' },
    });

    fireEvent.change(screen.getByLabelText(/repeat_password/i), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: /sign_up/i }));

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith({
        service: expect.any(String),
        payload: {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'Password123',
        },
      });
      expect(mockCloseAuthModal).toHaveBeenCalled();
    });
  });

  it('shows error notification and field error on non-unique username', async () => {
    mockRequest.mockRejectedValueOnce({ message: 'USERNAME_IN_NOT_UNIQUE' });

    render(<SignUp />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'taken' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: 'Password123' },
    });

    fireEvent.change(screen.getByLabelText(/repeat_password/i), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: /sign_up/i }));

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'error',
        message: 'USERNAME_IN_NOT_UNIQUE',
      });
    });

    expect(await screen.findByText(/username_not_unique/i)).toBeInTheDocument();
  });

  it('clicking "sign in" switches component', () => {
    render(<SignUp />);
    fireEvent.click(screen.getByText(/sign_in/i));
    expect(mockChangeSelectedComponent).toHaveBeenCalledWith('signIn');
  });

  it('clicking on "terms and conditions" calls closeAuthModal', () => {
    render(<SignUp />);
    fireEvent.click(screen.getByText(/terms_and_conditions/i));
    expect(mockCloseAuthModal).toHaveBeenCalled();
  });
});
