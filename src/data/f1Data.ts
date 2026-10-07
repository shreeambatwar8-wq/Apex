import { GENERATED_IMAGES } from './articles';

export interface Driver {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  number: number;
  nationality: string;
  countryCode: string;
  team: string;
  teamColor: string;
  position: number;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  avgQualifying: string;
  avgFinish: string;
  portrait: string;
  bio: string;
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  base: string;
  powerUnit: string;
  chassis: string;
  teamPrincipal: string;
  drivers: [string, string];
  position: number;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  accentColor: string;
  heroImage: string;
  technicalProfile: string;
}

export interface Circuit {
  id: string;
  name: string;
  officialName: string;
  country: string;
  city: string;
  lengthKm: string;
  corners: number;
  laps: number;
  raceDistanceKm: string;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  downforceLevel: 'Low' | 'Medium-Low' | 'Medium-High' | 'High' | 'Maximum';
  fullThrottlePct: number;
  topSpeedKmh: number;
  image: string;
  svgPath: string;
  startFinishCoords: { x: number; y: number };
  sectorSplits: { s1: string; s2: string };
  editorialNote: string;
}

export interface CalendarRound {
  round: number;
  grandPrix: string;
  country: string;
  city: string;
  circuitName: string;
  circuitId: string;
  dateRange: string;
  raceDateIso: string;
  status: 'COMPLETED' | 'NEXT RACE' | 'UPCOMING';
  winner?: string;
  winningTeam?: string;
  poleTime?: string;
  image: string;
  svgPath: string;
}

// SVG Track Paths engineered on a 200x130 coordinate canvas for technical diagrams
export const CIRCUIT_SVG_PATHS = {
  monza: 'M 40,95 L 155,95 C 170,95 178,80 165,68 L 125,32 C 115,22 98,25 92,35 L 80,52 L 58,55 L 35,38 C 22,30 15,45 20,62 L 26,88 C 28,94 34,95 40,95 Z',
  spa: 'M 32,85 L 55,42 C 62,28 78,22 95,28 L 155,45 C 172,52 175,72 158,82 L 120,75 L 98,92 L 65,102 C 45,105 28,98 32,85 Z',
  suzuka: 'M 30,75 C 35,45 65,35 95,58 C 120,78 150,82 168,62 C 178,48 162,28 138,35 C 112,42 98,68 75,85 C 52,102 25,95 30,75 Z',
  monaco: 'M 28,92 L 88,88 L 135,62 L 168,65 C 178,55 168,35 148,38 L 112,52 L 95,42 L 62,55 L 42,48 L 22,72 Z',
  silverstone: 'M 45,32 L 125,25 L 165,55 L 145,98 L 95,105 L 82,82 L 48,95 L 25,65 Z',
  singapore: 'M 25,65 L 65,65 L 68,35 L 125,35 L 130,58 L 172,58 L 172,95 L 110,95 L 95,82 L 45,95 L 25,85 Z',
  cota: 'M 22,95 L 92,72 L 132,38 L 175,25 L 162,52 L 105,82 L 88,102 L 55,92 L 42,105 Z',
  interlagos: 'M 35,45 L 145,35 C 168,38 172,68 150,82 L 85,78 C 68,75 68,58 95,58 L 128,62 L 115,98 L 45,95 C 25,88 22,55 35,45 Z',
};

