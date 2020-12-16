export default interface ICreateCommitsDTO {
  user_id: string;
  lines_added: number;
  lines_removed: number;
  date: Date;
}
