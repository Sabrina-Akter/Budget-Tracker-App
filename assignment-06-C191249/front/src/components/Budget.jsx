import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Budget() {
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const budgetResponse = await axios.get('http://localhost:3000/budget');
        const incomeResponse = await axios.get('http://localhost:3000/budget/income');
        const expenseResponse = await axios.get('http://localhost:3000/budget/expense');
        
        // Extract data from the response
        const budgetData = budgetResponse.data;
        const incomeData = incomeResponse.data;
        const expenseData = expenseResponse.data;

        // Set state with the retrieved data
        setBudget(budgetData.availableBudget || 0);
        setIncome(incomeData.income || 0);
        setExpense(expenseData.expense || 0);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchBudgetData();
  }, []);

  return (
    <div className="mx-auto max-w-sm px-5 py-8 text-center text-white">
      <div>
        <h2>Available Budget</h2>
        <p className="mt-1 text-4xl font-medium">
          <span id="total-income">{budget.toFixed(2)}</span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between bg-green-500 px-4 py-3 text-sm">
        <p>Income</p>
        <p>
          + BDT <span id="total-income">{income.toFixed(2)}</span>
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between bg-red-500 px-4 py-3 text-sm">
        <span>Expenses</span>
        <span>- BDT {expense.toFixed(2)}</span>
      </div>
    </div>
  );
}

