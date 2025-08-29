const sessionService = require('../services/sessionService');
const generalResponse = require("../utils/generalResponse");
const { getOkResponse, getInternalServerErrorResponse, getInvalidRequestResponse, getCreatedResponse, getUpdatedResponse, getDeletedResponse } = require("../utils/response");
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require("../constants/messages");

const getSession = async (req, res) => {
  try {
    const data = await sessionService.getAllSessions();
    return generalResponse(res, data, getOkResponse(SUCCESS_MESSAGES.SESSION_FETCHED));
  } catch (err) {
    return generalResponse(res, null, getInternalServerErrorResponse(ERROR_MESSAGES.SERVER_ERROR));
  }
};

const getSessionById = async (req, res) => {
  try {
    const data = await sessionService.getSessionById(req.params.id);
    return generalResponse(res, data, getOkResponse(SUCCESS_MESSAGES.SESSION_FETCHED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

const createSession = async (req, res) => {
  try {
    const data = await sessionService.createSession(req.body);
    return generalResponse(res, data, getCreatedResponse(SUCCESS_MESSAGES.SESSION_CREATED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

const updateSession = async (req, res) => {
  try {
    const { data } = await sessionService.updateSession(req.params.id, req.body);
    return generalResponse(res, data, getUpdatedResponse(SUCCESS_MESSAGES.SESSION_UPDATED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

const deleteSession = async (req, res) => {
  try {
    const data = await sessionService.deleteSession(req.params.id);
    return generalResponse(res, data, getDeletedResponse(SUCCESS_MESSAGES.SESSION_DELETED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

module.exports = {
  getSession,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
}