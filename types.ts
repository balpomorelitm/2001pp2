import React from 'react';

export interface Question {
  id: number;
  text: string;
  unit: string; 
  hintTitle: string;
  hintContent: React.ReactNode;
  specialType?: 'NORMAL' | 'BONUS' | 'PRISON'; // New field
}

export interface Player {
  id: number;
  name: string;
  avatar: string; 
  position: number; 
  color: string;
  turnsToSkip: number; // New field for Prison logic
}

export enum GameState {
  SETUP,
  PLAYING,
  WIN
}

export const TOTAL_SQUARES = 34; // Increased to 34 (33 desks + 1 teacher)