import React from 'react';
import { IonItem, IonCheckbox, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';

interface TasksCardProps {
  taskName: string;
  description?: string; // Added optional description prop
  onDelete: () => void;
}

const TasksCard: React.FC<TasksCardProps> = ({ taskName, description, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonCheckbox slot="start" />
        <IonLabel>
          <h2>{taskName}</h2>
          {description && <p>{description}</p>}
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={onDelete}>
          Eliminar
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TasksCard;