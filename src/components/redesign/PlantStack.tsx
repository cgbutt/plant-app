import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Plant } from '../../types/plant';
import { PlantCard } from './PlantCard';

export interface PlantStackProps {
  plants: Plant[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
  onOpenDetail: (plant: Plant) => void;
}

export const PlantStack: React.FC<PlantStackProps> = ({
  plants,
  activeIndex,
  onActiveChange,
  onOpenDetail
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPlants = plants.length;

  // 1. Two separate progress coordinates: targetProgress and displayProgress
  // targetProgress: Where the input wants the carousel to move (continuous or integer)
  // displayProgress: Smoothly animated floating position rendered to screen
  const targetProgressRef = useRef<number>(activeIndex);
  const displayProgressRef = useRef<number>(activeIndex);
  const [displayProgress, setDisplayProgress] = useState<number>(activeIndex);

  // Keep track of the last reported active index to avoid duplicate parent calls
  const lastReportedIndexRef = useRef<number>(activeIndex);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartTimeRef = useRef<number>(0);
  const dragStartProgressRef = useRef<number>(activeIndex);

  // Wheel debounce timer for gentle resting snap
  const wheelSnapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Stable ref for onActiveChange to prevent effect re-subscriptions
  const onActiveChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  // Sync when activeIndex changes externally from another screen (while completely idle)
  useEffect(() => {
    if (!isDraggingRef.current) {
      const currentNorm = ((Math.round(displayProgressRef.current) % totalPlants) + totalPlants) % totalPlants;
      if (currentNorm !== activeIndex) {
        targetProgressRef.current = activeIndex;
        displayProgressRef.current = activeIndex;
        setDisplayProgress(activeIndex);
        lastReportedIndexRef.current = activeIndex;
      }
    }
  }, [activeIndex, totalPlants]);

  // 2. Single, consistent requestAnimationFrame loop that never re-creates on index change
  useEffect(() => {
    let animId: number;
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = displayProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0002) {
        // Smooth critically-damped lerp
        const springSpeed = isDraggingRef.current ? 0.32 : 0.13;
        const next = current + diff * springSpeed;
        displayProgressRef.current = next;
        setDisplayProgress(next);
      } else if (current !== target) {
        displayProgressRef.current = target;
        setDisplayProgress(target);
      }

      // Check if the frontmost active card changed and notify parent
      if (totalPlants > 0) {
        const frontActive = ((Math.round(displayProgressRef.current) % totalPlants) + totalPlants) % totalPlants;
        if (frontActive !== lastReportedIndexRef.current) {
          lastReportedIndexRef.current = frontActive;
          onActiveChangeRef.current(frontActive);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };
  }, [totalPlants]);

  // Programmatic step
  const stepTo = useCallback(
    (direction: 1 | -1) => {
      if (totalPlants === 0) return;
      targetProgressRef.current = Math.round(targetProgressRef.current) + direction;
    },
    [totalPlants]
  );

  // 3. Smooth, normalized mouse wheel handling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent browser page bounce
      e.preventDefault();

      // Normalize delta across all deltaModes (pixels, lines, pages)
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        // DOM_DELTA_LINE (standard mouse wheel on Windows/Linux)
        delta *= 24;
      } else if (e.deltaMode === 2) {
        // DOM_DELTA_PAGE
        delta *= 300;
      }

      // Smooth continuous accumulation without premature rounding
      // ~180px of wheel scroll equals 1 card step
      const SENSITIVITY = 0.0035;
      targetProgressRef.current += delta * SENSITIVITY;

      // Debounce gentle snapping to nearest integer card once scrolling pauses
      if (wheelSnapTimerRef.current) {
        clearTimeout(wheelSnapTimerRef.current);
      }

      wheelSnapTimerRef.current = setTimeout(() => {
        targetProgressRef.current = Math.round(targetProgressRef.current);
      }, 140);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (wheelSnapTimerRef.current) {
        clearTimeout(wheelSnapTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        stepTo(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        stepTo(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stepTo]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    setIsGrabbing(true);
    if (wheelSnapTimerRef.current) clearTimeout(wheelSnapTimerRef.current);
    dragStartYRef.current = e.touches[0].clientY;
    dragStartTimeRef.current = Date.now();
    dragStartProgressRef.current = displayProgressRef.current;
    targetProgressRef.current = displayProgressRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - dragStartYRef.current;

    // 1 card step ~ 220px drag distance
    targetProgressRef.current = dragStartProgressRef.current - diffY / 220;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    const touchDuration = Math.max(1, Date.now() - dragStartTimeRef.current);
    const endY = e.changedTouches[0].clientY;
    const diffY = endY - dragStartYRef.current;
    const velocity = diffY / touchDuration; // px/ms

    let targetInt = Math.round(targetProgressRef.current);
    // Flick detection
    if (Math.abs(velocity) > 0.4) {
      if (velocity < 0) {
        targetInt = Math.floor(dragStartProgressRef.current) + 1;
      } else {
        targetInt = Math.ceil(dragStartProgressRef.current) - 1;
      }
    }

    targetProgressRef.current = targetInt;
  };

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsGrabbing(true);
    if (wheelSnapTimerRef.current) clearTimeout(wheelSnapTimerRef.current);
    dragStartYRef.current = e.clientY;
    dragStartTimeRef.current = Date.now();
    dragStartProgressRef.current = displayProgressRef.current;
    targetProgressRef.current = displayProgressRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const diffY = e.clientY - dragStartYRef.current;
    targetProgressRef.current = dragStartProgressRef.current - diffY / 220;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    const duration = Math.max(1, Date.now() - dragStartTimeRef.current);
    const diffY = e.clientY - dragStartYRef.current;
    const velocity = diffY / duration;

    let targetInt = Math.round(targetProgressRef.current);
    if (Math.abs(velocity) > 0.4) {
      if (velocity < 0) {
        targetInt = Math.floor(dragStartProgressRef.current) + 1;
      } else {
        targetInt = Math.ceil(dragStartProgressRef.current) - 1;
      }
    }

    targetProgressRef.current = targetInt;
  };

  if (totalPlants === 0) {
    return (
      <div className="leafy-stack-empty">
        <p>No plants in your collection yet.</p>
      </div>
    );
  }

  // 4. Transform derivation with natural stacking and seamless depth
  const renderCardItem = (plant: Plant, index: number) => {
    // Relative offset on circular track centered in [-totalPlants/2, totalPlants/2]
    let offset = (index - displayProgress) % totalPlants;
    if (offset > totalPlants / 2) offset -= totalPlants;
    if (offset < -totalPlants / 2) offset += totalPlants;

    const absOffset = Math.abs(offset);
    const isForeground = absOffset < 0.45;

    let translateY = 0;
    let translateZ = 0;
    let rotateX = 0;
    let scaleX = 1;
    let scaleY = 1;
    let opacity = 1;
    let visibility: 'visible' | 'hidden' = 'visible';
    let pointerEvents: 'auto' | 'none' = 'auto';

    let plantParallaxY = 0;
    let plantParallaxZ = 0;

    // Guaranteed Stacking Order:
    // Foreground cards (smallest absOffset) strictly have the highest z-index.
    // Deterministic tie-breaker for cards equidistant at absOffset = 0.5.
    let zIndex = Math.round(100 - absOffset * 20);
    if (offset >= 0) {
      zIndex += 1;
    }

    if (offset >= 0) {
      // Cards stacked upward & curving backward into 3D cylinder
      // Natural 52px vertical step maintaining tightly stacked appearance with clean unclipped tabs
      translateY = -offset * 52;
      translateZ = -offset * 36;
      rotateX = prefersReducedMotion ? 0 : -offset * 7.5;
      scaleX = Math.max(0.76, 1 - offset * 0.05);
      scaleY = Math.max(0.76, 1 - offset * 0.025);

      // Seam fade: smoothly fade to 0 before wrap point so cards never teleport visibly
      if (offset > 2.3) {
        opacity = Math.max(0, 1 - (offset - 2.3) / 0.7);
        if (opacity <= 0.01) {
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      }

      plantParallaxY = prefersReducedMotion ? 0 : offset * 10;
      plantParallaxZ = prefersReducedMotion ? 0 : (1 - offset) * 14;
    } else {
      // Cards below (exiting downward when scrolling forward, or entering from below when scrolling backward)
      const u = -offset;
      translateY = u * 52;
      translateZ = -u * 36;
      rotateX = prefersReducedMotion ? 0 : u * 7.5;
      scaleX = Math.max(0.76, 1 - u * 0.05);
      scaleY = Math.max(0.76, 1 - u * 0.025);

      // Fade out cards below the foreground card when idle so they don't produce an accidental overlap
      if (u > 0.35) {
        opacity = Math.max(0, 1 - (u - 0.35) / 0.55);
        if (opacity <= 0.01) {
          visibility = 'hidden';
          pointerEvents = 'none';
        }
      }

      plantParallaxY = prefersReducedMotion ? 0 : -u * 8;
      plantParallaxZ = prefersReducedMotion ? 0 : 4;
    }

    return (
      <div
        key={plant.id}
        className="leafy-stack-item-wrapper"
        style={{
          transform: `translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`,
          zIndex,
          opacity: Math.max(0, Math.min(1, opacity)),
          visibility,
          pointerEvents: visibility === 'hidden' ? 'none' : pointerEvents,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        }}
      >
        <PlantCard
          plant={plant}
          index={index}
          isActive={isForeground}
          isPeek={false}
          parallaxOffsetY={plantParallaxY}
          parallaxOffsetZ={plantParallaxZ}
          onClick={() => {
            if (isForeground) {
              onOpenDetail(plant);
            } else {
              targetProgressRef.current = Math.round(targetProgressRef.current + offset);
            }
          }}
        />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="leafy-plant-stack-stage"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        userSelect: 'none',
        cursor: isGrabbing ? 'grabbing' : 'grab'
      }}
      role="region"
      aria-label="3D Plant Cards Carousel"
    >
      <div className="leafy-stack-viewport">
        {plants.map((plant, index) => renderCardItem(plant, index))}
      </div>
    </div>
  );
};
