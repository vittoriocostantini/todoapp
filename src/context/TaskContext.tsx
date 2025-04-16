import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Task {
  id: number;
  name: string;
  description: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (name: string, description: string) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (name: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      description
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
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