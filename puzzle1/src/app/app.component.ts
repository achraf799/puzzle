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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'JigsawPuzzle';

  // Configurations du puzzle - modifié pour 4x4
  rows = 4;
  columns = 4;
  pieceWidth = 120;
  pieceHeight = 120;

  // Tableau des images des pièces du puzzle
  puzzleImages = [
    // Première rangée
    '../assets/images/puzzle/row-1-col-1.jpg',
    '../assets/images/puzzle/row-1-col-2.jpg',
    '../assets/images/puzzle/row-1-col-3.jpg',
    '../assets/images/puzzle/row-1-col-4.jpg',
    // Deuxième rangée
    '../assets/images/puzzle/row-2-col-1.jpg',
    '../assets/images/puzzle/row-2-col-2.jpg',
    '../assets/images/puzzle/row-2-col-3.jpg',
    '../assets/images/puzzle/row-2-col-4.jpg',
    // Troisième rangée
    '../assets/images/puzzle/row-3-col-1.jpg',
    '../assets/images/puzzle/row-3-col-2.jpg',
    '../assets/images/puzzle/row-3-col-3.jpg',
    '../assets/images/puzzle/row-3-col-4.jpg',
    // Quatrième rangée
    '../assets/images/puzzle/row-4-col-1.jpg',
    '../assets/images/puzzle/row-4-col-2.jpg',
    '../assets/images/puzzle/row-4-col-3.jpg',
    '../assets/images/puzzle/row-4-col-4.jpg',
  ];

  // Grille du puzzle (stocke les IDs des pièces)
  puzzleGrid: (number | null)[] = [];

  // Toutes les pièces du jeu
  allPieces: PuzzlePiece[] = [];

  // Pièces non placées (disponibles)
  unplacedPieces: PuzzlePiece[] = [];

  // Pièce sélectionnée
  selectedPiece: PuzzlePiece | null = null;

  // État du puzzle
  isPuzzleSolved = false;

  // Positions des cellules de la grille
  gridPositions: { [key: number]: RectInfo } = {};

  // Propriétés pour le chronomètre
  timeLimit = 120; // 2 minutes en secondes
  timeLeft: number = this.timeLimit;
  timerSubscription: Subscription | null = null;

  ngOnInit() {
    // Initialisation de la grille
    this.initializeGrid();

    // Initialisation des pièces
    this.initializePieces();

    // Mélange des pièces
    this.shufflePieces();

    // On attend que le DOM soit chargé pour récupérer les positions des cellules
    setTimeout(() => {
      this.initGridPositions();
    }, 100);

    // Démarrer le chronomètre
    this.startTimer();
  }

  ngOnDestroy() {
    // Arrêter le chronomètre lorsque le composant est détruit
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
    // Arrêter le jeu et afficher un message
    this.isPuzzleSolved = false; // Ou un autre état pour indiquer que le temps est écoulé
    alert('Le temps est écoulé ! Le puzzle est terminé.');
    // Vous pouvez également désactiver les interactions avec le puzzle ici
  }

  initializeGrid() {
    // Création d'une grille vide
    this.puzzleGrid = Array(this.rows * this.columns).fill(null);
  }

  initGridPositions() {
    // Récupère les positions des cellules de la grille pour un placement précis
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
    // Réinitialisation des pièces
    this.allPieces = [];
    this.unplacedPieces = [];

    // Création des pièces avec leur position correcte
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
    // Réinitialisation du puzzle
    this.isPuzzleSolved = false;
    this.initializePieces();

    // Réinitialisation de la grille
    this.puzzleGrid = Array(this.rows * this.columns).fill(null);

    // Mélange des pièces non placées
    for (let i = this.unplacedPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.unplacedPieces[i], this.unplacedPieces[j]] = [
        this.unplacedPieces[j],
        this.unplacedPieces[i],
      ];
    }

    // Réinitialisation des positions des cellules de la grille
    setTimeout(() => {
      this.initGridPositions();
    }, 100);
  }

  selectPiece(piece: PuzzlePiece) {
    // Sélectionner une pièce à placer
    if (piece.isPlaced) {
      return; // Ne pas sélectionner une pièce déjà placée
    }
    this.selectedPiece = piece;
  }

  placePiece(position: number) {
    // Vérifier si une pièce est sélectionnée
    if (!this.selectedPiece) {
      return; // Aucune pièce sélectionnée
    }

    // Vérifier si la cellule est déjà occupée
    if (this.puzzleGrid[position] !== null) {
      return; // La cellule est occupée, on ne place pas la pièce
    }

    // Placer la pièce dans la cellule
    this.puzzleGrid[position] = this.selectedPiece.id;
    this.selectedPiece.boardPosition = position;

    // Marquer la pièce comme placée
    this.selectedPiece.isPlaced = true;

    // Retirer la pièce des pièces non placées
    this.unplacedPieces = this.unplacedPieces.filter(
      (p) => p.id !== this.selectedPiece!.id
    );

    // Récupérer la position exacte de la cellule
    const gridPosition = this.gridPositions[position];
    if (gridPosition) {
      this.selectedPiece.top = gridPosition.top;
      this.selectedPiece.left = gridPosition.left;
    }

    // Vérifier si le puzzle est résolu
    this.checkPuzzleCompletion();

    // Désélectionner la pièce
    this.selectedPiece = null;
  }

  // Méthode pour récupérer l'image d'une pièce par son ID
  getPieceImage(pieceId: number): string {
    const piece = this.allPieces.find((p) => p.id === pieceId);
    return piece ? piece.image : '';
  }

  checkPuzzleCompletion() {
    // Vérifier si toutes les cellules sont remplies
    const allCellsFilled = this.puzzleGrid.every((cell) => cell !== null);

    if (!allCellsFilled) {
      return;
    }

    // Vérifier si chaque pièce est à la bonne position
    this.isPuzzleSolved = this.puzzleGrid.every(
      (pieceId, index) => pieceId !== null && pieceId === index
    );
  }
}