export const DRIVERS: Driver[] = [
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    firstName: 'Charles',
    lastName: 'Leclerc',
    number: 16,
    nationality: 'Monaco',
    countryCode: 'MON',
    team: 'Scuderia Maranello',
    teamColor: '#E10600',
    position: 1,
    points: 342,
    wins: 6,
    podiums: 13,
    poles: 8,
    fastestLaps: 5,
    avgQualifying: '1.8',
    avgFinish: '2.4',
    portrait: GENERATED_IMAGES.driverPortrait,
    bio: 'Renowned for transcendent single-lap qualifying speed and surgical late-braking racecraft, the Monegasque spearheads the crimson championship charge.'
  },
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    firstName: 'Max',
    lastName: 'Verstappen',
    number: 1,
    nationality: 'Netherlands',
    countryCode: 'NED',
    team: 'Milton Keynes Racing',
    teamColor: '#3671C6',
    position: 2,
    points: 328,
    wins: 5,
    podiums: 12,
    poles: 5,
    fastestLaps: 4,
    avgQualifying: '2.3',
    avgFinish: '2.7',
    portrait: GENERATED_IMAGES.heroCar,
    bio: 'A relentless metronome in variable grip conditions with unmatched capacity to manage tyre degradation while operating on a razor-thin front-end balance.'
  },
  {
    id: 'norris',
    name: 'Lando Norris',
    firstName: 'Lando',
    lastName: 'Norris',
    number: 4,
    nationality: 'United Kingdom',
    countryCode: 'GBR',
    team: 'Woking Papaya Motorsport',
    teamColor: '#FF8000',
    position: 3,
    points: 304,
    wins: 4,
    podiums: 11,
    poles: 4,
    fastestLaps: 5,
    avgQualifying: '2.5',
    avgFinish: '3.1',
    portrait: GENERATED_IMAGES.pitStop,
    bio: 'Excels in long-stint C1/C2 compound management and high-speed aero sweeps, consistently extracting maximum pace in the final third of a Grand Prix.'
  },
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    firstName: 'Lewis',
    lastName: 'Hamilton',
    number: 44,
    nationality: 'United Kingdom',
    countryCode: 'GBR',
    team: 'Scuderia Maranello',
    teamColor: '#E10600',
    position: 4,
    points: 276,
    wins: 2,
    podiums: 9,
    poles: 1,
    fastestLaps: 3,
    avgQualifying: '4.1',
    avgFinish: '3.6',
    portrait: GENERATED_IMAGES.driverPortrait,
    bio: 'Seven-time World Champion bringing unmatched Sunday race reading, wet-weather touch, and strategic tyre preservation to the Italian stable.'
  },
  {
    id: 'piastri',
    name: 'Oscar Piastri',
    firstName: 'Oscar',
    lastName: 'Piastri',
    number: 81,
    nationality: 'Australia',
    countryCode: 'AUS',
    team: 'Woking Papaya Motorsport',
    teamColor: '#FF8000',
    position: 5,
    points: 251,
    wins: 2,
    podiums: 8,
    poles: 1,
    fastestLaps: 2,
    avgQualifying: '3.9',
    avgFinish: '4.2',
    portrait: GENERATED_IMAGES.aeroTunnel,
    bio: 'Ice-cold under wheel-to-wheel pressure with a clinical junior pedigree across F3 and F2, thriving on high-commitment street circuits and fast chicanes.'
  },
  {
    id: 'russell',
    name: 'George Russell',
    firstName: 'George',
    lastName: 'Russell',
    number: 63,
    nationality: 'United Kingdom',
    countryCode: 'GBR',
    team: 'Brackley Silver Arrows',
    teamColor: '#27F4D2',
    position: 6,
    points: 214,
    wins: 1,
    podiums: 6,
    poles: 2,
    fastestLaps: 2,
    avgQualifying: '4.4',
    avgFinish: '5.1',
    portrait: GENERATED_IMAGES.circuitMonza,
    bio: 'Analytical team leader with incisive Saturday qualifying commitment and opportunistic strategic calls from the cockpit.'
  },
  {
    id: 'sainz',
    name: 'Carlos Sainz',
    firstName: 'Carlos',
    lastName: 'Sainz',
    number: 55,
    nationality: 'Spain',
    countryCode: 'ESP',
    team: 'Grove Heritage Racing',
    teamColor: '#64C4FF',
    position: 7,
    points: 142,
    wins: 0,
    podiums: 2,
    poles: 0,
    fastestLaps: 1,
    avgQualifying: '6.8',
    avgFinish: '6.5',
    portrait: GENERATED_IMAGES.pitStop,
    bio: 'One of the paddock’s deepest engineering minds, capable of calling his own DRS and hybrid deployment strategy from the cockpit at 310 km/h.'
  },
  {
    id: 'alonso',
    name: 'Fernando Alonso',
    firstName: 'Fernando',
    lastName: 'Alonso',
    number: 14,
    nationality: 'Spain',
    countryCode: 'ESP',
    team: 'Silverstone AMR Racing',
    teamColor: '#229971',
    position: 8,
    points: 118,
    wins: 0,
    podiums: 1,
    poles: 0,
    fastestLaps: 1,
    avgQualifying: '7.9',
    avgFinish: '7.4',
    portrait: GENERATED_IMAGES.heroCar,
    bio: 'Two-time World Champion whose spatial awareness on Lap 1 and defensive positioning remain benchmark reference points across four decades of racing.'
  }
];

