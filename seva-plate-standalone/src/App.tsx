import { useMemo, useState } from 'react';

import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Heart, Leaf, MapPin, Menu, Search, ShieldCheck, Utensils, X, ShoppingBag } from 'lucide-react';

type Meal = { id: number; title: string; shop: string; area: string; category: string; price: string; original: string; time: string; tint: string; image: string; note: string };

const meals: Meal[] = [

{ id: 1, title: 'Market bowl, end-of-day', shop: 'Juniper & Rye', area: 'East Village', category: 'Bowls', price: '₹80', original: '₹120', time: 'Pickup window · 6:30–7:30 pm', tint: '#e7b96c', image: '/seva-hero.jpg', note: 'Roasted vegetables, herbed grains, lemon tahini. A generous bowl made with what looked best at the market today.' },

{ id: 2, title: 'The little bakery bundle', shop: 'Daybreak Bakehouse', area: 'North Park', category: 'Bakery', price: '₹75', original: '₹135', time: 'Pickup window · 5:00–6:00 pm', tint: '#c98769', image: '/seva-hero.jpg', note: 'A little of everything from today’s bake: naturally leavened bread, a pastry, and something sweet.' },

{ id: 3, title: 'Supper for one', shop: 'Saffron Table', area: 'Old Town', category: 'Dinner', price: '₹82', original: '₹140', time: 'Pickup window · 7:00–8:00 pm', tint: '#9a9d64', image: '/seva-hero.jpg', note: 'A rotating, home-style dinner from the Saffron Table kitchen. Thoughtful, filling, and ready for the evening.' },

{ id: 4, title: 'Garden focaccia & sides', shop: 'Olive Street Kitchen', area: 'East Village', category: 'Bakery', price: '₹65', original: '₹110', time: 'Pickup window · 4:30–5:30 pm', tint: '#a76e53', image: '/seva-hero.jpg', note: 'A slice of garden focaccia with two seasonal sides. Each bundle is a little different.' },

];

const categories = ['Everything', 'Bowls', 'Bakery', 'Dinner'];

function Brand({ light = false }: { light?: boolean }) {

return <a href="#top" className={`inline-flex items-center gap-2.5 ${light ? 'text-[#f7f3e8]' : 'text-[#214537]'}`} aria-label="Seva Plate home">

<span className={`grid h-9 w-9 place-items-center rounded-full ${light ? 'bg-[#e5b57a] text-[#214537]' : 'bg-[#244a3a] text-[#f7f3e8]'}`}><Utensils size={17} strokeWidth={1.8} /></span>

<span className="serif text-[23px] leading-none tracking-[-.045em]">seva<span className={light ? 'text-[#e5b57a]' : 'text-[#b8664e]'}>plate</span></span>

</a>;

}

function SectionLabel({ children, inverse = false }: { children: string; inverse?: boolean }) {

return <div className={`eyebrow flex items-center gap-2 ${inverse ? 'text-[#d5b17f]' : 'text-[#b8664e]'}`}><span className="h-px w-6 bg-current" />{children}</div>;

}

