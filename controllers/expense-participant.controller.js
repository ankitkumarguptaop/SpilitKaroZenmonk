const { expenseParticipantServices } = require("../services");

exports.addParticipantToExpense = async (req, res) => {
  try {
    const addedParticipant =
      await expenseParticipantServices.addParticipantToExpense({
        body: req.body,
        params: req.params,
        currentUser: req.user,
      });

    res.status(201).json(addedParticipant);
  } catch (error) {
    console.log("Failed to add participant", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.removeParticipantFromExpense = async (req, res) => {
  try {
    const removedParticipant =
      await expenseParticipantServices.removeParticipantFromExpense({
        params: req.params,
        currentUser: req.user,
      });

    res.status(200).json({ message: "sucessfuly removed", removedParticipant });
  } catch (error) {
    console.log("Failed to remove participant", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.updateSetelmentStatus = async (req, res) => {
  try {
    const updatedSetelment =
      await expenseParticipantServices.updateSetelmentStatus({
        params: req.params,
        body: req.body,
      });

    res.status(200).json(updatedSetelment);
  } catch (error) {
    console.log("Failed to update setelment status ", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.listExpenseMember = async (req, res) => {
  try {
    const expenseParticipants =
      await expenseParticipantServices.listExpenseMember({
        params: req.params,
      });
    res.status(200).json(expenseParticipants);
  } catch (error) {
    console.log("Failed to list expense Summary", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
