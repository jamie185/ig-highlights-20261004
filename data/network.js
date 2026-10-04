/* Jamie Fitness network: the ONE list of gyms and trainers for every landing page (26 Sep 2026).
   Read by: / (homepage), /join-trainer/, /join-gym/, /spring-kickstart/ and spring-kickstart/submit.php.
   Edit here, rebuild jf-home (python build_deploy.py <ver>), then run check_network.py. See Codebase/LANDING-PAGES.md.
   Everything after "window.JF_NETWORK =" must stay strict JSON: submit.php parses it with json_decode.
   Gyms are in Melbourne VIC unless they carry "state" + "city" (Glenmore Park: NSW, Sydney, 28 Sep 2026). Pages say
   "N gyms across Melbourne and Sydney" (the cities, never the suburb or state; Jamie 29 Sep) and maps open on both. A gym can have no
   trainer listed yet: pickers show the gym's city instead. (Ida Pangsair, Glenmore Park, listed 30 Sep 2026 once her portrait arrived.)
   A trainer with "photo": false has no portrait yet: no wall card, the JF mark stands in for their face.
   Kelsey Jones and Altona North removed, Greensborough removed (Julia Sinni stays on the team, no gym listed) 1 Oct 2026 (Jamie).
   George Maravelias, Clyde North, listed 2 Oct 2026 with his portrait; Clyde North takes free-session bookings from then (Mikaela, as in booking-routing.json).
   George also covers Clyde Ramlegh (2 Oct 2026, Jamie); Clyde Ramlegh still takes no free-session bookings (no VA on the routing sheet).
   Trainers are listed NEWEST FIRST by "start" (Xero start date, JF App join date if not in Xero yet), and every trainer wall shows them in
   this order (Jamie, 2 Oct 2026). A new trainer goes at the top; check_network.py fails if the order or a "start" is missing.
   "v": N re-versions a trainer's photo URLs (?v=N) after the image changes: Cloudflare keeps images 30 days. */
window.JF_NETWORK = {
  "gyms": [
    {"name": "Essendon", "lat": -37.7497, "lng": 144.9220, "book": true},
    {"name": "Footscray", "lat": -37.8000, "lng": 144.8993, "book": true},
    {"name": "South Yarra", "lat": -37.8392, "lng": 144.9931, "book": true},
    {"name": "Ashburton", "lat": -37.8620, "lng": 145.0697, "book": true},
    {"name": "Hampton", "lat": -37.9358, "lng": 145.0015, "book": true},
    {"name": "Preston", "lat": -37.7424, "lng": 145.0007, "book": true},
    {"name": "Caulfield South", "lat": -37.8853, "lng": 145.0351, "book": true},
    {"name": "Bentleigh East", "lat": -37.9203, "lng": 145.0532, "book": true},
    {"name": "Chelsea Heights", "lat": -38.0355, "lng": 145.1356, "book": true},
    {"name": "Glenmore Park", "lat": -33.8016, "lng": 150.6816, "book": true, "state": "NSW", "city": "Sydney"},
    {"name": "Kalkallo", "lat": -37.5487, "lng": 144.9543, "book": true},
    {"name": "Botanic Ridge", "lat": -38.1329, "lng": 145.2001, "book": true},
    {"name": "Lynbrook", "lat": -38.0526, "lng": 145.2290, "book": true},
    {"name": "Eltham", "lat": -37.7147, "lng": 145.1414, "book": true},
    {"name": "West Footscray", "lat": -37.8026, "lng": 144.8814, "book": true},
    {"name": "Clyde North", "lat": -38.0769, "lng": 145.3508, "book": true},
    {"name": "Clyde Ramlegh", "lat": -38.1167, "lng": 145.3431, "book": false}
  ],
  "trainers": [
    {"name": "Ida Pangsair", "gyms": ["Glenmore Park"], "v": 4, "start": "2026-09-28"},
    {"name": "George Maravelias", "gyms": ["Clyde North", "Clyde Ramlegh"], "start": "2026-09-15"},
    {"name": "Daniel Baltutis", "gyms": ["Bentleigh East"], "start": "2026-07-27"},
    {"name": "Nabiha Siddiqui", "gyms": ["Chelsea Heights", "Ashburton"], "start": "2026-01-11"},
    {"name": "Emma Alexellis", "gyms": ["Botanic Ridge", "Lynbrook"], "start": "2026-01-11"},
    {"name": "Sophie Etheridge", "gyms": ["Hampton"], "start": "2025-12-01"},
    {"name": "Caitlin Huell", "gyms": ["West Footscray"], "start": "2025-11-23"},
    {"name": "Julia Sinni", "gyms": [], "start": "2025-11-23"},
    {"name": "Ahmad Shatila", "gyms": ["Kalkallo"], "start": "2025-10-20"},
    {"name": "Lincoln Barker", "gyms": ["Eltham"], "start": "2025-10-20"},
    {"name": "Teresa Giorgianni", "gyms": ["Caulfield South"], "start": "2025-10-19"},
    {"name": "Dane Hakopa", "gyms": ["Preston"], "start": "2025-09-22"},
    {"name": "Finn Crowther", "gyms": ["Footscray"], "start": "2025-09-01"},
    {"name": "Samantha Konsol", "gyms": ["Preston"], "start": "2025-05-19"},
    {"name": "Guido Monaci", "gyms": ["South Yarra"], "start": "2024-10-25"},
    {"name": "Marcus Colaianni", "gyms": ["Essendon"], "start": "2023-07-01"}
  ],
  "senior": [
    {"name": "Jamie Montalto", "role": "Founder", "img": "senior-jamie-2x", "slug": "jamie-montalto"},
    {"name": "Gabrielle Ballard", "role": "Area Manager", "img": "senior-gab-2x", "slug": "gabrielle-ballard"}
  ],
  "lead": {"Preston": "Samantha Konsol"}
};
