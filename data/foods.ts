export interface Food {
  id: number;
  name: string;
  nameKm?: string;
  image: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  deliveryTime: string;
  description: string;
  descriptionKm: string;
}

export const foods: Food[] = [
  // 1. Samlor (Soups)
  {
    id: 1,
    name: "Samlor Korkor",
    nameKm: "សម្លរកកូរ",
    image: "/foods/korkor.jpg",
    category: "Samlor (Soups)",
    price: 6.70,
    rating: 4.8,
    deliveryTime: "25-35 min",
    description: "Samlor Korkor (also spelled Samlor Kako) is a traditional Cambodian fish and vegetable soup, often called a national dish. Its name means stirring soup in Khmer. It features a savory broth flavored with prahok (fermented fish paste) and kroeung (green spice paste), thickened with toasted ground rice, and loaded with fresh local vegetables and fish.",
    descriptionKm: "សម្លរកកូរ គឺជាសម្លរប្រពៃណីខ្មែរដ៏ពេញនិយមមួយ ដែលត្រូវបានចាត់ទុកជាមុខម្ហូបជាតិ។ ឈ្មោះរបស់វាបានមកពីការកូរគ្រឿងផ្សំ និងបន្លែចម្រុះគ្នា។ សម្លរនេះមានរសជាតិឆ្ងាញ់ពិសា ផ្សំឡើងពីប្រហុក គ្រឿងក្រអូប អង្ករកំពិសលីង និងផ្ទុកទៅដោយបន្លែស្រស់ៗព្រមទាំងត្រី។"
  },
  {
    id: 2,
    name: "Samlor Machu Fish",
    nameKm: "សម្លរម្ជូរត្រី",
    image: "/foods/machu.jpg",
    category: "Samlor (Soups)",
    price: 6.25,
    oldPrice: 7.5,
    rating: 4.7,
    deliveryTime: "20-30 min",
    description: "Samlor Machu Trey is a traditional Cambodian clear, sour fish soup. It features a zesty, tamarind-based broth loaded with fresh freshwater fish, aromatic herbs, and crisp vegetables, delivering a bright balance of tangy, savory, and spicy flavors.",
    descriptionKm: "សម្លរម្ជូរត្រី គឺជាសម្លរប្រពៃណីខ្មែរដែលមានទឹកថ្លា និងរសជាតិជូរអែម។ វាផ្សំឡើងពីទឹកអម្ពិលទុំ ត្រីទឹកសាបស្រស់ៗ គ្រឿងក្រអូប និងបន្លែស្រស់ៗ ដែលផ្តល់នូវរសជាតិឆ្ងាញ់ស្រស់ស្រាយ ជូរ ប្រៃ ស្រទន់ និងមានក្លិនឈ្ងុយ។"
  },
  {
    id: 3,
    name: "Samlor Proher",
    nameKm: "សម្លរប៉ែហើរ",
    image: "/foods/proher.jpg",
    category: "Samlor (Soups)",
    price: 5.65,
    rating: 4.6,
    deliveryTime: "20-25 min",
    description: "Samlor Proher (also spelled Samlor Prahal) is a traditional, highly fragrant Cambodian vegetable and fish soup. Its name translates literally to fragrant soup. It is a quintessential comfort food in rural and urban Cambodian households, celebrated for its clean, herbal, and deeply savory broth",
    descriptionKm: "សម្លរប៉ែហើរ គឺជាសម្លរបន្លែ និងត្រីដ៏មានក្លិនក្រអូបឈ្ងុយឈ្ងប់បែបប្រពៃណីខ្មែរ។ វាជាមុខម្ហូបដ៏ពេញនិយមក្នុងគ្រួសារកម្ពុជាទាំងនៅជនបទ និងទីក្រុង ដែលល្បីល្បាញដោយសារទឹកសម្លរមានរសជាតិឆ្ងាញ់ពិសា ស្រាលស្រទន់ និងក្លិនឱសថរុក្ខជាតិធម្មជាតិ។"
  },

  // 2. Kari & Amok
  {
    id: 4,
    name: "Fish Amok",
    nameKm: "អាម៉ុកត្រី",
    image: "/foods/ahmok.jpg",
    category: "Kari & Amok",
    price: 6.25,
    oldPrice: 8.0,
    rating: 4.9,
    deliveryTime: "20-30 min",
    description: "Fish amok (amok trei) is a famous Cambodian dish. It is a soft, steamed fish curry with a smooth, mousse-like feel. People cook fresh fish with thick coconut milk and kroeung (a fragrant spice paste made of lemongrass, galangal, turmeric, and lime leaves).",
    descriptionKm: "អាម៉ុកត្រី គឺជាមុខម្ហូបដ៏ល្បីល្បាញបំផុតរបស់កម្ពុជា។ វាជាការីត្រីចំហុយដែលមានសាច់ម៉ដ្ឋ និងទន់ល្មមរលាយក្នុងមាត់ ធ្វើឡើងដោយការលាយត្រីស្រស់ជាមួយខ្ទិះដូងខាប់ និងគ្រឿងក្រអូប (រំដេង ស្លឹកគ្រៃ រមៀត និងស្លឹកក្រូចសើច)។"
  },
  {
    id: 5,
    name: "Khmer Chicken Kari",
    nameKm: "ការីសាច់មាន់",
    image: "/foods/kari.jpg",
    category: "Kari & Amok",
    price: 7.50,
    rating: 4.8,
    deliveryTime: "25-35 min",
    description: "Khmer chicken curry, known locally as Somlor Kari Sach Moan, is a fragrant, mild, and creamy coconut-based soup. Unlike fiery regional variations, it uses a lemongrass-heavy kroeung paste, combining tender chicken, sweet potatoes, eggplants, and long beans. It is traditionally served with fresh baguettes.",
    descriptionKm: "ការីសាច់មាន់ខ្មែរ គឺជាសម្លរខ្ទិះដូងដែលមានក្លិនក្រអូបឈ្ងុយ រសជាតិស្រទន់ និងមិនហឹរខ្លាំង។ វាផ្សំពីសាច់មាន់ទន់ៗ ដំឡូងជ្វា ត្រប់ និងសណ្តែកฝักยาว ដោយប្រើប្រាស់គ្រឿងគ្រឹះសំបូរដោយស្លឹកគ្រៃ និងញ៉ាំជាមួយនំបុ័ងបារាំងស្រស់ៗ។"
  },

  // 3. Cha (Stir-Fries)
  {
    id: 6,
    name: "Beef Lok Lak",
    nameKm: "ឡុកឡាក់សាច់គោ",
    image: "/foods/looklak.jpg",
    category: "Cha (Stir-Fries)",
    price: 7.45,
    rating: 4.9,
    deliveryTime: "20-30 min",
    description: "Beef Lok Lak is a beloved Cambodian national dish featuring tender, marinated cubes of beef stir-fried in a hot wok. The meat is served over a bed of fresh lettuce, tomatoes, and onions, and it is traditionally accompanied by a tangy lime-and-pepper dipping sauce and warm rice.",
    descriptionKm: "ឡុកឡាក់សាច់គោ គឺជាមុខម្ហូបជាតិដ៏មានប្រជាប្រិយភាព ដែលមានសាច់គោគូបតូចៗប្រឡាក់គ្រឿងរួចឆាជាមួយខ្ទះក្តៅ។ សាច់នេះត្រូវបានរៀបចំពីលើស្លឹកសាឡាត់ ប៉េងប៉ោះ និងខ្ទង់បារាំង ព្រមទាំងញ៉ាំជាមួយទឹកជ្រលក់ម្រេចក្រូចឆ្មា និងបាយសក្តៅៗ។"
  },
  {
    id: 7,
    name: "Cha Khghei (Ginger Stir-Fry)",
    nameKm: "ឆាខ្ញីសាច់មាន់",
    image: "/foods/chakhgei.jpg",
    category: "Cha (Stir-Fries)",
    price: 6.40,
    rating: 4.7,
    deliveryTime: "15-25 min",
    description: "Thai ginger stir-fry, known as Gai Pad Khing when made with chicken, is a fragrant, savory dish. It features tender strips of meat or poultry flash-fried in a hot wok with abundant matchstick-cut fresh ginger, garlic, onions, mushrooms, and a rich, savory sauce.",
    descriptionKm: "ឆាខ្ញី គឺជាមុខម្ហូបឆាដ៏មានក្លិនក្រអូបឈ្ងុយឆ្ងាញ់។ វាផ្សំឡើងពីសាច់មាន់ឬសាច់ផ្សេងទៀត ឆាជាមួយខ្ញីហាន់ជាសរសៃស្តើងៗ ខ្ទឹមស ខ្ទឹមបារាំង ផ្សិត និងទឹកឆាដែលមានរសជាតិឆ្ងាញ់ពិសា។"
  },
  {
    id: 8,
    name: "Cha Krapao",
    nameKm: "ឆាម្រេះព្រៅ",
    image: "/foods/krapao.jpg",
    category: "Cha (Stir-Fries)",
    price: 5.18,
    rating: 4.8,
    deliveryTime: "15-20 min",
    description: "Cha Krapao (commonly spelled Pad Kra Pao) is a famous Thai street food dish. It is a hot and spicy stir-fry made with minced meat, lots of garlic and chilies, and fragrant holy basil leaves. It is served over plain rice and topped with a crispy fried egg.",
    descriptionKm: "ឆាម្រេះព្រៅ គឺជាមុខម្ហូបឆាយ៉ាងពេញនិយម ដែលមានរសជាតិហឹរ និងក្រអូបស្លឹកម្រេះព្រៅ។ វាធ្វើឡើងពីសាច់ចិញ្ច្រាំ ខ្ទឹមស ម្ទេស និងស្លឹកម្រេះព្រៅស្រស់ៗ ទទួលទានជាមួយបាយស និងពងមាន់ចៀនស្រួយពីលើ។"
  },

  // 4. Nhoam & Bok (Salads)
  {
    id: 9,
    name: "Nhoam Svay (Green Mango Salad)",
    nameKm: "ញាំស្វាយខ្ចី",
    image: "/foods/mango-salad.jpg",
    category: "Nhoam & Bok (Salads)",
    price: 5.70,
    rating: 4.7,
    deliveryTime: "15-20 min",
    description: "Nhoam Svay (Green Mango Salad) is a traditional Cambodian dish made with shredded crisp, unripe green mango. It mixes sour, salty, sweet, and spicy tastes. Cooks toss the fruit with fresh herbs, dried or smoked fish, and crushed peanuts in a sharp lime and fish sauce dressing.",
    descriptionKm: "ញាំស្វាយខ្ចី គឺជាម្ហូបប្រពៃណីខ្មែរធ្វើពីស្វាយខ្ចីហាន់ជាសរសៃស្រួយៗ។ វាលាយបញ្ចូលគ្នានូវរសជាតិជូរ ប្រៃ ផ្អែម និងហឹរ ព្រមទាំងច្របល់ជាមួយឱសថខ្មែរ ត្រីងៀត ឬត្រីឆ្អើរ និងសណ្តែកដីកិនម៉ដ្ឋ ជាមួយទឹកក្រូចឆ្មា និងទឹកត្រី។"
  },
  {
    id: 10,
    name: "Bok L'hong (Papaya Salad)",
    nameKm: "បុកល្ហុង",
    image: "/foods/papaya-salad.jpg",
    category: "Nhoam & Bok (Salads)",
    price: 4.65,
    rating: 4.6,
    deliveryTime: "15-20 min",
    description: "Bok L'hong means pounded papaya in Khmer. It is a famous Cambodian street food. This spicy green papaya salad mixes shredded unripe papaya, garlic, chilies, fish sauce, and lime juice in a clay mortar. It tastes sour, sweet, salty, and spicy all at once.",
    descriptionKm: "បុកល្ហុង គឺជាអាហារពេលល្ងាច ឬអាហារសម្រន់តាមចិញ្ចើមផ្លូវដ៏ល្បីល្បាញ។ វាធ្វើឡើងដោយការបុកល្ហុងខ្ចីសរសៃស្រួយជាមួយ ខ្ទឹមស ម្ទេស ទឹកត្រី និងទឹកក្រូចឆ្មាក្នុងត្បាល់ ដែលផ្តល់រសជាតិជូរ ផ្អែម ប្រៃ និងហឹរក្នុងពេលតែមួយ។"
  },
  {
    id: 11,
    name: "Lap Khmer (Beef Salad)",
    nameKm: "ភ្លាគោ",
    image: "/foods/lapkhmer.jpg",
    category: "Nhoam & Bok (Salads)",
    price: 7.80,
    oldPrice: 8.5,
    rating: 4.9,
    deliveryTime: "20-30 min",
    description: "Lap Khmer is a refreshing, vibrant Cambodian beef salad made with thinly sliced beef. The meat is either quickly seared or cooked ceviche-style in fresh lime juice, then tossed with fragrant lemongrass, fish sauce, garlic, shallots, and spicy red chilies.",
    descriptionKm: "ភ្លាគោ គឺជាសាឡាត់សាច់គោស្រស់ស្រាយ និងមានរសជាតិឆ្ងាញ់ឆ្ងុយឆ្ងាញ់របស់ខ្មែរ។ សាច់គោត្រូវបានហាន់ស្តើងៗ ឆាបំភាយក្នុងកំដៅភ្លើងឆាប់ៗ ឬប្រឡាក់ជាមួយទឹកក្រូចឆ្មាស្រស់ រួចច្របល់ជាមួយស្លឹកគ្រៃ ទឹកត្រី ខ្ទឹមស ខ្ទឹមក្រហម និងម្ទេសហឹរ។"
  },

  // 5. Prahok & Dips
  {
    id: 12,
    name: "Prahok Ktis",
    nameKm: "ប្រហុកខ្ទិះ",
    image: "/foods/prahokktis.jpg",
    category: "Prahok & Dips",
    price: 6.70,
    rating: 4.8,
    deliveryTime: "15-25 min",
    description: "Prahok Ktis is a rich, creamy Cambodian dipping sauce made from fermented fish paste (prahok), minced pork, and coconut cream or milk. It balances sharp, salty, and funky umami notes with sweet, creamy, and aromatic herbal flavors.",
    descriptionKm: "ប្រហុកខ្ទិះ គឺជាទឹកជ្រលក់ដ៏ឈ្ងុយឆ្ងាញ់ និងមានជាតិខ្លាញ់ខ្ទិះដូងឆ្ងាញ់ពិសា ផ្សំឡើងពីប្រហុក សាច់ជ្រូកចិញ្ច្រាំ និងខ្ទិះដូង។ វាមានរសជាតិប្រៃក្លិនឈ្ងុយឆ្ងាញ់ លាយឡំជាមួយភាពផ្អែម និងក្លិនក្រអូបនៃគ្រឿងផ្សំផ្សេងៗ។"
  },
  {
    id: 13,
    name: "Teuk Kroeung",
    nameKm: "ទឹកគ្រឿង",
    image: "/foods/teukkroeung.jpg",
    category: "Prahok & Dips",
    price: 5.05,
    rating: 4.7,
    deliveryTime: "15-25 min",
    description: "Teuk Kroeung (or Tuk Kroeung) is a traditional Cambodian fish dipping sauce. It features a savory, pungent, and tangy blend of cooked river fish, fermented fish paste (prahok), and tamarind. It is typically served warm or at room temperature alongside a large platter of fresh, raw, or blanched seasonal vegetables and jasmine rice.",
    descriptionKm: "ទឹកគ្រឿង គឺជាទឹកជ្រលក់ត្រីប្រពៃណីខ្មែរ ដែលមានរសជាតិឆ្ងាញ់ដិតដាម ផ្សំពីត្រីឆ្អើរឬត្រីឆ្អិន ប្រហុក និងទឹកអម្ពិលទុំ។ វាត្រូវបានគេនិយមញ៉ាំជាមួយបន្លែស្រស់ៗ បន្លែស្ងោរ និងបាយសក្តៅៗ។"
  },

  // 6. Num & Bai (Breakfast)
  {
    id: 14,
    name: "Bai Sach Chrouk",
    nameKm: "បាយសាច់ជ្រូក",
    image: "/foods/pork-rice.jpg",
    category: "Num & Bai (Breakfast)",
    price: 4.45,
    rating: 4.9,
    deliveryTime: "15-20 min",
    description: "Bai Sach Chrouk (បាយសាច់ជ្រូក) translates to pork and rice in Khmer and is Cambodia’s most iconic and beloved national breakfast dish. It features thin slices of pork slow-grilled over hot coals, served over warm jasmine rice, and paired with pickled vegetables and clear broth.",
    descriptionKm: "បាយសាច់ជ្រូក គឺជាអាហារពេលព្រឹកដ៏ពេញនិយម និងមានតស៊ូអាយុកាលយូរលង់ជាងគេនៅកម្ពុជា។ វាមានសាច់ជ្រូកហាន់ស្តើងៗប្រឡាក់អាំងលើភ្លើងអុស ឬធ្យូងឈ្ងុយៗ ដាក់ពីលើបាយសក្តៅៗ ញ៉ាំជាមួយបន្លែជ្រក់ និងទឹកស៊ុបថ្លា។"
  },
  {
    id: 15,
    name: "Num Banh Chok",
    nameKm: "នំបញ្ចុក",
    image: "/foods/noodle.jpg",
    category: "Num & Bai (Breakfast)",
    price: 5.50,
    rating: 4.8,
    deliveryTime: "15-20 min",
    description: "Num banhchok is a signature Cambodian dish of lightly fermented, hand-made rice noodles served with a savory, greenish-yellow freshwater fish gravy and a generous topping of fresh, crisp raw vegetables and aromatic herbs. It is a beloved national comfort food usually eaten for breakfast or as a daytime snack.",
    descriptionKm: "នំបញ្ចុក គឺជាមុខម្ហូបអត្តសញ្ញាណជាតិខ្មែរ ដែលធ្វើពីនំបញ្ចុកសរសៃញីធ្វើដោយដៃ និងទឹកសម្លរត្នោតត្រីដ៏ក្រអូបឈ្ងុយឆ្ងាញ់ ព្រមទាំងបន្លែស្រស់ៗចម្រុះមុខ។ វាជាអាហារដ៏ពេញនិយមសម្រាប់ពេលព្រឹក ឬពេលថ្ងៃត្រង់។"
  },
  {
    id: 16,
    name: "Kuy Teav",
    nameKm: "គុយទាវ",
    image: "/foods/kuyteav.jpg",
    category: "Num & Bai (Breakfast)",
    price: 4.80,
    rating: 4.9,
    deliveryTime: "15-20 min",
    description: "Kuy teav is a famous Cambodian rice noodle soup. It features clear, fragrant pork or beef broth, soft rice noodles, and a rich mix of meat toppings, fresh herbs, and aromatics. People across Cambodia traditionally eat it for breakfast at local markets, street stalls, and cafes.",
    descriptionKm: "គុយទាវ គឺជាស៊ុបកាត់សរសៃគុយទាវដ៏ល្បីល្បាញរបស់កម្ពុជា។ វាមានទឹកស៊ុបឆ្អិនពីសាច់ជ្រូក ឬសាច់គោមានរសជាតិផ្អែមស្រទន់ សរសៃគុយទាវទន់ល្មម រួមជាមួយសាច់ចម្រុះ បន្លែ និងគ្រឿងក្រអូប ដែលប្រជាជនខ្មែរនិយមញ៉ាំពេលព្រឹក។"
  },
  {
    id: 17,
    name: "Chrouk Trei",
    nameKm: "ជ្រក់ត្រី",
    image: "/foods/chrouk-trei.jpg",
    category: "Samlor (Soups)",
    price: 2.45,
    rating: 4.2,
    deliveryTime: "10-15 min",
    description: "Sngor chrouk trei is a light, clean, and refreshing Cambodian clear sour fish soup. It features fresh fish chunks—such as snakehead or catfish—simmered in a fragrant broth flavored with lemongrass, fresh lime juice, fish sauce, and aromatic herbs like basil and saw-tooth coriander.",
    descriptionKm: "សម្លម្ជូរជ្រក់ត្រី គឺជាសម្លខ្មែរដែលមានរសជាតិស្រទន់ ស្រស់ស្រាយ និងមានក្លិនឈ្ងុយនៃគ្រឿងក្រអូប ស្លឹកគ្រៃ ទឹកក្រូចឆ្មា និងជីរវ៉ាន់ស៊ុយ ជាមួយនិងចំណិតសាច់ត្រីស្រស់ៗ។"
  },
  {
    id: 18,
    name: "Mahcu Youn",
    nameKm: "សម្លរ ម្ជូរយួន",
    image: "/foods/Machu Youn.jpg",
    category: "Samlor (Soups)",
    price: 3.25,
    rating: 4.5,
    deliveryTime: "10-15 min",
    description: "Samlor Machu Youn is a popular Cambodian sweet and sour soup inspired by Vietnamese canh chua. It features a bright, tangy broth flavored with tamarind, pineapple, tomatoes, and fresh aromatic herbs, usually cooked with fish or chicken",
    descriptionKm: "សម្លរម្ជូរយួន (សម្លរម្ជូរយួន) គឺជាស៊ុបផ្អែម និងជូរដ៏ពេញនិយមរបស់ខ្មែរ ដែលបំផុសគំនិតដោយ ឆាឆា វៀតណាម។ វា​មាន​រសជាតិ​ឈ្ងុយ​ឆ្ងាញ់​ជាមួយ​អំពិល ម្នាស់ ប៉េងប៉ោះ និង​ឱសថ​ក្រអូប​ស្រស់ៗ ដែល​ជាធម្មតា​ចម្អិន​ជាមួយ​ត្រី ឬ​សាច់មាន់"
  }
];