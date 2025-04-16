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
                key={task.id}
                taskName={task.name} 
                description={task.description}
                onDelete={() => deleteTask(task.id)} 
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
