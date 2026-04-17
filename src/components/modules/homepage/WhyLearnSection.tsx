"use client";
import React from "react";
import { BookOpen, Award, TrendingUp, Users } from "lucide-react";

const features = [
  {
    title: "Interactive Learning",
    description: "Access knowledge curated by industry professionals.",
    icon: BookOpen,
    color: "orange",
  },
  {
    title: "Expert Guidance",
    description: "Access knowledge curated by industry professionals.",
    icon: Award,
    color: "green",
  },
  {
    title: "Career Advancement",
    description: "Access knowledge curated by industry professionals.",
    icon: TrendingUp,
    color: "orange",
  },
  {
    title: "Community Support",
    description: "Access knowledge curated by industry professionals.",
    icon: Users,
    color: "green",
  },
];

const Card = ({ item }: { item: (typeof features)[0] }) => {
  const Icon = item.icon;

  return (
    <div
      className={`group bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden`}
    >
      {/* Bottom border accent */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 ${
          item.color === "orange"
            ? "bg-orange-500"
            : "bg-green-500"
        }`}
      />

      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-xl bg-orange-50 dark:bg-gray-800">
        <Icon className="w-8 h-8 text-orange-500" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );
};

const WhyLearnSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Why learn with
          </h2>
          <h2 className="text-4xl font-bold text-orange-500 italic mt-2">
            Skillhub?
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearnSection;
