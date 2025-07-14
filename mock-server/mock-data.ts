// mockData.ts

export const prompts = [
  {
    prompt_id: 1,
    prompt_type: "ASSESSMENT",
    criteria: "Justification",
    description: "Is the need for the policy well-founded? Does the policy provide relevant context, data, or rationale for why it is needed?",
    technical_prompt: `You are evaluating the draft policy solely on the ‘Justification’ criterion. 
                      1) Carefully read every section of the draft. 
                      2) Identify and note why the policy says it is needed (problem statement, market gaps, legal obligations, statistics, context). 
                      3) In ≤ 40 words, summarise that rationale. 
                      4) Using the rubric below, assign a score 1‑5. 
                      5) Cite the exact section/page (or paragraph heading) that best supports your judgment. 
                      6) Return ONLY the JSON object described under ‘Expected JSON Output’. Do NOT add anything else.

                      Score 5 – Clear, data‑backed rationale with context & urgency  
                      4 – Strong rationale; minor evidence gaps  
                      3 – General claims; limited evidence  
                      2 – Vague need; little relevance  
                      1 – No discernible justification

                      json {
                        "criterion": "Justification",
                        "score": <1‑5>,
                        "reasoning": "<≤40 word summary>",
                        "ref": "<Section/page cited>"
                      }`,

    created_by: "Admin",
    created_on: "2025-06-16T17:31:18.042Z",
    updated_by: null,
    updated_on: "2025-06-16T17:31:18.042Z",
  },
  {
    prompt_id: 2,
    prompt_type: "ASSESSMENT",
    criteria: "Essential Elements",
    description: "Are the main objectives, provisions, or changes the policy introduces clearly stated? Does it specify what the policy aims to achieve?",
    technical_prompt: `Evaluate ONLY the ‘Essential Elements’ criterion. 
                              1) Read the policy thoroughly. 
                              2) List for yourself (a) stated objectives, (b) scope (who/what is covered), (c) key measures/incentives. 
                              3) Judge if these are complete and explicit. 
                              4) In ≤ 40 words, summarise ‘what’ the policy proposes. 
                              5) Score 1‑5 with rubric. 
                              6) Cite the best supporting section/page. 
                              7) Output exactly the JSON object defined.

                              5 – Objectives, scope & measures are all explicit & detailed  
                              4 – Most elements clear; minor gaps  
                              3 – Some elements vague/missing  
                              2 – Major omissions or confusion  
                              1 – Very unclear or absent

                              json {
                                "criterion": "Essential Elements",
                                "score": <1‑5>,
                                "reasoning": "<≤40 word summary>",
                                "ref": "<Section/page cited>"
                              }`,
    created_by: "Admin",
    created_on: "2025-06-16T17:31:59.994Z",
    updated_by: null,
    updated_on: "2025-06-16T17:31:59.994Z",
  },
  {
    prompt_id: 3,
    prompt_type: "ASSESSMENT",
    criteria: "Comprehension",
    description: "Is the policy text accessible, logically structured, and free of contradictions? Does it use clear language, headings, or summaries that aid understanding?",
    technical_prompt: "Assess the comprehension of the policy. Is the text accessible, logically structured, and free of contradictions? Does it use clear language, headings, or summaries that aid understanding?",
    created_by: "Admin",
    created_on: "2025-06-16T17:32:26.811Z",
    updated_by: null,
    updated_on: "2025-06-16T17:32:26.811Z",
  },
  {
    prompt_id: 4,
    prompt_type: "ASSESSMENT",
    criteria: "Problem Identification",
    description: "Does the policy define the root cause or specific issue it aims to address? Are challenges or market failures clearly outlined?",
    technical_prompt: "Assess the problem identification in the policy. Does it define the root cause or specific issue it aims to address? Are challenges or market failures clearly outlined?",
    created_by: "Admin",
    created_on: "2025-06-16T17:32:57.808Z",
    updated_by: null,
    updated_on: "2025-06-16T17:32:57.808Z",
  },
  {
    prompt_id: 5,
    prompt_type: "ASSESSMENT",
    criteria: "Cost-Benefit Analysis",
    description: "Does the policy include an economic or financial appraisal of its measures? Does it weigh potential benefits against costs or risks?",
    technical_prompt: "Assess the cost-benefit analysis in the policy. Does it include an economic or financial appraisal of its measures? Does it weigh potential benefits against costs or risks?",
    created_by: "Admin",
    created_on: "2025-06-16T17:33:43.541Z",
    updated_by: null,
    updated_on: "2025-06-16T17:33:43.541Z",
  },
  {
    prompt_id: 6,
    prompt_type: "ASSESSMENT",
    criteria: "Alternatives",
    description: "Does the draft discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    technical_prompt: "Assess the alternatives presented in the policy. Does it discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    created_by: "Admin",
    created_on: "2025-06-16T17:34:12.309Z",
    updated_by: null,
    updated_on: "2025-06-16T17:34:12.309Z",
  },
  {
    prompt_id: 7,
    prompt_type: "VALIDATION",
    criteria: "Alternatives",
    description: "Does the draft discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    technical_prompt: "Assess the alternatives presented in the policy. Does it discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    created_by: "Admin",
    created_on: "2025-06-16T17:34:12.309Z",
    updated_by: null,
    updated_on: "2025-06-16T17:34:12.309Z",
  },
  {
    prompt_id: 8,
    prompt_type: "SUMMARY",
    criteria: "Alternatives",
    description: "Does the draft discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    technical_prompt: "Assess the alternatives presented in the policy. Does it discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    created_by: "Admin",
    created_on: "2025-06-16T17:34:12.309Z",
    updated_by: null,
    updated_on: "2025-06-16T17:34:12.309Z",
  },
  {
    prompt_id: 9,
    prompt_type: "VALIDATION",
    criteria: "Alternatives",
    description: "Does the draft consider alternative policy models or strategies? Does it provide a rationale for why the selected approach was chosen over others?",
    technical_prompt: "Assess the alternatives presented in the policy. Does it discuss other policy models or approaches? Is there a reason the chosen approach is deemed preferable?",
    created_by: "Admin",
    created_on: "2025-06-16T17:34:12.309Z",
    updated_by: null,
    updated_on: "2025-06-16T17:34:12.309Z",
  },
  {
    prompt_id: 10,
    prompt_type: "SUMMARY",
    criteria: "Justification",
    description: "Is there a reason the chosen approach is deemed preferable?",
    technical_prompt: `You are summarizing the ‘Assessment Area’ of a policy document.

        1) Read the policy document thoroughly. 
        2) Identify the section or content that outlines the key focus or assessment area—i.e., what the policy is evaluating, targeting, or aiming to improve.
        3) Summarise the assessment area in clear and concise terms (max 50 words). Focus on the "what" and "why" of the policy’s evaluation or focus.
        4) Return ONLY the JSON object below. Do NOT include any extra explanation.

        json {
          "summary_type": "Assessment Area",
          "summary": "<max 50 word summary of the assessment area>",
          "ref": "<Section/page/heading where the assessment area is most clearly described>"
        }`,

    created_by: "Admin",
    created_on: "2025-06-16T17:34:12.309Z",
    updated_by: null,
    updated_on: "2025-06-16T17:34:12.309Z",
  },
];

