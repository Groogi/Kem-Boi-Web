import { render, screen, fireEvent, within } from '@testing-library/react';
import LoginForm from '../../components/SignUpLogin/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
  }),
}));

const mockShowToast = vi.fn();
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

describe('LoginForm Component', () => {
  test('switches between Login and Sign Up tabs', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome Back to the World of Kem Boi/i)).toBeInTheDocument();

    const signUpTab = screen.getByText(/Join The Family/i);
    fireEvent.click(signUpTab);

    expect(screen.getByText(/Start your avocado journey today/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First name/i)).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  test('shows error if passwords do not match on signup', () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Join The Family/i));

    fireEvent.change(screen.getByPlaceholderText(/First name/i), { target: { value: 'Timmy' } });
    fireEvent.change(screen.getByPlaceholderText(/Last name/i), { target: { value: 'Tester' } });
    fireEvent.change(screen.getByPlaceholderText(/email@example.com/i), { target: { value: 'test@example.com' } });

    const passwordInput = screen.getAllByPlaceholderText(/••••••••/i)[0];
    const confirmInput = screen.getAllByPlaceholderText(/••••••••/i)[1];

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'different123' } });

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(mockShowToast).toHaveBeenCalledWith('Passwords do not match', 'error');
  });

  test('opens forgot password mode', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const forgotBtn = screen.getByText(/Forgot Password\?/i);
    fireEvent.click(forgotBtn);

    expect(screen.getByText(/Enter your email address and we'll send you instructions/i)).toBeInTheDocument();
    expect(screen.getByText(/BACK TO LOGIN/i)).toBeInTheDocument();
  });
});
