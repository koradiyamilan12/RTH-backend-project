const { createSession, getAllSession, getSessionById, updateSession, deleteSession } = require("../repository/sessionRepository");
const { ERROR_MESSAGES } = require('../constants/messages');

class SessionService {

  async getAllSessions() {
    return await getAllSession();
  }

  async createSession(data) {
    return await createSession(data);
  }

  async getSessionById(id) {
    const session = await getSessionById(id);
    if (!session) throw new Error(ERROR_MESSAGES.SESSION_NOT_FOUND);
    return session;
  }

  async updateSession(id, data) {
    const existingSession = await getSessionById(id);
    if (!existingSession) throw new Error(ERROR_MESSAGES.SESSION_NOT_FOUND);
    return await updateSession(id, data);
  }

  async deleteSession(id) {
    const deleted = await deleteSession(id);
    if (!deleted) throw new Error(ERROR_MESSAGES.SESSION_NOT_FOUND);
    return deleted;
  }
}

module.exports = new SessionService();