export const TEAMS: Team[] = [
  {
    id: 'scuderia-maranello',
    name: 'Scuderia Maranello',
    fullName: 'Scuderia Maranello Racing Division',
    base: 'Maranello, Italy',
    powerUnit: '066/12 V6 Turbo-Hybrid',
    chassis: 'SF-26 Project',
    teamPrincipal: 'Frédéric Vasseur',
    drivers: ['Charles Leclerc (#16)', 'Lewis Hamilton (#44)'],
    position: 1,
    points: 618,
    wins: 8,
    podiums: 22,
    poles: 9,
    fastestLaps: 8,
    accentColor: '#E10600',
    heroImage: GENERATED_IMAGES.heroCar,
    technicalProfile: 'Engineered around aggressive rear-suspension anti-squat geometry and ultra-compact V-angled sidepod radiators, delivering class-leading mechanical traction out of slow corners and superior C2/C3 thermal tyre life.'
  },
  {
    id: 'woking-papaya',
    name: 'Woking Papaya Motorsport',
    fullName: 'Woking International Racing Team',
    base: 'Woking, United Kingdom',
    powerUnit: 'HPP M15 E-Performance',
    chassis: 'MCL-39',
    teamPrincipal: 'Andrea Stella',
    drivers: ['Lando Norris (#4)', 'Oscar Piastri (#81)'],
    position: 2,
    points: 555,
    wins: 6,
    podiums: 19,
    poles: 5,
    fastestLaps: 7,
    accentColor: '#FF8000',
    heroImage: GENERATED_IMAGES.aeroTunnel,
    technicalProfile: 'Pioneers of aero-elastic front-wing load management and high-efficiency Venturi diffuser extraction, making their package devastatingly fast across medium- and high-speed sweeping corners.'
  },
  {
    id: 'milton-keynes',
    name: 'Milton Keynes Racing',
    fullName: 'Milton Keynes Performance Engineering',
    base: 'Milton Keynes, United Kingdom',
    powerUnit: 'RBPT H003 Hybrid',
    chassis: 'RB-22',
    teamPrincipal: 'Christian Horner',
    drivers: ['Max Verstappen (#1)', 'Liam Lawson (#30)'],
    position: 3,
    points: 446,
    wins: 5,
    podiums: 14,
    poles: 5,
    fastestLaps: 4,
    accentColor: '#3671C6',
    heroImage: GENERATED_IMAGES.pitStop,
    technicalProfile: 'Characterized by extreme DRS straight-line efficiency and sharp front-axle turn-in authority, paired with the paddock’s most consistent sub-2.0-second pit lane crew.'
  },
  {
    id: 'brackley-silver',
    name: 'Brackley Silver Arrows',
    fullName: 'Brackley Motorsport Operations',
    base: 'Brackley, United Kingdom',
    powerUnit: 'HPP M15 E-Performance',
    chassis: 'W17',
    teamPrincipal: 'Toto Wolff',
    drivers: ['George Russell (#63)', 'Kimi Antonelli (#12)'],
    position: 4,
    points: 342,
    wins: 1,
    podiums: 8,
    poles: 2,
    fastestLaps: 3,
    accentColor: '#27F4D2',
    heroImage: GENERATED_IMAGES.circuitMonza,
    technicalProfile: 'Excels on cooler track surfaces and smooth low-abrasion tarmac where stiff floor ride-height targets can be maintained without triggering high-speed porpoising.'
  },
  {
    id: 'grove-heritage',
    name: 'Grove Heritage Racing',
    fullName: 'Grove Grand Prix Engineering',
    base: 'Grove, United Kingdom',
    powerUnit: 'HPP M15 E-Performance',
    chassis: 'FW-48',
    teamPrincipal: 'James Vowles',
    drivers: ['Carlos Sainz (#55)', 'Alex Albon (#23)'],
    position: 5,
    points: 198,
    wins: 0,
    podiums: 2,
    poles: 0,
    fastestLaps: 1,
    accentColor: '#64C4FF',
    heroImage: GENERATED_IMAGES.aeroTunnel,
    technicalProfile: 'Low-drag aerodynamic philosophy makes the chassis formidable at Monza, Spa, and Baku, reinforced by modernized digital twin ERP manufacturing.'
  },
  {
    id: 'silverstone-amr',
    name: 'Silverstone AMR Racing',
    fullName: 'Silverstone Performance Campus Team',
    base: 'Silverstone, United Kingdom',
    powerUnit: 'HPP Hybrid System',
    chassis: 'AMR-26',
    teamPrincipal: 'Andy Cowell',
    drivers: ['Fernando Alonso (#14)', 'Lance Stroll (#18)'],
    position: 6,
    points: 154,
    wins: 0,
    podiums: 1,
    poles: 0,
    fastestLaps: 1,
    accentColor: '#229971',
    heroImage: GENERATED_IMAGES.driverPortrait,
    technicalProfile: 'Operating from a brand-new state-of-the-art wind tunnel campus at Silverstone with deep focus on low-speed mechanical grip and energy recovery calibration.'
  }
];

