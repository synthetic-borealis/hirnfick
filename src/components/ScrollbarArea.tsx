import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import './ScrollbarArea.scss';

interface IScrollbarAreaProps {
  children?: ReactNode;
  className?: string;
}

export default function ScrollbarArea({ children, className }: IScrollbarAreaProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState<number>(20);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [viewportID] = useState<string>(nanoid());
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  function handleResize(ref: HTMLDivElement, trackSize: number) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  function handleWheel(evt: React.WheelEvent) {
    evt.stopPropagation();
    if (contentRef.current) {
      contentRef.current.scrollBy({
        top: evt.deltaY,
        behavior: 'smooth',
      });
    }
  }

  const handleThumbPosition = useCallback(
    () => {
      if (
        !contentRef.current
        || !scrollTrackRef.current
        || !scrollThumbRef.current
      ) {
        return;
      }
      const {
        scrollTop: contentTop,
        scrollHeight: contentHeight,
      } = contentRef.current;
      const {
        clientHeight: trackHeight,
      } = scrollTrackRef.current;
      const newTop = Math.min(
        (contentTop / contentHeight) * trackHeight,
        trackHeight - thumbHeight,
      );
      const thumb = scrollThumbRef.current;
      const newThumbPosition = (thumb.offsetTop / Math.floor(trackHeight - thumbHeight)) * 100;
      setScrollPosition(newThumbPosition);

      thumb.style.top = `${newTop}px`;
    },
    [thumbHeight],
  );

  const handleTrackClick = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      const [
        { current: trackCurrent },
        { current: contentCurrent },
      ] = [scrollTrackRef, contentRef];

      if (trackCurrent && contentCurrent) {
        const { clientY } = evt;
        const target = evt.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbHeight],
  );

  const handleThumbPointerDown = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      if (!(evt.pointerType === 'mouse' && evt.button !== 0)) {
        evt.preventDefault();
        evt.stopPropagation();
        setScrollStartPosition(evt.clientY);
        if (contentRef.current) {
          setInitialScrollTop(contentRef.current.scrollTop);
        }
        setIsDragging(true);
      }
    },
    [],
  );

  const handleThumbPointerUpOrLeave = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      if (!(evt.pointerType === 'mouse' && evt.button !== 0) || evt.type === 'pointerleave') {
        evt.preventDefault();
        evt.stopPropagation();
        if (isDragging) {
          setIsDragging(false);
        }
      }
    },
    [isDragging],
  );

  const handleThumbPointerMove = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging && contentRef.current) {
        evt.preventDefault();
        evt.stopPropagation();
        const {
          scrollHeight: contentScrollHeight,
          offsetHeight: contentOffsetHeight,
        } = contentRef.current;
        const deltaY = (evt.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
        contentRef.current.scrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight,
        );
      }
    },
    [isDragging, scrollStartPosition, thumbHeight, initialScrollTop],
  );

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current?.observe(ref);
      return () => {
        observer.current?.unobserve(ref);
      };
    }
    return () => {
    };
  });
  const classList = `ScrollbarArea${className ? ` ${className}` : ''}`;

  return (
    <div
      className={classList}
      onWheel={handleWheel}
      onPointerLeave={handleThumbPointerUpOrLeave}
      onPointerMove={handleThumbPointerMove}
      onPointerUp={handleThumbPointerUpOrLeave}
    >
      <div className="ScrollbarArea__wrapper">
        <div
          className="ScrollbarArea__viewport"
          ref={contentRef}
          role="document"
          id={viewportID}
          onScroll={handleThumbPosition}
        >
          {children}
        </div>
      </div>
      <div
        className="ScrollbarArea__scrollbar"
        role="scrollbar"
        aria-controls={viewportID}
        aria-valuenow={scrollPosition}
        aria-orientation="vertical"
      >
        <div
          className="ScrollbarArea__scrollbar-track"
          ref={scrollTrackRef}
          onClick={handleTrackClick}
          role="none"
        />
        <div
          className="ScrollbarArea__scrollbar-thumb"
          onPointerDown={handleThumbPointerDown}
          ref={scrollThumbRef}
          style={{
            height: thumbHeight,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        />
      </div>
    </div>
  );
}

ScrollbarArea.defaultProps = {
  children: '',
  className: '',
};
