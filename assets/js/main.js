/**
 * OM MULCHANDANI — INTERDISCIPLINARY TECHNOLOGIST PORTFOLIO
 * Core Interaction & Simulation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initSystemClock();
  initRotatingMicrocopy();
  initCustomCursor();
  initMagneticButtons();
  initGenomeXSimulation();
  initAtlasSimulation();
  initPulseSimulation();
  initLabNotebook();
  initObsessionCards();
  initSkillsFilter();
  initCommandPalette();
  initCopyEmail();
  initMobileNav();
  initKeyboardShortcuts();
  initScrollSpy();
  initSoundToggle();
  
  // Initialize AOS if loaded
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
});

/* ==========================================================================
   01. SYSTEM CLOCK & TELEMETRY
   ========================================================================== */
function initSystemClock() {
  const clockEl = document.getElementById('system-clock');
  const utcClockEl = document.getElementById('utc-clock');
  const uptimeEl = document.getElementById('system-uptime');
  
  const startTime = Date.now();

  function update() {
    const now = new Date();
    
    // IST Time (UTC+5:30)
    const istOptions = { 
      timeZone: 'Asia/Kolkata', 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    if (clockEl) {
      clockEl.textContent = `${now.toLocaleTimeString('en-GB', istOptions)} IST`;
    }
    
    // UTC Time
    if (utcClockEl) {
      const utcHours = String(now.getUTCHours()).padStart(2, '0');
      const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
      const utcSecs = String(now.getUTCSeconds()).padStart(2, '0');
      utcClockEl.textContent = `${utcHours}:${utcMins}:${utcSecs} UTC`;
    }

    // Session Uptime
    if (uptimeEl) {
      const diffSecs = Math.floor((Date.now() - startTime) / 1000);
      const mins = String(Math.floor(diffSecs / 60)).padStart(2, '0');
      const secs = String(diffSecs % 60).padStart(2, '0');
      uptimeEl.textContent = `${mins}:${secs}`;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   02. ROTATING MICROCOPY
   ========================================================================== */
function initRotatingMicrocopy() {
  const phrases = [
    "DATA ANALYST",
    "BIOINFORMATICS STUDENT",
    "AI EXPLORER",
    "COMPUTATIONAL GENERALIST",
    "BUILDER",
    "TECHNOLOGY OBSERVER",
    "FUTURE FOUNDER",
    "PROFESSIONAL RABBIT-HOLE EXPLORER"
  ];

  const target = document.getElementById('rotating-microcopy');
  if (!target) return;

  let index = 0;
  setInterval(() => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(4px)';
    
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      target.textContent = phrases[index];
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    }, 250);
  }, 2800);
}

/* ==========================================================================
   03. CUSTOM PRECISION CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.display = 'block';
  });

  function render() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const interactives = document.querySelectorAll('a, button, input, select, textarea, .interactive-item, [data-interactive]');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
  });
}

/* ==========================================================================
   04. MAGNETIC BUTTONS (SUBTLE ACCENT)
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const btns = document.querySelectorAll('.btn-magnetic');

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   05. PROJECT 01: GENOME X SIMULATION
   ========================================================================== */
function initGenomeXSimulation() {
  const geneSelect = document.getElementById('genomex-gene-select');
  const sequenceViewer = document.getElementById('genomex-seq-display');
  const locusDisplay = document.getElementById('genomex-locus');
  const mutationCount = document.getElementById('genomex-mutation-count');
  const expressionLevel = document.getElementById('genomex-expression-val');
  const heatmapContainer = document.getElementById('genomex-heatmap-bars');

  const geneData = {
    CFTR: {
      locus: 'chr7:117,479,963-117,668,665 [7q31.2]',
      mutations: '1,894 cataloged variants (ΔF508 primary)',
      expression: '88.4 TPM (Epithelial tissue)',
      seq: [
        { text: 'ATGCAGAGGTCGCCTCTGGAAAAGGCCAGCGTTGTCTCCAAACTTTTT', mut: false },
        { text: 'TTTCAGCTGGACCAGACCAATTTTGAGGAAAGGATACAGACAGCGCCT', mut: false },
        { text: 'ATCATT', mut: false },
        { text: 'CTT', mut: true, label: 'ΔF508 deletion locus' },
        { text: 'GGTGTTTCCTATGATGAATATAGATACAGAAGCGTCATCAAAGCATGC', mut: false }
      ],
      expressionBars: [88, 42, 65, 94, 28, 77, 85, 34, 91, 55]
    },
    TP53: {
      locus: 'chr17:7,668,421-7,687,490 [17p13.1]',
      mutations: '2,900+ somatic hotspots (R175H, R248W, R273H)',
      expression: '142.1 TPM (Cellular stress response)',
      seq: [
        { text: 'ATGGAGGAGCCGCAGTCAGATCCTAGCGTCGAGCCCCCTCTGAGTCAG', mut: false },
        { text: 'GAAACATTTTCAGACCTATGGAAACTACTTCCTGAAAACAACGTTCTG', mut: false },
        { text: 'TCCCCCTTGCCGTCCCAA', mut: false },
        { text: 'CGT', mut: true, label: 'p.Arg175His missense' },
        { text: 'GCAATGGATGATTTGATGCTGTCCCCGGACGATATTGAACAATGGTTCA', mut: false }
      ],
      expressionBars: [95, 88, 72, 60, 84, 92, 100, 68, 79, 87]
    },
    BRCA1: {
      locus: 'chr17:43,044,295-43,125,483 [17q21.31]',
      mutations: '1,650 pathogenic variants (185delAG, 5382insC)',
      expression: '64.8 TPM (DNA repair pathways)',
      seq: [
        { text: 'ATGGATTTATCTGCTCTTCGCGTTGAAGAAGTACAAAATGTCATTAAT', mut: false },
        { text: 'GCTATGCAGAAAATCTTAGAGTGTCCCATCTGTCTGGAGTTGATCAAG', mut: false },
        { text: 'GAACCTGTCTCCACAAAG', mut: false },
        { text: 'AG', mut: true, label: '185delAG frameshift' },
        { text: 'TGTGACCACATATTTTGCAAATTTTGCATGCTGAAACTTCTCAACCAGA', mut: false }
      ],
      expressionBars: [45, 60, 38, 74, 52, 66, 78, 49, 63, 71]
    },
    APOE: {
      locus: 'chr19:44,905,791-44,909,393 [19q13.32]',
      mutations: 'ε2, ε3, ε4 alleles (Cys112Arg, Arg158Cys)',
      expression: '310.2 TPM (Liver / Astrocyte lipid flux)',
      seq: [
        { text: 'ATGAAGGTTCTGTGGGCTGCGTTGCTGGTCACATTCCTGGCAGGATGC', mut: false },
        { text: 'CAGGCCAAGGTGGAGCAAGCGGTGGAGACAGAGCCGGAGCCCGAGCTG', mut: false },
        { text: 'CGCCAGCAGACCGAGTGG', mut: false },
        { text: 'TGC', mut: true, label: 'Arg112Cys SNP (rs429358)' },
        { text: 'CAGAGCGGCCAGCGCTGGGAACTGGCACTGGGTCGCTTTTGGGATTACC', mut: false }
      ],
      expressionBars: [92, 85, 98, 70, 89, 94, 76, 88, 91, 83]
    }
  };

  function renderGene(geneKey) {
    const data = geneData[geneKey];
    if (!data) return;

    if (locusDisplay) locusDisplay.textContent = data.locus;
    if (mutationCount) mutationCount.textContent = data.mutations;
    if (expressionLevel) expressionLevel.textContent = data.expression;

    if (sequenceViewer) {
      sequenceViewer.innerHTML = '';
      data.seq.forEach(chunk => {
        const span = document.createElement('span');
        span.textContent = chunk.text;
        if (chunk.mut) {
          span.className = 'bg-purple-900/60 text-purple-300 font-bold border border-purple-500 px-1 mx-0.5 rounded-none cursor-pointer';
          span.title = chunk.label;
        }
        sequenceViewer.appendChild(span);
      });
    }

    if (heatmapContainer) {
      heatmapContainer.innerHTML = '';
      data.expressionBars.forEach((val, i) => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'flex flex-col items-center flex-1 h-full justify-end';
        
        const bar = document.createElement('div');
        bar.className = 'w-full bg-purple-500/40 hover:bg-purple-400 transition-all duration-300';
        bar.style.height = `${val}%`;
        bar.title = `Tissue Segment ${i + 1}: ${val}% expression`;

        const label = document.createElement('span');
        label.className = 'text-[9px] font-mono text-zinc-500 mt-1';
        label.textContent = `T${i + 1}`;

        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        heatmapContainer.appendChild(barWrapper);
      });
    }
  }

  if (geneSelect) {
    geneSelect.addEventListener('change', (e) => {
      renderGene(e.target.value);
    });
    renderGene(geneSelect.value || 'CFTR');
  }
}

