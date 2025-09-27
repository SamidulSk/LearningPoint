import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";

function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role, data } = useSelector((state) => state.auth);
    const subscription = data?.subscription;


    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteCourseLecture({ courseId, lectureId }));
        await dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        if (!state) navigate("/courses");

        // Only fetch lectures if user is admin or subscribed
        if (role === "ADMIN" || subscription?.status === "active") {
            dispatch(getCourseLectures(state._id));
        }
    }, [state, role, subscription]);

    if (!state) return null;
    //
    console.log("role:", role);
    console.log("subscription:", subscription);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                {/* Access check */}
                {role !== "ADMIN" && subscription?.status !== "active" ? (
                    <p className="text-red-500 text-center text-lg">
                        You need an active subscription to view the lectures.
                    </p>

                ) : lectures && lectures.length > 0 ? (
                    <div className="flex justify-center gap-10 w-full">
                        {/* Left: Video player and lecture details */}
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video
                                src={lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            ></video>
                            <div>
                                <h1>
                                    <span className="text-yellow-500">Title: </span>
                                    {lectures[currentVideo]?.title}
                                </h1>
                                <p>
                                    <span className="text-yellow-500 line-clamp-4">
                                        Description:{" "}
                                    </span>
                                    {lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/* Right: Lecture list */}
                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures list</p>
                                {role === "ADMIN" && (
                                    <button
                                        onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                                        className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                                    >
                                        Add new lecture
                                    </button>
                                )}
                            </li>
                            {lectures.map((lecture, idx) => (
                                <li className="space-y-2" key={lecture._id}>
                                    <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                        <span>Lecture {idx + 1} : </span>
                                        {lecture?.title}
                                    </p>
                                    {role === "ADMIN" && (
                                        <button
                                            onClick={() => onLectureDelete(state._id, lecture._id)}
                                            className="btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                                        >
                                            Delete lecture
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    role === "ADMIN" && (
                        <button
                            onClick={() => navigate("/course/addlecture", { state: { ...state } })}
                            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                        >
                            Add new lecture
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;
