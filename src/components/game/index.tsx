import React, { useEffect, useRef, useState } from 'react'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Position = { x: number; y: number }

export default function Game() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [cellSize, setCellSize] = useState<number>(CELL_SIZE)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showGameOverOverlay, setShowGameOverOverlay] = useState<boolean>(false)

  const generateFood = (): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }

    const isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    )
    if (isOnSnake) return generateFood()
    return newFood
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, isPlaying])

  const changeDirection = (newDir: Direction) => {
    if (!isPlaying) return
    const opposite: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    }
    if (newDir !== opposite[direction]) {
      setDirection(newDir)
    }
  }

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] }

        switch (direction) {
          case 'UP':
            head.y -= 1
            break
          case 'DOWN':
            head.y += 1
            break
          case 'LEFT':
            head.x -= 1
            break
          case 'RIGHT':
            head.x += 1
            break
        }

        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          setGameOver(true)
          setIsPlaying(false)
          setShowGameOverOverlay(true)
          return prevSnake
        }

        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          setIsPlaying(false)
          setShowGameOverOverlay(true)
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]

        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood())
          setScore((prev) => prev + 10)
          if (score > 0 && score % 50 === 0) {
            setSpeed((prev) => Math.max(prev - 10, 50))
          }
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [direction, food, isPlaying, gameOver, speed, score])

  useEffect(() => {
    const screenWidth = window.innerWidth
    const maxGridSize = Math.min(screenWidth, 400)
    setCellSize(Math.floor(maxGridSize / GRID_SIZE))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    snake.forEach((segment, index) => {
      const gradient = ctx.createRadialGradient(
        segment.x * cellSize + cellSize / 2,
        segment.y * cellSize + cellSize / 2,
        2,
        segment.x * cellSize + cellSize / 2,
        segment.y * cellSize + cellSize / 2,
        cellSize / 2
      )

      gradient.addColorStop(0, index === 0 ? '#4CAF50' : '#9CCC65')
      gradient.addColorStop(1, index === 0 ? '#2E7D32' : '#558B2F')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(
        segment.x * cellSize + cellSize / 2,
        segment.y * cellSize + cellSize / 2,
        cellSize / 2.2,
        0,
        Math.PI * 2
      )
      ctx.fill()

      if (index === 0) {
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(
          segment.x * cellSize + cellSize / 3,
          segment.y * cellSize + cellSize / 3,
          2,
          0,
          Math.PI * 2
        )
        ctx.fill()

        ctx.beginPath()
        ctx.arc(
          segment.x * cellSize + 2 * cellSize / 3,
          segment.y * cellSize + cellSize / 3,
          2,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    })

    ctx.fillStyle = '#FF5722'
    ctx.beginPath()
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }, [snake, food, cellSize])

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection('RIGHT')
    setGameOver(false)
    setIsPlaying(true)
    setShowGameOverOverlay(false)
    setScore(0)
    setSpeed(INITIAL_SPEED)
  }

  return (
    <div className="relative flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-1 font-bold">Snake Game</h1>

      <div className="flex items-center justify-between gap-x-6">
      <div className="mb-3 text-sm px-6 py-1 text-lg rounded-lg shadow-md">Score: {score}</div>
      <div className="mb-3 text-sm px-6 py-1 text-lg rounded-lg shadow-md">BB Earned: {score}</div>
      </div>

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * cellSize}
        height={GRID_SIZE * cellSize}
        className="border rounded-lg border-gray-300 mb-4 bg-gray-900 shadow-md max-w-full h-auto"
      />

      {!isPlaying && !gameOver && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Start Game
        </button>
      )}

      {isPlaying && !gameOver && (
        <div className="mt-2 w-full max-w-xs flex flex-col items-center space-y-3">
          <button
            onClick={() => changeDirection('UP')}
            className="p-2 w-10 bg-blue-500 text-white rounded-lg active:scale-95"
          >
            ▲
          </button>
          <div className="flex justify-between w-full px-6">
            <button
              onClick={() => changeDirection('LEFT')}
              className="p-2 w-10 bg-blue-500 text-white rounded-lg active:scale-95"
            >
              ◀
            </button>
            <button
              onClick={() => changeDirection('DOWN')}
              className="p-2 w-10 bg-blue-500 text-white rounded-lg active:scale-95"
            >
              ▼
            </button>
            <button
              onClick={() => changeDirection('RIGHT')}
              className="p-2 w-10 bg-blue-500 text-white rounded-lg active:scale-95"
            >
              ▶
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-gray-500 text-sm text-center">
        Gunakan tombol atau panah keyboard untuk mengendalikan ular
      </div>

      {showGameOverOverlay && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
          <button
            onClick={() => setShowGameOverOverlay(false)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✖
          </button>
          <h2 className="text-3xl font-bold text-white mb-4">Game Over</h2>
          <p className="text-white mb-6">Your Score: {score}</p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  )
}
