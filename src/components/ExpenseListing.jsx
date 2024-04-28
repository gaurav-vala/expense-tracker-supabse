import { useEffect, useState } from "react";
import supabase from "../lib/supabseconfig";
import { useFetchExpenseAmount } from "../hooks/useFetchExpenseAmount";

export default function ExpenseListing() {
  const [expenseData, setExpenseData] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchExpenses = async () => {
      // QUERY TO FETCH ALL THE RECORDS
      const { data, error } = await supabase
        .from("expenses")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the error");
        console.error(error);
      }

      if (data) {
        setExpenseData(data);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <>
      <div className="expense_listing ">
        <ul className="">
          {expenseData.map((single_expense) => (
            <li
              key={single_expense.id}
              className="bg-gray-900 p-6 rounded-xl flex justify-between items-center mt-6"
            >
              <span className="text-2xl font-bold">
                {single_expense.expense_name}{" "}
              </span>
              <span className="text-2xl">₹{single_expense.expense_amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
