const HierarchyView = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Hierarchy View</h2>
      <div className="bg-white border p-4 rounded shadow">
        <p><strong>Document Type:</strong> Financial Report Q1</p>
        <p><strong>↳ Criteria:</strong> Clarity of content</p>
        <p><strong>↳↳ Prompt:</strong> Is the language clear and unambiguous?</p>
      </div>
    </div>
  );
};

export default HierarchyView;