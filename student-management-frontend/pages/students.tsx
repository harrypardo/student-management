import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
  tutor: string;
}
const Students: NextPage<Props> = ({ tutor }) => {
  const [students, setStudents] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${backend_url}/api/getcommonstudents`, {
        params: { tutor: [tutor] },
      })
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        toast.error(`Error: ${err}`, {position: "top-center",});
      });
  }, [tutor]);

  const renderList = () => {
    return students.map((student, index) => (
      <li
        key={`${student}-${index}`}
        className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
      >
        {student}
      </li>
    ));
  };

  return (
    <>
     
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://as1.ftcdn.net/v2/jpg/01/05/29/62/1000_F_105296263_MX030meFkK57Jj7z4TaSZXw1T0KPQXmd.jpg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Students
          </h2>
        </div>
      </div>
      <ToastContainer />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
          {renderList()}
        </ul>
      </div>
    </>
  );
};

Students.getInitialProps = async ({ query }) => {
  const tutor = query.tutor as string;
  return { tutor };
};

export default Students;
