import { render, screen } from '@testing-library/react';
import VisualLayers from '../../components/Landing/VisualLayers';
import { vi } from 'vitest';

// Mock Embla with a stable API object to prevent infinite loops
const mockApi = { 
  on: vi.fn().mockReturnThis(), 
  off: vi.fn().mockReturnThis(), 
  scrollSnapList: () => [], 
  selectedScrollSnap: () => 0 
};

vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), mockApi]
}));

describe('VisualLayers Component', () => {
  test('renders Our Products and Our Story sections', () => {
    render(<VisualLayers />);
    
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Story/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Kem Bo Heritage/i)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<VisualLayers />);
    expect(asFragment()).toMatchSnapshot();
  });
});
