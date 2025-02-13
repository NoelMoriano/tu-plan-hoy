type RoleCode = "super_admin" | "user";
type CurrencyCode = "PEN" | "USD";

interface _Image {
  createAt: any;
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

type Image = Omit<_Image, "createAt"> & { createAt: Date };

interface Archive {
  name: string;
  status?: string;
  uid: string;
  url: string;
}

interface DefaultFirestoreProps {
  createAt: any;
  updateAt: any;
  updateBy: string;
  isDeleted: boolean;
}

interface User extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  roleCode: RoleCode;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  password: string;
  document: {
    type: string;
    number: string;
  };
  phone: {
    prefix: string;
    number: string;
  };
  iAcceptPrivacyPolicies: boolean;
  profilePhoto?: Image;
  dniPhoto?: Image;
  address?: boolean;
  updateBy: string;
}

interface Company extends DefaultFirestoreProps {
  id: string;
  document: {
    type: string;
    number: string;
  };
  commercialName: string;
  socialReason: string;
  overview: string;
  logo: Image;
  userId: string;
}

interface Advertisement extends DefaultFirestoreProps {
  id: string;
  adImage: Image;
  title: string;
  address: string;
  overview: string;
  company: Company;
  user: User;
}
