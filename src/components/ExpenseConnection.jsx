import { useState, useEffect } from "react";
import supabase from "../lib/supabseconfig";
import { useFetchExpenseAmount } from "../hooks/useFetchExpenseAmount";

export default function ExpenseConnection() {
  const [expenseAmount, setExpenseAmount] = useState(undefined);
  const [expenseName, setExpenseName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount as a number

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        // QUERY TO FETCH ALL THE RECORDS
        const { data, error } = await supabase.from("expenses").select();

        if (error) {
          throw new Error("Could not fetch the data");
        }

        if (data) {
          // Calculate total expense amount
          const total = data.reduce(
            (acc, expense) => acc + expense.expense_amount,
            0
          );
          setTotalAmount(total);
          console.log(totalAmount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAmount(); // Call the fetchAmount function
  }, [totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expenseName === "" || expenseAmount === "") {
      alert("Please Enter Both Value!");
      return;
    }
    const { data, error } = await supabase
      .from("expenses")
      .insert({
        expense_name: expenseName,
        expense_amount: expenseAmount,
        loggedin_user_id: "testing",
      })
      .select();

    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
      const total = data.reduce(
        (acc, expense) => acc + expense.expense_amount,
        0
      );
      setTotalAmount(total);
      setExpenseAmount("");
      setExpenseName("");
    }
  };

  return (
    <>
      <div className="total_expense_container bg-gray-900 p-10 rounded-xl">
        <p className="">Your Total Expense:</p>
        <p className="text-white text-6xl pt-4 font-black">₹{totalAmount}</p>
      </div>

      <form className="pt-12">
        <div className="form_input_container">
          <input
            className="input input-bordered w-full max-w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-lg"
            type="number"
            placeholder="₹ Expense Amount"
            onChange={(e) => setExpenseAmount(e.target.value)}
            value={expenseAmount}
          />
        </div>
        <div className="form_input_container pt-6">
          <input
            className="input input-bordered w-full max-w-full text-lg"
            type="text"
            placeholder="Expense Name"
            onChange={(e) => setExpenseName(e.target.value)}
            value={expenseName}
          />
        </div>
        <div className="form_input_container pt-6">
          <button
            className="btn btn-ghost hover:text-white transition-all border-purple-600 bg-purple-600 text-black w-full text-lg"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        </div>
      </form>
    </>
  );
}
