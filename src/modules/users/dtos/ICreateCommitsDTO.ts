export default interface ICreateCommitsDTO {
  user_login: string;
  lines_added: number;
  lines_removed: number;
  date: Date;
}
