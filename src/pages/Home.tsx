import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  IonFab,
  IonFabButton,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';
import TasksCard from '../components/TasksCard';
import { useTasks } from '../context/TaskContext';

const Home: React.FC = () => {
  const history = useHistory();
  const { tasks, deleteTask } = useTasks();

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:8100/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      deleteTask(taskId); // Update local state after successful deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To-do list</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">To-do list</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {tasks.length === 0 ? (
            <IonItem>
              <IonLabel>No tasks yet. Add one!</IonLabel>
            </IonItem>
          ) : (
            tasks.map(task => (
              <TasksCard 
                key={task._id}
                taskId={task._id} // Pass taskId to TasksCard
                taskName={task.name} 
                priority={task.priority}
                description={task.description}
                onDelete={handleDeleteTask} // Use handleDeleteTask
              />
            ))
          )}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/task-form')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
