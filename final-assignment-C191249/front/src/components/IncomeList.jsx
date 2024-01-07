import { formatMoney } from "../utils/format-money";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function IncomeList() {
  const [incomeEntries, setIncomeEntries] = useState([]);

  useEffect(() => {
    const fetchIncomeEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/entries/income');
        setIncomeEntries(response.data);
      } catch (error) {
        console.error('Error fetching income entries:', error);
      }
    };

    fetchIncomeEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/entries/${id}`);
      setIncomeEntries(incomeEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error deleting income entry:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-2 font-medium text-green-600">
        <h2>Income</h2>
        <span>Category</span>
        <span>Amount</span>
      </div>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There is no income.</p>
      )}

      <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => {
          return (
            <li key={income.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{income.title}</span>
                <span className="text-green-600">{income.category}</span>
                <div>
                  <span className="text-green-600">
                    {formatMoney(income.value)}
                  </span>
                  <span
                    className="ml-2 cursor-pointer font-medium text-red-500 group-hover:inline-block"
                    onClick={() => handleDelete(income.id)}
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



