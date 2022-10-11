import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import './ScrollbarTextArea.scss';

interface IScrollbarTextAreaProps {
  className?: string;
  value?: string;
}

export default function ScrollbarTextArea({ className, value }: IScrollbarTextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState<number>(20);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [viewportID] = useState<string>(nanoid());
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  function handleResize(ref: HTMLTextAreaElement, trackSize: number) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  function handleWheel(evt: React.WheelEvent) {
    evt.stopPropagation();
    if (textAreaRef.current) {
      textAreaRef.current.scrollBy({
        top: evt.deltaY,
        behavior: 'smooth',
      });
    }
  }

  const handleThumbPosition = useCallback(
    () => {
      if (
        !textAreaRef.current
        || !scrollTrackRef.current
        || !scrollThumbRef.current
      ) {
        return;
      }
      const {
        scrollTop: contentTop,
        scrollHeight: contentHeight,
      } = textAreaRef.current;
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
      ] = [scrollTrackRef, textAreaRef];

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
        if (textAreaRef.current) {
          setInitialScrollTop(textAreaRef.current.scrollTop);
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
      if (isDragging && textAreaRef.current) {
        evt.preventDefault();
        evt.stopPropagation();
        const {
          scrollHeight: contentScrollHeight,
          offsetHeight: contentOffsetHeight,
        } = textAreaRef.current;
        const deltaY = (evt.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
        textAreaRef.current.scrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight,
        );
      }
    },
    [isDragging, scrollStartPosition, thumbHeight, initialScrollTop],
  );

  useEffect(() => {
    if (textAreaRef.current && scrollTrackRef.current) {
      const ref = textAreaRef.current;
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
  const classList = `ScrollbarTextArea${className ? ` ${className}` : ''}`;

  return (
    <div
      className={classList}
      onWheel={handleWheel}
      onPointerLeave={handleThumbPointerUpOrLeave}
      onPointerMove={handleThumbPointerMove}
      onPointerUp={handleThumbPointerUpOrLeave}
    >
      <div className="ScrollbarTextArea__wrapper">
        <textarea
          className="ScrollbarTextArea__input-area"
          ref={textAreaRef}
          id={viewportID}
          onScroll={handleThumbPosition}
        >
          {value}
        </textarea>
      </div>
      <div
        className="ScrollbarTextArea__scrollbar"
        role="scrollbar"
        aria-controls={viewportID}
        aria-valuenow={scrollPosition}
        aria-orientation="vertical"
      >
        <div
          className="ScrollbarTextArea__scrollbar-track"
          ref={scrollTrackRef}
          onClick={handleTrackClick}
          role="none"
        />
        <div
          className="ScrollbarTextArea__scrollbar-thumb"
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

ScrollbarTextArea.defaultProps = {
  className: '',
  value: '',
};
