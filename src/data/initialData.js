// Initial Seed Data for LearnSphere
// All data is simulated for frontend prototype purposes

export const DEFAULT_STUDENT_PROFILE = {
  name: "",
  onboardingCompleted: false,
  /** Legacy demo fields below — used only when browsing offline demo data */
  _demoName: "Aarav Sharma",
  academicLevel: "Undergraduate (Year 2)",
  institution: "National Institute of Technology",
  course: "B.Tech Computer Science & Data Engineering",
  subjects: ["Data Structures and Algorithms", "Computer Networks", "Operating Systems", "SQL", "Aptitude"],
  proficiencies: {
    "Data Structures and Algorithms": "Intermediate",
    "Computer Networks": "Beginner",
    "Operating Systems": "Intermediate",
    SQL: "Intermediate",
    Aptitude: "Intermediate"
  },
  primaryLanguage: "English",
  secondaryLanguage: "Hindi",
  preferredFormats: ["Bilingual Explanations", "Step-by-step Examples", "Diagrams & Visuals"],
  accessibility: {
    textSize: "normal", // 'normal', 'medium', 'large'
    highContrast: false,
    simplifiedLayout: false,
    voiceSpeed: "1.0x"
  },
  learningGoals: "Master Tree & Graph Algorithms, prepare for Semester 4 examinations, and revise core database concepts.",
  goalType: "Prepare for Semester Exams",
  dailyStudyTime: "2.5 hours",
  weeklyStudyTime: "16 hours",
  preferredStudyPeriods: "Evening (6 PM - 9 PM)",
  targetExamDate: "2026-11-20",
  diagnosticResults: {
    "Data Structures & Algorithms": {
      score: "78%",
      level: "Intermediate",
      strengths: ["Binary Search Trees", "Linked Lists", "Stack/Queue"],
      growthAreas: ["AVL Tree Rotations", "Dijkstra Shortest Path", "Dynamic Programming"]
    },
    "Database Management": {
      score: "85%",
      level: "Proficient",
      strengths: ["SQL Queries", "Relational Schema", "BCNF"],
      growthAreas: ["B+ Tree Indexing", "ACID Isolation Levels"]
    },
    "Computer Networks": {
      score: "60%",
      level: "Foundational",
      strengths: ["OSI 7 Layers", "HTTP Basics"],
      growthAreas: ["CIDR Subnetting", "TCP 3-Way Handshake", "Routing Protocols"]
    }
  },
};

export const EMPTY_STUDENT_PROFILE = {
  name: '',
  academicLevel: '',
  institution: '',
  course: '',
  subjects: [],
  proficiencies: {},
  primaryLanguage: 'English',
  secondaryLanguage: '',
  preferredFormats: [],
  accessibility: {
    textSize: 'normal',
    highContrast: false,
    simplifiedLayout: false,
    voiceSpeed: '1.0x'
  },
  learningGoals: '',
  goalType: '',
  dailyStudyTime: '',
  weeklyStudyTime: '',
  preferredStudyPeriods: '',
  targetExamDate: '',
  diagnosticResults: null,
  onboardingCompleted: false
};

export const ACTIVE_SUBJECTS = [
  'Data Structures and Algorithms',
  'Computer Networks',
  'Operating Systems',
  'SQL',
  'Aptitude'
];

