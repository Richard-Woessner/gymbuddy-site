export interface ClientWorkouts {
  ClientUid: string;
  Workouts: Workout[];
}

export interface Workout {
  Name: string;
  Id: string;
  Exercises: Exercise[];
  uid?: string;
  Completed?: boolean;
  Display?: boolean;
  DateCreated?: Date;
}

export interface Exercise {
  Id: string;
  Exercise: string;
  Sets: Set[];
  Type: string;
  NewExercise?: boolean;
}

export interface Set {
  SetNumber: number;
  Reps: number;
  Weight: number;
  Completed?: boolean;
}
