import { useEffect, useState } from "react";

/*
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }
*/

export function WindowSize() {
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (width === null || height === null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 bg-gray-100 p-2 text-xs text-gray-500">
      <div className="flex items-center justify-center">
        <div className="mr-2">Width: {width}px</div>
        <div className="mr-2">Height: {height}px</div>
        <div>Tailwind Responsive Design: {GetResponsiveDesignSize(width)}</div>
      </div>
    </div>
  );
}

const GetResponsiveDesignSize = (w: number) => {
  if (w <= 640) {
    return 'sm';
  } else if (w <= 768) {
    return 'md';
  } else if (w <= 1024) {
    return 'lg';
  } else if (w <= 1280) {
    return 'xl';
  } else if (w <= 1536) {
    return '2xl';
  } else {
    return '2xl';
  }
};