export const DEMO_DOCUMENTS = [
  {
    id: "doc-1",
    isDemo: true,
    title: "Data Structures & Algorithms - Trees & Graphs.pdf",
    subject: "Data Structures & Algorithms",
    fileType: "PDF",
    uploadDate: "2026-10-08",
    size: "4.2 MB",
    pages: 48,
    status: "Processed",
    readProgress: 68,
    chapters: [
      { id: "ch-1", title: "Chapter 1: Binary Search Trees & Hierarchical Structures", pages: "1-14" },
      { id: "ch-2", title: "Chapter 2: Self-Balancing Trees (AVL & Red-Black)", pages: "15-26" },
      { id: "ch-3", title: "Chapter 3: Graph Representations (Adjacency Matrix vs List)", pages: "27-36" },
      { id: "ch-4", title: "Chapter 4: Graph Traversals (BFS, DFS) & Dijkstra", pages: "37-48" }
    ],
    topics: [
      "Binary Search Trees (BST)",
      "Inorder, Preorder, Postorder Traversals",
      "AVL Tree Rotations (LL, RR, LR, RL)",
      "Balance Factor Calculation",
      "Graph Representations (Matrix vs List)",
      "Breadth-First Search (BFS) with FIFO Queue",
      "Depth-First Search (DFS) with Recursion",
      "Dijkstra's Algorithm using Min-Heap",
      "Time Complexity Bounds (O(V+E))"
    ],
    definitions: [
      {
        term: "Binary Search Tree (BST)",
        definition: "A hierarchical node-based structure where every node holds a key greater than all keys in its left subtree and less than all keys in its right subtree.",
        page: 8
      },
      {
        term: "AVL Tree Balance Factor",
        definition: "The difference in height between a node's left subtree and right subtree: Balance = Height(Left) - Height(Right). In an AVL tree, this value must always be -1, 0, or +1.",
        page: 16
      },
      {
        term: "Adjacency List",
        definition: "A vertex-indexed array of linked lists or dynamic arrays storing the direct outgoing neighbors of each vertex. Takes O(V + E) space.",
        page: 29
      },
      {
        term: "Topological Sort",
        definition: "A linear permutation of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v.",
        page: 41
      }
    ],
    formulas: [
      {
        name: "Max Nodes in Binary Tree of height h",
        formula: "N_max = 2^(h + 1) - 1",
        description: "Theoretical upper bound on node count for full binary tree.",
        page: 6
      },
      {
        name: "Height of Balanced BST with n nodes",
        formula: "h = ⌊log_2(n)⌋",
        description: "Ensures logarithmic search, insertion, and deletion times.",
        page: 12
      },
      {
        name: "Graph Traversal Time (Adjacency List)",
        formula: "T = O(V + E)",
        description: "Time bound for BFS and DFS where V is vertex count and E is edge count.",
        page: 38
      },
      {
        name: "Dijkstra's Algorithm with Min-Heap",
        formula: "T = O((V + E) \\log V)",
        description: "Optimal greedy single-source shortest path for non-negative edge weights.",
        page: 45
      }
    ],
    summaries: {
      onePage: "This core unit explores hierarchical trees and general graphs. Binary Search Trees (BST) maintain sorted order to achieve average O(log n) search, insertion, and deletion, though skewed trees can degrade to O(n). AVL trees enforce strict height balancing through single (LL, RR) and double (LR, RL) rotations whenever the balance factor deviates from {-1, 0, 1}. Graphs are modeled via Adjacency Matrices (O(V²) space, best for dense relations) or Adjacency Lists (O(V+E) space, best for sparse networks). Breadth-First Search (BFS) utilizes a FIFO queue to discover shortest paths in unweighted networks, while Depth-First Search (DFS) relies on recursive back-tracking for cycle detection and topological sorting. Dijkstra's algorithm uses a priority queue to compute optimal paths in weighted graphs with non-negative costs.",
      detailedChapter: "### Chapter 1: Binary Search Trees\nTrees represent asymmetric non-linear parent-child relationships. The BST invariant mandates that for any node X, all values in X.left < X.val < X.right. Inorder traversal visits Left -> Root -> Right, generating a strictly ascending sorted stream.\n\n### Chapter 2: Self-Balancing Trees (AVL)\nWhen items are added in sorted order, BSTs degenerate into linked lists. Georgy Adelson-Velsky and Evgenii Landis invented AVL trees to maintain Height(Left) - Height(Right) within {-1, 0, 1}. Four rotation primitives re-balance nodes in O(1) time after each insertion or deletion.\n\n### Chapter 3: Graph Representations\nGraphs G = (V, E) capture multi-to-multi connectivity. Dense graphs favor an adjacency matrix A where A[i][j] denotes edge presence in O(1) query time. Sparse real-world graphs favor adjacency lists to reduce memory consumption to O(V + E).\n\n### Chapter 4: Traversals & Dijkstra's Algorithm\nBFS explores concentric frontiers using a queue, solving shortest path for unweighted topologies in O(V + E). DFS dives deep using an execution stack. Dijkstra's greedy algorithm solves weighted shortest path in O((V + E) log V) by repeatedly finalizing the node with minimal tentative distance.",
      bulletPoints: "• Binary Search Tree: Left subtree < Parent < Right subtree; average time O(log n), worst-case O(n).\n• Inorder Traversal of BST: Always produces sorted output.\n• AVL Trees: Enforces |Balance Factor| ≤ 1. Rotates using LL, RR, LR, or RL patterns.\n• Adjacency List: Memory-efficient storage O(V + E) for sparse graphs.\n• Adjacency Matrix: Fast edge lookup O(1), but requires O(V²) memory.\n• BFS: Uses FIFO Queue; finds unweighted shortest paths.\n• DFS: Uses Recursion / LIFO Stack; detects cycles and topological ordering.\n• Dijkstra's Algorithm: Greedy shortest path for non-negative weights using priority queues.",
      quickRevision: "⚡ **High-Yield Quick Revision**:\n1. BST Inorder = Sorted output.\n2. AVL Balance Factor = Height(L) - Height(R) ∈ {-1, 0, 1}.\n3. Tree of height h has at most 2^(h+1) - 1 nodes.\n4. BFS = Queue (FIFO), level-order, shortest unweighted path.\n5. DFS = Stack (LIFO), deep exploration, topological ordering.\n6. Dijkstra fails on negative edge weights (use Bellman-Ford instead).",
      lastMinuteNotes: "🚨 **Exam Morning Quick Cram**:\n- **Rotations**: LL -> Right rotate root; RR -> Left rotate root; LR -> Left rotate child then Right rotate root.\n- **Space Complexities**: Adj Matrix = O(V²), Adj List = O(V+E).\n- **Algorithm Invariants**: Dijkstra always marks the nearest unvisited vertex as finalized.\n- **Common Trap**: Forgetting to mark nodes as 'visited' in BFS causes infinite loops in cyclic graphs!"
    },
    diagrams: [
      {
        id: "diag-1",
        title: "AVL Tree Rotations Diagram (LL and RR Cases)",
        type: "Tree Hierarchy",
        description: "Visual breakdown showing how an unbalanced tree with balance factor +2 or -2 is restructured via single rotations to preserve the BST invariant with O(1) pointer updates.",
        details: [
          "Left-Left (LL) Heavy: Fixed with a single Right Rotation around the pivot.",
          "Right-Right (RR) Heavy: Fixed with a single Left Rotation around the pivot.",
          "Left-Right (LR) Heavy: Fixed with a Left Rotation on the left child followed by a Right Rotation on the parent node.",
          "All operations maintain strict binary search ordering: Left < Root < Right."
        ]
      },
      {
        id: "diag-2",
        title: "Adjacency Matrix vs Adjacency List Comparison Table",
        type: "Data Structure Comparison",
        description: "Comparative matrix contrasting storage complexity, edge verification speed, and vertex addition overhead.",
        details: [
          "Storage: Matrix requires O(V²); List requires O(V + E).",
          "Edge Existence Query: Matrix is O(1); List is O(degree(u)).",
          "Adding a Vertex: Matrix is O(V²); List is O(1).",
          "Finding All Neighbors: Matrix is O(V); List is O(degree(u))."
        ]
      }
    ],
    syllabusMatch: {
      syllabusName: "University CS201 - Data Structures & Algorithms",
      totalTopics: 10,
      covered: [
        "Binary Search Trees",
        "Tree Traversals",
        "AVL Balancing & Rotations",
        "Adjacency Matrix & List Representation",
        "Breadth-First Search (BFS)",
        "Depth-First Search (DFS)",
        "Dijkstra's Shortest Path Algorithm"
      ],
      partial: [
        "B-Trees and B+ Trees (Briefly mentioned in Chapter 2)",
        "Topological Sort (Covered in algorithm summary without proofs)"
      ],
      missing: [
        "Bellman-Ford Algorithm (Not covered in this PDF)",
        "Floyd-Warshall All-Pairs Shortest Path (Not covered in this PDF)"
      ]
    }
  },
  {
    id: "doc-2",
    isDemo: true,
    title: "Cell Biology & Molecular Genetics - Unit 3.pdf",
    subject: "Biology & Genetics",
    fileType: "PDF",
    uploadDate: "2026-10-05",
    size: "6.8 MB",
    pages: 62,
    status: "Processed",
    readProgress: 42,
    chapters: [
      { id: "ch-1", title: "Chapter 1: DNA Replication Machinery & Polymerases", pages: "1-18" },
      { id: "ch-2", title: "Chapter 2: Transcription & RNA Processing", pages: "19-38" },
      { id: "ch-3", title: "Chapter 3: Translation & Ribosomal Assembly", pages: "39-52" },
      { id: "ch-4", title: "Chapter 4: Epigenetics & Gene Regulation", pages: "53-62" }
    ],
    topics: [
      "Semi-Conservative DNA Replication",
      "DNA Polymerase III and Helicase",
      "Okazaki Fragments on Lagging Strand",
      "Transcription: Promoter Recognition & RNA Polymerase",
      "Post-Transcriptional Modifications (5' Capping, Poly-A Tail)",
      "Ribosomal Subunits (50S/30S and 60S/40S)",
      "Lac Operon Regulation Mechanism"
    ],
    definitions: [
      {
        term: "Central Dogma of Molecular Biology",
        definition: "The framework explaining the genetic flow of information: DNA is replicated, transcribed into mRNA, and translated into functional protein.",
        page: 4
      },
      {
        term: "Okazaki Fragments",
        definition: "Short sequences of DNA nucleotides synthesized discontinuously and later linked together by the enzyme DNA ligase to create the lagging strand.",
        page: 14
      }
    ],
    formulas: [
      {
        name: "Chargaff's Rule of Base Pairing",
        formula: "A + G = T + C \\implies \\frac{A}{T} = 1, \\; \\frac{G}{C} = 1",
        description: "Equimolar ratio of purines and pyrimidines in double-stranded DNA.",
        page: 7
      }
    ],
    summaries: {
      onePage: "Unit 3 details the central dogma of molecular biology: the biochemical processes by which genetic code replicates and translates into operational enzymes and structures. Semi-conservative DNA replication occurs bidirectionally at replication forks, guided by Helicase, DNA Polymerase III, and Primase. The leading strand replicates continuously, whereas the lagging strand is generated as discontinuous Okazaki fragments subsequently sealed by DNA Ligase. Transcription converts DNA into precursor mRNA via RNA Polymerase II, followed by 5' 7-methylguanosine capping, intron splicing via spliceosomes, and 3' polyadenylation. Finally, ribosomes assemble around mRNA to translate triplets of codons into amino acid polypeptides.",
      detailedChapter: "### Chapter 1: DNA Replication\nReplication ensures high-fidelity transmission of hereditary material. Helicase unwinds the double helix, while Single-Stranded Binding (SSB) proteins prevent re-annealing. DNA Polymerase III synthesizes strictly in the 5' -> 3' direction.\n\n### Chapter 2: Transcription\nRNA Polymerase binds to the TATA-box promoter. Pre-mRNA undergoes splicing where non-coding introns are excised by snRNPs.",
      bulletPoints: "• DNA replication is semi-conservative (Meselson-Stahl experiment).\n• Leading strand is synthesized continuously; Lagging strand discontinuously.\n• Okazaki fragments require DNA Ligase for covalent bond formation.\n• Transcription produces mRNA from antisense DNA template.\n• Genetic code is degenerate, non-overlapping, and universal.",
      quickRevision: "⚡ **Biology Quick Revision**:\n1. Purines (A, G) = 2 rings; Pyrimidines (C, T, U) = 1 ring.\n2. Start Codon = AUG (Methionine).\n3. Stop Codons = UAA, UAG, UGA.\n4. DNA Ligase connects phosphodiester backbones.",
      lastMinuteNotes: "🚨 **Exam Highlights**:\n- Helicase unzips; Topoisomerase relieves supercoiling tension; Primase lays RNA primer; DNA Pol I removes primers and fills gaps."
    },
    diagrams: [
      {
        id: "diag-bio-1",
        title: "Replication Fork Enzymatic Architecture",
        type: "Biochemical Pathway",
        description: "Illustration of the continuous leading strand vs discontinuous lagging strand with Helicase, Primase, and DNA Ligase.",
        details: [
          "Helicase unwinds at 3' -> 5' template direction.",
          "Primase synthesizes 10-nt RNA primer.",
          "Ligase seals Okazaki phosphodiester bonds."
        ]
      }
    ],
    syllabusMatch: {
      syllabusName: "High School & Pre-Med Molecular Biology Core",
      totalTopics: 8,
      covered: [
        "DNA Structure & Double Helix",
        "Replication Fork Machinery",
        "Okazaki Fragments & Lagging Strand",
        "Transcription & mRNA Splicing",
        "Translation & Codon Table"
      ],
      partial: ["Lac Operon & Gene Regulation"],
      missing: ["CRISPR-Cas9 Gene Editing", "Gel Electrophoresis Methodology"]
    }
  },
  {
    id: "doc-3",
    isDemo: true,
    title: "Macroeconomics - Fiscal & Monetary Policy Notes.pptx",
    subject: "Economics & Finance",
    fileType: "PPTX",
    uploadDate: "2026-09-28",
    size: "3.1 MB",
    pages: 35,
    status: "Processed",
    readProgress: 85,
    chapters: [
      { id: "ch-1", title: "Slide Deck 1: Aggregate Demand & Supply Equilibrium", pages: "1-10" },
      { id: "ch-2", title: "Slide Deck 2: Fiscal Policy & Government Multiplier", pages: "11-22" },
      { id: "ch-3", title: "Slide Deck 3: Central Banking, Interest Rates & Inflation", pages: "23-35" }
    ],
    topics: [
      "Aggregate Demand Components (C + I + G + NX)",
      "Fiscal Multiplier Formula",
      "Crowding Out Effect",
      "Central Bank Open Market Operations (OMO)",
      "Reserve Ratio & Liquidity Adjustment",
      "Phillips Curve: Inflation vs Unemployment"
    ],
    definitions: [
      {
        term: "Fiscal Policy",
        definition: "Government intervention using taxation and expenditure to influence aggregate economic activity and macroeconomic stability.",
        page: 12
      },
      {
        term: "Quantitative Easing (QE)",
        definition: "A non-standard monetary policy tool where a central bank purchases longer-term securities from the open market to increase money supply and encourage lending.",
        page: 29
      }
    ],
    formulas: [
      {
        name: "Fiscal Keynesian Multiplier",
        formula: "k = \\frac{1}{1 - MPC} = \\frac{1}{MPS}",
        description: "Magnification ratio of output expansion per dollar of exogenous government spending.",
        page: 15
      },
      {
        name: "Aggregate Expenditure Function",
        formula: "Y = C_0 + MPC(Y - T) + I + G + NX",
        description: "National income identity in an open economy.",
        page: 8
      }
    ],
    summaries: {
      onePage: "These slides synthesize the transmission mechanisms of fiscal and monetary interventions. Aggregate demand comprises Consumption, Investment, Government Spending, and Net Exports. Government spending expands output by a factor dictated by the Marginal Propensity to Consume (MPC), though public debt issuance may cause 'crowding out' by raising interest rates. Concurrently, Central Banks steer monetary conditions via repo rates, reserve requirements, and open market operations to anchor inflation expectations while dampening business cycle volatility.",
      detailedChapter: "### Deck 1: AD-AS Equilibrium\nEquilibrium occurs where Aggregate Demand intersects Short-Run Aggregate Supply. Shocks in consumer sentiment shift AD leftward.\n\n### Deck 2: Fiscal Mechanics\nExpansions via infrastructure injection create multiplied local earnings determined by 1 / (1 - MPC).",
      bulletPoints: "• AD = C + I + G + (X - M).\n• Multiplier = 1 / (1 - MPC).\n• Expansionary fiscal policy increases GDP but can trigger crowding out.\n• Expansionary monetary policy lowers interest rates, boosting private investment.",
      quickRevision: "⚡ **Macro Quick Revision**:\n1. Higher MPC = Higher multiplier effect.\n2. Raising reserve requirements contracts bank lending.\n3. Phillips curve demonstrates short-run inflation-unemployment trade-off.",
      lastMinuteNotes: "🚨 **Exam Alert**:\n- Remember that tax multiplier (-MPC / MPS) is smaller than government spending multiplier (1 / MPS) because part of the tax cut is saved!"
    },
    diagrams: [
      {
        id: "diag-macro-1",
        title: "IS-LM Equilibrium Shift Diagram",
        type: "Macroeconomic Graph",
        description: "Visual depiction showing the intersection of goods market equilibrium (IS) and money market equilibrium (LM) under expansionary fiscal policy.",
        details: [
          "IS curve shifts right due to increased government spending G.",
          "Interest rate r increases, dampening private investment (crowding out).",
          "Final equilibrium yields higher output Y at elevated interest rate."
        ]
      }
    ],
    syllabusMatch: {
      syllabusName: "Introductory Macroeconomics 101",
      totalTopics: 7,
      covered: [
        "Aggregate Demand & Supply Model",
        "Keynesian Fiscal Multiplier",
        "Monetary Policy & Central Banking",
        "Inflation & Phillips Curve"
      ],
      partial: ["Balance of Payments & Exchange Rates"],
      missing: ["Solow Growth Model", "Rational Expectations Hypothesis"]
    }
  },
  {
    id: "doc-4",
    isDemo: true,
    title: "Linear Algebra - Vector Spaces & Eigenvalues.pdf",
    subject: "Linear Algebra",
    fileType: "PDF",
    uploadDate: "2026-09-15",
    size: "5.4 MB",
    pages: 54,
    status: "Processed",
    readProgress: 30,
    chapters: [
      { id: "ch-1", title: "Chapter 1: Vector Spaces & Subspaces", pages: "1-16" },
      { id: "ch-2", title: "Chapter 2: Linear Independence, Basis & Dimension", pages: "17-30" },
      { id: "ch-3", title: "Chapter 3: Linear Transformations & Matrix Representations", pages: "31-42" },
      { id: "ch-4", title: "Chapter 4: Eigenvalues, Eigenvectors & Diagonalization", pages: "43-54" }
    ],
    topics: [
      "Vector Space Axioms (Closure, Associativity)",
      "Linear Span and Subspaces",
      "Linear Independence & Wronskian",
      "Rank-Nullity Theorem",
      "Characteristic Polynomial & Determinants",
      "Eigenvalue Equation A v = λ v",
      "Matrix Diagonalization A = P D P⁻¹"
    ],
    definitions: [
      {
        term: "Vector Space",
        definition: "A set V together with operations of vector addition and scalar multiplication satisfying 8 specific algebraic axioms including commutativity, associativity, and distributivity.",
        page: 5
      },
      {
        term: "Eigenvector",
        definition: "A non-zero vector that changes at most by a scalar factor when that linear transformation is applied to it.",
        page: 44
      }
    ],
    formulas: [
      {
        name: "Eigenvalue Characteristic Equation",
        formula: "\\det(A - \\lambda I) = 0",
        description: "Roots of this polynomial determine the scalar eigenvalues lambda of matrix A.",
        page: 46
      },
      {
        name: "Rank-Nullity Theorem",
        formula: "\\text{rank}(T) + \\text{nullity}(T) = \\dim(V)",
        description: "Fundamental dimensional relationship for linear transformation T : V -> W.",
        page: 35
      }
    ],
    summaries: {
      onePage: "This textbook unit provides rigorous algebraic underpinnings for linear mappings and coordinate transformations. A vector space is closed under addition and scalar scaling. Sets of vectors form a basis if they span the space and are linearly independent, fixing the space's dimension. The Rank-Nullity theorem establishes that the dimension of the domain equals the dimension of the range plus the dimension of the null space. Eigenvectors provide natural invariant axes along which a matrix transformation operates as pure scaling by eigenvalue λ, enabling matrix diagonalization when n linearly independent eigenvectors exist.",
      detailedChapter: "### Chapter 1: Vector Spaces\nDefines 8 axioms. Subspaces must contain the zero vector and maintain additive and scalar closure.",
      bulletPoints: "• Basis: Minimum spanning set with linear independence.\n• Rank + Nullity = Dimension of domain.\n• Eigenvalues solve det(A - λI) = 0.\n• Symmetric matrices are always orthogonally diagonalizable.",
      quickRevision: "⚡ **Linear Algebra Quick Tips**:\n1. If det(A) = 0, 0 is an eigenvalue and A is singular.\n2. Trace(A) = Sum of eigenvalues.\n3. det(A) = Product of eigenvalues.",
      lastMinuteNotes: "🚨 **Exam Traps**:\n- Distinct eigenvalues guarantee linear independence of corresponding eigenvectors, but repeated eigenvalues may not have full geometric multiplicity!"
    },
    diagrams: [
      {
        id: "diag-la-1",
        title: "Eigenvector Geometric Stretching Demonstration",
        type: "Vector Coordinate Graph",
        description: "Diagram highlighting how typical vectors rotate and stretch during matrix transformation, whereas eigenvectors stay on their original span line.",
        details: [
          "Arbitrary vector x rotates and changes length.",
          "Eigenvector v maintains exact direction: A v = λ v.",
          "λ > 1 expands; 0 < λ < 1 contracts; λ < 0 reverses direction."
        ]
      }
    ],
    syllabusMatch: {
      syllabusName: "Engineering Mathematics II - Linear Algebra",
      totalTopics: 6,
      covered: [
        "Vector Spaces & Subspaces",
        "Basis and Dimension",
        "Rank-Nullity Theorem",
        "Eigenvalues and Eigenvectors",
        "Diagonalization"
      ],
      partial: ["Orthogonal Projections & Gram-Schmidt"],
      missing: ["Singular Value Decomposition (SVD)"]
    }
  }
];

