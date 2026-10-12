import type { EncyclopediaPlant } from '../types/encyclopedia';

export const PLANT_ENCYCLOPEDIA: EncyclopediaPlant[] = [
  // 1. Golden Pothos
  {
    id: 'golden-pothos',
    common_name: 'Golden Pothos',
    scientific_name: 'Epipremnum aureum',
    alternative_names: "Devil's Ivy, Money Plant, Ceylon Creeper",
    alternative_names_list: ["Devil's Ivy", 'Money Plant', 'Ceylon Creeper'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines', 'Tropical Plants'],
    short_description: 'A hardy, trailing vine with heart-shaped emerald green leaves marbled in creamy yellow or gold.',
    full_description: 'Golden Pothos is one of the most resilient and popular indoor houseplants globally. Known for its trailing vines and forgiving nature, it thrives in a wide range of lighting conditions and purifies indoor air effectively.',
    image_url: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: 'Vines up to 2–3 m indoors',
    native_region: 'French Polynesia (Moorea)',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Contains insoluble calcium oxalates. Mild to moderate oral irritation if chewed by cats or dogs.',
    light: {
      summary: 'Medium to bright indirect light; tolerates low light',
      level_icon_type: 'bright_indirect',
      details: 'Thrives in bright filtered light. Avoid prolonged direct harsh sun which scorches leaf variegation.'
    },
    watering: {
      summary: 'Once every 1–2 weeks',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top 50% of soil to dry out between waterings. Leaves will slightly droop when thirsty.',
      warning: 'Do not let roots sit in soggy standing water; overwatering leads to root rot and yellow leaves.'
    },
    temperature: {
      summary: '18°C to 29°C',
      range_celsius: '18–29°C',
      details: 'Prefers consistent household temperatures. Protect from cold draft below 15°C.'
    },
    humidity: {
      summary: '40% to 65%',
      details: 'Tolerates average home humidity easily; thrives with elevated 50%+ levels.'
    },
    soil: {
      summary: 'Well-draining indoor potting mix',
      drainage: 'High drainage pot required',
      details: '60% quality potting soil, 20% perlite, 20% peat moss or coco coir.'
    },
    fertilizer: {
      summary: 'Balanced liquid fertilizer once a month in spring & summer',
      feeding_season: 'Spring and Summer',
      details: 'Dilute balanced 10-10-10 or 20-20-20 liquid houseplant feed to half-strength.'
    },
    repotting: {
      summary: 'Every 2–3 years or when rootbound',
      details: 'Repot into a container 2–5 cm wider with drainage holes when roots coil out the bottom.'
    },
    guides: {
      watering_guide: 'Water thoroughly until water runs through drainage holes, then discard excess runoff in the saucer. Allow the top 2 inches of soil to dry out before irrigating again. In winter months, decrease watering frequency.',
      light_placement: 'Position near an east or north-facing window, or set back 2–3 meters from a south-facing window with sheer curtains. Lower light will decrease golden variegation.',
      soil_repotting: 'Use light, aerated potting soil with perlite. Repot in early spring when plant becomes visibly rootbound. Gently loosen root ball and refresh surrounding substrate.',
      fertilizing_nutrition: 'Feed monthly during active spring/summer vegetative growth. Cease feeding in late autumn and winter during dormancy.',
      propagation: 'Extremely easy stem cuttings in water or moist sphagnum. Cut just below a root node with 2-3 leaves, immerse node in clean water, and roots develop within 10-14 days.',
      pruning_maintenance: 'Trim long, leggy vines just above a leaf node to promote bushier lateral growth. Wipe foliage with a moist microfiber cloth monthly to clear dust.',
      pests_diseases: 'Generally pest-resistant. Occasionally susceptible to mealybugs and spider mites in dry winter air. Treat promptly with organic neem oil or insecticidal soap.',
      problems_solutions: 'Yellow leaves indicate overwatering or root rot. Brown crispy tips signify low atmospheric humidity or fluoride in tap water. Drooping leaves signal hydration deficit.',
      seasonal_care: 'Reduce water by approximately 30-40% during winter months. Keep away from air conditioning vents and winter radiator drafts.',
      pet_toxicity: 'Keep out of reach of inquisitive pets. Ingestion can cause oral irritation, excessive drooling, and mild vomiting.'
    }
  },

  // 2. Marble Queen Pothos
  {
    id: 'marble-queen-pothos',
    common_name: 'Marble Queen Pothos',
    scientific_name: "Epipremnum aureum 'Marble Queen'",
    alternative_names: 'Variegated Pothos, White Devil\'s Ivy',
    alternative_names_list: ['Variegated Pothos', "White Devil's Ivy"],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines'],
    short_description: 'Dramatic trailing foliage heavily speckled with stark white and rich green variegation.',
    full_description: 'Marble Queen Pothos features dense white and green marbling. Because it contains less chlorophyll in its white sectors, it grows slightly slower than Golden Pothos and appreciates brighter indirect light.',
    image_url: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Moderate',
    max_size: 'Trailing vines 1.5–2 m',
    native_region: 'Cultivar of Epipremnum aureum',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets due to calcium oxalate crystals. Keep on elevated shelves or hanging baskets.',
    light: {
      summary: 'Bright indirect sunlight',
      level_icon_type: 'bright_indirect',
      details: 'Needs more light than standard green pothos to maintain bright white leaf marbling.'
    },
    watering: {
      summary: 'Every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow upper half of potting soil to dry out before watering thoroughly.',
      warning: 'Overwatering readily causes leaf browning in the delicate white areas.'
    },
    temperature: {
      summary: '18°C to 27°C',
      range_celsius: '18–27°C',
      details: 'Keep in warm, stable interior environments. Sensitive to sudden temperature drops.'
    },
    humidity: {
      summary: '50% to 70%',
      details: 'Appreciates moderate to high humidity; prevents dry browning on white patches.'
    },
    soil: {
      summary: 'Porous potting mix rich in perlite and bark',
      drainage: 'Rapid drainage',
      details: '50% peat/coir, 30% perlite, 20% orchid bark chips.'
    },
    fertilizer: {
      summary: 'Half-strength balanced houseplant food monthly',
      feeding_season: 'April through September',
      details: 'Apply gentle organic liquid fertilizer every 4 weeks in warm seasons.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Check root progression annually. Use terracotta or breathable plastic with drainage.'
    },
    guides: {
      watering_guide: 'Soak root ball fully and drain excess. Water less frequently during cooler winter months.',
      light_placement: 'Needs medium to bright filtered light. Direct sun will bleach foliage, while deep shade will cause white areas to revert back to green.',
      soil_repotting: 'Provide airy chunky mix to deliver oxygen to root crowns. Repot when roots emerge from drainage holes.',
      fertilizing_nutrition: 'Avoid over-fertilizing with heavy nitrogen, which can reduce variegation patterns.',
      propagation: 'Take 4-node stem cuttings and root in clean room-temperature water or moist perlite.',
      pruning_maintenance: 'Prune dead stems or non-variegated reversions to maintain crisp marble patterning.',
      pests_diseases: 'Watch for mealybugs around petiole joints. Wash foliage under tepid sink spray periodically.',
      problems_solutions: 'Brown patches on white parts usually indicate overwatering or direct sunburn. Pale growth indicates light deficiency.',
      seasonal_care: 'Move closer to window in darker winter periods to maintain photosynthetic energy.',
      pet_toxicity: 'Keep hanging out of reach of domestic animals.'
    }
  },

  // 3. Neon Pothos
  {
    id: 'neon-pothos',
    common_name: 'Neon Pothos',
    scientific_name: "Epipremnum aureum 'Neon'",
    alternative_names: 'Chartreuse Pothos, Lime Pothos',
    alternative_names_list: ['Chartreuse Pothos', 'Lime Pothos'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines'],
    short_description: 'Eye-catching heart-shaped foliage in an electrifying neon chartreuse-lime hue.',
    full_description: 'Neon Pothos lights up any space with luminous yellow-green leaves. Its vibrant foliage creates stunning contrast when paired with dark-leaved tropicals.',
    image_url: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: 'Trailing vines 1–2 m',
    native_region: 'Cultivar of Epipremnum aureum',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to cats and dogs if ingested.',
    light: {
      summary: 'Bright indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Bright light keeps the foliage glowing neon. Low light causes color to darken into standard green.'
    },
    watering: {
      summary: 'Every 7–12 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Wait until the top inch or two of potting substrate is completely dry to touch.',
      warning: 'Avoid waterlogged substrate.'
    },
    temperature: {
      summary: '18°C to 28°C',
      range_celsius: '18–28°C',
      details: 'Comfortable in normal living spaces.'
    },
    humidity: {
      summary: '45% to 65%',
      details: 'Thrives in normal home conditions, loves occasional bathroom humidity.'
    },
    soil: {
      summary: 'Standard porous houseplant mix',
      drainage: 'Good drainage',
      details: 'Blend of peat moss, perlite, and pine bark.'
    },
    fertilizer: {
      summary: 'Every 4–6 weeks in spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Mild houseplant food diluted by 50%.'
    },
    repotting: {
      summary: 'Every 2 years',
      details: 'Increase container diameter by 2 inches when rootbound.'
    },
    guides: {
      watering_guide: 'Water thoroughly and allow all excess water to drain out freely.',
      light_placement: 'Set 1–2 meters from a bright window. Protect from scorching midday direct rays.',
      soil_repotting: 'Standard well-aerated potting mix with plenty of perlite.',
      fertilizing_nutrition: 'Feed during active growing months to maintain vibrant foliage.',
      propagation: 'Root single-node cuttings easily in water.',
      pruning_maintenance: 'Pinch tip ends to encourage bushy lateral branching.',
      pests_diseases: 'Inspect stems for scale and fungus gnats.',
      problems_solutions: 'Darkening leaves mean the plant needs more indirect sunlight.',
      seasonal_care: 'Protect from frosty window panes in winter.',
      pet_toxicity: 'Keep away from cats and dogs.'
    }
  },

  // 4. N'Joy Pothos
  {
    id: 'njoy-pothos',
    common_name: "N'Joy Pothos",
    scientific_name: "Epipremnum aureum 'N'Joy'",
    alternative_names: 'Pothos NJoy, Glacier Pothos (similar)',
    alternative_names_list: ['Pothos NJoy', 'Glacier Pothos'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines'],
    short_description: 'Compact, smaller leaves with crisp, high-contrast cream and emerald color blocks.',
    full_description: "N'Joy is a distinctive, compact Pothos cultivar selected in Mumbai. Its small, slightly cupped leaves feature defined patches of solid white/cream and rich green, making it ideal for desks and bookshelves.",
    image_url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Slow to Moderate',
    max_size: 'Trailing vines 1 m',
    native_region: 'Cultivar originated in India',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets if chewed.',
    light: {
      summary: 'Bright filtered indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Requires ample indirect light to preserve vivid solid cream color margins.'
    },
    watering: {
      summary: 'Every 8–12 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Check top 2 inches of soil; water only when dry.',
      warning: 'Sensitive to over-irrigation.'
    },
    temperature: {
      summary: '18°C to 26°C',
      range_celsius: '18–26°C',
      details: 'Keep warm; avoid sudden temperature fluctuations.'
    },
    humidity: {
      summary: '50% to 70%',
      details: 'Moderate humidity prevents curling edges on variegated patches.'
    },
    soil: {
      summary: 'Chunky, airy aroid mix',
      drainage: 'Excellent drainage',
      details: 'Soil, pumice, coco coir, orchid bark.'
    },
    fertilizer: {
      summary: 'Gentle organic feed every 6 weeks in summer',
      feeding_season: 'Summer',
      details: 'Quarter-strength liquid fertilizer.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Grows slowly, rarely requires frequent repotting.'
    },
    guides: {
      watering_guide: 'Let soil partially dry between drinks. Never allow water to pool in outer cachepots.',
      light_placement: 'Bright indirect filtered light near east or west exposure.',
      soil_repotting: 'Chunky aerated medium with coarse perlite and bark.',
      fertilizing_nutrition: 'Light feeding during active spring and summer months.',
      propagation: 'Root stem segments with aerial roots in moist perlite.',
      pruning_maintenance: 'Trim any reverted solid green shoots to preserve variegation.',
      pests_diseases: 'Occasional spider mites in dry winter rooms.',
      problems_solutions: 'Brown leaf patches usually signal overwatering or cold drafts.',
      seasonal_care: 'Reduce water volume by half during winter months.',
      pet_toxicity: 'Keep elevated out of reach of household pets.'
    }
  },

  // 5. Monstera Deliciosa
  {
    id: 'monstera-deliciosa',
    common_name: 'Monstera Deliciosa',
    scientific_name: 'Monstera deliciosa',
    alternative_names: 'Swiss Cheese Plant, Split-Leaf Philodendron, Fruit Salad Plant',
    alternative_names_list: ['Swiss Cheese Plant', 'Split-Leaf Philodendron', 'Fruit Salad Plant'],
    category: 'Tropical Plants',
    category_tags: ['Tropical Plants', 'Indoor Plants', 'Climbers & Vines'],
    short_description: 'Iconic architectural tropical plant with broad, glossy leaves that develop magnificent split fenestrations.',
    full_description: 'Monstera Deliciosa is a showstopping statement houseplant. Native to the rainforests of Central America, it naturally climbs trees using vigorous aerial roots, producing massive fenestrated foliage.',
    image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: '2–3 m tall indoors with support',
    native_region: 'Southern Mexico to Panama',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to cats and dogs due to insoluble calcium oxalate crystals.',
    light: {
      summary: 'Bright, indirect sunlight',
      level_icon_type: 'bright_indirect',
      details: 'Bright filtered sunlight produces largest leaves and deepest split fenestrations. Tolerates mild morning sun.'
    },
    watering: {
      summary: 'Once every 1–2 weeks',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top 50–70% of potting medium to dry out before giving a deep, thorough watering.',
      warning: 'Yellowing lower leaves often indicate persistent overwatering.'
    },
    temperature: {
      summary: '18°C to 30°C',
      range_celsius: '18–30°C',
      details: 'Loves warm tropical conditions. Never expose to temperatures below 12°C.'
    },
    humidity: {
      summary: '55% to 80%',
      details: 'Higher humidity speeds leaf maturation and larger aerial root production.'
    },
    soil: {
      summary: 'Rich, chunky aroid mix with bark & perlite',
      drainage: 'High drainage required',
      details: '40% potting soil, 30% orchid bark, 20% perlite, 10% worm castings.'
    },
    fertilizer: {
      summary: 'Balanced houseplant fertilizer monthly in spring/summer',
      feeding_season: 'March to September',
      details: 'Use 20-20-20 balanced water-soluble feed diluted to half strength.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Provide a sturdy moss pole or cedar plank for climbing support when repotting.'
    },
    guides: {
      watering_guide: 'Soak root system thoroughly until water flows from drainage openings. Discard drainage tray water after 20 minutes.',
      light_placement: 'Position near bright south or west-facing windows filtered through sheer blinds.',
      soil_repotting: 'Use a chunky, well-draining aroid mix. Anchor moss pole securely into bottom of pot before setting root ball.',
      fertilizing_nutrition: 'Feed during active vegetative growth; flush pot with clean water every 3 months to clear mineral salts.',
      propagation: 'Take a stem cutting with at least one node and aerial root; roots reliably in water, moss, or soil.',
      pruning_maintenance: 'Tuck aerial roots into pot soil to nourish foliage. Wipe large leaf blades with damp cloth to optimize light capture.',
      pests_diseases: 'Monitor for thrips, spider mites, and scale insects under leaf surfaces.',
      problems_solutions: 'Solid leaves without splits indicate lack of light or juvenile age. Black spots indicate root rot from overwatering.',
      seasonal_care: 'Growth slows in winter; reduce watering cadence and pull back from drafty doorways.',
      pet_toxicity: 'Keep out of reach of pets. Plant sap may irritate pet skin and oral membranes.'
    }
  },

  // 6. Monstera Adansonii
  {
    id: 'monstera-adansonii',
    common_name: 'Monstera Adansonii',
    scientific_name: 'Monstera adansonii',
    alternative_names: 'Monkey Mask, Swiss Cheese Vine',
    alternative_names_list: ['Monkey Mask', 'Swiss Cheese Vine'],
    category: 'Tropical Plants',
    category_tags: ['Tropical Plants', 'Climbers & Vines', 'Indoor Plants'],
    short_description: 'Vigorous climbing or trailing vine with intricate oval windows (fenestrations) inside every leaf.',
    full_description: 'Monstera Adansonii features leaves perforated with natural oval holes throughout its blade. It can be styled cascading from hanging planters or trained up a totem for significantly larger leaves.',
    image_url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: '1.5–2 m vines',
    native_region: 'Central and South America',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets if ingested.',
    light: {
      summary: 'Bright indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Loves ample bright indirect light to support fast leaf production with maximum holes.'
    },
    watering: {
      summary: 'Every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top 2 inches of soil to dry before watering.',
      warning: 'Delicate leaves curl and crisp if kept bone dry or excessively soggy.'
    },
    temperature: {
      summary: '18°C to 27°C',
      range_celsius: '18–27°C',
      details: 'Prefers warm conditions; protect from chilly winter drafts.'
    },
    humidity: {
      summary: '60% to 85%',
      details: 'High humidity is key to preventing leaf edges from crisping.'
    },
    soil: {
      summary: 'Aerated, moisture-retentive aroid soil',
      drainage: 'High drainage',
      details: 'Peat, perlite, coco chunks, compost.'
    },
    fertilizer: {
      summary: 'Diluted balanced liquid fertilizer bi-weekly in summer',
      feeding_season: 'Spring and Summer',
      details: 'Half-strength nitrogen-rich houseplant fertilizer.'
    },
    repotting: {
      summary: 'Annually or every 2 years',
      details: 'Best repotted in early spring into a slightly roomier container.'
    },
    guides: {
      watering_guide: 'Water evenly when top third of soil dries out. Ensure water drains away freely.',
      light_placement: 'Bright indirect light. Direct sunlight burns the delicate leaf tissue.',
      soil_repotting: 'Chunky aroid soil blend with orchid bark and perlite.',
      fertilizing_nutrition: 'Feed regularly during warm spring and summer months.',
      propagation: 'Root node cuttings very easily in water within 2 weeks.',
      pruning_maintenance: 'Prune trailing tips to stimulate dense bushier growth at the crown.',
      pests_diseases: 'Inspect regularly for spider mites and thrips.',
      problems_solutions: 'Yellowing leaves usually indicate overwatering or sudden cold exposure.',
      seasonal_care: 'Increase humidity with a humidifier during winter heating periods.',
      pet_toxicity: 'Toxic to cats and dogs.'
    }
  },

  // 7. Snake Plant
  {
    id: 'snake-plant',
    common_name: 'Snake Plant',
    scientific_name: 'Dracaena trifasciata',
    alternative_names: "Mother-in-Law's Tongue, Sansevieria, Saint George's Sword",
    alternative_names_list: ["Mother-in-Law's Tongue", 'Sansevieria', "Saint George's Sword"],
    category: 'Succulents & Cacti',
    category_tags: ['Succulents & Cacti', 'Indoor Plants'],
    short_description: 'Indestructible architectural upright succulent with stiff, sword-like banded green leaves edged in gold.',
    full_description: 'The Snake Plant is famed for its extreme durability and air-purifying qualities. It tolerates weeks of neglect, low light, and drought, converting CO2 into oxygen even throughout the night.',
    image_url: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Slow',
    max_size: '60–120 cm tall',
    native_region: 'Tropical West Africa (Nigeria to the Congo)',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Contains saponins; toxic if ingested by dogs and cats.',
    light: {
      summary: 'Tolerates low light to full indirect sun',
      level_icon_type: 'direct',
      details: 'Thrives in bright filtered or morning sun; also survives remarkably well in low-light corners and offices.'
    },
    watering: {
      summary: 'Once every 2–4 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Allow potting soil to dry out 100% completely between waterings. In winter, water once a month or less.',
      warning: 'Overwatering is the single leading cause of death. When in doubt, do not water.'
    },
    temperature: {
      summary: '15°C to 32°C',
      range_celsius: '15–32°C',
      details: 'Very tolerant of heat. Keep above 10°C in winter.'
    },
    humidity: {
      summary: '30% to 50%',
      details: 'Thrives in dry indoor air; no extra humidity required.'
    },
    soil: {
      summary: 'Cactus & succulent mix with pumice',
      drainage: 'Exceptional drainage required',
      details: '50% coarse sand/pumice/perlite, 50% succulent potting soil.'
    },
    fertilizer: {
      summary: 'Succulent fertilizer twice a year in spring/summer',
      feeding_season: 'Spring and Summer only',
      details: 'Dilute balanced cactus food to half strength; never over-fertilize.'
    },
    repotting: {
      summary: 'Every 3–4 years',
      details: 'Likes being rootbound. Repot when rhizomes threaten to crack the pot.'
    },
    guides: {
      watering_guide: 'Water at soil level and avoid getting water inside the center rosette crown. Drench soil and empty saucer completely.',
      light_placement: 'Any location from low-light bedrooms to sunny windowsills.',
      soil_repotting: 'Always choose terracotta pots with large drainage holes and sandy grit soil.',
      fertilizing_nutrition: 'Feed very sparingly. Once in spring and once in mid-summer is plenty.',
      propagation: 'Division of underground rhizomes is quickest. Leaf cuttings root in water or perlite.',
      pruning_maintenance: 'Remove damaged or bent leaves by slicing cleanly at the base.',
      pests_diseases: 'Very rarely troubled by pests. Root rot from overwatering is the primary danger.',
      problems_solutions: 'Mushy, foul-smelling leaf bases signify root rot. Wrinkled leaves indicate extreme thirst.',
      seasonal_care: 'Water only once every 4–6 weeks during cold winter months.',
      pet_toxicity: 'Keep away from pets prone to chewing indoor plants.'
    }
  },

  // 8. ZZ Plant
  {
    id: 'zz-plant',
    common_name: 'ZZ Plant',
    scientific_name: 'Zamioculcas zamiifolia',
    alternative_names: 'Zanzibar Gem, Zuzu Plant, Eternity Plant',
    alternative_names_list: ['Zanzibar Gem', 'Zuzu Plant', 'Eternity Plant'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Succulents & Cacti'],
    short_description: 'Glossy, feather-like waxy foliage rising from tuberous underground rhizomes that store weeks of moisture.',
    full_description: 'ZZ Plant is nearly indestructible. Its bulbous rhizomes store water efficiently, allowing it to withstand prolonged drought, low light, and irregular care with effortless grace.',
    image_url: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Slow',
    max_size: '60–90 cm tall',
    native_region: 'Eastern Africa (Kenya to South Africa)',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets; contains calcium oxalate crystals.',
    light: {
      summary: 'Low to bright indirect light',
      level_icon_type: 'low',
      details: 'Handles dark corners and fluorescent office lighting with ease. Avoid direct midday sun.'
    },
    watering: {
      summary: 'Once every 3–4 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Let soil dry completely throughout the entire container before watering.',
      warning: 'Too much water rots the tuberous rhizomes rapidly.'
    },
    temperature: {
      summary: '16°C to 28°C',
      range_celsius: '16–28°C',
      details: 'Ideal in typical home climates. Protect from cold below 12°C.'
    },
    humidity: {
      summary: '40% to 50%',
      details: 'Normal household humidity is perfect.'
    },
    soil: {
      summary: 'Well-draining potting soil with pumice or perlite',
      drainage: 'Excellent drainage',
      details: 'Well-aerated houseplant mix with 30% perlite.'
    },
    fertilizer: {
      summary: 'Balanced houseplant feed every 2 months in spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Dilute balanced fertilizer to half strength.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Repot when thick potato-like rhizomes deform the nursery container.'
    },
    guides: {
      watering_guide: 'Water sparingly. When watering, soak thoroughly and let drain completely.',
      light_placement: 'Tolerates low light spaces, hallway tables, and bright indirect windows.',
      soil_repotting: 'Use a container with drainage. Add extra perlite to prevent root moisture stagnation.',
      fertilizing_nutrition: 'Apply half-strength liquid food 2-3 times per growing season.',
      propagation: 'Divide rhizomes during spring repotting, or root individual leaflets in soil (takes months).',
      pruning_maintenance: 'Wipe glossy leaflets with a dry or damp cloth to maintain natural shine.',
      pests_diseases: 'Pest free in most indoor environments.',
      problems_solutions: 'Yellowing stems usually mean too much water. Dropping leaflets indicate extended drought.',
      seasonal_care: 'In winter, water once every 4 to 6 weeks only.',
      pet_toxicity: 'Wash hands after handling sap if sensitive. Toxic to pets.'
    }
  },

  // 9. Peace Lily
  {
    id: 'peace-lily',
    common_name: 'Peace Lily',
    scientific_name: 'Spathiphyllum wallisii',
    alternative_names: 'White Sails, Spath Lily',
    alternative_names_list: ['White Sails', 'Spath Lily'],
    category: 'Flowering Plants',
    category_tags: ['Flowering Plants', 'Indoor Plants', 'Tropical Plants'],
    short_description: 'Glossy dark green foliage crowned by elegant white spathe blooms that communicate thirst dramatically.',
    full_description: 'The Peace Lily is celebrated for its lush tropical leaves and pure white floral spathes. It acts as a clear communicator, gently drooping its leaves when thirsty and perking up within hours of hydration.',
    image_url: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Moderate',
    max_size: '45–75 cm tall',
    native_region: 'Tropical Americas and Southeastern Asia',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to cats and dogs (calcium oxalates).',
    light: {
      summary: 'Low to medium indirect light',
      level_icon_type: 'medium',
      details: 'Prefers shaded to medium filtered light. Direct sun will bleach and scorch foliage.'
    },
    watering: {
      summary: 'Once every week',
      water_drops: 3,
      frequency_label: 'High',
      details: 'Keep soil lightly moist. Water immediately when leaves begin to show slight droop.',
      warning: 'Sensitive to chlorine and fluoride in hard tap water; use filtered water.'
    },
    temperature: {
      summary: '18°C to 27°C',
      range_celsius: '18–27°C',
      details: 'Keep warm; keep away from air conditioning vents.'
    },
    humidity: {
      summary: '55% to 75%',
      details: 'Appreciates elevated humidity to prevent brown leaf tips.'
    },
    soil: {
      summary: 'Moisture-retentive, rich organic potting mix',
      drainage: 'Good drainage with moisture retention',
      details: 'Peat moss, perlite, and rich potting soil.'
    },
    fertilizer: {
      summary: 'Organic flowering houseplant fertilizer every 6 weeks',
      feeding_season: 'Spring and Summer',
      details: 'Apply quarter-strength liquid food to stimulate blooms.'
    },
    repotting: {
      summary: 'Every 1–2 years in spring',
      details: 'Divide crowded clumps into multiple pots during repotting.'
    },
    guides: {
      watering_guide: 'Water thoroughly as soon as the top inch of soil dries. Discard excess water.',
      light_placement: 'Position in gentle north or filtered east exposure. Low light reduces bloom frequency.',
      soil_repotting: 'Rich, aerated potting mix that retains gentle moisture without waterlogging.',
      fertilizing_nutrition: 'Feed sparingly; over-fertilizing causes brown leaf margins.',
      propagation: 'Root division during spring repotting is easiest and fast.',
      pruning_maintenance: 'Snip spent blooms at the base of their stalk to encourage fresh flowers.',
      pests_diseases: 'Occasionally prone to mealybugs and spider mites.',
      problems_solutions: 'Brown leaf tips stem from tap water minerals or dry air. Drooping foliage rebounds quickly after watering.',
      seasonal_care: 'Provide gentle warmth and avoid cold drafts in winter.',
      pet_toxicity: 'Keep elevated away from pets.'
    }
  },

  // 10. Spider Plant
  {
    id: 'spider-plant',
    common_name: 'Spider Plant',
    scientific_name: 'Chlorophytum comosum',
    alternative_names: 'Airplane Plant, Ribbon Plant, Hen and Chickens',
    alternative_names_list: ['Airplane Plant', 'Ribbon Plant', 'Hen and Chickens'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Flowering Plants'],
    short_description: 'Arching ribbons of green and creamy white foliage that send out baby spiderette offshoots on long stems.',
    full_description: 'Spider Plant is one of the most beloved and non-toxic indoor plants. Resilient and rapid-growing, it produces arching rosettes of variegated leaves and playful baby plantlets that are fun to propagate.',
    image_url: 'https://images.unsplash.com/photo-1572688484437-36e65a50785c?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: '30–60 cm spread',
    native_region: 'Southern and Tropical Africa',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: 'Non-toxic and 100% pet-safe for cats and dogs (ASPCA certified).',
    light: {
      summary: 'Bright, indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Thrives in bright filtered sun. Tolerates moderate shade, though variegation diminishes.'
    },
    watering: {
      summary: 'Once every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow the top 2 inches of soil to dry out between waterings.',
      warning: 'Sensitive to fluoride in tap water which causes brown leaf tips.'
    },
    temperature: {
      summary: '15°C to 24°C',
      range_celsius: '15–24°C',
      details: 'Enjoys moderate household temperatures.'
    },
    humidity: {
      summary: '40% to 60%',
      details: 'Comfortable in normal living spaces.'
    },
    soil: {
      summary: 'Standard all-purpose potting soil with perlite',
      drainage: 'Good drainage',
      details: 'Well-draining potting soil with added coarse perlite.'
    },
    fertilizer: {
      summary: 'Balanced houseplant food once a month in spring & summer',
      feeding_season: 'Spring and Summer',
      details: 'Feed monthly at half strength.'
    },
    repotting: {
      summary: 'Every 1–2 years',
      details: 'Large fleshy tuberous roots grow quickly; repot when roots push above soil.'
    },
    guides: {
      watering_guide: 'Water evenly with rain, distilled, or filtered water to prevent tip browning.',
      light_placement: 'Hang near east or west windows with gentle filtered sunlight.',
      soil_repotting: 'Repot in spring when fleshy roots fill the container.',
      fertilizing_nutrition: 'Moderate feeding supports vigorous growth and abundant spiderettes.',
      propagation: 'Snip baby plantlets and place them in water or directly in moist soil.',
      pruning_maintenance: 'Trim dry brown leaf tips with clean sharp shears.',
      pests_diseases: 'Susceptible to aphids and whiteflies if kept too dry.',
      problems_solutions: 'Brown tips are usually caused by fluoridated water or low humidity.',
      seasonal_care: 'Reduce watering slightly in winter months.',
      pet_toxicity: 'Completely pet-safe and safe around curious cats and dogs.'
    }
  },

  // 11. Heartleaf Philodendron
  {
    id: 'heartleaf-philodendron',
    common_name: 'Heartleaf Philodendron',
    scientific_name: 'Philodendron hederaceum',
    alternative_names: 'Sweetheart Plant, Heart-Leaf Vine',
    alternative_names_list: ['Sweetheart Plant', 'Heart-Leaf Vine'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines', 'Tropical Plants'],
    short_description: 'Charming cascading vines lined with deep emerald, glossy heart-shaped leaves.',
    full_description: 'Heartleaf Philodendron is a classic indoor trailing vine with gentle heart-shaped foliage. Incredibly forgiving, it handles varying light and watering schedules while maintaining graceful growth.',
    image_url: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: 'Trailing vines 1.5–2.5 m',
    native_region: 'Central America and the Caribbean',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Contains calcium oxalates; toxic if chewed by pets.',
    light: {
      summary: 'Low to bright indirect light',
      level_icon_type: 'medium',
      details: 'Grows best in moderate to bright indirect light, but tolerates low-light spaces gracefully.'
    },
    watering: {
      summary: 'Once every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top half of soil to dry out before giving another drink.',
      warning: 'Avoid soggy, poorly draining soil.'
    },
    temperature: {
      summary: '18°C to 27°C',
      range_celsius: '18–27°C',
      details: 'Standard room temperatures suit it well.'
    },
    humidity: {
      summary: '40% to 65%',
      details: 'Average household humidity is sufficient.'
    },
    soil: {
      summary: 'Lightweight potting soil with peat and perlite',
      drainage: 'Good drainage',
      details: 'Peat, perlite, and potting soil.'
    },
    fertilizer: {
      summary: 'Half-strength balanced food monthly during spring/summer',
      feeding_season: 'Spring to Summer',
      details: 'Apply balanced liquid feed.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Repot when rootbound in spring.'
    },
    guides: {
      watering_guide: 'Water thoroughly and allow container to drain completely.',
      light_placement: 'Ideal for bookshelves, mantels, and hanging planters.',
      soil_repotting: 'Standard well-draining indoor potting mix.',
      fertilizing_nutrition: 'Apply monthly fertilizer during warm months.',
      propagation: 'Extremely easy to root node cuttings in water.',
      pruning_maintenance: 'Pinch tips to keep foliage full and compact.',
      pests_diseases: 'Occasionally attracts mealybugs and fungus gnats.',
      problems_solutions: 'Yellow leaves signify overwatering; drooping leaves signal thirst.',
      seasonal_care: 'Reduce water during winter dormancy.',
      pet_toxicity: 'Keep hanging out of reach of pets.'
    }
  },

  // 12. Philodendron Brasil
  {
    id: 'philodendron-brasil',
    common_name: 'Philodendron Brasil',
    scientific_name: "Philodendron hederaceum 'Brasil'",
    alternative_names: 'Brasil Vine, Variegated Heartleaf',
    alternative_names_list: ['Brasil Vine', 'Variegated Heartleaf'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines'],
    short_description: 'Heart-shaped leaves painted with a dynamic center stripe of lime green and golden yellow.',
    full_description: "Philodendron Brasil features striking variegated brushstrokes down the middle of each heart-shaped leaf, resembling the Brazilian national flag. It brings bright tropical energy to hanging planters and trellises.",
    image_url: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: 'Vines 1.5–2 m',
    native_region: 'Cultivar originating from Brazil',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to cats and dogs.',
    light: {
      summary: 'Bright indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Bright filtered light keeps the vivid yellow-lime center variegation sharp.'
    },
    watering: {
      summary: 'Every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Water when top 50% of potting mix feels dry.',
      warning: 'Do not leave in standing water.'
    },
    temperature: {
      summary: '18°C to 28°C',
      range_celsius: '18–28°C',
      details: 'Warm interior conditions.'
    },
    humidity: {
      summary: '50% to 70%',
      details: 'Moderate to high humidity.'
    },
    soil: {
      summary: 'Airy aroid potting blend with perlite',
      drainage: 'High drainage',
      details: 'Standard mix with added perlite and bark.'
    },
    fertilizer: {
      summary: 'Balanced houseplant fertilizer monthly in summer',
      feeding_season: 'Spring and Summer',
      details: 'Half-strength balanced formula.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Repot into one size larger container.'
    },
    guides: {
      watering_guide: 'Drench soil thoroughly and drain excess completely.',
      light_placement: 'Position near bright indirect light to preserve lime stripes.',
      soil_repotting: 'Well-draining chunky aroid mix.',
      fertilizing_nutrition: 'Feed monthly during the warm growing season.',
      propagation: 'Root stem cuttings in water with at least 1 node.',
      pruning_maintenance: 'Prune long vines to shape and stimulate denser branching.',
      pests_diseases: 'Watch for mealybugs in leaf axils.',
      problems_solutions: 'Solid green leaves indicate inadequate light.',
      seasonal_care: 'Protect from chilly winter window drafts.',
      pet_toxicity: 'Toxic to pets.'
    }
  },

  // 13. Rubber Plant
  {
    id: 'rubber-plant',
    common_name: 'Rubber Plant',
    scientific_name: 'Ficus elastica',
    alternative_names: 'Rubber Fig, Rubber Tree, Indian Rubber Bush',
    alternative_names_list: ['Rubber Fig', 'Rubber Tree', 'Indian Rubber Bush'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Tropical Plants'],
    short_description: 'Bold, glossy leathery foliage in rich burgundy or deep forest green on an upright woody stem.',
    full_description: 'Ficus elastica is a majestic, sculptural indoor tree with thick, waxy, oval leaves that emerge from vivid crimson sheaths. With proper care, it makes an imposing focal statement in any living room or office.',
    image_url: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Moderate',
    max_size: '1.5–3 m indoors',
    native_region: 'Eastern South Asia and Southeast Asia',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Milky sap contains ficin; causes skin and oral irritation in pets.',
    light: {
      summary: 'Bright indirect light with gentle morning sun',
      level_icon_type: 'direct',
      details: 'Needs plenty of bright indirect light to maintain deep rich leaf color and compact growth.'
    },
    watering: {
      summary: 'Once every 1–2 weeks',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top half of soil to dry out before watering thoroughly.',
      warning: 'Overwatering causes lower leaves to drop and turn yellow.'
    },
    temperature: {
      summary: '18°C to 29°C',
      range_celsius: '18–29°C',
      details: 'Warm household conditions. Never expose to temperatures below 12°C.'
    },
    humidity: {
      summary: '45% to 65%',
      details: 'Enjoys moderate humidity.'
    },
    soil: {
      summary: 'Rich, well-aerated potting mix with perlite and bark',
      drainage: 'High drainage required',
      details: 'Good potting soil, perlite, and pine bark.'
    },
    fertilizer: {
      summary: 'Balanced houseplant fertilizer once a month in spring & summer',
      feeding_season: 'Spring and Summer',
      details: 'Dilute balanced liquid feed to half strength.'
    },
    repotting: {
      summary: 'Every 2–3 years in spring',
      details: 'Repot into a heavy ceramic container to balance the plant\'s weight.'
    },
    guides: {
      watering_guide: 'Water deeply until water exits drainage holes. Empty drip tray after 15 minutes.',
      light_placement: 'Place near large south or east-facing windows with sheer curtains.',
      soil_repotting: 'Repot in early spring. Sturdy potting soil with good drainage.',
      fertilizing_nutrition: 'Feed during active growing season to support large leaf formation.',
      propagation: 'Air layering or stem cuttings in moist perlite with rooting hormone.',
      pruning_maintenance: 'Wipe broad leaves with a damp cloth monthly to eliminate dust. Notch main stem to induce branching.',
      pests_diseases: 'Susceptible to scale insects, mealybugs, and spider mites.',
      problems_solutions: 'Dropping leaves usually indicate sudden temperature shifts, overwatering, or light changes.',
      seasonal_care: 'Reduce water during winter months and keep away from heaters.',
      pet_toxicity: 'Keep away from pets; milky latex sap can cause gastrointestinal upset.'
    }
  },

  // 14. Fiddle Leaf Fig
  {
    id: 'fiddle-leaf-fig',
    common_name: 'Fiddle Leaf Fig',
    scientific_name: 'Ficus lyrata',
    alternative_names: 'Banjo Fig, Lyre-Leaved Fig',
    alternative_names_list: ['Banjo Fig', 'Lyre-Leaved Fig'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Tropical Plants'],
    short_description: 'Dramatic violin-shaped leaves with prominent veining rising on an upright, architectural trunk.',
    full_description: 'The Fiddle Leaf Fig is the quintessential designer houseplant. Known for its sculptural violin-shaped foliage and imposing presence, it rewards consistent light and careful watering with stunning vertical growth.',
    image_url: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Moderate',
    max_size: '2–3 m tall indoors',
    native_region: 'Western Africa (Cameroon to Sierra Leone)',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets; contains irritating milky latex sap.',
    light: {
      summary: 'Very bright indirect light with several hours of gentle sun',
      level_icon_type: 'direct',
      details: 'Requires consistent, abundant filtered light to thrive without dropping foliage.'
    },
    watering: {
      summary: 'Once every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top 2 inches of soil to dry before giving a thorough soaking.',
      warning: 'Inconsistent watering causes brown leaf spots and rapid leaf dropping.'
    },
    temperature: {
      summary: '18°C to 26°C',
      range_celsius: '18–26°C',
      details: 'Requires stable temperatures. Absolutely hates cold drafts and sudden moves.'
    },
    humidity: {
      summary: '55% to 75%',
      details: 'Enjoys elevated humidity; mist or use a humidifier.'
    },
    soil: {
      summary: 'Fast-draining, rich peat-based potting soil',
      drainage: 'Exceptional drainage',
      details: 'Potting soil with perlite, bark, and compost.'
    },
    fertilizer: {
      summary: 'High-nitrogen fertilizer monthly during spring & summer',
      feeding_season: 'Spring and Summer',
      details: 'Use specialized Ficus liquid fertilizer diluted to half strength.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Ensure drainage holes are clear; top-dress with fresh compost in intervening years.'
    },
    guides: {
      watering_guide: 'Water evenly until water drains through. Never let the pot sit in water.',
      light_placement: 'Position near large east or south-facing window. Rotate pot 90 degrees weekly for even growth.',
      soil_repotting: 'Repot into a container 2–4 inches larger with premium draining soil.',
      fertilizing_nutrition: 'Feed monthly in spring and summer with 3-1-2 ratio fertilizer.',
      propagation: 'Stem cuttings or air-layering in spring.',
      pruning_maintenance: 'Pinch top growth bud to encourage branching. Dust large leaves with a damp cloth.',
      pests_diseases: 'Spider mites and scale can infest underside of leaves.',
      problems_solutions: 'Brown spots on leaves are caused by overwatering or bacterial leaf spot.',
      seasonal_care: 'Protect from dry radiator heat and cold drafts during winter.',
      pet_toxicity: 'Toxic to cats and dogs.'
    }
  },

  // 15. Aloe Vera
  {
    id: 'aloe-vera',
    common_name: 'Aloe Vera',
    scientific_name: 'Aloe barbadensis',
    alternative_names: 'Medicinal Aloe, Burn Plant, Miracle Plant',
    alternative_names_list: ['Medicinal Aloe', 'Burn Plant', 'Miracle Plant'],
    category: 'Succulents & Cacti',
    category_tags: ['Succulents & Cacti', 'Herbs', 'Indoor Plants'],
    short_description: 'Plump succulent spears packed with soothing therapeutic gel that thrive on neglect and sunshine.',
    full_description: 'Aloe Vera is both an attractive succulent and a renowned home medicinal remedy. Its fleshy serrated green leaves contain soothing gel used for minor burns and skin hydration.',
    image_url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Moderate',
    max_size: '40–60 cm tall and wide',
    native_region: 'Arabian Peninsula',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets if chewed (contains saponins and anthraquinones).',
    light: {
      summary: 'Bright direct sunlight',
      level_icon_type: 'direct',
      details: 'Needs at least 4–6 hours of direct or very bright sunlight daily.'
    },
    watering: {
      summary: 'Once every 2–3 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Allow soil to dry out completely between waterings. In winter, water every 4–5 weeks.',
      warning: 'Excessive water causes succulent leaves to turn soft, brown, and rot.'
    },
    temperature: {
      summary: '15°C to 28°C',
      range_celsius: '15–28°C',
      details: 'Tolerates heat well; protect from freezing temperatures.'
    },
    humidity: {
      summary: '30% to 45%',
      details: 'Prefers dry arid air; avoid humid terrariums.'
    },
    soil: {
      summary: 'Sandy, porous cactus and succulent mix',
      drainage: 'Superb drainage required',
      details: '60% coarse sand, pumice, and perlite, 40% potting soil.'
    },
    fertilizer: {
      summary: 'Cactus fertilizer once in spring',
      feeding_season: 'Spring only',
      details: 'Light feeding once per year.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Repot into a wide, heavy terracotta pot that will not tip over.'
    },
    guides: {
      watering_guide: 'Drench soil completely and ensure drainage holes release all water.',
      light_placement: 'South or west-facing windowsill with direct sun.',
      soil_repotting: 'Terracotta pot with succulent mix.',
      fertilizing_nutrition: 'Feed very lightly once in spring.',
      propagation: 'Separate and replant offset "pups" that sprout around mother plant.',
      pruning_maintenance: 'Harvest outer mature leaves by cutting at base with a clean knife.',
      pests_diseases: 'Susceptible to root rot if soil remains damp.',
      problems_solutions: 'Brown mushy leaves indicate overwatering. Thin, curled leaves mean extreme dehydration.',
      seasonal_care: 'Hardly any water needed during cool winter months.',
      pet_toxicity: 'Keep away from cats and dogs.'
    }
  },

  // 16. Jade Plant
  {
    id: 'jade-plant',
    common_name: 'Jade Plant',
    scientific_name: 'Crassula ovata',
    alternative_names: 'Money Tree, Lucky Plant, Friendship Tree',
    alternative_names_list: ['Money Tree', 'Lucky Plant', 'Friendship Tree'],
    category: 'Succulents & Cacti',
    category_tags: ['Succulents & Cacti', 'Indoor Plants'],
    short_description: 'Tree-like succulent with thick woody stems and plump, jade-green teardrop leaves often tinged in red.',
    full_description: 'Jade Plant is a legendary symbol of prosperity and endurance in Asian cultures. It grows into a magnificent miniature indoor bonsai tree over decades with minimal water requirements.',
    image_url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Slow',
    max_size: '60–120 cm tall',
    native_region: 'South Africa and Mozambique',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to dogs and cats.',
    light: {
      summary: 'Full sun to bright indirect light',
      level_icon_type: 'direct',
      details: 'At least 4–6 hours of direct sun daily keeps leaves compact and stems sturdy.'
    },
    watering: {
      summary: 'Every 2–3 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Water thoroughly only when soil is completely dry throughout.',
      warning: 'Overwatering causes stem rot and leaf drop.'
    },
    temperature: {
      summary: '18°C to 24°C',
      range_celsius: '18–24°C',
      details: 'Normal household warmth.'
    },
    humidity: {
      summary: '30% to 50%',
      details: 'Low to moderate humidity.'
    },
    soil: {
      summary: 'Gritty, fast-draining succulent soil',
      drainage: 'Superb drainage',
      details: 'Pumice, perlite, coarse sand, and potting soil.'
    },
    fertilizer: {
      summary: 'Succulent fertilizer every 2 months in spring/summer',
      feeding_season: 'Spring to Summer',
      details: 'Half-strength balanced cactus food.'
    },
    repotting: {
      summary: 'Every 3–4 years',
      details: 'Use heavy terracotta pots to counterbalance top-heavy branching.'
    },
    guides: {
      watering_guide: 'Allow soil to dry completely before soaking thoroughly.',
      light_placement: 'Sunny windowsills facing south or west.',
      soil_repotting: 'Fast-draining gritty mix.',
      fertilizing_nutrition: 'Feed during active summer growth only.',
      propagation: 'Root stem or leaf cuttings easily in dry succulent soil.',
      pruning_maintenance: 'Prune branches to encourage thick, tree-like trunk formation.',
      pests_diseases: 'Watch for mealybugs hidden in stem joints.',
      problems_solutions: 'Wrinkled leaves indicate underwatering; squishy leaves mean root rot.',
      seasonal_care: 'Minimal water during winter.',
      pet_toxicity: 'Keep away from pets.'
    }
  },

  // 17. String of Pearls
  {
    id: 'string-of-pearls',
    common_name: 'String of Pearls',
    scientific_name: 'Senecio rowleyanus',
    alternative_names: 'String of Beads, Rosary Vine',
    alternative_names_list: ['String of Beads', 'Rosary Vine'],
    category: 'Succulents & Cacti',
    category_tags: ['Succulents & Cacti', 'Climbers & Vines', 'Indoor Plants'],
    short_description: 'Delicate cascading strands lined with spherical green pearl beads that store moisture.',
    full_description: 'String of Pearls is an extraordinary succulent whose leaves have evolved into tiny green spherical beads with narrow translucent "windows" that allow light inside while minimizing water loss.',
    image_url: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Fast',
    max_size: 'Cascading strands up to 1 m',
    native_region: 'Southwest Africa',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets; causes mild gastrointestinal irritation.',
    light: {
      summary: 'Bright indirect light with gentle morning sun',
      level_icon_type: 'bright_indirect',
      details: 'Needs direct sunlight on the crown to prevent thinning at the top.'
    },
    watering: {
      summary: 'Every 2 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Water from the bottom when pearls begin to pucker or flatten slightly.',
      warning: 'Avoid watering overhead directly onto the pearl crowns.'
    },
    temperature: {
      summary: '18°C to 24°C',
      range_celsius: '18–24°C',
      details: 'Warm in spring/summer; cooler in winter (10–15°C).'
    },
    humidity: {
      summary: '30% to 50%',
      details: 'Low to average humidity.'
    },
    soil: {
      summary: 'Extremely well-draining cactus and gritty pumice mix',
      drainage: 'Maximum drainage',
      details: '50% pumice/perlite, 50% cactus soil.'
    },
    fertilizer: {
      summary: 'Half-strength succulent fertilizer every 6 weeks in summer',
      feeding_season: 'Spring and Summer',
      details: 'Light feeding during active growth.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Be very gentle when repotting; strands break easily.'
    },
    guides: {
      watering_guide: 'Bottom water in a saucer of water for 20 minutes, then drain.',
      light_placement: 'Hang high where top of pot receives bright sunlight.',
      soil_repotting: 'Gritty cactus soil with extra pumice in shallow terracotta.',
      fertilizing_nutrition: 'Very light feeding in summer.',
      propagation: 'Lay a strand on moist succulent soil; roots develop along the nodes.',
      pruning_maintenance: 'Trim trailing ends to propagate or encourage fuller crown.',
      pests_diseases: 'Aphids and root rot.',
      problems_solutions: 'Mushy pearls mean overwatering. Flattened pearls mean it needs water.',
      seasonal_care: 'Keep cool and dry in winter to encourage spring blooms.',
      pet_toxicity: 'Toxic to cats and dogs.'
    }
  },

  // 18. Echeveria
  {
    id: 'echeveria',
    common_name: 'Echeveria',
    scientific_name: 'Echeveria elegans',
    alternative_names: 'Mexican Snowball, Hen and Chicks',
    alternative_names_list: ['Mexican Snowball', 'Hen and Chicks'],
    category: 'Succulents & Cacti',
    category_tags: ['Succulents & Cacti', 'Outdoor Plants', 'Indoor Plants'],
    short_description: 'Symmetrical, jewel-like rosettes in pastel powdery hues of seafoam blue, lilac, and soft green.',
    full_description: 'Echeveria elegans forms tight, gorgeous rosettes of fleshy spoon-shaped leaves coated in a delicate powdery wax called farina. Native to the semi-deserts of Mexico, it produces arching coral flower spikes in spring.',
    image_url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Slow',
    max_size: '10–20 cm diameter',
    native_region: 'Mexico',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: 'Non-toxic and completely pet-safe for cats and dogs.',
    light: {
      summary: 'Full direct sunlight',
      level_icon_type: 'direct',
      details: 'Requires 6+ hours of direct sunlight to prevent stretching (etiolation).'
    },
    watering: {
      summary: 'Every 2–3 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Soak and dry method; water only when soil is completely dry.',
      warning: 'Never let water sit inside the center rosette.'
    },
    temperature: {
      summary: '15°C to 28°C',
      range_celsius: '15–28°C',
      details: 'Prefers warm dry conditions. Protect from frost.'
    },
    humidity: {
      summary: '20% to 40%',
      details: 'Very low humidity.'
    },
    soil: {
      summary: 'Gritty succulent potting mix',
      drainage: 'Superb drainage',
      details: 'Equal parts potting soil, coarse grit, and perlite.'
    },
    fertilizer: {
      summary: 'Cactus fertilizer twice during spring',
      feeding_season: 'Spring',
      details: 'Half-strength diluted cactus feed.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Repot into shallow, porous terracotta.'
    },
    guides: {
      watering_guide: 'Soak root ball and allow to dry out completely before next watering.',
      light_placement: 'Sunniest south-facing windowsill available.',
      soil_repotting: 'Gritty succulent mix with plenty of pumice.',
      fertilizing_nutrition: 'Light feeding in early spring.',
      propagation: 'Leaf cuttings or pup division.',
      pruning_maintenance: 'Remove shriveled lower leaves at the base.',
      pests_diseases: 'Mealybugs and aphids.',
      problems_solutions: 'Tall, stretched stems indicate severe lack of direct sunlight.',
      seasonal_care: 'Water very sparingly during winter.',
      pet_toxicity: '100% pet-safe.'
    }
  },

  // 19. Chinese Evergreen
  {
    id: 'chinese-evergreen',
    common_name: 'Chinese Evergreen',
    scientific_name: 'Aglaonema commutatum',
    alternative_names: 'Aglaonema, Silver Queen, Philippine Evergreen',
    alternative_names_list: ['Aglaonema', 'Silver Queen', 'Philippine Evergreen'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Tropical Plants'],
    short_description: 'Lush, spear-shaped leaves splashed with silver, cream, and vibrant pink variegation patterns.',
    full_description: 'Aglaonema is universally regarded as one of the best low-light indoor plants. Its stunningly patterned leaves bring color and vitality to darker rooms where other houseplants struggle.',
    image_url: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Slow to Moderate',
    max_size: '45–90 cm tall',
    native_region: 'Subtropical and tropical regions of Asia',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets due to calcium oxalate crystals.',
    light: {
      summary: 'Low to medium indirect light',
      level_icon_type: 'medium',
      details: 'Dark green varieties thrive in low light; pink and silver varieties prefer medium filtered light.'
    },
    watering: {
      summary: 'Every 1–2 weeks',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Water when top 50% of soil has dried out.',
      warning: 'Do not overwater; roots prefer slight dryness over excess wetness.'
    },
    temperature: {
      summary: '18°C to 26°C',
      range_celsius: '18–26°C',
      details: 'Keep warm; sensitive to cold drafts below 15°C.'
    },
    humidity: {
      summary: '50% to 70%',
      details: 'Enjoys moderate humidity.'
    },
    soil: {
      summary: 'Peat-based potting soil with perlite',
      drainage: 'Good drainage',
      details: 'Well-draining potting soil with perlite.'
    },
    fertilizer: {
      summary: 'Balanced liquid fertilizer every 6 weeks in spring/summer',
      feeding_season: 'Spring to Summer',
      details: 'Dilute balanced food to half strength.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Slow growing; rarely outgrows pots quickly.'
    },
    guides: {
      watering_guide: 'Check soil moisture before watering. Let excess drain away.',
      light_placement: 'Great for bedrooms, interior offices, and shaded living areas.',
      soil_repotting: 'Lightweight potting soil with good drainage.',
      fertilizing_nutrition: 'Feed during spring and summer months.',
      propagation: 'Root division or stem cuttings in spring.',
      pruning_maintenance: 'Wipe leaves with a damp cloth to remove dust.',
      pests_diseases: 'Resistant to most pests; occasional mealybugs.',
      problems_solutions: 'Yellow leaves indicate overwatering or sudden cold exposure.',
      seasonal_care: 'Keep in warm interior room in winter.',
      pet_toxicity: 'Toxic to cats and dogs.'
    }
  },

  // 20. Areca Palm
  {
    id: 'areca-palm',
    common_name: 'Areca Palm',
    scientific_name: 'Dypsis lutescens',
    alternative_names: 'Butterfly Palm, Golden Cane Palm, Yellow Palm',
    alternative_names_list: ['Butterfly Palm', 'Golden Cane Palm', 'Yellow Palm'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Tropical Plants'],
    short_description: 'Graceful, feathery tropical fronds arching outward from bamboo-like golden cane stems.',
    full_description: 'Areca Palm brings lush tropical vacation vibes into living spaces. Featuring gentle arching fronds and upright clumping canes, it acts as a natural air humidifier and purifies indoor toxins safely.',
    image_url: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Moderate',
    max_size: '1.5–2.5 m indoors',
    native_region: 'Madagascar',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: 'Completely pet-safe and non-toxic to cats and dogs (ASPCA certified).',
    light: {
      summary: 'Bright filtered sunlight',
      level_icon_type: 'bright_indirect',
      details: 'Needs abundant bright indirect light. Avoid harsh direct midday rays.'
    },
    watering: {
      summary: 'Once every 5–7 days',
      water_drops: 3,
      frequency_label: 'High',
      details: 'Keep soil evenly moist but never saturated.',
      warning: 'Sensitive to fluoridated and chlorinated tap water.'
    },
    temperature: {
      summary: '18°C to 25°C',
      range_celsius: '18–25°C',
      details: 'Warm room temperatures. Keep away from chilly drafts.'
    },
    humidity: {
      summary: '55% to 75%',
      details: 'High humidity is necessary to prevent brown frond tips.'
    },
    soil: {
      summary: 'Rich, aerated peat-based potting soil with sand',
      drainage: 'Good drainage',
      details: 'Peat moss, sand, and perlite.'
    },
    fertilizer: {
      summary: 'Palm fertilizer with micronutrients every month in spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Specialized palm food containing potassium and magnesium.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Repot only when tightly rootbound; palms dislike root disturbance.'
    },
    guides: {
      watering_guide: 'Water with distilled or rainwater to avoid mineral burn on frond tips.',
      light_placement: 'Position near large filtered windows.',
      soil_repotting: 'Provide heavy pot to prevent toppling.',
      fertilizing_nutrition: 'Feed during spring and summer with palm fertilizer.',
      propagation: 'Root clump division or seeds.',
      pruning_maintenance: 'Trim dry brown fronds at the base.',
      pests_diseases: 'Spider mites and scale can target dry palm fronds.',
      problems_solutions: 'Brown tips signify dry air or fluoride in tap water.',
      seasonal_care: 'Mist regularly and maintain warmth in winter.',
      pet_toxicity: '100% pet-safe for cats and dogs.'
    }
  },

  // 21. Boston Fern
  {
    id: 'boston-fern',
    common_name: 'Boston Fern',
    scientific_name: 'Nephrolepis exaltata',
    alternative_names: 'Sword Fern, Wild Boston Fern',
    alternative_names_list: ['Sword Fern', 'Wild Boston Fern'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Tropical Plants'],
    short_description: 'Lush fountain of arching, ruffled emerald-green fronds with a timeless, romantic aesthetic.',
    full_description: 'Boston Fern is an iconic Victorian houseplant with billowing feathery fronds. It thrives in high-humidity rooms like bathrooms and bright kitchens, serving as an exceptional pet-safe air purifier.',
    image_url: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Moderate',
    max_size: '60–90 cm spread',
    native_region: 'Tropical regions of the Americas and West Indies',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: 'Non-toxic and completely pet-safe for cats and dogs.',
    light: {
      summary: 'Bright indirect to gentle dappled light',
      level_icon_type: 'bright_indirect',
      details: 'Needs filtered sunlight. Direct harsh sun crisps delicate fronds.'
    },
    watering: {
      summary: 'Twice a week',
      water_drops: 4,
      frequency_label: 'High',
      details: 'Keep soil consistently damp, never allowing it to dry out completely.',
      warning: 'Drying out causes severe frond shedding.'
    },
    temperature: {
      summary: '16°C to 24°C',
      range_celsius: '16–24°C',
      details: 'Prefers cool to moderate household temperatures.'
    },
    humidity: {
      summary: '65% to 85%',
      details: 'Requires high humidity; ideal for bathrooms.'
    },
    soil: {
      summary: 'Moisture-retentive, peat-rich potting soil with perlite',
      drainage: 'Good drainage with moisture retention',
      details: 'Peat moss, coco coir, and perlite.'
    },
    fertilizer: {
      summary: 'Half-strength balanced food monthly during spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Gentle houseplant food diluted by 50%.'
    },
    repotting: {
      summary: 'Every 1–2 years in spring',
      details: 'Divide clumps when the fern fills its pot completely.'
    },
    guides: {
      watering_guide: 'Water thoroughly from above or below, ensuring soil remains damp to the touch.',
      light_placement: 'Bathrooms with windows, or hung near bright filtered light.',
      soil_repotting: 'Peaty moisture-retentive potting mix.',
      fertilizing_nutrition: 'Feed during active growing months.',
      propagation: 'Division of root clumps or runners.',
      pruning_maintenance: 'Trim off brown or dry fronds near the base.',
      pests_diseases: 'Spider mites and fungus gnats.',
      problems_solutions: 'Crispy fronds and shedding indicate low humidity or dry soil.',
      seasonal_care: 'Mist frequently and keep away from heating vents in winter.',
      pet_toxicity: '100% pet-safe.'
    }
  },

  // 22. Bird of Paradise
  {
    id: 'bird-of-paradise',
    common_name: 'Bird of Paradise',
    scientific_name: 'Strelitzia reginae',
    alternative_names: 'Crane Flower, Strelitzia',
    alternative_names_list: ['Crane Flower', 'Strelitzia'],
    category: 'Tropical Plants',
    category_tags: ['Tropical Plants', 'Flowering Plants', 'Indoor Plants'],
    short_description: 'Majestic paddle-shaped tropical leaves resembling banana foliage, with exotic orange and blue crane blossoms.',
    full_description: 'The Bird of Paradise is the ultimate regal statement tropical plant. Its broad banana-like leaves fan out from upright stems, capturing sunlight and transforming modern living rooms into tropical oases.',
    image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Moderate',
    max_size: '1.5–2 m tall indoors',
    native_region: 'South Africa',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Mildly toxic to cats and dogs (causes mild gastrointestinal upset).',
    light: {
      summary: 'Full sun to very bright indirect light',
      level_icon_type: 'direct',
      details: 'Needs at least 4–6 hours of direct sun daily to maintain upright foliage and produce blooms.'
    },
    watering: {
      summary: 'Once every week in summer, every 2 weeks in winter',
      water_drops: 3,
      frequency_label: 'Moderate to High',
      details: 'Allow top 2–3 inches of soil to dry out between deep waterings.',
      warning: 'Avoid letting the root ball sit in waterlogged soil.'
    },
    temperature: {
      summary: '18°C to 30°C',
      range_celsius: '18–30°C',
      details: 'Warm temperatures. Protect from cold below 10°C.'
    },
    humidity: {
      summary: '60% to 80%',
      details: 'Loves high humidity to prevent natural leaf splitting from drying out.'
    },
    soil: {
      summary: 'Rich, well-draining loamy potting mix',
      drainage: 'Good drainage',
      details: 'Rich potting soil, perlite, and compost.'
    },
    fertilizer: {
      summary: 'High-potassium organic fertilizer every 2 weeks in spring/summer',
      feeding_season: 'Spring to Summer',
      details: 'Heavy feeder during active growth season.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Likes being somewhat rootbound to promote flowering.'
    },
    guides: {
      watering_guide: 'Water thoroughly during spring and summer; reduce frequency in autumn and winter.',
      light_placement: 'Sunniest window in the home (south or west facing).',
      soil_repotting: 'Rich loamy potting soil in a heavy, sturdy planter.',
      fertilizing_nutrition: 'Feed regularly during active growing season.',
      propagation: 'Division of mature crowns during spring repotting.',
      pruning_maintenance: 'Trim aged lower leaves at the base. Natural splits in leaves are normal evolutionary wind adaptations.',
      pests_diseases: 'Scale insects and spider mites.',
      problems_solutions: 'Curling leaves mean too dry or too hot. Brown leaf edges indicate low humidity.',
      seasonal_care: 'Give maximum sunlight during winter months.',
      pet_toxicity: 'Keep away from pets.'
    }
  },

  // 23. Anthurium
  {
    id: 'anthurium',
    common_name: 'Anthurium',
    scientific_name: 'Anthurium andraeanum',
    alternative_names: 'Flamingo Flower, Tailflower, Painter\'s Palette',
    alternative_names_list: ['Flamingo Flower', 'Tailflower', "Painter's Palette"],
    category: 'Flowering Plants',
    category_tags: ['Flowering Plants', 'Tropical Plants', 'Indoor Plants'],
    short_description: 'Glossy heart-shaped leaves paired with waxy, lacquered red, pink, or white heart spathes that bloom year-round.',
    full_description: 'Anthurium is famed as one of the longest-blooming indoor houseplants on earth. Each waxy heart-shaped "flower" is actually a modified leaf called a spathe that surrounds the central flower spike.',
    image_url: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Slow to Moderate',
    max_size: '40–60 cm tall',
    native_region: 'Colombia and Ecuador',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets due to calcium oxalate crystals.',
    light: {
      summary: 'Bright indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Bright filtered light is essential for continuous blooming. Avoid direct burning sun.'
    },
    watering: {
      summary: 'Once every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top 50% of potting mix to dry out before watering.',
      warning: 'Susceptible to root rot if sitting in soggy soil.'
    },
    temperature: {
      summary: '18°C to 28°C',
      range_celsius: '18–28°C',
      details: 'Enjoys warm tropical temperatures.'
    },
    humidity: {
      summary: '60% to 80%',
      details: 'High humidity keeps spathes glossy and vibrant.'
    },
    soil: {
      summary: 'Chunky, coarse epiphytic orchid/aroid mix',
      drainage: 'Exceptional drainage',
      details: 'Orchid bark, perlite, charcoal, and peat moss.'
    },
    fertilizer: {
      summary: 'High-phosphorus fertilizer every 6 weeks in spring/summer',
      feeding_season: 'Spring to Autumn',
      details: 'Use bloom-booster fertilizer diluted to quarter strength.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Repot into a slightly larger container with fresh chunky orchid mix.'
    },
    guides: {
      watering_guide: 'Water thoroughly and allow water to drain out completely.',
      light_placement: 'Position near bright east or west windows.',
      soil_repotting: 'Chunky epiphytic mix allowing air to reach roots.',
      fertilizing_nutrition: 'Feed with high-phosphorus food to sustain constant blooms.',
      propagation: 'Division of mature clumps during repotting.',
      pruning_maintenance: 'Remove faded flower spathes and yellowing foliage at the base.',
      pests_diseases: 'Mealybugs and thrips.',
      problems_solutions: 'Lack of flowers indicates inadequate light. Yellow leaves mean overwatering.',
      seasonal_care: 'Maintain high humidity with a pebble tray or humidifier in winter.',
      pet_toxicity: 'Toxic to cats and dogs.'
    }
  },

  // 24. Calathea Orbifolia
  {
    id: 'calathea-orbifolia',
    common_name: 'Calathea Orbifolia',
    scientific_name: 'Goeppertia orbifolia',
    alternative_names: 'Round-Leaved Calathea, Prayer Plant',
    alternative_names_list: ['Round-Leaved Calathea', 'Prayer Plant'],
    category: 'Tropical Plants',
    category_tags: ['Tropical Plants', 'Indoor Plants'],
    short_description: 'Extraordinary oversized circular leaves painted with metallic silver-green stripes that fold up at night.',
    full_description: 'Calathea Orbifolia is celebrated for its huge, circular leaves patterned with delicate silver brushstrokes. As part of the prayer plant family, its leaves gracefully rise and fold each evening.',
    image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate to Advanced',
    growth_rate: 'Moderate',
    max_size: '60–90 cm tall and wide',
    native_region: 'Bolivia',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: '100% pet-safe and non-toxic to cats and dogs (ASPCA certified).',
    light: {
      summary: 'Medium to bright indirect light',
      level_icon_type: 'medium',
      details: 'Shaded to medium filtered light. Direct sun bleaches the silver metallic leaf patterns.'
    },
    watering: {
      summary: 'Once a week',
      water_drops: 3,
      frequency_label: 'Moderate to High',
      details: 'Keep soil evenly moist but never waterlogged.',
      warning: 'Extremely sensitive to tap water chemicals; use distilled, reverse-osmosis, or rainwater.'
    },
    temperature: {
      summary: '18°C to 24°C',
      range_celsius: '18–24°C',
      details: 'Prefers stable warm temperatures. Dislikes drafts.'
    },
    humidity: {
      summary: '60% to 80%',
      details: 'High humidity is crucial to prevent brown crispy leaf margins.'
    },
    soil: {
      summary: 'Light, porous, moisture-retentive peat/perlite blend',
      drainage: 'Good drainage with moisture retention',
      details: '50% peat/coir, 30% perlite, 20% bark.'
    },
    fertilizer: {
      summary: 'Half-strength balanced food monthly in spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Gentle organic fertilizer at quarter to half strength.'
    },
    repotting: {
      summary: 'Every 2 years in spring',
      details: 'Handle fragile roots with care.'
    },
    guides: {
      watering_guide: 'Water when the top 1 inch of soil feels dry. Never let it dry out completely.',
      light_placement: 'Medium filtered light away from harsh direct sun.',
      soil_repotting: 'Moisture-retentive, aerated potting soil.',
      fertilizing_nutrition: 'Feed sparingly to prevent mineral burn.',
      propagation: 'Gentle division of root clumps during spring repotting.',
      pruning_maintenance: 'Snip off older discolored leaves at the base.',
      pests_diseases: 'Spider mites thrive if humidity drops.',
      problems_solutions: 'Curling leaves mean too dry or cold. Brown edges indicate tap water minerals or dry air.',
      seasonal_care: 'Run a humidifier nearby in winter months.',
      pet_toxicity: '100% pet-safe.'
    }
  },

  // 25. Syngonium
  {
    id: 'syngonium',
    common_name: 'Syngonium',
    scientific_name: 'Syngonium podophyllum',
    alternative_names: 'Arrowhead Plant, Arrowhead Vine, Goosefoot',
    alternative_names_list: ['Arrowhead Plant', 'Arrowhead Vine', 'Goosefoot'],
    category: 'Indoor Plants',
    category_tags: ['Indoor Plants', 'Climbers & Vines', 'Tropical Plants'],
    short_description: 'Graceful arrow-shaped foliage in shades of soft green, cream, and blush pink that matures into trailing vines.',
    full_description: 'Syngonium is an adaptable, easy-care aroid with distinctive arrowhead leaves. As it matures, it transitions from a bushy clump to a graceful climbing vine that can be trained up moss poles or allowed to cascade.',
    image_url: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: 'Bushy 30–60 cm, or climbing vines 1.5 m',
    native_region: 'Mexico to Tropical South America',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets (contains calcium oxalate crystals).',
    light: {
      summary: 'Medium to bright indirect light',
      level_icon_type: 'bright_indirect',
      details: 'Tolerates low light, but bright indirect light promotes vibrant pink and variegated colors.'
    },
    watering: {
      summary: 'Once every 7–10 days',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top half of soil to dry out between waterings.',
      warning: 'Avoid letting the plant stand in stagnant water.'
    },
    temperature: {
      summary: '18°C to 27°C',
      range_celsius: '18–27°C',
      details: 'Thrives in standard household temperatures.'
    },
    humidity: {
      summary: '50% to 70%',
      details: 'Appreciates moderate to high humidity.'
    },
    soil: {
      summary: 'Well-draining, rich houseplant potting soil',
      drainage: 'Good drainage',
      details: 'Standard indoor mix with added perlite and coco coir.'
    },
    fertilizer: {
      summary: 'Balanced houseplant fertilizer monthly in spring & summer',
      feeding_season: 'Spring and Summer',
      details: 'Half-strength balanced liquid food.'
    },
    repotting: {
      summary: 'Every 1–2 years in spring',
      details: 'Repot into a container 2 inches wider.'
    },
    guides: {
      watering_guide: 'Water thoroughly and allow excess water to drain freely.',
      light_placement: 'Near east or north windows with gentle indirect light.',
      soil_repotting: 'Lightweight, well-draining houseplant mix.',
      fertilizing_nutrition: 'Feed monthly during the warm growing season.',
      propagation: 'Root stem cuttings with aerial root nodes in water.',
      pruning_maintenance: 'Pinch vine tips to maintain a compact, bushy form.',
      pests_diseases: 'Spider mites and aphids.',
      problems_solutions: 'Pale leaves mean too little light. Yellow leaves indicate overwatering.',
      seasonal_care: 'Water less frequently during cooler winter months.',
      pet_toxicity: 'Keep away from pets.'
    }
  },

  // 26. English Ivy
  {
    id: 'english-ivy',
    common_name: 'English Ivy',
    scientific_name: 'Hedera helix',
    alternative_names: 'Common Ivy, European Ivy',
    alternative_names_list: ['Common Ivy', 'European Ivy'],
    category: 'Climbers & Vines',
    category_tags: ['Climbers & Vines', 'Outdoor Plants', 'Indoor Plants'],
    short_description: 'Classic evergreen trailing and climbing vine with deeply lobed, glossy, patterned leaves.',
    full_description: 'English Ivy is a timeless evergreen climber that clings to walls and trellises using rootlets. Indoors, it cascades dramatically from hanging baskets and topiary forms, purifying indoor benzene and formaldehyde.',
    image_url: 'https://images.unsplash.com/photo-1596724807490-6429f5f606ca?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: 'Vines 2–3 m',
    native_region: 'Europe and Western Asia',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Toxic to pets; contains triterpenoid saponins.',
    light: {
      summary: 'Medium to bright indirect light',
      level_icon_type: 'medium',
      details: 'Prefers cool bright indirect light. Avoid hot direct sun.'
    },
    watering: {
      summary: 'Once every week',
      water_drops: 2,
      frequency_label: 'Moderate',
      details: 'Allow top inch of soil to dry out between waterings.',
      warning: 'Avoid soggy soil which invites root rot.'
    },
    temperature: {
      summary: '10°C to 21°C',
      range_celsius: '10–21°C',
      details: 'Prefers cooler room temperatures; tolerates cold well.'
    },
    humidity: {
      summary: '50% to 70%',
      details: 'Higher humidity deters spider mites.'
    },
    soil: {
      summary: 'Rich, well-draining all-purpose potting soil',
      drainage: 'Good drainage',
      details: 'Standard houseplant potting mix.'
    },
    fertilizer: {
      summary: 'Balanced houseplant food every month in spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Half-strength balanced food.'
    },
    repotting: {
      summary: 'Every 1–2 years in spring',
      details: 'Repot when roots fill the pot.'
    },
    guides: {
      watering_guide: 'Water evenly and discard drainage saucer water.',
      light_placement: 'Cool spots with bright filtered light.',
      soil_repotting: 'Rich, aerated potting soil with good drainage.',
      fertilizing_nutrition: 'Monthly feeding in spring and summer.',
      propagation: 'Root stem tip cuttings in water or moist soil.',
      pruning_maintenance: 'Trim long vines to control size and encourage bushy growth.',
      pests_diseases: 'Spider mites are the most common pest indoors; rinse foliage regularly.',
      problems_solutions: 'Brown leaves indicate dry air or hot conditions. Yellowing leaves mean overwatering.',
      seasonal_care: 'Enjoys cooler rooms during winter.',
      pet_toxicity: 'Keep hanging out of reach of pets.'
    }
  },

  // 27. Basil
  {
    id: 'basil',
    common_name: 'Basil',
    scientific_name: 'Ocimum basilicum',
    alternative_names: 'Sweet Basil, Genovese Basil, Great Basil',
    alternative_names_list: ['Sweet Basil', 'Genovese Basil', 'Great Basil'],
    category: 'Herbs',
    category_tags: ['Herbs', 'Outdoor Plants', 'Indoor Plants'],
    short_description: 'Intensely fragrant culinary herb with tender, bright green aromatic leaves prized in cooking.',
    full_description: 'Sweet Basil is the king of culinary herbs. Incredibly easy to grow on sunny kitchen windowsills, it rewards frequent harvesting with lush aromatic foliage perfect for fresh pesto and tomato dishes.',
    image_url: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: '30–60 cm tall',
    native_region: 'Central Africa to Southeast Asia',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: '100% non-toxic and pet-safe for cats and dogs.',
    light: {
      summary: 'Full direct sunlight (6–8 hours daily)',
      level_icon_type: 'direct',
      details: 'Requires 6 to 8 hours of strong direct sunlight or bright grow lights.'
    },
    watering: {
      summary: 'Every 2–3 days',
      water_drops: 3,
      frequency_label: 'High',
      details: 'Keep soil consistently moist. Water at the base without soaking leaves.',
      warning: 'Wilts dramatically if soil dries out, but recovers quickly after watering.'
    },
    temperature: {
      summary: '18°C to 28°C',
      range_celsius: '18–28°C',
      details: 'Loves warmth; extremely sensitive to frost and cold drafts.'
    },
    humidity: {
      summary: '40% to 60%',
      details: 'Average household humidity.'
    },
    soil: {
      summary: 'Rich, moist, well-draining organic potting soil',
      drainage: 'Good drainage',
      details: 'High-quality organic potting soil with perlite and compost.'
    },
    fertilizer: {
      summary: 'Organic herb liquid fertilizer every 2 weeks',
      feeding_season: 'Spring through Autumn',
      details: 'Gentle organic seaweed or fish emulsion.'
    },
    repotting: {
      summary: 'Annual plant or repot when outgrowing starter pot',
      details: 'Pinch seedlings into 15–20 cm pots with drainage.'
    },
    guides: {
      watering_guide: 'Water in the morning at the base of the plant. Keep soil moist but never muddy.',
      light_placement: 'Sunny south-facing windowsill with direct sun.',
      soil_repotting: 'Organic herb potting soil rich in compost.',
      fertilizing_nutrition: 'Light organic feeding supports continuous leaf production.',
      propagation: 'Root 10 cm stem cuttings in water within 5–7 days.',
      pruning_maintenance: 'Pinch top leaf clusters regularly just above a set of leaves to force bushiness. Pinch off flower buds immediately to prevent leaves turning bitter.',
      pests_diseases: 'Aphids, whiteflies, and downy mildew.',
      problems_solutions: 'Yellowing lower leaves indicate overwatering or nutrient deficiency. Wilting signals dry soil.',
      seasonal_care: 'Protect from any chill below 10°C; bring indoors before autumn frost.',
      pet_toxicity: '100% pet-safe and edible.'
    }
  },

  // 28. Mint
  {
    id: 'mint',
    common_name: 'Mint',
    scientific_name: 'Mentha spicata',
    alternative_names: 'Spearmint, Garden Mint, Common Mint',
    alternative_names_list: ['Spearmint', 'Garden Mint', 'Common Mint'],
    category: 'Herbs',
    category_tags: ['Herbs', 'Outdoor Plants', 'Indoor Plants'],
    short_description: 'Vigorous, aromatic culinary herb with refreshing crinkled leaves and rapid clumping growth.',
    full_description: 'Mint is one of the easiest and most invigorating herbs to cultivate. Known for its cool menthol aroma and fast growth, it thrives in pots on kitchen counters and patio containers.',
    image_url: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Easy',
    difficulty_label: 'Beginner Friendly',
    growth_rate: 'Fast',
    max_size: '30–60 cm tall and wide',
    native_region: 'Europe and Southern Asia',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Large quantities can cause gastrointestinal upset in cats and dogs due to essential oils.',
    light: {
      summary: 'Full sun to partial shade',
      level_icon_type: 'bright_indirect',
      details: 'Enjoys 4–6 hours of sun; tolerates partial shade better than most herbs.'
    },
    watering: {
      summary: 'Every 2–3 days',
      water_drops: 4,
      frequency_label: 'High',
      details: 'Keep soil consistently moist at all times.',
      warning: 'Never allow soil to dry out completely.'
    },
    temperature: {
      summary: '15°C to 24°C',
      range_celsius: '15–24°C',
      details: 'Very cold hardy; thrives across wide temperature ranges.'
    },
    humidity: {
      summary: '45% to 70%',
      details: 'Average to high humidity.'
    },
    soil: {
      summary: 'Rich, moisture-retentive potting soil',
      drainage: 'Good drainage with moisture retention',
      details: 'Potting soil rich in organic compost.'
    },
    fertilizer: {
      summary: 'Balanced liquid fertilizer once a month in spring/summer',
      feeding_season: 'Spring and Summer',
      details: 'Half-strength all-purpose organic plant food.'
    },
    repotting: {
      summary: 'Annually in spring',
      details: 'Always grow in dedicated containers; invasive roots spread aggressively if planted in garden beds.'
    },
    guides: {
      watering_guide: 'Water thoroughly and keep substrate consistently damp.',
      light_placement: 'Sunny kitchen windowsill or patio pot.',
      soil_repotting: 'Moisture-retentive potting mix in dedicated container.',
      fertilizing_nutrition: 'Light monthly feeding supports vigorous aromatic leaves.',
      propagation: 'Root runner stolons or stem cuttings in water in days.',
      pruning_maintenance: 'Harvest regularly from the top to prevent leggy growth.',
      pests_diseases: 'Spider mites and rust.',
      problems_solutions: 'Leggy stems indicate inadequate sunlight. Dry brown leaves mean soil dried out.',
      seasonal_care: 'Dies back in winter outdoors and resprouts vigorously in spring.',
      pet_toxicity: 'Keep potted away from pets.'
    }
  },

  // 29. Rosemary
  {
    id: 'rosemary',
    common_name: 'Rosemary',
    scientific_name: 'Salvia rosmarinus',
    alternative_names: 'Dew of the Sea, Compass Plant',
    alternative_names_list: ['Dew of the Sea', 'Compass Plant'],
    category: 'Herbs',
    category_tags: ['Herbs', 'Outdoor Plants', 'Indoor Plants'],
    short_description: 'Woody Mediterranean perennial shrub with fragrant, needle-like silver-green leaves and blue flowers.',
    full_description: 'Rosemary is an ancient, deeply fragrant evergreen culinary herb from the sun-drenched Mediterranean coast. It loves warm sunshine, porous rocky soil, and infrequent watering.',
    image_url: 'https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Moderate',
    max_size: '60–120 cm tall',
    native_region: 'Mediterranean Basin',
    indoor_suitable: true,
    pet_toxic: false,
    pet_toxicity_note: 'Non-toxic and pet-safe for cats and dogs in culinary quantities.',
    light: {
      summary: 'Full direct sun (6–8 hours daily)',
      level_icon_type: 'direct',
      details: 'Needs abundant direct sunlight; thrives outdoors or on intensely sunny windowsills.'
    },
    watering: {
      summary: 'Every 1–2 weeks',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Allow top 50–75% of soil to dry out between waterings.',
      warning: 'Very susceptible to root rot if soil stays wet.'
    },
    temperature: {
      summary: '15°C to 27°C',
      range_celsius: '15–27°C',
      details: 'Handles summer heat exceptionally well. Protect from hard winter freezing.'
    },
    humidity: {
      summary: '30% to 50%',
      details: 'Prefers dry air and good air circulation.'
    },
    soil: {
      summary: 'Gritty, sandy, well-draining Mediterranean soil',
      drainage: 'Superb drainage required',
      details: 'Coarse sand, perlite, and potting soil.'
    },
    fertilizer: {
      summary: 'Light organic herb fertilizer once in spring',
      feeding_season: 'Spring only',
      details: 'Very low fertilizer requirement; over-feeding dilutes aroma.'
    },
    repotting: {
      summary: 'Every 2–3 years',
      details: 'Repot into a breathable terracotta pot with drainage.'
    },
    guides: {
      watering_guide: 'Soak root ball and allow to dry out considerably between sessions.',
      light_placement: 'Sunniest position available with excellent air movement.',
      soil_repotting: 'Sandy, gritty soil in terracotta.',
      fertilizing_nutrition: 'Feed very sparingly in spring.',
      propagation: 'Semi-hardwood stem cuttings in moist sand.',
      pruning_maintenance: 'Prune woody stems to shape and harvest fragrant needles for roasting.',
      pests_diseases: 'Powdery mildew in stagnant, humid air; provide good ventilation.',
      problems_solutions: 'Brown needle drop indicates overwatering and root rot.',
      seasonal_care: 'Bring indoors before hard freezes and place in the sunniest window.',
      pet_toxicity: '100% pet-safe.'
    }
  },

  // 30. Lavender
  {
    id: 'lavender',
    common_name: 'Lavender',
    scientific_name: 'Lavandula angustifolia',
    alternative_names: 'English Lavender, True Lavender',
    alternative_names_list: ['English Lavender', 'True Lavender'],
    category: 'Herbs',
    category_tags: ['Herbs', 'Flowering Plants', 'Outdoor Plants'],
    short_description: 'Beloved aromatic Mediterranean herb featuring silver-gray foliage and spikes of fragrant violet flowers.',
    full_description: 'Lavender is celebrated worldwide for its soothing floral fragrance, calming essential oils, and gorgeous violet flower spikes. It thrives on full sun, lean sandy soil, and dry breezes.',
    image_url: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
    difficulty: 'Moderate',
    difficulty_label: 'Intermediate',
    growth_rate: 'Slow to Moderate',
    max_size: '45–60 cm tall',
    native_region: 'Mediterranean region',
    indoor_suitable: true,
    pet_toxic: true,
    pet_toxicity_note: 'Contains linalool; toxic to dogs and cats in large quantities if ingested.',
    light: {
      summary: 'Full direct sunlight (6+ hours daily)',
      level_icon_type: 'direct',
      details: 'Needs intense direct sunlight to thrive and produce aromatic floral spikes.'
    },
    watering: {
      summary: 'Every 10–14 days',
      water_drops: 1,
      frequency_label: 'Low',
      details: 'Allow soil to dry out thoroughly between waterings.',
      warning: 'Extremely prone to root rot in soggy or humid soil.'
    },
    temperature: {
      summary: '15°C to 26°C',
      range_celsius: '15–26°C',
      details: 'Loves warmth and fresh dry breezes. Tolerates cold well if soil is dry.'
    },
    humidity: {
      summary: '30% to 45%',
      details: 'Prefers low humidity and excellent air circulation.'
    },
    soil: {
      summary: 'Lean, gritty, alkaline sandy soil with limestone/perlite',
      drainage: 'Maximum drainage',
      details: 'Gritty potting mix with coarse sand, pumice, and lime.'
    },
    fertilizer: {
      summary: 'Very light organic feed once in spring',
      feeding_season: 'Spring only',
      details: 'Do not over-fertilize; rich soil reduces floral fragrance.'
    },
    repotting: {
      summary: 'Every 2–3 years in spring',
      details: 'Use terracotta pots with drainage holes.'
    },
    guides: {
      watering_guide: 'Water deeply and infrequently. Never leave water in saucer.',
      light_placement: 'Sunniest outdoor balcony or south-facing windowsill.',
      soil_repotting: 'Gritty alkaline soil mix in porous terracotta.',
      fertilizing_nutrition: 'Minimal feeding; thrives in nutrient-poor conditions.',
      propagation: 'Semi-hardwood cuttings taken in summer.',
      pruning_maintenance: 'Prune back by one-third after summer blooming to prevent woodiness.',
      pests_diseases: 'Root rot and fungal leaf spot in damp conditions.',
      problems_solutions: 'Drooping foliage with soft stems indicates wet feet/overwatering.',
      seasonal_care: 'Protect from winter root freezing by wrapping container.',
      pet_toxicity: 'Keep away from pets.'
    }
  }
];

export const CATEGORIES_LIST: string[] = [
  'All Plants',
  'Indoor Plants',
  'Outdoor Plants',
  'Succulents & Cacti',
  'Tropical Plants',
  'Flowering Plants',
  'Herbs',
  'Climbers & Vines'
];

export class PlantEncyclopediaService {
  static getAllPlants(): EncyclopediaPlant[] {
    return PLANT_ENCYCLOPEDIA;
  }

  static getPlantById(id: string): EncyclopediaPlant | undefined {
    return PLANT_ENCYCLOPEDIA.find(
      p => p.id.toLowerCase() === id.toLowerCase() ||
           p.common_name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
    );
  }

  static searchPlants(query: string, category: string = 'All Plants'): EncyclopediaPlant[] {
    const q = query.trim().toLowerCase();
    
    return PLANT_ENCYCLOPEDIA.filter(plant => {
      // Category match
      const matchesCategory =
        category === 'All Plants' ||
        category === 'All' ||
        plant.category === category ||
        plant.category_tags.some(tag => tag.toLowerCase() === category.toLowerCase());

      if (!matchesCategory) return false;

      // Query match
      if (!q) return true;

      const inCommon = plant.common_name.toLowerCase().includes(q);
      const inScientific = plant.scientific_name.toLowerCase().includes(q);
      const inAlts = plant.alternative_names.toLowerCase().includes(q);
      const inCategory = plant.category.toLowerCase().includes(q);
      const inTags = plant.category_tags.some(t => t.toLowerCase().includes(q));

      return inCommon || inScientific || inAlts || inCategory || inTags;
    });
  }

  static getFavorites(): string[] {
    try {
      const raw = localStorage.getItem('plant_book_favorites_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static toggleFavorite(plantId: string): boolean {
    const favs = this.getFavorites();
    const index = favs.indexOf(plantId);
    let isFav = false;
    if (index >= 0) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.push(plantId);
      isFav = true;
    }
    localStorage.setItem('plant_book_favorites_v1', JSON.stringify(favs));
    return isFav;
  }

  static isFavorite(plantId: string): boolean {
    return this.getFavorites().includes(plantId);
  }
}