export const CIRCUITS: Circuit[] = [
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    officialName: 'Formula 1 Gran Premio d’Italia',
    country: 'Italy',
    city: 'Monza, Lombardy',
    lengthKm: '5.793 km',
    corners: 11,
    laps: 53,
    raceDistanceKm: '306.720 km',
    lapRecord: {
      time: '1:21.046',
      driver: 'Rubens Barrichello',
      year: 2004,
    },
    downforceLevel: 'Low',
    fullThrottlePct: 81,
    topSpeedKmh: 358,
    image: GENERATED_IMAGES.circuitMonza,
    svgPath: CIRCUIT_SVG_PATHS.monza,
    startFinishCoords: { x: 95, y: 95 },
    sectorSplits: { s1: '27.4s', s2: '27.1s' },
    editorialNote: 'Known universally as "La Pista Magica" (The Magic Track), Monza requires ultra-skinny bespoke wings and fearless late braking from 358 km/h down to 70 km/h at the Rettifilo chicane.'
  },
  {
    id: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    officialName: 'Formula 1 Belgian Grand Prix',
    country: 'Belgium',
    city: 'Stavelot, Ardennes',
    lengthKm: '7.004 km',
    corners: 19,
    laps: 44,
    raceDistanceKm: '308.052 km',
    lapRecord: {
      time: '1:44.701',
      driver: 'Sergio Pérez',
      year: 2024,
    },
    downforceLevel: 'Medium-Low',
    fullThrottlePct: 74,
    topSpeedKmh: 344,
    image: GENERATED_IMAGES.heroCar,
    svgPath: CIRCUIT_SVG_PATHS.spa,
    startFinishCoords: { x: 42, y: 65 },
    sectorSplits: { s1: '30.2s', s2: '46.1s' },
    editorialNote: 'The longest circuit on the calendar forces an agonizing setup compromise between low drag for the 23-second blast up the Kemmel Straight and high downforce for the 280 km/h Pouhon double-apex.'
  },
  {
    id: 'suzuka',
    name: 'Suzuka International Racing Course',
    officialName: 'Formula 1 Japanese Grand Prix',
    country: 'Japan',
    city: 'Suzuka, Mie Prefecture',
    lengthKm: '5.807 km',
    corners: 18,
    laps: 53,
    raceDistanceKm: '307.471 km',
    lapRecord: {
      time: '1:30.983',
      driver: 'Lewis Hamilton',
      year: 2019,
    },
    downforceLevel: 'High',
    fullThrottlePct: 71,
    topSpeedKmh: 331,
    image: GENERATED_IMAGES.aeroTunnel,
    svgPath: CIRCUIT_SVG_PATHS.suzuka,
    startFinishCoords: { x: 65, y: 46 },
    sectorSplits: { s1: '31.5s', s2: '40.2s' },
    editorialNote: 'Formula 1’s only figure-eight track subjects chassis and driver to relentless 5.6G lateral reversals through the Sector 1 Esses, Degner curves, and the iconic flat-out 130R.'
  },
  {
    id: 'monaco',
    name: 'Circuit de Monaco',
    officialName: 'Formula 1 Grand Prix de Monaco',
    country: 'Monaco',
    city: 'Monte Carlo',
    lengthKm: '3.337 km',
    corners: 19,
    laps: 78,
    raceDistanceKm: '260.286 km',
    lapRecord: {
      time: '1:12.909',
      driver: 'Lewis Hamilton',
      year: 2021,
    },
    downforceLevel: 'Maximum',
    fullThrottlePct: 48,
    topSpeedKmh: 292,
    image: GENERATED_IMAGES.driverPortrait,
    svgPath: CIRCUIT_SVG_PATHS.monaco,
    startFinishCoords: { x: 58, y: 90 },
    sectorSplits: { s1: '18.9s', s2: '34.4s' },
    editorialNote: 'The jewel in the crown where barrier clearance is measured in millimetres. Saturday Q3 is effectively the race itself, demanding extreme mechanical compliance and custom steering lock angles.'
  },
  {
    id: 'silverstone',
    name: 'Silverstone Circuit',
    officialName: 'Formula 1 British Grand Prix',
    country: 'United Kingdom',
    city: 'Towcester, Northamptonshire',
    lengthKm: '5.891 km',
    corners: 18,
    laps: 52,
    raceDistanceKm: '306.198 km',
    lapRecord: {
      time: '1:27.097',
      driver: 'Max Verstappen',
      year: 2020,
    },
    downforceLevel: 'High',
    fullThrottlePct: 76,
    topSpeedKmh: 334,
    image: GENERATED_IMAGES.pitStop,
    svgPath: CIRCUIT_SVG_PATHS.silverstone,
    startFinishCoords: { x: 85, y: 28 },
    sectorSplits: { s1: '27.9s', s2: '35.6s' },
    editorialNote: 'Home of the first World Championship Grand Prix in 1950. Copse, Maggotts, Becketts, and Stowe generate the highest sustained lateral tyre energy loads of the entire season.'
  },
  {
    id: 'singapore',
    name: 'Marina Bay Street Circuit',
    officialName: 'Formula 1 Singapore Airlines Singapore Grand Prix',
    country: 'Singapore',
    city: 'Marina Bay',
    lengthKm: '4.940 km',
    corners: 19,
    laps: 62,
    raceDistanceKm: '306.143 km',
    lapRecord: {
      time: '1:34.486',
      driver: 'Daniel Ricciardo',
      year: 2024,
    },
    downforceLevel: 'Maximum',
    fullThrottlePct: 56,
    topSpeedKmh: 318,
    image: GENERATED_IMAGES.heroCar,
    svgPath: CIRCUIT_SVG_PATHS.singapore,
    startFinishCoords: { x: 45, y: 65 },
    sectorSplits: { s1: '27.1s', s2: '39.4s' },
    editorialNote: 'F1’s original night race is a physical furnace: 80% humidity, 52°C cockpit temperatures, bumpy street braking zones, and a near-100% historical Safety Car deployment probability.'
  }
];

