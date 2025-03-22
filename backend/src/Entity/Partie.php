<?php

namespace App\Entity;

use App\Repository\PartieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PartieRepository::class)]
class Partie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $puzzle_id = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $temps_restant = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $statut = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getPuzzleId(): ?int
    {
        return $this->puzzle_id;
    }

    public function setPuzzleId(?int $puzzle_id): static
    {
        $this->puzzle_id = $puzzle_id;

        return $this;
    }

    public function getTempsRestant(): ?\DateTimeInterface
    {
        return $this->temps_restant;
    }

    public function setTempsRestant(?\DateTimeInterface $temps_restant): static
    {
        $this->temps_restant = $temps_restant;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(?string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    #[ORM\ManyToOne(targetEntity: Puzzle::class)]
#[ORM\JoinColumn(nullable: false)]
private ?Puzzle $puzzle = null;

#[ORM\Column(type: "integer", nullable: true)]
private ?int $score = null;

public function getPuzzle(): ?Puzzle
{
    return $this->puzzle;
}

public function setPuzzle(?Puzzle $puzzle): static
{
    $this->puzzle = $puzzle;
    return $this;
}

public function getScore(): ?int
{
    return $this->score;
}

public function setScore(?int $score): static
{
    $this->score = $score;
    return $this;
}

}