function App() {

const [cart, setCart] = useState<Meal[]>([]);
const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

const addToCart = (meal: Meal) => {
  if (!cart.some(item => item.id === meal.id)) {
    setCart([...cart, meal]);
  }
};

const removeFromCart = (id: number) => {
  setCart(cart.filter(item => item.id !== id));
};

const cartTotal = useMemo(() => {
  return cart.reduce((sum, item) => sum + parseInt(item.price.replace('₹', '')), 0);
}, [cart]);

const [query, setQuery] = useState('');

const [category, setCategory] = useState('Everything');

const [neighborhood, setNeighborhood] = useState('All neighborhoods');

const [modal, setModal] = useState<'partner' | 'meal' | 'checkout' | null>(null);

const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

const [mobileOpen, setMobileOpen] = useState(false);

const [submitted, setSubmitted] = useState(false);

const [saved, setSaved] = useState<number[]>([]);

const filteredMeals = useMemo(() => meals.filter((meal) => {

const term = query.trim().toLowerCase();

return (category === 'Everything' || meal.category === category)

&& (neighborhood === 'All neighborhoods' || meal.area === neighborhood)

&& (!term || `${meal.title} ${meal.shop} ${meal.area} ${meal.category}`.toLowerCase().includes(term));

}), [category, neighborhood, query]);

const openPartner = () => { setSubmitted(false); setModal('partner'); };

const scrollTo = (id: string) => {

setMobileOpen(false);

document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

};

return <div id="top" className="min-h-[100dvh] overflow-hidden bg-[#f7f4eb] text-[#203d32]">

<div className="bg-[#214537] px-4 py-2 text-center text-[11px] font-medium tracking-[.04em] text-[#f2e9d6]">

A neighborhood idea, growing one good meal at a time. <button onClick={() => scrollTo('how-it-works')} className="ml-1 underline underline-offset-4 hover:text-[#e8b979]" data-testid="link-how-it-works-top">See how it works</button>

</div>

<header className="relative z-20 border-b border-[#dcd6c8] bg-[#f7f4eb]/95 backdrop-blur">

<div className="page-wrap flex h-[76px] items-center justify-between">

<Brand />

<nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">

<button className="nav-link text-[13px] font-semibold" onClick={() => scrollTo('discover')} data-testid="link-discover">Find a meal</button>

<button className="nav-link text-[13px] font-semibold" onClick={() => scrollTo('how-it-works')} data-testid="link-how">How it works</button>

<button className="nav-link text-[13px] font-semibold" onClick={() => scrollTo('community')} data-testid="link-community">Our neighborhood</button>

</nav>

<div className="hidden items-center gap-5 md:flex">

<button onClick={openPartner} className="text-[13px] font-semibold text-[#3c5a4d] hover:text-[#b8664e]" data-testid="button-partner-nav">For restaurants</button>

<button onClick={() => scrollTo('discover')} className="button-lift inline-flex items-center gap-2 rounded-full bg-[#244a3a] px-5 py-3 text-[12px] font-bold text-[#faf7ef]" data-testid="button-browse-nav">Browse meals <ArrowRight size={14} /></button>

</div>

<button onClick={() => setMobileOpen(!mobileOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-[#d9d2c4] md:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>

</div>

{mobileOpen && <div className="absolute inset-x-0 top-full border-b border-[#dcd6c8] bg-[#f7f4eb] px-6 pb-5 shadow-lg md:hidden">

<div className="flex flex-col gap-4 pt-3">

<button onClick={() => scrollTo('discover')} className="py-2 text-left text-sm font-semibold">Find a meal</button>

<button onClick={() => scrollTo('how-it-works')} className="py-2 text-left text-sm font-semibold">How it works</button>

<button onClick={() => scrollTo('community')} className="py-2 text-left text-sm font-semibold">Our neighborhood</button>

<button onClick={() => { setMobileOpen(false); openPartner(); }} className="rounded-full bg-[#244a3a] py-3 text-sm font-semibold text-white">For restaurants</button>

</div>

</div>}

</header>

<main>

<section className="relative">

<div className="page-wrap grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[.94fr_1.06fr] lg:py-16">

<div className="relative z-10 max-w-[550px]">

<div className="reveal inline-flex items-center gap-2 rounded-full border border-[#d9d0bc] bg-[#f1eadb] px-3.5 py-2 text-[11px] font-semibold tracking-[.035em] text-[#516355]">

<span className="h-1.5 w-1.5 rounded-full bg-[#b8664e]" /> GOOD FOOD, STILL IN ITS PRIME

</div>

<h1 className="serif reveal delay-1 mt-7 text-[clamp(3.8rem,7vw,6.5rem)] leading-[.91] tracking-[-.065em] text-[#204335]">A good meal<br />shouldn’t <span className="italic text-[#b8664e]">go</span><br /><span className="inline-flex items-center gap-4">to waste.<span className="mt-4 inline-grid h-12 w-12 rotate-[-18deg] place-items-center rounded-full border border-[#b8664e] text-[#b8664e] sm:h-[60px] sm:w-[60px]"><ArrowDownRight size={29} strokeWidth={1.4} /></span></span></h1>

<p className="reveal delay-2 mt-7 max-w-[420px] text-[15px] leading-[1.8] text-[#5f6f61]">Discover lovely meals from nearby kitchens at a little less. And give good surplus another place to go: local community organizations.</p>

<div className="reveal delay-3 mt-8 flex flex-wrap items-center gap-3">

<button onClick={() => scrollTo('discover')} className="button-lift inline-flex items-center gap-3 rounded-full bg-[#244a3a] px-6 py-4 text-[13px] font-bold text-[#f8f5ec]" data-testid="button-find-meals">Find a meal nearby <ArrowRight size={15} /></button>

<button onClick={openPartner} className="inline-flex items-center gap-2 px-3 py-3 text-[13px] font-bold text-[#365747] hover:text-[#b8664e]" data-testid="button-surplus-path">I have surplus <ArrowUpRight size={15} /></button>

</div>

<div className="mt-10 flex items-center gap-3 border-t border-[#d9d2c4] pt-5">

<div className="flex -space-x-2">

{['#c38468', '#7d9b7e', '#d5aa70'].map((color, index) => <span key={color} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f4eb] text-[10px] font-bold text-white" style={{ backgroundColor: color }}>{['J', 'M', 'A'][index]}</span>)}

</div>

<p className="text-[11px] leading-[1.5] text-[#6c7669]"><strong className="text-[#344d3e]">Made for the neighborhood.</strong><br />A small, thoughtful way to keep good food moving.</p>

</div>

</div>

<div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">

<div className="absolute -right-5 top-[-15px] z-10 hidden h-[116px] w-[116px] rotate-[8deg] flex-col items-center justify-center rounded-full bg-[#d4a66a] text-center text-[#214537] shadow-md sm:flex">

<span className="serif text-[27px] leading-none">good</span><span className="eyebrow mt-1 text-[8px]">food finds</span><span className="serif text-[27px] leading-none">a way</span>

</div>

<div className="grain relative aspect-[1.1/1] overflow-hidden rounded-[47%_47%_3%_3%] bg-[#9a6948] sm:aspect-[1.14/1]">

<img className="h-full w-full object-cover object-center" src="/seva-hero.jpg" alt="Colorful roasted vegetable grain bowl set on a warm restaurant table" />

<div className="absolute inset-0 bg-gradient-to-t from-[#172f24]/40 via-transparent to-transparent" />

<div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#fff9ed]">

<div><div className="eyebrow text-[#e8c894]">A little less, a lot lovely</div><div className="serif mt-1 text-[26px]">Today’s good things</div></div>

<button onClick={() => scrollTo('discover')} className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur transition hover:bg-white/25" aria-label="Browse today's meals" data-testid="button-image-browse"><ArrowDown size={19} /></button>

</div>

</div>

<div className="absolute -bottom-8 -left-4 hidden max-w-[205px] rounded-[4px_18px_18px_18px] border border-[#e1d9ca] bg-[#fbf8f0] p-4 shadow-[0_10px_30px_rgba(32,61,50,.12)] sm:block">

<div className="flex items-center gap-1 text-[#bb6c52]"><Leaf size={13} /><span className="eyebrow text-[8px]">More than a meal</span></div>

<p className="mt-2 text-[12px] leading-[1.55] text-[#526353]">A neighborhood habit that gives good food another chance.</p>

</div>

</div>

</div>

</section>

<section id="discover" className="scroll-mt-8 py-24 sm:py-28">

<div className="page-wrap">

<div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

<div className="max-w-[560px]">

<SectionLabel>THE NEIGHBORHOOD TABLE</SectionLabel>

<h2 className="serif mt-4 text-[clamp(2.8rem,5vw,4.5rem)] leading-[.98] tracking-[-.055em]">Worth finding.<br /><span className="italic text-[#b8664e]">Close to home.</span></h2>

<p className="mt-5 max-w-[450px] text-[14px] leading-[1.8] text-[#667365]">A peek at the kinds of good things you might find from kitchens around you.</p>

</div>

<div className="flex items-center gap-3 text-[11px] font-medium text-[#70796d]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e9e3d6] text-[#385747]"><MapPin size={15} /></span>Browsing around <strong className="text-[#334d3f]">East Village</strong><ChevronDown size={13} /></div>

</div>

<div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto]">

<label className="flex h-[54px] items-center gap-3 rounded-xl border border-[#dcd5c7] bg-[#fbf9f3] px-4 focus-within:border-[#77917d] focus-within:ring-2 focus-within:ring-[#7f9a82]/20">

<Search size={18} className="shrink-0 text-[#70816e]" />

<input value={query} onChange={(event) => setQuery(event.target.value)} className="h-full w-full bg-transparent text-[13px] outline-none placeholder:text-[#9a9e91]" placeholder="Try bakery, dinner, Juniper…" aria-label="Search meals, kitchens, or neighborhoods" data-testid="input-search-meals" />

{query && <button onClick={() => setQuery('')} className="rounded-full p-1 text-[#6f786b] hover:bg-[#eee8da]" aria-label="Clear search" data-testid="button-clear-search"><X size={15} /></button>}

</label>

<label className="flex h-[54px] items-center gap-2 rounded-xl border border-[#dcd5c7] bg-[#fbf9f3] px-4 text-[12px] font-semibold text-[#465b4b]">

<MapPin size={15} className="text-[#b8664e]" />

<select aria-label="Choose neighborhood" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} className="min-w-[157px] cursor-pointer bg-transparent pr-1 outline-none" data-testid="select-neighborhood">

{['All neighborhoods', 'East Village', 'North Park', 'Old Town'].map((area) => <option key={area}>{area}</option>)}

</select>

</label>

</div>

<div className="mt-5 flex flex-wrap items-center justify-between gap-4">

<div className="flex flex-wrap gap-2" role="group" aria-label="Filter by meal category">

{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-[11px] font-bold transition ${category === item ? 'bg-[#244a3a] text-[#faf7ef]' : 'border border-[#dcd5c7] bg-[#f7f4eb] text-[#536253] hover:border-[#819684]'}`} aria-pressed={category === item} data-testid={`filter-category-${item.toLowerCase()}`}>{item}</button>)}

</div>

<span className="text-[11px] text-[#8a8c7e]" data-testid="text-listing-count">{filteredMeals.length} illustrative finds</span>

</div>

{filteredMeals.length ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

{filteredMeals.map((meal, index) => <article key={meal.id} className={`meal-card overflow-hidden rounded-[17px] border border-[#e3ddcf] bg-[#fbf9f3] ${index % 2 ? 'delay-1' : ''}`} data-testid={`card-meal-${meal.id}`}>

<div className="relative h-[198px] overflow-hidden" style={{ backgroundColor: meal.tint }}>

<img src={meal.image} alt="" className="meal-photo h-full w-full object-cover" style={{ objectPosition: `${22 + meal.id * 14}% center`, filter: `hue-rotate(${meal.id * 17}deg) saturate(.82)` }} />

<div className="absolute inset-0 bg-gradient-to-t from-[#25392b]/25 to-transparent" />

<button onClick={() => setSaved((current) => current.includes(meal.id) ? current.filter((id) => id !== meal.id) : [...current, meal.id])} aria-label={saved.includes(meal.id) ? `Unsave ${meal.title}` : `Save ${meal.title}`} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${saved.includes(meal.id) ? 'bg-[#b8664e] text-white' : 'bg-[#fbf8ef]/90 text-[#385342] hover:bg-white'}`} data-testid={`button-save-meal-${meal.id}`}><Heart size={16} fill={saved.includes(meal.id) ? 'currentColor' : 'none'} /></button>

</div>

<div className="p-4">

<div className="flex items-center justify-between gap-2"><span className="eyebrow text-[8px] text-[#a66a50]">{meal.category} · {meal.area}</span><span className="inline-flex items-center gap-1 text-[9px] text-[#788072]"><Clock3 size={11} /> Today</span></div>

<h3 className="serif mt-2.5 min-h-[48px] text-[21px] leading-[1.1] tracking-[-.025em]">{meal.title}</h3>

<p className="mt-1 text-[11px] text-[#777d70]">from <strong className="font-semibold text-[#435b4a]">{meal.shop}</strong></p>

{/* Adding Plus icon */}

<button onClick={() => addToCart(meal)} className='absolute right-4 bottom-18 grid h-8 w-8 place-items-center rounded-full backdrop-blur transition bg-[#f5f5f5]/90 text-[#385342] hover:bg-[#c2bfba]'><svg

xmlns="http://www.w3.org/2000/svg"

className="h-4 w-4"

viewBox="0 0 24 24"

fill="none"

stroke="currentColor"

strokeWidth="2"

strokeLinecap="round"

strokeLinejoin="round"

>

<path d="M12 5v14M5 12h14" />

</svg></button>

<div className="mt-4 flex items-center justify-between border-t border-[#e6e0d3] pt-3.5">

<div className="flex items-baseline gap-2"><span className="serif text-[23px]">{meal.price}</span><span className="text-[11px] text-[#a3a092] line-through">{meal.original}</span></div>

<button onClick={() => { setSelectedMeal(meal); setModal('meal'); }} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#315341] hover:text-[#b8664e]" data-testid={`button-meal-details-${meal.id}`}>A closer look <ArrowRight size={13} /></button>

</div>

</div>

</article>)}

</div> : <div className="mt-7 rounded-2xl border border-dashed border-[#cfc7b7] bg-[#f1ecdf] px-6 py-14 text-center" data-testid="empty-meals">

<Search size={23} className="mx-auto text-[#9a7259]" />

<h3 className="serif mt-4 text-2xl">No finds just yet.</h3><p className="mt-2 text-sm text-[#748071]">Try another search or neighborhood. The good stuff moves around.</p>

<button onClick={() => { setQuery(''); setCategory('Everything'); setNeighborhood('All neighborhoods'); }} className="mt-5 rounded-full border border-[#899985] px-4 py-2 text-xs font-bold hover:bg-[#e7e4d8]" data-testid="button-reset-filters">Clear filters</button>

</div>}

<p className="mt-5 text-[10px] leading-relaxed text-[#8a8b7f]">These are illustrative examples, not live offers. Availability, prices, ordering, and pickup are not operational on this site.</p>

</div>

</section>

<section id="how-it-works" className="scroll-mt-4 bg-[#eae5d8] py-24">

<div className="page-wrap">

<div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr]">

<div>

<SectionLabel>GOOD SENSE, GOOD FOOD</SectionLabel>

<h2 className="serif mt-4 max-w-[490px] text-[clamp(2.8rem,5vw,4.2rem)] leading-[.98] tracking-[-.055em]">Keep the good<br />in the <span className="italic text-[#b8664e]">neighborhood.</span></h2>

<p className="mt-5 max-w-[390px] text-[14px] leading-[1.8] text-[#647064]">We imagine a simple local loop: cooks make too much, nearby folks enjoy it, and community partners can receive what’s still good to share.</p>

<button onClick={() => scrollTo('discover')} className="mt-7 inline-flex items-center gap-2 border-b border-[#486350] pb-1.5 text-[12px] font-bold text-[#345542] hover:text-[#b8664e]" data-testid="button-how-browse">Explore the meal side <ArrowRight size={14} /></button>

</div>

<div className="grid gap-3 sm:grid-cols-3">

{[

{ n: '01', icon: <Search size={18} />, title: 'Find what’s nearby', text: 'A small window into surplus from kitchens around your block.' },

{ n: '02', icon: <Utensils size={18} />, title: 'Enjoy for less', text: 'A good meal at a kinder price, with its story still intact.' },

{ n: '03', icon: <Heart size={18} />, title: 'Keep food moving', text: 'Restaurants can share suitable surplus with local organizations, too.' },

].map((step) => <article key={step.n} className="flex min-h-[230px] flex-col rounded-[16px] border border-[#d7d0c1] bg-[#f6f2e8] p-5">

<div className="flex items-center justify-between"><span className="eyebrow text-[9px] text-[#b8664e]">STEP {step.n}</span><span className="text-[#385744]">{step.icon}</span></div>

<h3 className="serif mt-1 pt-8 text-[32px] leading-[1.08]">{step.title}</h3>

<p className="mt-2 text-[11px] leading-[1.65] text-[#747a6d]">{step.text}</p>

</article>)}

</div>

</div>

</div>

</section>

<section className="relative overflow-hidden bg-[#25493a] py-24 text-[#f7f3e8] sm:py-28">

<div className="absolute -right-24 -top-36 h-[460px] w-[460px] rounded-full border border-white/10" /><div className="absolute -right-4 -top-16 h-[310px] w-[310px] rounded-full border border-white/10" />

<div className="page-wrap relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">

<div className="max-w-[520px]">

<SectionLabel inverse>FOR RESTAURANTS & COMMUNITY PARTNERS</SectionLabel>

<h2 className="serif mt-5 text-[clamp(2.8rem,5vw,4.5rem)] leading-[.96] tracking-[-.055em]">Your surplus<br />has <span className="italic text-[#e3b278]">somewhere</span><br />good to go.</h2>

<p className="mt-6 max-w-[440px] text-[14px] leading-[1.8] text-[#d0d8cb]">When a meal is better shared than left behind, restaurants can connect with local charities and community organizations. Thoughtfully, on their terms.</p>

<button onClick={openPartner} className="button-lift mt-8 inline-flex items-center gap-3 rounded-full bg-[#e4b47b] px-6 py-4 text-[12px] font-bold text-[#234536]" data-testid="button-charity-connect">Explore the sharing path <ArrowUpRight size={15} /></button>

</div>

<div className="relative">

<div className="absolute -left-5 top-10 hidden h-[88%] w-12 rounded-[25px] border border-[#dec597]/40 lg:block" />

<div className="relative rounded-[28px] border border-white/15 bg-[#315745] p-7 sm:p-9">

<div className="flex items-center justify-between border-b border-white/15 pb-5">

<div><span className="eyebrow text-[9px] text-[#dfb983]">A DIFFERENT KIND OF CONNECTION</span><h3 className="serif mt-2 text-[25px]">From kitchen to community</h3></div>

<span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-[#e5bd87]"><Heart size={19} /></span>

</div>

<div className="mt-7 space-y-5">

{[

{ label: 'A neighborhood kitchen', detail: 'Has safe, suitable surplus to share', icon: <Utensils size={16} /> },

{ label: 'A local organization', detail: 'Knows its community’s needs', icon: <MapPin size={16} /> },

{ label: 'A thoughtful handoff', detail: 'Coordinated directly, with care', icon: <ArrowRight size={16} /> },

].map((item, index) => <div key={item.label} className="flex items-center gap-4">

<span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${index === 1 ? 'bg-[#e1b27a] text-[#234536]' : 'border border-white/20 text-[#e1b27a]'}`}>{item.icon}</span>

<div className="flex-1"><div className="text-[12px] font-bold">{item.label}</div><div className="mt-1 text-[10px] text-[#c3d0c2]">{item.detail}</div></div>

{index < 2 && <span className="mr-2 h-6 border-l border-dashed border-white/30" />}

</div>)}

</div>

<div className="mt-7 flex items-start gap-3 rounded-xl bg-[#25493a]/70 p-4 text-[10px] leading-[1.6] text-[#d4dfd1]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#e2b77e]" /> Seva Plate is exploring this connection. No donation pickups or charity deliveries are arranged through this demo site.</div>

</div>

</div>

</div>

</section>

<section id="community" className="scroll-mt-5 py-24 sm:py-28">

<div className="page-wrap">

<div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr]">

<div className="max-w-[430px]">

<SectionLabel>A LOCAL IDEA, WITH ROOM TO GROW</SectionLabel>

<h2 className="serif mt-4 text-[clamp(2.7rem,5vw,4rem)] leading-[.98] tracking-[-.05em]">Built around<br />the people who<br /><span className="italic text-[#b8664e]">make a place.</span></h2>

<p className="mt-5 text-[14px] leading-[1.8] text-[#687466]">The baker up early. The cook who knows the market. The community group that knows its neighbors. Seva Plate is a first step toward making those local connections easier.</p>

</div>

<div className="grid gap-4 sm:grid-cols-2">

<article className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#d7c8ab] p-6 text-[#264637]">

<div className="absolute -right-6 -top-10 h-48 w-48 rounded-full border border-[#294b3a]/20" /><div className="absolute -right-1 top-4 h-28 w-28 rounded-full border border-[#294b3a]/20" />

<div className="relative flex items-center justify-between"><span className="eyebrow text-[9px]">A BETTER EVERYDAY</span><span className="serif text-[30px] italic">01</span></div>

<div className="relative"><h3 className="serif text-[29px] leading-[1.05]">A good meal,<br />not a grand gesture.</h3><p className="mt-3 max-w-[260px] text-[11px] leading-[1.7] text-[#516858]">A practical choice for dinner. A small kindness to the food that brought you here.</p></div>

</article>

<article className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#d5ded0] p-6 text-[#264637] sm:mt-10">

<div className="absolute -right-3 -top-4 h-40 w-40 rounded-full border border-[#294b3a]/20" /><div className="absolute right-7 top-7 h-24 w-24 rounded-full border border-[#294b3a]/20" />

<div className="relative flex items-center justify-between"><span className="eyebrow text-[9px]">A LOCAL LOOP</span><span className="serif text-[30px] italic">02</span></div>

<div className="relative"><h3 className="serif text-[29px] leading-[1.05]">More of the good<br />stays close.</h3><p className="mt-3 max-w-[260px] text-[11px] leading-[1.7] text-[#516858]">Meals, makers, and community partners belong in the same neighborhood story.</p></div>

</article>

</div>

</div>

</div>

</section>

<section className="px-4 pb-20">

<div className="page-wrap grain relative overflow-hidden rounded-[28px] bg-[#d6a66f] px-7 py-12 text-center text-[#244637] sm:px-12 sm:py-16">

<div className="relative z-10 mx-auto max-w-[650px]">

<span className="eyebrow text-[9px] text-[#795c3c]">A SMALL START, A WARM INVITATION</span>

<h2 className="serif mt-4 text-[clamp(2.7rem,5vw,4.4rem)] leading-[.95] tracking-[-.055em]">Good things are better<br className="hidden sm:block" /> when they stay local.</h2>

<p className="mx-auto mt-4 max-w-[390px] text-[13px] leading-[1.75] text-[#455a46]">Come see what a neighborhood food loop could look like—for diners, kitchens, and the people who care for one another.</p>

<div className="mt-7 flex flex-wrap justify-center gap-3">

<button onClick={() => scrollTo('discover')} className="button-lift inline-flex items-center gap-2 rounded-full bg-[#244a3a] px-5 py-3.5 text-[12px] font-bold text-[#faf7ef]" data-testid="button-cta-discover">See sample meals <ArrowRight size={14} /></button>

<button onClick={openPartner} className="rounded-full border border-[#56705a] px-5 py-3.5 text-[12px] font-bold text-[#294736] hover:bg-white/20" data-testid="button-cta-partner">I’m a restaurant or community partner</button>

</div>

</div>

</div>

</section>

</main>

{cart.length > 0 && (
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#244a3a] px-6 py-3.5 text-white shadow-xl transition-all">
        <ShoppingBag size={18} />
        <span className="text-xs font-bold">{cart.length} {cart.length === 1 ? 'item' : 'items'} · ₹{cartTotal}</span>
        <button 
          onClick={() => { setCheckoutSubmitted(false); setModal('checkout'); }} 
          className="ml-2 rounded-full bg-[#e4b47b] px-4 py-1.5 text-[11px] font-bold text-[#203d32] hover:bg-white transition"
        >
          View Tray & Checkout
        </button>
      </div>
    )}



<footer className="bg-[#203f32] text-[#f7f2e6]">

<div className="page-wrap grid gap-9 py-11 sm:grid-cols-[1fr_auto] sm:items-end">

<div><Brand light /><p className="mt-4 max-w-[345px] text-[11px] leading-[1.7] text-[#c2cfc1]">A neighborhood-minded idea for good meals and thoughtful food sharing.</p></div>

<div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold text-[#e0e2d4]">

<button onClick={() => scrollTo('discover')} className="hover:text-[#e6b77b]" data-testid="footer-link-meals">Find a meal</button>

<button onClick={openPartner} className="hover:text-[#e6b77b]" data-testid="footer-link-partners">For partners</button>

<button onClick={() => scrollTo('how-it-works')} className="hover:text-[#e6b77b]" data-testid="footer-link-about">How it works</button>

</div>

</div>

<div className="border-t border-white/15"><div className="page-wrap flex flex-col justify-between gap-2 py-4 text-[9px] text-[#b7c6b7] sm:flex-row"><span>© 2025 Seva Plate. A neighborhood idea in progress.</span><span>Illustrative demo only · No real-time listings or transactions</span></div></div>

</footer>

{modal && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#172b22]/60 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}>

<div className="relative my-auto w-full max-w-[510px] rounded-[24px] border border-[#e0d9ca] bg-[#f8f5ec] p-6 shadow-[0_24px_80px_rgba(14,32,23,.28)] sm:p-9" role="dialog" aria-modal="true" aria-labelledby="dialog-title">

<button onClick={() => setModal(null)} aria-label="Close dialog" className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#d9d2c4] hover:bg-[#eee8da]" data-testid="button-close-dialog"><X size={17} /></button>

{modal === 'partner' ? submitted ? <div className="py-7 text-center" data-testid="partner-success">

<span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#dce6d7] text-[#315742]"><Check size={25} /></span><h2 id="dialog-title" className="serif mt-5 text-[34px] tracking-[-.04em]">Thanks for raising a hand.</h2><p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-[1.7] text-[#667365]">Our team will verify your restaurant in about 48-72 hrs.</p><button onClick={() => setModal(null)} className="mt-6 rounded-full bg-[#244a3a] px-6 py-3 text-xs font-bold text-white" data-testid="button-dismiss-success">Back to Seva Plate</button>

</div> : <div>

<SectionLabel>LET’S MAKE A LOCAL CONNECTION</SectionLabel>

<h2 id="dialog-title" className="serif mt-3 pr-8 text-[35px] leading-[1.02] tracking-[-.045em]">Good surplus?<br /><span className="italic text-[#b8664e]">Let’s talk it through.</span></h2>

<p className="mt-4 max-w-[400px] text-[12px] leading-[1.7] text-[#687466]">For restaurants considering sharing unsold food, or community organizations exploring local partnerships. This is an interest form preview only.</p>

<form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="mt-6 space-y-4">

<label className="block text-[11px] font-bold text-[#455c4a]">I’m here as a

<select required defaultValue="" className="mt-2 block h-12 w-full rounded-xl border border-[#dcd5c7] bg-[#fbf9f3] px-3 text-[12px] font-medium outline-none focus:border-[#66826c]" data-testid="select-partner-type"><option value="" disabled>Choose one</option><option>Restaurant or food business</option><option>Charity or community organization</option><option>Something else</option></select>

</label>

<label className="block text-[11px] font-bold text-[#455c4a]">Name or organization

<input required placeholder="The name you go by" className="mt-2 block h-12 w-full rounded-xl border border-[#dcd5c7] bg-[#fbf9f3] px-3 text-[12px] font-medium outline-none placeholder:text-[#a5a294] focus:border-[#66826c]" data-testid="input-partner-name" />

</label>

<label className="block text-[11px] font-bold text-[#455c4a]">Neighborhood

<input required placeholder="Where are you based?" className="mt-2 block h-12 w-full rounded-xl border border-[#dcd5c7] bg-[#fbf9f3] px-3 text-[12px] font-medium outline-none placeholder:text-[#a5a294] focus:border-[#66826c]" data-testid="input-partner-neighborhood" />

</label>

<button type="submit" className="button-lift mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#244a3a] text-[12px] font-bold text-[#faf7ef]" data-testid="button-submit-partner">Share your interest <ArrowRight size={14} /></button>

<p className="text-center text-[9px] leading-relaxed text-[#8a8b7f]">Demo only. Nothing is sent, and no donation or pickup is arranged.</p>

</form>

</div> : <div>

<h2 id="dialog-title" className="serif mt-4 pr-8 text-[35px] leading-[1.02] tracking-[-.045em]">{selectedMeal?.title}</h2>

<p className="mt-2 text-[12px] text-[#687466]">{selectedMeal?.shop} · {selectedMeal?.area}</p>

<div className="mt-6 rounded-2xl bg-[#eae4d7] p-5"><p className="text-[13px] leading-[1.8] text-[#4d6252]">{selectedMeal?.note}</p><div className="mt-5 flex items-center justify-between border-t border-[#d5cebf] pt-4"><span className="inline-flex items-center gap-2 text-[11px] text-[#677367]"><Clock3 size={14} />{selectedMeal?.time}</span><div className="text-right"><span className="serif text-2xl">{selectedMeal?.price}</span><span className="ml-2 text-[10px] text-[#8c8e81] line-through">{selectedMeal?.original}</span></div></div></div>

<button onClick={() => setModal(null)} className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold text-[#365644] hover:text-[#b8664e]" data-testid="button-close-meal"><ArrowLeft size={14} /> Back to listings</button>

</div>}

{modal === 'checkout' && (
  checkoutSubmitted ? (
    <div className="py-7 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#dce6d7] text-[#315742]">
        <Check size={25} />
      </span>
      <h2 className="serif mt-5 text-[30px] text-[#203d32]">Order Reserved!</h2>
      <p className="mt-2 text-xs leading-[1.6] text-[#667365]">
        Your neighborhood finds have been locked in. Head over during the pickup windows.
      </p>
      <button 
        onClick={() => { setCart([]); setModal(null); }} 
        className="mt-6 rounded-full bg-[#244a3a] px-6 py-3 text-xs font-bold text-white transition hover:bg-black"
      >
        Done
      </button>
    </div>
  ) : (
    <div>
      <SectionLabel>YOUR TRAY</SectionLabel>
      <h2 className="serif mt-2 text-2xl text-[#203d32]">Ready for checkout</h2>
      
      {/* Items list */}
      <div className="mt-4 max-h-60 overflow-y-auto space-y-3 pr-1">
        {cart.length === 0 ? (
          <p className="py-4 text-center text-xs text-[#777d70]">Your tray is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#e3ddcf] bg-[#fbf9f3] p-3 text-xs">
              <div>
                <div className="font-bold text-[#203d32]">{item.title}</div>
                <div className="text-[10px] text-[#777d70]">from {item.shop}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#203d32]">{item.price}</span>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label={`Remove ${item.title}`}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pricing Total */}
      <div className="mt-5 border-t border-[#e6e0d3] pt-4 flex items-center justify-between">
        <span className="font-semibold text-sm text-[#203d32]">Total</span>
        <span className="serif text-xl text-[#203d32]">₹{cartTotal}</span>
      </div>

      {/* Action Button */}
      <button 
        disabled={cart.length === 0}
        onClick={() => setCheckoutSubmitted(true)} 
        className="mt-6 w-full rounded-full bg-[#244a3a] py-3.5 text-xs font-bold text-white transition hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Reservation
      </button>
    </div>
  )
)}



</div>

</div>}

</div>;

}

export default App;

