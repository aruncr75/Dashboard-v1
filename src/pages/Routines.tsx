import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Calendar, BookOpen, Edit3, Clock, Droplet, Sun, Coffee } from "lucide-react";

const MorningRoutineContent = () => (
  <div className="space-y-6 p-4">
    {/* Section 1: Wake Up Early */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-yellow-500">
        <Clock className="w-6 h-6 mr-2" />
        1. Wake Up Early
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 5.1: Set Your Alarm</div>
          <div className="text-sm italic text-gray-400">
            Set your alarm for <span className="text-white">6:00 AM</span> and place it away from your bed to encourage getting up.
          </div>
        </li>
      </ul>
    </section>
    {/* Section 2: Hydrate */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-blue-400">
        <Droplet className="w-6 h-6 mr-2" />
        2. Hydrate
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 6.1: Drink Water</div>
          <div className="text-sm italic text-gray-400">
            Immediately after waking, drink a full glass of water.
          </div>
        </li>
      </ul>
    </section>
    {/* Section 3: Miracle Morning Activities */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-green-400">
        <Sun className="w-6 h-6 mr-2" />
        3. Miracle Morning Activities (~45 Minutes)
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">a. Silence/Meditation (5 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 7.1:</strong> Find a quiet space – sit comfortably and focus on your breathing or use a meditation app.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">b. Affirmations (2 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 8.1:</strong> Repeat positive statements to affirm your focus, productivity, and capability.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">c. Visualization (3 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 9.1:</strong> Visualize success – imagine yourself efficiently completing your "Rule of 5" tasks.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">d. Exercise (10 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 10.1:</strong> Perform a quick workout – choose between yoga, stretching, bodyweight exercises, or a short jog.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">e. Reading (10 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 11.1:</strong> Read for personal growth – focus on professional development materials or inspirational content.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">f. Scribing/Journaling (5 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 12.1:</strong> Write reflections – note insights from your reading and jot down work ideas.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">g. Planning (5 minutes)</div>
          <div className="text-sm italic text-gray-400">
            <strong>Task 13.1:</strong> Review and prioritize tasks – go over your "Rule of 5" tasks and schedule them into your day.
          </div>
        </li>
      </ul>
    </section>
    {/* Section 4: Healthy Breakfast */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-orange-400">
        <Coffee className="w-6 h-6 mr-2" />
        4. Healthy Breakfast
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 14.1: Prepare a Nutritious Meal</div>
          <div className="text-sm italic text-gray-400">
            Include proteins, whole grains, and fruits or vegetables.
          </div>
        </li>
      </ul>
    </section>
  </div>
);

const EveningRoutineContent = () => (
  <div className="space-y-6 p-4">
    {/* Section 1: Set a Consistent Bedtime */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-yellow-300">
        <Moon className="w-6 h-6 mr-2" />
        1. Set a Consistent Bedtime
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 1.1: Decide on a Bedtime</div>
          <div className="text-sm italic text-gray-400">
            Aim to be in bed by <span className="text-white">10:30 PM</span> every night.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">Task 1.2: Begin Wind-Down Routine</div>
          <div className="text-sm italic text-gray-400">
            Start your wind-down activities around <span className="text-white">9:30 PM</span>.
          </div>
        </li>
      </ul>
    </section>
    {/* Section 2: Plan for Tomorrow */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-green-400">
        <Calendar className="w-6 h-6 mr-2" />
        2. Plan for Tomorrow
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 2.1: Identify "Rule of 5" Tasks</div>
          <div className="text-sm italic text-gray-400">
            Write down the five most important tasks for the next day and ensure alignment with your goals.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">Task 2.2: Prepare Morning Items</div>
          <div className="text-sm italic text-gray-400">
            Lay out your workout clothes and set out materials for Miracle Morning activities (journal, books).
          </div>
        </li>
      </ul>
    </section>
    {/* Section 3: Wind-Down Routine */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-blue-400">
        <BookOpen className="w-6 h-6 mr-2" />
        3. Wind-Down Routine
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 3.1: Avoid Screens Before Bed</div>
          <div className="text-sm italic text-gray-400">
            Turn off electronic devices 30–60 minutes before bedtime.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">Task 3.2: Engage in Relaxation Activities</div>
          <div className="text-sm italic text-gray-400">
            Read a physical book, meditate or practice deep breathing for 5–10 minutes, or do gentle stretching/yoga.
          </div>
        </li>
      </ul>
    </section>
    {/* Section 4: Reflect and Set Intentions */}
    <section>
      <h2 className="flex items-center text-2xl font-semibold mb-2 text-purple-400">
        <Edit3 className="w-6 h-6 mr-2" />
        4. Reflect and Set Intentions
      </h2>
      <ul className="list-decimal ml-8 space-y-4">
        <li>
          <div className="font-bold text-lg">Task 4.1: Evening Journaling</div>
          <div className="text-sm italic text-gray-400">
            Write down lingering thoughts to clear your mind and note something positive about your day.
          </div>
        </li>
        <li>
          <div className="font-bold text-lg">Task 4.2: Affirmations</div>
          <div className="text-sm italic text-gray-400">
            Repeat positive statements about your ability to improve and succeed.
          </div>
        </li>
      </ul>
    </section>
  </div>
);

const Routines = () => {
  const [activeRoutine, setActiveRoutine] = useState<"morning" | "evening">("morning");

  return (
    <Layout>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 border-b border-gray-700">
          <button
            onClick={() => setActiveRoutine("morning")}
            className={`py-2 px-4 ${
              activeRoutine === "morning"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-400"
            }`}
          >
            Morning Routine
          </button>
          <button
            onClick={() => setActiveRoutine("evening")}
            className={`py-2 px-4 ${
              activeRoutine === "evening"
                ? "border-b-2 border-blue-400 text-blue-400"
                : "text-gray-400"
            }`}
          >
            Evening Routine
          </button>
        </div>
        {/* Routine Content Based on Selected Tab */}
        <div className="w-full">{activeRoutine === "morning" ? <MorningRoutineContent /> : <EveningRoutineContent />}</div>
      </div>
    </Layout>
  );
};

export default Routines;
