// Shared enrollment-intent logic.
//
// The problem this solves: a student who isn't logged in yet clicks
// "enroll" on a course from index.html. We want to remember which course
// they wanted, carry that through signup, and ask them on their stage
// page afterwards "want to continue enrolling in X?" — even if they
// closed the browser and came back days later.
//
// How it works:
// 1. Before sending an anonymous visitor to signup.html, we write a
//    pending-intent document to Firestore keyed by a random id stored in
//    this browser's localStorage (nazih_intent_id).
// 2. Right after a successful signup, signup.html calls
//    linkIntentToStudent(uid) which attaches that pending intent to the
//    new student's account (studentId field) so it survives across
//    devices/sessions from that point on.
// 3. The student's stage page (sec1/2/3.html) calls
//    getPendingIntentForStudent(uid) on load. If there's a pending intent
//    for this student that hasn't been answered yet, it shows the
//    "continue enrolling?" prompt. Answering Yes/No calls
//    resolveIntent(intentId, 'accepted' | 'declined') so it is never
//    shown again.

import {
  getFirestore, collection, doc, setDoc, getDoc, getDocs,
  query, where, updateDoc, serverTimestamp, limit
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const INTENT_LOCAL_KEY = 'nazih_intent_id';

function getOrCreateLocalIntentId(){
  let id = localStorage.getItem(INTENT_LOCAL_KEY);
  if(!id){
    id = 'intent_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(INTENT_LOCAL_KEY, id);
  }
  return id;
}

// Call this when an anonymous (not logged in) visitor clicks "enroll" on
// a course. Records the intent in Firestore and returns the intent id.
export async function recordEnrollIntent(app, courseId){
  const db = getFirestore(app);
  const intentId = getOrCreateLocalIntentId();
  try{
    await setDoc(doc(db, 'enroll_intents', intentId), {
      courseId,
      studentId: null,
      status: 'pending',
      createdAt: serverTimestamp()
    }, { merge: true });
  }catch(err){ /* best-effort — signup/enroll still work without this */ }
  return intentId;
}

// Call this right after a successful signup, passing the new user's uid.
// Links whatever pending intent is on this browser (if any) to the
// student's account so it survives future sessions/devices.
export async function linkIntentToStudent(app, uid){
  const localId = localStorage.getItem(INTENT_LOCAL_KEY);
  if(!localId) return;
  const db = getFirestore(app);
  try{
    await updateDoc(doc(db, 'enroll_intents', localId), {
      studentId: uid
    });
  }catch(err){ /* no pending intent for this browser, or write failed — ignore */ }
}

// Call this on the student's stage page after login. Returns the pending
// intent { id, courseId } for this student if one exists and hasn't been
// answered yet, otherwise null.
export async function getPendingIntentForStudent(app, uid){
  const db = getFirestore(app);
  try{
    const q = query(
      collection(db, 'enroll_intents'),
      where('studentId', '==', uid),
      where('status', '==', 'pending'),
      limit(1)
    );
    const snap = await getDocs(q);
    if(snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, courseId: d.data().courseId };
  }catch(err){
    return null;
  }
}

// Call this when the student answers the "continue enrolling?" prompt.
export async function resolveIntent(app, intentId, decision){
  const db = getFirestore(app);
  try{
    await updateDoc(doc(db, 'enroll_intents', intentId), { status: decision });
  }catch(err){ /* best-effort */ }
}
