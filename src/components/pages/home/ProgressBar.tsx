import { JSX } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressBarProps): JSX.Element => {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <span className="font-semibold" suppressHydrationWarning>
        {Math.round(percent)}%
      </span>
      <Progress value={percent} className="[&>div]:bg-green-600" />
    </div>
  );
};

export default ProgressBar;