/** @deprecated Use DEMO_DOCUMENTS — kept for compatibility */
export const INITIAL_DOCUMENTS = DEMO_DOCUMENTS;

export const INITIAL_CONVERSATIONS = [
  {
    id: "conv-1",
    title: "AVL Tree Rotations and Balance Factors",
    subject: "Data Structures & Algorithms",
    documentId: "doc-1",
    documentTitle: "Data Structures & Algorithms - Trees & Graphs.pdf",
    lastActivity: "2026-10-11T14:30:00Z",
    language: "English",
    messageCount: 6,
    messages: [
      {
        id: "m-1",
        sender: "user",
        text: "Can you explain why we need a Double Rotation (LR case) in AVL trees instead of just a single rotation?",
        timestamp: "14:28"
      },
      {
        id: "m-2",
        sender: "assistant",
        text: "Here is why a single rotation fails in the **Left-Right (LR)** scenario:\n\nWhen a node becomes unbalanced because an insertion happened in the **right subtree of its left child**, the tree's heavy branch is 'zigzagged' or bent inward.\n\n### Why a single Right Rotation fails:\nIf you do a single Right Rotation on the grandparent node, the inner right grandchild simply gets transferred to the other side, but the overall height difference remains unbalanced (+2 or -2).\n\n### The Two-Step Solution (Double Rotation):\n1. **Step 1 (Straighten the bent branch)**: Perform a **Left Rotation** on the child node. This converts the LR configuration into a standard **Left-Left (LL)** straight line.\n2. **Step 2 (Restore balance)**: Perform a **Right Rotation** on the grandparent node. The previously deep grandchild now becomes the new root of this subtree, perfectly balancing both left and right branches!\n\n**Time Complexity**: Both rotations take $O(1)$ time because they only involve updating 3 pointer connections.",
        timestamp: "14:29",
        bookmarked: true,
        sourceRef: {
          document: "Data Structures & Algorithms - Trees & Graphs.pdf",
          page: 18,
          excerpt: "In the Left-Right case, a single right rotation fails to decrease height; a left rotation on the child followed by right rotation on root is required."
        }
      },
      {
        id: "m-3",
        sender: "user",
        text: "Can you provide a simple analogy to remember this easily?",
        timestamp: "14:30"
      },
      {
        id: "m-4",
        sender: "assistant",
        text: "💡 **Analogy: Straightening a Bent Coat Hanger**\n\nImagine you have a piece of wire bent in an **'L' shape**:\n- You cannot flatten it onto a table in one single motion because it has a sharp 90-degree corner.\n- **First move**: You unbend the corner so the wire forms one continuous straight stick (Step 1: Child rotation).\n- **Second move**: Once straight, you simply lay it flat across the table evenly (Step 2: Grandparent rotation).\n\nWhenever you see **LR** or **RL**, think: *'First straighten the elbow, then balance the scale!'*",
        timestamp: "14:30",
        bookmarked: false
      }
    ]
  },
  {
    id: "conv-2",
    title: "Dijkstra Algorithm vs Negative Edge Weights",
    subject: "Data Structures & Algorithms",
    documentId: "doc-1",
    documentTitle: "Data Structures & Algorithms - Trees & Graphs.pdf",
    lastActivity: "2026-10-10T19:15:00Z",
    language: "Bilingual (English + Hindi)",
    messageCount: 4,
    messages: [
      {
        id: "m-201",
        sender: "user",
        text: "Why does Dijkstra's algorithm fail when there are negative weight edges?",
        timestamp: "19:12"
      },
      {
        id: "m-202",
        sender: "assistant",
        text: "Dijkstra's algorithm is **greedy** in nature: it assumes that once a vertex is removed from the priority queue and marked 'visited', its shortest path has been permanently discovered.\n\n### The Problem with Negative Weights:\nIf a subsequent path contains a negative weight edge, it could produce an even smaller total path cost to an already-visited vertex. But Dijkstra never re-checks or relaxes visited nodes!\n\n### द्विभाषी व्याख्या (Bilingual Explanation in Hindi & English):\n- **Dijkstra ka Greedy Assumption**: Yeh algorithm maanta hai ki agar humne kisi node tak ka shortest path finalize kar diya, toh aage jaakar aur chhota rasta nahi mil sakta (kyunki positive weights add hote jaayenge).\n- **Negative Weight Problem**: Lekin agar aage koi negative cost (-5) mil jaye, toh total cost kam ho sakti hai! Dijkstra usse re-visit nahi karega, isliye result galat ho jata hai.\n- **Alternative**: Agar graph mein negative weights hain, toh **Bellman-Ford Algorithm** use karein ($O(V \\cdot E)$ time).",
        timestamp: "19:15",
        bookmarked: true,
        sourceRef: {
          document: "Data Structures & Algorithms - Trees & Graphs.pdf",
          page: 46,
          excerpt: "Dijkstra's greedy choice invariant assumes monotonically increasing tentative costs, rendering it invalid for negative weighted digraphs."
        }
      }
    ]
  },
  {
    id: "conv-3",
    title: "Okazaki Fragments and DNA Ligase Role",
    subject: "Biology & Genetics",
    documentId: "doc-2",
    documentTitle: "Cell Biology & Molecular Genetics - Unit 3.pdf",
    lastActivity: "2026-10-06T11:20:00Z",
    language: "English",
    messageCount: 3,
    messages: [
      {
        id: "m-301",
        sender: "user",
        text: "Why can't the lagging strand be synthesized continuously like the leading strand?",
        timestamp: "11:18"
      },
      {
        id: "m-302",
        sender: "assistant",
        text: "The reason lies in the strict biochemical limitation of **DNA Polymerase III**:\n\n1. **Directional Constraint**: DNA Polymerase can **only synthesize in the 5' to 3' direction** (it can only add new nucleotides to a free 3'-OH group).\n2. **Antiparallel Strands**: The two DNA template strands run in opposite directions (one is 3' -> 5', the other is 5' -> 3').\n3. **The Lagging Strand Problem**: As the replication fork opens from 3' to 5', the lagging strand template runs in 5' to 3'. To synthesize in the required 5' -> 3' direction, the enzyme must constantly start, synthesize backward away from the fork in short segments (Okazaki fragments), and then reset!\n4. **Final Step**: **DNA Ligase** acts like molecular glue to covalently bond the sugar-phosphate backbone gaps between fragments.",
        timestamp: "11:20",
        bookmarked: false,
        sourceRef: {
          document: "Cell Biology & Molecular Genetics - Unit 3.pdf",
          page: 15,
          excerpt: "Due to antiparallel orientation and 5' to 3' polymerase polarity, lagging strand synthesis proceeds discontinuously via Okazaki fragments."
        }
      }
    ]
  }
];

