import { Skeleton } from "./ui/skeleton";

const TooltipQuestionmark = () => {
  return (
    <Skeleton className="flex justify-center  items-center w-4 h-4 rounded-full">
      <span className="text-xs">?</span>
    </Skeleton>
  );
};

export default TooltipQuestionmark;
