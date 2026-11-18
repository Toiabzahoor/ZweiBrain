\documentclass[10pt,a4paper]{article}

  

\usepackage[utf8]{inputenc}

\usepackage[T1]{fontenc}

\usepackage[margin=0.75in]{geometry}

\usepackage{amsmath,amssymb,amsfonts}

\usepackage{booktabs}

\usepackage{longtable}

\usepackage{array}

\usepackage{multirow}

\usepackage{caption}

\usepackage{hyperref}

  

\hypersetup{

colorlinks=true,

linkcolor=blue,

citecolor=blue,

urlcolor=blue

}

  

\captionsetup{font=small,labelfont=bf}

\setlength{\LTcapwidth}{\textwidth}

  

\title{\textbf{Comparative Neuroenergetics, Allometric Scaling, and Cytoarchitectural Evolution Across Amniote Brains}}

\author{}

\date{}

  

\begin{document}

  

\maketitle

  

\begin{abstract}

Comparative systems neurobiology has historically relied on whole-brain endocranial volume and brain-to-body allometric residuals—such as Jerison's encephalization quotient—under the assumption that brain mass scales universally with neuron number across vertebrates. Quantitative cellular fractionation across more than 250 amniote species, integrated with ultrastructural electron microscopy, in vivo positron emission tomography, patch-clamp electrophysiology, cephalic vascular physiology, and single-cell multiomics, overturns this paradigm and establishes a unified, quantitatively rigorous framework across amniote brains. Whereas crown mammals elaborated a six-layered dorsal pallial neocortex that scales across four orders of magnitude in brain mass under a rigid per-neuron metabolic ceiling of $5.79 \times 10^{-9} \pm 0.76 \times 10^{-9}\ \mu\text{mol}$ glucose per neuron per minute and an invariant local primary visual cortex (V1) bioenergetic coupling ratio of $1.91 \pm 0.47$ mitochondria per synapse, birds evolved a non-laminated, nuclear pallium dominated by the dorsal ventricular ridge (DVR) and Wulst (hyperpallium). By miniaturizing somatodendritic arbors, suppressing baseline astroglial intermediate filament (GFAP) synthesis in favor of compact $\text{GS}^+$ perineuronal satellite glia, and operating at core physiological temperatures of $40.0\text{--}42.9\ ^\circ\text{C}$ regulated by the extracranial rete mirabile ophthalmicum (RMO), avian neurons consume 3.11-fold less glucose per neuron ($1.86 \times 10^{-9} \pm 0.2 \times 10^{-9}\ \mu\text{mol}$ glucose per neuron per minute in awake \textit{Columba livia}) than mammalian neurons. Biophysical action potential modeling and tri-compartment neuroglial potassium ($\text{K}^+$) clearance simulations demonstrate that convergent recruitment of high-threshold $\text{Kv3.1}$ (\textit{KCNC1}) channels and $\text{Nav}\beta4$-mediated resurgent $\text{Na}^+$ currents ($I_{\text{NaR}}$) compresses spike half-widths to $0.16\text{--}0.18\text{ ms}$ at $40\ ^\circ\text{C}$, reducing single-spike ATP expenditure to $1.30 \times 10^7\text{--}2.21 \times 10^7$ ATP molecules/spike while accelerating astroglial $\text{Kir4.1}/\text{AQP4}$ potassium buffering by $42.1\text{--}43.7\%$ at $41.0\ ^\circ\text{C}$. Finally, we resolve key methodological and developmental gaps regarding 2D areal versus 3D volumetric ultrastructural stereology, saccadic glucose pumping by the pecten oculi, and the developmental convergence of dorsal and ventral avian pallial glutamatergic lineages onto shared adult effector transcriptomes.

\end{abstract}

  

\section{Macroevolutionary Allometry and Cellular Scaling Rules Across Amniote Brains}

  

Comparative systems neurobiology has historically relied on whole-brain endocranial volume and brain-to-body allometric residuals—such as Jerison's encephalization quotient—under the assumption that brain mass scales universally with neuron number across vertebrates. Quantitative cellular fractionation (isotropic fractionator) across more than 250 amniote species—including 108 non-avian reptiles (squamates, chelonians, and crocodylians), 65 birds across distinct avian orders, and 49 to 75 non-primate and primate mammals—has overturned this paradigm, demonstrating that brain mass does not scale universally with total neuron counts. Instead, divergent evolutionary trajectories in cellular scaling rules govern how neurons are packed into cerebral tissue, producing profound differences in computational capacity per unit of tissue volume across amniote clades.

  

\subsection{Ancestral Amniotic Scaling and the Two-Stage Avian Neuronal Packing Divergence}

  

When structural mass ($M_{\text{str}}$) of the telencephalon or pallium is modeled as a power function of structural neuron number ($N_{\text{str}}$) according to $M_{\text{str}} = e^{a \pm \text{SE}} N_{\text{str}}^{b \pm \text{SE}}$, non-primate mammals and ectothermic reptiles conform to a shared ancestral amniotic scaling relationship. Specifically, telencephalic/pallial mass scales with neuron number with an exponent of $b = 1.495 \pm 0.033$ in non-primate mammals and $b = 1.437 \pm 0.064$ in reptiles, where non-primate mammalian data points fall directly within the 95\% prediction interval of reptilian scaling. Consequently, neuronal density ($D_{N_{\text{str}}}$, expressed in $\text{neurons/mg}$ and modeled as $D_{N_{\text{str}}} = e^{a \pm \text{SE}} N_{\text{str}}^{b \pm \text{SE}}$) declines steeply as total pallial neuron counts increase, following an allometric exponent of $b = -0.495 \pm 0.033$ in non-primate mammals and $b = -0.438 \pm 0.064$ in reptiles. In these lineages, adding neurons to the forebrain requires a disproportionate expansion in average neuronal soma size, axonal caliber, and dendritic arbor volume, rapidly inflating brain mass and imposing severe geometric and metabolic constraints on absolute neuron number.

  

Avian brain evolution departs from this ancestral amniotic trajectory through a two-stage shift. First, at the origin of early-derived birds—comprising Palaeognathae, Galliformes, and Columbiformes—a grade shift increased baseline telencephalic neuronal packing density without significantly altering the power-law scaling slope: pallial mass scales with neuron number at $b = 1.386 \pm 0.060$ (and $b = 1.437 \pm 0.064$ when subpallial structures are moved into the rest-of-brain fraction $N_{\text{rob}}$ to align homologously with mammalian datasets), while neuronal density scales with neuron number at $b = -0.388 \pm 0.061$. In a comparative analysis of 15 galliform species, whole-brain neuron scaling with body mass does not differ statistically from that of rodents, insectivores, and marsupials ($p > 0.05$), whereas primates exhibit a significantly steeper body-to-neuron scaling slope than galliforms ($\text{PGLS}: \beta = 0.333 \pm 0.090, t_{50} = 3.702, p = 0.001, \lambda = 0.44$; pallial neuron slope $t = 3.825, p < 0.001$) and a distinct brain-mass-to-neuron slope ($\text{PGLS}: \beta = 0.158 \pm 0.062, t_{50} = 2.540, p = 0.015$). Nevertheless, because of their higher baseline packing density, galliform birds allocate $19\text{--}30\%$ of all brain neurons to the pallium, matching the pallial allocation of primates ($9\text{--}44\%$) and insectivores ($13\text{--}28\%$) and exceeding that of rodents ($11\text{--}19\%$) and marsupials ($11\text{--}20\%$).

  

The second and more radical evolutionary transition occurred at the origin of late-derived Neoaves (core land birds, Telluraves)—specifically Passeriformes (songbirds), Psittaciformes (parrots), Falconiformes, and Strigiformes—where the scaling exponent relating pallial neuronal density to neuron number flattened dramatically to $b = -0.100 \pm 0.044$. Because neuronal density barely decreases as neuron numbers rise, pallial neuron counts scale with pallial mass at an exponent of $0.874 \pm 0.041$ ($r^2 = 0.954, n = 24, p < 0.0001$). Consequently, late-derived core land birds pack up to 3.9 times as many pallial neurons into a given brain volume as mammals of equivalent brain mass (95\% CI: $2.9\text{ to }5.4$ at a $10\text{ g}$ brain mass), achieving primate-scale forebrain neuron counts ($1.20\text{ to }1.92\text{ billion}$ pallial neurons in corvids and large macaws) within cranial masses under $21\text{ g}$. Direct comparisons across size-matched avian and mammalian species pairs underscore that songbirds and parrots pack $2.2\text{ to }2.4$ times more total neurons into equivalent brain masses than rodents or primates (Table \ref{tab:pairs}):

\begin{itemize}

\item A $0.36\text{ g}$ goldcrest (\textit{Regulus regulus}) brain contains $164\text{ million}$ neurons compared to $71\text{ million}$ in a $0.42\text{ g}$ house mouse (\textit{Mus musculus}) brain ($2.31\times$ more total neurons in a 14\% smaller brain mass).

\item A $1.86\text{ g}$ European starling (\textit{Sturnus vulgaris}) brain houses $483\text{ million}$ neurons compared to $200\text{ million}$ in a $1.80\text{ g}$ Norway rat (\textit{Rattus norvegicus}) brain ($2.42\times$ more total neurons).

\item An $8.36\text{ g}$ rook (\textit{Corvus frugilegus}) brain contains $1,509\text{ million}$ neurons compared to $636\text{ million}$ in a $7.78\text{ g}$ common marmoset (\textit{Callithrix jacchus}) brain ($2.37\times$ more total neurons). A rook pallium weighing $5.2\text{--}5.8\text{ g}$ houses over three times as many pallial neurons as the similarly sized cerebral cortex of a common marmoset, and over ten times as many cortical neurons as a Tasmanian devil.

\item A $10.1\text{ g}$ sulphur-crested cockatoo (\textit{Cacatua galerita}) brain packs $2,122\text{ million}$ neurons compared to $936\text{ million}$ in a $10.2\text{ g}$ galago (\textit{Otolemur garnettii}) brain ($2.27\times$ more total neurons).

\end{itemize}

  

\begin{longtable}{p{0.22\textwidth}p{0.25\textwidth}p{0.25\textwidth}p{0.22\textwidth}}

\caption{Size-matched avian versus mammalian brain comparisons and ancestral versus derived allometric scaling parameters.} \label{tab:pairs} \\

\toprule

\textbf{Taxonomic Comparison / Parameter} & \textbf{Avian Representative / Clade Value} & \textbf{Mammalian / Reptilian Representative / Clade Value} & \textbf{Allometric / Comparative Ratio \& Statistical Metric} \\

\midrule

\endfirsthead

\toprule

\textbf{Taxonomic Comparison / Parameter} & \textbf{Avian Representative / Clade Value} & \textbf{Mammalian / Reptilian Representative / Clade Value} & \textbf{Allometric / Comparative Ratio \& Statistical Metric} \\

\midrule

\endhead

\bottomrule

\endfoot

Micro-Mass Forebrain Pair ($\sim 0.4\text{ g}$) & Goldcrest (\textit{Regulus regulus}): $0.36\text{ g}$ brain, $164 \times 10^6$ neurons & House Mouse (\textit{Mus musculus}): $0.42\text{ g}$ brain, $71 \times 10^6$ neurons & $2.31\times$ more total neurons in 14\% smaller avian brain mass \\

Small-Mass Forebrain Pair ($\sim 1.8\text{ g}$) & European Starling: $1.86\text{ g}$ brain, $483 \times 10^6$ neurons & Norway Rat: $1.80\text{ g}$ brain, $200 \times 10^6$ neurons & $2.42\times$ more total neurons at equivalent brain mass \\

Medium-Mass Forebrain Pair ($\sim 8.0\text{ g}$) & Rook (\textit{Corvus}): $8.36\text{ g}$ brain, $1,509 \times 10^6$ neurons & Common Marmoset (Primate): $7.78\text{ g}$ brain, $636 \times 10^6$ neurons & $2.37\times$ more total neurons; $>3\times$ pallial neurons at $5.2\text{--}5.8\text{ g}$ pallium \\

Large-Mass Forebrain Pair ($\sim 10.1\text{ g}$) & Sulphur-Crested Cockatoo: $10.1\text{ g}$ brain, $2,122 \times 10^6$ neurons & Galago (Primate): $10.2\text{ g}$ brain, $936 \times 10^6$ neurons & $2.27\times$ more total neurons than a strepsirrhine primate of identical brain mass \\

Pallial Mass vs. Neurons ($M_{\text{str}} \propto N_{\text{str}}^b$) & Early-derived birds: $b = 1.386 \pm 0.060$ ($1.437 \pm 0.064$ adjusted) & Non-primate mammals: $b = 1.495 \pm 0.033$; Reptiles: $b = 1.437 \pm 0.064$ & Shared ancestral amniotic exponent across reptiles and non-primate mammals \\

Pallial Density vs. Neurons ($D_{N_{\text{str}}} \propto N_{\text{str}}^b$) & Early-derived birds: $b = -0.388 \pm 0.061$; Late-derived birds: $b = -0.100 \pm 0.044$ & Non-primate mammals: $b = -0.495 \pm 0.033$; Reptiles: $b = -0.438 \pm 0.064$ & Late-derived birds maintain near-isometric cell size as neuron counts expand \\

Pallial Neuronal Allocation (\% Whole Brain) & Galliformes: $19\text{--}30\%$ (exceeded in corvids and parrots up to $61.2\%$) & Primates: $9\text{--}44\%$; Insectivores: $13\text{--}28\%$; Rodents: $11\text{--}19\%$; Marsupials: $11\text{--}20\%$ & Avian pallial proportion matches or exceeds eutherian mammalian grades \\

\end{longtable}

  

\subsection{Evolutionary Grade Shifts and Brownian Motion Evolutionary Rates}

  

Over 300 million years of diverged evolutionary history since the Carboniferous split between Synapsida and Sauropsida, Bayesian reversible-jump bivariate multiregime Ornstein–Uhlenbeck modeling (\texttt{bayou}) and phylogenetic generalized least squares (PGLS) regression demonstrate that amniote brain evolution is governed by four major macroevolutionary grade shifts in neuron-to-body and neuron-to-brain scaling:

\begin{enumerate}

\item The independent emergence of endothermy and an average 20-fold neuronal amplification relative to body mass at the base of Mammalia.

\item The convergent 21-fold neuronal amplification relative to body mass at the base of Aves.

\item A secondary grade shift toward extreme neuronal packing densities at the origin of core land birds (Telluraves: Passeriformes, Psittaciformes, Falconiformes, and Strigiformes).

\item A parallel grade shift in anthropoid primates, characterized by preserved cortical and cerebellar neuronal densities across enlarging brain masses.

\end{enumerate}

  

Relative to an ectothermic non-avian reptile of equivalent body mass, birds and mammals possess brains that are on average 6-fold and 8-fold heavier, respectively, yet harbor 21-fold and 20-fold more total brain neurons. Within non-avian reptiles, \texttt{bayou} multiregime modeling detects no major shifts in whole-brain neuron scaling across 108 species, indicating that ectothermic sauropsids have remained anchored near an ancestral amniote scaling regime in which individual brain divisions (telencephalon, cerebellum, and rest of brain) typically harbor fewer than 10 million neurons each. Across 70 ectothermic reptile species (excluding Serpentes, Testudines, and the Nile crocodile), cerebellar neuron number ($N_{\text{cb}}$) scales against whole-brain mass ($M_{\text{br}}$) according to $N_{\text{cb}} = e^{15.593 \pm 0.133} M_{\text{br}}^{0.807 \pm 0.064}$ ($r^2 = 0.699, p < 0.0001$), compared to $N_{\text{cb}} = e^{18.294 \pm 0.052} M_{\text{br}}^{0.644 \pm 0.035}$ ($r^2 = 0.913, p < 0.0001$) across 34 small mammalian species.

  

