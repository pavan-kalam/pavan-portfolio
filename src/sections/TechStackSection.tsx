import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SVG Logo Components for each skill
const SkillLogo = ({ name, color }: { name: string; color: string }) => {
  const logos: Record<string, React.ReactNode> = {
    // Programming Languages
    'Python': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="pythonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3776AB" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
        <path fill="url(#pythonGrad)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.854v9.426h24.693v3.143H24.341c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.849c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.024zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
        <path fill="url(#pythonGrad)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
      </svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/>
        <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
      </svg>
    ),
    'SQL': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0099cc" />
        </linearGradient>
        <rect x="10" y="20" width="108" height="88" rx="12" fill="none" stroke="url(#sqlGrad)" strokeWidth="4"/>
        <text x="64" y="75" textAnchor="middle" fill="url(#sqlGrad)" fontSize="36" fontWeight="bold" fontFamily="monospace">SQL</text>
        <ellipse cx="35" cy="45" rx="8" ry="5" fill="url(#sqlGrad)"/>
        <ellipse cx="35" cy="64" rx="8" ry="5" fill="url(#sqlGrad)"/>
        <ellipse cx="35" cy="83" rx="8" ry="5" fill="url(#sqlGrad)"/>
      </svg>
    ),
    'R': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#276DC3" />
          <stop offset="100%" stopColor="#165CAA" />
        </linearGradient>
        <circle cx="64" cy="64" r="56" fill="url(#rGrad)"/>
        <text x="64" y="85" textAnchor="middle" fill="white" fontSize="60" fontWeight="bold" fontFamily="serif">R</text>
      </svg>
    ),
    // Data Analysis & Visualization
    'Power BI': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="pbiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2C811" />
          <stop offset="100%" stopColor="#E8B800" />
        </linearGradient>
        <rect x="15" y="60" width="22" height="50" rx="3" fill="url(#pbiGrad)"/>
        <rect x="43" y="35" width="22" height="75" rx="3" fill="url(#pbiGrad)"/>
        <rect x="71" y="50" width="22" height="60" rx="3" fill="url(#pbiGrad)"/>
        <rect x="99" y="20" width="22" height="90" rx="3" fill="url(#pbiGrad)"/>
      </svg>
    ),
    'Tableau': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="tabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E97627" />
          <stop offset="100%" stopColor="#D45A0D" />
        </linearGradient>
        <rect x="15" y="15" width="35" height="35" rx="4" fill="url(#tabGrad)"/>
        <rect x="55" y="15" width="30" height="35" rx="4" fill="none" stroke="url(#tabGrad)" strokeWidth="4"/>
        <rect x="90" y="15" width="23" height="35" rx="4" fill="none" stroke="url(#tabGrad)" strokeWidth="4"/>
        <rect x="15" y="55" width="35" height="28" rx="4" fill="none" stroke="url(#tabGrad)" strokeWidth="4"/>
        <rect x="55" y="55" width="30" height="28" rx="4" fill="url(#tabGrad)"/>
        <rect x="90" y="55" width="23" height="28" rx="4" fill="none" stroke="url(#tabGrad)" strokeWidth="4"/>
        <rect x="15" y="88" width="35" height="25" rx="4" fill="none" stroke="url(#tabGrad)" strokeWidth="4"/>
        <rect x="55" y="88" width="30" height="25" rx="4" fill="none" stroke="url(#tabGrad)" strokeWidth="4"/>
        <rect x="90" y="88" width="23" height="25" rx="4" fill="url(#tabGrad)"/>
      </svg>
    ),
    'Pandas': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="pdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#130654" />
          <stop offset="100%" stopColor="#150458" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="8" fill="url(#pdGrad)"/>
        <text x="64" y="82" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold" fontFamily="sans-serif">pd</text>
      </svg>
    ),
    'NumPy': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="npGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4D77CF" />
          <stop offset="100%" stopColor="#4DABCF" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#013243"/>
        <text x="64" y="82" textAnchor="middle" fill="url(#npGrad)" fontSize="48" fontWeight="bold" fontFamily="sans-serif">Np</text>
      </svg>
    ),
    'Matplotlib': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#1f77b4"/>
        <polyline points="20,100 40,70 60,85 80,40 100,55 115,25" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="40" cy="70" r="5" fill="#ff7f0e"/>
        <circle cx="60" cy="85" r="5" fill="#2ca02c"/>
        <circle cx="80" cy="40" r="5" fill="#d62728"/>
        <circle cx="100" cy="55" r="5" fill="#9467bd"/>
        <circle cx="115" cy="25" r="5" fill="#8c564b"/>
      </svg>
    ),
    'Seaborn': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#4c72b0"/>
        <circle cx="35" cy="90" r="12" fill="#dd8452"/>
        <circle cx="65" cy="70" r="15" fill="#55a868"/>
        <circle cx="95" cy="50" r="18" fill="#c44e52"/>
        <circle cx="50" cy="40" r="10" fill="#8172b3"/>
        <circle cx="85" cy="95" r="8" fill="#937860"/>
      </svg>
    ),
    'Plotly': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="plotlyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#119DFF" />
          <stop offset="50%" stopColor="#10A37F" />
          <stop offset="100%" stopColor="#8C5B9A" />
        </linearGradient>
        <circle cx="64" cy="64" r="56" fill="url(#plotlyGrad)"/>
        <path d="M40 85 L55 55 L70 70 L90 35" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="55" cy="55" r="6" fill="white"/>
        <circle cx="70" cy="70" r="6" fill="white"/>
        <circle cx="90" cy="35" r="6" fill="white"/>
      </svg>
    ),
    // Machine Learning & AI
    'Transformers': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="hfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FFD93D" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="16" fill="#FFD21E"/>
        <text x="64" y="78" textAnchor="middle" fill="black" fontSize="48" fontWeight="bold">🤗</text>
      </svg>
    ),
    'TensorFlow': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="tfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6F00" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>
        <path fill="url(#tfGrad)" d="M64 10 L115 38 L115 90 L64 118 L13 90 L13 38 Z"/>
        <path fill="white" d="M64 25 L95 42 L95 76 L64 93 L33 76 L33 42 Z" opacity="0.3"/>
        <text x="64" y="75" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">TF</text>
      </svg>
    ),
    'PyTorch': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="torchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EE4C2C" />
          <stop offset="100%" stopColor="#FF6B4A" />
        </linearGradient>
        <circle cx="64" cy="64" r="56" fill="#252525"/>
        <path d="M85 35 C95 45 95 65 80 80 C65 95 45 95 35 85 C25 75 25 55 40 40 C55 25 75 25 85 35" fill="none" stroke="url(#torchGrad)" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="75" cy="45" r="8" fill="url(#torchGrad)"/>
      </svg>
    ),
    'Scikit-learn': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <ellipse cx="40" cy="70" rx="30" ry="35" fill="#3499cd"/>
        <ellipse cx="88" cy="70" rx="30" ry="35" fill="#f89939"/>
        <text x="64" y="115" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold" fontStyle="italic">scikit-learn</text>
      </svg>
    ),
    'Keras': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="kerasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D00000" />
          <stop offset="100%" stopColor="#FF0000" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#252525"/>
        <text x="64" y="78" textAnchor="middle" fill="url(#kerasGrad)" fontSize="42" fontWeight="bold" fontFamily="sans-serif">K</text>
      </svg>
    ),
    'OpenCV': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="cvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0000" />
          <stop offset="50%" stopColor="#00FF00" />
          <stop offset="100%" stopColor="#0000FF" />
        </linearGradient>
        <circle cx="64" cy="64" r="56" fill="#252525"/>
        <circle cx="64" cy="64" r="40" fill="none" stroke="url(#cvGrad)" strokeWidth="8"/>
        <circle cx="64" cy="64" r="20" fill="url(#cvGrad)"/>
      </svg>
    ),
    'XGBoost': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#1a1a1a"/>
        <text x="64" y="55" textAnchor="middle" fill="#00FF88" fontSize="28" fontWeight="bold">XGB</text>
        <text x="64" y="85" textAnchor="middle" fill="#00FF88" fontSize="20" fontWeight="bold">oost</text>
      </svg>
    ),
    // Cloud Platforms & Agentic AI
    'AWS': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="awsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#EC7211" />
        </linearGradient>
        <path fill="url(#awsGrad)" d="M44.6 62.5c0 3.4 3.7 6.7 9.9 9.2 6.2 2.5 14.4 3.8 23.1 3.8 5.6 0 11.5-.6 17.1-1.7 9.4-1.9 17.6-5.5 24.2-10.4 1.3-1 2.1-2.1 2.1-3.4 0-.8-.3-1.5-.9-2.1-.6-.6-1.4-.9-2.3-.9-.8 0-1.9.4-3.1 1.1-5.2 3.2-11.2 5.7-17.9 7.4-6.7 1.7-13.1 2.6-19.1 2.6-7.2 0-12.9-1-16.9-3-4-2-6.1-4.5-6.1-7.4 0-2.7 1.5-5.1 4.5-7.2 3-2.1 7.6-3.8 13.7-5.1l21.1-4.6c11.3-2.5 19.7-6.1 25.2-10.8 5.5-4.7 8.2-10.2 8.2-16.5 0-7.4-3.4-13.6-10.1-18.6C87.9 4.8 78.4 2.2 66.5 2.2c-6.8 0-13.8.9-20.9 2.6C38.5 6.5 32 9 26.2 12.2c-1.6.9-2.7 1.9-3.3 2.9-.6 1-.9 2.1-.9 3.2 0 .9.3 1.7.9 2.3.6.6 1.4.9 2.4.9.9 0 2.2-.4 3.8-1.1 5.3-2.5 11.3-4.6 17.9-6.2 6.6-1.6 12.8-2.4 18.6-2.4 8.6 0 15.3 1.2 20.1 3.6 4.8 2.4 7.2 5.6 7.2 9.6 0 3.2-1.5 6-4.5 8.4-3 2.4-8.2 4.5-15.6 6.3L72.2 44c-12.1 2.9-20.9 6.7-26.3 11.4-5.4 4.7-8.1 10-8.1 15.9l.8 4.2z"/>
        <path fill="url(#awsGrad)" d="M108.5 94.4c-5.9 4.4-12.2 7.7-18.9 9.9-6.7 2.2-13.8 3.3-21.3 3.3-10.3 0-19.6-2-27.9-6-8.3-4-14.8-9.5-19.5-16.5-1-1.5-1.5-2.9-1.5-4.2 0-.8.3-1.5.8-2.1.5-.6 1.2-.9 2-.9.7 0 1.6.4 2.6 1.1 4.8 5.8 10.6 10.3 17.4 13.5 6.8 3.2 14.6 4.8 23.4 4.8 6.6 0 12.9-1 18.9-3.1 6-2.1 11.4-5 16.2-8.8 1.2-.9 2.2-1.4 3-1.4.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1 0 1.3-.8 2.6-2.4 4-1.6 1.4-3.7 3-6.3 4.8l-1.5 1.1z"/>
      </svg>
    ),
    'Google Cloud Platform': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="gcpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="33%" stopColor="#EA4335" />
          <stop offset="66%" stopColor="#FBBC05" />
          <stop offset="100%" stopColor="#34A853" />
        </linearGradient>
        <path fill="#4285F4" d="M80.5 32.5c-8.5 0-16.2 3.4-21.8 8.9l-16.5-16.5C54.3 14.3 66.6 9 80.5 9c18.6 0 34.9 9.5 44.5 24L102 42.5c-5.2-8.1-14.2-13.5-24.5-13.5l3 3.5z"/>
        <path fill="#EA4335" d="M28.5 60c0-5.5 1.1-10.7 3-15.5L9 33.5C4.3 41.3 1.5 50.3 1.5 60c0 15.5 6.5 29.5 16.9 39.5l16.8-16.8C31.1 76.5 28.5 68.5 28.5 60z"/>
        <path fill="#FBBC05" d="M80.5 87.5c-10.3 0-19.3-5.4-24.5-13.5L31.5 98.5c9.6 12.3 24.5 20.5 41.5 20.5 13.6 0 26.1-5.1 35.5-13.5l-16.5-16.5c-5.6 5.5-13.3 8.9-21.5 8.5z"/>
        <path fill="#34A853" d="M125 60c0-3.5-.5-6.8-1.5-10l-52 52c1.7.2 3.3.5 5 .5 18.6 0 34.9-9.5 44.5-24l-16.5-16.5c2.5 4.8 4 10.3 4 16l16.5-18z"/>
      </svg>
    ),
    'Microsoft Azure': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="azureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#005A9E" />
        </linearGradient>
        <path fill="url(#azureGrad)" d="M44.5 10L20 55h30L35 95l65-60H65l20-45H44.5z"/>
        <path fill="#0078D4" d="M110 55L45 115h60l5-60z" opacity="0.8"/>
      </svg>
    ),
    'N8N': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="16" fill="#FF6D5A"/>
        <text x="64" y="78" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">n8n</text>
      </svg>
    ),
    'RAG': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="ragGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <circle cx="64" cy="64" r="56" fill="#1a1a1a"/>
        <circle cx="64" cy="45" r="18" fill="none" stroke="url(#ragGrad)" strokeWidth="4"/>
        <circle cx="45" cy="83" r="18" fill="none" stroke="url(#ragGrad)" strokeWidth="4"/>
        <circle cx="83" cy="83" r="18" fill="none" stroke="url(#ragGrad)" strokeWidth="4"/>
        <line x1="64" y1="63" x2="45" y2="65" stroke="url(#ragGrad)" strokeWidth="3"/>
        <line x1="64" y1="63" x2="83" y2="65" stroke="url(#ragGrad)" strokeWidth="3"/>
      </svg>
    ),
    'SageMaker': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#232F3E"/>
        <text x="64" y="55" textAnchor="middle" fill="#FF9900" fontSize="20" fontWeight="bold">Sage</text>
        <text x="64" y="80" textAnchor="middle" fill="#FF9900" fontSize="20" fontWeight="bold">Maker</text>
      </svg>
    ),
    'AWS ECS/ECR': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#232F3E"/>
        <text x="64" y="58" textAnchor="middle" fill="#FF9900" fontSize="22" fontWeight="bold">ECS</text>
        <text x="64" y="82" textAnchor="middle" fill="#FF9900" fontSize="16">ECR</text>
      </svg>
    ),
    'AWS CloudWatch': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#232F3E"/>
        <path d="M35 70 L50 50 L65 60 L85 35 L95 45" fill="none" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="35" cy="70" r="5" fill="#FF9900"/>
        <circle cx="50" cy="50" r="5" fill="#FF9900"/>
        <circle cx="65" cy="60" r="5" fill="#FF9900"/>
        <circle cx="85" cy="35" r="5" fill="#FF9900"/>
        <circle cx="95" cy="45" r="5" fill="#FF9900"/>
      </svg>
    ),
    'IAM': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#232F3E"/>
        <circle cx="64" cy="50" r="18" fill="none" stroke="#FF9900" strokeWidth="4"/>
        <path d="M35 100 C35 75 50 70 64 70 C78 70 93 75 93 100" fill="none" stroke="#FF9900" strokeWidth="4"/>
        <text x="64" y="95" textAnchor="middle" fill="#FF9900" fontSize="12" fontWeight="bold">IAM</text>
      </svg>
    ),
    // Database Management
    'PostgreSQL': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#336791" />
          <stop offset="100%" stopColor="#336791" />
        </linearGradient>
        <path fill="url(#pgGrad)" d="M93.5 12.5c-6.5 0-12.8 1.3-18.5 3.7-4.8 2-9.1 4.8-12.8 8.3-3.7-3.5-8-6.3-12.8-8.3-5.7-2.4-12-3.7-18.5-3.7C15.6 12.5 2 26.1 2 42.5c0 11.8 6.8 22 16.8 27.1 2.3 24.5 22.5 43.9 47.2 43.9 24.7 0 44.9-19.4 47.2-43.9 10-5.1 16.8-15.3 16.8-27.1 0-16.4-13.6-30-30-30z"/>
        <ellipse cx="64" cy="45" rx="20" ry="25" fill="white"/>
        <circle cx="58" cy="40" r="5" fill="#336791"/>
        <circle cx="70" cy="40" r="5" fill="#336791"/>
        <path d="M55 55 Q64 62 73 55" fill="none" stroke="#336791" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    'MySQL': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="mysqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00758F" />
          <stop offset="100%" stopColor="#F29111" />
        </linearGradient>
        <path fill="url(#mysqlGrad)" d="M116.5 96.5c-4.5 0-8.5-1-12-3-3.5-2-6.5-5-9-9-2.5-4-4.5-8.5-6-13.5-1.5-5-2.5-10-3-15-.5-5-.5-9.5 0-13.5.5-4 1.5-7 3-9 1.5-2 3.5-3 6-3 2 0 3.5.5 4.5 1.5 1 1 1.5 2.5 1.5 4.5 0 2-.5 4-1.5 6s-2 4-3 6c-1 2-1.5 4-1.5 6 0 2 .5 4 1.5 6s2.5 4 4.5 6c2 2 4.5 3.5 7.5 4.5 3 1 6.5 1.5 10.5 1.5v12z"/>
        <text x="30" y="85" fill="#00758F" fontSize="32" fontWeight="bold">My</text>
        <text x="30" y="110" fill="#F29111" fontSize="32" fontWeight="bold">SQL</text>
      </svg>
    ),
    'MongoDB': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="mongoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#47A248" />
          <stop offset="100%" stopColor="#116149" />
        </linearGradient>
        <path fill="url(#mongoGrad)" d="M64 5c-5 15-8 30-8 45 0 25 8 50 8 50s8-25 8-50c0-15-3-30-8-45z"/>
        <ellipse cx="64" cy="55" rx="12" ry="8" fill="#47A248"/>
        <path d="M64 100 L64 120" stroke="#116149" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    'Redis': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="redisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A41E11" />
          <stop offset="100%" stopColor="#D82C20" />
        </linearGradient>
        <ellipse cx="64" cy="35" rx="45" ry="20" fill="url(#redisGrad)"/>
        <ellipse cx="64" cy="60" rx="45" ry="20" fill="#D82C20"/>
        <ellipse cx="64" cy="85" rx="45" ry="20" fill="#A41E11"/>
        <text x="64" y="70" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">Redis</text>
      </svg>
    ),
    // Web & API Development
    'Flask': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="white"/>
        <text x="64" y="55" textAnchor="middle" fill="black" fontSize="36" fontWeight="bold">Flask</text>
        <path d="M40 70 Q64 60 88 70" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    'FastAPI': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="fastapiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#009688" />
          <stop offset="100%" stopColor="#00BFA5" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="16" fill="#212121"/>
        <path d="M64 25 L85 45 L75 45 L75 95 L53 95 L53 45 L43 45 Z" fill="url(#fastapiGrad)"/>
      </svg>
    ),
    'React.js': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="reactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#61DAFB" />
          <stop offset="100%" stopColor="#00D8FF" />
        </linearGradient>
        <circle cx="64" cy="64" r="12" fill="#61DAFB"/>
        <ellipse cx="64" cy="64" rx="50" ry="20" fill="none" stroke="#61DAFB" strokeWidth="3"/>
        <ellipse cx="64" cy="64" rx="50" ry="20" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 64 64)"/>
        <ellipse cx="64" cy="64" rx="50" ry="20" fill="none" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 64 64)"/>
      </svg>
    ),
    'Gradio': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="gradioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7B00" />
          <stop offset="100%" stopColor="#FF9D4D" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="16" fill="url(#gradioGrad)"/>
        <text x="64" y="78" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Gradio</text>
      </svg>
    ),
    'REST APIs': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="restGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B8DD6" />
          <stop offset="100%" stopColor="#8E7CC3" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#1a1a1a"/>
        <text x="64" y="58" textAnchor="middle" fill="url(#restGrad)" fontSize="22" fontWeight="bold">REST</text>
        <text x="64" y="85" textAnchor="middle" fill="url(#restGrad)" fontSize="18" fontWeight="bold">APIs</text>
      </svg>
    ),
    // DevOps & MLOps Tools
    'Docker': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="dockerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2496ED" />
          <stop offset="100%" stopColor="#0DB7ED" />
        </linearGradient>
        <path fill="url(#dockerGrad)" d="M124 58c-2-14-12-22-24-26-4-1-8-2-12-2H20v2c0 14 6 26 18 34 6 4 14 6 22 6h64v-2c4-4 2-8 0-12zM32 42h12v12H32V42zm16 0h12v12H48V42zm16 0h12v12H64V42zm16 0h12v12H80V42zM32 26h12v12H32V26zm16 0h12v12H48V26zm16 0h12v12H64V26zm16 0h12v12H80V26z"/>
        <path fill="#2496ED" d="M28 54c-8 0-14 6-14 14s6 14 14 14h8V54h-8z"/>
      </svg>
    ),
    'Kubernetes': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="k8sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#326CE5" />
          <stop offset="100%" stopColor="#2A60D1" />
        </linearGradient>
        <path fill="url(#k8sGrad)" d="M64 8L16 32v64l48 24 48-24V32L64 8z"/>
        <path fill="white" d="M64 28c-3 0-5.5 2.5-5.5 5.5S61 39 64 39s5.5-2.5 5.5-5.5S67 28 64 28zm-20 15c-3 0-5.5 2.5-5.5 5.5S41 54 44 54s5.5-2.5 5.5-5.5S47 43 44 43zm40 0c-3 0-5.5 2.5-5.5 5.5S81 54 84 54s5.5-2.5 5.5-5.5S87 43 84 43zM64 58c-3 0-5.5 2.5-5.5 5.5S61 69 64 69s5.5-2.5 5.5-5.5S67 58 64 58zm-20 15c-3 0-5.5 2.5-5.5 5.5S41 84 44 84s5.5-2.5 5.5-5.5S47 73 44 73zm40 0c-3 0-5.5 2.5-5.5 5.5S81 84 84 84s5.5-2.5 5.5-5.5S87 73 84 73zM64 88c-3 0-5.5 2.5-5.5 5.5S61 99 64 99s5.5-2.5 5.5-5.5S67 88 64 88z"/>
      </svg>
    ),
    'Git': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="gitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F05032" />
          <stop offset="100%" stopColor="#E94E31" />
        </linearGradient>
        <path fill="url(#gitGrad)" d="M119.5 58.5L69.5 8.5c-3-3-8-3-11 0L52 15l14 14c3-1 7 0 9 2 2 2 3 6 2 9l13 13c3-1 6 0 9 2 3 3 3 8 0 11-3 3-8 3-11 0-2-2-3-5-2-8l-12-12v32c1 0 2 1 3 2 3 3 3 8 0 11-3 3-8 3-11 0-3-3-3-8 0-11 1-1 2-2 3-2V51c-1 0-2-1-3-2-2-2-3-5-2-8L38 26 8.5 55.5c-3 3-3 8 0 11l50 50c3 3 8 3 11 0l50-50c3-3 3-8 0-11z"/>
      </svg>
    ),
    'GitHub Actions': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="ghaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2088FF" />
          <stop offset="100%" stopColor="#0366D6" />
        </linearGradient>
        <rect x="10" y="10" width="108" height="108" rx="16" fill="#161b22"/>
        <path d="M64 30c-18.8 0-34 15.2-34 34 0 15 9.7 27.7 23.2 32.2 1.7.3 2.3-.7 2.3-1.6v-5.7c-9.4 2-11.4-4-11.4-4-1.5-3.9-3.7-4.9-3.7-4.9-3-2.1.2-2 .2-2 3.3.2 5.1 3.4 5.1 3.4 2.9 5 7.7 3.6 9.6 2.7.3-2.1 1.2-3.6 2.1-4.4-7.5-.9-15.4-3.8-15.4-16.8 0-3.7 1.3-6.7 3.4-9.1-.3-.9-1.5-4.3.3-9 0 0 2.8-.9 9.1 3.5 2.6-.7 5.4-1.1 8.2-1.1s5.6.4 8.2 1.1c6.3-4.4 9.1-3.5 9.1-3.5 1.8 4.7.7 8.1.3 9 2.1 2.4 3.4 5.4 3.4 9.1 0 13.1-7.9 16-15.4 16.8 1.2 1 2.3 3.1 2.3 6.3v9.3c0 .9.6 1.9 2.3 1.6 13.5-4.5 23.2-17.2 23.2-32.2 0-18.8-15.2-34-34-34z" fill="url(#ghaGrad)"/>
      </svg>
    ),
    'AWS CodePipeline': (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect x="10" y="10" width="108" height="108" rx="8" fill="#232F3E"/>
        <circle cx="35" cy="64" r="12" fill="none" stroke="#FF9900" strokeWidth="3"/>
        <circle cx="64" cy="40" r="12" fill="none" stroke="#FF9900" strokeWidth="3"/>
        <circle cx="93" cy="64" r="12" fill="none" stroke="#FF9900" strokeWidth="3"/>
        <circle cx="64" cy="88" r="12" fill="none" stroke="#FF9900" strokeWidth="3"/>
        <line x1="46" y1="56" x2="52" y2="48" stroke="#FF9900" strokeWidth="3"/>
        <line x1="76" y1="48" x2="82" y2="56" stroke="#FF9900" strokeWidth="3"/>
        <line x1="82" y1="72" x2="76" y2="80" stroke="#FF9900" strokeWidth="3"/>
        <line x1="52" y1="80" x2="46" y2="72" stroke="#FF9900" strokeWidth="3"/>
      </svg>
    )
  };

  return logos[name] || (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <circle cx="64" cy="64" r="56" fill="#333"/>
      <text x="64" y="72" textAnchor="middle" fill={color} fontSize="32" fontWeight="bold">
        {name.charAt(0)}
      </text>
    </svg>
  );
};

