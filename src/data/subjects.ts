import { Subject } from '../types'

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    topics: [
      { id: 'relations-functions', name: 'Relations and Functions' },
      { id: 'inverse-trig', name: 'Inverse Trigonometric Functions' },
      { id: 'matrices', name: 'Matrices' },
      { id: 'determinants', name: 'Determinants' },
      { id: 'continuity', name: 'Continuity and Differentiability' },
      { id: 'derivatives', name: 'Application of Derivatives' },
      { id: 'integrals', name: 'Integrals' },
      { id: 'integral-applications', name: 'Application of Integrals' },
      { id: 'differential-equations', name: 'Differential Equations' },
      { id: 'vectors', name: 'Vector Algebra' },
      { id: '3d-geometry', name: 'Three Dimensional Geometry' },
      { id: 'linear-programming', name: 'Linear Programming' },
      { id: 'probability', name: 'Probability' }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    topics: [
      { id: 'electric-charges', name: 'Electric Charges and Fields' },
      { id: 'electrostatic-potential', name: 'Electrostatic Potential and Capacitance' },
      { id: 'current-electricity', name: 'Current Electricity' },
      { id: 'moving-charges', name: 'Moving Charges and Magnetism' },
      { id: 'magnetism', name: 'Magnetism and Matter' },
      { id: 'electromagnetic-induction', name: 'Electromagnetic Induction' },
      { id: 'alternating-current', name: 'Alternating Current' },
      { id: 'electromagnetic-waves', name: 'Electromagnetic Waves' },
      { id: 'ray-optics', name: 'Ray Optics and Optical Instruments' },
      { id: 'wave-optics', name: 'Wave Optics' },
      { id: 'dual-nature', name: 'Dual Nature of Radiation and Matter' },
      { id: 'atoms', name: 'Atoms' },
      { id: 'nuclei', name: 'Nuclei' },
      { id: 'semiconductor', name: 'Semiconductor Electronics' }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    topics: [
      { id: 'solid-state', name: 'The Solid State' },
      { id: 'solutions', name: 'Solutions' },
      { id: 'electrochemistry', name: 'Electrochemistry' },
      { id: 'chemical-kinetics', name: 'Chemical Kinetics' },
      { id: 'surface-chemistry', name: 'Surface Chemistry' },
      { id: 'isolation-elements', name: 'General Principles and Processes of Isolation of Elements' },
      { id: 'p-block', name: 'The p-Block Elements' },
      { id: 'd-f-block', name: 'The d- and f- Block Elements' },
      { id: 'coordination', name: 'Coordination Compounds' },
      { id: 'haloalkanes', name: 'Haloalkanes and Haloarenes' },
      { id: 'alcohols', name: 'Alcohols, Phenols and Ethers' },
      { id: 'aldehydes', name: 'Aldehydes, Ketones and Carboxylic Acids' },
      { id: 'amines', name: 'Amines' },
      { id: 'biomolecules', name: 'Biomolecules' },
      { id: 'polymers', name: 'Polymers' },
      { id: 'chemistry-everyday', name: 'Chemistry in Everyday Life' }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    topics: [
      { id: 'reproduction-organisms', name: 'Reproduction in Organisms' },
      { id: 'sexual-reproduction', name: 'Sexual Reproduction in Flowering Plants' },
      { id: 'human-reproduction', name: 'Human Reproduction' },
      { id: 'reproductive-health', name: 'Reproductive Health' },
      { id: 'inheritance', name: 'Principle of Inheritance and Variation' },
      { id: 'molecular-basis', name: 'Molecular Basis of Inheritance' },
      { id: 'evolution', name: 'Evolution' },
      { id: 'human-health', name: 'Human Health and Diseases' },
      { id: 'food-production', name: 'Strategies for Enhancement in Food Production' },
      { id: 'microbes', name: 'Microbes in Human Welfare' },
      { id: 'biotechnology-principles', name: 'Biotechnology: Principles and Processes' },
      { id: 'biotechnology-applications', name: 'Biotechnology and its Applications' },
      { id: 'organisms-populations', name: 'Organisms and Populations' },
      { id: 'ecosystem', name: 'Ecosystem' },
      { id: 'biodiversity', name: 'Biodiversity and Conservation' },
      { id: 'environmental-issues', name: 'Environmental Issues' }
    ]
  }
]