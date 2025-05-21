const documentTypes = [
  {
    id: "law",
    name: "Law & Legislation",
    description: "Legal documents, bills, and legislative proposals"
  },
  {
    id: "policy",
    name: "Policy Document",
    description: "Government policies, guidelines, and strategic documents"
  },
  {
    id: "regulation",
    name: "Regulation",
    description: "Regulatory frameworks and compliance documents"
  },
  {
    id: "directive",
    name: "Directive",
    description: "Executive directives and administrative orders"
  }
];

const assessmentPrompts = {
  law: [
    {
      id: 1,
      title: "Legal Framework Analysis",
      description: "Evaluation of legal basis and constitutional alignment",
      prompts: [
        {
          id: 1,
          question: "Does the legislation align with existing constitutional principles?",
          category: "Legal Basis",
          isRequired: true
        },
        {
          id: 2,
          question: "Are there potential conflicts with existing laws or regulations?",
          category: "Legal Consistency",
          isRequired: true
        },
        {
          id: 3,
          question: "Does the legislation provide clear enforcement mechanisms?",
          category: "Implementation",
          isRequired: true
        }
      ]
    },
    {
      id: 2,
      title: "Stakeholder Impact Assessment",
      description: "Analysis of impact on different stakeholder groups",
      prompts: [
        {
          id: 4,
          question: "What are the key stakeholder groups affected by this legislation?",
          category: "Stakeholder Analysis",
          isRequired: true
        },
        {
          id: 5,
          question: "How does this legislation protect vulnerable groups?",
          category: "Social Impact",
          isRequired: true
        }
      ]
    }
  ],
  policy: [
    {
      id: 3,
      title: "Policy Effectiveness Analysis",
      description: "Evaluation of policy objectives and implementation",
      prompts: [
        {
          id: 6,
          question: "Are the policy objectives clearly defined and measurable?",
          category: "Objectives",
          isRequired: true
        },
        {
          id: 7,
          question: "What are the key performance indicators for measuring success?",
          category: "Evaluation",
          isRequired: true
        }
      ]
    }
  ],
  regulation: [
    {
      id: 4,
      title: "Regulatory Impact Assessment",
      description: "Analysis of regulatory burden and compliance costs",
      prompts: [
        {
          id: 8,
          question: "What are the compliance costs for regulated entities?",
          category: "Economic Impact",
          isRequired: true
        },
        {
          id: 9,
          question: "Are there alternatives that could achieve the same objectives with less burden?",
          category: "Alternatives",
          isRequired: true
        }
      ]
    }
  ],
  directive: [
    {
      id: 5,
      title: "Implementation Analysis",
      description: "Assessment of implementation feasibility and timeline",
      prompts: [
        {
          id: 10,
          question: "Is the implementation timeline realistic and well-defined?",
          category: "Timeline",
          isRequired: true
        },
        {
          id: 11,
          question: "Are the resource requirements clearly identified?",
          category: "Resources",
          isRequired: true
        }
      ]
    }
  ]
};

module.exports = {
  documentTypes,
  assessmentPrompts
};
