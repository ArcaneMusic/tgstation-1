/**
  * # Experiment
  *
  * This is the base datum for experiments, storing the base definition.
  *
  * This class should be subclassed for producing actual experiments. The
  * proc stubs should be implemented in whole.
  */
/datum/experiment
	/// Name that distinguishes the experiment
	var/name = "Experiment"
	/// A brief description of the experiment to be shown as details
	var/description = "Base experiment"
	/// A descriptive tag used on UI elements to denote 'types' of experiments
	var/exp_tag = "Base"
	/// A list of types that are allowed to experiment with this datum
	var/list/allowed_experimentors

/**
  * Checks if the experiment is complete
  *
  * This proc should be overridden such that it returns TRUE/FALSE to
  * state if the experiment is complete or not.sound
  */
/datum/experiment/proc/is_complete()
	return

/**
  * Gets the current progress towards the goal of the experiment
  *
  * This proc should be overridden such that the return value is a
  * string describing the current status of the experiment.
  */
/datum/experiment/proc/check_progress()
	return

/**
  * Gets if the experiment is actionable provided some arguments
  *
  * This proc should be overridden such that the return value is a
  * boolean value representing if the experiment could be actioned with
  * the provided arguments.
  */
/datum/experiment/proc/actionable(...)
	return !is_complete()

/**
  * Attempts to perform the experiment provided some arguments
  *
  * This proc should be overridden such that the experiment will be actioned
  * with some defined arguments
  */
/datum/experiment/proc/perform_experiment(datum/component/experiment_handler/experiment_handler, ...)
	perform_experiment_actions(arglist(args))
	if(is_complete())
		finish_experiment(arglist(args))

/datum/experiment/proc/perform_experiment_actions(datum/component/experiment_handler/experiment_handler, ...)
	return

///Called when you complete an experiment, makes sure the techwebs knows the experiment was finished, and tells everyone it happend, yay!
/datum/experiment/proc/finish_experiment(datum/component/experiment_handler/experiment_handler, ...)
	experiment_handler.announce_message_to_all("The [name] has been completed!")
	experiment_handler.selected_experiment = null
	experiment_handler.linked_web.complete_experiment(src)