export const CALENDAR_ROUNDS: CalendarRound[] = [
  {
    round: 16,
    grandPrix: 'Gran Premio d’Italia',
    country: 'Italy',
    city: 'Monza',
    circuitName: 'Autodromo Nazionale Monza',
    circuitId: 'monza',
    dateRange: '04 – 06 SEP 2026',
    raceDateIso: '2026-09-06T13:00:00Z',
    status: 'COMPLETED',
    winner: 'Charles Leclerc (#16)',
    winningTeam: 'Scuderia Maranello',
    poleTime: '1:19.327',
    image: GENERATED_IMAGES.circuitMonza,
    svgPath: CIRCUIT_SVG_PATHS.monza,
  },
  {
    round: 17,
    grandPrix: 'Singapore Grand Prix',
    country: 'Singapore',
    city: 'Marina Bay',
    circuitName: 'Marina Bay Street Circuit',
    circuitId: 'singapore',
    dateRange: '18 – 20 SEP 2026',
    raceDateIso: '2026-09-20T12:00:00Z',
    status: 'COMPLETED',
    winner: 'Lando Norris (#4)',
    winningTeam: 'Woking Papaya Motorsport',
    poleTime: '1:29.525',
    image: GENERATED_IMAGES.pitStop,
    svgPath: CIRCUIT_SVG_PATHS.singapore,
  },
  {
    round: 18,
    grandPrix: 'Japanese Grand Prix',
    country: 'Japan',
    city: 'Suzuka',
    circuitName: 'Suzuka International Racing Course',
    circuitId: 'suzuka',
    dateRange: '02 – 04 OCT 2026',
    raceDateIso: '2026-10-04T05:00:00Z',
    status: 'COMPLETED',
    winner: 'Charles Leclerc (#16)',
    winningTeam: 'Scuderia Maranello',
    poleTime: '1:28.197',
    image: GENERATED_IMAGES.aeroTunnel,
    svgPath: CIRCUIT_SVG_PATHS.suzuka,
  },
  {
    round: 19,
    grandPrix: 'United States Grand Prix',
    country: 'United States',
    city: 'Austin, Texas',
    circuitName: 'Circuit of the Americas',
    circuitId: 'monza',
    dateRange: '16 – 18 OCT 2026',
    raceDateIso: '2026-10-18T19:00:00Z',
    status: 'NEXT RACE',
    image: GENERATED_IMAGES.heroCar,
    svgPath: CIRCUIT_SVG_PATHS.cota,
  },
  {
    round: 20,
    grandPrix: 'Gran Premio de São Paulo',
    country: 'Brazil',
    city: 'São Paulo',
    circuitName: 'Autódromo José Carlos Pace (Interlagos)',
    circuitId: 'spa',
    dateRange: '30 OCT – 01 NOV 2026',
    raceDateIso: '2026-11-01T17:00:00Z',
    status: 'UPCOMING',
    image: GENERATED_IMAGES.driverPortrait,
    svgPath: CIRCUIT_SVG_PATHS.interlagos,
  },
  {
    round: 21,
    grandPrix: 'Las Vegas Grand Prix',
    country: 'United States',
    city: 'Las Vegas, Nevada',
    circuitName: 'Las Vegas Strip Circuit',
    circuitId: 'monaco',
    dateRange: '19 – 21 NOV 2026',
    raceDateIso: '2026-11-22T06:00:00Z',
    status: 'UPCOMING',
    image: GENERATED_IMAGES.circuitMonza,
    svgPath: CIRCUIT_SVG_PATHS.monaco,
  }
];
