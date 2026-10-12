// Mock AI Response Engine for LearnSphere Prototype
// All responses are simulated educational samples with clear prototype disclaimers.

export const generateConceptExplanation = (topic, mode = 'simple', language = 'English') => {
  const isHindi = language === 'Hindi' || mode === 'bilingual_hi';
  const isTamil = language === 'Tamil' || mode === 'bilingual_ta';

  // Topic specific or general fallback
  if (topic.includes('AVL') || topic.includes('Balance Factor') || topic.includes('Rotations')) {
    if (mode === 'simple') {
      return {
        mode: "Simple Explanation",
        summary: "An AVL tree is a self-adjusting binary tree that keeps itself balanced so looking up numbers is always fast.",
        content: `Imagine organizing a phonebook: if you keep adding names in alphabetical order, a normal tree becomes one long straight line (like a linked list) which is slow to search.

An **AVL tree** checks its height after every single addition. If one side gets taller than the other by more than 1 level, it automatically does a quick 'rotation' to bring the middle item to the top. This guarantees your searches always take logarithmic time $O(\\log n)$.`,
        takeaway: "Key intuition: It acts like a self-leveling scale that prevents the tree from tilting too much to one side."
      };
    } else if (mode === 'stepByStep') {
      return {
        mode: "Step-by-Step Explanation",
        summary: "Step-by-step mechanics of calculating balance and executing single & double rotations.",
        content: `Here is the step-by-step algorithm executed when inserting a node into an AVL tree:

1. **Step 1 (Standard BST Insertion)**: Insert the new key using regular Binary Search Tree rules (smaller goes left, greater goes right).
2. **Step 2 (Update Heights)**: Backtrack up the ancestor path and recalculate the height for every visited node:
   $$\\text{Height}(u) = 1 + \\max(\\text{Height}(u.\\text{left}), \\text{Height}(u.\\text{right}))$$
3. **Step 3 (Calculate Balance Factor)**: For each node, compute:
   $$\\text{BF} = \\text{Height}(u.\\text{left}) - \\text{Height}(u.\\text{right})$$
4. **Step 4 (Detect Imbalance & Classify Rotation)**:
   - **Case LL (Left-Left)**: $\\text{BF} > 1$ and key < left child. **Fix**: 1 Right Rotation on node $u$.
   - **Case RR (Right-Right)**: $\\text{BF} < -1$ and key > right child. **Fix**: 1 Left Rotation on node $u$.
   - **Case LR (Left-Right)**: $\\text{BF} > 1$ and key > left child. **Fix**: 1 Left Rotation on left child, then 1 Right Rotation on node $u$.
   - **Case RL (Right-Left)**: $\\text{BF} < -1$ and key < right child. **Fix**: 1 Right Rotation on right child, then 1 Left Rotation on node $u$.
5. **Step 5 (Done)**: Tree balance is restored in $O(1)$ pointer operations.`,
        takeaway: "Notice: Only ancestors of the inserted node need their heights updated."
      };
    } else if (mode === 'examples') {
      return {
        mode: "Explanation with Examples",
        summary: "Concrete numerical example inserting keys [30, 20, 10] into an empty tree.",
        content: `### Example Walkthrough: Inserting keys 30, 20, 10 into an AVL Tree:

- **Insert 30**:
  Root is [30]. Height = 1, Balance Factor = 0.
- **Insert 20**:
  [20] is placed to the left of [30].
  Root [30] now has $\\text{BF} = 1 - 0 = +1$. Tree is valid.
- **Insert 10**:
  [10] goes to the left of [20].
  Now check Root [30]:
  $$\\text{Height}(\\text{left}) = 2, \\quad \\text{Height}(\\text{right}) = 0 \\implies \\text{BF} = +2 \\text{ (Imbalance!)}$$
- **Resolution**:
  This is a **Left-Left (LL)** scenario because both additions were leftward.
  Perform a **Right Rotation** around [30]:
  - Node [20] ascends to become the new root.
  - Node [30] becomes the right child of [20].
  - Node [10] remains the left child of [20].
  Result: Perfectly balanced tree with root [20], left [10], and right [30]!`,
        takeaway: "Height decreased from 3 down to 2 in just one single right rotation!"
      };
    } else if (mode === 'advanced') {
      return {
        mode: "Advanced Mathematical Explanation",
        summary: "Formal proof of the $O(\\log n)$ height bound using Fibonacci recurrence relations.",
        content: `### Formal Height Bound Proof for AVL Trees:

Let $N(h)$ denote the minimum number of nodes in an AVL tree of height $h$.
To minimize nodes, one subtree must have height $h-1$ and the other must have height $h-2$:
$$N(h) = 1 + N(h-1) + N(h-2)$$

Notice the close resemblance to the Fibonacci sequence $F_h$:
$$N(h) > F_{h+2} - 1$$
Using Binet's formula for the Golden Ratio $\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$:
$$F_{h+2} \\approx \\frac{\\phi^{h+2}}{\\sqrt{5}} \\implies n > \\frac{\\phi^{h+2}}{\\sqrt{5}} - 1$$

Taking base-2 logarithms on both sides:
$$h < \\frac{\\log_2 n}{\\log_2 \\phi} \\approx 1.44 \\log_2 n$$

**Conclusion**: The maximum height of an AVL tree containing $n$ nodes cannot exceed $1.44 \\log_2 n$. Hence all dictionary operations (Find, Insert, Delete) are strictly bounded by $O(\\log n)$ in the worst case.`,
        takeaway: "Rigorous proof: Fibonacci recurrence guarantees height never degrades beyond 1.44 log₂(n)."
      };
    } else {
      // Bilingual
      return {
        mode: "Bilingual Explanation (Hindi / English)",
        summary: "Concepts explained in English with Hindi conversational reinforcement.",
        content: `### 🌐 Bilingual Explanation: AVL Tree Rotations

**English Core**:
An AVL tree is a self-balancing binary search tree where the height difference between the left and right subtrees (the **Balance Factor**) cannot exceed 1.

**हिंदी व्याख्या (Hindi Explanation)**:
- **AVL Tree kya hai?** Yeh ek aisa Binary Search Tree hai jo apne aap ko humesha balance rakhta hai.
- **Balance Factor**: Har node par hum left subtree ki height aur right subtree ki height ka difference nikaalte hain ($BF = H_L - H_R$). Agar yeh value $-1, 0, +1$ ke bahar jati hai (jaise $+2$ ya $-2$), toh tree 'unbalanced' ho jata hai.
- **Rotations kyu chahiye?** Jab bhi balance toot-ta hai, hum **Rotations** (Left Rotation ya Right Rotation) karke tree ko theek karte hain. Isse search karne ki time complexity humesha $O(\\log n)$ rehti hai aur tree kabhi bhi linear list ki tarah slow nahi hota.`,
        takeaway: "Technical terms (Balance Factor, Rotations, Time Complexity) retain their standard international definitions."
      };
    }
  }

  // Generic generator for other topics
  if (mode === 'bilingual' || mode === 'bilingual_hi') {
    return {
      mode: "Bilingual Explanation (Hindi / English)",
      summary: `Detailed overview of ${topic} with dual-language clarity.`,
      content: `### 🌐 Bilingual Overview of: ${topic}

**English Concept**:
${topic} is a fundamental pillar of this subject that structures relationships, computational boundaries, or scientific mechanisms.

**हिंदी में स्पष्टीकरण (Hindi Explanation)**:
- **Mukhya Bindu (Key Points)**: Yeh concept humein sikhata hai ki system kaise behave karta hai jab inputs badalte hain.
- **Upyogita (Relevance)**: Exams aur practical applications dono mein iska seedha upyog hota hai. Iski core formulas aur properties ko yaad rakhna mahatvapurna hai.
- **Bilingual Insight**: Pariksha mein answer likhte samay standard technical terms (jaise parameters, variables, aur properties) ko English mein hi likhein, par unka logic apni matribhasha mein samjhein.`,
      takeaway: "Bilingual learning reinforces conceptual understanding while retaining academic terminology."
    };
  } else if (mode === 'bilingual_ta') {
    return {
      mode: "Bilingual Explanation (Tamil / English)",
      summary: `Detailed overview of ${topic} with Tamil bilingual support.`,
      content: `### 🌐 Bilingual Overview of: ${topic} (English + தமிழ்)

**English Concept**:
${topic} provides the foundational framework for analyzing efficiency, structural constraints, and systematic relationships.

**தமிழில் விளக்கம் (Tamil Explanation)**:
- **முக்கிய கருத்து (Core Idea)**: இந்த தலைப்பு அமைப்பின் அடிப்படை விதிகளை விளக்குகிறது.
- **பயன்பாடு (Application)**: தேர்வு மற்றும் நடைமுறை பயன்பாடுகளில் இது மிக முக்கிய பங்கு வகிக்கிறது.
- **புரிதல் (Comprehension)**: தொழில்நுட்ப சொற்களை (Technical terms) ஆங்கிலத்தில் நினைவில் வைத்துக்கொண்டு, கருத்தை தாய்மொழியில் கற்பது நினைவாற்றலை மேம்படுத்தும்.`,
      takeaway: "Tamil + English dual-language notes strengthen conceptual retention."
    };
  } else if (mode === 'stepByStep') {
    return {
      mode: "Step-by-Step Explanation",
      summary: `Systematic breakdown of ${topic}`,
      content: `Here is the structured breakdown of **${topic}**:

1. **Foundation**: Identify the primary inputs, assumptions, and constraints.
2. **Mechanism**: Observe how the transformation or interaction progresses phase-by-phase.
3. **Evaluation**: Compute the quantitative metrics or verify invariant conditions.
4. **Edge Cases**: Note where the rule terminates or requires specialized handling.`,
      takeaway: "Step-by-step reasoning eliminates confusion during complex problem-solving."
    };
  } else if (mode === 'examples') {
    return {
      mode: "Explanation with Real-World Examples",
      summary: `Practical applications of ${topic}`,
      content: `### Practical Real-World Scenario: ${topic}

Think of this like an airport baggage routing conveyor system:
- Each terminal branch must handle incoming items without forming bottlenecks.
- Just as incoming luggage must be weighed and distributed across planes, **${topic}** ensures balance, predictable throughput, and zero data loss.`,
      takeaway: "Real-world analogies convert abstract theory into tangible mental models."
    };
  } else if (mode === 'advanced') {
    return {
      mode: "Advanced Technical Explanation",
      summary: `Rigorous academic breakdown of ${topic}`,
      content: `### In-Depth Mathematical & Theoretical Formulation: ${topic}

Under rigorous examination, **${topic}** is governed by foundational invariant constraints. The asymptotic behavior under upper and lower bounds demonstrates optimal algorithmic or physical scaling. Any deviation from these boundary conditions introduces divergence or suboptimal performance.`,
      takeaway: "Advanced insight: Invariant preservation is the key to proving correctness."
    };
  } else {
    return {
      mode: "Simple Explanation",
      summary: `Clear and beginner-friendly intro to ${topic}`,
      content: `**${topic}** is an essential educational concept that helps you understand how components link together and operate smoothly.

In simple terms:
- It sets rules so that things stay organized and easy to access.
- It prevents errors when data grows or conditions change.
- Remembering its 2-3 core rules will help you solve exam questions with confidence.`,
      takeaway: "Master the basic definition first before attempting advanced problem sets."
    };
  }
};

