<?php

// src/Controller/GameController.php
namespace App\Controller;

use App\Entity\Partie;
use App\Entity\Utilisateur;
use App\Entity\Puzzle;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    // Récupérer les puzzles
    /**
     * @Route("/api/puzzles", name="get_puzzles", methods={"GET"})
     */
    public function getPuzzles()
    {
        $puzzles = $this->getDoctrine()->getRepository(Puzzle::class)->findAll();
        return new JsonResponse($puzzles);
    }

    // Enregistrer un score
    /**
     * @Route("/api/score", name="save_score", methods={"POST"})
     */
    public function saveScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $score = new Partie();
        $score->setScore($data['score']);
        $score->setNiveau($data['niveau']);
        $score->setTempsRestant($data['tempsRestant']);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($score);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Score saved successfully']);
    }
}
