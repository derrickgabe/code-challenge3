// components/GoalItem.js
import React, { useState } from 'react';
import ProgressBar from './ ProgressBar.jsx';

function GoalItem({ goal, onUpdateGoal, onDeleteGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({
      ...editedGoal,
      [name]: value
    });
  };

  const handleSave = () => {
    onUpdateGoal(editedGoal);
    setIsEditing(false);
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft(goal.deadline);
  const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  const isCloseToDeadline = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
  const isCompleted = goal.savedAmount >= goal.targetAmount;

  return (
    <li className={`goal-item ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={editedGoal.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="targetAmount"
            value={editedGoal.targetAmount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            value={editedGoal.category}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="deadline"
            value={editedGoal.deadline}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="goal-header">
            <h3>{goal.name}</h3>
            <span className="category">{goal.category}</span>
          </div>
          <div className="goal-details">
            <ProgressBar 
              savedAmount={goal.savedAmount} 
              targetAmount={goal.targetAmount} 
            />
            <div className="amounts">
              <span>Saved: ${goal.savedAmount.toLocaleString()}</span>
              <span>Target: ${goal.targetAmount.toLocaleString()}</span>
              <span>Remaining: ${(goal.targetAmount - goal.savedAmount).toLocaleString()}</span>
            </div>
            <div className="deadline">
              {isCompleted ? (
                <span className="completed-text">Goal Completed!</span>
              ) : isOverdue ? (
                <span className="overdue-text">Overdue! {Math.abs(daysLeft)} days past deadline</span>
              ) : isCloseToDeadline ? (
                <span className="warning-text">Only {daysLeft} days left!</span>
              ) : (
                <span>{daysLeft} days remaining</span>
              )}
            </div>
          </div>
          <div className="goal-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default GoalItem;