export const sampleTranslations = {
  English: {
    "Binary Search Tree": "A node-based binary tree data structure where each node has at most two children, maintaining sorted invariant.",
    "Balance Factor": "The difference in height between left and right subtrees.",
    "Adjacency List": "An array of separate lists capturing outgoing graph connections.",
    "Dijkstra's Algorithm": "Greedy single-source shortest path algorithm using priority queue."
  },
  Hindi: {
    "Binary Search Tree": "बाइनरी सर्च ट्री (Binary Search Tree) - एक ऐसा ट्री डेटा स्ट्रक्चर जहाँ बायाँ नोड हमेशा छोटा और दायाँ नोड बड़ा होता है।",
    "Balance Factor": "बैलेंस फैक्टर (Balance Factor) - बाएँ सबट्री और दाएँ सबट्री की ऊँचाई का अंतर (Height Difference)।",
    "Adjacency List": "एडजेसेंसी लिस्ट (Adjacency List) - ग्राफ के नोड्स और उनके पड़ोसियों को कुशलतापूर्वक स्टोर करने वाली लिस्ट।",
    "Dijkstra's Algorithm": "डिज्क्स्ट्रा एल्गोरिदम (Dijkstra's Algorithm) - शॉर्टेस्ट पाथ (Shortest Path) खोजने के लिए इस्तेमाल होने वाला ग्रीडी एल्गोरिदम।"
  },
  Tamil: {
    "Binary Search Tree": "பைனரி தேடல் மரம் (Binary Search Tree) - இடதுபுறம் சிறிய மதிப்பும் வலதுபுறம் பெரிய மதிப்பும் கொண்ட ஒரு மர அமைப்பு.",
    "Balance Factor": "சமநிலை காரணி (Balance Factor) - இடது மற்றும் வலது மரங்களின் உயரங்களுக்கு இடையிலான வேறுபாடு.",
    "Adjacency List": "அருகாமைப் பட்டியல் (Adjacency List) - வரைபடத்தின் முனைகள் மற்றும் இணைப்புகளைச் சேமிக்கும் பட்டியல்.",
    "Dijkstra's Algorithm": "டிஜ்க்ஸ்ட்ரா அல்காரிதம் (Dijkstra's Algorithm) - குறைந்த தொலைவு பாதையைக் கண்டறியும் நெறிமுறை."
  }
};

