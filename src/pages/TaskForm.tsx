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
  IonBackButton,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium'); // Default priority
  const history = useHistory();
  const { addTask } = useTasks();

  const handleAddTask = () => {
    const trimmedTaskName = taskName.trim();
    const trimmedTaskDescription = taskDescription.trim();
    

    // Verificar que el nombre de la tarea no esté vacío
    if (!trimmedTaskName) {
      alert('El nombre de la tarea es obligatorio.');
      return;
    }
    // Verificar que la descripción no esté vacía
    if (!trimmedTaskDescription) {
      alert('La descripción de la tarea es obligatoria.');
      return;
    }
    // Aquí podrías agregar más validaciones si es necesario
    // Por ejemplo, verificar longitud máxima, caracteres especiales, etc.

    addTask(trimmedTaskName, trimmedTaskDescription, taskPriority); // Include priority
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("medium"); // Reset priority
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
          <IonLabel position="fixed">Task Name</IonLabel>
          <IonInput 
            value={taskName} 
            onIonChange={e => setTaskName(e.detail.value!)} 
          />
        </IonItem>
        
        <IonItem>
          <IonLabel position="fixed">Description</IonLabel>
          <IonTextarea 
            value={taskDescription} 
            onIonChange={e => setTaskDescription(e.detail.value!)} 
          />
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Priority</IonLabel>
          <IonSelect value={taskPriority} onIonChange={e => setTaskPriority(e.detail.value!)}>
            <IonSelectOption value="low">Low</IonSelectOption>
            <IonSelectOption value="medium">Medium</IonSelectOption>
            <IonSelectOption value="high">High</IonSelectOption>
          </IonSelect>
        </IonItem>
        
        <IonButton expand="block" onClick={handleAddTask} className="ion-margin-top">
          Add Task
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;