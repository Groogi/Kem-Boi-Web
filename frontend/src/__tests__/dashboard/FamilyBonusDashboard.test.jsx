import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FamilyBonusDashboard from '../../pages/FamilyBonusDashboard';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock ToastContext
vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

import { useAuth } from '../../context/AuthContext';

describe('FamilyBonusDashboard Page', () => {
  const mockUser = {
    first_name: 'Timmy',
    last_name: 'Tester',
    points_balance: 650, // Should be SILVER
    role: 'member',
    email: 'timmy@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }));

    useAuth.mockReturnValue({
      user: mockUser,
      token: 'fake-token',
      refreshProfile: vi.fn(),
      updateUser: vi.fn(),
      logout: vi.fn(),
    });
  });

  test('renders welcome message with user name', () => {
    render(
      <MemoryRouter>
        <FamilyBonusDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to your Kem Boi Dashboard, Timmy!/i)).toBeInTheDocument();
  });

  test('displays correct points and status tier', () => {
    render(
      <MemoryRouter>
        <FamilyBonusDashboard />
      </MemoryRouter>
    );

    // Points display
    expect(screen.getByText(/650/i)).toBeInTheDocument();
    
    // Status Badge (650 pts = SILVER)
    expect(screen.getByText(/SILVER/i)).toBeInTheDocument();
  });

  test('calculates punch card correctly', () => {
    // 650 points / 200 per punch = 3 punches. 6 - 3 = 3 more to go.
    render(
      <MemoryRouter>
        <FamilyBonusDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Only 3 more punches to go!/i)).toBeInTheDocument();
  });

  test('switches to rewards tab', async () => {
    render(
      <MemoryRouter>
        <FamilyBonusDashboard />
      </MemoryRouter>
    );

    // Find the Rewards tab button (the one for desktop in the header)
    const rewardsTab = screen.getAllByRole('button', { name: /Rewards/i })[0];
    fireEvent.click(rewardsTab);

    // Check if the "Redeemable Offers" heading appears
    expect(screen.getByText(/Redeemable Offers:/i)).toBeInTheDocument();
  });
});
