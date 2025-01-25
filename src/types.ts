export interface UserStats {
  cupsAvoided: number;
  carbonSaved: number;
  points: number;
  badges: Badge[];
  challengesCompleted: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: number;
  participants: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: Date;
}