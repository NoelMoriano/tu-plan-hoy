import { auth } from "../../_firebase";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import assert from "assert";
import { defaultFirestoreProps } from "../../utils";
import { User } from "../../globalTypes";
import { fetchUser, fetchUsers, updateUser } from "../../_firebase/collections";

interface Params {
  userId: string;
}

export const putUser = async (
  req: Request<Params, unknown, User, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { userId },
    body: user,
  } = req;

  const { assignUpdateProps } = defaultFirestoreProps();

  console.log(userId, "「Update user」Initialize", {
    params: req.params,
    body: req.body,
  });

  try {
    const userFirestore = await fetchUserFirestore(user.id);
    const changeEmail = userFirestore.email !== user.email;

    if (changeEmail) {
      const emailExists = await isEmailExists(user.email);

      if (emailExists) {
        res.status(412).send("user/email_already_exists").end();
        return;
      }
    }

    const p0 = updateUser(userId, assignUpdateProps(user));
    const p1 = updateUserAuth(user, changeEmail);

    await Promise.all([p0, p1]);

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUserAuth = async (
  user: User,
  changeEmail: boolean
): Promise<void> => {
  await auth.updateUser(user.id, {
    ...(changeEmail && { email: user.email }),
    password: user.password,
  });
};

const isEmailExists = async (email: string): Promise<boolean> => {
  const users = fetchUsers([
    ["email", "==", email],
    ["isDeleted", "==", false],
  ]);

  return !isEmpty(users);
};

const fetchUserFirestore = async (userId: string): Promise<User> => {
  const user = await fetchUser(userId);

  assert(user, `User doesn't exist: ${userId}`);

  return user;
};
