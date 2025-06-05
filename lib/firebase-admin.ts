import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

// Configuração usando variáveis de ambiente
const firebaseAdminConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID || "gen_lang_client_0816853627",
  private_key_id: "fdae7980c801f60fdd5e2c7cb6df4bc6cd3f98ec",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
  client_email:
    process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@gen-lang-client-0816853627.iam.gserviceaccount.com",
  client_id: "104766995397755223342",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40gen-lang-client-0816853627.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
}

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(firebaseAdminConfig as any),
      projectId: firebaseAdminConfig.project_id,
    })
    console.log("✅ Firebase Admin SDK inicializado com sucesso")
    console.log("🔧 Project ID:", firebaseAdminConfig.project_id)
  } catch (error) {
    console.error("❌ Erro ao inicializar Firebase Admin SDK:", error)
  }
}

export const adminAuth = getAuth()

// Utility function to verify Firebase ID tokens
export async function verifyIdToken(idToken: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    return {
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      decodedToken,
    }
  } catch (error) {
    console.error("Error verifying ID token:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Token verification failed",
    }
  }
}

// Middleware function to authenticate requests
export async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      success: false,
      error: "Missing or invalid Authorization header",
    }
  }

  const token = authHeader.substring(7) // Remove "Bearer " prefix
  return await verifyIdToken(token)
}
