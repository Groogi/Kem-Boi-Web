import { render, screen, waitFor } from '@testing-library/react';
import Locations from '../../components/Landing/Locations';
import { vi } from 'vitest';

describe('Locations Component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders loading/fallback state then location details', async () => {
    const mockLocation = [{
      id: 1,
      name: 'Test Store',
      address_line_1: '123 Test St',
      suburb: 'Test Suburb',
      state: 'QLD',
      postcode: '4000',
      active: true
    }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockLocation,
    });

    render(<Locations />);

    await waitFor(() => {
      expect(screen.getByText('Test Store')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
  });

  test('renders fallback data when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<Locations />);

    await waitFor(() => {
      expect(screen.getByText(/The Flagship Stall/i)).toBeInTheDocument();
    });
  });
});