export const generateMultiDocumentSynthesis = (docs) => {
  if (!docs || docs.length === 0) return null;
  const titles = docs.map(d => d.title).join(", ");
  const subjects = [...new Set(docs.map(d => d.subject))].join(" & ");

  return {
    combinedTitle: `Cross-Document Synthesis: ${docs.length} Selected Texts`,
    subjectsCovered: subjects,
    analyzedDocuments: docs.map(d => ({ title: d.title, pages: d.pages, subject: d.subject })),
    crossCuttingSummary: `Synthesizing across **${titles}**, the overarching theme explores systemic state transitions and analytical frameworks in **${subjects}**. While each individual text develops specific terminology (e.g. tree hierarchies, biological transcription, or economic demand shifts), they share common principles of balance, feedback mechanisms, and bounded equilibrium.`,
    commonConcepts: [
      {
        concept: "Hierarchical Organization & Invariance",
        relevance: "All selected documents enforce specific invariant rules to maintain order and predictability across scale."
      },
      {
        concept: "Optimization & Asymptotic Bounds",
        relevance: "Whether optimizing search time O(log n), cellular energy during replication, or fiscal multiplier gains, efficiency limits define optimal behavior."
      },
      {
        concept: "State Updates & Equilibrium Restoration",
        relevance: "When perturbations occur (e.g., node insertion, mutation, or monetary shocks), internal restoration mechanisms (rotations, ligase repair, interest rate shifts) restore stability."
      }
    ],
    relationshipMatrix: [
      { docA: docs[0]?.title || "Doc 1", docB: docs[1]?.title || "Doc 2", relation: "Shares foundational concepts of discrete graph topology and biochemical / structural networking." }
    ]
  };
};

