interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}
      >
        <div
          className={`bg-primary-600 ${sizes[size]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {Math.round(percentage)}% complete
        </span>
      )}
    </div>
  );
}
