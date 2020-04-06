//epic rig
/obj/item/rig
	name = "Base RIG"
	desc = "You should not see this, yell at a coder!"
	icon = 'icons/obj/rig.dmi'
	icon_state = "rig_shell"

/obj/item/rig/themed
	///How the RIG and things connected to it look
	var/theme = "engi"

/obj/item/rig/themed/control
	name = "RIG control module"
	desc = "A special powered suit that protects against various environments. Wear it on your back, deploy it and turn it on to use its' power."
	icon_state = "engi-module"
	w_class = WEIGHT_CLASS_BULKY
	slot_flags = ITEM_SLOT_BACK
	req_access = list()
	slowdown = 1
	theme = "engi"
	///If the suit is deployed and turned on
	var/active = FALSE
	///If the suit wire/module hatch is open
	var/open = FALSE
	///If the suit is ID locked
	var/locked = FALSE
	///If the suit is malfunctioning
	var/malfunctioning = FALSE
	///If the suit has EMP protection
	var/emp_protection = FALSE
	///How long the RIG is electrified for
	var/seconds_electrified = MACHINE_NOT_ELECTRIFIED
	///If the suit interface is broken
	var/interface_break = FALSE
	///How much modules can this RIG carry without malfunctioning
	var/complexity_max = 15
	///If the RIG is really strong and you don't want it to be upgraded/has modules that shouldn't be obtainable by taking them out/has an infinite battery this prevents putting new parts in or old parts out
	var/no_customization = FALSE
	///How much battery power the RIG uses per tick
	var/cell_usage = 0
	///RIG battery
	var/obj/item/stock_parts/cell/cell

/obj/item/rig/themed/control/Initialize()
	..()
	icon_state = "[theme]-module"
	wires = new /datum/wires/rig(src)

/obj/item/rig/themed/control/Destroy()
	..()
	QDEL_NULL(wires)

/obj/item/rig/themed/control/process()
	if(seconds_electrified > MACHINE_NOT_ELECTRIFIED)
		seconds_electrified--
	if(cell.charge > 0)
		cell.charge -= cell_usage


