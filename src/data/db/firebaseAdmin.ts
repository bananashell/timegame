import firebaseAdmin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: process.env.FIREBASE_APIKEY_AUTHDOMAIN,
//   projectId: process.env.FIREBASE_APIKEY_PROJECTID,
//   storageBucket: process.env.FIREBASE_APIKEY_STORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASE_APIKEY_MESSAGINGSENDERID,
//   appId: process.env.FIREBASE_APIKEY_APPID,
//   measurementId: process.env.FIREBASE_APIKEY_MEASUREMENTID,
// };

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (firebaseAdmin.apps.length > 0) {
    return firebaseAdmin.app();
  }

  const cert = firebaseAdmin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return firebaseAdmin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(params);
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}