export const INITIAL_FLASHCARDS = [
  {
    id: "fc-1",
    subject: "Data Structures & Algorithms",
    documentTitle: "Data Structures & Algorithms - Trees & Graphs.pdf",
    front: "What is the Inorder Traversal order of a Binary Search Tree (BST)?",
    back: "Left Subtree -> Root Node -> Right Subtree.\nIn a BST, this traversal always outputs values in ascending sorted order.",
    mastered: true
  },
  {
    id: "fc-2",
    subject: "Data Structures & Algorithms",
    documentTitle: "Data Structures & Algorithms - Trees & Graphs.pdf",
    front: "What is the allowable Balance Factor range for an AVL tree node?",
    back: "The Balance Factor (Height of Left - Height of Right) must strictly be {-1, 0, +1}. Any other value triggers rotation.",
    mastered: false
  },
  {
    id: "fc-3",
    subject: "Data Structures & Algorithms",
    documentTitle: "Data Structures & Algorithms - Trees & Graphs.pdf",
    front: "What is the space complexity of an Adjacency Matrix vs an Adjacency List for graph G = (V, E)?",
    back: "Adjacency Matrix: O(V²) space.\nAdjacency List: O(V + E) space (much more efficient for sparse graphs).",
    mastered: true
  },
  {
    id: "fc-4",
    subject: "Data Structures & Algorithms",
    documentTitle: "Data Structures & Algorithms - Trees & Graphs.pdf",
    front: "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
    back: "Because of its greedy invariant: it assumes once a vertex is marked visited, its shortest distance is finalized. A later negative edge can undercut this finalized cost.",
    mastered: false
  },
  {
    id: "fc-5",
    subject: "Biology & Genetics",
    documentTitle: "Cell Biology & Molecular Genetics - Unit 3.pdf",
    front: "What enzyme covalently joins Okazaki fragments on the lagging strand?",
    back: "DNA Ligase forms phosphodiester bonds to seal the discontinuous nicks.",
    mastered: true
  },
  {
    id: "fc-6",
    subject: "Economics & Finance",
    documentTitle: "Macroeconomics - Fiscal & Monetary Policy Notes.pptx",
    front: "What is the Keynesian Fiscal Multiplier formula in terms of MPC?",
    back: "Multiplier k = 1 / (1 - MPC) or 1 / MPS.\nHigher Marginal Propensity to Consume yields a larger multiplier.",
    mastered: false
  },
  {
    id: "fc-7",
    subject: "Linear Algebra",
    documentTitle: "Linear Algebra - Vector Spaces & Eigenvalues.pdf",
    front: "What is the Rank-Nullity Theorem formula?",
    back: "Rank(T) + Nullity(T) = Dimension(Domain V).\nThe dimension of the column space plus the kernel equals total input dimensions.",
    mastered: false
  }
];

