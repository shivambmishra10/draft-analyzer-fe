const Prompts = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Prompt Templates</h2>
      <div className="space-y-3">
        <div className="border p-4 rounded shadow-sm bg-white">
          <strong>Prompt 1:</strong> What are the key objectives of the document?
        </div>
        <div className="border p-4 rounded shadow-sm bg-white">
          <strong>Prompt 2:</strong> How does the policy align with national goals?
        </div>
        <div className="border p-4 rounded shadow-sm bg-white">
          <strong>Prompt 3:</strong> What data supports the recommendations?
        </div>
      </div>
    </div>
  );
};

export default Prompts;