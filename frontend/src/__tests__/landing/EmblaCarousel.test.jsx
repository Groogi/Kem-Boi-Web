import { render, screen } from '@testing-library/react';
import EmblaCarousel from '../../components/Landing/EmblaCarousel';
import { vi } from 'vitest';

// Mock Embla with a stable API object to prevent infinite loops
const mockApi = { 
  on: vi.fn().mockReturnThis(), 
  off: vi.fn().mockReturnThis(),
  scrollSnapList: () => [0, 1, 2],
  selectedScrollSnap: () => 0,
  scrollTo: vi.fn(),
  canScrollPrev: () => false,
  canScrollNext: () => true,
};

vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), mockApi]
}));

vi.mock('embla-carousel-autoplay', () => ({
  default: vi.fn()
}));

describe('EmblaCarousel Component', () => {
  const mockSlides = [1, 2, 3];

  test('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<EmblaCarousel slides={mockSlides} options={{}} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(asFragment()).toMatchSnapshot();
  });
});
