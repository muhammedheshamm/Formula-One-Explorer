import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RaceCard } from '../components/RaceCard';

// Mock race data
const mockRace = {
  season: '2023',
  url: 'http://en.wikipedia.org/wiki/2023_Bahrain_Grand_Prix',
  round: '1',
  raceName: 'Bahrain Grand Prix',
  Circuit: {
    circuitId: 'bahrain',
    url: 'http://en.wikipedia.org/wiki/Bahrain_International_Circuit',
    circuitName: 'Bahrain International Circuit',
    Location: {
      lat: '26.0325',
      long: '50.5106',
      locality: 'Sakhir',
      country: 'Bahrain',
    },
  },
  date: '2023-03-05',
  time: '15:00:00Z',
};

describe('RaceCard Component', () => {
  it('renders race information correctly', () => {
    const togglePinRace = vi.fn();
    const isRacePinned = () => false;

    render(
      <BrowserRouter>
        <RaceCard race={mockRace} togglePinRace={togglePinRace} isRacePinned={isRacePinned} />
      </BrowserRouter>
    );

    // Check if race name is displayed
    expect(screen.getByText('Bahrain Grand Prix')).toBeInTheDocument();

    // Check if circuit name and country are displayed (not locality)
    expect(screen.getByText('Bahrain International Circuit, Bahrain')).toBeInTheDocument();

    // Check if date is displayed (formatted)
    expect(screen.getByText(/March 5, 2023/)).toBeInTheDocument();

    // Check if round badge is displayed
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls togglePinRace when pin button is clicked', () => {
    const togglePinRace = vi.fn();
    const isRacePinned = () => false;

    render(
      <BrowserRouter>
        <RaceCard race={mockRace} togglePinRace={togglePinRace} isRacePinned={isRacePinned} />
      </BrowserRouter>
    );

    // Find and click the pin button
    const pinButton = screen.getByLabelText('Pin race');
    fireEvent.click(pinButton);

    // Check if togglePinRace was called with the correct race
    expect(togglePinRace).toHaveBeenCalledTimes(1);
    expect(togglePinRace).toHaveBeenCalledWith(mockRace);
  });

  it('displays pinned state correctly', () => {
    const togglePinRace = vi.fn();
    const isRacePinned = () => true; // Race is pinned

    render(
      <BrowserRouter>
        <RaceCard race={mockRace} togglePinRace={togglePinRace} isRacePinned={isRacePinned} />
      </BrowserRouter>
    );

    // Check if the pin button has the correct aria-label for pinned state
    const pinButton = screen.getByLabelText('Unpin race');
    expect(pinButton).toBeInTheDocument();

    // Check if the card has the primary border class for pinned state
    const card = pinButton.closest('div[class*="border-primary-200"]');
    expect(card).toBeInTheDocument();
  });
});
