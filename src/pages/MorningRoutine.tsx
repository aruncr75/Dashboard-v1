import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, Clock, Droplet, Activity, BookOpen, Edit3, Coffee } from "lucide-react";

const MorningRoutine = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in p-4">
        {/* Top back button and header */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Morning Routine (Miracle Morning Routine)
          </h1>
        </div>
        
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
                <strong>Task 7.1:</strong> Find a Quiet Space - Sit comfortably and focus on your breathing or use a meditation app.
              </div>
            </li>
            <li>
              <div className="font-bold text-lg">b. Affirmations (2 minutes)</div>
              <div className="text-sm italic text-gray-400">
                <strong>Task 8.1:</strong> Repeat Positive Statements - Affirm your focus, productivity, and capability.
              </div>
            </li>
            <li>
              <div className="font-bold text-lg">c. Visualization (3 minutes)</div>
              <div className="text-sm italic text-gray-400">
                <strong>Task 9.1:</strong> Visualize Success - Imagine yourself efficiently completing your "Rule of 5" tasks.
              </div>
            </li>
            <li>
              <div className="font-bold text-lg">d. Exercise (10 minutes)</div>
              <div className="text-sm italic text-gray-400">
                <strong>Task 10.1:</strong> Perform a Quick Workout - Choose between yoga, stretching, bodyweight exercises, or a short jog.
              </div>
            </li>
            <li>
              <div className="font-bold text-lg">e. Reading (10 minutes)</div>
              <div className="text-sm italic text-gray-400">
                <strong>Task 11.1:</strong> Read for Personal Growth - Focus on professional development materials or inspirational content.
              </div>
            </li>
            <li>
              <div className="font-bold text-lg">f. Scribing/Journaling (5 minutes)</div>
              <div className="text-sm italic text-gray-400">
                <strong>Task 12.1:</strong> Write Reflections - Note insights from your reading and jot down ideas for work projects.
              </div>
            </li>
            <li>
              <div className="font-bold text-lg">g. Planning (5 minutes)</div>
              <div className="text-sm italic text-gray-400">
                <strong>Task 13.1:</strong> Review and Prioritize Tasks - Go over your "Rule of 5" tasks and schedule them into your day.
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
    </Layout>
  );
};

export default MorningRoutine;