export const INITIAL_PRACTICE_QUESTIONS = [
  {
    id: "q-1",
    subject: "Data Structures & Algorithms",
    question: "Which tree traversal of a Binary Search Tree (BST) visits nodes in strictly increasing numeric order?",
    options: ["Preorder (Root, Left, Right)", "Inorder (Left, Root, Right)", "Postorder (Left, Right, Root)", "Level Order (Breadth-First)"],
    correctIndex: 1,
    explanation: "Because BST maintains Left < Root < Right, visiting the left subtree first, then the root, and then the right subtree produces elements in strictly ascending sorted order."
  },
  {
    id: "q-2",
    subject: "Data Structures & Algorithms",
    question: "When inserting into an AVL tree, what rotation pattern is required if the node is Left-Heavy and its child is Right-Heavy (LR imbalance)?",
    options: ["Single Right Rotation", "Single Left Rotation", "Left Rotation on Child followed by Right Rotation on Root", "Right Rotation on Child followed by Left Rotation on Root"],
    correctIndex: 2,
    explanation: "An LR imbalance forms a zigzag. A Left Rotation on the child straightens the branch into an LL configuration, followed by a Right Rotation on the parent node to restore balance."
  },
  {
    id: "q-3",
    subject: "Biology & Genetics",
    question: "Which of the following enzymes relieves torsional strain (supercoiling) ahead of the advancing replication fork?",
    options: ["DNA Helicase", "DNA Topoisomerase / Gyrase", "DNA Primase", "DNA Polymerase I"],
    correctIndex: 1,
    explanation: "Topoisomerase (DNA Gyrase in bacteria) introduces temporary nicks in the DNA strand to relieve helical supercoiling tension caused by unwinding helicase."
  },
  {
    id: "q-4",
    subject: "Economics & Finance",
    question: "If the Marginal Propensity to Consume (MPC) in an economy is 0.8, what is the government spending multiplier?",
    options: ["1.25", "2.0", "4.0", "5.0"],
    correctIndex: 3,
    explanation: "The Keynesian spending multiplier is 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5.0."
  },
  {
    id: "q-5",
    subject: "Linear Algebra",
    question: "If a 4x4 matrix A has eigenvalues λ = 2, 3, -1, and 4, what is the determinant of matrix A?",
    options: ["8", "-24", "24", "0"],
    correctIndex: 1,
    explanation: "The determinant of any square matrix is equal to the product of all its eigenvalues: 2 * 3 * (-1) * 4 = -24."
  }
];

