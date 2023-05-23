export interface IAuthorizedHeader {
  id: number;
  username: string;
  logoutUser: () => void;
}
