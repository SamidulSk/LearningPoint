import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="w-full max-w-sm h-[430px] bg-zinc-700 dark:bg-gray-800 text-white shadow-lg rounded-lg cursor-pointer group overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <img
          className="h-48 w-full object-cover rounded-tl-lg rounded-tr-lg group-hover:scale-105 transition-transform duration-300"
          src={data?.thumbnail?.secure_url}
          alt={data?.title}
        />
      </div>

      {/* Course Details */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
          {data?.title}
        </h2>
        <p className="text-gray-200 dark:text-gray-300 text-sm line-clamp-2">
          {data?.description}
        </p>
        <p className="text-gray-100 dark:text-gray-200 font-semibold text-sm">
          <span className="text-yellow-500 font-bold">Category: </span>
          {data?.category}
        </p>
      
        <p className="text-gray-100 dark:text-gray-200 font-semibold text-sm">
          <span className="text-yellow-500 font-bold">Instructor: </span>
          {data?.createdBy}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
