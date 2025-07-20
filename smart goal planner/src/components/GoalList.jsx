// components/GoalList.js
import React from 'react';
import GoalItem from './GoalIteam.jsx';

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  return (
    <div className="goal-list">
      <h2>My Savings Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal!</p>
      ) : (
        <ul>
          {goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onUpdateGoal={onUpdateGoal} 
              onDeleteGoal={onDeleteGoal} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;