// All skills with their colors
const allSkills = [
  // Programming Languages
  { name: 'Python', category: 'Programming Languages', color: '#3776AB' },
  { name: 'JavaScript', category: 'Programming Languages', color: '#F7DF1E' },
  { name: 'SQL', category: 'Programming Languages', color: '#00d4ff' },
  { name: 'R', category: 'Programming Languages', color: '#276DC3' },
  // Data Analysis & Visualization
  { name: 'Power BI', category: 'Data Analysis & Visualization', color: '#F2C811' },
  { name: 'Tableau', category: 'Data Analysis & Visualization', color: '#E97627' },
  { name: 'Pandas', category: 'Data Analysis & Visualization', color: '#130654' },
  { name: 'NumPy', category: 'Data Analysis & Visualization', color: '#4D77CF' },
  { name: 'Matplotlib', category: 'Data Analysis & Visualization', color: '#1f77b4' },
  { name: 'Seaborn', category: 'Data Analysis & Visualization', color: '#4c72b0' },
  { name: 'Plotly', category: 'Data Analysis & Visualization', color: '#119DFF' },
  // Machine Learning & AI
  { name: 'Transformers', category: 'Machine Learning & AI', color: '#FFD21E' },
  { name: 'TensorFlow', category: 'Machine Learning & AI', color: '#FF6F00' },
  { name: 'PyTorch', category: 'Machine Learning & AI', color: '#EE4C2C' },
  { name: 'Scikit-learn', category: 'Machine Learning & AI', color: '#F89939' },
  { name: 'Keras', category: 'Machine Learning & AI', color: '#D00000' },
  { name: 'OpenCV', category: 'Machine Learning & AI', color: '#5C3EE8' },
  { name: 'XGBoost', category: 'Machine Learning & AI', color: '#00FF88' },
  // Cloud Platforms & Agentic AI
  { name: 'AWS', category: 'Cloud Platforms & Agentic AI', color: '#FF9900' },
  { name: 'Google Cloud Platform', category: 'Cloud Platforms & Agentic AI', color: '#4285F4' },
  { name: 'Microsoft Azure', category: 'Cloud Platforms & Agentic AI', color: '#0078D4' },
  { name: 'N8N', category: 'Cloud Platforms & Agentic AI', color: '#FF6D5A' },
  { name: 'RAG', category: 'Cloud Platforms & Agentic AI', color: '#A855F7' },
  { name: 'SageMaker', category: 'Cloud Platforms & Agentic AI', color: '#FF9900' },
  { name: 'AWS ECS/ECR', category: 'Cloud Platforms & Agentic AI', color: '#FF9900' },
  { name: 'AWS CloudWatch', category: 'Cloud Platforms & Agentic AI', color: '#FF9900' },
  { name: 'IAM', category: 'Cloud Platforms & Agentic AI', color: '#FF9900' },
  // Database Management
  { name: 'PostgreSQL', category: 'Database Management', color: '#336791' },
  { name: 'MySQL', category: 'Database Management', color: '#00758F' },
  { name: 'MongoDB', category: 'Database Management', color: '#47A248' },
  { name: 'Redis', category: 'Database Management', color: '#A41E11' },
  // Web & API Development
  { name: 'Flask', category: 'Web & API Development', color: '#000000' },
  { name: 'FastAPI', category: 'Web & API Development', color: '#009688' },
  { name: 'React.js', category: 'Web & API Development', color: '#61DAFB' },
  { name: 'Gradio', category: 'Web & API Development', color: '#FF7B00' },
  { name: 'REST APIs', category: 'Web & API Development', color: '#6B8DD6' },
  // DevOps & MLOps Tools
  { name: 'Docker', category: 'DevOps & MLOps Tools', color: '#2496ED' },
  { name: 'Kubernetes', category: 'DevOps & MLOps Tools', color: '#326CE5' },
  { name: 'Git', category: 'DevOps & MLOps Tools', color: '#F05032' },
  { name: 'GitHub Actions', category: 'DevOps & MLOps Tools', color: '#2088FF' },
  { name: 'AWS CodePipeline', category: 'DevOps & MLOps Tools', color: '#FF9900' }
];

