// components/AddGoalForm.js
import React, { useState } from 'react';

function AddGoalForm({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
    savedAmount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      alert('Please fill in all required fields');
      return;
    }
    
    onAddGoal({
      ...newGoal,
      targetAmount: Number(newGoal.targetAmount),
    });
    
    setNewGoal({
      name: '',
      targetAmount: '',
      category: '',
      deadline: '',
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="add-goal-form">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name*</label>
          <input
            type="text"
            name="name"
            value={newGoal.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Target Amount ($)*</label>
          <input
            type="number"
            name="targetAmount"
            value={newGoal.targetAmount}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={newGoal.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Deadline*</label>
          <input
            type="date"
            name="deadline"
            value={newGoal.deadline}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default AddGoalForm;