export const INITIAL_GLOSSARY = [
  { term: "Adjacency Matrix", subject: "Data Structures", definition: "A 2D V x V grid where entry (i, j) indicates presence or weight of an edge between vertex i and vertex j." },
  { term: "AVL Tree", subject: "Data Structures", definition: "Self-balancing binary search tree where the height difference between left and right subtrees cannot exceed 1." },
  { term: "Dijkstra's Algorithm", subject: "Data Structures", definition: "A greedy algorithm that finds shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge costs." },
  { term: "Okazaki Fragments", subject: "Biology", definition: "Short segments of DNA synthesized on the lagging strand during DNA replication." },
  { term: "Helicase", subject: "Biology", definition: "Enzyme that unwinds double-stranded DNA by breaking hydrogen bonds between base pairs." },
  { term: "Crowding Out", subject: "Economics", definition: "A phenomenon where increased government borrowing raises interest rates, causing a reduction in private sector investment." },
  { term: "Marginal Propensity to Consume (MPC)", subject: "Economics", definition: "The proportion of an aggregate raise in pay that a consumer spends on goods and services rather than saving." },
  { term: "Characteristic Equation", subject: "Linear Algebra", definition: "The algebraic equation det(A - λI) = 0 used to find the eigenvalues of a square matrix A." },
  { term: "Rank-Nullity Theorem", subject: "Linear Algebra", definition: "States that the dimension of the domain of a linear map equals the rank plus the nullity." }
];

export const DIAGNOSTIC_QUIZ_QUESTIONS = [
  {
    id: "diag-1",
    subject: "Data Structures & Algorithms",
    question: "What is the worst-case time complexity of searching in an unbalanced Binary Search Tree of n elements?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 2
  },
  {
    id: "diag-2",
    subject: "Data Structures & Algorithms",
    question: "Which data structure is primarily used to implement Breadth-First Search (BFS)?",
    options: ["Stack (LIFO)", "Queue (FIFO)", "Priority Queue", "Hash Table"],
    correctIndex: 1
  },
  {
    id: "diag-3",
    subject: "Database Management",
    question: "In relational database design, which normal form requires eliminating transitive functional dependencies?",
    options: ["1st Normal Form (1NF)", "2nd Normal Form (2NF)", "3rd Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
    correctIndex: 2
  },
  {
    id: "diag-4",
    subject: "Computer Networks",
    question: "At which layer of the OSI model does the Transmission Control Protocol (TCP) operate?",
    options: ["Application Layer", "Transport Layer", "Network Layer", "Data Link Layer"],
    correctIndex: 1
  }
];
