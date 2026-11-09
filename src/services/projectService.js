import { db, isFirebaseConfigured } from '../firebase';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';

/**
 * Listens for real-time project updates from Firestore "projects" collection.
 * Calls callback with array of projects.
 */
export function subscribeToProjects(onProjectsUpdate, fallbackProjects = []) {
  if (!isFirebaseConfigured || !db) {
    onProjectsUpdate(fallbackProjects);
    return () => {};
  }

  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onProjectsUpdate(fallbackProjects);
        } else {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          onProjectsUpdate(list);
        }
      },
      (error) => {
        console.warn('[Firebase] Projects sync notice, falling back:', error);
        onProjectsUpdate(fallbackProjects);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('[Firebase] Query error, falling back:', error);
    onProjectsUpdate(fallbackProjects);
    return () => {};
  }
}

