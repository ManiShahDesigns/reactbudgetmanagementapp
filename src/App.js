import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import Budget from "./components/Budget";
import uuid from "uuid/v4";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

const initialBudget = localStorage.getItem("budget")
  ? JSON.parse(localStorage.getItem("budget"))
  : 0;

function App() {
  // ************** state values ***************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // budget
  const [budget, setBudget] = useState(initialBudget);

  // ************** useEffect ***************
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  // ************** functionality ***************

  // handle buget submit
  const handleBudgetSubmit = (e) => {
    if (e.target.budget.value > 0 && e.target.budget.value !== "") {
      setBudget(e.target.budget.value);
      handleAlert({ type: "success", text: "Budget added successfully" });
      e.target.budget.value = "";
    } else {
      handleAlert({
        type: "danger",
        text: "Come back when you have enough money! hehe"
      });
    }
    e.preventDefault();
  };

  // handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  // handle amoount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited successfully" });
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item added successfully" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "The input fields cannot be empty or negative."
      });
    }
  };

  // clear all items
  const clearAllItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "Cleared all items" });
  };

  // delete single item
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item removed" });
  };

  // edit single item
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  // clear budget
  const clearBudget = (e) => {
    setBudget("0");
    handleAlert({ type: "danger", text: "Budget removed" });
    e.preventDefault();
  };

  // Total expenses
  const totalExpenses = expenses.reduce((acc, curr) => {
    return (acc += parseInt(curr.amount));
  }, 0);

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget management app</h1>
      <h3 className="special-font">with localStorage!</h3>
      <main className="App">
        <Budget
          budget={budget}
          clearBudget={clearBudget}
          handleBudgetSubmit={handleBudgetSubmit}
        />
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearAllItems={clearAllItems}
        />
      </main>
      <h1>
        budget:
        <span className="total">${budget > 0 ? budget : "0"}</span>
      </h1>
      <h1>
        total expenses:
        <span className="total">${totalExpenses}</span>
      </h1>
      <h1>
        Balance:
        <span className="total">${budget - totalExpenses}</span>
      </h1>
    </>
  );
}

export default App;
