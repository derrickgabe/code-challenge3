// App.js
import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList.jsx';
import AddGoalForm from './components/AddGoalForm.jsx';
import Overview from './components/Overview.jsx';
import DepositForm from './components/DepositForm.jsx';
import './App.css';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      navigate(redirect);
    }
  }, []);

  // ... rest of your app
}


function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('goals');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals');
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      const data = await response.json();
      setGoals(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });
      if (!response.ok) {
        throw new Error('Failed to add goal');
      }
      const data = await response.json();
      setGoals([...goals, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goalToUpdate = goals.find(goal => goal.id === goalId);
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: Number(goalToUpdate.savedAmount) + Number(amount)
      };
      
      const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to make deposit');
      }
      
      setGoals(goals.map(goal => goal.id === goalId ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <div className="tabs">
        <button 
          className={activeTab === 'goals' ? 'active' : ''} 
          onClick={() => setActiveTab('goals')}
        >
          My Goals
        </button>
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
      </div>
      
      {activeTab === 'goals' ? (
        <>
          <AddGoalForm onAddGoal={addGoal} />
          <DepositForm goals={goals} onDeposit={makeDeposit} />
          <GoalList 
            goals={goals} 
            onUpdateGoal={updateGoal} 
            onDeleteGoal={deleteGoal} 
          />
        </>
      ) : (
        <Overview goals={goals} />
      )}
    </div>
  );
}

export default App;   