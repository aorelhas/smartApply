"use client";
import { useState, useRef, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function TechStackFilter({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Common tech suggestions
  const techSuggestions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Next.js",
    "Vue",
    "Angular",
    "Svelte",
    "Go",
  ];

  useEffect(() => {
    if (inputValue) setShowSuggestions(true);
  }, [inputValue]);

  const addTech = (tech?: string) => {
    const techToAdd = (tech || inputValue).trim();
    if (techToAdd && !value.includes(techToAdd)) {
      onChange([...value, techToAdd]);
      setInputValue("");
    }
  };

  const removeTech = (tech: string) => {
    onChange(value.filter((t) => t !== tech));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addTech();
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tech Stack
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search technologies..."
          className="block w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <FiX className="h-4 w-4 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>

      {/* Tech suggestions dropdown */}
      {showSuggestions && inputValue && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-60 overflow-auto">
          {techSuggestions
            .filter(
              (tech) =>
                tech.toLowerCase().includes(inputValue.toLowerCase()) &&
                !value.includes(tech)
            )
            .map((tech) => (
              <div
                key={tech}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                onMouseDown={() => addTech(tech)}
              >
                <span className="font-normal block truncate">{tech}</span>
              </div>
            ))}

          {inputValue &&
            !techSuggestions.some((tech) =>
              tech.toLowerCase().includes(inputValue.toLowerCase())
            ) && (
              <div
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-primary-600 hover:bg-gray-50"
                onMouseDown={() => addTech()}
              >
                <span className="font-medium block truncate">
                  Add "<span className="font-bold">{inputValue}</span>"
                </span>
              </div>
            )}
        </div>
      )}

      {/* Selected tech tags */}
      {value.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center pl-2.5 pr-1 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="ml-1.5 rounded-full hover:bg-gray-200 p-0.5 transition-colors"
              >
                <FiX className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
