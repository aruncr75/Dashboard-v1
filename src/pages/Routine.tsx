import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Calendar, BookOpen, Edit3 } from "lucide-react";

const Routine = () => {
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Evening Preparation (Night Before)
          </h1>
        </div>
        
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
                Write down any lingering thoughts to clear your mind and note something positive about your day.
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
    </Layout>
  );
};

export default Routine;
