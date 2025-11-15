import ErrorLog from "../models/ErrorLog";

export async function logErrorToDb({ message, stack, route }: { message: string; stack?: string; route?: string }) {
  try {
    await ErrorLog.create({ message, stack, route });
  } catch (e) {
    console.error("Failed to write error log to DB", e);
  }
}
