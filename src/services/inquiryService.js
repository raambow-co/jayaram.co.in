import { db, isFirebaseConfigured } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Submits an inquiry to the Firestore "inquiries" collection.
 * If Firebase is not configured, logs a helpful warning and resolves gracefully.
 */
export async function submitInquiry(inquiryData) {
  const payload = {
    fullName: inquiryData.fullName || 'Anonymous Partner',
    organization: inquiryData.organization || '',
    email: inquiryData.email || '',
    phone: inquiryData.phone || '',
    divisionId: inquiryData.divisionId || 'general',
    divisionName: inquiryData.divisionName || 'General Corporate Engagement',
    serviceRequired: inquiryData.serviceRequired || inquiryData.divisionName || 'Consultation',
    scale: inquiryData.scale || '',
    message: inquiryData.message || '',
    status: 'new', // new | in_review | contacted | converted | archived
    source: inquiryData.source || 'Website Form',
    notes: [],
    createdAt: new Date().toISOString(),
    serverTimestamp: serverTimestamp()
  };

  if (!isFirebaseConfigured || !db) {
    console.warn('[Firebase] Config not detected. Simulated inquiry submission:', payload);
    return { success: true, simulated: true, data: payload };
  }

  try {
    const docRef = await addDoc(collection(db, 'inquiries'), payload);
    return { success: true, id: docRef.id, data: payload };
  } catch (error) {
    console.error('[Firebase] Error saving inquiry:', error);
    throw error;
  }
}

