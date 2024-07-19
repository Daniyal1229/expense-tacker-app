import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseForm from './ExpenseForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseList = () => {
    const { expenses, handleDeleteExpense } = useContext(ExpenseContext);
    const [editing, setEditing] = useState(null);
    const [sortedExpenses, setSortedExpenses] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const sorted = [...expenses].sort((a, b) => a.category.localeCompare(b.category));
        setSortedExpenses(sorted);

        const totals = sorted.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = { total: 0, count: 0 };
            }
            acc[expense.category].total += expense.amount;
            acc[expense.category].count += 1;
            return acc;
        }, {});
        setCategoryTotals(totals);
    }, [expenses]);

    const handleSubmit = () => {
        navigate("/expense");
    }

    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Prepare data for the chart
    const chartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Total Amount by Category',
                data: Object.values(categoryTotals).map(({ total }) => total),
                backgroundColor: '#03C03C',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenses Overview',
            },
        },
    };

    return (
        <div className="expense-list">
            <div className="totals">
                <h1>Dashboard</h1>
                <div className="category-cards">
                    {Object.entries(categoryTotals).map(([category, { total, count }]) => (
                        <CategoryCard key={category} category={category} total={total} count={count} />
                    ))}
                </div>


                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
            <h2>Expense List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Purchase Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.date}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>
                                <FaEdit
                                    className="edit-icon" 
                                    onClick={() => setEditing(expense)}
                                />
                                {/* <FaTrash
                                    className="delete-icon"
                                    onClick={() => handleDeleteExpense(expense._id)}
                                /> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}>
                            <div className='totalfield'> <h3> Total Expense Amount: </h3> {totalAmount}</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            {editing && (
                <ExpenseForm expense={editing} setEditing={setEditing} />
            )}
            <div className='btn'> 
                <button onClick={handleSubmit}>Add Item</button>
            </div>
        </div>
    );
};

export default ExpenseList;