interface AnimatedSkill {
  skill: typeof allSkills[0];
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<AnimatedSkill[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

  // Initialize animated skills
  useEffect(() => {
    const initializedSkills: AnimatedSkill[] = allSkills.map((skill) => ({
      skill,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: Math.random() * 20 + 55,
      speedX: (Math.random() - 0.5) * 0.12,
      speedY: (Math.random() - 0.5) * 0.12,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.4
    }));
    setSkills(initializedSkills);
  }, []);

  // Scroll trigger for visibility
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => { isVisibleRef.current = true; },
        onLeave: () => { isVisibleRef.current = false; },
        onEnterBack: () => { isVisibleRef.current = true; },
        onLeaveBack: () => { isVisibleRef.current = false; }
      });

      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      setSkills(prevSkills => 
        prevSkills.map(item => {
          let newX = item.x + item.speedX;
          let newY = item.y + item.speedY;
          let newSpeedX = item.speedX;
          let newSpeedY = item.speedY;

          if (newX < 5 || newX > 95) newSpeedX *= -1;
          if (newY < 10 || newY > 90) newSpeedY *= -1;

          newX = Math.max(5, Math.min(95, newX));
          newY = Math.max(10, Math.min(90, newY));

          const canvas = canvasRef.current;
          if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const skillPixelX = (newX / 100) * rect.width;
            const skillPixelY = (newY / 100) * rect.height;
            const dx = skillPixelX - mouseRef.current.x;
            const dy = skillPixelY - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120 && distance > 0) {
              const force = (120 - distance) / 120;
              newX += (dx / distance) * force * 1.5;
              newY += (dy / distance) * force * 1.5;
            }
          }

          return {
            ...item,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: item.rotation + item.rotationSpeed
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="techstack"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            MY <span className="gradient-text">TECHSTACK</span>
          </h2>
        </div>

        {/* Floating Skills Container */}
        <div 
          ref={canvasRef}
          className="relative h-[500px] md:h-[600px]"
        >
          {skills.map((item, index) => (
            <div
              key={item.skill.name}
              className="absolute transition-transform duration-100"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative group">
                <div 
                  className="w-full h-full drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    filter: `drop-shadow(0 0 12px ${item.skill.color}40)`
                  }}
                >
                  <SkillLogo name={item.skill.name} color={item.skill.color} />
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  <span className="text-xs font-mono text-zinc-300 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-white/10">
                    {item.skill.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Legend by Category */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Programming Languages', skills: ['Python', 'JavaScript', 'SQL', 'R'] },
            { title: 'Data Analysis & Visualization', skills: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'] },
            { title: 'Machine Learning & AI', skills: ['Transformers', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'XGBoost'] },
            { title: 'Cloud Platforms & Agentic AI', skills: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'N8N', 'RAG', 'SageMaker', 'AWS ECS/ECR', 'AWS CloudWatch', 'IAM'] },
            { title: 'Database Management', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
            { title: 'Web & API Development', skills: ['Flask', 'FastAPI', 'React.js', 'Gradio', 'REST APIs'] },
            { title: 'DevOps & MLOps Tools', skills: ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'AWS CodePipeline'] }
          ].map((category, catIndex) => (
            <div 
              key={catIndex}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors"
            >
              <h3 className="text-xs font-mono text-purple-400 mb-3 uppercase tracking-wider">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skillName) => (
                  <span 
                    key={skillName}
                    className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-all cursor-default"
                  >
                    {skillName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
