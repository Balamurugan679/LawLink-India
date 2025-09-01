const express = require('express');
const OpenAI = require('openai');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key'
});

// Legal knowledge base for Indian laws
const legalKnowledge = {
  constitution: `
    The Constitution of India is the supreme law of India. It establishes the framework for the government, 
    defines the fundamental political principles, establishes the structure, procedures, powers, and duties 
    of government institutions, and sets out fundamental rights, directive principles, and the duties of citizens.
  `,
  ipc: `
    The Indian Penal Code (IPC) is the main criminal code of India. It covers all substantive aspects of criminal law. 
    Key sections include: Section 302 (Murder), Section 376 (Rape), Section 420 (Cheating), Section 499 (Defamation).
  `,
  crpc: `
    The Code of Criminal Procedure (CrPC) is the main legislation on procedure for administration of substantive criminal law in India. 
    It provides the machinery for the investigation of crime, apprehension of suspected criminals, collection of evidence, 
    determination of guilt or innocence of the accused person, and the determination of punishment of the guilty.
  `,
  rti: `
    The Right to Information Act (RTI) is a law that gives citizens the right to access information from public authorities. 
    It promotes transparency and accountability in the working of every public authority.
  `,
  family_law: `
    Family law in India covers marriage, divorce, maintenance, custody, and inheritance. 
    Different religions have different personal laws governing these matters.
  `,
  property_law: `
    Property law in India governs the ownership, transfer, and rights related to real and personal property. 
    It includes laws on buying, selling, leasing, and inheritance of property.
  `
};

// Get legal information by topic
router.get('/legal-info/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const topicKey = topic.toLowerCase().replace(/[^a-z]/g, '_');
    
    if (legalKnowledge[topicKey]) {
      res.json({
        topic: topic,
        information: legalKnowledge[topicKey],
        disclaimer: "This is general information and should not be considered as legal advice. Please consult a qualified lawyer for specific legal matters."
      });
    } else {
      res.status(404).json({ message: 'Legal topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Chat with legal AI
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Create system prompt for legal assistance
    const systemPrompt = `You are a legal information assistant for Indian law. You can help with:
    - General information about Indian laws (Constitution, IPC, CrPC, RTI, etc.)
    - Basic legal concepts and procedures
    - Suggestions for finding appropriate legal help
    - Understanding legal rights and responsibilities
    
    IMPORTANT: You cannot provide specific legal advice. Always include disclaimers and recommend consulting qualified lawyers for specific cases.
    
    Be helpful, informative, and always emphasize that this is general information, not legal advice.`;

    // Prepare conversation for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    let aiResponse;
    
    try {
      // Try to get response from OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      });
      
      aiResponse = completion.choices[0].message.content;
    } catch (openaiError) {
      // Fallback response if OpenAI fails
      aiResponse = generateFallbackResponse(message);
    }

    // Add disclaimer
    const responseWithDisclaimer = `${aiResponse}\n\n⚠️ **Disclaimer**: This information is for general purposes only and should not be considered as legal advice. For specific legal matters, please consult a qualified lawyer.`;

    res.json({
      response: responseWithDisclaimer,
      timestamp: new Date().toISOString(),
      disclaimer: true
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate fallback response when OpenAI is not available
function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('arrest') || lowerMessage.includes('rights')) {
    return `When arrested in India, you have several fundamental rights:
    1. Right to know the grounds of arrest
    2. Right to consult a lawyer
    3. Right to be produced before a magistrate within 24 hours
    4. Right to remain silent
    5. Right to medical examination if needed
    
    These rights are protected under Article 22 of the Indian Constitution and various Supreme Court judgments.`;
  }
  
  if (lowerMessage.includes('divorce') || lowerMessage.includes('marriage')) {
    return `Divorce in India can be filed under various grounds including cruelty, adultery, desertion, and mutual consent. The process involves filing a petition in family court, mediation attempts, and court proceedings. Different religions have different personal laws governing divorce.`;
  }
  
  if (lowerMessage.includes('property') || lowerMessage.includes('land')) {
    return `Property law in India covers buying, selling, leasing, and inheritance. Key aspects include proper documentation, registration requirements, and inheritance laws. Always ensure proper legal verification before property transactions.`;
  }
  
  if (lowerMessage.includes('criminal') || lowerMessage.includes('case')) {
    return `Criminal cases in India follow the Code of Criminal Procedure (CrPC). The process includes FIR filing, investigation, charge sheet, trial, and judgment. You have the right to legal representation and a fair trial.`;
  }
  
  return `I can help you with general information about Indian laws including Constitution, IPC, CrPC, RTI, family law, and property law. For specific legal advice, please consult a qualified lawyer.`;
}

// Get suggested legal topics
router.get('/suggested-topics', async (req, res) => {
  try {
    const topics = [
      {
        id: 'constitution',
        title: 'Indian Constitution',
        description: 'Fundamental rights and government structure',
        icon: '🏛️'
      },
      {
        id: 'criminal_law',
        title: 'Criminal Law',
        description: 'IPC, CrPC, and criminal procedures',
        icon: '⚖️'
      },
      {
        id: 'family_law',
        title: 'Family Law',
        description: 'Marriage, divorce, and family matters',
        icon: '👨‍👩‍👧‍👦'
      },
      {
        id: 'property_law',
        title: 'Property Law',
        description: 'Real estate and property rights',
        icon: '🏠'
      },
      {
        id: 'rti',
        title: 'Right to Information',
        description: 'Accessing government information',
        icon: '📋'
      },
      {
        id: 'labor_law',
        title: 'Labor Law',
        description: 'Employment rights and workplace laws',
        icon: '💼'
      }
    ];

    res.json({ topics });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lawyer recommendations based on query
router.post('/lawyer-recommendations', auth, async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // This would typically analyze the query and suggest lawyer types
    // For now, return general recommendations
    const recommendations = {
      query: query,
      suggestions: [
        {
          type: 'Family Lawyer',
          reason: 'For family disputes, marriage, divorce, and custody matters',
          specializations: ['Family Law', 'Civil Law']
        },
        {
          type: 'Criminal Lawyer',
          reason: 'For criminal cases, arrests, and criminal defense',
          specializations: ['Criminal Law']
        },
        {
          type: 'Property Lawyer',
          reason: 'For real estate, property disputes, and land matters',
          specializations: ['Property Law', 'Real Estate Law']
        },
        {
          type: 'Corporate Lawyer',
          reason: 'For business, contracts, and corporate matters',
          specializations: ['Corporate Law', 'Intellectual Property']
        }
      ],
      disclaimer: 'These are general recommendations. Please consult specific lawyers based on your exact legal needs.'
    };

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
