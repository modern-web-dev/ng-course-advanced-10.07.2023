import {Edition} from "./edition";

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  edition: Edition;
}
