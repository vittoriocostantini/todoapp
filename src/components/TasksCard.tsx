import React from 'react';
import { IonItem, IonCheckbox, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';

interface TasksCardProps {
  taskId: string; // Add taskId prop
  taskName: string;
  description?: string; // Added optional description prop
  priority: string; // Add priority prop
  onDelete: (id: string) => void; // Update onDelete to accept an id
}

const TasksCard: React.FC<TasksCardProps> = ({ taskId, taskName, description, priority, onDelete }) => {
  const handleDelete = () => {
    onDelete(taskId); // Pass the taskId to the onDelete function
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonCheckbox slot="start" />
        <IonLabel>
          <h2>{taskName}</h2>
          {description && <p>{description}</p>}
          <p>Priority: {priority}</p>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={handleDelete}>
          Eliminar
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TasksCard;