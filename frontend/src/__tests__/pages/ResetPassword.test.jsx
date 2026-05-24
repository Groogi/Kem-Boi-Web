import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../api/auth', () => ({
  resetPassword: vi.fn(),
}));

const mockShowToast = vi.fn();
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { resetPassword } from '../../api/auth';

describe('ResetPassword Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('redirects if token or email is missing', () => {
    render(
      <MemoryRouter initialEntries={['/reset-password']}>
        <ResetPassword />
      </MemoryRouter>
    );

    expect(mockShowToast).toHaveBeenCalledWith('Invalid or missing reset token', 'error');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('renders form when token and email are present', () => {
    render(
      <MemoryRouter initialEntries={['/reset-password?token=abc&email=test@test.com']}>
        <ResetPassword />
      </MemoryRouter>
    );

    expect(screen.getByText(/Create New Password/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/••••••••/i)).toHaveLength(2);
  });

  test('shows error if passwords do not match', async () => {
    render(
      <MemoryRouter initialEntries={['/reset-password?token=abc&email=test@test.com']}>
        <ResetPassword />
      </MemoryRouter>
    );

    const passwordInputs = screen.getAllByPlaceholderText(/••••••••/i);
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'different123' } });

    fireEvent.submit(screen.getByRole('button', { name: /Save New Password/i }).closest('form'));

    expect(mockShowToast).toHaveBeenCalledWith('Passwords do not match', 'error');
  });

  test('successfully resets password', async () => {
    resetPassword.mockResolvedValueOnce({ success: true });

    render(
      <MemoryRouter initialEntries={['/reset-password?token=abc&email=test@test.com']}>
        <ResetPassword />
      </MemoryRouter>
    );

    const passwordInputs = screen.getAllByPlaceholderText(/••••••••/i);
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

    fireEvent.submit(screen.getByRole('button', { name: /Save New Password/i }).closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/Password Updated!/i)).toBeInTheDocument();
      expect(mockShowToast).toHaveBeenCalledWith('Password reset successful!', 'success');
    });
  });
});
