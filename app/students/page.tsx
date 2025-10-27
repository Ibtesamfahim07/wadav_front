import Image from "next/image";

const StudentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-4">
      {/* White container (full page content) */}
      <div className="bg-white rounded-lg shadow-sm max-w-5xl w-full p-8 md:p-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Wadav Scholarship 2022
          </h1>

          <div className="relative mb-8 w-80 h-80 mx-auto">
            <Image
              src="/images/Wadav-Scholarship.png"
              alt="Wadav Scholarship"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We believe in contributing to the education division by the way of
            starting a scholarship program. So, we are excited to offer this
            scholarship to the hardworking graduate or undergraduate students
            each year, who share the comparative enthusiasm with us: If you
            trust that you have what it takes to get this scholarship award, you
            are most welcome to try it out.
          </p>
        </section>

        {/* Scholarship Award Section */}
        <section className="text-center mb-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Scholarship Award
          </h2>
          <p className="text-lg text-gray-700 mb-6 font-medium">
            We will be awarding a total of $1000 to the top 3 students who
            submit the best article
          </p>

          <p className="text-base text-gray-600">
            1st prize: <strong>$500 USD</strong> &nbsp;&nbsp;|&nbsp;&nbsp; 2nd
            prize: <strong>$300 USD</strong> &nbsp;&nbsp;|&nbsp;&nbsp; 3rd
            prize: <strong>$200 USD</strong>
          </p>
        </section>

        {/* Application Deadline & Award Schedule */}
        <section className="relative mb-12">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Application Deadline & Award Schedule
              </h3>
              <ul className="text-gray-700 text-lg space-y-2 list-disc list-inside">
                <li>The last date we will be accepting submissions is July 31st</li>
                <li>The winner will be picked by August 20th, 2022</li>
                <li>The scholarship will be sent over before August 30th</li>
                <li>Next application period will begin on September 1st</li>
              </ul>
            </div>
            <div className="flex-shrink-0 ml-6 mt-2">
              <Image
                src="/images/icon1.png"
                alt="Deadline Icon"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="relative mb-12">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Eligibility Criteria
              </h3>
              <ul className="text-gray-700 text-lg space-y-2 list-disc list-inside">
                <li>Applicants must be citizens or nationals of United States</li>
                <li>The applicants must have at least GPA 3.0</li>
                <li>
                  Students who have already applied yet have not been granted as
                  finalists are asked to apply once more
                </li>
                <li>
                  Applicants must be full-time students in a United States
                  institution for graduate or undergraduate program
                </li>
                <li>A short statement about your cash-related necessities</li>
                <li>No participation fee is required</li>
              </ul>
            </div>
            <div className="flex-shrink-0 ml-6 mt-2">
              <Image
                src="/images/icon2.png"
                alt="Eligibility Icon"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Judging Factors */}
        <section className="relative mb-12">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Submissions will be judged on the Following Factors
              </h3>
              <ul className="text-gray-700 text-lg space-y-2 list-disc list-inside">
                <li>
                  <strong>Uniqueness:</strong> Article must be your original
                  work. Plagiarism will not be tolerated.
                </li>
                <li>
                  The article must be creative, free from grammatical mistakes,
                  spelling, and most importantly – be yourself.
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0 ml-6 mt-2">
              <Image
                src="/images/icon3.png"
                alt="Judging Icon"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="border-t pt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">How to Apply</h3>
          <p className="text-lg text-gray-700 mb-4">
            Write a piece of content at least 1500 - 2000 words on
          </p>
          <p className="text-xl font-bold text-gray-900 mb-6 italic">
            "How to Better Budget Your Expenses During University Life"
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The 2 mediums you can use to create content are:
          </p>
          <ul className="text-lg text-gray-700 space-y-2 list-disc list-inside mb-6">
            <li>Infographic</li>
            <li>Text post</li>
          </ul>
          <p className="text-lg text-gray-700">
            Send your submissions to{" "}
            <span className="font-semibold">scholarship@wadav.com</span>, along
            with your name, university name & your majors at university. The
            subject of your email must be
          </p>
          <p className="text-lg font-bold text-gray-900 mt-2">
            "Wadav Scholarship for 2022"
          </p>
        </section>
      </div>
    </div>
  );
};

export default StudentsPage;
