<?php
namespace App\Controller;

use App\Entity\Partie;
use App\Entity\Puzzle;
use App\Repository\PartieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;

#[Route('/api/partie')]
class PartieController extends AbstractController
{
    private LoggerInterface $logger;

    // Injecting the logger service via the constructor
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    #[Route('/create', name: 'create_partie', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $puzzle = $em->getRepository(Puzzle::class)->find($data['puzzle_id']);

        // if (!$puzzle) {
        //     // Using the injected logger service
        //     $this->logger->error('Puzzle not found for puzzle_id: ' . $data['puzzle_id']);
        //     return $this->json(['error' => 'Puzzle not found'], 404);
        // }

        $partie = new Partie();
        $partie->setPuzzle($puzzle);
        $partie->setTempsRestant(new \DateTime('00:05:00')); // 5 minutes
        $partie->setStatut('en cours');
        $partie->setScore(0);

        $em->persist($partie);
        $em->flush();

        return $this->json(['message' => 'Partie créée', 'id' => $partie->getId()]);
    }

    #[Route('/update-score/{id}', name: 'update_score', methods: ['POST'])]
    public function updateScore(int $id, Request $request, PartieRepository $partieRepo, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $partie = $partieRepo->find($id);

        if (!$partie) {
            return $this->json(['error' => 'Partie not found'], 404);
        }

        $partie->setScore($data['score']);
        $em->flush();

        return $this->json(['message' => 'Score mis à jour']);
    }

    #[Route('/classement', name: 'get_classement', methods: ['GET'])]
    public function getClassement(PartieRepository $partieRepo): JsonResponse
    {
        $parties = $partieRepo->findBy([], ['score' => 'DESC'], 10);

        $classement = array_map(fn($p) => [
            'id' => $p->getId(),
            'score' => $p->getScore(),
        ], $parties);

        return $this->json($classement);
    }
}
