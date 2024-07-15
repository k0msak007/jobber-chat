import { markManyMessageAsRead, markMessageAsRead, updateOffer } from '@chat/services/message.service';
import { IMessageDocument } from '@k0msak007/jobber-shared';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const offer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { messageId, type } = req.body;
    const message: IMessageDocument = await updateOffer(messageId, type);
    res.status(StatusCodes.OK).json({ message: 'Message updated', singleMessage: message });
  } catch (error) {
    next(error);
  }
};

const markMultipleMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { messageId, senderUsername, receiverUsername } = req.body;
    await markManyMessageAsRead(receiverUsername, senderUsername, messageId);
    res.status(StatusCodes.OK).json({ message: 'Messages marked as read' });
  } catch (error) {
    next(error);
  }
};

const markSingleMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { messageId } = req.body;
    const message: IMessageDocument = await markMessageAsRead(messageId);
    res.status(StatusCodes.OK).json({ message: 'Message marked as read', singleMessage: message });
  } catch (error) {
    next(error);
  }
};

export { offer, markMultipleMessages, markSingleMessage };
