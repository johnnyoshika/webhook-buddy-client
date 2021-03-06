import * as functions from 'firebase-functions';
import execute from '../services/createEndpoint';

export const createEndpoint = functions.https.onCall(
  (data, context) => {
    if (!context.auth?.uid)
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Unauthorized!',
      );

    if (
      !data.name ||
      typeof data.name !== 'string' ||
      !data.name.trim()
    )
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Endpoint name missing.',
      );

    try {
      return execute(context.auth.uid, data.name);
    } catch (error) {
      throw new functions.https.HttpsError(
        'unknown',
        error.message,
        error,
      );
    }
  },
);
