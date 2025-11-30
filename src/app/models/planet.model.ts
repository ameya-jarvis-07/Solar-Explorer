export interface Planet {
  name: string;
  distance: number; // AU (Astronomical Units)
  size: number; // Relative size
  color: string;
  description: string;
  facts: string[];
  textureUrl: string;
}

export const PLANETS: Planet[] = [
  {
    name: 'SUN',
    distance: 0,
    size: 2.0,
    color: '#FDB813',
    description: 'THE STAR AT THE CENTER OF OUR SOLAR SYSTEM. IT CONTAINS 99.86% OF THE MASS IN THE SOLAR SYSTEM AND PROVIDES THE ENERGY THAT SUSTAINS LIFE ON EARTH',
    textureUrl: '/textures/planets/2k_sun.jpg',
    facts: [
      'Made mostly of hydrogen (73%) and helium (25%)',
      'Temperature at core: 27 million°F (15 million°C)',
      'Powers Earth through nuclear fusion reactions',
      'Contains 99.86% of solar system mass',
      'Origin: Formed 4.6 billion years ago from a collapsing molecular cloud',
      'Age: Middle-aged star, halfway through its 10 billion year lifespan',
      'Distance from Earth: 93 million miles (150 million km)',
      'Light from Sun takes 8 minutes 20 seconds to reach Earth',
      'Rotates on its axis every 25 days at equator'
    ]
  },
  {
    name: 'MERCURY',
    distance: 0.39,
    size: 0.38,
    color: '#8C7853',
    description: 'THE CLOSEST PLANET TO THE SUN. IT CIRCLES THE SUN FASTER THAN ALL THE OTHER PLANETS, WHICH IS WHY ROMANS NAMED IT AFTER THEIR SWIFT-FOOTED MESSENGER GOD',
    textureUrl: '/textures/planets/2k_mercury.jpg',
    facts: [
      'Smallest planet in our solar system (3,032 miles diameter)',
      'Second densest planet after Earth',
      'No atmosphere to speak of',
      'Temperature ranges from -290°F to 800°F',
      'Origin: Formed 4.5 billion years ago from rocky debris',
      'Named after Roman messenger god Mercury',
      'Orbits Sun in just 88 Earth days',
      'One day on Mercury lasts 176 Earth days',
      'Surface covered with craters like our Moon',
      'Has a large iron core making up 85% of radius'
    ]
  },
  {
    name: 'VENUS',
    distance: 0.72,
    size: 0.95,
    color: '#FFC649',
    description: 'THE SECOND PLANET FROM THE SUN AND EARTH\'S CLOSEST PLANETARY NEIGHBOR. NAMED AFTER THE ROMAN GODDESS OF LOVE AND BEAUTY',
    textureUrl: '/textures/planets/2k_venus_surface.jpg',
    facts: [
      'Hottest planet in our solar system (900°F surface)',
      'Thick toxic atmosphere of carbon dioxide traps heat',
      'Spins backwards compared to most planets (retrograde rotation)',
      'A day on Venus (243 Earth days) is longer than its year (225 Earth days)',
      'Origin: Rocky planet formed 4.5 billion years ago',
      'Named after Roman goddess of love and beauty',
      'Brightest natural object in night sky after the Moon',
      'Atmospheric pressure 90 times greater than Earth',
      'Surface hidden beneath thick clouds of sulfuric acid',
      'Similar size and mass to Earth, often called Earth\'s twin'
    ]
  },
  {
    name: 'EARTH',
    distance: 1.0,
    size: 1.0,
    color: '#4A90E2',
    description: 'OUR HOME PLANET. THE ONLY PLACE WE KNOW OF WHERE LIFE EXISTS. EARTH IS THE PERFECT DISTANCE FROM THE SUN FOR LIQUID WATER',
    textureUrl: '/textures/planets/2k_earth_daymap.jpg',
    facts: [
      'Only known planet with liquid water and life',
      'Protected by a magnetic field that shields from solar radiation',
      '71% covered by water, 29% land',
      'Home to over 8.7 million species',
      'Origin: Formed 4.54 billion years ago from cosmic dust',
      'Has one natural satellite: the Moon (formed 4.5 billion years ago)',
      'Atmosphere: 78% nitrogen, 21% oxygen, 1% other gases',
      'Rotates on axis in 23 hours 56 minutes',
      'Orbits Sun at 67,000 mph taking 365.25 days',
      'Only planet not named after a Roman or Greek deity'
    ]
  },
  {
    name: 'MARS',
    distance: 1.52,
    size: 0.53,
    color: '#E27B58',
    description: 'THE RED PLANET. NAMED AFTER THE ROMAN GOD OF WAR. ITS REDDISH COLOR COMES FROM IRON OXIDE (RUST) ON ITS SURFACE',
    textureUrl: '/textures/planets/2k_mars.jpg',
    facts: [
      'Has Olympus Mons, largest volcano in solar system (16 miles high)',
      'Two small moons: Phobos and Deimos (captured asteroids)',
      'Strong evidence of ancient water flows and riverbeds',
      'Primary target for future human exploration',
      'Origin: Rocky planet formed 4.6 billion years ago',
      'Named after Roman god of war due to blood-red appearance',
      'One day lasts 24 hours 37 minutes (similar to Earth)',
      'Thin atmosphere mostly carbon dioxide (95%)',
      'Home to massive dust storms that can engulf entire planet',
      'Has polar ice caps made of water and frozen CO2'
    ]
  },
  {
    name: 'JUPITER',
    distance: 5.20,
    size: 3.5,
    color: '#C88B3A',
    description: 'THE LARGEST PLANET IN OUR SOLAR SYSTEM. A GAS GIANT WITH COLORFUL BANDS OF CLOUDS AND THE FAMOUS GREAT RED SPOT STORM',
    textureUrl: '/textures/planets/2k_jupiter.jpg',
    facts: [
      'Larger than all other planets combined (2.5 times)',
      'Great Red Spot: massive storm raging for 350+ years, twice Earth\'s size',
      'Has 95 known moons including Ganymede, largest moon in solar system',
      'Acts as cosmic vacuum cleaner, protecting inner planets from asteroids',
      'Origin: Gas giant formed 4.5 billion years ago',
      'Named after king of Roman gods',
      'Fastest spinning planet: one day is only 10 hours',
      'Made mostly of hydrogen and helium, no solid surface',
      'Has faint ring system discovered in 1979',
      'Strongest magnetic field of any planet (20,000 times Earth\'s)'
    ]
  },
  {
    name: 'SATURN',
    distance: 9.54,
    size: 3.0,
    color: '#FAD5A5',
    description: 'THE RINGED PLANET. FAMOUS FOR ITS SPECTACULAR RING SYSTEM MADE OF BILLIONS OF ICE PARTICLES AND ROCK DEBRIS',
    textureUrl: '/textures/planets/2k_saturn.jpg',
    facts: [
      'Most spectacular ring system visible from Earth',
      'Second largest planet (9 Earths could fit across)',
      'Has 146 known moons, including Titan with thick atmosphere',
      'Low density: could float in water if large enough ocean existed',
      'Origin: Gas giant formed 4.5 billion years ago',
      'Named after Roman god of agriculture and wealth',
      'Rings are only 30 feet thick but 175,000 miles wide',
      'Day lasts only 10.7 hours despite its size',
      'Wind speeds can reach 1,100 mph at equator',
      'Has hexagon-shaped storm at north pole'
    ]
  },
  {
    name: 'URANUS',
    distance: 19.19,
    size: 1.5,
    color: '#4FD0E7',
    description: 'THE ICE GIANT. THIS PLANET ROTATES ON ITS SIDE, MAKING IT UNIQUE IN OUR SOLAR SYSTEM. COLDEST PLANETARY ATMOSPHERE',
    textureUrl: '/textures/planets/2k_uranus.jpg',
    facts: [
      'Rotates on its side with 98° axial tilt',
      'Has 13 known rings made of dark particles',
      '27 known moons, all named after Shakespeare and Pope characters',
      'Coldest planetary atmosphere (-371°F / -224°C)',
      'Origin: Ice giant formed 4.5 billion years ago',
      'Named after Greek god of the sky (only Greek name)',
      'Blue-green color from methane in atmosphere',
      'Takes 84 Earth years to orbit the Sun',
      'One day lasts 17 hours 14 minutes',
      'First planet discovered by telescope (1781 by William Herschel)'
    ]
  },
  {
    name: 'NEPTUNE',
    distance: 30.07,
    size: 1.5,
    color: '#4166F5',
    description: 'THE FARTHEST PLANET FROM THE SUN. THIS DARK, COLD WORLD HAS THE STRONGEST WINDS IN THE SOLAR SYSTEM',
    textureUrl: '/textures/planets/2k_neptune.jpg',
    facts: [
      'Strongest winds in solar system (1,200 mph / 2,000 km/h)',
      'Deep blue color from methane in atmosphere',
      'Takes 165 Earth years to complete one orbit',
      '14 known moons including Triton (only large moon with retrograde orbit)',
      'Origin: Ice giant formed 4.5 billion years ago',
      'Named after Roman god of the sea',
      'Discovered in 1846 through mathematical predictions',
      'One day lasts 16 hours',
      'Has 6 known rings made of dark material',
      'Temperature: -353°F (-214°C), but internal heat creates powerful storms'
    ]
  },
  {
    name: 'PLUTO',
    distance: 39.48,
    size: 0.8,
    color: '#ECE5DC',
    description: 'A DWARF PLANET IN THE KUIPER BELT. ONCE CONSIDERED THE NINTH PLANET, RECLASSIFIED IN 2006',
    textureUrl: '/textures/planets/2k_ceres_fictional.jpg',
    facts: [
      'Smaller than Earth\'s moon (1,473 miles diameter)',
      'Heart-shaped Tombaugh Regio glacier of frozen nitrogen',
      'Thin atmosphere of nitrogen, methane, carbon monoxide that freezes when far from Sun',
      '5 known moons: Charon (half Pluto\'s size), Styx, Nix, Kerberos, Hydra',
      'Origin: Formed 4.5 billion years ago in Kuiper Belt',
      'Named after Roman god of the underworld',
      'Discovered in 1930 by Clyde Tombaugh',
      'Reclassified as dwarf planet in 2006',
      'Takes 248 Earth years to orbit Sun',
      'Visited by NASA\'s New Horizons spacecraft in 2015'
    ]
  }
];
