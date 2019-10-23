import React from "react";
import { MdAttachMoney } from "react-icons/md";

const Budget = ({ budget, handleBudgetSubmit, clearBudget }) => {
  return (
    <form onSubmit={handleBudgetSubmit}>
      <div className="form-center">
        <div className="form-group center">
          <label htmlFor="budget">budget</label>
          <input
            type="number"
            className="form-control"
            id="budget"
            name="budget"
            placeholder="Add your budget"
          />
        </div>
      </div>
      {budget === "0" && (
        <button type="submit" className="btn btn-green">
          Add budget
          <MdAttachMoney className="btn-icon" />
        </button>
      )}
      {budget > 0 && (
        <button type="submit" className="btn" onClick={clearBudget}>
          Clear budget
        </button>
      )}
    </form>
  );
};

export default Budget;
