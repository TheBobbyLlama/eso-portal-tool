const zoneData = [
	{
		id: 1,
		name: "Mara's Kiss Inn Room",
		size: "Inn Room",
		style: "Altmer",
	},
	{
		id: 2,
		name: "The Rosy Lion",
		size: "Inn Room",
		style: "Breton",
		icon: "https://images.uesp.net/e/ec/ON-icon-house-The_Rosy_Lion_%28room%29.png",
		link: "https://en.uesp.net/wiki/Online:The_Rosy_Lion_(room)",
	},
	{
		id: 3,
		name: "The Ebony Flask Inn Room",
		size: "Inn Room",
		style: "Dunmer",
	},
	{
		id: 4,
		name: "Barbed Hook Private Room",
		size: "Apartment",
		style: "Altmer",
	},
	{
		id: 5,
		name: "Sisters of the Sands Apartment",
		size: "Apartment",
		style: "Redguard",
	},
	{
		id: 6,
		name: "Flaming Nix Deluxe Garret",
		size: "Apartment",
		style: "Dunmer",
	},
	{
		id: 7,
		name: "Black Vine Villa",
		size: "Small House",
		style: "Altmer",
	},
	{
		id: 8,
		name: "Cliffshade",
		size: "Medium House",
		style: "Altmer",
	},
	{
		id: 9,
		name: "Mathiisen Manor",
		size: "Large House",
		style: "Dunmer",
	},
	{
		id: 10,
		name: "Humblemud",
		size: "Small House",
		style: "Argonian",
	},
	{
		id: 11,
		name: "The Ample Domicile",
		size: "Medium House",
		style: "Argonian",
	},
	{
		id: 12,
		name: "Stay-Moist Mansion",
		size: "Large House",
		style: "Argonian",
	},
	{
		id: 13,
		name: "Snugpod",
		size: "Small House",
		style: "Bosmer",
	},
	{
		id: 14,
		name: "Bouldertree Refuge",
		size: "Medium House",
		style: "Bosmer",
	},
	{
		id: 15,
		name: "The Gorinir Estate",
		size: "Large House",
		style: "Bosmer",
	},
	{
		id: 16,
		name: "Captain Margaux's Place",
		map: "glenumbra_base",
		size: "Small House",
		style: "Breton",
	},
	{
		id: 17,
		name: "Ravenhurst",
		map: "rivenspire_base",
		size: "Medium House",
		style: "Breton",
	},
	{
		id: 18,
		name: "Gardner House",
		map: "wayrest_base",
		size: "Large House",
		style: "Breton",
	},
	{
		id: 19,
		name: "Kragenhome",
		size: "Small House",
		style: "Dunmer",
	},
	{
		id: 20,
		name: "Velothi Reverie",
		size: "Medium House",
		style: "Dunmer",
	},
	{
		id: 21,
		name: "Quondam Indorilia",
		size: "Large House",
		style: "Dunmer",
	},
	{
		id: 22,
		name: "Moonmirth House",
		size: "Small House",
		style: "Khajiit",
	},
	{
		id: 23,
		name: "Sleek Creek House",
		size: "Medium House",
		style: "Khajiit",
	},
	{
		id: 24,
		name: "Dawnshadow",
		size: "Large House",
		style: "Khajiit",
	},
	{
		id: 25,
		name: "Cyrodiilic Jungle House",
		size: "Small House",
		style: "Imperial",
	},
	{
		id: 26,
		name: "Domus Phrasticus",
		size: "Medium House",
		style: "Imperial",
	},
	{
		id: 27,
		name: "Strident Springs Demesne",
		size: "Large House",
		style: "Imperial",
	},
	{
		id: 28,
		name: "Autumn's-Gate",
		map: "therift_base",
		size: "Small House",
		style: "Nord",
	},
	{
		id: 29,
		name: "Grymharth's Woe",
		size: "Medium House",
		style: "Nord",
	},
	{
		id: 30,
		name: "Old Mistveil Manor",
		size:"Large House",
		style: "Nord",
	},
	{
		id: 31,
		name: "Hammerdeath Bungalow",
		size: "Small House",
		style: "Orc",
	},
	{
		id: 32,
		name: "Mournoth Keep",
		size: "Medium House",
		style: "Orc",
	},
	{
		id: 33,
		name: "Forsaken Stronghold",
		size: "Large House",
		style: "Orc",
	},
	{
		id: 34,
		name: "Twin Arches",
		size: "Small House",
		style: "Redguard",
	},
	{
		id: 35,
		name: "House of the Silent Magnifico",
		size: "Medium House",
		style: "Redguard",
	},
	{
		id: 36,
		name: "Hunding's Palatial Hall",
		size: "Large House",
		style: "Redguard",
	},
	{
		id: 37,
		name: "Serenity Falls Estate",
		size: "Manor",
		style: "Khajiit",
	},
	{
		id: 38,
		name: "Daggerfall Overlook",
		size: "Manor",
		style: "Breton",
	},
	{
		id: 39,
		name: "Ebonheart Chateau",
		size: "Manor",
		style: "Dunmer",
	},
	{
		id: 40,
		name: "Grand Topal Hideaway",
		map: "grandtopal_base",
		size: "Manor",
		style: "Argonian",
	},
	{
		id: 41,
		name: "Earthtear Cavern",
		size: "Manor",
		style: "Redguard",
	},
	{
		id: 42,
		name: "Saint Delyn Penthouse",
		size: "Inn Room",
		style: "Dunmer",
	},
	{
		id: 43,
		name: "Amaya Lake Lodge",
		size: "Large House",
		style: "Dunmer",
	},
	{
		id: 44,
		name: "Ald Velothi Harbor House",
		size: "Medium House",
		style: "Dunmer",
	},
	{
		id: 45,
		name: "Tel Galen",
		size: "Manor",
		style: "Dunmer",
	},
	{
		id: 46,
		name: "Linchal Grand Manor",
		size: "Manor",
		style: "Imperial",
	},
	{
		id: 47,
		name: "Coldharbour Surreal Estate",
		map: "coldharbour_base",
		size: "Manor",
		style: "Other",
	},
	{
		id: 48,
		name: "Hakkvild's High Hall",
		map: "falkreathhousing_base",
		size: "Manor",
		style: "Nord",
	},
	{
		id: 49,
		name: "Exorcised Coven Cottage",
		size: "Medium House",
		style: "Other",
	},
	{
		id: 54,
		name: "Pariah's Pinnacle",
		size: "Manor",
		style: "Orc",
	},
	{
		id: 55,
		name: "The Observatory Prior",
		size: "Manor",
		style: "Other",
	},
	{
		id: 56,
		name: "The Erstwhile Sanctuary",
		size: "Manor",
		style: "Other",
	},
	{
		id: 57,
		name: "Princely Dawnlight Palace",
		size: "Manor",
		style: "Redguard",
	},
	{
		id: 58,
		name: "Golden Gryphon Garret",
		size: "Inn Room",
		style: "Altmer",
	},
	{
		id: 59,
		name: "Alinor Crest Townhouse",
		size: "Large House",
		style: "Altmer",
	},
	{
		id: 60,
		name: "Colossal Aldmeri Grotto",
		size: "Manor",
		style: "Altmer",
	},
	{
		id: 61,
		name: "Hunter's Glade",
		size: "Manor",
		style: "Other",
	},
	{
		id: 62,
		name: "Grand Psijic Villa",
		size: "Manor",
		style: "Altmer",
	},
	{
		id: 63,
		name: "Enchanted Snow Globe Home",
		map: "snowglobe_base",
		size: "Large House",
		style: "Imperial",
	},
	{
		id: 64,
		name: "Lakemire Xanmeer Manor",
		size: "Manor",
		style: "Argonian",
	},
	{
		id: 65,
		name: "Frostvault Chasm",
		size: "Medium House",
		style: "Other",
	},
	{
		id: 66,
		name: "Elinhir Private Arena",
		size: "Manor",
		style: "Imperial",
	},
	{
		id: 68,
		name: "Sugar Bowl Suite",
		size: "Inn Room",
		style: "Khajiit",
	},
	{
		id: 69,
		name: "Jode's Embrace",
		size: "Manor",
		style: "Khajiit",
	},
	{
		id: 70,
		name: "Hall of the Lunar Champion",
		size: "Manor",
		style: "Khajiit",
	},
	{
		id: 71,
		name: "Moonsugar Meadow",
		map: "moonsugarmeadow_base",
		size: "Manor",
		style: "Khajiit",
	},
	{
		id: 72,
		name: "Wraithhome",
		size: "Manor",
		style: "Other",
	},
	{
		id: 73,
		name: "Lucky Cat Landing",
		size: "Medium House",
		style: "Khajiit",
	},
	{
		id: 74,
		name: "Potentate's Retreat",
		size: "Manor",
		style: "Khajiit",
	},
	{
		id: 75,
		name: "Forgemaster's Falls",
		map: "forgemastersfalls_base",
		size: "Large House",
		style: "Orc",
	},
	{
		id: 76,
		name: "Thieves' Oasis",
		size: "Manor",
		style: "Redguard",
	},
	{
		id: 77,
		name: "Snowmelt Suite",
		size: "Inn Room",
		style: "Nord",
	},
	{
		id: 78,
		name: "Proudspire Manor",
		size: "Large House",
		style: "Nord",
	},
	{
		id: 79,
		name: "Bastion Sanguinaris",
		size: "Manor",
		style: "Other",
	},
	{
		id: 80,
		name: "Stillwaters Retreat",
		size: "Manor",
		style: "Other",
	},
	{
		id: 81,
		name: "Antiquarian's Alpine Gallery",
		map: "antiquariansalpineext_base",
		size: "Large House",
		style: "Nord",
	},
	{
		id: 82,
		name: "Shalidor's Shrouded Realm",
		size: "Manor",
		style: "Nord",
	},
	{
		id: 83,
		name: "Stone Eagle Aerie",
		size: "Manor",
		style: "Other",
	},
	{
		id: 85,
		name: "Kushalit Sanctuary",
		size: "Manor",
		style: "Other",
	},
	{
		id: 86,
		name: "Varlaisvea Ayleid Ruins",
		size: "Manor",
		style: "Other",
	},
	{
		id: 87,
		name: "Pilgrim's Rest",
		size: "Inn Room",
		style: "Imperial",
	},
	{
		id: 88,
		name: "Water's Edge",
		size: "Large House",
		style: "Imperial",
	},
	{
		id: 89,
		name: "Pantherfang Chapel",
		size: "Manor",
		style: "Imperial",
	},
	{
		id: 90,
		name: "Doomchar Plateau",
		size: "Manor",
		style: "Other",
	},
	{
		id: 91,
		name: "Sweetwater Cascades",
		size: "Manor",
		style: "Imperial",
	},
	{
		id: 92,
		name: "Ossa Accentium",
		size: "Manor",
		style: "Other",
	},
	{
		id: 93,
		name: "Agony's Ascent",
		size: "Manor",
		style: "Other",
	},
	{
		id: 94,
		name: "Seaveil Spire",
		size: "Manor",
		style: "Other",
	},
	{
		id: 95,
		name: "Ancient Anchor Berth",
		size: "Inn Room",
		style: "Breton",
	},
	{
		id: 96,
		name: "Highhallow Hold",
		size: "Manor",
		style: "Breton",
	},
	// ZONE SECTION - IDs will be assigned programmatically!
	{
		name: "Alik'r Desert",
		size: "Zone",
		style: "Redguard",
	},
	{
		name: "Artaeum",
		size: "Zone",
		style: "Other",
	},
	{
		name: "Auridon",
		size: "Zone",
		style: "Altmer",
	},
	{
		name: "Bal Foyen",
		size: "Zone",
		style: "Dunmer",
	},
	{
		name: "Bangkorai",
		size: "Zone",
		style: "Breton",
	},
	{
		name: "Betnikh",
		size: "Zone",
		style: "Orc",
	},
	{
		name: "Blackreach: Greymoor Caverns",
		size: "Zone",
		style: "Other",
	},
	{
		name: "Blackwood",
		size: "Zone",
		style: "Imperial",
	},
	{
		name: "Bleackrock Isle",
		size: "Zone",
		style: "Nord",
	},
	{
		name: "Clockwork City",
		size: "Zone",
		style: "Other",
	},
	{
		name: "Coldharbour",
		size: "Zone",
		style: "Other",
	},
	{
		name: "Craglorn",
		size: "Zone",
		style: "Redguard",
	},
	{
		name: "Deshaan",
		size: "Zone",
		style: "Dunmer",
	},
	{
		name: "Eastmarch",
		size: "Zone",
		style: "Nord",
	},
	{
		name: "Fargrave",
		size: "Zone",
		style: "Other",
	},
	{
		name: "Galen",
		size: "Zone",
		style: "Breton",
	},
	{
		name: "Glenumbra",
		size: "Zone",
		style: "Breton",
	},
	{
		name: "Gold Coast",
		size: "Zone",
		style: "Imperial",
	},
	{
		name: "Grahtwood",
		size: "Zone",
		style: "Bosmer",
	},
	{
		name: "Greenshade",
		size: "Zone",
		style: "Bosmer",
	},
	{
		name: "Hew's Bane",
		size: "Zone",
		style: "Redguard",
	},
	{
		name: "High Isle",
		size: "Zone",
		style: "Breton",
	},
	{
		name: "Khenarthi's Roost",
		size: "Zone",
		style: "Khajiit",
	},
	{
		name: "Malabal Tor",
		size: "Zone",
		style: "Bosmer",
	},
	{
		name: "Murkmire",
		size: "Zone",
		style: "Argonian",
	},
	{
		name: "Northern Elsweyr",
		size: "Zone",
		style: "Khajiit",
	},
	{
		name: "Reaper's March",
		size: "Zone",
		style: "Khajiit",
	},
	{
		name: "Rivenspire",
		size: "Zone",
		style: "Breton",
	},
	{
		name: "Shadowfen",
		size: "Zone",
		style: "Argonian",
	},
	{
		name: "Southern Elsweyr",
		size: "Zone",
		style: "Khajiit",
	},
	{
		name: "Stonefalls",
		size: "Zone",
		style: "Dunmer",
	},
	{
		name: "Stormhaven",
		size: "Zone",
		style: "Breton",
	},
	{
		name: "Stros M'Kai",
		size: "Zone",
		style: "Redguard",
	},
	{
		name: "Summerset",
		size: "Zone",
		style: "Altmer",
	},
	{
		name: "The Deadlands",
		size: "Zone",
		style: "Other",
	},
	{
		name: "The Reach",
		size: "Zone",
		style: "Other",
	},
	{
		name: "The Rift",
		size: "Zone",
		style: "Nord",
	},
	{
		name: "Vvardenfell",
		size: "Zone",
		style: "Dunmer",
	},
	{
		name: "Western Skyrim",
		map: "westernskryim_base",
		size: "Zone",
		style: "Nord",
	},
	{
		name: "Wrothgar",
		size: "Zone",
		style: "Orc",
	},
];

export { zoneData };

const sizeData = {
	"Inn Room": {
		furnishings: {
			traditional: 15,
			special: 1,
			collectible: 1,
		},
		specialCollectibles: 1,
		playerCap: 2,
	},
	Apartment: {
		furnishings: {
			traditional: 50,
			special: 1,
			collectible: 1,
		},
		specialCollectibles: 1,
		playerCap: 6,
	},
	"Small House": {
		furnishings: {
			traditional: 100,
			special: 2,
			collectible: 5,
		},
		specialCollectibles: 2,
		playerCap: 6,
	},
	"Medium House": {
		furnishings: {
			traditional: 200,
			special: 3,
			collectible: 10,
		},
		specialCollectibles: 3,
		playerCap: 12,
	},
	"Large House": {
		furnishings: {
			traditional: 300,
			special: 4,
			collectible: 20,
		},
		specialCollectibles: 4,
		playerCap: 12,
	},
	"Manor": {
		furnishings: {
			traditional: 350,
			special: 5,
			collectible: 40,
		},
		specialCollectibles: 5,
		playerCap: 24,
	},
};