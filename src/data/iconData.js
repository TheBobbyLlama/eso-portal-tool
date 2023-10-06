const iconData = [
	{
		name: "Alchemist",
		display: "mapkey_alchemist.png",
		icon: "/esoui/art/icons/mapkey/mapkey_alchemist.dds",
	},
	{
		name: "Altar",
		display: "mapkey_respecaltar.png",
		icon: "/esoui/art/icons/mapkey/mapkey_respecaltar.dds",
	},
	{
		name: "Anchor",
		display: "mapkey_dock.png",
		icon: "/esoui/art/icons/mapkey/mapkey_dock.dds",
	},
	{
		name: "Antiquity",
		display: "mapkey_antiquities.png",
		icon: "/esoui/art/icons/mapkey/mapkey_antiquities.dds",
	},
	{
		name: "Armory",
		display: "servicepin_armory.png",
		icon: "/esoui/art/icons/servicemappins/servicepin_armory.dds",
	},
	{
		name: "Ayleid",
		display: "poi_ayleidruin_complete.png",
		icon: "/esoui/art/icons/poi/poi_ayleidruin_complete.dds"
	},
	{
		name: "Bank",
		display: "mapkey_bank.png",
		icon: "/esoui/art/icons/mapkey/mapkey_bank.dds",
	},
	{
		name: "Banner",
		display: "mapkey_bg_banner.png",
		icon: "/esoui/art/icons/mapkey/mapkey_bg_banner.dds",
	},
	{
		name: "Battleground",
		display: "mapkey_battle.png",
		icon: "/esoui/art/icons/mapkey/mapkey_battle.dds",
	},
	{
		name: "Blacksmith",
		display: "mapkey_smithy.png",
		icon: "/esoui/art/icons/mapkey/mapkey_smithy.dds",
	},
	{
		name: "Bridge",
		display: "mapkey_ava_bridge_passable.png",
		icon: "/esoui/art/icons/mapkey/mapkey_ava_bridge_passable.dds",
	},
	{
		name: "Camp",
		display: "poi_camp_complete.png",
		icon: "/esoui/art/icons/poi/poi_camp_complete.dds",
	},
	{
		name: "Caravan",
		display: "mapkey_caravan.png",
		icon: "/esoui/art/icons/mapkey/mapkey_caravan.dds",
	},
	{
		name: "Cave",
		display: "poi_cave_complete.png",
		icon: "/esoui/art/icons/poi/poi_cave_complete.dds",
	},
	{
		name: "City",
		display: "poi_city_complete.png",
		icon: "/esoui/art/icons/poi/poi_city_complete.dds",
	},
	{
		name: "Coffin",
		display: "poi_cemetary_complete.png",
		icon: "/esoui/art/icons/poi/poi_cemetary_complete.dds",
	},
	{
		name: "Crafting Area",
		display: "mapkey_crafting.png",
		icon: "/esoui/art/icons/mapkey/mapkey_crafting.dds",
	},
	{
		name: "Critic",
		display: "emotecategoryicon_cheersjeers.png",
		icon: "/esoui/art/icons/emotes/emotecategoryicon_cheersjeers.dds",
	},
	{
		name: "Crypt",
		display: "poi_crypt_complete.png",
		icon: "/esoui/art/icons/poi/poi_crypt_complete.dds",
	},
	{
		name: "Daedric",
		display: "poi_daedricruin_complete.png",
		icon: "/esoui/art/icons/poi/poi_daedricruin_complete.dds",
	},
	{
		name: "Dark Anchor",
		display: "mapkey_portal.png",
		icon: "/esoui/art/icons/mapkey/mapkey_portal.dds",
	},
	{
		name: "Dark Brotherhood",
		display: "mapkey_darkbrotherhood.png",
		icon: "/esoui/art/icons/mapkey/mapkey_darkbrotherhood.dds",
	},
	{
		name: "Door",
		display: "door.png",
		icon: "/RoleplayTownPortals/icons/door.dds",
	},
	{
		name: "Door (Big)",
		display: "doorbig.png",
		icon: "/RoleplayTownPortals/icons/doorbig.dds",
	},
	{
		name: "Drink",
		display: "emotecategoryicon_eatdrink.png",
		icon: "/esoui/art/icons/emotes/emotecategoryicon_eatdrink.dds",
	},
	{
		name: "Dungeon",
		display: "mapkey_dungeon.png",
		icon: "/esoui/art/icons/mapkey/mapkey_dungeon.dds",
	},
	{
		name: "Dwemer",
		display: "poi_dwemerruin_complete.png",
		icon: "/esoui/art/icons/poi/poi_dwemerruin_complete.dds",
	},
	{
		name: "Dwemer Lift",
		display: "poi_u26_dwemergear_complete.png",
		icon: "/esoui/art/icons/poi/poi_u26_dwemergear_complete.dds",
	},
	{
		name: "Dye Station",
		display: "mapkey_dyestation.png",
		icon: "/esoui/art/icons/mapkey/mapkey_dyestation.dds",
	},
	{
		name: "Enchanter",
		display: "mapkey_enchanter.png",
		icon: "/esoui/art/icons/mapkey/mapkey_enchanter.dds",
	},
	{
		name: "Entryway",
		display: "mapkey_soloinstance.png",
		icon: "/esoui/art/icons/mapkey/mapkey_soloinstance.dds",
	},
	{
		name: "Entryway (Dangerous)",
		display: "mapkey_solotrial.png",
		icon: "/esoui/art/icons/mapkey/mapkey_solotrial.dds",
	},
	{
		name: "Estate",
		display: "poi_estate_complete.png",
		icon: "/esoui/art/icons/poi/poi_estate_complete.dds",
	},
	{
		name: "Farm",
		display: "mapkey_farm.png",
		icon: "/esoui/art/icons/mapkey/mapkey_farm.dds",
	},
	{
		name: "Fighters Guild",
		display: "mapkey_fightersguild.png",
		icon: "/esoui/art/icons/mapkey/mapkey_fightersguild.dds",
	},
	{
		name: "Flagon",
		display: "mapkey_inn.png",
		icon: "/esoui/art/icons/mapkey/mapkey_inn.dds",
	},
	{
		name: "Furnisher",
		display: "mapkey_furnishings.png",
		icon: "/esoui/art/icons/mapkey/mapkey_furnishings.dds",
	},
	{
		name: "Game Event",
		display: "mapkey_events.png",
		icon: "/esoui/art/icons/mapkey/mapkey_events.dds",
	},
	{
		name: "Gate",
		display: "mapkey_artifactgate_closed.png",
		icon: "/esoui/art/icons/mapkey/mapkey_artifactgate_closed.dds",
	},
	{
		name: "Gate (Open)",
		display: "mapkey_artifactgate_open.png",
		icon: "/esoui/art/icons/mapkey/mapkey_artifactgate_open.dds",
	},
	{
		name: "Gate (Fortified)",
		display: "mapkey_ava_milegate_passable.png",
		icon: "/esoui/art/icons/mapkey/mapkey_ava_milegate_passable.dds"
	},
	{
		name: "Grove",
		display: "poi_grove_complete.png",
		icon: "/esoui/art/icons/poi/poi_grove_complete.dds",
	},
	{
		name: "Hand",
		display: "emotecategoryicon_ceremonial.png",
		icon: "/esoui/art/icons/emotes/emotecategoryicon_ceremonial.dds",
	},
	{
		name: "Handshake",
		display: "emotecategoryicon_social.png",
		icon: "/esoui/art/icons/emotes/emotecategoryicon_social.dds",
	},
	{
		name: "Harp",
		display: "emotecategoryicon_entertain.png",
		icon: "/esoui/art/icons/emotes/emotecategoryicon_entertain.dds",
	},
	{
		name: "House",
		display: "mapkey_housing.png",
		icon: "/esoui/art/icons/mapkey/mapkey_housing.dds",
	},
	{
		name: "Horseshoe",
		display: "poi_horserace_complete.png",
		icon: "/esoui/art/icons/poi/poi_horserace_complete.dds",
	},
	{
		name: "Jeweler",
		display: "mapkey_jewelrycrafting.png",
		icon: "/esoui/art/icons/mapkey/mapkey_jewelrycrafting.dds",
	},
	{
		name: "Lane",
		display: "signpost.png",
		icon: "/RoleplayTownPortals/icons/signpost.dds",
	},
	{
		name: "Leather",
		display: "servicepin_outfitter.png",
		icon: "/esoui/art/icons/servicemappins/servicepin_outfitter.dds",
	},
	{
		name: "Lighthouse",
		display: "poi_lighthouse_complete.png",
		icon: "/esoui/art/icons/poi/poi_lighthouse_complete.dds",
	},
	{
		name: "Longship",
		display: "poi_u26_nord_boat_complete.png",
		icon: "/esoui/art/icons/poi/poi_u26_nord_boat_complete.dds",
	},
	{
		name: "Longship2",
		display: "poi_u26_nord_boat_pattern_complete.png",
		icon: "/esoui/art/icons/poi/poi_u26_nord_boat_pattern_complete.dds",
	},
	{
		name: "Lumbermill",
		display: "mapkey_lumbermill.png",
		icon: "/esoui/art/icons/mapkey/mapkey_lumbermill.dds",
	},
	{
		name: "Mages Guild",
		display: "mapkey_magesguild.png",
		icon: "/esoui/art/icons/mapkey/mapkey_magesguild.dds",
	},
	{
		name: "Merchant",
		display: "mapkey_vendor.png",
		icon: "/esoui/art/icons/mapkey/mapkey_vendor.dds",
	},
	{
		name: "Mine",
		display: "mapkey_mine.png",
		icon: "/esoui/art/icons/mapkey/mapkey_mine.dds",
	},
	{
		name: "Mundus Stone",
		display: "mapkey_mundus.png",
		icon: "/esoui/art/icons/mapkey/mapkey_mundus.dds",
	},
	{
		name: "Museum",
		display: "servicepin_museum.png",
		icon: "/esoui/art/icons/servicemappins/servicepin_museum.dds",
	},
	{
		name: "Outfit Station",
		display: "mapkey_outfitstation.png",
		icon: "/esoui/art/icons/mapkey/mapkey_outfitstation.dds",
	},
	{
		name: "Outlaws Refuge",
		display: "mapkey_fence.png",
		icon: "/esoui/art/icons/mapkey/mapkey_fence.dds",
	},
	{
		name: "Outpost",
		display: "mapkey_outpost.png",
		icon: "/esoui/art/icons/mapkey/mapkey_outpost.dds",
	},
	{
		name: "Point of Interest",
		display: "mapkey_areaofinterest.png",
		icon: "/esoui/art/icons/mapkey/mapkey_areaofinterest.dds",
	},
	{
		name: "Ruin",
		display: "poi_ruin_complete.png",
		icon: "/esoui/art/icons/poi/poi_ruin_complete.dds",
	},
	{
		name: "Sewer",
		display: "poi_sewer_complete.png",
		icon: "/esoui/art/icons/poi/poi_sewer_complete.dds",
	},
	{
		name: "Shield",
		display: "mapkey_borderkeep.png",
		icon: "/esoui/art/icons/mapkey/mapkey_borderkeep.dds",
	},
	{
		name: "Skyshard",
		display: "mapkey_skyshard_complete.png",
		icon: "/esoui/art/icons/mapkey/mapkey_skyshard_complete.dds",
	},
	{
		name: "Stables",
		display: "mapkey_stables.png",
		icon: "/esoui/art/icons/mapkey/mapkey_stables.dds",
	},
	{
		name: "Tailor",
		display: "mapkey_clothier.png",
		icon: "/esoui/art/icons/mapkey/mapkey_clothier.dds",
	},
	{
		name: "Temple",
		display: "mapkey_temple.png",
		icon: "/esoui/art/icons/mapkey/mapkey_temple.dds",
	},
	{
		name: "Tent",
		display: "mapkey_forwardcamp.png",
		icon: "/esoui/art/icons/mapkey/mapkey_forwardcamp.dds",
	},
	{
		name: "Telvanni",
		display: "poi_mushromtower_complete.png",
		icon: "/esoui/art/icons/poi/poi_mushromtower_complete.dds",
	},
	{
		name: "Torch",
		display: "mapkey_delve.png",
		icon: "/esoui/art/icons/mapkey/mapkey_delve.dds",
	},
	{
		name: "Tower",
		display: "mapkey_keep.png",
		icon: "/esoui/art/icons/mapkey/mapkey_keep.dds",
	},
	{
		name: "Town",
		display: "mapkey_avatown.png",
		icon: "/esoui/art/icons/mapkey/mapkey_avatown.dds",
	},
	{
		name: "Town Square",
		display: "townsquare.png",
		icon: "/RoleplayTownPortals/icons/townsquare.dds",
	},
	{
		name: "Tribute",
		display: "servicepin_talesoftribute.png",
		icon: "/esoui/art/icons/servicemappins/servicepin_talesoftribute.dds",
	},
	{
		name: "Village",
		display: "poi_town_complete.png",
		icon: "/esoui/art/icons/poi/poi_town_complete.dds",
	},
	{
		name: "Wayshrine",
		display: "mapkey_wayshrine.png",
		icon: "/esoui/art/icons/mapkey/mapkey_wayshrine.dds",
	},
	{
		name: "Woodworker",
		display: "mapkey_woodworker.png",
		icon: "/esoui/art/icons/mapkey/mapkey_woodworker.dds",
	},
	{
		name: "World Boss",
		display: "mapkey_groupboss.png",
		icon: "/esoui/art/icons/mapkey/mapkey_groupboss.dds",
	},
];

export default iconData;