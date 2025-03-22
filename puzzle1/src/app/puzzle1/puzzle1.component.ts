import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

interface PuzzlePiece {
  id: number;
  image: string;
  correctPosition: number;
  top?: number;
  left?: number;
  isPlaced: boolean;
  boardPosition?: number;
}

interface RectInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-puzzle1',
  templateUrl: './puzzle1.component.html',
  styleUrls: ['./puzzle1.component.css'],
})
export class Puzzle1Component implements OnInit, OnDestroy {
  title = 'JigsawPuzzle';

  rows = 4;
  columns = 4;
  pieceWidth = 120;
  pieceHeight = 120;

  puzzleImages = [
    '../../assets/images/puzzle/row-1-col-1.jpg',
    '../../assets/images/puzzle/row-1-col-2.jpg',
    '../../assets/images/puzzle/row-1-col-3.jpg',
    '../../assets/images/puzzle/row-1-col-4.jpg',
    '../../assets/images/puzzle/row-2-col-1.jpg',
    '../../assets/images/puzzle/row-2-col-2.jpg',
    '../../assets/images/puzzle/row-2-col-3.jpg',
    '../../assets/images/puzzle/row-2-col-4.jpg',
    '../../assets/images/puzzle/row-3-col-1.jpg',
    '../../assets/images/puzzle/row-3-col-2.jpg',
    '../../assets/images/puzzle/row-3-col-3.jpg',
    '../../assets/images/puzzle/row-3-col-4.jpg',
    '../../assets/images/puzzle/row-4-col-1.jpg',
    '../../assets/images/puzzle/row-4-col-2.jpg',
    '../../assets/images/puzzle/row-4-col-3.jpg',
    '../../assets/images/puzzle/row-4-col-4.jpg',
  ];

  puzzleGrid: (number | null)[] = [];
  allPieces: PuzzlePiece[] = [];
  unplacedPieces: PuzzlePiece[] = [];
  selectedPiece: PuzzlePiece | null = null;
  isPuzzleSolved = false;
  gridPositions: { [key: number]: RectInfo } = {};
  timeLimit = 120;
  timeLeft: number = this.timeLimit;
  timerSubscription: Subscription | null = null;

  ngOnInit() {
    this.initializeGrid();
    this.initializePieces();
    this.shufflePieces();

    setTimeout(() => {
      this.initGridPositions();
    }, 100);

    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.endGame();
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  endGame() {
    this.isPuzzleSolved = false;
    alert('Le temps est écoulé ! Le puzzle est terminé.');
  }

  initializeGrid() {
    this.puzzleGrid = Array(this.rows * this.columns).fill(null);
  }

  initGridPositions() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell, index) => {
      const rect = cell.getBoundingClientRect();
      this.gridPositions[index] = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    });
  }

  initializePieces() {
    this.allPieces = [];
    this.unplacedPieces = [];

    for (let i = 0; i < this.puzzleImages.length; i++) {
      const piece: PuzzlePiece = {
        id: i,
        image: this.puzzleImages[i],
        correctPosition: i,
        isPlaced: false,
      };
      this.allPieces.push(piece);
      this.unplacedPieces.push(piece);
    }
  }

  shufflePieces() {
    this.isPuzzleSolved = false;
    this.initializePieces();
    this.puzzleGrid = Array(this.rows * this.columns).fill(null);

    for (let i = this.unplacedPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.unplacedPieces[i], this.unplacedPieces[j]] = [
        this.unplacedPieces[j],
        this.unplacedPieces[i],
      ];
    }

    setTimeout(() => {
      this.initGridPositions();
    }, 100);
  }

  selectPiece(piece: PuzzlePiece) {
    if (piece.isPlaced) {
      return;
    }
    this.selectedPiece = piece;
  }

  placePiece(position: number) {
    if (!this.selectedPiece || this.puzzleGrid[position] !== null) {
      return;
    }

    this.puzzleGrid[position] = this.selectedPiece.id;
    this.selectedPiece.boardPosition = position;
    this.selectedPiece.isPlaced = true;
    this.unplacedPieces = this.unplacedPieces.filter(
      (p) => p.id !== this.selectedPiece!.id
    );

    const gridPosition = this.gridPositions[position];
    if (gridPosition) {
      this.selectedPiece.top = gridPosition.top;
      this.selectedPiece.left = gridPosition.left;
    }

    this.checkPuzzleCompletion();
    this.selectedPiece = null;
  }

  getPieceImage(pieceId: number): string {
    const piece = this.allPieces.find((p) => p.id === pieceId);
    return piece ? piece.image : '';
  }

  checkPuzzleCompletion() {
    const allCellsFilled = this.puzzleGrid.every((cell) => cell !== null);
    if (!allCellsFilled) return;

    this.isPuzzleSolved = this.puzzleGrid.every(
      (pieceId, index) => pieceId !== null && pieceId === index
    );
  }
}
