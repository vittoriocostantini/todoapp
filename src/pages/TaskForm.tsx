import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea, 
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const history = useHistory();
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    
    addTask(taskName.trim(), taskDescription.trim());
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Add New Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Task Name</IonLabel>
          <IonInput 
            value={taskName} 
            onIonChange={e => setTaskName(e.detail.value!)} 
            placeholder="Enter task name"
          />
        </IonItem>
        
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonTextarea 
            value={taskDescription} 
            onIonChange={e => setTaskDescription(e.detail.value!)} 
            placeholder="Enter task description"
          />
        </IonItem>
        
        <IonButton expand="block" onClick={handleAddTask} className="ion-margin-top">
          Add Task
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;