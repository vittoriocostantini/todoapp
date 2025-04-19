import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Task {
  _id: string;
  name: string;
  description: string;
  priority: string; // Add priority field
}

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string, description: string, priority: string) => void; // Update function signature
  deleteTask: (_id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async (name: string, description: string, priority: string) => { // Update function signature
    const newTask = {
      name,
      description,
      priority // Include priority in the task object
    };
    try {
      const response = await fetch('http://localhost:8100/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }
      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const deleteTask = (_id: string) => {
    setTasks(tasks.filter(task => task._id !== _id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};