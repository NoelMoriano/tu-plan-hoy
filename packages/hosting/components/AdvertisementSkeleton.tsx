interface Props {
  fontSize?: string;
}

export const AdvertisementSkeleton = ({ fontSize = "16px" }: Props) => {
  return (
    <div
      role="status"
      className={`w-auto max-w-[24em] p-3 space-y-4 bg-gray-100 dark:bg-gray-200 rounded-[10px] shadow-sm animate-pulse text-[${fontSize}]`}
    >
      <div className="flex items-center justify-between">
        <div className="w-[30em] h-[13em] bg-gray-200 rounded-[5px] dark:bg-gray-400"></div>
      </div>
      <div className="w-full mb-3">
        <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
        <div className="grid grid-cols-[auto,1fr] items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full dark:bg-gray-400"></div>
          <div className="w-[50%] h-3 bg-gray-200 rounded-full dark:bg-gray-400"></div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-5">
        <div className="w-[40%] h-3 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5" />
        <div>
          <div className="w-[6em] h-[2em] bg-gray-200 rounded-[.5em] dark:bg-gray-400 mb-2.5" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