Crucially, the relationship between relative brain size (residuals from PGLS brain-on-body regression) and relative neuronal density (residuals from PGLS neuron-on-brain-mass regression) diverges sharply across amniote classes. Across all amniotes combined, relative brain size correlates positively with relative neuron density ($t_{249} = 5.85, p < 0.001$, Pagel's $\lambda = 0.92$). This positive coupling holds within birds ($t_{63} = 6.01, p < 0.001, \lambda = 0.52$), within non-avian reptiles ($t_{108} = 3.74, p < 0.001, \lambda = 0.37$), and specifically within primates ($t_{9} = 2.77, p = 0.02, \lambda = 0.30$), but is absent across non-primate mammals ($t_{74} = 1.15, p = 0.25, \lambda = 0.96$). Thus, when birds, reptiles, and primates evolve larger brains relative to body size, they simultaneously increase neuron packing density, whereas non-primate mammals enlarge their brains along a declining neuronal density trajectory. Across standardized behavioral datasets (35 species, 464 individuals), absolute cortex or pallium neuron count exhibits a Spearman rank correlation of $r = 0.80$ (95\% CI: $0.20\text{ to }0.96, n = 8$ species with complete metrics) with self-control performance on the cylinder detour task, outperforming encephalization quotient ($r = 0.74$, 95\% CI: $0.05\text{ to }0.95$) and brain mass ($r = 0.73$, 95\% CI: $0.03\text{ to }0.95$).

  

Furthermore, quantifying the Brownian motion rate of evolution ($\sigma^2$) of PGLS residuals demonstrates how biomechanical constraints shape regional brain mosaicism (Table \ref{tab:clade_allometry}). In mammals, the telencephalon (cerebral cortex) and cerebellum evolve at equal rates ($\sigma^2_{\text{tel}} / \sigma^2_{\text{cb}} = 1.0$), reflecting tight coordinated scaling of cortico-cerebellar loops, with primates showing accelerated overall evolutionary rates indicative of relaxed constraints or strong directional selection. In non-avian reptiles, the cerebellum evolves at a 1.5-fold higher rate than the telencephalon ($\sigma^2_{\text{cb}} / \sigma^2_{\text{tel}} = 1.5$). In birds, allometric integration of the cerebellum is the tightest of any amniote clade (lowest $\sigma^2_{\text{cb}}$), constrained by the sensorimotor demands of active flight, whereas the avian telencephalon evolves at a 3.0-fold higher rate than the cerebellum ($\sigma^2_{\text{tel}} / \sigma^2_{\text{cb}} = 3.0$), permitting rapid evolutionary divergence of pallial neuron counts in core land birds without destabilizing cerebellar flight control.

  

\begin{longtable}{p{0.14\textwidth}p{0.15\textwidth}p{0.15\textwidth}p{0.15\textwidth}p{0.15\textwidth}p{0.14\textwidth}p{0.10\textwidth}}

\caption{Clade-specific allometric scaling exponents, structural allocation signatures, and phylogenetic evolutionary rates across amniote brains.} \label{tab:clade_allometry} \\

\toprule

\textbf{Taxonomic Clade / Grade} & \textbf{Brain--Body Mass Scaling ($M_{\text{br}} = a M_{\text{bo}}^b$)} & \textbf{Pallial / Cortical Mass vs. Neuron Scaling ($M_{\text{pall}} \propto N_{\text{pall}}^b$)} & \textbf{Cerebellar Mass vs. Neuron Scaling ($M_{\text{cb}} \propto N_{\text{cb}}^b$)} & \textbf{Subpallium vs. Pallium Neuron Scaling ($N_{\text{sub}} \propto N_{\text{pall}}^b$)} & \textbf{Clade Signature Neuronal Allocation Ratios} & \textbf{Evolutionary Rate Ratio ($\sigma^2_{\text{tel}} : \sigma^2_{\text{cb}}$)} \\

\midrule

\endfirsthead

\toprule

\textbf{Taxonomic Clade / Grade} & \textbf{Brain--Body Mass Scaling ($M_{\text{br}} = a M_{\text{bo}}^b$)} & \textbf{Pallial / Cortical Mass vs. Neuron Scaling ($M_{\text{pall}} \propto N_{\text{pall}}^b$)} & \textbf{Cerebellar Mass vs. Neuron Scaling ($M_{\text{cb}} \propto N_{\text{cb}}^b$)} & \textbf{Subpallium vs. Pallium Neuron Scaling ($N_{\text{sub}} \propto N_{\text{pall}}^b$)} & \textbf{Clade Signature Neuronal Allocation Ratios} & \textbf{Evolutionary Rate Ratio ($\sigma^2_{\text{tel}} : \sigma^2_{\text{cb}}$)} \\

\midrule

\endhead

\bottomrule

\endfoot

Ectothermic Reptiles (Squamata, Testudines, Crocodylia) & Ancestral baseline; brain mass $6\text{--}8\times$ smaller than endotherms & Continuum with non-primate mammals; $D_N \propto N^{-0.25}$ & $b = 1.159 \pm 0.046$ ($D_{N_{\text{cb}}} \propto N_{\text{cb}}^{-0.25}$) & Telencephalon analyzed as unified pallium + subpallium & $N_{\text{tel}} : N_{\text{cb}} : N_{\text{rob}} \approx 1.5 : 0.5 : 1.0$ ($<10\text{M}$ neurons/division) & $1.0 : 1.5$ (Cerebellum $1.5\times$ faster) \\

Basal / Early-Derived Birds (Galliformes, Columbiformes, Palaeognathae, Anseriformes) & Lower intercept than core land birds; Galliformes match non-primate mammals & $b = 1.437 \pm 0.064$ (when subpallium moved to $N_{\text{rob}}$) & $b = 1.257 \pm 0.048$ ($1.160 \pm 0.047$ pooled with reptiles) & $b = 0.989 \pm 0.101$ in Galliformes (isometric; $N_{\text{pall}}/N_{\text{sub}} \approx 4.2$) & Fixed $N_{\text{cb}} / N_{\text{rob}} \approx 4.5 : 1$; Telencephalon $<35\%$ of brain neurons in Galliformes & $3.0 : 1.0$ across Aves (Telencephalon $3\times$ faster) \\

Late-Derived Core Land Birds: Songbirds (Passeriformes) & $M_{\text{br}} = 0.087 M_{\text{bo}}^{0.737}$ ($r^2 = 0.953$; Corvids $b = 0.725$, Non-corvids $b = 0.698$) & Power exponent $> 1.0$: $10\times$ neuron gain yields $16.9\times$ brain mass gain & $b = 1.223 \pm 0.053$ (pooled late-derived clade) & $b = 0.891 \pm 0.090$ (or $0.91 \pm 0.10$; negatively allometric) & Pallium holds majority of brain neurons; $3.9\times$ mammal cortex density at $10\text{ g}$ & $3.0 : 1.0$ (Tight cerebellar integration for flight) \\

Late-Derived Core Land Birds: Parrots (Psittaciformes) & $M_{\text{br}} = 0.123 M_{\text{bo}}^{0.716}$ ($r^2 = 0.954$) & Power exponent $> 1.0$: $10\times$ neuron gain yields $14.0\times$ brain mass gain & $b = 1.223 \pm 0.053$ ($D_{N_{\text{cb}}} \propto N_{\text{cb}}^{-0.25}$) & $b = 1.185 \pm 0.150$ (or $1.19 \pm 0.13$; positively allometric striatal expansion) & Pallium holds up to $1.92\text{B}$ neurons ($61.2\%$ of total in macaw); co-expanded pallio-striatal loops & $3.0 : 1.0$ (Rapid pallio-striatal evolution) \\

Non-Primate Mammals (Rodentia, Artiodactyla, Carnivora, Proboscidea, etc.) & $M_{\text{br}} = 0.055 M_{\text{bo}}^{0.730}$ ($r^2 = 0.977$) & $b = 1.495 \pm 0.033$ (steep neuron size inflation as $N_{\text{pall}}$ grows) & $b = 1.223 \pm 0.024$ ($1.234 \pm 0.021$ pooled with basal birds) & Included within $N_{\text{rob}}$ in cross-amniote comparisons & Fixed $N_{\text{cb}} / N_{\text{pall}} \approx 4.0 : 1$ regardless of $N_{\text{rob}}$ ($2.2\%$ cortical in elephant) & $1.0 : 1.0$ (Equal telencephalic and cerebellar rates) \\

Anthropoid Primates (Primates) & $M_{\text{br}} = 0.061 M_{\text{bo}}^{0.823}$ ($r^2 = 0.925$) & Near-isometric cortical density preservation ($10\times$ rodent neuron count at human cortex mass) & Exception to $-0.25$ density decay; maintains elevated granule cell packing & Striatal/subpallial volume scales coordinately with prefrontal associative loops & Human: $16.3\text{B}$ cortical vs. $86.1\text{B}$ total neurons ($18.9\%$ cortical) & $1.0 : 1.0$ (Accelerated overall $\sigma^2$ across clade) \\

\end{longtable}

  

\subsection{Divergent Avian Cerebrotypes: Basal Galliformes vs. Derived Songbirds and Parrots}

  

Birds do not adhere to a single uniform cellular scaling rule; rather, basal non-core land birds (Galliformes, Columbiformes, and Palaeognathae) and late-derived core land birds (Passeriformes and Psittaciformes) exhibit starkly divergent neuronal cerebrotypes (Table \ref{tab:species42}). In an analysis of 39 individuals across 15 galliform species—including common quail (\textit{Coturnix coturnix}), California quail (\textit{Callipepla californica}), grey partridge (\textit{Perdix perdix}), red-legged partridge (\textit{Alectoris rufa}), black francolin (\textit{Francolinus francolinus}), common pheasant (\textit{Phasianus colchicus}), red junglefowl/chicken (\textit{Gallus gallus}), black grouse (\textit{Tetrao tetrix}), yellow-knobbed curassow (\textit{Crax daubentoni}), and turkey—galliform brains contain roughly half the total number of neurons of songbird or parrot brains of equivalent mass, and their telencephalic neuronal densities are up to 5-fold lower. Because the galliform telencephalon harbors less than 35\% of total brain neurons (with the subpallium comprising $13\text{--}18\%$ of telencephalic mass and $14\text{--}19\%$ of telencephalic neurons), the cerebellum dominates the neuronal pool (where non-neuronal cells account for only $20\text{--}35\%$ of all cells), closely resembling the cellular allocation of non-primate mammals.

  

In contrast, songbirds and parrots shifted the intercept of pallial neuron packing upward while reallocating the majority of brain neurons into the telencephalon. Across studied songbirds ranging from the $4.5\text{ g}$ goldcrest (\textit{Regulus regulus}, brain mass $0.357 \pm 0.022\text{ g}$, $163.87 \pm 8.67\text{ million}$ total neurons; minimum songbird neurons $135.98 \pm 6.82\text{ million}$ in the $0.494\text{ g}$ zebra finch brain) to the $1,070.7\text{ g}$ common raven (\textit{Corvus corax}, brain mass $14.135 \pm 0.558\text{ g}$, $2,170.68 \pm 72.67\text{ million}$ total neurons), body mass varies 237.9-fold, brain mass varies 39.6-fold, total neurons vary 16.0-fold, and non-neuronal cells vary 28.1-fold. Across parrots ranging from the $23.2\text{ g}$ green-rumped parrotlet (\textit{Forpus passerinus}, brain mass $1.146 \pm 0.042\text{ g}$, $227.20 \pm 3.81\text{ million}$ neurons) to the $1,008.0\text{ g}$ blue-and-yellow macaw (\textit{Ara ararauna}, brain mass $20.731\text{ g}$, $3,135.79\text{ million}$ neurons), body mass varies 43.3-fold, brain mass varies 18.1-fold, total neurons vary 13.8-fold, and non-neuronal cells vary 13.3-fold.

  

Even between songbirds and parrots, internal telencephalic scaling diverges along distinct evolutionary trajectories. In subpallial-to-pallial neuron scaling ($N_{\text{subpall}} \propto N_{\text{pall}}^b$), galliforms scale nearly isometrically ($N_{\text{subpall}} = 0.239 \times N_{\text{pall}}^{0.989 \pm 0.101}$, maintaining $\sim 4.2$ pallial neurons per subpallial neuron, with no correlation between subpallial mass fraction and telencephalon size, $\rho = 0.143, p = 0.612$, or between subpallial neuronal fraction and telencephalon size, $\rho = 0.04, p = 0.899$). Songbirds exhibit negatively allometric subpallial scaling ($b = 0.891 \pm 0.090$ or $0.91 \pm 0.10$), disproportionately concentrating new neurons in the associative pallium. Conversely, parrots exhibit positively allometric subpallial scaling ($b = 1.185 \pm 0.150$ or $1.19 \pm 0.13$), expanding striatal neuron numbers faster than pallial neurons to support elaborate pallio-striatal executive and vocal-motor loops.

  

Despite up to 5-fold differences in neuronal density across avian orders and mammals, non-neuronal (glial and endothelial) cell scaling rules remain conserved across all amniotes. In galliforms, non-neuronal cell density decreases significantly with increasing brain mass across all divisions ($p < 0.014$), with a cerebellar scaling exponent of $-0.303$ and exponents between $-0.124$ and $-0.150$ in other structures. PGLS comparisons of non-neuronal cell density confirm no significant differences between galliforms and songbirds ($p = 0.76$), galliforms and parrots ($p = 0.76, \lambda = 0.94$), or galliforms and mammals ($F_{4,44} = 0.677, p = 0.611, \lambda = 0.94$). Across all avian orders, non-neuronal density is distinctly lower in the telencephalon than in other brain divisions (galliforms: $-0.283 \pm 0.037, t_{3,27} = 7.695, p < 0.001$; songbirds: $-0.132 \pm 0.031, t_{3,19} = 4.303, p < 0.001$; parrots: $-0.296 \pm 0.013, t_{3,23} = 23.486, p < 0.001$). Consequently, while non-neuronal cells represent $48\text{--}58\%$ of whole-brain cells in galliforms (maximal glia-to-neuron ratio $G/N = 0.92\text{ to }1.38$; $48\text{--}71\%$ in telencephalon, $84\text{--}92\%$ in diencephalon, $54\text{--}77\%$ in tectum, and $86\text{--}95\%$ in brainstem), neurons predominate in songbirds and parrots ($N_{\text{non}}/N_{\text{tot}} \approx 0.27\text{ to }0.68$ whole-brain).

  

\begin{longtable}{p{0.20\textwidth}p{0.14\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.08\textwidth}p{0.06\textwidth}p{0.06\textwidth}}

\caption{Verified cellular composition, brain mass, and pallial/cortical neuronal allocations across 42 representative avian and mammalian species.} \label{tab:species42} \\

\toprule

\textbf{Species (Scientific Name)} & \textbf{Taxonomic Group} & \textbf{Body Mass (g)} & \textbf{Brain Mass (g)} & \textbf{Brain Neurons ($\times 10^6$)} & \textbf{Non-Neurons ($\times 10^6$)} & \textbf{Pallial Neurons ($\times 10^6$)} & \textbf{Pallial Share (\%)} & \textbf{$N_{\text{non}} / N_{\text{tot}}$} \\

\midrule

\endfirsthead

\toprule

\textbf{Species (Scientific Name)} & \textbf{Taxonomic Group} & \textbf{Body Mass (g)} & \textbf{Brain Mass (g)} & \textbf{Brain Neurons ($\times 10^6$)} & \textbf{Non-Neurons ($\times 10^6$)} & \textbf{Pallial Neurons ($\times 10^6$)} & \textbf{Pallial Share (\%)} & \textbf{$N_{\text{non}} / N_{\text{tot}}$} \\

\midrule

\endhead

\bottomrule

\endfoot

Goldcrest (\textit{Regulus regulus}) & Songbird (Passeriformes) & $4.5 \pm 0.1$ & $0.357 \pm 0.022$ & $163.87 \pm 8.67$ & $44.16 \pm 6.57$ & $\sim 64.0$ & $39.1\%$ & $0.269$ \\

Zebra finch (\textit{Taeniopygia guttata}) & Songbird (Passeriformes) & $17.4 \pm 2.1$ & $0.494 \pm 0.040$ & $135.98 \pm 6.82$ & $59.75 \pm 2.03$ & --- & --- & $0.439$ \\

Blackcap (\textit{Sylvia atricapilla}) & Songbird (Passeriformes) & $16.6 \pm 1.3$ & $0.774 \pm 0.037$ & $156.73 \pm 18.91$ & $86.28 \pm 9.18$ & --- & --- & $0.551$ \\

Great tit (\textit{Parus major}) & Songbird (Passeriformes) & $17.1 \pm 0.3$ & $0.940 \pm 0.066$ & $225.98 \pm 46.97$ & $115.43 \pm 23.43$ & --- & --- & $0.511$ \\

European starling (\textit{Sturnus vulgaris}) & Songbird (Passeriformes) & $73.1 \pm 1.9$ & $1.855 \pm 0.047$ & $482.50 \pm 88.29$ & $215.64 \pm 13.49$ & --- & --- & $0.447$ \\

Common blackbird (\textit{Turdus merula}) & Songbird (Passeriformes) & $85.0 \pm 7.5$ & $1.887 \pm 0.117$ & $379.41 \pm 43.33$ & $222.57 \pm 27.48$ & --- & --- & $0.587$ \\

Azure-winged magpie (\textit{Cyanopica cyanus}) & Corvid (Passeriformes) & $84.1 \pm 16.0$ & $3.393 \pm 0.486$ & $740.59 \pm 0.35$ & $349.49 \pm 33.17$ & --- & --- & $0.472$ \\

Hill mynah (\textit{Gracula religiosa}) & Songbird (Passeriformes) & $262.1 \pm 30.7$ & $3.670 \pm 0.362$ & $906.13 \pm 45.38$ & $380.79 \pm 3.56$ & --- & --- & $0.420$ \\

Eurasian jay (\textit{Garrulus glandarius}) & Corvid (Passeriformes) & $160.0 \pm 12.5$ & $4.597 \pm 0.307$ & $1,085.42 \pm 159.56$ & $484.42 \pm 32.87$ & --- & --- & $0.446$ \\

Eurasian magpie (\textit{Pica pica}) & Corvid (Passeriformes) & $178.6 \pm 11.5$ & $5.425 \pm 0.617$ & $897.27 \pm 57.43$ & $535.97 \pm 15.96$ & --- & --- & $0.597$ \\

Western jackdaw (\textit{Coloeus monedula}) & Corvid (Passeriformes) & $209.7 \pm 25.1$ & $6.023 \pm 0.305$ & $967.99 \pm 106.66$ & $565.92 \pm 37.87$ & --- & --- & $0.585$ \\

Rook (\textit{Corvus frugilegus}) & Corvid (Passeriformes) & $429.3 \pm 35.6$ & $8.357 \pm 0.312$ & $1,508.72 \pm 38.25$ & $855.55 \pm 92.10$ & $821.0$ & $54.4\%$ & $0.567$ \\

Common raven (\textit{Corvus corax}) & Corvid (Passeriformes) & $1,070.7 \pm 73.2$ & $14.135 \pm 0.558$ & $2,170.68 \pm 72.67$ & $1,242.85 \pm 98.19$ & $1,204.0$ & $55.5\%$ & $0.573$ \\

Green-rumped parrotlet (\textit{Forpus passerinus}) & Parrot (Psittaciformes) & $23.2 \pm 0.7$ & $1.146 \pm 0.042$ & $227.20 \pm 3.81$ & $135.00 \pm 4.70$ & --- & --- & $0.594$ \\

Budgerigar (\textit{Melopsittacus undulatus}) & Parrot (Psittaciformes) & $35.3 \pm 4.6$ & $1.317 \pm 0.041$ & $321.82 \pm 10.62$ & $176.05 \pm 4.26$ & --- & --- & $0.547$ \\

Cockatiel (\textit{Nymphicus hollandicus}) & Parrot (Psittaciformes) & $101.0 \pm 4.6$ & $2.205 \pm 0.132$ & $452.77 \pm 44.51$ & $234.66 \pm 10.25$ & --- & --- & $0.518$ \\

Eastern rosella (\textit{Platycercus eximius}) & Parrot (Psittaciformes) & $102.0 \pm 3.4$ & $2.716 \pm 0.032$ & $641.88 \pm 79.00$ & $318.17 \pm 47.28$ & --- & --- & $0.496$ \\

Monk parakeet (\textit{Myiopsitta monachus}) & Parrot (Psittaciformes) & $94.0 \pm 1.7$ & $3.420 \pm 0.168$ & $696.77 \pm 75.26$ & $393.49 \pm 21.06$ & --- & --- & $0.565$ \\

Alexandrine parakeet (\textit{Psittacula eupatria}) & Parrot (Psittaciformes) & $223.0 \pm 5.3$ & $5.699 \pm 0.492$ & $1,096.26 \pm 89.81$ & $572.74 \pm 28.11$ & --- & --- & $0.522$ \\

Goffin's cockatoo (\textit{Cacatua goffiniana}) & Parrot (Psittaciformes) & $244.8 \pm 3.5$ & $8.275 \pm 0.548$ & $1,160.59 \pm 101.87$ & $792.22 \pm 39.88$ & --- & --- & $0.683$ \\

Grey parrot (\textit{Psittacus erithacus}) & Parrot (Psittaciformes) & $453.5 \pm 47.4$ & $8.827 \pm 0.859$ & $1,565.93 \pm 128.99$ & $880.59 \pm 2.06$ & $850.0$ & $54.3\%$ & $0.562$ \\

Sulphur-crested cockatoo (\textit{Cacatua galerita}) & Parrot (Psittaciformes) & $430.0$ & $10.131$ & $2,121.93$ & $1,001.81$ & $1,136.0$ & $53.5\%$ & $0.472$ \\

Kea (\textit{Nestor notabilis}) & Parrot (Psittaciformes) & $708.0$ & $13.593$ & $2,148.67$ & $975.57$ & $1,282.0$ & $59.7\%$ & $0.454$ \\

Blue-and-yellow macaw (\textit{Ara ararauna}) & Parrot (Psittaciformes) & $1,008.0$ & $20.731$ & $3,135.79$ & $1,800.03$ & $1,918.0$ & $61.2\%$ & $0.574$ \\

Rock pigeon (\textit{Columba livia}) & Basal Bird (Columbiformes) & $322.5 \pm 22.7$ & $2.095 \pm 0.123$ & $309.96 \pm 33.33$ & $262.18 \pm 18.94$ & --- & --- & $0.846$ \\

Red junglefowl (\textit{Gallus gallus}) & Basal Bird (Galliformes) & $861.3 \pm 107.3$ & $2.819 \pm 0.200$ & $220.84 \pm 44.50$ & $286.68 \pm 17.35$ & $<77.3$ & $<35.0\%$ & $1.298$ \\

Barn owl (\textit{Tyto alba}) & Owl (Strigiformes) & $369.7 \pm 37.7$ & $5.618 \pm 0.404$ & $689.54 \pm 39.64$ & $522.49 \pm 25.29$ & --- & --- & $0.758$ \\

Long-eared owl (\textit{Asio otus}) & Owl (Strigiformes) & --- & $5.4$ & $991.0$ & --- & $673.0$ & $67.9\%$ & --- \\

Tawny owl (\textit{Strix aluco}) & Owl (Strigiformes) & --- & $8.9$ & $1,581.0$ & --- & $1,153.0$ & $72.9\%$ & --- \\

Eurasian eagle-owl (\textit{Bubo bubo}) & Owl (Strigiformes) & --- & $15.8$ & $1,898.0$ & --- & $1,328.0$ & $70.0\%$ & --- \\

Snowy owl (\textit{Bubo scandiacus}) & Owl (Strigiformes) & --- & $17.8$ & $1,808.0$ & --- & $1,270.0$ & $70.2\%$ & --- \\

Emu (\textit{Dromaius novaehollandiae}) & Basal Bird (Palaeognathae) & $32,600 \pm 1,414$ & $21.811 \pm 2.037$ & $1,335.40 \pm 29.01$ & $1,528.66 \pm 118.97$ & --- & --- & $1.145$ \\

Long-tailed macaque (\textit{Macaca fascicularis}) & Anthropoid Primate & --- & $46.2$ & $3,440.0$ & --- & $801.0$ & $23.3\%$ & --- \\

Capuchin monkey (\textit{Sapajus apella}) & Anthropoid Primate & --- & $52.2$ & $3,691.0$ & --- & $1,100.0$ & $29.8\%$ & --- \\

Bonnet macaque (\textit{Macaca radiata}) & Anthropoid Primate & --- & $61.5$ & $3,780.0$ & --- & $1,660.0$ & $43.9\%$ & --- \\

Yellow baboon (\textit{Papio cynocephalus}) & Anthropoid Primate & --- & $151.2$ & $10,950.0$ & --- & $2,880.0$ & $26.3\%$ & --- \\

Chimpanzee (\textit{Pan troglodytes}) & Anthropoid Primate & --- & $344.0$ & --- & --- & $7,400.0$ & --- & --- \\

Human (\textit{Homo sapiens}) & Anthropoid Primate & --- & $1,508.0$ & $86,100.0$ & --- & $16,300.0$ & $18.9\%$ & --- \\

Greater kudu (\textit{Tragelaphus strepsiceros}) & Non-Primate Mammal & --- & $308.5$ & $6,090.0$ & --- & $793.0$ & $13.0\%$ & --- \\

Giraffe (\textit{Giraffa camelopardalis}) & Non-Primate Mammal & --- & $528.0$ & $11,210.0$ & --- & $1,670.0$ & $14.9\%$ & --- \\

Long-finned pilot whale (\textit{Globicephala melas}) & Non-Primate Mammal & --- & $3,608.2$ & --- & --- & $37,200.0$ & --- & --- \\

African bush elephant (\textit{Loxodonta africana}) & Non-Primate Mammal & --- & $4,618.6$ & $257,040.0$ & --- & $5,590.0$ & $2.2\%$ & --- \\

\end{longtable}

  

\section{Neuropil Ultrastructure, Synaptic Invariance, and Connectomic Packing Constraints}

  

To understand why mammalian brains are metabolically constrained to a fixed neuronal energy budget and steep allometric density decline while avian brains achieve high-density packing, it is necessary to examine the ultrastructural organization of the synaptic neuropil across both clades.

  

\subsection{Ultrastructural Invariance and Synaptic-Mitochondrial Coupling in the Mammalian Neocortex}

  

High-resolution two-dimensional transmission electron microscopy (TEM) across 18 mammalian species in the primary visual cortex (area V1)—sampling ultrathin $80\text{--}120\text{ nm}$ physical sections with a $20\text{ nm}$ z-axis optical focal imaging thickness across $98,030\ \mu\text{m}^2$ of cortical tissue at $3,500\times$ magnification (mean $22.55\%$ of image area) for neuronal counts ($1,584$ neurons) and $14,157\ \mu\text{m}^2$ at $65,000\times$ magnification (mean $5.47\%$ of image area) for neuropil organelle quantification ($9,459$ synapses and $18,988$ mitochondria)—reveals a foundational architectural law (Table \ref{tab:v1_18species}). A vital methodological clarification is required when interpreting these metrics: although Table 1 of the original publication labels the density columns as $\text{mm}^3$, the methodological text explicitly specifies that the study evaluated 2D areal densities (total counted objects divided by the sum of the 2D areas of the counting frames sampled, i.e., $\text{objects/mm}^2$ within a $20\text{ nm}$ z-axis focal plane) rather than 3D stereological volumetric estimates.

  

Across a 12,087.5-fold range in brain mass, from the $0.4\text{ g}$ brain of the house mouse (\textit{Mus musculus}) to the $4,835.0\text{ g}$ brain of the African bush elephant (\textit{Loxodonta africana}), areal neuron density in V1 drops 17.2-fold, from $53,681\text{ neurons/mm}^2$ to $3,119\text{ neurons/mm}^2$. Yet, across this entire mammalian radiation, the three core neuropil parameters vary within only a $1.5\text{- to }1.7\text{-fold}$ corridor:

\begin{itemize}

\item \textbf{Synapse Density:} Averages $706,865.56 \pm 106,263.12\text{ mm}^{-2}$, confined between $571,193\text{ mm}^{-2}$ (\textit{Lemur catta}) and $870,361\text{ mm}^{-2}$ (\textit{Mus musculus}), a $1.52\times$ ratio.

\item \textbf{Mitochondria Density:} Averages $1,311,586.67 \pm 200,730.98\text{ mm}^{-2}$, ranging within a narrow band from $992,671\text{ mm}^{-2}$ in the giant anteater (\textit{Myrmecophaga tridactyla}) to $1,678,743\text{ mm}^{-2}$ in the olive baboon (\textit{Papio anubis}), a $1.69\times$ ratio.

\item \textbf{Postsynaptic Density (PSD) Length:} Reflects the areal extent of the postsynaptic receptor scaffold and averages $338.17 \pm 33.89\text{ nm}$, bounded between $262\text{ nm}$ (\textit{Mus musculus}) and $403\text{ nm}$ (\textit{Ursus arctos}), a $1.54\times$ ratio.

\end{itemize}

  

Unpaired two-tailed Welch's $t$-tests between primates ($n = 5$: \textit{Homo sapiens}, \textit{Pan troglodytes}, \textit{Papio anubis}, \textit{Saimiri sciureus}, \textit{Lemur catta}) and non-primate mammals ($n = 13$) confirm no significant differences at the $\alpha = 0.05$ threshold in synapse density ($t_{7.31} = -1.80, P = 0.1138$), PSD length ($t_{12.23} = -1.50, P = 0.1581$), or mitochondria density ($t_{7.77} = 2.07, P = 0.0737$). However, primates exhibit a marginal trend approaching statistical significance toward a higher number of mitochondria per synapse ($M/S = 2.32 \pm 0.47$ vs. $1.75 \pm 0.36$, $t_{5.91} = 2.44, P = 0.0514$), driven by elevated mitochondrial-to-synaptic ratios in species such as the olive baboon ($M/S = 2.90$), ring-tailed lemur ($2.73$), and squirrel monkey ($2.18$).

  

\begin{longtable}{p{0.21\textwidth}p{0.11\textwidth}p{0.08\textwidth}p{0.09\textwidth}p{0.11\textwidth}p{0.10\textwidth}p{0.06\textwidth}p{0.06\textwidth}p{0.06\textwidth}p{0.05\textwidth}}

\caption{Complete verified 18-species mammalian primary visual cortex (V1) ultrastructural dataset, organelle ratios ($S/N$, $M/N$, $M/S$), and subgroup means. Densities represent 2D areal counts ($\text{mm}^{-2}$) within $20\text{ nm}$ z-axis optical sections.} \label{tab:v1_18species} \\

\toprule

\textbf{Species (Common Name)} & \textbf{Clade} & \textbf{Brain Mass (g)} & \textbf{Neuron Density ($\text{mm}^{-2}$)} & \textbf{Mitochondria Density ($\text{mm}^{-2}$)} & \textbf{Synapse Density ($\text{mm}^{-2}$)} & \textbf{PSD (nm)} & \textbf{$S/N$ Ratio} & \textbf{$M/N$ Ratio} & \textbf{$M/S$ Ratio} \\

\midrule

\endfirsthead

\toprule

\textbf{Species (Common Name)} & \textbf{Clade} & \textbf{Brain Mass (g)} & \textbf{Neuron Density ($\text{mm}^{-2}$)} & \textbf{Mitochondria Density ($\text{mm}^{-2}$)} & \textbf{Synapse Density ($\text{mm}^{-2}$)} & \textbf{PSD (nm)} & \textbf{$S/N$ Ratio} & \textbf{$M/N$ Ratio} & \textbf{$M/S$ Ratio} \\

\midrule

\endhead

\bottomrule

\endfoot

\textit{Mus musculus} (Mouse) & Rodentia & $0.4$ & $53,681$ & $1,287,821$ & $870,361$ & $262$ & $16.21$ & $23.99$ & $1.48$ \\

\textit{Bettongia penicillata} (Bettong) & Diprotodontia & $9.6$ & $40,447$ & $1,214,281$ & $632,260$ & $388$ & $15.63$ & $30.02$ & $1.92$ \\

\textit{Procavia capensis} (Rock hyrax) & Hyracoidea & $18.1$ & $28,971$ & $1,071,012$ & $709,600$ & $331$ & $24.49$ & $36.97$ & $1.51$ \\

\textit{Lemur catta} (Ring-tailed lemur) & Primates & $22.3$ & $29,398$ & $1,560,863$ & $571,193$ & $317$ & $19.43$ & $53.09$ & $2.73$ \\

\textit{Saimiri sciureus} (Squirrel monkey) & Primates & $24.9$ & $14,911$ & $1,245,053$ & $571,222$ & $307$ & $38.31$ & $83.50$ & $2.18$ \\

\textit{Macropus rufogriseus} (Wallaby) & Diprotodontia & $28.2$ & $23,211$ & $1,347,839$ & $655,101$ & $322$ & $28.22$ & $58.07$ & $2.06$ \\

\textit{Choloepus didactylus} (Two-toed sloth) & Pilosa & $36.0$ & $17,425$ & $1,628,644$ & $828,190$ & $350$ & $47.53$ & $93.47$ & $1.97$ \\

\textit{Dinomys branickii} (Pacarana) & Rodentia & $36.3$ & $13,537$ & $1,276,463$ & $857,317$ & $359$ & $63.33$ & $94.29$ & $1.49$ \\

\textit{Neofelis nebulosa} (Clouded leopard) & Carnivora & $68.3$ & $13,736$ & $1,511,730$ & $585,267$ & $332$ & $42.61$ & $110.06$ & $2.58$ \\

\textit{Myrmecophaga tridactyla} (Anteater) & Pilosa & $76.0$ & $11,234$ & $992,671$ & $827,203$ & $378$ & $73.63$ & $88.36$ & $1.20$ \\

\textit{Papio anubis} (Olive baboon) & Primates & $174.3$ & $10,495$ & $1,678,743$ & $578,396$ & $299$ & $55.11$ & $159.96$ & $2.90$ \\

\textit{Rangifer tarandus} (Reindeer) & Artiodactyla & $252.9$ & $6,635$ & $1,107,001$ & $800,545$ & $333$ & $120.65$ & $166.84$ & $1.38$ \\

\textit{Trichechus manatus} (Manatee) & Sirenia & $350.0$ & $6,258$ & $1,229,503$ & $770,590$ & $361$ & $123.14$ & $196.47$ & $1.60$ \\

\textit{Ursus arctos} (Kodiak bear) & Carnivora & $385.0$ & $9,268$ & $1,100,947$ & $598,439$ & $403$ & $64.57$ & $118.79$ & $1.84$ \\

\textit{Pan troglodytes} (Chimpanzee) & Primates & $407.5$ & $11,030$ & $1,459,302$ & $800,016$ & $339$ & $72.53$ & $132.30$ & $1.82$ \\

\textit{Giraffa camelopardalis} (Giraffe) & Artiodactyla & $675.0$ & $10,350$ & $1,123,306$ & $662,832$ & $344$ & $64.04$ & $108.53$ & $1.69$ \\

\textit{Homo sapiens} (Human) & Primates & $1,336.0$ & $7,258$ & $1,318,314$ & $672,542$ & $352$ & $92.66$ & $181.64$ & $1.96$ \\

\textit{Loxodonta africana} (Elephant) & Proboscidea & $4,835.0$ & $3,119$ & $1,455,067$ & $732,506$ & $310$ & $234.85$ & $466.52$ & $1.99$ \\

\midrule

\textbf{All Mammals ($n = 18$)} & Mean $\pm$ SD & $485.6 \pm 1,134.9$ & $17,275.8 \pm 13,245.0$ & $1,311,586.7 \pm 200,731.0$ & $706,865.6 \pm 106,263.1$ & $338.2 \pm 33.9$ & $66.50 \pm 52.97$ & $122.38 \pm 100.00$ & $1.91 \pm 0.47$ \\

\textbf{Primates ($n = 5$)} & Mean $\pm$ SD & $393.0 \pm 549.5$ & $14,618.4 \pm 8,672.5$ & $1,452,455.0 \pm 176,474.5$ & $638,673.8 \pm 99,795.4$ & $322.8 \pm 22.0$ & $55.61 \pm 28.43$ & $122.10 \pm 53.20$ & $2.32 \pm 0.47$ \\

\textbf{Non-Primates ($n = 13$)} & Mean $\pm$ SD & $521.2 \pm 1,311.5$ & $18,297.8 \pm 14,837.3$ & $1,257,406.5 \pm 191,173.4$ & $733,093.2 \pm 100,450.2$ & $344.1 \pm 36.5$ & $70.69 \pm 60.31$ & $122.49 \pm 114.95$ & $1.75 \pm 0.36$ \\

\end{longtable}

  

The second- and third-order implications of this ultrastructural invariance are foundational to comparative neuroenergetics. Because the volumetric and areal density of synapses ($S$) and mitochondria ($M$) in the cortical neuropil is fixed by universal biophysical packing and oxygen-diffusion limits while neuron density scales negatively with brain mass ($\log_{10} D_N = 4.726 - 0.306 \log_{10} M_{\text{br}}$, $\text{SE} = 0.032, r^2 = 0.852, p = 4.94 \times 10^{-8}$; natural log intercept $= 10.882$), both synapses per neuron ($S/N$) and mitochondria per neuron ($M/N$) scale positively with brain mass with parallel allometric slopes:

\begin{equation}

\ln(S/N) = 2.609 + 0.299 \ln(M_{\text{br}}) \quad \left(\log_{10}\text{ intercept} = 1.133, \text{SE}_b = 0.042, r^2 = 0.756, F_{1,16} = 49.4, p = 2.85 \times 10^{-6}\right)

\end{equation}

\begin{equation}

\ln(M/N) = 3.186 + 0.308 \ln(M_{\text{br}}) \quad \left(\log_{10}\text{ intercept} = 1.384, \text{SE}_b = 0.035, r^2 = 0.829, F_{1,16} = 77.6, p = 1.55 \times 10^{-7}\right)

\end{equation}

Analysis of covariance (ANCOVA) confirms that the allometric scaling slopes for $S/N$ ($b = 0.299$) and $M/N$ ($b = 0.308$) do not differ significantly ($F = 0.028, p = 0.867$), whereas the intercept for $M/N$ is significantly elevated above $S/N$ ($F = 121.455, p = 1.996 \times 10^{-12}$), yielding an overall mammalian average of $1.91 \pm 0.47$ ($\sim 1.9$) mitochondria for every synapse in area V1. In a mouse V1 ($53,681\text{ neurons/mm}^2$), each neuron supports an areal ratio of $16.21$ synapses and $23.99$ mitochondria; in the human V1 ($7,258\text{ neurons/mm}^2$), each neuron supports $92.66$ synapses and $181.64$ mitochondria; and in the elephant V1 ($3,119\text{ neurons/mm}^2$), each neuron must metabolically sustain $234.85$ synapses and $466.52$ mitochondria.

  

This tight stoichiometric coupling ($\sim 1.91$ mitochondria per synapse) dictates that total mitochondrial capacity per unit volume of mammalian grey matter cannot be arbitrarily upregulated to support higher firing rates or denser synaptic arrays. Instead, synaptic transmission and action potential propagation must operate within the strict ATP supply ceiling of those $\sim 1.9$ local mitochondria per synapse. At the inner mitochondrial membrane level, achieving maximal ATP yield per molecule of glucose requires stringent suppression of proton and ion leak across the $\text{F}_1\text{F}_{\text{O}}$-ATP synthase complex. Within the mitochondrial membrane, the c-subunit ring (c-ring) of ATP synthase forms a voltage-sensitive leak channel structurally analogous to the mitochondrial permeability transition pore (mPTP). This c-ring pore is gated by polar amino acid residues situated at the mouth of the channel and physically capped by the hydrophilic $\text{F}_1$ catalytic domain. Anti-apoptotic regulatory proteins such as $\text{Bcl-x}_{\text{L}}$ bind directly within the c-subunit of ATP synthase to close this leak conductance, ensuring high stoichiometric efficiency of oxidative phosphorylation and enabling proper synaptic and nervous system development.

  

\subsection{Avian Ultrastructural Connectomics: Inhibitory Dominance in HVC and Soma-Clustered Neuropil in Area X}

  

High-resolution 3D electron microscopy datasets in the zebra finch (\textit{Taeniopygia guttata}) song system—specifically within the pallial premotor nucleus HVC and the striatal basal ganglia nucleus Area X—alongside stereological EM studies in the domestic chick (\textit{Gallus gallus domesticus}) forebrain (intermediate and medial mesopallium/hyperstriatum ventrale [IMHV/IMM] and lobus parolfactorius [LPO/medial striatum]) reveal three major cytoarchitectural departures from the mammalian cortical blueprint.

  

First, in the zebra finch HVC (which occupies roughly $2,000 \times 500 \times 500\ \mu\text{m}^3$ and contains $40,000 \pm 3,800$ $\text{HVC}_{(\text{RA})}$ projection neurons), light-microscopic and serial block-face electron microscopy (SBEM) reconstructions ($166 \times 166 \times 77\ \mu\text{m}^3$ volume at $11 \times 11 \times 29\text{ nm}^3$ voxel resolution) show that $\text{HVC}_{(\text{RA})}$ dendrites are exceptionally compact: total dendritic path length averages just $3.2\text{ mm}$ per neuron, with $95.0 \pm 2.0\%$ (SEM) of the dendritic tree confined within $100\ \mu\text{m}$ of the soma and $100\%$ confined within HVC borders. Conversely, $\text{HVC}_{(\text{RA})}$ local axon collaterals ($\sim 0.015\text{ m}$ per neuron; combined path length $585.6\text{ m}$ across all $40,000$ $\text{HVC}_{(\text{RA})}$ cells) ramify broadly across HVC, with $56 \pm 14\%$ (SD) of axonal path length located $>200\ \mu\text{m}$ from the parent soma. Along $\text{HVC}_{(\text{RA})}$ dendrites, linear synapse density is $0.25 \pm 0.02\ \mu\text{m}^{-1}$ (SEM) for asymmetric (excitatory) synapses and $0.36 \pm 0.02\ \mu\text{m}^{-1}$ (SEM) for symmetric (inhibitory) synapses. Multiplying by the $3.2\text{ mm}$ dendritic path length yields an expected $1,144 \pm 429$ (SD, $59\%$) symmetric inhibitory synapses and only $786 \pm 311$ (SD, $41\%$) asymmetric excitatory synapses per $\text{HVC}_{(\text{RA})}$ neuron (in a fully reconstructed cell of $1,003$ incoming synapses, $607$ [$60.5\%$] were symmetric and $396$ [$39.5\%$] were asymmetric, with inhibitory inputs enriched to $68 \pm 4\%$ near the soma). This $59\%$ inhibitory dominance contrasts sharply with mammalian neocortical neurons and reflects the architecture of a coupled winner-take-all sequence-generating network in which local $\text{HVC}_{(\text{RA})}$-to-interneuron connections occur with $>0.50$ probability while distal axons ($>200\ \mu\text{m}$) preferentially target other $\text{HVC}_{(\text{RA})}$ and $\text{HVC}_{(\text{X})}$ excitatory neurons ($p < 0.002$).

  

Second, serial section SEM (ssSEM) disector ($70\text{ nm}$ disector distance; $140\text{ nm}$ reference-to-lookup separation) and FIB-SEM analyses in zebra finch HVC demonstrate that both asymmetric and symmetric synapses have an average Feret (minimum-bounding sphere) diameter of $\sim 200\text{ nm}$ (with symmetric synaptic clefts measuring $20\text{--}40\text{ nm}$) and follow a log-normal size distribution ($p < 0.002$, Kolmogorov–Smirnov test across $n = 12$ birds, $202\text{--}406$ segmented synapses per bird). Crucially, the physical volume of resin-embedded ultrathin sections is $16.1 \pm 0.7\%$ smaller than wet brain tissue. During vocal learning (evaluated at 59 days post-hatch [dph]), 1 day of song tutoring (SHORT vs. untutored ISO) reduces HVC excitatory synapse density by $26 \pm 5\%$ ($p = 3 \times 10^{-9}$, LME model, $\text{df} = 1,152$) while increasing inhibitory synapse density by $20 \pm 10\%$ ($p = 0.05$), shifting the inhibitory synapse fraction from $19\text{--}20\%$ in untutored birds up to $27\%$ ($p = 1.7 \times 10^{-6}$). Long-term tutoring (24 days, LONG vs. ISO) prunes excitatory synapse density by $37 \pm 1\%$ ($p = 4.5 \times 10^{-18}$) and inhibitory synapse density by $30 \pm 2\%$ ($p = 0.003$), returning the inhibitory fraction to $21\%$ ($p = 0.48$). By contrast, in precocial domestic chicks, developmental maturation ($1\text{ to }9\text{ dph}$) and passive avoidance training drive left-hemisphere-dominant synaptogenesis in the LPO and IMHV, characterized by a $62\%$ greater developmental synapse density increase in the left vs. right LPO, a 1.3-fold left-hemisphere excess of asymmetric synapses at $9\text{ dph}$ ($t = 3.16, \text{df} = 4, p < 0.05$), and an $\sim 30\%$ training-induced increase in left LPO volumetric synaptic density ($N_{v,\text{syn}}$) at $24\text{ h}$ post-training.

  

Third, in the zebra finch Area X connectome, $71.9\%$ of all mature neurons are arranged in direct soma-soma clusters ($1,574$ clusters of $2\text{ to }33$ neurons, mean $4 \pm 3$ neurons; $93.9\%$ medium spiny neurons [$5,786\text{ of }8,576$ cells]), with intersomal distances significantly smaller than expected by chance ($p < 0.00001$). Furthermore, adult-born migratory neuroblasts (MIGR), which possess significantly lower mitochondrial density than mature neurons (one-way ANOVA, $p = 0$), rarely follow traditional migratory scaffolds (only $8\text{ of }35$ [$22.9\%$] contact radial fibers or blood vessels, and $4\text{ of }35$ [$11.4\%$] contact astrocytes). Instead, $48.6\%$ ($17\text{ of }35$) migrate directly through synapse-dense neuropil (KS test vs. random points, $p = 0.35$; mean distance to mature somata $7.91 \pm 2.55\ \mu\text{m}$ vs. $9.14 \pm 4.00\ \mu\text{m}$ for random points, $p = 0.13$) by physically indenting mature neuronal somata to depths of $2.15\text{ to }4.91\ \mu\text{m}$ (paired $t$-test, $p < 0.004$).

  

\section{Comparative Neuroenergetics, Per-Neuron Glucose Budgets, and Oculomotor-Retinal Metabolic Coupling}

  

In mammals, because $S/N$ and $M/N$ scale inversely with neuron density while per-volume synaptic and mitochondrial densities remain invariant, whole-brain cerebral metabolic rate of glucose consumption ($\text{CMR}_{\text{glc}}$) scales linearly with neuron density per milligram ($X$) according to the cross-species regression:

\begin{equation}

y = 5.76 \times 10^{-6} X + 5.62 \times 10^{-9} \quad \left(R^2 = 0.949, p = 0.005\right)

\end{equation}

yielding a fixed mammalian whole-brain energy budget of $5.79 \times 10^{-9} \pm 0.76 \times 10^{-9}\ \mu\text{mol}$ glucose per neuron per minute across rodents, carnivores, and primates. This raises a fundamental physiological question: how do birds metabolically sustain forebrain neuron counts that exceed those of identically sized mammals by more than twofold to threefold without suffering catastrophic energetic exhaustion?

  

\subsection{Quantitative Verification of the Awake Avian Neuronal Glucose Budget ($[^{18}\text{F}]\text{FDG}$ PET and Two-Tissue Compartment Modeling)}

  

Direct in vivo quantification of the avian neuronal energy budget was achieved by combining positron emission tomography (PET) using $[^{18}\text{F}]\text{-fluorodeoxyglucose}$ ($[^{18}\text{F}]\text{FDG}$, reconstructed voxel size $0.38 \times 0.38 \times 0.80\text{ mm}$; dynamic framing $6 \times 30\text{ s}$, $3 \times 60\text{ s}$, $3 \times 120\text{ s}$, $12 \times 240\text{ s}$ over $60\text{ min}$) with arterial input functions (AIF; automatic arterial sampling at $1\text{ mL/min}$ for $2\text{ min}$, followed by manual sampling at $2, 5, 10, 20, 30, 45,$ and $60\text{ min}$) and image-derived input functions (IDIF, which show $14\%$ and $17\%$ test-retest intravariability, respectively) in 4 awake and 6 isoflurane-anesthetized rock pigeons (\textit{Columba livia}, injected dose $65.39 \pm 4.70\text{ MBq}$, range $53.9\text{--}70.4\text{ MBq}$; $t(8) = 0.255, p = 0.805$). (Note on unit typography: while one automated text extraction of the paper rendered the Greek symbol $\mu$ as ``m'' [``mmol''], the published \textit{Current Biology} abstract, figures, and cross-citations confirm the exact units are $\mu\text{mol}$ [micromoles].)

  

The two-tissue compartment kinetic model incorporates transport ($L_1 = K_{1,\text{FDG}}/K_{1,\text{glc}} = 1.48$; $L_2 = k_{2,\text{FDG}}/k_{2,\text{glc}} = 1.48$) and hexokinase phosphorylation ($L_3 = k_{3,\text{FDG}}/k_{3,\text{glc}} = 0.37$) ratios with a fractional cerebral blood volume $v_B = 5\%$ (tested across $3\text{--}6\%$ with negligible parameter sensitivity), establishing a pigeon Lumped Constant ($\text{LC}$) of $0.69 \pm 0.037$ (statistically invariant between awake and isoflurane-anesthetized states, $t(7) = 1.471, p = 0.185$, and well within the mammalian range of $0.45\text{--}0.71$). Despite normoglycemic avian plasma glucose levels of $12.40 \pm 1.68\text{ mmol/L}$ (more than double typical mammalian plasma glucose, driven in birds by high expression and constitutive activity of the glucagon receptor GCGR), awake pigeon brain tissue consumes glucose at a mean cerebral metabolic rate ($\text{CMR}_{\text{glc}}$) of $27.29 \pm 1.57\ \mu\text{mol}\text{ glucose}\cdot 100\text{ g}^{-1}\cdot\text{min}^{-1}$ ($\approx 4.55 \times 10^{-4}\text{ mmol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$).

  

When integrated with isotropic fractionator neuron counts for \textit{Columba livia} ($309.96 \pm 33.33\text{ million}$ whole-brain neurons in a $2.095 \pm 0.123\text{ g}$ brain), this whole-brain metabolic flux translates into an awake per-neuron energy budget of $1.86 \times 10^{-9} \pm 0.2 \times 10^{-9}\ \mu\text{mol}\text{ glucose}\cdot\text{neuron}^{-1}\cdot\text{min}^{-1}$. Converting glucose consumption into adenosine triphosphate (ATP) turnover using the standard aerobic oxidative phosphorylation yield of $31$ ATP molecules per glucose molecule shows that an awake pigeon neuron consumes $31.00\text{ amol glucose/s}$, equivalent to $5.79 \times 10^8\text{ ATP molecules}\cdot\text{s}^{-1}\cdot\text{neuron}^{-1}$, whereas an average awake mammalian neuron consumes $96.50\text{ amol glucose/s}$, or $1.80 \times 10^9\text{ ATP molecules}\cdot\text{s}^{-1}\cdot\text{neuron}^{-1}$ (Table \ref{tab:pet_metabolism}). Thus, an awake avian neuron operates at a 3.11-fold lower metabolic cost (consuming $\sim 32.1\%$ of the glucose and ATP per second) than an average mammalian neuron. Under isoflurane anesthesia—which induces NREM sleep-like slow waves—cerebral glucose uptake drops substantially, whereas parametric awake PET maps demonstrate peak regional glucose uptake in the entopallium (primary tectofugal visual pallium), retina, and pecten oculi.

  

\begin{longtable}{p{0.28\textwidth}p{0.24\textwidth}p{0.24\textwidth}p{0.20\textwidth}}

\caption{Comparative cerebral metabolic rate of glucose ($\text{CMR}_{\text{glc}}$), tracer kinetic parameters, and per-neuron ATP budgets in avian vs. mammalian brains.} \label{tab:pet_metabolism} \\

\toprule

\textbf{Metabolic / Kinetic Parameter} & \textbf{Awake Rock Pigeon (\textit{Columba livia})} & \textbf{Mammalian Cortex / Whole-Brain Benchmark} & \textbf{Quantitative Ratio / Statistical Comparison} \\

\midrule

\endfirsthead

\toprule

\textbf{Metabolic / Kinetic Parameter} & \textbf{Awake Rock Pigeon (\textit{Columba livia})} & \textbf{Mammalian Cortex / Whole-Brain Benchmark} & \textbf{Quantitative Ratio / Statistical Comparison} \\

\midrule

\endhead

\bottomrule

\endfoot

Arterial / Venous Plasma Glucose ($c_{\text{plasma}}$) & $12.40 \pm 1.68\text{ mmol/L}$ ($13\text{--}15\text{ mmol/L}$ ocular boundary) & Normoglycemic mammalian baseline ($<6\text{ mmol/L}$) & Avian plasma glucose elevated via constitutively active GCGR \\

Lumped Constant ($\text{LC}$) & $0.69 \pm 0.037$ ($L_1 = 1.48, L_2 = 1.48, L_3 = 0.37$) & $0.45\text{ to }0.71$ & Invariant across awake vs. isoflurane ($t(7) = 1.471, p = 0.185$) \\

Tissue Glucose Consumption Rate ($\text{CMR}_{\text{glc}}$) & $27.29 \pm 1.57\ \mu\text{mol} / 100\text{ g} / \text{min}$ ($\approx 4.55 \times 10^{-4}\text{ mmol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$) & Scales linearly with $D_N$: $y = 5.76 \times 10^{-6}X + 5.62 \times 10^{-9}$ & Pigeon falls $>3\times$ below mammalian $\text{CMR}_{\text{glc}}$-vs.-density regression ($R^2 = 0.949$) \\

Per-Neuron Glucose Budget & $1.86 \times 10^{-9} \pm 0.2 \times 10^{-9}\ \mu\text{mol/neuron/min}$ & $5.79 \times 10^{-9} \pm 0.76 \times 10^{-9}\ \mu\text{mol/neuron/min}$ & $3.11\times$ lower glucose consumption per neuron in birds \\

Per-Neuron Molar Glucose Flux & $31.00\text{ amol glucose/neuron/s}$ & $96.50\text{ amol glucose/neuron/s}$ & $0.321\times$ mammalian molar flux \\

Per-Neuron Oxidative ATP Budget ($31\text{ ATP/glc}$) & $5.79 \times 10^8\text{ ATP molecules/neuron/s}$ & $1.80 \times 10^9\text{ ATP molecules/neuron/s}$ & Saves $1.22 \times 10^9\text{ ATP/s}$ per neuron \\

\end{longtable}

  

\subsection{Oculomotor-Retinal Metabolic Coupling: Saccadic Glucose Pumping by the Pecten Oculi}

  

A prominent finding of the awake pigeon $[^{18}\text{F}]\text{FDG}$ PET data is the intense metabolic coupling between the pecten oculi, the avascular avian retina, and the entopallium. Unlike eutherian mammals, which vascularize the inner retina, birds possess a completely avascular retina nourished by the pecten oculi—a pleated, pigmented vascular structure projecting into the vitreous chamber (homologous to the reptilian conus papillaris). However, passive molecular diffusion of glucose in the vitreous humor at avian body temperature ($40\ ^\circ\text{C}$, Stokes–Einstein corrected diffusion coefficient $D = 4.68 \times 10^{-4}\text{ mm}^2/\text{s}$, approximately half the rate in water at $39\ ^\circ\text{C}$ of $0.92 \times 10^{-9}\text{ m}^2/\text{s}$) is insufficient to sustain retinal metabolism across an ocular radius of $L = 7\text{ mm}$ (eye diameter $13\text{--}14\text{ mm}$): during stationary fixation, fluorescein dye diffuses $<0.5\text{ mm}$ over $120\text{ seconds}$.

  

Comparative electrooculography (EOG), intraocular glucose biosensor, and mathematical modeling experiments across five avian species—pigeon (\textit{Columba livia}, EOG scale bar $0.28\text{ mV}$ at $150\text{ ms}$), duck (\textit{Anas platyrhynchos}, $0.25\text{ mV}$), chukar (\textit{Alectoris chukar}, $0.20\text{ mV}$), budgerigar (\textit{Melopsittacus undulatus}, $0.34\text{ mV}$), and chicken (\textit{Gallus gallus}, $0.25\text{ mV}$)—demonstrate that birds overcome this diffusion limitation via rapid, oscillating saccadic eye movements. Avian saccades occupy $10\text{--}25\%$ of total viewing time (mean inter-saccade interval $7.57\text{ s}, f = 0.13\text{ Hz}$) and consist of rapid gaze shifts paired with cyclotorsional oscillations (individual oscillation cycle duration $20\text{--}70\text{ ms}$). Following a single oscillatory saccade, mechanical agitation of the pecten disperses fluorescein dye $\sim 3\text{ mm}$ across the vitreous within $2\text{ seconds}$.

  

The 1D reaction-advection-diffusion partial differential equation governing intraocular glucose concentration $c(x,t)$ from the pecten ($c_1 = 15\text{ mmol/L}$) to the distal retinal boundary ($c_2 = 13\text{ mmol/L}$, evaluated at proximal site $a = 1\text{ mm}$ and distal site $b = 4\text{ mm}$) is given by:

\begin{equation}

\frac{\partial c}{\partial t} = D \frac{\partial^2 c}{\partial x^2} - R + v(x,t)\frac{\partial c}{\partial x}

\end{equation}

where $R \approx 4.55 \times 10^{-4}\text{ mmol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$ is the tissue glucose consumption rate derived from the awake pigeon brain $\text{CMR}_{\text{glc}}$ ($27.29\ \mu\text{mol}/100\text{ g}/\text{min}$), and $v(x,t)$ is the oscillatory velocity field generated by pecten motion (wave number $k = 12.81\text{ rad/mm}$, angular frequency $\omega = 0.83\text{ rad/s}$, phase $\phi_0 = 0.97\pi\text{ rad}$, amplitude $A = 0.7\text{ mm}$, spatial decay $\alpha = 1 \times 10^{-3}\text{ mm}^{-1}$). Incorporating oscillatory dispersion yields an effective diffusivity $D_{\text{eff}}$:

\begin{equation}

D_{\text{eff}} = D + \frac{(A\omega)^2}{2 D k^2 \left[1 + \left(\frac{\omega}{D k^2}\right)^2\right]}

\end{equation}

Across visual stimulation regimes (Light [L], Dark [D], Gray [G], and $30\text{-min}$ conspecific social mating video [V]), saccade frequency ($F_{3,771} = 45.26, p < 0.001$) and oscillation frequency ($F_{3,768} = 11.32, p < 0.001$) scale dynamically with visual demand (correlating at Pearson $r = 0.55\text{ to }0.63, p < 0.001$), whereas intrasaccadic oscillation frequency remains constant ($F_{3,765} = 0.79, p = 0.50$). Transitioning from dark to light increases saccade frequency by $41.66 \pm 6.95\%$ ($n = 6$ pigeons), dynamically boosting vitreal glucose delivery and neuronal visual responses in the central brain.

  

\section{Biophysical Action Potential Kinetics, Ion Channel Convergences, and Cranial Vascular Thermoregulation}

  

According to foundational neuroenergetic budgets—such as Attwell and Laughlin's framework and variational free-energy models of neural information processing—action potentials and synaptic currents are the primary consumers of ATP in the central nervous system, expended primarily by the $\text{Na}^+/\text{K}^+$-ATPase pump to restore transmembrane $\text{Na}^+$ and $\text{K}^+$ gradients after signaling. In biophysical models tracking synaptic and leak conductances (modeled as a $2:1$ ratio of $\text{Na}^+$ to $\text{K}^+$ conductance yielding a $0\text{ mV}$ synaptic reversal potential), total input processing and spiking costs scale steeply with somatodendritic surface area: small cerebellar granule cells consume $\sim 0.12 \times 10^9\text{ ATP}\cdot\text{s}^{-1}\cdot\text{neuron}^{-1}$, larger Purkinje and Golgi cells consume up to $\sim 3.7 \times 10^9\text{ ATP}\cdot\text{s}^{-1}\cdot\text{neuron}^{-1}$, and specialized coincidence-detecting medial superior olive (MSO) principal neurons consume $6.2 \times 10^9\text{ ATP}\cdot\text{s}^{-1}\cdot\text{neuron}^{-1}$ during active auditory processing, dropping by $\sim 50\%$ in the absence of sound stimuli.

  

Three synergistic biophysical mechanisms explain how avian neurons compress this ATP expenditure by a factor of three: (1) somatodendritic miniaturization and capacitive economy, (2) high physiological operating temperature ($40\text{--}42\ ^\circ\text{C}$) that accelerates $\text{Na}^+$ channel inactivation and minimizes futile $\text{Na}^+/\text{K}^+$ current overlap during action potential generation (where Hodgkin–Huxley channel kinetics exhibit a $Q_{10}$ of $1.2\text{--}1.5$ for peak conductance and substantially steeper sensitivity for gating kinetics; e.g., hippocampal mossy fiber peak $\bar{g}_{\text{NaT}}$ rises from $49\text{ mS}\cdot\text{cm}^{-2}$ at $23\ ^\circ\text{C}$ to $61\text{--}80\text{ mS}\cdot\text{cm}^{-2}$ at $35\ ^\circ\text{C}$), and (3) convergent evolution of ultrafast $\text{Kv3.1}$ (\textit{KCNC1}) potassium channels and $\text{Nav}\beta4$-mediated resurgent $\text{Na}^+$ currents.

  

\subsection{Electrophysiological Specialization in the Zebra Finch Arcopallium: RAPN vs. AId}

  

In songbirds, projection neurons of the robust nucleus of the arcopallium (RAPNs) form a hyperdirect forebrain vocal-motor pathway to brainstem syringeal motor neurons, analogous to layer 5 pyramidal tract Betz cells in mammals. Syringeal muscles contract with a time-to-peak force of $\sim 4\text{ ms}$, requiring RAPNs to fire bursts at instantaneous rates of $300\text{--}600\text{ Hz}$ (mean overall spike rate $71\text{ Hz}$ during crystallized adult song vs. $36\text{ Hz}$ and $100\text{--}200\text{ Hz}$ instantaneous rates during juvenile subsong) with a first-spike latency variance of only $\sim 0.20\text{ to }0.23\text{ ms}$. By contrast, neurons in the adjacent dorsal intermediate arcopallium (AId) control non-vocal somatic skeletal musculature (such as pectoral wing muscles with a $\sim 10\text{ ms}$ twitch time-to-peak force) that has less stringent temporal precision demands.

  

\begin{longtable}{p{0.25\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}}

\caption{Ontogenetic maturation of passive membrane and spontaneous action potential properties in male zebra finch arcopallial neurons from 20 dph through adulthood at $24\ ^\circ\text{C}$ and $40\ ^\circ\text{C}$.} \label{tab:ra_ontogeny} \\

\toprule

\textbf{Parameter} & \textbf{20 dph Juvenile RA ($24\ ^\circ\text{C}$)} & \textbf{35 dph Juvenile RA ($24\ ^\circ\text{C}$)} & \textbf{50 dph Juvenile RA ($24\ ^\circ\text{C}$)} & \textbf{Adult Male RA ($24\ ^\circ\text{C}$)} & \textbf{Adult Male RA ($40\ ^\circ\text{C}$)} & \textbf{Adult Outside RA ($24\ ^\circ\text{C}$)} \\

\midrule

\endfirsthead

\toprule

\textbf{Parameter} & \textbf{20 dph Juvenile RA ($24\ ^\circ\text{C}$)} & \textbf{35 dph Juvenile RA ($24\ ^\circ\text{C}$)} & \textbf{50 dph Juvenile RA ($24\ ^\circ\text{C}$)} & \textbf{Adult Male RA ($24\ ^\circ\text{C}$)} & \textbf{Adult Male RA ($40\ ^\circ\text{C}$)} & \textbf{Adult Outside RA ($24\ ^\circ\text{C}$)} \\

\midrule

\endhead

\bottomrule

\endfoot

Input Resistance ($R_{\text{in}}$, $\text{M}\Omega$) & $422.0 \pm 32.7$ ($N=16$) & $285.4 \pm 19.9$ ($N=18$) & $175.7 \pm 17.6$ ($N=19$) & $190.2 \pm 25.4$ ($N=14$) & --- & $276.0 \pm 36.8$ ($N=12$) \\

Membrane Time Constant ($\tau_m$, $\text{ms}$) & $39.0 \pm 2.8$ ($N=15$) & $28.0 \pm 3.5$ ($N=17$) & $25.9 \pm 3.0$ ($N=15$) & $18.8 \pm 1.7$ ($N=11$) & --- & $47.5 \pm 4.0$ ($N=12$) \\

Membrane Capacitance ($C_m$, $\text{pF}$) & $103.3 \pm 15.8$ ($N=15$) & $109.0 \pm 17.4$ ($N=17$) & $155.6 \pm 19.5$ ($N=15$) & $114.3 \pm 15.3$ ($N=11$) & --- & $195.6 \pm 23.3$ ($N=12$) \\

Spontaneous Firing Freq. ($\text{Hz}$) & $5.7 \pm 0.7$ ($N=14$) & $5.0 \pm 1.4$ ($N=17$) & $6.8 \pm 1.0$ ($N=17$) & $9.2 \pm 2.5$ ($N=17$) & $45.0 \pm 10.3$ ($N=8$) & $6.5 \pm 2.5$ ($N=4$) \\

Spontaneous Active Fraction (\%) & $77.8\%$ & $94.4\%$ & $80.0\%$ & $94.4\%$ & $100.0\%$ & $41.7\%$ \\

AP Threshold ($\text{mV}$) & $-43.7 \pm 0.8$ ($N=13$) & $-48.1 \pm 1.5$ ($N=16$) & $-48.3 \pm 0.7$ ($N=17$) & $-54.0 \pm 2.0$ ($N=14$) & $-44.1 \pm 0.7$ ($N=8$) & $-38.3 \pm 0.4$ ($N=4$) \\

AP Half-Width ($\text{HW}$, $\text{ms}$) & $1.80 \pm 0.07$ ($N=13$) & $1.20 \pm 0.08$ ($N=16$) & $0.80 \pm 0.05$ ($N=17$) & $0.60 \pm 0.21$ ($N=14$) & $0.18 \pm 0.02$ ($N=8$) & $2.10 \pm 0.20$ ($N=4$) \\

AP Amplitude ($\text{mV}$) & $85.1 \pm 1.0$ ($N=13$) & $88.6 \pm 1.6$ ($N=16$) & $90.0 \pm 1.8$ ($N=17$) & $90.5 \pm 1.9$ ($N=14$) & $62.7 \pm 3.0$ ($N=8$) & $62.3 \pm 8.0$ ($N=4$) \\

Max Depolarization Rate ($\text{V/s}$) & $260.0 \pm 15.1$ ($N=13$) & $364.8 \pm 20.6$ ($N=16$) & $488.8 \pm 22.1$ ($N=17$) & $534.5 \pm 33.6$ ($N=14$) & $592.4 \pm 66.5$ ($N=8$) & $144.0 \pm 30.8$ ($N=4$) \\

Max Repolarization Rate ($\text{V/s}$) & $42.8 \pm 2.7$ ($N=13$) & $77.9 \pm 4.8$ ($N=16$) & $130.4 \pm 7.6$ ($N=17$) & $181.9 \pm 10.2$ ($N=14$) & $478.9 \pm 63.5$ ($N=8$) & $41.1 \pm 8.2$ ($N=4$) \\

\end{longtable}

  

Whole-cell patch-clamp recordings across vocal development ($20, 35, 50\text{ dph}$, and adult) and temperature (room temperature $24\ ^\circ\text{C}$ vs. physiological avian temperature $40\ ^\circ\text{C}$) demonstrate two coordinated biophysical adaptations in RAPNs (Tables \ref{tab:ra_ontogeny} and \ref{tab:rapn_aid}). First, in juvenile males ($20\text{ dph}$) and non-singing females (whose RA undergoes developmental atrophy), arcopallial neurons express the auxiliary subunit $\text{Nav}\beta3$ (\textit{SCN3B}) and lack resurgent $\text{Na}^+$ currents. During male vocal learning ($35\text{ to }>90\text{ dph}$), RAPNs execute a developmental switch from $\text{Nav}\beta3$ to $\text{Nav}\beta4$ (\textit{SCN4B}) alongside strong $\text{Nav}\beta1$ expression. Dialysis of $\text{Nav}\beta4$'s C-terminal peptide into juvenile RA neurons and dynamic clamping confirm that $\text{Nav}\beta4$ acts as an open-channel blocker that prevents classical slow inactivation upon depolarization and unbinds upon repolarization to generate a large resurgent $\text{Na}^+$ current ($I_{\text{NaR}}$ at $-30\text{ mV}$), while accelerating transient $\text{Na}^+$ current ($I_{\text{NaT}} = I_{\max}(1 - e^{-t/\tau_a})^N$) activation onset from $\tau_a = 0.17\text{ ms}$ at $20\text{ dph}$ to $0.11\text{ ms}$ in adults. Across development at $24\ ^\circ\text{C}$, this narrows the RAPN action potential half-width from $1.80 \pm 0.07\text{ ms}$ at $20\text{ dph}$ to $1.20 \pm 0.08\text{ ms}$ at $35\text{ dph}$, $0.80 \pm 0.05\text{ ms}$ at $50\text{ dph}$, and $0.60 \pm 0.21\text{ ms}$ in adults (compared to $2.10 \pm 0.20\text{ ms}$ in adult neurons outside RA), while further compressing half-width to $0.18 \pm 0.02\text{ ms}$ at $40\ ^\circ\text{C}$.

  

Second, when adult male RAPNs and AId neurons are compared directly at $24\ ^\circ\text{C}$ and $40\ ^\circ\text{C}$ (Table \ref{tab:rapn_aid}), both populations share similar thresholds, amplitudes, and passive capacitances ($C_m = 96.1 \pm 7.39\text{ pF}$ in RAPNs vs. $106.8 \pm 7.44\text{ pF}$ in AId at $40\ ^\circ\text{C}$; unadjusted surface areas from $C_m$ at $24\ ^\circ\text{C}$ are $11,563.6 \pm 2,277.5\ \mu\text{m}^2$ for RAPNs vs. $7,578.6 \pm 1,564.7\ \mu\text{m}^2$ for AId, $t = 1.331, p = 0.2$; ShuTu 3D-reconstructed surface areas corrected for $\le 20\%$ shrinkage are $8,207.5\ \mu\text{m}^2$ for RAPNs and $9,031.9\ \mu\text{m}^2$ for AId, with AId dendrites restricted within $\sim 200\ \mu\text{m}$ of the soma but bearing more than double the tertiary dendritic spine density of RAPNs: $0.90 \pm 0.07\text{ spines}/\mu\text{m}$ vs. $0.40 \pm 0.05\text{ spines}/\mu\text{m}$). However, RAPNs exhibit an action potential half-width that is half as wide as AId neurons at both $24\ ^\circ\text{C}$ ($0.57 \pm 0.02\text{ ms}$ vs. $1.23 \pm 0.05\text{ ms}$, $p = 2.4 \times 10^{-13}, U = 11$) and $40\ ^\circ\text{C}$ ($0.16 \pm 0.01\text{ ms}$ vs. $0.32 \pm 0.01\text{ ms}$, $p = 1.2 \times 10^{-10}, t = 11.33$), driven by a faster maximum repolarization rate ($181.9 \pm 7.75\text{ V/s}$ vs. $64.5 \pm 3.71\text{ V/s}$ at $24\ ^\circ\text{C}$, $p = 3.1 \times 10^{-13}, U = 14$; $764.7 \pm 92.41\text{ V/s}$ vs. $482.3 \pm 52.83\text{ V/s}$ at $40\ ^\circ\text{C}$, $p = 0.02, t = 2.504$).

  

Transcriptomic and pharmacological profiling demonstrates that this ultranarrow spike waveform is mediated by elevated expression of Shaw-related high-threshold $\text{Kv3.1}$ (\textit{KCNC1}) channels in RA compared to AId (whereas \textit{KCNC2--4} are non-differential, with sequence alignment also identifying a conserved avian \textit{KCNC3} [$\text{Kv3.3}$] ortholog lacking the human N-terminal domain). Whereas $\alpha$-dendrotoxin ($\text{Kv1}$ blocker) and iberiotoxin ($\text{Ca}^{2+}$-activated BK blocker) do not differentially alter RAPN vs. AId spikes, $\text{Kv3}$ blockers (TEA and 4-AP) disproportionately broaden RAPN spikes, and the selective $\text{Kv3.1/Kv3.2}$ positive modulator AUT5 narrows the AP waveform and increases steady-state firing frequency specifically in RAPNs while having no significant effect on AId neurons. In a parallel evolutionary adaptation toward energetic economy, modern human cortical neurons achieve higher computational efficiency on a reduced energy budget by reducing voltage-gated potassium conductance in specific cortical populations, while primate corticospinal Betz cells independently recruited $\text{Kv3.1}$ to generate ultranarrow spikes for fine motor control.

  

\begin{longtable}{p{0.23\textwidth}p{0.14\textwidth}p{0.14\textwidth}p{0.14\textwidth}p{0.14\textwidth}p{0.16\textwidth}}

\caption{Complete verified comparison of passive, spontaneous active, and morphological properties of adult male zebra finch RAPNs and AId neurons at $24\ ^\circ\text{C}$ and $40\ ^\circ\text{C}$, including exact parametric ($t$) and non-parametric ($U$) statistical test metrics.} \label{tab:rapn_aid} \\

\toprule

\textbf{Electrophysiological / Morphological Parameter} & \textbf{Adult RAPN ($24\ ^\circ\text{C}$)} & \textbf{Adult AId ($24\ ^\circ\text{C}$)} & \textbf{Adult RAPN ($40\ ^\circ\text{C}$)} & \textbf{Adult AId ($40\ ^\circ\text{C}$)} & \textbf{Statistical Comparison ($24\ ^\circ\text{C}$ / $40\ ^\circ\text{C}$)} \\

\midrule

\endfirsthead

\toprule

\textbf{Electrophysiological / Morphological Parameter} & \textbf{Adult RAPN ($24\ ^\circ\text{C}$)} & \textbf{Adult AId ($24\ ^\circ\text{C}$)} & \textbf{Adult RAPN ($40\ ^\circ\text{C}$)} & \textbf{Adult AId ($40\ ^\circ\text{C}$)} & \textbf{Statistical Comparison ($24\ ^\circ\text{C}$ / $40\ ^\circ\text{C}$)} \\

\midrule

\endhead

\bottomrule

\endfoot

Spontaneous AP Frequency ($\text{Hz}$) & $13.6 \pm 1.71$ ($N=39$) & $12.9 \pm 1.14$ ($N=36$) & $41.0 \pm 6.70^*$ ($N=13$) & $13.2 \pm 2.47$ ($N=11$) & $24\ ^\circ\text{C}$: $p = 0.7, t = 0.3825$; $40\ ^\circ\text{C}$: $p = 0.0002, U = 14$ ($3.1\times$ higher) \\

AP Threshold ($\text{mV}$) & $-55.3 \pm 0.66$ ($N=39$) & $-53.7 \pm 0.62$ ($N=36$) & $-52.0 \pm 1.00$ ($N=13$) & $-52.7 \pm 1.71$ ($N=11$) & Non-significant between nuclei at both temperatures \\

AP Amplitude ($\text{mV}$) & $92.8 \pm 1.53$ ($N=39$) & $89.0 \pm 1.39$ ($N=36$) & $96.3 \pm 3.57$ ($N=13$) & $102.8 \pm 3.28$ ($N=11$) & Preserved full-amplitude overshooting spikes at $40\ ^\circ\text{C}$ \\

AP Half-Width ($\text{ms}$) & $0.57 \pm 0.02^*$ ($N=39$) & $1.23 \pm 0.05$ ($N=36$) & $0.16 \pm 0.01^*$ ($N=13$) & $0.32 \pm 0.01$ ($N=11$) & $24\ ^\circ\text{C}$: $p = 2.4 \times 10^{-13}, U = 11$; $40\ ^\circ\text{C}$: $p = 1.2 \times 10^{-10}, t = 11.33$ \\

Max Depolarization Rate ($\text{V/s}$) & $658.4 \pm 26.53^*$ ($N=39$) & $477.1 \pm 24.59$ ($N=36$) & $1,288.5 \pm 67.11$ ($N=13$) & $1,339.4 \pm 85.34$ ($N=11$) & $24\ ^\circ\text{C}$: $p = 4.0 \times 10^{-6}, t = 4.988$; $40\ ^\circ\text{C}$: $p = 0.6, t = 0.4644$ \\

Max Repolarization Rate ($\text{V/s}$) & $181.9 \pm 7.75^*$ ($N=39$) & $64.5 \pm 3.71$ ($N=36$) & $764.7 \pm 92.41^*$ ($N=13$) & $482.3 \pm 52.83$ ($N=11$) & $24\ ^\circ\text{C}$: $p = 3.1 \times 10^{-13}, U = 14$; $40\ ^\circ\text{C}$: $p = 0.02, t = 2.504$ \\

AP Peak Potential ($\text{mV}$) & $+37.4 \pm 0.96$ ($N=39$) & $+35.5 \pm 1.19$ ($N=36$) & $+44.5 \pm 2.87$ ($N=13$) & $+50.3 \pm 2.09$ ($N=11$) & $24\ ^\circ\text{C}$: $p = 0.2, t = 1.255$; $40\ ^\circ\text{C}$: $p = 0.1, t = 1.568$ \\

Afterhyperpolarization (AHP, $\text{mV}$) & $-71.9 \pm 0.53^*$ ($N=39$) & $-68.4 \pm 0.67$ ($N=36$) & $-65.7 \pm 0.92^*$ ($N=13$) & $-69.2 \pm 0.61$ ($N=11$) & $24\ ^\circ\text{C}$: $p = 0.0001, t = 4.090$; $40\ ^\circ\text{C}$: $p = 0.006, t = 3.025$ \\

Membrane Time Constant ($\tau_m$, $\text{ms}$) & $17.4 \pm 1.9$ ($N=8$) & $15.2 \pm 2.3$ ($N=6/8$) & $17.2 \pm 1.36^*$ ($N=10$) & $13.3 \pm 0.60$ ($N=12$) & $24\ ^\circ\text{C}$: $p = 0.5, t = 0.7259$; $40\ ^\circ\text{C}$: $p = 0.01, t = 2.735$ \\

Membrane Capacitance ($C_m$, $\text{pF}$) & $115.4 \pm 22.77$ ($N=8$) & $75.8 \pm 15.65$ ($N=6/8$) & $96.1 \pm 7.39$ ($N=10$) & $106.8 \pm 7.44$ ($N=12$) & $24\ ^\circ\text{C}$: $p = 0.2, t = 1.326$; $40\ ^\circ\text{C}$: $p = 0.3, t = 1.027$ \\

Input Resistance ($R_{\text{in}}$, $\text{M}\Omega$) & $176.6 \pm 22.11$ ($N=8$) & $209.2 \pm 13.03$ ($N=6/8$) & $185.2 \pm 15.02^*$ ($N=10$) & $129.08 \pm 8.81$ ($N=12$) & $24\ ^\circ\text{C}$: $p = 0.3, t = 1.160$; $40\ ^\circ\text{C}$: $p = 0.004, t = 3.280$ \\

Tertiary Dendritic Spine Density ($\text{spines}/\mu\text{m}$) & $0.40 \pm 0.05$ & $0.90 \pm 0.07$ & $0.40 \pm 0.05$ & $0.90 \pm 0.07$ & AId has $2.25\times$ higher spine density; RAPN has larger spine heads \\

\end{longtable}

  

\subsection{Biophysical Derivation of Single-Spike ATP Cost: Capacitance, Temperature, and Current Overlap}

  

The minimum theoretical capacitive charge required to depolarize a neuron of membrane capacitance $C_m$ by an action potential amplitude $\Delta V$ is $Q_{\min} = C_m \Delta V$. However, the actual inward $\text{Na}^+$ charge $Q_{\text{Na}} = F_{\text{overlap}} C_m \Delta V$ is multiplied by the dimensionless $\text{Na}^+/\text{K}^+$ current overlap factor ($F_{\text{overlap}} \ge 1.0$), which quantifies the simultaneous flow of opposing depolarizing $\text{Na}^+$ and repolarizing $\text{K}^+$ currents across the membrane during the action potential. Because the $\text{Na}^+/\text{K}^+$-ATPase extrudes $3\ \text{Na}^+$ ions per $1$ ATP molecule hydrolyzed, the metabolic cost per action potential ($N_{\text{ATP/spike}}$) is governed by:

\begin{equation}

N_{\text{ATP/spike}} = \frac{F_{\text{overlap}} \cdot C_m \cdot \Delta V}{3 e}

\end{equation}

where $e = 1.60218 \times 10^{-19}\text{ C}$ is the elementary charge. Evaluating this relationship across mammalian and avian electrophysiological parameters illustrates how avian neurons achieve a profound reduction in signaling energy cost:

\begin{itemize}

\item \textbf{Mammalian Cortical Pyramidal Neuron ($37.0\ ^\circ\text{C}$):} With $C_m \approx 280\text{ pF}$ and $\Delta V = 100\text{ mV}$, the minimum capacitive charge is $Q_{\min} = 28.00\text{ pC}$; with typical current overlap ($F_{\text{overlap}} = 2.2\text{ to }3.0$), each spike admits $3.84 \times 10^8\text{ to }5.24 \times 10^8\ \text{Na}^+$ ions, requiring $1.28 \times 10^8\text{ to }1.75 \times 10^8\text{ ATP molecules/spike}$.

\item \textbf{Adult Zebra Finch RAPN at Room Temperature ($24.0\ ^\circ\text{C}$):} With $C_m = 115.4\text{ pF}$, $\Delta V = 92.8\text{ mV}$, and $\text{HW} = 0.57\text{ ms}$, $Q_{\min} = 10.71\text{ pC}$, which at $F_{\text{overlap}} = 2.0$ admits $1.34 \times 10^8\ \text{Na}^+$ ions and consumes $4.46 \times 10^7\text{ ATP molecules/spike}$.

\item \textbf{Adult Zebra Finch RAPN at Physiological Temperature ($40.0\ ^\circ\text{C}$):} With $C_m = 96.1\text{ pF}$, $\Delta V = 96.3\text{ mV}$, and $\text{HW} = 0.16\text{ ms}$, $Q_{\min}$ drops to $9.25\text{ pC}$; because high temperature accelerates $\text{Na}^+$ channel inactivation and high-threshold $\text{Kv3.1}$ channels drive a rapid $764.7\text{ V/s}$ repolarization in $0.16\text{ ms}$, $\text{Na}^+/\text{K}^+$ current overlap approaches the biophysical minimum ($F_{\text{overlap}} \approx 1.15$), reducing $\text{Na}^+$ influx to $6.64 \times 10^7$ ions and consuming $2.21 \times 10^7\text{ ATP molecules/spike}$ (a $5.8\text{- to }7.9\text{-fold}$ savings relative to the modeled mammalian pyramidal neuron, and compared to $3.08 \times 10^7\text{ ATP molecules/spike}$ in AId neurons at $40\ ^\circ\text{C}$ where $C_m = 106.8\text{ pF}$, $\Delta V = 102.8\text{ mV}$, $Q_{\min} = 10.98\text{ pC}$, $\text{HW} = 0.32\text{ ms}$, and $F_{\text{overlap}} \approx 1.35$ yielding $9.25 \times 10^7\ \text{Na}^+$ ions).

\item \textbf{Compact Avian DVR Associative Neuron ($41.0\ ^\circ\text{C}$):} With $C_m \approx 55\text{ pF}$, $\Delta V = 95.0\text{ mV}$, $Q_{\min} = 5.22\text{ pC}$, and $F_{\text{overlap}} \approx 1.20$, $\text{Na}^+$ entry is $3.91 \times 10^7$ ions and single-spike cost falls to $1.30 \times 10^7\text{ ATP molecules/spike}$ (up to a 13.5-fold reduction relative to a large mammalian pyramidal neuron).

\end{itemize}

  

\subsection{Cranial Vascular Thermoregulation: The Rete Mirabile Ophthalmicum (RMO) and Intercarotid Anastomoses}

  

While operating the central nervous system at $40.0\text{--}42.9\ ^\circ\text{C}$ yields substantial kinetic and metabolic advantages for action potential generation, it places avian neural tissue perilously close to the upper thermal threshold of $\sim 45\ ^\circ\text{C}$, where irreversible denaturation of membrane lipids and proteins commences. Unlike mammals, birds lack a cerebral arterial Circle of Willis. Instead, to exploit high-temperature channel kinetics without risking hyperthermic encephalopathy during flight or radiant heat exposure, cerebral arterial blood is supplied via an extracranial intercarotid anastomosis (linked in all extant Galliformes by a specialized cranial foramen) that feeds a counter-current vascular heat exchanger: the rete mirabile ophthalmicum (RMO), situated in a shallow temporal depression between the posteroventral border of the orbit, the external acoustic meatus, and the otic process of the quadrate.

  

Anatomical dissections across avian orders identify three distinct topological classes of the avian intercarotid anastomosis (Table \ref{tab:rmo_cooling}):

\begin{enumerate}

\item \textbf{H-type Anastomosis:} Features a lengthy transverse arterial bridge connecting the left and right cerebral carotids, as observed in the Sooty Storm-Petrel (\textit{Oceanodroma markhami}, Procellariiformes).

\item \textbf{X-type Anastomosis:} Features direct side-to-side fusion of the cerebral carotids, documented across albatrosses, petrels, and shearwaters (\textit{Pterodroma hypoleuca}, \textit{Puffinus pacificus}, \textit{Diomedea nigripes}, and \textit{Diomedea immutabilis} in Procellariiformes) as well as noddies and terns (\textit{Anous tenuirostris}, \textit{Anous stolidus}, \textit{Gygis alba}, and \textit{Sterna fuscata} in Charadriiformes).

\item \textbf{X-H Intermediate Type:} Features a short transverse connection, documented in Red-footed and Brown Boobies (\textit{Sula sula rubripes} and \textit{Sula leucogaster plotus}, Pelecaniformes/Suliformes), where the RMO forms a large $20 \times 5\text{ mm}$ heat-exchange bed and heat-stressed birds adopt a head-down posture in the body's shade to reduce radiant heat loads and promote cerebral vasodilation across the rete.

\end{enumerate}

  

Within the RMO, warm arterial blood branching from the \textit{arteria ophthalmica externa} (via temporal, supraorbital, ophthalmic, and infraorbital rami plus the inferior alveolar artery, which subsequently anastomose with intracranial branches of the \textit{arteria carotis interna}) flows in counter-current apposition to cooled venous blood draining evaporative surfaces across the cornea, nasal cavities (cartilaginous respiratory turbinates), and oral/buccal membranes—augmented during heat stress by panting, gular fluttering, and subcutaneous venous plexuses such as the pigeon collar plexus—via the \textit{vena palpebralis dorsorostralis}, \textit{v. ophthalmotemporalis}, \textit{v. maxillaris}, and \textit{v. facialis} before draining into the cavernous sinus. Experimental anterior respiratory bypass and vascular occlusion studies in pigeons (\textit{Columba livia}) confirm that corneal and upper-airway venous drainage through the RMO is directly responsible for selective brain cooling.

  

In the $2.5\text{ g}$ Calliope hummingbird (\textit{Stellula calliope}), despite extreme body miniaturization reducing the RMO to just $2\text{--}4$ arteries and $2$ veins, linear regression across $27$ simultaneous measurements in $11$ birds across ambient air temperatures ($T_{\text{Amb}}$) from $3\ ^\circ\text{C}$ to $44\ ^\circ\text{C}$ reveals biphasic thermal regulation of brain temperature ($T_{\text{Br}}$) relative to core colonic temperature ($T_{\text{Cl}}$):

\begin{equation}

T_{\text{Cl}} = 0.53\,T_{\text{Amb}} + 19.87 \quad \left(S_{Y\cdot X} = 1.21,\; r = 0.86,\; F_{1,25} = 84,\; p < 0.001\right)

\end{equation}

\begin{equation}

T_{\text{Br}} = 0.52\,T_{\text{Cl}} + 19.38 \quad \left(\text{full range: } S_{Y\cdot X} = 0.58,\; r = 0.92,\; F_{1,25} = 125,\; p < 0.001;\; \text{slope } < 1.0\text{ at } p = 0.005\right)

\end{equation}

\begin{equation}

T_{\text{Br}} = 0.83\,T_{\text{Cl}} + 6.15 \quad \left(\text{at } T_{\text{Cl}} > 40.4\ ^\circ\text{C}:\; S_{Y\cdot X} = 0.47,\; r = 0.86,\; F_{1,25} = 31,\; p < 0.001\right)

\end{equation}

The regression line intersects the isothermal line ($T_{\text{Br}} = T_{\text{Cl}}$) at a core temperature of $40.4\ ^\circ\text{C}$. Below $40.4\ ^\circ\text{C}$, brain temperature exceeds core colonic temperature by an average of $1.17\ ^\circ\text{C}$ ($T_{\text{Cl}} - T_{\text{Br}} = -1.17\ ^\circ\text{C}$), conserving cerebral heat and keeping voltage-gated channel kinetics fast; above $40.4\ ^\circ\text{C}$, counter-current heat exchange in the RMO cools the brain $0.82\ ^\circ\text{C}$ below core body temperature ($T_{\text{Cl}} - T_{\text{Br}} = +0.82\ ^\circ\text{C}$; overall sample mean difference $-0.21\ ^\circ\text{C}$), matching the interspecific avian brain-cooling average of $0.96\ ^\circ\text{C}$ (ranging from $0.50\ ^\circ\text{C}$ in the Pekin duck to $2.13\ ^\circ\text{C}$ in the helmeted guineafowl, whereas the $13\text{ g}$ zebra finch shows a $0.18\ ^\circ\text{C}$ difference).

  

Furthermore, simultaneous internal coelomic PIT-tag, sub-plumage skin PIT-tag, and $10\text{ Hz}$ FLIR infrared thermography recordings with Akaike Information Criterion ($\text{AIC}_c$) modeling in Eurasian collared doves (\textit{Streptopelia risoria}, body mass $162 \pm 13\text{ g}, n = 9$) demonstrate that core temperature ($42.3 \pm 0.6\ ^\circ\text{C}$ resting; rising $+0.6\ ^\circ\text{C}$ post-flight to $42.9 \pm 0.7\ ^\circ\text{C}, p = 0.04$, and $42.5 \pm 0.6\ ^\circ\text{C}$ under radiant heating vs. $42.1 \pm 0.7\ ^\circ\text{C}$ under wind/fan cooling, ANOVA $p = 0.009$) is buffered by plumage insulation ($F_{1,60} = 302.9, p < 0.001$ between core, skin [$39.3 \pm 1.6\ ^\circ\text{C}$ under fan cooling vs. $40.9 \pm 1.8\ ^\circ\text{C}$ resting, $41.5 \pm 0.9\ ^\circ\text{C}$ radiant heating, and $41.6 \pm 1.0\ ^\circ\text{C}$ post-flight], and external surface) and active vasomotor modulation of facial, ocular, pedal, and wing Heat Dissipation Areas ($\text{HDAs} > 35\ ^\circ\text{C}$), maintaining head surface temperatures an average of $2\ ^\circ\text{C}$ cooler than the feet (repeated-measures ANCOVA $p < 0.001$; combined eye, foot, and wing temperatures predicting core temperature without individual/treatment factors: $\text{AIC} = -30.1, \text{RSS} = 12.49, F_{3,32} = 3.68, r^2 = 0.26$). Radiant heat significantly expands the ocular/facial HDA surface area ($p = 0.03$) and wing HDA surface area ($p < 0.0001$), whereas wind exposure cools eye ($p < 0.001$), foot ($p = 0.003$), and wing ($p = 0.04$) temperatures and eliminates beak HDA.

  

\begin{longtable}{p{0.23\textwidth}p{0.14\textwidth}p{0.09\textwidth}p{0.21\textwidth}p{0.13\textwidth}p{0.16\textwidth}}

\caption{Comparative cranial thermoregulation, Rete Mirabile Ophthalmicum (RMO) anatomy, and intercarotid anastomosis topologies across avian clades.} \label{tab:rmo_cooling} \\

\toprule

\textbf{Species (Scientific Name)} & \textbf{Order / Clade} & \textbf{Body Mass (kg)} & \textbf{RMO / Anastomosis Architecture} & \textbf{Thermal Gradient ($T_{\text{Cl}} - T_{\text{Br}}$, $^\circ\text{C}$)} & \textbf{Physiological / Thermoregulatory Specialization} \\

\midrule

\endfirsthead

\toprule

\textbf{Species (Scientific Name)} & \textbf{Order / Clade} & \textbf{Body Mass (kg)} & \textbf{RMO / Anastomosis Architecture} & \textbf{Thermal Gradient ($T_{\text{Cl}} - T_{\text{Br}}$, $^\circ\text{C}$)} & \textbf{Physiological / Thermoregulatory Specialization} \\

\midrule

\endhead

\bottomrule

\endfoot

\textit{Stellula calliope} (Calliope hummingbird) & Apodiformes & $0.0025$ & Simple RMO: $2\text{--}4$ arteries, $2$ veins & $+0.82\ ^\circ\text{C}$ ($>40.4\ ^\circ\text{C}$); $-1.17\ ^\circ\text{C}$ ($<40.4\ ^\circ\text{C}$) & Isothermal crossover at $40.4\ ^\circ\text{C}$; warms brain in cold, cools brain in heat \\

\textit{Taeniopygia guttata} (Zebra finch) & Passeriformes & $0.013$ & Simple RMO (reduced vessel count) & $+0.18\ ^\circ\text{C}$ & Arid-adapted; operates arcopallial circuits at $\sim 40\ ^\circ\text{C}$ \\

\textit{Chordeiles acutipennis} (Lesser nighthawk) & Caprimulgiformes & $0.047$ & Well-developed buccal/ocular venous drainage & $+1.28\ ^\circ\text{C}$ & Gular fluttering evaporative cooling \\

\textit{Falco sparverius} (American kestrel) & Falconiformes & $0.119$ & Ophthalmic arterial-venous rete & $+0.70\ ^\circ\text{C}$ & Visual predation thermal stability \\

\textit{Streptopelia risoria} (Collared dove) & Columbiformes & $0.162$ & Columbiform RMO + active ocular/wing HDAs & Core $42.3\ ^\circ\text{C}$ rest to $42.9\ ^\circ\text{C}$ post-flight & Expands eye ($p=0.03$) and wing ($p<0.0001$) HDAs $>35\ ^\circ\text{C}$ under heat load \\

\textit{Geococcyx californianus} (Roadrunner) & Cuculiformes & $0.251$ & Ophthalmic counter-current rete & $+0.80\ ^\circ\text{C}$ & Cursorial desert thermoregulation \\

\textit{Columba livia} (Rock pigeon) & Columbiformes & $0.361\text{--}0.430$ & Classic RMO; $4$ rami of \textit{a. ophthalmica externa} + collar plexus & $+1.03\text{ to }+1.08\ ^\circ\text{C}$ ($1.06\ ^\circ\text{C}$ in $0.361\text{ kg}$) & Corneal and buccal venous return cools brain during flight \\

\textit{Corvus cryptoleucus} (White-necked raven) & Passeriformes & $0.385$ & Corvid RMO & $+0.92\ ^\circ\text{C}$ & Protects dense corvid pallium during flight \\

\textit{Oceanodroma markhami} (Storm-petrel) & Procellariiformes & --- & H-type intercarotid anastomosis + RMO & --- & Lengthy transverse intercarotid shunt \\

\textit{Puffinus pacificus} / \textit{Diomedea immutabilis} & Procellariiformes & --- & X-type intercarotid anastomosis + RMO & --- & Side-to-side carotid fusion; panting evaporative cooling \\

\textit{Gygis alba} / \textit{Sterna fuscata} / \textit{Anous} spp. & Charadriiformes & --- & X-type intercarotid anastomosis + RMO & --- & Side-to-side carotid fusion across all examined terns/noddies \\

\textit{Sula sula} / \textit{Sula leucogaster} (Boobies) & Suliformes & --- & X-H type anastomosis; large $20 \times 5\text{ mm}$ RMO & --- & Gular fluttering + head-down posture enhances RMO perfusion \\

\textit{Numida meleagris} (Helmeted guineafowl) & Galliformes & $1.130$ & Elaborated galliform RMO + cranial foramen & $+2.13\ ^\circ\text{C}$ & Highest recorded avian brain-cooling gradient \\

\textit{Anas platyrhynchos} (Mallard / Pekin duck) & Anseriformes & $1.156$ & Anseriform RMO & $+1.29\ ^\circ\text{C}$ (Mallard); $+0.50\text{ to }+1.03\ ^\circ\text{C}$ (Pekin) & High evaporative nasal/buccal venous return \\

\textit{Gallus domesticus} (Domestic fowl) & Galliformes & $2.300\text{--}2.650$ & Galliform RMO + cranial foramen & $+0.70, +0.80, +0.90, +1.00\ ^\circ\text{C}$ across cohorts & Consistent $\sim 0.85\ ^\circ\text{C}$ brain cooling under heat load \\

\textit{Rhea americana} (Greater rhea) & Palaeognathae & $30.900$ & Palaeognath RMO & $+1.00\ ^\circ\text{C}$ & Conserved selective brain cooling in large flightless ratites \\

\end{longtable}

  

\section{Evo-Devo of the Amniote Pallium: Progenitor Dynamics, Epigenomics, Transcriptomic Convergence, and Dendritic Allometry}

  

The divergent adult cytoarchitectures of mammals (a six-layered dorsal neocortex) and birds (a nuclear Dorsal Ventricular Ridge [DVR] and laminated hyperpallial Wulst) emerge from conserved embryonic progenitor pools whose proliferation rates, gliogenic transitions, and morphogenetic mechanics are tuned by post-transcriptional, mechanosensitive, signaling, and epigenomic networks.

  

\subsection{Post-Transcriptional Progenitor Scaling, Mechanotransduction, and Slit/Robo--Dll1/Notch Division Modes}

  

At the post-transcriptional level, the division rate and lifespan of neural stem cells (neuroblasts and radial glia) are governed by two opposing, evolutionarily conserved RNA-binding proteins (RBPs): Imp (the ortholog of vertebrate $\text{IGF2BP1}$ / $\text{ZBP1}$, which in \textit{Gallus gallus} forms a $575\text{-amino-acid}$ protein interacting with $\text{SYNCRIP}$, $\text{HNRNPR}$, $\text{ELAVL1}$, $\text{FMR1}$, $\text{IGF2}$, and $\beta$-actin mRNA) and Syncrip ($\text{Syp}$ / vertebrate $\text{SYNCRIP}$ / $\text{hnRNP Q}$). Single-molecule mRNA imaging and genetic epistasis demonstrate that during early neurogenesis, high intrinsic levels of $\text{Imp/IGF2BP1}$ bind and stabilize \textit{myc} mRNA, extending \textit{myc} transcript half-life, elevating Myc protein levels, enlarging progenitor cell size, and driving rapid symmetric and asymmetric cell divisions. As development progresses, temporal patterning triggers the Imp-to-Syncrip transition: rising $\text{Syp/SYNCRIP}$ negatively regulates Imp, destabilizing \textit{myc} mRNA, shrinking progenitor soma volume, slowing division rates, and recruiting the transcription factor E93 to terminate neurogenesis via cell-cycle exit and autophagy. Prolonged maintenance of $\text{Imp/IGF2BP1}$ (as observed in mushroom body neuroblasts or in mammalian radial glia where $\text{IGF2BP1}$ associates with $\text{HNRNPU}$ and $\text{SYNCRIP}$) extends the proliferative neurogenic window, providing a direct molecular dial to amplify total pallial neuron numbers. Concurrently, physical tissue expansion and progenitor migration are regulated by the mechanically activated cation channel $\text{PIEZO1}$, which senses local plasma membrane tension downstream of focal adhesion kinase (FAK) activation to coordinate integrin-dependent migration and mechanotransduction.

  

Across all vertebrates, the embryonic pallium arises from polarized neuroepithelial cells that transition into apical radial glial cells (aRGCs) undergoing interkinetic nuclear migration (INM) within the ventricular zone (VZ). However, amniote clades diverge fundamentally in whether aRGCs divide via direct neurogenesis (dNG)—where an aRGC divides asymmetrically at the ventricular surface to self-renew and directly produce one post-mitotic neuron—or indirect neurogenesis (iNG), where an aRGC generates $\text{Tbr2}^+$ (\textit{Eomes}) intermediate progenitor cells (IPCs) or $\text{Pax6}^+$ basal radial glia (bRGCs) that migrate into a subventricular zone ($\text{SVZ}$ / outer $\text{SVZ}$ [$\text{oSVZ}$]) to amplify neuron production symmetrically.

  

In non-avian reptiles (such as the turtle \textit{Trachemys scripta elegans} and gecko \textit{Paroedura picta}), the avian pallium of basal species, and the mammalian olfactory bulb (OB), neurogenesis is dominated by direct neurogenesis; notably, embryonic turtles possess apical and basal progenitors but have no detectable $\text{Eomes}^+$ ($\text{Tbr2}^+$) intermediate progenitors during developmental neurogenesis, and Notch activation displays a homogeneous pattern in lepidosaurs (geckos) versus a mosaic pattern in archosaurs (turtles/chicks) and mammals. Comparative functional manipulations across mouse, chick, and snake/turtle embryos demonstrate that this ancestral dNG regime is controlled by high $\text{Slit1/2--Robo1/2}$ signaling paired with low Delta-like 1 ($\text{Dll1}$) expression in aRGCs. Specifically, Slit ligands in the embryonic cerebrospinal fluid bind $\text{Robo1/Robo2}$ receptors on aRGCs, which induces expression of the Notch ligands Jagged1 ($\text{Jag1}$) and Jagged2 ($\text{Jag2}$) while repressing $\text{Dll1}$. Although overall canonical Notch downstream \textit{Hes5} mRNA levels remain identical between dNG (OB) and iNG (neocortical) territories, dynamic pulsating $\text{Dll1--Notch1}$ signaling drives \textit{Hes1} expression and IPC generation, whereas sustained $\text{Dll4/Jag1/2--Notch}$ signaling drives \textit{Hey1} and direct neuronal differentiation.

  

In the mouse neocortex, genetic fate-mapping (\textit{Tbr2-2A-Flp}, \textit{Tbr2-2A-CreER}) demonstrates that dNG generates $21.8\%$ of total cortical projection neurons (generating all major pyramidal classes—intratelencephalic [IT], pyramidal tract [PT], and corticothalamic [CT]—but weighted toward deep layers), whereas $\text{Tbr2}^+$ IPC-mediated iNG generates $78.2\%$ of cortical projection neurons along a ventral-to-dorsal-to-medial gradient, disproportionately amplifying and diversifying IT upper-layer ($\text{L2/3}$) associative networks. Forcing high $\text{Robo1/2}$ and low $\text{Dll1}$ ($\text{mR1/2} + \text{crDll1}$) or overexpressing $\text{Jag1}$ alone in the embryonic mouse neocortex switches progenitors to direct neurogenesis, depleting $\text{Cux1}^+$ upper-layer ($\text{L2/3}$) neurons and generating $3\text{- to }5\text{-fold}$ more $\text{Tbr1}^+/\text{Ctip2}^+$ deep-layer ($\text{L5/6}$) corticospinal neurons. Conversely, attenuating $\text{Robo1/2}$ and elevating $\text{Dll1}$ ($\text{dnR1/2} + \text{Dll1}$) in the chick dorsal pallium reduces dNG and expands $\text{Tbr2}^+$ IPCs. In humans, lineage-specific gene duplications (\textit{NOTCH2NLA/B/C}, \textit{ARHGAP11B}, \textit{SRGAP2C}) together with developmental \textit{Trnp1} downregulation and \textit{ASPM} maintenance further amplify the $\text{oSVZ}$ bRGC pool to drive cortical folding.

  

In birds, comparative morphometric and cell-cycle studies across galliforms (bobwhite quail \textit{Colinus virginianus}, chicken \textit{Gallus gallus}), waterfowl (ducks and geese, Anseriformes), songbirds (zebra finch \textit{Taeniopygia guttata}), and parrots (budgerigar \textit{Melopsittacus undulatus}, African grey parrots \textit{Psittacus erithacus} and \textit{Psittacus timneh}) show that telencephalic enlargement evolved via two distinct developmental strategies linked to precocial versus altricial life histories. Because precocial hatchlings must feed independently immediately after hatching, telencephalic neurogenesis is largely complete by hatching. Chickens achieve a brain more than twice as large as bobwhite quail by cycling progenitor cells faster before neurogenesis begins, expanding the founder neuroepithelial pool. Similarly, precocial waterfowl independently enlarged their telencephalon (specifically the trigeminal nucleus basalis–neostriatum feeding complex) prior to neurogenesis onset without forming a thick SVZ. Conversely, because altricial songbird and parrot hatchlings receive extended parental provisioning, parrots and songbirds delay the offset of telencephalic neurogenesis into the post-hatching juvenile period without delaying neurogenesis onset. As early post-mitotic mantle zone neurons accumulate and mechanically constrain tangential VZ expansion, proliferating progenitors emigrate into a thickened Subventricular Zone (SVZ) across both the striatum and the pallium (hyperpallium, mesopallium, nidopallium, hippocampus, and septum). This expanded SVZ—populated by non-INM mitotic progenitors and $\text{Tbr2}^+$ IPCs in corvids and parrots—drives massive post-hatching telencephalic growth and supports the developmental plasticity required for vocal learning.

  

\subsection{Cortical Epigenomic Dynamics and the Neurogenic-to-Gliogenic Switch}

  

In the developing mammalian cerebral cortex, single-cell RNA sequencing (scRNA-seq) and single-cell assay for transposase-accessible chromatin sequencing (scATAC-seq) across mid-gestation human cortex (PCW16–23 / GW18–26; GEO accession GSE162170) have mapped the cell-type-specific gene regulatory elements (GREs) and chromatin velocity trajectories governing corticogenesis. Advanced multiomic integration frameworks—including mmVelo (which maps spliced and unspliced transcriptional kinetics onto chromatin accessibility space), MaxFuse (which links cross-modal cell pairs via fuzzy smoothing on all-feature nearest-neighbor graphs and Hungarian linear assignment), and the Kernel-Debiased Sum-of-Squares ($\text{KD-SoS}$) spectral clustering estimator—enable rigorous longitudinal tracking of time-varying gene co-expression communities across developmental pseudotime. Specifically, for a sequence of adjacency matrices $A(s)$ over a temporal bandwidth $S(t; r) = T \cap [t-r, t+r]$ with diagonal node-degree matrix $D(s)$, the $\text{KD-SoS}$ estimator computes the debiased sum of squared adjacency matrices prior to eigendecomposition and Hungarian confusion-matrix alignment:

\begin{equation}

Z(t; r) = \sum_{s \in S(t; r)} \left\{ (A(s))^2 - D(s) \right\} = \widehat{U}(t; r) \widehat{\Lambda}(t; r) (\widehat{U}(t; r))^\top

\end{equation}

Mechanistic dissection of the developmental transition from neurogenesis to gliogenesis in forebrain radial glial cells ($\text{fRGCs}$, targeted via \textit{hGFAP-Cre} and \textit{Emx1-Cre} from E13.0–E16) reveals how cortical progenitors populate the brain with non-neuronal cells. As neurogenic Notch signaling and \textit{Neurog2} expression decline, extracellular signal-regulated kinase ($\text{ERK}$) signaling directly activates transcription of the Sonic Hedgehog ($\text{SHH}$) coreceptor genes \textit{Gas1}, \textit{Boc}, and \textit{Cdon}, sensitizing $\text{fRGCs}$ to $\text{SHH}$. Activated $\text{pERK}$ and $\text{SHH-GLI}$ transcriptional activators ($\text{GLI1}$ and $\text{GLI2A}$) cooperatively induce the expression of \textit{Egfr}, \textit{Ascl1}, and \textit{Olig2/1}, generating $\text{EGFR}^+\text{ASCL1}^+\text{OLIG2/1}^+$ tri-potent intermediate progenitor cells ($\text{Tri-IPCs}$) in the cortical ventricular and subventricular zones ($\text{VZ/SVZ}$), which subsequently diverge into astrocyte progenitor cells ($\text{APCs}$), oligodendrocyte progenitor cells ($\text{OPCs}$), and olfactory bulb interneuron progenitors ($\text{OBIN-IPCs}$).

  

\subsection{Resolving Pallial Homologies via Single-Cell and Spatial Transcriptomics: Lineage Divergence vs. Adult Transcriptional Convergence}

  

High-throughput single-cell/single-nucleus RNA sequencing (scRNA-seq/snRNA-seq) and spatial transcriptomics (Visium and HCR v3.0) across turtles (\textit{Trachemys scripta elegans}), lizards/geckos (\textit{Pogona vitticeps}, \textit{Paroedura picta}), chickens (\textit{Gallus gallus}, $142,429$ cells across $8$ embryonic stages from E6 to E19 plus adult), zebra and Bengalese finches (\textit{Taeniopygia guttata}, \textit{Lonchura striata domestica}), and mice have reconciled long-standing debates over pallial homology by showing that embryonic regional patterning transcription factors follow the tetrapartite/hexapartite model, whereas adult functional effector gene programs undergo substantial cross-pallial convergence (Table \ref{tab:evo_devo}).

  

Across all amniotes, glutamatergic neuron types of the medial pallium (hippocampal formation) are highly conserved. Similarly, pallial GABAergic interneurons originate from conserved subpallial ganglionic eminences (MGE, LGE, CGE) and migrate tangentially into the pallium: songbird HVC and RA share conserved MGE-derived fast-spiking parvalbumin ($\text{GABA-3}, \text{GABA-4} / \textit{Pvalb}$) and somatostatin ($\text{GABA-2} / \textit{Sst}$) interneurons, CGE-derived vasoactive intestinal peptide-like ($\text{GABA-5} / \textit{VIP}$) interneurons, and cholinergic ($\text{GABA-8}$) interneurons. However, two major quantitative shifts distinguish the avian pallium from the mammalian neocortex: in the chicken pallium ($109$ inhibitory clusters grouped into $17$ supertypes: $6$ LGE-like, $8$ MGE-like, $3$ CGE-like), CGE-derived interneurons constitute only $\sim 6\%$ of pallial GABAergic neurons, and in songbirds, the single most abundant pallial GABAergic class ($\text{GABA-1}$) consists of LGE-derived interneurons that cluster with striatal Area X LGE-class neurons and populate HVC and RA.

  

Among excitatory neurons, cross-amniote transcriptomic integration and enhancer-driven cell-type comparisons demonstrate that deep-layer and upper-layer mammalian cortical neuronal populations have direct molecular counterparts distributed across discrete nuclei of the avian DVR and hyperpallium. Notably, the chromatin organizer and transcription factor \textit{SATB2}—which specifies upper-layer callosal projection neurons in the mammalian neocortex—serves as a conserved, defining molecular marker for the avian lateral pallial mesopallium in both pigeons and chickens, while whole-transcriptome comparisons align avian mesopallial glutamatergic neurons with mammalian deep-layer cortical projection neurons. In non-avian reptiles (turtles and geckos), \textit{Satb1/Satb2} defines two subdivisions of the dorsal cortex and the pallial thickening (PT; prominent rostrocaudally in turtles, restricted rostrally as DCx-L2 in geckos), while co-expression of \textit{Satb1} and \textit{Ctip2} defines the anterior DVR (aDVR; segregated in geckos into a periventricular $\text{Satb1}^+$ medial aDVR [m-aDVR] homologous to the avian mesopallium and a $\text{Ctip2}^+$ lateral aDVR [l-aDVR]), and exclusive \textit{Ctip2} expression defines the posterior DVR (pDVR, alongside the gecko nucleus sphericus).

  

Furthermore, in the chicken embryo, early neurogenesis from E6 onward reflects distinct ontogenetic origins consistent with the tetrapartite pallium model: the hyperpallium (Wulst: apical hyperpallium [HA], intercalated hyperpallium [IHA], intermediate hyperpallium [HI], and densocellular hyperpallium [HD]) arises from the dorsal pallium, whereas the nidopallium arises from the ventral pallium with no tangential neuronal migration between them. Yet by late embryogenesis (E19) and adulthood, dorsal hyperpallial and ventral nidopallial glutamatergic neurons converge onto the same two major transcriptomic subclasses—$\text{Ex\_DACH2\_CALCR}$ ($6$ supertypes) and $\text{Ex\_DACH2\_SV2C}$ ($6$ supertypes)—becoming transcriptomically nearly indistinguishable. While primary thalamic input recipients show regional localization ($\text{Ex\_DACH2\_RORB}$ maps to primary sensory input zones of the nidopallium, and $\text{Ex\_DACH2\_TAC1}$ maps to the hyperpallial input zone IHA), the sensory-associated supertype $\text{Ex\_DACH2\_ZMAT4}$ is strongly expressed in both the nidopallium and hyperpallium. Within the associative $\text{Ex\_DACH2\_SV2C}$ subclass, supertypes $\text{Ex\_DACH2\_NR4A3}$ (enriched for activity-dependent genes), $\text{Ex\_DACH2\_GRIK4}$, and $\text{Ex\_DACH2\_ADAMTS5}$ contain clusters of entirely mixed dorsal (hyperpallial) and ventral (nidopallial) origin. Similarly, in the zebra and Bengalese finch song motor pathway ($\text{HVC\_Glut-1}$ to $\text{HVC\_Glut-5}$, where $\text{HVC\_Glut-1}$ and activity-dependent $\text{HVC\_Glut-4}$ express \textit{GFRA1} and \textit{UTS2B} and project to RA; and $\text{RA\_Glut-1}$ [\textit{COL6A3}], $\text{RA\_Glut-2}$ [\textit{ADAMTS18}], and $\text{RA\_Glut-3}$ [\textit{NFATC1}]), glutamatergic neurons engage ventral pallial transcription factor networks (aligning with mammalian pallial amygdala and olfactory areas) when only transcription factors are compared, but exhibit neocortical-like effector gene expression profiles when all genes are compared.

  

\subsection{Multimodal 3D Dendritic Allometry in the Pigeon Pallium and E--MVL Columnar Microcircuitry}

  

By combining Nissl cytoarchitectonics across $25\text{--}27$ lateromedial sagittal planes, 3D Golgi–Cox reconstructions ($n = 64$ fully traced neurons), and snRNA-seq gene module profiling in the rock pigeon (\textit{Columba livia}), quantitative morphological analysis establishes the structural hierarchy of the avian telencephalon across five major regions (Table \ref{tab:evo_devo}). DVR-associated associative regions exhibit the longest dendritic trees and highest branching complexity (number of bifurcations, branches, terminal points, and dendritic field area): the Nidopallium Caudolaterale (NCL, executive prefrontal analog in the core DVR) averages $2,060.67 \pm 152.07\ \mu\text{m}$ in total dendritic length and expresses a specialized neuron-morphogenesis, synaptic, and cytoskeletal gene module whose activity correlates directly with dendritic field size and parallels the mammalian prefrontal cortex (PFC), followed by the Mesopallium (MesoP) at $1,767.97 \pm 124.18\ \mu\text{m}$. The dorsal pallial Hyperpallium Apicale (HA) displays intermediate dendritic length ($1,190.28 \pm 107.21\ \mu\text{m}$), whereas the Hippocampus (Hp: $904.40 \pm 106.51\ \mu\text{m}$) and Subpallium (SubP: $850.25 \pm 81.62\ \mu\text{m}$) display much shorter dendritic arbors (with homing pigeons additionally showing an $\sim 30\%$ reduction in dorsomedial hippocampal total neuron and soma volume compared to feral pigeons, facilitating higher neuronal packing density).

  

Furthermore, viral tracing (HSV), immunofluorescence, and electrophysiological recordings in the pigeon visual DVR demonstrate that the Entopallium (Ento / internal entopallium Ei) and Mesopallium Ventrolaterale (MVL) form an orthogonal columnar microcircuit along the vertical axis. Ento co-expresses $\text{SATB2}$ and $\text{CTIP2}$ (paralleling mammalian neocortical layer IV thalamic recipient function and layer V marker profiles), whereas MVL exhibits a $\text{SATB2}$-enriched profile matching mammalian upper layers II/III. In both Ei ($326.8\ \text{PV}^+\text{ cells/mm}^2$) and MVL, excitatory parvalbumin-positive neurons ($\text{PV}^+\text{CaMKII}^+$) significantly outnumber inhibitory $\text{PV}^+\text{GABA}^+$ neurons (overall pigeon visual DVR: $\text{CaMKII}^+ = 347.4\text{ cells/mm}^2$, $\text{GABA}^+ = 110.6\text{ cells/mm}^2$, compared to mouse V1 where $\text{CaMKII}^+ = 1,020\text{ cells/mm}^2$ and $\text{GABA}^+ = 211.4\text{ cells/mm}^2$). These fast-spiking excitatory $\text{PV}^+$ projection neurons in Ei (action potential $\text{FWHM} = 0.22 \pm 0.003\text{ ms}$) project directly onto MVL $\text{SATB2}^+$ neurons to drive hierarchical visual motion and looming object recognition.

  

\begin{longtable}{p{0.14\textwidth}p{0.18\textwidth}p{0.18\textwidth}p{0.16\textwidth}p{0.18\textwidth}p{0.12\textwidth}}

\caption{Comparative developmental origins, single-cell transcriptomic identities, and 3D Golgi–Cox dendritic lengths across amniote telencephalic subdivisions.} \label{tab:evo_devo} \\

\toprule

\textbf{Amniote Pallial Sector} & \textbf{Mammalian Derivative} & \textbf{Non-Avian Reptilian Derivative} & \textbf{Avian Derivative} & \textbf{Key Molecular \& Single-Cell Markers} & \textbf{Pigeon Dendritic Length ($\mu\text{m}$)} \\

\midrule

\endfirsthead

\toprule

\textbf{Amniote Pallial Sector} & \textbf{Mammalian Derivative} & \textbf{Non-Avian Reptilian Derivative} & \textbf{Avian Derivative} & \textbf{Key Molecular \& Single-Cell Markers} & \textbf{Pigeon Dendritic Length ($\mu\text{m}$)} \\

\midrule

\endhead

\bottomrule

\endfoot

Medial Pallium (MP) & Hippocampal Formation (DG, CA1--CA3, Subiculum) & Medial Cortex (MCx) & Hippocampus (Hp; dorsomedial \& dorsolateral) & Conserved glutamatergic repertoires across all amniotes & Hp: $904.40 \pm 106.51\ \mu\text{m}$ \\

Dorsal Pallium (DP) & 6-Layered Neocortex ($78.2\%$ iNG $\text{Tbr2}^+$ IPC-derived; L2--6) & 3-Layered Dorsal Cortex (DCx; two \textit{Satb1/2} subdivisions) + Pallial Thickening (PT) & Hyperpallium / Wulst (HA, IHA, HI, HD) & IHA input: $\text{Ex\_DACH2\_TAC1}$, $\text{Ex\_DACH2\_ZMAT4}$; Associative: $\text{Ex\_DACH2\_SV2C}$ & HA: $1,190.28 \pm 107.21\ \mu\text{m}$ \\

Lateral Pallium (LP) & Insular Cortex \& Claustrum & Lateral Cortex (LCx; $\text{Reelin}^+, \text{Meis2}^+$) + Medial aDVR ($\text{Satb1}^+$) & Mesopallium (MesoP: MD, MV, MVL) & Strong \textit{SATB2} enrichment; homologous to mammalian deep-layer cortical neurons & MesoP: $1,767.97 \pm 124.18\ \mu\text{m}$ \\

Ventral Pallium (VP) & Piriform Cortex \& Anterior Pallial Amygdala & Anterior DVR (aDVR; co-expresses \textit{Satb1} + \textit{Ctip2}) & Nidopallium (NCL, HVC, LMAN) \& Entopallium (Ento/Ei) & Input: $\text{Ex\_DACH2\_RORB}$; Convergent: $\text{Ex\_DACH2\_SV2C}$; Ento: $\text{SATB2}^+/\text{CTIP2}^+$ \& Excitatory $\text{PV}^+\text{CaMKII}^+$ & NCL: $2,060.67 \pm 152.07\ \mu\text{m}$ ($\text{HVC}_{(\text{RA})}$: $3,200\ \mu\text{m}$) \\

Caudoventral Pallium (CVP) & Posterior Pallial Amygdala & Posterior DVR (pDVR; exclusive \textit{Ctip2}, lacks \textit{Satb1}) \& Nucleus Sphericus & Arcopallium (RA, AId, AD) & $\text{RA\_Glut-1}$ (\textit{COL6A3}), $\text{RA\_Glut-2}$ (\textit{ADAMTS18}), $\text{RA\_Glut-3}$ (\textit{NFATC1}), \textit{KCNC1} ($\text{Kv3.1}$), \textit{SCN4B} ($\text{Nav}\beta4$) & AId/RAPN: Restricted within $\sim 200\ \mu\text{m}$ radius of soma \\

Subpallium (SubP) & Striatum, Pallidum, Septum, MGE/LGE/CGE & Striatum, Pallidum, Septum & Striatum (MSt, Area X, LPO), Pallidum (GP), Septum & MSNs; expanded $\text{GABA-1}$ LGE-class interneurons; CGE only $\sim 6\%$ & SubP: $850.25 \pm 81.62\ \mu\text{m}$ \\

\end{longtable}

  

\section{Glial Cytoarchitecture, Perineuronal Satellitosis, Extracellular Matrix Nets, and Tri-Compartment Potassium Homeostasis}

  

Packing two to three times more neurons into a given volume of pallial tissue while maintaining a non-neuronal-to-neuronal scaling ratio shared between birds and mammals across the pallium, cerebellum, and rest of the brain requires a fundamental reorganization of neuroglial and extracellular matrix (ECM) cytoarchitecture.

  

\subsection{Apomorphic Withdrawal of Constitutive GFAP and Glutamine Synthetase Astroglial Identity}

  

In the mammalian cerebral cortex, astrocytes are abundant in layers I–III and white matter, extending highly branched processes containing glial fibrillary acidic protein (GFAP) with varicosities that envelop synapses and blood vessels (although evolutionary newer middle cortical layers II–IV and layer V show reduced baseline GFAP compared to layer I and white matter). Comparative immunohistochemical mapping across cartilaginous fishes, ray-finned fishes, reptiles, birds, and mammals demonstrates that the absence of baseline GFAP immunoreactivity in expanded forebrain territories is a convergent, derived (apomorphic) trait that evolved independently in advanced Type II (``elaborated'') brains characterized by thickened walls, reduced ventricles, and extensive neuronal migration.

  

In domestic chickens (\textit{Gallus gallus domesticus}), Japanese quail (\textit{Coturnix japonica}), king quail (\textit{Excalfactoria chinensis}), Muscovy ducks (\textit{Cairina moschata domestica}), and domestic pigeons (\textit{Columba livia domestica})—representing the older evolutionary lineages Galloanserae and Columbiformes—major associative pallial zones (hyperpallium, mesopallium, nidopallium, and striatum) are already largely devoid of baseline GFAP (and cerebellar Bergmann glia are GFAP-immunonegative), whereas the entopallium (primary visual center), globus pallidus, nucleus basalis, and nucleus accumbens remain constitutively $\text{GFAP}^+$. However, in more recently diverged core land birds—specifically Passeriformes (zebra finch \textit{Taeniopygia guttata}, Gouldian finch \textit{Erythrura gouldiae}, Eurasian magpie \textit{Pica pica}, and Southern house wren \textit{Troglodytes aedon}) and Psittaciformes (budgerigar \textit{Melopsittacus undulatus} and cockatiel \textit{Nymphicus hollandicus})—even the entopallium lacks baseline GFAP immunoreactivity.

  

In a comparative morphometric and 3D Sholl analysis of the Southern house wren (\textit{Troglodytes aedon}) song circuit (HVC, RA, Area X, LMAN) versus the human speech circuit (Laryngeal Motor Cortex [LMC] and striatum), $\text{GFAP}^+$ astrocytes constitute only $0.9\%$ of all telencephalic astrocytes in avian scRNA-seq datasets. Within the wren telencephalon, classical $\text{GFAP}^+$ astrocytic morphology is absent from the core vocal nuclei (HVC, RA, LMAN, Area X), localizing instead to perivascular sheaths, the laminar edge of the pallium (LEP, where they have enlarged somas and short processes), and white matter tracts such as the fasciculus prosencephali lateralis (FPL, where they exhibit elongated fibrous processes), and exhibiting significantly fewer 3D Sholl intersections and shorter maximum branch lengths than human cortical and striatal $\text{GFAP}^+$ astrocytes (where human striatal $\text{GFAP}^+$ astrocytes exhibit significantly more Sholl intersections at $15\text{--}45\ \mu\text{m}$ from the soma than layer V cortical astrocytes, $p < 0.001$).

  

Crucially, the absence of GFAP immunoreactivity in the avian nidopallium, mesopallium, and song nuclei does not signify an absence of astrocytes. When stained for glutamine synthetase ($\text{GS}^+$—the key enzyme for glutamate detoxification and ammonia assimilation) or S-100 protein, dense, homogeneous populations of protoplasmic astrocytes are visualized throughout the entire avian pallium and all vocal nuclei (HVC, RA, Area X, LMAN) as well as across all six layers (I–VI) of the human LMC and striatum. The average number of primary processes on $\text{GS}^+$ astrocytes is comparable between human LMC and wren RA, and between human striatum and wren Area X, with wren RA $\text{GS}^+$ astrocytes possessing a higher number of primary processes than those in HVC, LMAN, or Area X, and LMAN containing the highest number of $\text{GS}^+$ astrocyte somata. Moreover, mechanical stab-wound lesions in $\text{GFAP}$-immunonegative entopallia or pallial regions rapidly induce robust reactive gliosis (expressing both GFAP and vimentin), proving that resident avian astrocytes retain the latent genetic capacity to express GFAP upon injury. In focal microlesion models of the songbird vocal circuit (HVC, RA, and Area X), mixed-effects modeling demonstrates significant main effects of brain region ($p < 0.0001$) and neuroprotective treatment ($p = 0.0004$), as well as $\text{Region} \times \text{Lesion}$ ($p = 0.0039$) and $\text{Region} \times \text{Treatment}$ ($p = 0.006$) interactions on $\text{GS}^+/\text{Hoechst}^+$ astrocyte populations. Administration of cannabidiol (CBD) suppresses cleaved caspase-3 ($\text{CC3}^+$) apoptotic signaling in $\text{GS}^+$ astrocytes, significantly increasing preserved $\text{GS}^+$ astrocyte percentages on the lesioned side of HVC (vehicle $12.92\%$ vs. CBD $18.25\%$, 95\% CI $[-7.85\%, -2.81\%], p = 0.0003$) and across both hemispheres in RA (lesioned side: vehicle $12.16\%$ vs. CBD $19.96\%$, 95\% CI $[-8.17\%, -0.51\%]$).

  

The evolutionary advantage of suppressing constitutive GFAP intermediate filament bundles in the avian pallium lies in both metabolic and volumetric economy: replacing bulky, rigid $\text{GFAP}^+$ cytoskeletons with slender, $\text{GFAP}^-/\text{GS}^+$ protoplasmic processes saves protein-synthesis energy and minimizes the glial steric volume fraction, freeing physical space to pack small neurons at primate-surpassing densities while preserving high-capacity enzymatic glutamate-glutamine cycling.

  

\subsection{Physiological Perineuronal Satellitosis, Perineuronal Glial Clusters (PGCs), and Perineuronal Nets (PNNs)}

  

To compensate for compact astrocytic arbors and support the high metabolic turnover of densely packed pallial neurons, birds rely extensively on physiological perineuronal satellitosis (NS)—the direct apposition of satellite neuroglia (predominantly oligodendroglial and metabolic support glia) within the $6\text{-}\mu\text{m}$-wide perineuronal space against the neuronal perikaryon. While perineuronal satellitosis in mammalian neuropathology is frequently interpreted as an indicator of neuronal degeneration, histological grading across $49$ neurologically healthy adult wild and domestic birds (euthanized via $2\%$ isoflurane and $2\text{ mL/kg}$ intravenous sodium pentobarbital; all confirmed RT-qPCR negative for West Nile Virus and Usutu Virus) spanning $8$ taxonomic groups—Nocturnal raptors ($n = 14$, \textit{Athene noctua}, \textit{Strix} spp.), Passeriformes ($n = 14$, \textit{Serinus canaria}, \textit{Turdus merula}, \textit{Pica pica}, \textit{Garrulus glandarius}, \textit{Taeniopygia guttata}, \textit{Corvus moneduloides}), Diurnal raptors ($n = 11$, \textit{Accipiter nisus}, \textit{Falco}, \textit{Buteo} spp.), Charadriiformes ($n = 4$), Anseriformes ($n = 2$), Columbiformes ($n = 2$), Pelecaniformes ($n = 1$), and Piciformes ($n = 1$, \textit{Picus viridis})—demonstrates that NS is a constitutive anatomical feature of the healthy avian telencephalon (Table \ref{tab:satellitosis}).

  

When scored across $10$ randomly selected high-power fields ($\text{FN22}/40\times$) as Grade 0 ($>60\%$ of neurons with $0\text{--}1$ satellite glia), Grade 1 (mild: $>60\%$ with $2\text{--}3$ glia/neuron), Grade 2 (moderate: $4\text{--}6$ glia/neuron), and Grade 3 (marked Perineuronal Glial Clusters [PGCs]: $>6$ glia/neuron), NS is present in $97.9\%$ ($48/49$) of healthy birds in both the mesopallium dorsale (MD: Grade 1 $39.5\%$ [$n = 19/48$], Grade 2 $31.0\%$ [$n = 15/48$], Grade 3 $29.0\%$ [$n = 14/48$]) and the hyperpallium densocellulare (HD: Grade 1 $48.0\%$ [$n = 23/48$], Grade 2 $23.0\%$ [$n = 11/48$], Grade 3 $29.0\%$ [$n = 14/48$]). Furthermore, satellitosis grade correlates directly with phylogenetic cognitive and metabolic specialization: diurnal raptors such as the Eurasian sparrowhawk (\textit{Accipiter nisus}) exhibit Grade 0/low satellitosis in the mesopallium, Piciformes such as the European green woodpecker (\textit{Picus viridis}) display Grade 1 ($2\text{--}3$ satellite cells), and Passeriformes—such as the canary (\textit{Serinus canaria}, Grade 2), common blackbird (\textit{Turdus merula}, Grade 3), zebra finch (\textit{Taeniopygia guttata}), and New Caledonian crow (\textit{Corvus moneduloides})—exhibit the highest grades of dense perineuronal glial clustering across all avian orders (Kruskal–Wallis test in HD: $H(7) = 33.408, p < 0.001$; pairwise Bonferroni-adjusted comparisons show Passeriformes significantly exceed diurnal raptors [$p < 0.01$] and nocturnal raptors, with no difference between wild and captive passerines [$p > 0.05$]). Placing satellite glia directly against the neuronal perikaryon minimizes metabolite diffusion distances for lactate, glutamine, and ion shuttling in high-density pallial nuclei.

  

\begin{longtable}{p{0.20\textwidth}p{0.18\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.11\textwidth}p{0.14\textwidth}}

\caption{Regional distribution and severity grading of physiological perineuronal satellitosis across the healthy avian telencephalon ($n = 49$ birds).} \label{tab:satellitosis} \\

\toprule

\textbf{Avian Telencephalic Subdivision} & \textbf{Homologous / Analogous Mammalian Structure} & \textbf{Prevalence ($n/N$, \%)} & \textbf{Grade 1 ($2\text{--}3$ glia)} & \textbf{Grade 2 ($4\text{--}6$ glia)} & \textbf{Grade 3 ($>6$ glia, PGCs)} & \textbf{Taxonomic \& Functional Association} \\

\midrule

\endfirsthead

\toprule

\textbf{Avian Telencephalic Subdivision} & \textbf{Homologous / Analogous Mammalian Structure} & \textbf{Prevalence ($n/N$, \%)} & \textbf{Grade 1 ($2\text{--}3$ glia)} & \textbf{Grade 2 ($4\text{--}6$ glia)} & \textbf{Grade 3 ($>6$ glia, PGCs)} & \textbf{Taxonomic \& Functional Association} \\

\midrule

\endhead

\bottomrule

\endfoot

Hyperpallium densocellulare (HD) & Primary somatosensory / motor neocortex & $48 / 49$ ($97.9\%$) & $23 / 48$ ($48.0\%$) & $11 / 48$ ($23.0\%$) & $14 / 48$ ($29.0\%$) & Highest grade in Passeriformes ($H(7) = 33.408, p < 0.001$; vs. diurnal raptors $p < 0.01$) \\

Mesopallium dorsale (MD) & Associative neocortex & $48 / 49$ ($97.9\%$) & $19 / 48$ ($39.5\%$) & $15 / 48$ ($31.0\%$) & $14 / 48$ ($29.0\%$) & Prominent PGCs in Passeriformes (\textit{Turdus merula}, corvids) \& nocturnal raptors \\

Mesopallium ventrale (MV) & Associative visual / auditory / social cortex & $47 / 49$ ($95.9\%$) & Predominant (Grades 1--2) & Common (Grades 1--2) & Present in passerines & Associated with high visual/auditory metabolic demand \\

Hyperpallium intercalatum (HI) & Thalamic-recipient / tangential Wulst zone & $46 / 49$ ($93.9\%$) & $29 / 46$ ($63.0\%$) & $17 / 46$ ($37.0\%$) & $0 / 46$ ($0.0\%$) & Intermediate somatosensory relay \\

Entopallium (E) & Primary tectofugal visual area & $46 / 49$ ($93.9\%$) & $37 / 46$ ($80.4\%$) & $8 / 46$ ($17.3\%$) & $1 / 46$ ($2.3\%$) & High awake glucose uptake on PET \\

Nidopallium (N) & Prefrontal / associative pallium & $45 / 49$ ($91.8\%$) & Predominant & Rare & --- & Broad executive and integrative territory \\

Hyperpallium apicale (HA) & Corticofugal output Wulst & $41 / 49$ ($83.7\%$) & Most representative & --- & --- & Descending motor/somatosensory output \\

Basal Ganglia / Striatum & Striatum / Pallidum & $45 / 47$ ($95.7\%$) & Most common & $2 / 47$ ($4.0\%$) & $0 / 47$ ($0.0\%$) & Uniform mild satellite support \\

Olfactory Cortex & Piriform cortex & $45 / 45$ ($100.0\%$) & $42 / 45$ ($93.0\%$) & $3 / 45$ ($6.6\%$) & $0 / 45$ ($0.0\%$) & Low-grade baseline glial apposition \\

\end{longtable}

  

Directly encapsulating the soma and proximal dendrites of fast-spiking $\text{Kv3.1b}^+$ and parvalbumin-positive ($\text{PV}^+$, which constitute $5\text{--}15\%$ of $\text{DAPI}^+$ nuclei across song nuclei) neurons in both birds and mammals are Perineuronal Nets (PNNs)—lattice-like condensations of chondroitin sulfate proteoglycans (CSPGs: aggrecan, brevican, neurocan, versican, and phosphacan) non-covalently linked to hyaluronan via link proteins and cross-linked by tenascin-R (surrounding $1\text{--}8\%$ of total $\text{DAPI}^+$ cells, with $3\text{--}30\%$ of $\text{PV}^+$ cells bearing PNNs and $12\text{--}87\%$ of PNNs surrounding $\text{PV}^+$ cells). Because CSPG glycosaminoglycan chains carry dense negative sulfate and carboxyl charges (shifting from chondroitin-6-sulfate [C6S] in juveniles to chondroitin-4-sulfate [C4S] in adults), PNNs establish a local Donnan equilibrium in the perisomatic microenvironment. This polyanionic matrix acts as a stationary cation exchanger that prevents the free diffusion of $\text{K}^+$ and $\text{Na}^+$ ions during ultrafast $\text{Kv3.1b}$-mediated spike trains, laterally compartmentalizes AMPA receptors to prevent desensitization, and sequesters redox-active metal cations ($\text{Fe}^{2+/3+}, \text{Cu}^{2+}$) to shield metabolically active neurons from Fenton-reaction oxidative stress.

  

In zebra finches and canaries (\textit{Serinus canaria}), PNN density and $\%(\text{PNN}+\text{PV})$ co-localization in HVC and RA (as well as $\%\text{PNN}$ in Area X [$p = 0.023$], $\%(\text{PNN}+\text{PV})$ in LMAN [$p = 0.047$], and $\%\text{PV}$ in RA [$p < 0.005$]) are significantly higher in singing males than in non-singing females (whereas the auditory midbrain nucleus MLd shows the opposite sex difference: females $>$ males) and increase at juvenile song crystallization and in response to testosterone. Bilateral enzymatic degradation of PNNs in adult male canary HVC via chondroitinase ABC (ChABC)—which reduces HVC $\%\text{PV}$ with PNN ($t_{10} = 3.27, p = 0.0085$) and tends to lower HVC PNN density ($t_{10} = 2.13, p = 0.0593$) without altering $\text{PV}^+$ cell density ($t_{10} = 0.23, p = 0.8246$)—triggers a transsynaptic reduction in downstream RA PNN density ($t_{10} = 2.41, p = 0.0364$) and RA $\%\text{PV}$ with PNN ($t_{10} = 2.30, p = 0.0444$) while leaving Area X unaffected ($p > 0.38$).

  

\subsection{Parameterized Tri-Compartment Neuroglial Potassium ($\text{K}^+$) Clearance Model: Mammalian ($37\ ^\circ\text{C}$) vs. Avian ($41\ ^\circ\text{C}$) Pallium}

  

Rapid action potential firing at $40\text{--}41\ ^\circ\text{C}$ ($300\text{--}600\text{ Hz}$ in RAPNs and HVC) within tightly packed avian cell clusters ejects substantial quantities of $\text{K}^+$ into a narrow extracellular space (ECS, volume fraction $\alpha \approx 0.20$, tortuosity $\lambda \approx 1.6$), threatening to depolarize neighboring axons and induce spreading depression or seizure activity. Maintaining extracellular potassium ($[\text{K}^+]_o$) homeostasis requires a coordinated tri-compartment buffering system integrating astroglial inward-rectifying potassium channels ($\text{Kir4.1}$, encoded by \textit{KCNJ10}), water-specific Aquaporin-4 ($\text{AQP4}$) channels, $\text{Na}^+/\text{K}^+$-ATPase pumps, and polyanionic PNNs.

  

In both mammalian and avian brains, $\text{Kir4.1}$ (which migrates on immunoblots as an $\sim 85\text{ kDa}$ dimer and $\sim 200\text{ kDa}$ tetramer) is functionally coupled with Aquaporin-4 ($\text{AQP4}$, a $30\text{--}32\text{ kDa}$ monomer forming $\sim 100\text{ kDa}$ tetramers with six tilted transmembrane $\alpha$-helices and dual asparagine-proline-alanine [NPA] loops creating a $3\text{--}6\text{ nm}$ water-selective pore). While teleost fish express $\text{AQP4}$ unpolarized along radial glial processes, both avian and mammalian astrocytes polarize $\text{AQP4}$ into orthogonal arrays of particles (OAPs, anchored via agrin and $\alpha_1$-syntrophin/dystrophin complexes) at perivascular and subpial endfeet as well as perisynaptic processes (and across the inner plexiform and outer limiting membranes of avascular chick retinal Müller glia). This osmotically couples $\text{Kir4.1}$-mediated $\text{K}^+$ siphoning with bidirectional water flux, modulating extracellular volume and facilitating BDNF-TrkB/CREB-dependent long-term potentiation (LTP) and structural plasticity.

  

To evaluate how avian physiological temperature ($40.4\text{--}41.5\ ^\circ\text{C}$) and compact $\text{GFAP}^-/\text{GS}^+$ perineuronal satellite glia affect $[\text{K}^+]_o$ buffering compared to mammalian cortical astrocytes at $37.0\ ^\circ\text{C}$, we parameterize the tri-compartment neuroglial potassium and sodium cycle dynamical model across the Neuronal ($\text{Vol}_N$), Extracellular ($\text{Vol}_0$), and Astrocytic ($\text{Vol}_A$) compartments (integrated via 4th-order Runge–Kutta at $\Delta t = 0.1\text{ ms}$). The neuronal equilibrium potentials for potassium ($V_{\text{KN}}$) and sodium ($V_{\text{NaN}}$) evolve dynamically according to the Nernst relations:

\begin{equation}

V_{\text{KN}} = \frac{RT}{F} \ln\left(\frac{K_0}{K_N}\right), \qquad V_{\text{NaN}} = \frac{RT}{F} \ln\left(\frac{\text{Na}_0}{\text{Na}_N}\right)

\end{equation}

The astrocytic membrane potential $V_A$ (resting $V_{\text{rest}A} = -80\text{ mV}$, vs. neuronal $V_{\text{rest}N} = -70\text{ mV}$; resting concentrations $[\text{K}^+]_N = [\text{K}^+]_A = 135\text{ mM}$, $[\text{K}^+]_0 = 2.5\text{ mM}$, $[\text{Na}^+]_N = [\text{Na}^+]_A = 12\text{ mM}$, $[\text{Na}^+]_0 = 116\text{ mM}$) evolves according to:

\begin{equation}

C_A \frac{dV_A}{dt} = -\left(I_{\text{Kir}} + I_{lA}\right), \qquad I_{lA} = g_{lA}\left(V_A - V_{lA}\right)

\end{equation}

where $g_{lA} = G_{\text{Kir}}/6$, and the total astroglial $\text{Kir4.1}$ current ($I_{\text{Kir}}$) is a function of the astrocyte membrane potential ($V_A$), the astrocytic potassium Nernst potential ($V_{\text{KA}}$), the square root of extracellular potassium concentration ($\sqrt{K_0}$), and a Boltzmann open/close partition function:

\begin{equation}

I_{\text{Kir}} = G_{\text{Kir}} \sqrt{K_0} \frac{V_A - V_{\text{KA}} - V_{A1}}{1 + \exp\left(\frac{V_A - V_{\text{KA}} - V_{A2}}{V_{A3}}\right)}

\end{equation}

Empirically calibrated against whole-cell recordings at baseline $K_0 = 3\text{ mM}$ and astrocytic resting potential $V_{\text{rest}A} = -80\text{ mV}$, the equilibrium parameters are $V_{A1} = V_{\text{rest}A} - 26\ln(3/145) = -14.83\text{ mV}$, $V_{A2} = 34.0\text{ mV}$ (or $-105.82\text{ mV}$ depending on sign convention), and $V_{A3} = 19.23\text{ mV}$. The characteristic relaxation time constant $\tau_A$ for $\text{Kir4.1}$-mediated equilibrium return is:

\begin{equation}

\tau_A \approx \frac{C_A \left[1 + \exp\left(\frac{V_A - V_{\text{KA}} - V_{A2}}{V_{A3}}\right)\right]}{G_{\text{Kir}} \sqrt{K_0}}

\end{equation}

Simultaneously, the electrogenic $\text{Na}^+/\text{K}^+$ pump current $i_{\text{pump},k}$ for compartment $k \in \{N, A\}$ and the coupled three-compartment $\text{Na}^+$ mass-balance differential equations are given by:

\begin{equation}

i_{\text{pump},k} = i_{\max,k} \left(1 + \frac{7.3}{K_0}\right)^{-2} \left(1 + \frac{10}{\text{Na}_k}\right)^{-3} \quad \text{for } k \in \{N, A\}

\end{equation}

\begin{equation}

\frac{d\text{Na}_0}{dt} = i_{\text{Na}} + i_{\text{Na}lN} + 3 i_{\text{pump}N} + 3 i_{\text{pump}A} + i_{\text{Na}lA}

\end{equation}

\begin{equation}

\frac{d\text{Na}_N}{dt} = \left(-i_{\text{Na}} - 3 i_{\text{pump}N} - i_{\text{Na}lN}\right)\frac{\text{Vol}_0}{\text{Vol}_N}, \qquad \frac{d\text{Na}_A}{dt} = \left(-i_{\text{Na}lA} - 3 i_{\text{pump}A}\right)\frac{\text{Vol}_0}{\text{Vol}_A}

\end{equation}

At rest ($K_0 = 2.5\text{--}3.0\text{ mM}$), $I_{\text{Kir}}$ vanishes near $-80\text{ mV}$ or mediates a slight outward $\text{K}^+$ current that counterbalances inward $\text{Na}^+/\text{K}^+$-ATPase pumping. During a single afferent stimulation, astrocytic $\text{Na}^+/\text{K}^+$-ATPase flux rises and outward $\text{Kir4.1}$ flux drops, synergistically doubling net astrocytic $\text{K}^+$ uptake ($0.6\text{ a.u.}$ combined vs. $0.3\text{ a.u.}$ for $\text{Na}^+/\text{K}^+$-ATPase alone). During repetitive high-frequency stimulation ($10\text{ Hz}$ for $30\text{ s}$) when $K_0$ climbs to $5\text{--}10\text{ mM}$, $\text{Kir4.1}$ flux reverses strongly inward, providing $\sim 35\%$ of total astrocytic $\text{K}^+$ influx and driving the rapid phase of $[\text{K}^+]_o$ clearance, while neuronal $\text{Na}^+/\text{K}^+$-ATPase activity requires $\sim 10\text{ s}$ to slowly restore intracellular neuronal $[\text{K}^+]_i$. Conditional glial knockout of $\text{Kir4.1}$ ($\tau_{\text{rec}} = 500\text{ ms}, \tau_{\text{inact}} = 160\text{ ms}$) or pharmacological and siRNA inhibition not only impairs $\text{K}^+$ buffering during $3\text{--}10\text{ Hz}$ theta rhythmic activity, but also depolarizes the astrocyte and reduces GLT-1-mediated glutamate uptake by $33.1\%$ to $57.0\%$, while shifting $\text{Kir4.1}$ localization from astrocytic processes to the soma during ischemia and disrupting PI3K/AKT/mTORC1 survival signaling.

  

Elevating brain operating temperature from the mammalian $37.0\ ^\circ\text{C}$ ($310.15\text{ K}$, thermal voltage $RT/F = 26.727\text{ mV}$) to the avian $41.0\ ^\circ\text{C}$ ($314.15\text{ K}$, $RT/F = 27.071\text{ mV}$) shifts the basal potassium Nernst potential $V_K$ from $-106.61\text{ mV}$ to $-107.98\text{ mV}$ ($-107.78\text{ mV}$ at $40.4\ ^\circ\text{C}$; $-108.16\text{ mV}$ at $41.5\ ^\circ\text{C}$) and increases maximal $\text{Na}^+/\text{K}^+$-ATPase catalytic turnover ($Q_{10,\text{pump}} \approx 2.1$) by $1.346\times$ ($1.287\times$ at $40.4\ ^\circ\text{C}$; $1.396\times$ at $41.5\ ^\circ\text{C}$) and $\text{Kir4.1}$ unitary conductance ($Q_{10,\text{Kir}} \approx 1.35$) by $1.128\times$. Simultaneously, modeling the slender $\text{GFAP}^-/\text{GS}^+$ avian perineuronal satellite glial cell with a reduced membrane capacitance ($C_{A,\text{av}} \approx 9.5\text{ pF}$) compared to the larger, heavily branched $\text{GFAP}^+$ mammalian astrocyte ($C_{A,\text{mam}} \approx 15.0\text{ pF}$) increases peak $\text{Kir4.1}$ uptake current by $13.1\%$ to $35.2\%$ and shortens the astrocytic potassium clearance time constant $\tau_A$ by $42.1\%$ to $43.7\%$ across basal ($2.5\text{ mM}$) to tetanic ($10.0\text{ mM}$) $[\text{K}^+]_o$ loads (Table \ref{tab:kir41_model}), accelerating local potassium buffering around active synapses.

  

\begin{longtable}{p{0.28\textwidth}p{0.24\textwidth}p{0.24\textwidth}p{0.18\textwidth}}

\caption{Parameterization and simulation outputs of the tri-compartment neuroglial potassium clearance model in mammalian ($37.0\ ^\circ\text{C}$) vs. avian ($41.0\ ^\circ\text{C}$) pallial microenvironments.} \label{tab:kir41_model} \\

\toprule

\textbf{Model Parameter / Simulation Output} & \textbf{Mammalian Cortical Astrocyte ($37.0\ ^\circ\text{C}$, $\text{GFAP}^+/\text{GS}^+$)} & \textbf{Avian Pallial Satellite Glia ($41.0\ ^\circ\text{C}$, $\text{GFAP}^-/\text{GS}^+$)} & \textbf{Cross-Clade Biophysical Shift} \\

\midrule

\endfirsthead

\toprule

\textbf{Model Parameter / Simulation Output} & \textbf{Mammalian Cortical Astrocyte ($37.0\ ^\circ\text{C}$, $\text{GFAP}^+/\text{GS}^+$)} & \textbf{Avian Pallial Satellite Glia ($41.0\ ^\circ\text{C}$, $\text{GFAP}^-/\text{GS}^+$)} & \textbf{Cross-Clade Biophysical Shift} \\

\midrule

\endhead

\bottomrule

\endfoot

Thermal Voltage ($RT/F$, $\text{mV}$) & $26.727\text{ mV}$ & $27.071\text{ mV}$ & $+1.29\%$ Nernst scaling \\

Resting Equilibrium Potentials ($V_K$ / $V_{\text{Na}}$, $\text{mV}$) & $-106.61\text{ mV}$ / $+60.63\text{ mV}$ & $-107.98\text{ mV}$ / $+61.41\text{ mV}$ & Deeper hyperpolarizing $\text{K}^+$ driving force \\

Astrocytic Capacitance ($C_A$, $\text{pF}$) \& $\text{Kir4.1}$ Conductance ($G_{\text{Kir}}$, $\text{pS}$) & $C_A = 15.0\text{ pF}$, $G_{\text{Kir}} = 60.0\text{ pS}$ & $C_A = 9.5\text{ pF}$, $G_{\text{Kir}} = 67.66\text{ pS}$ & $-36.7\%$ glial capacitance; $+12.8\%$ $\text{Kir4.1}$ conductance \\

$\text{Na}^+/\text{K}^+$-ATPase Thermal Catalytic Factor ($Q_{10} = 2.1$) & $1.000\times$ baseline $i_{\max,k}$ & $1.287\times$ ($40.4\ ^\circ\text{C}$) to $1.396\times$ ($41.5\ ^\circ\text{C}$) & $+28.7\%$ to $+39.6\%$ faster active $\text{Na}^+/\text{K}^+$ pumping \\

Basal State ($[\text{K}^+]_0 = 2.5\text{ mM}$): $I_{\text{Kir}}$ \& $\tau_A$ & $I_{\text{Kir}} = 2,338.8\text{ fA}$, $\tau_A = 0.266\text{ s}$ & $I_{\text{Kir}} = 2,645.2\text{ fA}$, $\tau_A = 0.154\text{ s}$ & $+13.1\%$ current; $-42.1\%$ faster $\tau_A$ \\

Repetitive Firing ($[\text{K}^+]_0 = 5.0\text{ mM}$): $I_{\text{Kir}}$ \& $\tau_A$ & $I_{\text{Kir}} = 2,440.4\text{ fA}$, $\tau_A = 0.141\text{ s}$ & $I_{\text{Kir}} = 2,852.3\text{ fA}$, $\tau_A = 0.080\text{ s}$ & $+16.9\%$ current; $-43.3\%$ faster $\tau_A$ \\

High-Frequency Burst ($[\text{K}^+]_0 = 8.0\text{ mM}$): $I_{\text{Kir}}$ \& $\tau_A$ & $I_{\text{Kir}} = 1,548.0\text{ fA}$, $\tau_A = 0.100\text{ s}$ & $I_{\text{Kir}} = 1,897.9\text{ fA}$, $\tau_A = 0.057\text{ s}$ & $+22.6\%$ current; $-43.0\%$ faster $\tau_A$ \\

Tetanic Load ($[\text{K}^+]_0 = 10.0\text{ mM}$): $I_{\text{Kir}}$ \& $\tau_A$ & $I_{\text{Kir}} = 758.0\text{ fA}$, $\tau_A = 0.087\text{ s}$ & $I_{\text{Kir}} = 1,024.9\text{ fA}$, $\tau_A = 0.049\text{ s}$ & $+35.2\%$ current; $-43.7\%$ faster $\tau_A$ \\

\end{longtable}

  

\section{Synthesis of Deeper Research Gaps and Methodological Frontiers in Comparative Neurobiology}

  

Integrating these empirical datasets resolves how avian brains sustain primate-scale neuron counts within compact volumes and highlights five major research gaps that must be addressed to advance a unified quantitative theory of amniote brain evolution.

  

\subsection{Methodological Standardization: Reconciling 2D Areal vs. 3D Volumetric Ultrastructural Stereology and Tissue Shrinkage}

  

A persistent obstacle to cross-clade ultrastructural synthesis is the conflation of 2D areal frame densities with 3D volumetric disector densities. As verified in Section 2.1, the 18-species mammalian V1 dataset reports 2D areal counting frame densities ($\text{mm}^{-2}$ in $20\text{ nm}$ z-axis optical sections, averaging $706,866\text{ synapses/mm}^2$ and $1,311,587\text{ mitochondria/mm}^2$), whereas avian connectomic studies in zebra finch HVC and chick IMHV/LPO report either linear dendritic densities ($0.25$ asymmetric and $0.36$ symmetric $\text{synapses}/\mu\text{m}$ of dendrite) or 3D ssSEM disector volumetric densities ($\text{synapses}/\mu\text{m}^3$). Applying stereological conversions using the verified mean synapse Feret diameter ($\sim 200\text{ nm}$) and z-section thickness ($20\text{--}80\text{ nm}$) is required before directly equating mammalian $S/N$ ratios with avian SBEM counts. Moreover, because chemical fixation and resin embedding shrink physical brain volume by $16.1 \pm 0.7\%$ relative to the wet state (and 3D reconstructions require $\le 20\%$ shrinkage allowances), future cross-amniote connectomic benchmarks must report both wet-state-corrected volumetric synapse densities and direct mitochondrial-to-synaptic ($M/S$) ratios across non-avian reptiles, basal galliforms, and core land birds.

  

\subsection{Extending Single-Neuron Metabolic Budgets Beyond Basal Columbiformes to High-Density Corvids and Parrots}

  

Currently, the benchmark avian neuronal glucose budget ($1.86 \times 10^{-9}\ \mu\text{mol glucose/neuron/min}$) rests entirely on arterial-input-function $[^{18}\text{F}]\text{FDG}$ PET imaging in the rock pigeon (\textit{Columba livia})—an early-derived columbiform with a modest telencephalic neuron density ($309.96\text{ million}$ whole-brain neurons in a $2.095\text{ g}$ brain; $N_{\text{non}}/N_{\text{tot}} = 0.846$). No arterial-sampled kinetic $[^{18}\text{F}]\text{FDG}$ PET study has yet measured the per-neuron glucose budget in Passeriformes (e.g., rook, raven, or zebra finch) or Psittaciformes (e.g., budgerigar, cockatoo, or macaw), where telencephalic neuronal packing densities are up to 5-fold higher than in basal birds and where neurons outnumber glia by roughly $2:1$. Because biophysical modeling (Section 4.2) indicates that compact DVR neurons ($C_m \approx 55\text{ pF}$) and $\text{Kv3.1}$-expressing vocal-motor neurons at $40\text{--}41\ ^\circ\text{C}$ require as little as $1.30 \times 10^7\text{ to }2.21 \times 10^7\text{ ATP molecules/spike}$, testing whether core land birds achieve an even lower per-neuron baseline metabolic cost than columbiforms—using non-invasive image-derived input function (IDIF) PET (which matches arterial input function $\text{CMR}_{\text{glc}}$ within $\pm 5\%$ AUC difference and $14\text{--}17\%$ test-retest intravariability)—is a high-priority empirical frontier.

  

\subsection{Systems-Level Coupling Between Oculomotor Glucose Pumping, Vascular Brain Cooling, and Central Visual DVR Processing}

  

Synthesizing the findings on saccadic glucose pumping by the pecten oculi (Section 3.2) and counter-current brain cooling by the rete mirabile ophthalmicum (Section 4.3) reveals an integrated peripheral-to-central neuroenergetic loop in the avian head. High-acuity visual processing in the avascular retina is sustained by oscillatory saccadic eye movements (occupying $10\text{--}25\%$ of viewing time and increasing by $41.66\%$ upon transitioning from dark to light) that mechanically disperse glucose from the vascular pecten oculi ($15\text{ mmol/L}$) across the vitreous. Simultaneously, venous blood draining the cornea, ocular surfaces, and evaporative buccal and nasal membranes flows into the venous rete of the extracranial RMO, cooling the arterial blood supply to the brain by $0.50\text{ to }2.13\ ^\circ\text{C}$ during thermal or flight loads. Inside the telencephalon, this thermally regulated arterial supply perfuses the entopallium (Ei) and mesopallium ventrolaterale (MVL), where fast-spiking excitatory $\text{PV}^+\text{CaMKII}^+$ neurons ($\text{FWHM } 0.22\text{ ms}$) mediate hierarchical visual motion and looming object processing. Investigating whether saccadic eye oscillations also dynamically modulate orbital venous outflow through the RMO—thereby coupling ocular nutrient pumping with selective brain cooling during visual pursuit and flight—represents a compelling question for systems neurobiology.

  

\subsection{Biophysical Trade-Offs of Nuclear DVR vs. Laminated Neocortical Cytoarchitectures}

  

The contrast between the folded (gyrencephalic) six-layered mammalian neocortex and the nuclear sauropsid DVR reflects fundamental three-dimensional wiring trade-offs. In a laminated cortex, gray matter forms a surface sheet surrounding a central core of long-range myelinated white matter; as neuron numbers scale up in non-primate mammals ($M_{\text{pall}} \propto N_{\text{pall}}^{1.495}$), long-range axonal caliber and soma size inflate steeply, which cortical folding partially mitigates by bringing adjacent cortical areas closer together. Conversely, because of its nuclear organization, the avian and non-avian dinosaur pallium cannot reduce axon length by surface folding. Instead, the avian pallium minimizes wiring volume in three dimensions by positioning primary sensory input nuclei (such as Ento and nidopallial $\text{Ex\_DACH2\_RORB}$ zones) in direct orthogonal proximity to associative integration zones (MVL and NCL), maintaining compact local dendritic arbors ($\sim 100\text{ to }200\ \mu\text{m}$ radius in HVC and AId; $850\text{ to }2,061\ \mu\text{m}$ total dendritic length across pigeon telencephalic divisions) and soma-soma clustering ($71.9\%$ in Area X), and utilizing fast-spiking excitatory $\text{PV}^+$ projection neurons and $\text{Kv3.1}^+/\text{Nav}\beta4^+$ motor projection neurons to achieve sub-millisecond temporal precision without large-caliber myelinated tracts.

  

\subsection{Epigenetic and Activity-Dependent Drivers of Dorsal--Ventral Pallial Transcriptomic Convergence}

  

Finally, the demonstration that glutamatergic neurons born in the avian dorsal pallium (hyperpallium) and ventral pallium (nidopallium/HVC/RA) originate from distinct embryonic transcription factor lineages at E6 but converge onto shared adult effector transcriptomes ($\text{Ex\_DACH2\_CALCR}$ and $\text{Ex\_DACH2\_SV2C}$, particularly activity-regulated supertypes $\text{Ex\_DACH2\_NR4A3}$ and $\text{HVC\_Glut-4}$) by E19 demonstrates that topological embryonic origin does not strictly dictate adult functional gene expression programs. Future multi-omic developmental analyses combining single-nucleus ATAC-seq, chromatin velocity (mmVelo/MaxFuse/$\text{KD-SoS}$), and spatial transcriptomics across embryonic stages (E6 to E19) in chicks, songbirds, and non-avian reptiles are needed to determine how ascending thalamic sensory activity and shared \textit{cis}-regulatory enhancers override early homeodomain patterning codes to drive convergent circuit identities across diverged amniote pallia. Collectively, these structural, biophysical, and metabolic adaptations demonstrate that high-level executive cognition does not require a laminar neocortex, but instead depends on the absolute number of pallial neurons and the thermodynamic optimization of their energetic and ionic microenvironments.

  

\end{document}