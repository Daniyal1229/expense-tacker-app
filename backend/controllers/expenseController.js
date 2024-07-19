const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    const { date, amount, category, description } = req.body;
    console.log(req.body);
    try {
        const newExpense = new Expense({ user: req.user.id, date, amount, category, description });
        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { date, amount, category, description } = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { date, amount, category, description },
            { new: true }
        );
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndRemove(id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};




module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};


module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
