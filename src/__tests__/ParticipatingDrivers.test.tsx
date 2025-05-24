import { render, screen, fireEvent } from '@testing-library/react';
import { ParticipatingDrivers } from '../components/ParticipatingDrivers';
import type { RaceResult } from '../types/formulaOne';
import { describe, expect, it } from 'vitest';

const mockResults: RaceResult[] = [
  {
    position: '1',
    Driver: {
      driverId: 'max_verstappen',
      givenName: 'Max',
      familyName: 'Verstappen',
      nationality: 'Dutch',
    },
    Constructor: {
      constructorId: 'red_bull',
      name: 'Red Bull',
    },
    status: 'Finished',
    Time: {
      time: '1:33:56.736',
    },
  },
  {
    position: '2',
    Driver: {
      driverId: 'sergio_perez',
      givenName: 'Sergio',
      familyName: 'Pérez',
      nationality: 'Mexican',
    },
    Constructor: {
      constructorId: 'red_bull',
      name: 'Red Bull',
    },
    status: 'Finished',
    Time: {
      time: '1:34:07.736',
    },
  },
];

describe('ParticipatingDrivers Component', () => {
  it('renders without crashing and shows all driver rows', () => {
    render(<ParticipatingDrivers results={mockResults} />);
    expect(screen.getByText('Participating Drivers')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search drivers...')).toBeInTheDocument();

    // Check both drivers are rendered
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('Sergio Pérez')).toBeInTheDocument();
  });

  it('displays the correct driver info', () => {
    render(<ParticipatingDrivers results={mockResults} />);

    expect(screen.getByText('Dutch')).toBeInTheDocument();
    expect(screen.getByText('Mexican')).toBeInTheDocument();

    expect(screen.getAllByText('Red Bull')).toHaveLength(2);
    expect(screen.getByText('1:33:56.736')).toBeInTheDocument();
    expect(screen.getByText('1:34:07.736')).toBeInTheDocument();
  });

  it('filters and highlights drivers based on search input', () => {
    render(<ParticipatingDrivers results={mockResults} />);
    const input = screen.getByPlaceholderText('Search drivers...');

    fireEvent.change(input, { target: { value: 'sergio' } });

    // only Sergio should be highlighted
    const highlighted = screen.getByText(
      (content, element) =>
        element?.tagName === 'SPAN' &&
        element.className.includes('bg-red-200') &&
        content.toLowerCase().includes('sergio')
    );
    expect(highlighted).toBeInTheDocument();

    // Max should not be highlighted
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    const nonHighlighted = screen.queryByText(
      (content, element) =>
        element?.tagName === 'SPAN' && element.className.includes('bg-red-200') && content.toLowerCase().includes('max')
    );
    expect(nonHighlighted).not.toBeInTheDocument();
  });
});
