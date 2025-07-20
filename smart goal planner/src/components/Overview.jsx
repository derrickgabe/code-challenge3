// components/Overview.js
import React from 'react';
import ProgressBar from './ ProgressBar.jsx';

function Overview({ goals }) {
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);
  const overdueGoals = goals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  });
  const closeToDeadlineGoals = goals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
  });

  return (
    <div className="overview">
      <h2>Savings Overview</h2>
      
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Goals</h3>
          <p>{goals.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Completed Goals</h3>
          <p>{completedGoals.length}</p>
        </div>
        <div className="summary-card">
          <h3>Overall Progress</h3>
          <ProgressBar savedAmount={totalSaved} targetAmount={totalTarget} />
          <p>{Math.round((totalSaved / totalTarget) * 100)}% of total target</p>
        </div>
      </div>
      
      <div className="alerts-section">
        {overdueGoals.length > 0 && (
          <div className="alert overdue">
            <h3>Overdue Goals ({overdueGoals.length})</h3>
            <ul>
              {overdueGoals.map(goal => (
                <li key={goal.id}>
                  {goal.name} - {Math.abs(calculateDaysLeft(goal.deadline))} days overdue
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {closeToDeadlineGoals.length > 0 && (
          <div className="alert warning">
            <h3>Approaching Deadline ({closeToDeadlineGoals.length})</h3>
            <ul>
              {closeToDeadlineGoals.map(goal => (
                <li key={goal.id}>
                  {goal.name} - {calculateDaysLeft(goal.deadline)} days left
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="category-breakdown">
        <h3>Savings by Category</h3>
        <div className="categories-grid">
          {[...new Set(goals.map(goal => goal.category))].map(category => {
            const categoryGoals = goals.filter(goal => goal.category === category);
            const categorySaved = categoryGoals.reduce((sum, goal) => sum + goal.savedAmount, 0);
            const categoryTarget = categoryGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
            
            return (
              <div key={category} className="category-item">
                <h4>{category || 'Uncategorized'}</h4>
                <ProgressBar savedAmount={categorySaved} targetAmount={categoryTarget} />
                <p>${categorySaved.toLocaleString()} of ${categoryTarget.toLocaleString()}</p>
                <p>{categoryGoals.length} goals</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Overview;