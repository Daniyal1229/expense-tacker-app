import React from 'react';

const CategoryCard = ({ category, total, count }) => {
    return (
        <div className="category-card">
            <h4>{category}</h4>
            <p>Total Amount: {total}</p>
            <p>Number of Expenses: {count}</p>
        </div>
    );
};

export default CategoryCard;
