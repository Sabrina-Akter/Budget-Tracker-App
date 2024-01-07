import { formatMoney } from "../utils/format-money";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExpenseList() {
  const [expenseEntries, setExpenseEntries] = useState([]);

  useEffect(() => {
    const fetchExpenseEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/entries/expense');
        setExpenseEntries(response.data);
      } catch (error) {
        console.error('Error fetching expense entries:', error);
      }
    };

    fetchExpenseEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/entries/${id}`);
      setExpenseEntries(expenseEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error deleting expense entry:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-2 font-medium text-red-600">
        <h2>Expense</h2>
        <span>Category</span>
        <span>Amount</span>
      </div>
      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There is no expense.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((item) => {
          return (
            <li key={item.id} className="py-2.5">
              <div className="group flex justify-between gap-10 text-sm">
                <span>{item.title}</span>
                <span className="text-red-600">{item.category}</span>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(item.value)}
                  </span>
                  <span
                    className="ml-2 cursor-pointer font-medium text-red-500 group-hover:inline-block"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

