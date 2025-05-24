import { render, screen } from '@testing-library/react';
import { DriversPerformance } from '../components/DriversPerformance';
import type { RaceResult } from '../types/formulaOne';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';

const sampleResults: RaceResult[] = [
  {
    position: '1',
    Driver: {
      givenName: 'Max',
      familyName: 'Verstappen',
      driverId: 'max_verstappen',
      nationality: 'Dutch',
    },
    Constructor: {
      name: 'Red Bull',
      constructorId: 'red_bull',
      nationality: 'Austrian',
    },
    Time: {
      millis: '5400000',
      time: '1:30:00',
    },
    status: 'Finished',
    number: '1',
    grid: '1',
    laps: '58',
    points: '25',
  },
  {
    position: '2',
    Driver: {
      givenName: 'Lewis',
      familyName: 'Hamilton',
      driverId: 'lewis_hamilton',
      nationality: 'British',
    },
    Constructor: {
      name: 'Mercedes',
      constructorId: 'mercedes',
      nationality: 'German',
    },
    Time: {
      millis: '5408000',
      time: '+8.000s',
    },
    status: 'Finished',
    number: '44',
    grid: '2',
    laps: '58',
    points: '18',
  },
];

describe('<DriversPerformance />', () => {
  it('renders "No Performance Data" if results are empty', () => {
    render(<DriversPerformance results={[]} />);
    expect(screen.getByText(/No Performance Data/i)).toBeInTheDocument();
  });

  it('renders performance chart with valid data', () => {
    render(<DriversPerformance results={sampleResults} />);

    expect(screen.getByText('Performance Visualization')).toBeInTheDocument();
    expect(screen.getAllByText('Max Verstappen')).toHaveLength(2); // One in the chart, one in the winner section
    expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
    expect(screen.getByText('Red Bull')).toBeInTheDocument();
    expect(screen.getByText('1:30:00')).toBeInTheDocument();
  });

  it('displays winner information correctly', () => {
    render(<DriversPerformance results={sampleResults} />);

    // Check winner section
    expect(screen.getByText('Winner')).toBeInTheDocument();

    // The winner's name should be displayed in the winner card
    const winnerElements = screen.getAllByText('Max Verstappen');
    expect(winnerElements.length).toBeGreaterThan(0);
  });

  it('displays time differences correctly', () => {
    render(<DriversPerformance results={sampleResults} />);

    // check for the time difference section header
    expect(screen.getByText('Time Gap from Winner (seconds)')).toBeInTheDocument();

    // check for the winner's time (should be 0.000s)
    expect(screen.getByText('0.000s')).toBeInTheDocument();

    // the calculation is (secondTime - winnerTime) / 1000
    // (5408000 - 5400000) / 1000 = 8.000
    expect(screen.getByText('8.000s')).toBeInTheDocument();
  });

  it('displays correct number of finishers and participants', () => {
    render(<DriversPerformance results={sampleResults} />);
    const finishersElement = screen.getAllByText('2');
    expect(finishersElement.length).toBeGreaterThan(0);
    expect(screen.getByText(/Out of 2 participants/i)).toBeInTheDocument();
  });
});
