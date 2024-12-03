import { auth } from "../../_firebase";
import { defaultFirestoreProps } from "../../utils";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import { User } from "../../globalTypes";
import { addUser, fetchUsers, getUserId } from "../../_firebase/collections";

export const postUser = async (
  req: Request<unknown, unknown, User, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: user } = req;
  const { assignCreateProps } = defaultFirestoreProps();

  console.log("「Add user」Initialize", {
    body: req.body,
  });

  try {
    const userId = getUserId();

    const _isEmailExists = await isEmailExists(user.email);
    if (_isEmailExists) {
      res.status(412).send("user/email_already_exists").end();
      return;
    }

    const _isDocumentExists = await isDocumentExists(user.document);
    if (_isDocumentExists) {
      res.status(412).send("user/document_already_exists").end();
      return;
    }

    const p2 = addUser(assignCreateProps(mapUser(userId, user)));
    const p3 = addUserAuth(userId, user);

    await Promise.all([p2, p3]);

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const mapUser = (userId: string, user: User): User => ({ ...user, id: userId });

const addUserAuth = async (userId: string, user: User): Promise<void> => {
  await auth.createUser({
    uid: userId,
    email: user.email,
    password: user.password,
  });
};

const isEmailExists = async (email: string): Promise<boolean> => {
  const users = await fetchUsers([
    ["email", "==", email],
    ["isDeleted", "==", false],
  ]);

  return !isEmpty(users);
};

const isDocumentExists = async (
  document: User["document"]
): Promise<boolean> => {
  const users = await fetchUsers([
    ["document.number", "==", document.number],
    ["isDeleted", "==", false],
  ]);

  return !isEmpty(users);
};
