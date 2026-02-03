'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Trophy, Crown, Zap, Timer } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { GlassButton } from '../GlassButton';
import { ParallaxSection } from '../ParallaxSection';
import { useSwipe } from '../useSwipe';

interface Position {
  x: number;
  y: number;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export function SnakeArena() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Swipe controls for mobile
  useSwipe({
    onSwipeUp: () => {
      if (isPlaying && !isPaused && direction !== 'DOWN') {
        setNextDirection('UP');
      }
    },
    onSwipeDown: () => {
      if (isPlaying && !isPaused && direction !== 'UP') {
        setNextDirection('DOWN');
      }
    },
    onSwipeLeft: () => {
      if (isPlaying && !isPaused && direction !== 'RIGHT') {
        setNextDirection('LEFT');
      }
    },
    onSwipeRight: () => {
      if (isPlaying && !isPaused && direction !== 'LEFT') {
        setNextDirection('RIGHT');
      }
    },
  });

  // Load leaderboard from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('snakeLeaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    } else {
      // Initialize with some default scores
      const defaultLeaderboard: LeaderboardEntry[] = [
        { name: 'Sardor', score: 500, date: '2026-01-25' }
      ];
      setLeaderboard(defaultLeaderboard);
      localStorage.setItem('snakeLeaderboard', JSON.stringify(defaultLeaderboard));
    }
  }, []);

  // Generate random food position
  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Check collision
  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Move based on direction
        switch (nextDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        setDirection(nextDirection);

        // Check collision
        if (checkCollision(head, prevSnake)) {
          setIsPlaying(false);
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood(newSnake));
          // Increase speed slightly
          setSpeed(prev => Math.max(50, prev - 5));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, isPaused, nextDirection, food, speed, checkCollision, generateFood]);

  // Timer
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    timerRef.current = setInterval(() => {
      setGameTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, isPaused]);

  // Handle game over and leaderboard update
  useEffect(() => {
    if (gameOver && score > 0) {
      const lowestScore = leaderboard.length > 0 ? Math.min(...leaderboard.map(e => e.score)) : 0;
      const isNewRecord = leaderboard.length < 5 || score > lowestScore;

      if (isNewRecord) {
        setShowNewRecord(true);
      }
    }
  }, [gameOver, score, leaderboard]);

  // Save to leaderboard
  const saveToLeaderboard = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!');
      return;
    }

    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score: score,
      date: new Date().toISOString().split('T')[0],
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('snakeLeaderboard', JSON.stringify(updatedLeaderboard));
    setShowNewRecord(false);
    setPlayerName('');
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, direction]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    const gradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2
    );
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(1, '#ee5a6f');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        (segment.x + 1) * CELL_SIZE,
        (segment.y + 1) * CELL_SIZE
      );
      
      if (isHead) {
        gradient.addColorStop(0, '#4f46e5');
        gradient.addColorStop(1, '#7c3aed');
      } else {
        const opacity = 1 - (index / snake.length) * 0.5;
        gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);
        gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Add glow effect for head
      if (isHead) {
        ctx.shadowColor = '#7c3aed';
        ctx.shadowBlur = 10;
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
        ctx.shadowBlur = 0;
      }
    });
  }, [snake, food]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setFood(generateFood([{ x: 10, y: 10 }]));
    setScore(0);
    setGameTime(0);
    setSpeed(INITIAL_SPEED);
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDirectionClick = (dir: Direction) => {
    if (!isPlaying) return;
    
    if (
      (dir === 'UP' && direction !== 'DOWN') ||
      (dir === 'DOWN' && direction !== 'UP') ||
      (dir === 'LEFT' && direction !== 'RIGHT') ||
      (dir === 'RIGHT' && direction !== 'LEFT')
    ) {
      setNextDirection(dir);
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ParallaxSection speed={1}>
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              🐍 Ilon o'yin
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
             Klassik ilon o'yin, mazza qilib o'ynang
            </p>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard depth="medium" className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Natija</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {score}
                </div>
              </GlassCard>

              <GlassCard depth="medium" className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Timer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Vaqt</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatTime(gameTime)}
                </div>
              </GlassCard>

              <GlassCard depth="medium" className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Eng ko'p</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {leaderboard[0]?.score || 0}
                </div>
              </GlassCard>

              <GlassCard depth="medium" className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Uzunlik</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {snake.length}
                </div>
              </GlassCard>
            </div>

            {/* Game Canvas */}
            <ParallaxSection speed={0.5}>
              <GlassCard depth="high" className="p-4">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={GRID_SIZE * CELL_SIZE}
                    height={GRID_SIZE * CELL_SIZE}
                    className="w-full h-auto rounded-2xl bg-gray-900/50 dark:bg-black/50"
                  />
                  
                  {/* Game Over Overlay */}
                  {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl backdrop-blur-sm">
                      <div className="text-center p-8">
                        <h2 className="text-4xl font-bold text-white mb-4">O'yin tugadi!</h2>
                        <p className="text-2xl text-gray-300 mb-6">Natija: {score}</p>
                        {showNewRecord && (
                          <div className="mb-6">
                            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold mb-4 animate-pulse">
                              🏆 YANGI RECORD!
                            </div>
                            <input
                              type="text"
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                              placeholder="Enter your name"
                              className="w-full max-w-xs px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 mb-4"
                              maxLength={15}
                            />
                            <button
                              onClick={saveToLeaderboard}
                              className="w-full max-w-xs px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition-transform"
                            >
                              TOPga saqlandi
                            </button>
                          </div>
                        )}
                        <button
                          onClick={startGame}
                          className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition-transform"
                        >
                          Qayta o'ynash
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pause Overlay */}
                  {isPaused && !gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                      <div className="text-center">
                        <Pause className="w-16 h-16 text-white mx-auto mb-4" />
                        <p className="text-2xl font-bold text-white">To'xtatib turish</p>
                        <p className="text-gray-300 mt-2">SPACE ni bosib davom eting</p>
                      </div>
                    </div>
                  )}

                  {/* Start Screen */}
                  {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl backdrop-blur-sm">
                      <div className="text-center p-8">
                        <h2 className="text-4xl font-bold text-white mb-4">O'ynaysizmi?</h2>
                        <p className="text-gray-300 mb-6">Tugmalar orqali boshqarib o'ynang</p>
                        <button
                          onClick={startGame}
                          className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        >
                          <Play className="w-5 h-5" />
                          O'yinni boshlash
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </ParallaxSection>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              <GlassButton
                variant={isPlaying && !isPaused ? 'secondary' : 'primary'}
                size="lg"
                onClick={() => {
                  if (!isPlaying) {
                    startGame();
                  } else {
                    setIsPaused(!isPaused);
                  }
                }}
                className="w-full"
              >
                {!isPlaying ? (
                  <>
                    <Play className="w-5 h-5 mr-2 inline" />
                    O'yinni boshlash
                  </>
                ) : isPaused ? (
                  <>
                    <Play className="w-5 h-5 mr-2 inline" />
                    Davom etish
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5 mr-2 inline" />
                    To'xtatib turish
                  </>
                )}
              </GlassButton>

              <GlassButton
                variant="secondary"
                size="lg"
                onClick={startGame}
                className="w-full"
              >
                <RotateCcw className="w-5 h-5 mr-2 inline" />
                Qayta o'ynash
              </GlassButton>
            </div>

            {/* Mobile Controls */}
            <GlassCard depth="medium" className="md:hidden">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Telefonda boshqarish</p>
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                <div></div>
                <button
                  onClick={() => handleDirectionClick('UP')}
                  className="h-16 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all active:scale-95"
                >
                  <ArrowUp className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <div></div>
                <button
                  onClick={() => handleDirectionClick('LEFT')}
                  className="h-16 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => handleDirectionClick('DOWN')}
                  className="h-16 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all active:scale-95"
                >
                  <ArrowDown className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => handleDirectionClick('RIGHT')}
                  className="h-16 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 flex items-center justify-center transition-all active:scale-95"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Leaderboard */}
          <div>
            <ParallaxSection speed={0.7}>
              <GlassCard depth="high">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    TOP Natijalar:
                  </h2>
                </div>

                {leaderboard.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                    Record yo'q birinchi bo'ling
                  </p>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl transition-all ${
                          index === 0
                            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 shadow-lg shadow-yellow-500/20'
                            : 'bg-white/5 dark:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {index === 0 ? (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                <Crown className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                                <span className="text-gray-700 dark:text-gray-300 font-bold">
                                  #{index + 1}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                              {entry.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {entry.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${
                              index === 0
                                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {entry.score}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Ball</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Current Session
                  </h3>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 dark:bg-white/5">
                    <span className="text-gray-600 dark:text-gray-400">Sizning natijangiz</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {score}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </ParallaxSection>
          </div>
        </div>
      </div>
    </div>
  );
}