/* ==========================================================================
   06. PROJECT 02: ATLAS AI SIMULATION
   ========================================================================== */
function initAtlasSimulation() {
  const queryInput = document.getElementById('atlas-query-input');
  const runBtn = document.getElementById('atlas-run-btn');
  const resultsContainer = document.getElementById('atlas-results');
  const graphStatus = document.getElementById('atlas-graph-status');

  const presetQueries = {
    "CRISPR-Cas12a off-target kinetic models": {
      nodes: 14,
      chunks: 8,
      latency: "142ms",
      sources: [
        { title: "Nature Biotech / Gao et al.", year: "2024", sim: "0.942", chunk: "Kinetic profiling reveals non-canonical protospacer adjacent motif binding rates at sub-nanomolar affinity." },
        { title: "Cell Genomics / Martinez & Lee", year: "2025", sim: "0.898", chunk: "Cas12a non-target strand cleavage dynamics mapped across 48 diploid human cell lines." },
        { title: "Bioinformatics (Oxford) / Chen et al.", year: "2024", sim: "0.871", chunk: "Transformer embeddings of guide RNA energy landscapes accurately predict indel probabilities." }
      ],
      synthesis: "Retrieved 8 coherent document chunks. High semantic convergence (0.94 cosine similarity) identifies secondary cleavage kinetics as dominant driver of non-target strand dissociation. Cross-referenced with 14 citation graph nodes."
    },
    "Transformer embeddings in protein folding": {
      nodes: 19,
      chunks: 11,
      latency: "188ms",
      sources: [
        { title: "PNAS / Rives et al. (ESM-2 Followup)", year: "2024", sim: "0.965", chunk: "Unsupervised representations of 250M protein sequences capture evolutionary constraints and contact maps without MSA." },
        { title: "Bioinformatics / Lin & Söding", year: "2025", sim: "0.912", chunk: "Fast structural alignment using dense invariant residue token vectors." },
        { title: "Cell Systems / Vaswani et al. BioLab", year: "2025", sim: "0.887", chunk: "Attention head entropy correlates with disordered loops and allosteric transition states." }
      ],
      synthesis: "Cross-document synthesis shows single-sequence language model embeddings match MSA-based co-evolutionary profiles when scaled beyond 3B parameters. Graph indicates 19 tightly clustered citations."
    },
    "Autonomous multi-agent research pipelines": {
      nodes: 23,
      chunks: 9,
      latency: "115ms",
      sources: [
        { title: "arXiv / Boiko et al. (Autonomous Chemist)", year: "2024", sim: "0.954", chunk: "Multi-agent architecture delegating synthesis planning, hazard review, and instrument API execution." },
        { title: "J. Chem. Inf. Model. / Bran et al.", year: "2025", sim: "0.903", chunk: "Tool-augmented LLMs executing automated literature retrieval and continuous protocol verification." }
      ],
      synthesis: "Autonomous agent execution requires strict isolation between reasoning, verification, and laboratory actuation APIs. Vector memory retrieval mitigates repetitive synthesis failures."
    }
  };

  function executeQuery(queryText) {
    const data = presetQueries[queryText] || {
      nodes: 12,
      chunks: 6,
      latency: "128ms",
      sources: [
        { title: "Synthesized Vector Match #1", year: "2025", sim: "0.912", chunk: `Embedding vectors aligned with query concepts: "${queryText}". Found high-density clustering in vector partition 4B.` },
        { title: "Synthesized Vector Match #2", year: "2024", sim: "0.854", chunk: "Literature graph shows strong correlation with downstream experimental verification protocols." }
      ],
      synthesis: `Synthesized research intelligence for "${queryText}". Extracted structured insights across multi-paper vector database with verified citation provenance.`
    };

    if (graphStatus) {
      graphStatus.textContent = `GRAPH NODES: ${data.nodes} | CHUNKS: ${data.chunks} | RAG LATENCY: ${data.latency}`;
    }

    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="p-3 bg-purple-950/20 border border-purple-500/40 mb-3">
          <div class="text-[10px] font-mono text-purple-400 font-semibold mb-1 uppercase tracking-wider">// AI EXTRACTIVE SYNTHESIS</div>
          <p class="text-xs text-zinc-200 font-sans leading-relaxed">${data.synthesis}</p>
        </div>
        <div class="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">// RETRIEVED CITATION CHUNKS</div>
        <div class="space-y-2">
          ${data.sources.map(src => `
            <div class="p-2.5 bg-black/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div class="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                <span class="text-zinc-200 font-medium">${src.title}</span>
                <span class="text-purple-400 font-bold">cos: ${src.sim}</span>
              </div>
              <div class="text-xs text-zinc-400 font-sans">${src.chunk}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  if (runBtn && queryInput) {
    runBtn.addEventListener('click', () => {
      executeQuery(queryInput.value || "CRISPR-Cas12a off-target kinetic models");
    });

    queryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeQuery(queryInput.value);
      }
    });

    // Preset query buttons
    const presetPills = document.querySelectorAll('.atlas-preset-btn');
    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const q = pill.getAttribute('data-query');
        if (queryInput && q) {
          queryInput.value = q;
          executeQuery(q);
        }
      });
    });

    // Run default once
    executeQuery("CRISPR-Cas12a off-target kinetic models");
  }
}

/* ==========================================================================
   07. PROJECT 03: PROJECT PULSE SIMULATION
   ========================================================================== */
function initPulseSimulation() {
  const streamConsole = document.getElementById('pulse-data-stream');
  const anomalyIndicator = document.getElementById('pulse-anomaly-rate');
  const metricDisplay = document.getElementById('pulse-entropy-val');

  if (!streamConsole) return;

  const sampleEvents = [
    "[10:14:02] STREAM: GEO_GSE147507 RNA-seq batch ingested (n=48)",
    "[10:14:03] MODEL: Latent manifold projection: UMAP dim=2 converged (loss=0.012)",
    "[10:14:05] PATTERN: Cluster #3 identified: STAT1/CXCL10 interferon signature",
    "[10:14:08] STAT: Cross-correlation score between ACE2 expression and TMPRSS2: r=0.78",
    "[10:14:11] AGENT: Automated hypothesis drafted -> 'Differential transcription in pulmonary lineage'",
    "[10:14:14] STREAM: Microarray validation passed across replicate set B",
    "[10:14:17] ALERT: 2 outlier samples flagged for sequencing depth variance"
  ];

  let logIndex = 0;
  setInterval(() => {
    const p = document.createElement('div');
    p.className = 'text-[11px] font-mono text-zinc-400 py-0.5 border-b border-zinc-900 flex justify-between';
    p.textContent = sampleEvents[logIndex % sampleEvents.length];
    
    streamConsole.prepend(p);
    logIndex++;

    while (streamConsole.children.length > 8) {
      streamConsole.removeChild(streamConsole.lastChild);
    }

    if (metricDisplay) {
      const entropy = (0.24 + Math.random() * 0.08).toFixed(3);
      metricDisplay.textContent = `${entropy} bit/nt`;
    }
    if (anomalyIndicator) {
      anomalyIndicator.textContent = `${(0.4 + Math.random() * 0.6).toFixed(2)}%`;
    }
  }, 3200);
}

/* ==========================================================================
   08. LAB NOTEBOOK
   ========================================================================== */
function initLabNotebook() {
  const tabs = document.querySelectorAll('.lab-tab');
  const contents = document.querySelectorAll('.lab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active', 'border-purple-500', 'bg-zinc-900'));
      contents.forEach(c => c.classList.add('hidden'));

      tab.classList.add('active', 'border-purple-500', 'bg-zinc-900');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });

  // Lab 01 Interactive Comparison Switcher
  const lab1Btn = document.getElementById('lab1-toggle-mode');
  const lab1Dashboard = document.getElementById('lab1-view-dashboard');
  const lab1Agent = document.getElementById('lab1-view-agent');
  if (lab1Btn && lab1Dashboard && lab1Agent) {
    lab1Btn.addEventListener('click', () => {
      const isDashboardActive = !lab1Dashboard.classList.contains('hidden');
      if (isDashboardActive) {
        lab1Dashboard.classList.add('hidden');
        lab1Agent.classList.remove('hidden');
        lab1Btn.textContent = 'SWITCH VIEW: TRADITIONAL DASHBOARD';
      } else {
        lab1Dashboard.classList.remove('hidden');
        lab1Agent.classList.add('hidden');
        lab1Btn.textContent = 'SWITCH VIEW: CONVERSATIONAL AI REASONING';
      }
    });
  }

  // Lab 02 Agent Task Trigger
  const lab2Trigger = document.getElementById('lab2-dispatch-btn');
  const lab2Log = document.getElementById('lab2-agent-log');
  if (lab2Trigger && lab2Log) {
    lab2Trigger.addEventListener('click', () => {
      const tasks = [
        "AGENT [SYNTH_01]: Ingesting user goal -> 'Find all kinase inhibitors with IC50 < 10nM against BRAF V600E'",
        "AGENT [MEM_QUERY]: Retrieving past synthesis vectors from ChromaDB...",
        "AGENT [PERM_CHK]: Validated access token for ChEMBL and PubChem API endpoints.",
        "AGENT [TOOL_EXEC]: Executing chemical similarity search across SMILES fingerprints.",
        "AGENT [SYNTH_01]: Discovered 4 candidate scaffolds. Cross-verifying clinical trial Phase II status.",
        "AGENT [SUMMARY]: Dispatched synthesized brief to workspace terminal. 0 human interruptions required."
      ];
      lab2Log.innerHTML = '';
      tasks.forEach((t, i) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'text-xs font-mono text-purple-300 py-1 border-b border-zinc-800';
          div.textContent = `> ${t}`;
          lab2Log.appendChild(div);
          lab2Log.scrollTop = lab2Log.scrollHeight;
        }, i * 350);
      });
    });
  }
}

/* ==========================================================================
   09. OBSESSION CARDS
   ========================================================================== */
function initObsessionCards() {
  const cards = document.querySelectorAll('.obsession-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const quote = card.querySelector('.obsession-quote');
      if (quote) {
        quote.style.opacity = '1';
        quote.style.transform = 'translateY(0)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const quote = card.querySelector('.obsession-quote');
      if (quote) {
        quote.style.opacity = '0.85';
      }
    });
  });
}

/* ==========================================================================
   10. SKILLS FILTER & INTERSECTION HIGHLIGHT
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-block');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-purple-600', 'text-black', 'border-purple-600');
        b.classList.add('bg-zinc-900', 'text-zinc-300', 'border-zinc-800');
      });

      btn.classList.add('bg-purple-600', 'text-black', 'border-purple-600');
      btn.classList.remove('bg-zinc-900', 'text-zinc-300', 'border-zinc-800');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'ALL' || category === filter || category?.includes(filter)) {
          card.style.opacity = '1';
          card.style.filter = 'grayscale(0)';
          card.style.pointerEvents = 'auto';
        } else {
          card.style.opacity = '0.25';
          card.style.filter = 'grayscale(1)';
        }
      });
    });
  });
}

/* ==========================================================================
   11. COMMAND PALETTE MODAL
   ========================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const openBtns = document.querySelectorAll('.open-cmd-palette');
  const closeBtn = document.getElementById('cmd-palette-close');
  const searchInput = document.getElementById('cmd-palette-input');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openPalette() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (searchInput) {
      searchInput.value = '';
      setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closePalette() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  openBtns.forEach(btn => btn.addEventListener('click', openPalette));
  if (closeBtn) closeBtn.addEventListener('click', closePalette);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      cmdItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(val)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closePalette();
      executeAction(action);
    });
  });

  function executeAction(action) {
    switch(action) {
      case 'jump-about':
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-trajectory':
        document.getElementById('trajectory')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-lab':
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-obsessions':
        document.getElementById('obsessions')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-skills':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'copy-email':
        copyEmailAddress();
        break;
      case 'download-pdf':
        downloadResumePdf();
        break;
      case 'view-resume':
        window.location.href = 'resume.html';
        break;
      default:
        break;
    }
  }
}

function downloadResumePdf() {
  const link = document.createElement('a');
  link.href = 'resume/resume.pdf';
  link.download = 'Om_Mulchandani_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('DOWNLOADING: Om_Mulchandani_Resume.pdf');
}

/* ==========================================================================
   12. COPY EMAIL TO CLIPBOARD WITH BRUTALIST TOAST
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailAddress();
    });
  });
}

function copyEmailAddress() {
  const email = "ommulchandani2108@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast(`COPIED TO CLIPBOARD: ${email}`);
  }).catch(() => {
    // Fallback prompt
    showToast(`EMAIL: ${email}`);
  });
}

function showToast(message) {
  let toast = document.getElementById('system-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'system-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-black border-2 border-purple-500 text-purple-300 font-mono text-xs px-4 py-3 shadow-2xl flex items-center gap-3 transition-transform duration-300 transform translate-y-20';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2 h-2 bg-purple-400 rounded-full inline-block animate-ping"></span>
    <span class="font-bold tracking-wider">${message}</span>
  `;
  toast.classList.remove('translate-y-20');

  setTimeout(() => {
    toast.classList.add('translate-y-20');
  }, 3500);
}

/* ==========================================================================
   13. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   14. KEYBOARD SHORTCUTS
   ========================================================================== */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Cmd+K or Ctrl+K for command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const openPalette = document.querySelector('.open-cmd-palette');
      if (openPalette) openPalette.click();
    }
    // Escape to close open modal
    if (e.key === 'Escape') {
      const modal = document.getElementById('cmd-palette-modal');
      if (modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }
  });
}

/* ==========================================================================
   15. SCROLL SPY ACTIVE NAV LINK
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-purple-400', 'border-purple-500');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-purple-400');
      }
    });
  });
}

/* ==========================================================================
   16. TACTILE AUDIO SYNTHESIS (OPTIONAL / MUTED BY DEFAULT)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function playTactileClick() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.015);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.015);
  } catch (e) {}
}

function initSoundToggle() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      toggleBtn.textContent = soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
      if (soundEnabled) {
        toggleBtn.classList.add('text-[#8B5CF6]', 'border-[#8B5CF6]');
        playTactileClick();
      } else {
        toggleBtn.classList.remove('text-[#8B5CF6]', 'border-[#8B5CF6]');
      }
    });
  }

  // Bind click sound to tactile interactive elements
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .lab-tab, .skill-filter-btn, .atlas-preset-btn, .cmd-item')) {
      playTactileClick();
    }
  });
}