export const assessmentAreas = [
  {
    assessment_id: 1,
    assessment_name: "Does the Draft Clearly Explain Why and What?",
    description: "This area evaluates the depth and breadth of impact analysis in the policy document.",
    summary_prompt: 1,
    created_by: "Admin",
    created_on: "2025-06-16T17:35:44.211Z",
    updated_by: null,
    updated_on: "2025-06-16T17:35:44.211Z",
    prompt_ids: [1, 2, 3],
  },
  {
    assessment_id: 2,
    assessment_name: "Does the Draft Thoroughly Assess the Impact?",
    description: "This area evaluates the depth and breadth of impact analysis in the policy document.",
    summary_prompt: 2,
    created_by: "Admin",
    created_on: "2025-06-16T17:36:54.925Z",
    updated_by: null,
    updated_on: "2025-06-21T20:20:32.539Z",
    prompt_ids: [1, 2],
  },
  {
    assessment_id: 3,
    assessment_name: "Does the Draft Enable Meaningful Public Participation?",
    description: "This area evaluates how well the policy enables and encourages public feedback and participation.",
    summary_prompt: 3,
    created_by: null,
    created_on: "2025-06-21T19:48:50.648Z",
    updated_by: null,
    updated_on: "2025-06-21T19:48:50.648Z",
    prompt_ids: [1],
  },
];

