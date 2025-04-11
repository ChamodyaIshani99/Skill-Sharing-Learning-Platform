import React, { useState } from "react";

const LearningPlanForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([""]);
  const [resources, setResources] = useState([""]);
  const [timeline, setTimeline] = useState({ start: "", end: "" });

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...resources];
    newResources[index] = value;
    setResources(newResources);
  };

  const addTopic = () => setTopics([...topics, ""]);
  const addResource = () => setResources([...resources, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, topics, resources, timeline });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">Create Learning Plan</h2>

      <input
        type="text"
        placeholder="Plan Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <div>
        <label className="font-semibold">Topics</label>
        {topics.map((topic, i) => (
          <input
            key={i}
            type="text"
            value={topic}
            onChange={(e) => handleTopicChange(i, e.target.value)}
            className="w-full p-2 border rounded mt-1 mb-2"
          />
        ))}
        <button type="button" onClick={addTopic} className="text-blue-600">+ Add Topic</button>
      </div>

      <div>
        <label className="font-semibold">Resources</label>
        {resources.map((resource, i) => (
          <input
            key={i}
            type="text"
            value={resource}
            onChange={(e) => handleResourceChange(i, e.target.value)}
            className="w-full p-2 border rounded mt-1 mb-2"
          />
        ))}
        <button type="button" onClick={addResource} className="text-blue-600">+ Add Resource</button>
      </div>

      <div className="flex gap-4">
        <input
          type="date"
          value={timeline.start}
          onChange={(e) => setTimeline({ ...timeline, start: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={timeline.end}
          onChange={(e) => setTimeline({ ...timeline, end: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Plan
      </button>
    </form>
  );
};

export default LearningPlanForm;
