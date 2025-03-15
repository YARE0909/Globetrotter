export interface Destination {
    city: string;
    country: string;
    clues: string[];
    fun_fact: string[];
    trivia: string[];
  }
  
  export interface Question {
    id: string;
    clues: string[];
    options: string[];
}

export interface User {
    id?: string;
    userName: string;
    displayName: string;
    score?: number;
    inCorrectAnswers?: number;
    totalQuestions?: number;
    Questions?: Question[];
}