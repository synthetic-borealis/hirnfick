import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import './Dropdown.scss';

interface IDropdownProps {
  options: string[];
  defaultSelectedIndex?: number;
  onSelectOption?: (index: number) => void;
  disabled?: boolean;
  name?: string;
  displayedItems?: number;
  className?: string;
}

export default function Dropdown({
  options,
  defaultSelectedIndex,
  onSelectOption,
  disabled,
  name,
  displayedItems,
  className,
}: IDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(defaultSelectedIndex as number);
  const [thumbHeight, setThumbHeight] = useState<number>(20);
  const [isDraggingThumb, setIsDraggingThumb] = useState<boolean>(false);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [currentScrollPosition, setCurrentScrollPosition] = useState<number>(0);
  const [viewportID] = useState<string>(nanoid());
  const showScrollbar = options.length > (displayedItems as number);

  function handleHeaderClick() {
    setIsOpen(!isOpen);
  }

  function selectOptionAndClose(optionIndex: number) {
    setSelectedOption(optionIndex);
    if (onSelectOption) {
      onSelectOption(optionIndex);
    }
    setIsOpen(false);
  }

  function handleKeyDown(index: number) {
    return (evt: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }
      switch (evt.key) {
        case ' ':
        case 'SpaceBar':
        case 'Enter':
          evt.preventDefault();
          selectOptionAndClose(index);
          break;
        default:
          break;
      }
    };
  }

  function handleHeaderKeyDown(evt: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }
    switch (evt.key) {
      case 'ArrowUp':
        evt.preventDefault();
        setSelectedOption(selectedOption === 0 ? options.length - 1 : selectedOption - 1);
        break;
      case 'ArrowDown':
        evt.preventDefault();
        setSelectedOption(selectedOption === options.length - 1 ? 0 : selectedOption + 1);
        break;
      case 'Escape':
        evt.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  }

  function handleContentResize(ref: HTMLDivElement, trackSize: number) {
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

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !thumbRef.current || !trackRef.current) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = trackRef.current;
    const newTop = Math.min((contentTop / contentHeight) * trackHeight, trackHeight - thumbHeight);
    const thumb = thumbRef.current;
    const newThumbPosition = (thumb.offsetTop / Math.floor(trackHeight - thumbHeight)) * 100;
    setCurrentScrollPosition(newThumbPosition);

    thumb.style.top = `${newTop}px`;
  }, [thumbHeight]);

  const handleTrackClick = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      const [{ current: trackCurrent }, { current: contentCurrent }] = [trackRef, contentRef];

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

  const handleThumbPointerDown = useCallback((evt: React.PointerEvent<HTMLDivElement>) => {
    if (!(evt.pointerType === 'mouse' && evt.button !== 0)) {
      evt.preventDefault();
      evt.stopPropagation();
      setScrollStartPosition(evt.clientY);
      if (contentRef.current) {
        setInitialScrollTop(contentRef.current.scrollTop);
      }
      setIsDraggingThumb(true);
    }
  }, []);

  const handleThumbPointerUpOrLeave = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      if (!(evt.pointerType === 'mouse' && evt.button !== 0)) {
        evt.preventDefault();
        evt.stopPropagation();
        if (isDraggingThumb) {
          setIsDraggingThumb(false);
        }
      }
    },
    [isDraggingThumb],
  );

  const handleThumbPointerMove = useCallback(
    (evt: React.PointerEvent<HTMLDivElement>) => {
      if (isDraggingThumb && contentRef.current) {
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
    [initialScrollTop, isDraggingThumb, scrollStartPosition, thumbHeight],
  );

  useEffect(() => {
    function handleClickOutside(evt: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(evt.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (headerRef.current && contentRef.current && trackRef.current && isOpen && showScrollbar) {
      // Set the viewport height
      const { clientHeight: headerHeight } = headerRef.current;
      const itemHeight = headerHeight + 2;
      const actualDisplayedItems = Math.min(displayedItems as number, options.length);
      const maxHeight = itemHeight * actualDisplayedItems;
      contentRef.current.style.maxHeight = `${maxHeight}px`;

      // Scroll until the selected option is in view
      const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
      const contentBottom = contentTop + itemHeight * (displayedItems as number);

      // Is the selected item not in view?
      if (selectedOption * itemHeight + 1 > contentBottom) {
        const newTop = Math.max(
          Math.min(
            (selectedOption - ((displayedItems as number) - 1)) * itemHeight,
            contentHeight - itemHeight,
          ),
          0,
        );
        contentRef.current.scrollTo({ top: newTop });
      }

      // Set the thumb height
      const ref = contentRef.current;
      const { clientHeight: trackSize } = trackRef.current;
      observer.current = new ResizeObserver(() => {
        handleContentResize(ref, trackSize);
      });
      observer.current?.observe(ref);

      return () => {
        observer.current?.unobserve(ref);
      };
    }
    return () => {
    };
  }, [isOpen, displayedItems, options, selectedOption, showScrollbar]);
  const dropdownClasses = () => {
    const classList = ['Dropdown'];
    if (disabled) {
      classList.push('Dropdown__disabled');
    }
    if (className) {
      classList.push(className);
    }
    return classList.join(' ');
  };

  return (
    <div
      className={dropdownClasses()}
      ref={rootRef}
      aria-disabled={disabled}
    >
      <button
        type="button"
        className="Dropdown__header"
        ref={headerRef}
        aria-haspopup="listbox"
        onClick={handleHeaderClick}
        onKeyDown={handleHeaderKeyDown}
      >
        <span className="Dropdown__header-text">{options[selectedOption]}</span>
        <span
          className={`Dropdown__header-text Dropdown__arrow-icon${isOpen ? ' Dropdown__arrow-icon_inverted' : ''}`}
        >
          ↓
        </span>
      </button>
      {isOpen ? (
        <div
          className="Dropdown__options-wrapper"
          onWheel={handleWheel}
          onPointerUp={handleThumbPointerUpOrLeave}
          onPointerLeave={handleThumbPointerUpOrLeave}
          onPointerMove={handleThumbPointerMove}
        >
          <div
            className="Dropdown__options-container"
            ref={contentRef}
            onScroll={handleThumbPosition}
          >
            <ul
              role="listbox"
              className="Dropdown__options"
              id={viewportID}
              aria-activedescendant={options[selectedOption]}
              aria-expanded={isOpen}
              aria-label={name as string}
              tabIndex={-1}
            >
              {options.map((option, index) => (
                <li
                  className="Dropdown__option"
                  id={option}
                  key={option}
                  role="option"
                  aria-selected={selectedOption === index}
                  tabIndex={0}
                  onKeyDown={handleKeyDown(index)}
                  onClick={() => selectOptionAndClose(index)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          {showScrollbar ? (
            <div
              className="Dropdown__scrollbar"
              role="scrollbar"
              aria-controls={viewportID}
              aria-valuenow={currentScrollPosition}
              aria-orientation="vertical"
            >
              <div
                className="Dropdown__scrollbar-track"
                ref={trackRef}
                onClick={handleTrackClick}
                role="none"
              />
              <div
                className="Dropdown__scrollbar-thumb"
                ref={thumbRef}
                onPointerDown={handleThumbPointerDown}
                style={{
                  height: `${thumbHeight}px`,
                  cursor: isDraggingThumb ? 'grabbing' : 'grab',
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

Dropdown.defaultProps = {
  defaultSelectedIndex: 0,
  onSelectOption: undefined,
  disabled: false,
  name: 'select-component',
  displayedItems: 4,
  className: '',
};
