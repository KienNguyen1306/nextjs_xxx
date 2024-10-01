function SkeletonNar({ itemCount }) {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-wrap items-center	gap-5	"
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20 "
        ></div>
      ))}
    </div>
  );
}

export default SkeletonNar;
