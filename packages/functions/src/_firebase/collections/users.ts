import type { User } from "../../globalTypes";
import { firestore } from "../index";
import {
  fetchDocument,
  updateDocument,
  setDocument,
  fetchCollection,
  WhereClauses,
} from "../index";

export const usersRef = firestore.collection("users");
export const getUserId = (): string => usersRef.doc().id;

export const fetchUsers = async (
  whereClauses?: WhereClauses<User>[]
): Promise<User[]> => fetchCollection<User>(usersRef, whereClauses);

export const fetchUser = async (userId: string): Promise<User | undefined> =>
  fetchDocument<User>(usersRef.doc(userId));

export const addUser = async (
  user: User
): Promise<FirebaseFirestore.WriteResult> =>
  setDocument<User>(usersRef.doc(user.id), user);

export const updateUser = async (
  userId: string,
  user: Partial<User>
): Promise<FirebaseFirestore.WriteResult> =>
  updateDocument<Partial<User>>(usersRef.doc(userId), user);

export const deleteUser = async (
  userId: string,
  user: Partial<User>
): Promise<FirebaseFirestore.WriteResult> =>
  updateDocument<Partial<User>>(usersRef.doc(userId), user);