export const generateSimulatedStudyAssistantResponse = (query, docTitle = null, lang = 'English') => {
  const lower = query.toLowerCase();

  let responseText = "";
  let sourceExcerpt = null;

  if (lower.includes("dijkstra") || lower.includes("shortest path")) {
    responseText = `### Dijkstra's Algorithm: Core Mechanism & Complexity

Dijkstra's algorithm is a **greedy algorithm** used to solve the **Single-Source Shortest Path (SSSP)** problem on a directed or undirected graph with non-negative edge weights.

#### How It Works:
1. **Initialize**: Assign distance $0$ to the source vertex and $\\infty$ to all other vertices.
2. **Min-Priority Queue**: Push the source $(0, s)$ into a Min-Heap.
3. **Greedy Extraction**: Repeatedly extract the node $u$ with the minimum tentative distance.
4. **Relaxation**: For each neighbor $v$ of $u$ with edge weight $w(u, v)$:
   $$\\text{If } \\text{dist}[u] + w(u, v) < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + w(u, v)$$
   Push the updated distance into the priority queue.
5. **Termination**: When the priority queue is empty, $\\text{dist}[v]$ contains the optimal path cost to all reachable nodes.

#### Complexity Summary:
- **Time Complexity**: $O((V + E) \\log V)$ using a binary min-heap.
- **Space Complexity**: $O(V)$ for the distance array and priority queue.
- **Crucial Limitation**: Does **not** work with negative edge weights (use **Bellman-Ford** instead).`;

    sourceExcerpt = {
      document: docTitle || "Data Structures & Algorithms - Trees & Graphs.pdf",
      page: 44,
      excerpt: "Dijkstra's algorithm maintains a set of finalized vertices whose shortest distance from the source is permanently known."
    };
  } else if (lower.includes("avl") || lower.includes("rotation") || lower.includes("balance factor")) {
    responseText = `### AVL Tree Rotations & Invariants

An **AVL tree** is a strictly self-balancing Binary Search Tree where the heights of the two child subtrees of any node differ by at most one:
$$\\text{Balance Factor } (BF) = \\text{Height}(\\text{Left}) - \\text{Height}(\\text{Right}) \\in \\{-1, 0, +1\\}$$

#### The 4 Rebalancing Rotations:
1. **LL (Left-Left)**: Imbalance caused by insertion into left subtree of left child. Fix: **Single Right Rotation** on the node.
2. **RR (Right-Right)**: Imbalance caused by insertion into right subtree of right child. Fix: **Single Left Rotation** on the node.
3. **LR (Left-Right)**: Zigzag into right child of left subtree. Fix: **Left Rotation on Child** followed by **Right Rotation on Root**.
4. **RL (Right-Left)**: Zigzag into left child of right subtree. Fix: **Right Rotation on Child** followed by **Left Rotation on Root**.

All rotations complete in $O(1)$ time by updating pointers.`;

    sourceExcerpt = {
      document: docTitle || "Data Structures & Algorithms - Trees & Graphs.pdf",
      page: 18,
      excerpt: "AVL single and double rotations guarantee maximum height h < 1.44 log₂(n)."
    };
  } else if (lower.includes("quiz") || lower.includes("questions") || lower.includes("practice")) {
    responseText = `Here are 3 quick practice quiz questions based on your notes:

1. **Question 1**: What is the balance factor of an AVL node whose left child has height 3 and right child has height 1?
   - *Answer*: $+2$ (Node is unbalanced and requires rotation!).
2. **Question 2**: Which graph representation is more memory-efficient when the graph is sparse ($E \\ll V^2$)?
   - *Answer*: **Adjacency List** ($O(V + E)$ vs $O(V^2)$).
3. **Question 3**: In a Binary Search Tree, which traversal yields the elements in strictly sorted ascending order?
   - *Answer*: **Inorder Traversal** (Left -> Root -> Right).`;
  } else {
    responseText = `### Conceptual Study Breakdown for "${query}"

Here is an educational explanation synthesized from your uploaded study materials:

1. **Key Concept**: When analyzing **${query}**, the most critical factor is understanding how its foundational components interact under varying constraints.
2. **Practical Implication**: In examination questions, focus on identifying:
   - What are the inputs and preconditions?
   - Which formula or invariant rule applies?
   - What is the step-by-step resolution?
3. **Exam Tip**: Always clearly write the mathematical notation or standard terminology before jumping into the code or problem steps.`;

    sourceExcerpt = {
      document: docTitle || "Reference Study Materials",
      page: 12,
      excerpt: "Foundational concepts require identifying boundary conditions and maintaining invariants."
    };
  }

  // If Hindi requested, prepend a helpful bilingual note
  if (lang === 'Hindi') {
    responseText = `*(नोट: यह हिंदी भाषा में सारांशित अध्ययन सहायता है)*\n\n` + responseText;
  } else if (lang === 'Tamil') {
    responseText = `*(குறிப்பு: இது தமிழ் மொழி ஆதரவுடன் உருவாக்கப்பட்ட மாதிரி விளக்கம்)*\n\n` + responseText;
  }

  return {
    text: responseText,
    sourceRef: sourceExcerpt
  };
};
