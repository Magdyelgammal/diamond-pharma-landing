import { productDetails } from './product-details';
export const company = {
  name: 'Diamond Pharmaceutical Industries',
  phone: '+20 101 784 5809',
  phoneHref: 'tel:+201017845809',
  whatsapp: '+20 101 784 5809',
  whatsappHref: 'https://api.whatsapp.com/send?phone=201017845809&text=Hello%20Diamond%20Pharma%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.',
  address: '36 Mohamed Kamel Hussein Street, Apartment 41, 4th Floor, New Nozha, Cairo, Egypt',
  mapsHref: 'https://maps.google.com/?q=36+Mohamed+Kamel+Hussein+Street+New+Nozha+Cairo+Egypt',
  about: 'Diamond Pharmaceutical Industries is an Egypt-based company with a portfolio of dietary supplements for different life stages and everyday nutritional needs. From children’s gummies and syrup to adult capsules and lozenges, our range brings together distinct formulations in approachable formats.',
  mission: 'To make everyday nutritional support easier to understand and more approachable, through a thoughtfully developed portfolio and clear product information.',
  vision: 'To become a trusted name in everyday wellness, building lasting relationships with the people and partners who choose Diamond.',
};
export const values = [
  { title: 'Care', text: 'People and their everyday needs at the heart of our thinking.' },
  { title: 'Clarity', text: 'Straightforward information that supports informed choices.' },
  { title: 'Integrity', text: 'Honest communication and responsible relationships.' },
  { title: 'Progress', text: 'A commitment to listening, learning and continually improving.' },
];
export const flavors = [
  { name: 'Orange', color: '#ef962b', image: 'lozin-orange', tag: 'Citrus & Thyme' },
  { name: 'Blueberry', color: '#8750a1', image: 'lozin-blueberry', tag: 'Rich Berry' },
  { name: 'Cherry', color: '#dc4945', image: 'lozin-cherry', tag: 'Wild Cherry' },
  { name: 'Fresh mint', color: '#209bc9', image: 'lozin-fresh-mint', tag: 'Cooling Mint' },
  { name: 'Ginger & lemon', color: '#98602d', image: 'lozin-ginger-lemon', tag: 'Warming Spice' },
  { name: 'Lemon & honey', color: '#d9a31d', image: 'lozin-lemon-honey', tag: 'Soothing Honey' },
  { name: 'Sugar-free lemon', color: '#ac9313', image: 'lozin-lemon-zero-sugar', tag: 'Zero Sugar' },
];
const portfolio = [
  { id: 'lozin', name: 'Lozin C', category: 'Everyday essentials', healthGoal: 'Immune Support', tag: '7 flavors · 24 lozenges', ingredient: 'Vitamin C · Zinc · Elderberry', description: 'Vitamin C, zinc and elderberry in a lozenge format, with seven distinct flavor options.', image: 'lozin-orange', color: '#e59836', background: '#faf3e9', format: 'Lozenges', count: '24 lozenges', note: 'Explore the seven flavors below. The sugar-free lemon variant has its own ingredient formulation.' },
  { id: 'omega', name: 'Omega 3 Mond', category: 'Adult nutrition', healthGoal: 'Heart, Brain & Eye', tag: '60 soft gelatin capsules', ingredient: 'Odourless Fish Oil 2000 mg (EPA & DHA) · Vitamin D3', description: 'A concentrated blend of odourless fish oil providing 600 mg EPA, 400 mg DHA and 2000 IU Vitamin D3 per serving in soft gelatin capsules.', image: 'omega-mond', color: '#c58b27', background: '#faf6ee', format: 'Soft gelatin capsules', count: '60 capsules', note: 'Refer to the product label for full facts and directions. Consult a healthcare professional before use.' },
  { id: 'vita', name: 'VitaMond Kids', category: 'For little ones', healthGoal: 'Children’s Nutrition', tag: '120 gummies · Mixed flavors', ingredient: 'Vitamins & minerals', description: 'A colorful vitamins and minerals gummy format with orange, apple, strawberry and cola flavors.', image: 'vitamond', color: '#2291c2', background: '#edf6fc', format: 'Gummies', count: '120 gummies', note: 'The packaging identifies this product for ages 2 years and above. Follow the product label and professional advice.' },
  { id: 'osteo', name: 'Osteomond Junior', category: 'For little ones', healthGoal: 'Bone & Growth', tag: '120 ml · Orange flavor', ingredient: 'Calcium · Magnesium · Zinc · Vitamin D3', description: 'A children’s syrup format combining calcium, magnesium, zinc and vitamin D3, with orange flavor.', image: 'osteomond', color: '#249da9', background: '#edf8f7', format: 'Syrup', count: '120 ml', note: 'Refer to the product label for age-specific directions and use the measuring tool supplied with the product.' },
  { id: 'ferro', name: 'FerroMond', category: 'Adult nutrition', healthGoal: 'Iron & Energy', tag: '10 soft gelatin capsules', ingredient: 'Iron · Folate · Vitamin C · Vitamin B12', description: 'An iron-based formulation enriched with folate, vitamin C and vitamin B12, in soft gelatin capsules.', image: 'ferromond', color: '#a33b3c', background: '#f8efef', format: 'Soft gelatin capsules', count: '10 capsules', note: 'See the product packaging for the full ingredient information, directions and warnings.' },
  { id: 'royal', name: 'Royal Mond', category: 'Adult nutrition', healthGoal: 'Vitality & Stamina', tag: '30 soft gelatin capsules', ingredient: '1000 mg natural royal jelly', description: 'Natural royal jelly in a soft gelatin capsule format, presented in the 30-capsule pack.', image: 'royal-mond', color: '#c48a2a', background: '#fbf6e9', format: 'Soft gelatin capsules', count: '30 capsules', note: 'Refer to the label for the royal jelly extract specification and warnings, including bee-product allergies.' },
  { id: 'melato', name: 'Melato Mond', category: 'Night-time routine', healthGoal: 'Sleep & Relaxation', tag: '60 gummies · Berry flavor', ingredient: 'Melatonin · Magnesium · L-theanine', description: 'A berry-flavored gummy formulation with melatonin, magnesium, L-theanine, chamomile and elderberry.', image: 'melato-mond', color: '#7665a3', background: '#f3f0fa', format: 'Gummies', count: '60 gummies', note: 'For adult use. Follow the product label and seek professional advice where needed.' },
  { id: 'saw', name: 'Sawmond', category: 'Adult nutrition', healthGoal: 'Men’s Vitality', tag: '10 soft gelatin capsules', ingredient: 'Pumpkin seed oil · Saw palmetto · Zinc', description: 'A men’s dietary supplement formulation combining pumpkin seed oil, saw palmetto and zinc.', image: 'sawmond', color: '#cc8a32', background: '#eff5ef', format: 'Soft gelatin capsules', count: '10 capsules', note: 'For adult men only. See the label for complete ingredients, directions and warnings.' },
  { id: 'd3k2', name: 'D3+K2 Mond', category: 'Adult nutrition', healthGoal: 'Bone & Immune Strength', tag: '60 soft gelatin capsules', ingredient: 'Vitamin D3 4000 IU · Vitamin K2 100 mcg', description: 'Vitamins D3 and K2 in a soft gelatin capsule format, with 100 mcg of each vitamin per capsule.', image: 'd3-k2-mond', color: '#22664d', background: '#eef5ef', format: 'Soft gelatin capsules', count: '60 capsules' },
];
export const products = portfolio.map(p => ({...p, ...productDetails[p.id]}));
