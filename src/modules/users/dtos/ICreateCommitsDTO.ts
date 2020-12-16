export default interface ICreateCommitsDTO {
  oid: string;
  user_login: string;
  lines_added: number;
  lines_removed: number;
  date: Date;
}