export const assessmentAreaPrompt = [
  { id: 1, assessment_id: 1, prompt_id: 1 },
  { id: 2, assessment_id: 1, prompt_id: 2 },
  { id: 3, assessment_id: 1, prompt_id: 3 },
  { id: 4, assessment_id: 2, prompt_id: 4 },
  { id: 5, assessment_id: 2, prompt_id: 5 },
  { id: 6, assessment_id: 2, prompt_id: 6 },
  { id: 7, assessment_id: 3, prompt_id: 1 },
  { id: 8, assessment_id: 3, prompt_id: 2 },
];

export const documentTypes = [
  {
    doc_type_id: 1,
    doc_type_name: "Consultation",
    description: "Documents related to public or internal consultations on policy matters. updated",
    created_by: "admin_user",
    created_on: "2025-06-16T17:40:59.873Z",
    updated_by: null,
    updated_on: "2025-06-21T20:27:55.850Z",
    assessment_ids: [1, 2, 3],
  },
  {
    doc_type_id: 2,
    doc_type_name: "Law Order",
    description: "Legal documents including new laws, orders, or government acts.",
    created_by: "admin_user",
    created_on: "2025-06-16T17:41:17.774Z",
    updated_by: null,
    updated_on: "2025-06-16T17:41:17.774Z",
    assessment_ids: [1],
  },
  {
    doc_type_id: 3,
    doc_type_name: "Amendment",
    description: "Documents describing proposed or enacted changes to existing laws or policies.",
    created_by: "admin_user",
    created_on: "2025-06-16T17:41:34.749Z",
    updated_by: null,
    updated_on: "2025-06-16T17:41:34.749Z",
    assessment_ids: [2, 3],
  },
];

export const documentTypeAssessmentArea = [
  { id: 1, doc_type_id: 1, assessment_id: 1 },
  { id: 2, doc_type_id: 1, assessment_id: 2 },
  { id: 3, doc_type_id: 2, assessment_id: 1 },
  { id: 4, doc_type_id: 3, assessment_id: 2 },
  { id: 7, doc_type_id: 1, assessment_id: 3 },
  { id: 8, doc_type_id: 3, assessment_id: 3 },
];

export const documentMetadata = [
  {
    doc_id: "a0529cb6dc1e123d444db079d824b3e4cceeaff9c8e7abe4eca5b192f14d31d5",
    file_name: "Electronic_Toys_Policy_14dot3 (1).pdf",
    file_type: "application/pdf",
    upload_time: "2025-06-16T23:13:38.603Z",
    number_of_pages: 26,
    doc_size_kb: 951,
  },
  {
    doc_id: "36142d55edd7c4784f86b33ea20365430a1fcec64771006979d9ab95871adb2f",
    file_name: "Odisha State Data Policy(OSDP)-2024_v07 (1)_0.pdf",
    file_type: "application/pdf",
    upload_time: "2025-06-22T17:12:43.609Z",
    number_of_pages: 39,
    doc_size_kb: 1189,
  },
  {
    doc_id: "feee3807cadc5677d4fd630076e876a369253b1b39140f8caf6c256f370214bf",
    file_name: "DRAFTDISCLOSURECLIMATERELATEDFINANCIALRISKS20249FBE3A566E7F487EBF9974642E6CCDB1 (1).pdf",
    file_type: "application/pdf",
    upload_time: "2025-06-22T17:14:30.826Z",
    number_of_pages: 12,
    doc_size_kb: 568,
  },
];
