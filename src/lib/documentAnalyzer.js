const DOCUMENT_MARKERS = {
  // Career & Employment
  resume: ['experience', 'education', 'skills', 'summary', 'university', 'bachelor', 'master', 'project', 'gpa', 'achievements', 'technologies', 'relevant coursework', 'professional experience', 'work history', 'key skills'],
  coverLetter: ['dear hiring manager', 'sincerely', 'application for', 'i am writing to', 'enclosed', 'cover letter', 'thank you for your consideration', 'please find attached'],
  offerLetter: ['offer of employment', 'base salary', 'stock options', 'at-will employment', 'benefits', 'sign-on', 'reporting to', 'bonus'],
  payslip: ['earnings', 'deductions', 'net pay', 'gross salary', 'tax withheld', 'ytd', 'payslip', 'salary slip'],

  // Financial & Billing
  invoice: ['invoice no', 'amount due', 'billed to', 'subtotal', 'tax rate', 'terms of payment', 'invoice', 'total due', 'bill to'],
  receipt: ['paid', 'transaction id', 'auth code', 'card ending in', 'total amount', 'receipt', 'bill'],
  bankStatement: ['opening balance', 'closing balance', 'withdrawals', 'deposits', 'account no', 'bank statement', 'transaction history'],
  taxDocument: ['w-2', '1040', 'taxable income', 'declaration', 'financial year', 'internal revenue'],

  // Travel & Logistics
  travelTicket: ['pnr', 'e-ticket', 'boarding time', 'seat', 'terminal', 'passenger', 'flight', 'boarding pass', 'gate', 'departure', 'arrival'],
  itinerary: ['check-in', 'check-out', 'confirmation number', 'hotel', 'baggage allowance', 'itinerary'],

  // Legal & Official
  legal: ['hereinafter', 'whereas', 'binding agreement', 'terms and conditions', 'jurisdiction', 'hereby', 'agreement', 'in witness whereof', 'governing law'],
  nda: ['confidential information', 'disclosing party', 'trade secrets', 'obligations', 'nda', 'non-disclosure'],
  lease: ['tenant', 'landlord', 'security deposit', 'premises', 'lease term', 'rent amount'],
  idScan: ['date of birth', 'nationality', 'date of issue', 'expiration date', 'document no', 'passport', 'id scan'],

  // Academic & Education
  certification: ['hereby certifies', 'successfully completed', 'credential id', 'awarded to', 'certificate of completion', 'certification date', 'issued by'],
  transcript: ['course code', 'credits', 'gpa', 'semester', 'degree awarded', 'cum laude', 'academic transcript'],
  researchPaper: ['abstract', 'methodology', 'conclusion', 'references', 'citations', 'figure 1', 'whitepaper'],

  // Medical & Healthcare
  medicalReport: ['patient name', 'reference range', 'hemoglobin', 'result', 'specimen', 'physician', 'lab report', 'test results'],
  prescription: ['rx', 'dosage', 'refills', 'take [x] times daily', 'pharmacy', 'symptoms', 'medical prescription'],
  insurance: ['premium', 'deductible', 'coverage', 'beneficiary', 'policy number', 'claim', 'insurance policy']
};

/**
 * Analyzes raw text to determine its likely document type based on keyword density.
 * Designed to prevent ATS scoring on obvious non-resumes.
 * 
 * @param {string} text - The raw extracted text from the PDF.
 * @returns {Object} { isResume: boolean, identifiedType: string }
 */
export function detectDocumentType(text) {
  if (!text || text.trim().length < 50) {
    return { isResume: false, identifiedType: 'Unreadable / Too Short' };
  }

  const normalizedText = text.toLowerCase();
  const scores = {};

  // Calculate generic density for each category
  for (const [docType, markers] of Object.entries(DOCUMENT_MARKERS)) {
    let score = 0;
    for (const marker of markers) {
      if (normalizedText.includes(marker.toLowerCase())) {
        score++;
      }
    }
    scores[docType] = score;
  }

  const resumeScore = scores.resume;
  
  // Find the highest scoring NON-resume category
  let topNonResumeType = 'Unknown';
  let topNonResumeScore = 0;

  for (const [type, score] of Object.entries(scores)) {
    if (type !== 'resume' && score > topNonResumeScore) {
      topNonResumeScore = score;
      topNonResumeType = type;
    }
  }

  // Heuristic Logic:
  if (resumeScore >= 4 && topNonResumeScore < 3) {
    return { isResume: true, identifiedType: 'Resume' };
  }

  if (topNonResumeScore >= 2 && topNonResumeScore >= resumeScore) {
    const typeNames = {
      coverLetter: 'Cover Letter',
      offerLetter: 'Offer Letter',
      payslip: 'Payslip / Salary Slip',
      invoice: 'Invoice',
      receipt: 'Receipt / Bill',
      bankStatement: 'Bank Statement',
      taxDocument: 'Tax Document',
      travelTicket: 'Flight Ticket / Boarding Pass',
      itinerary: 'Travel Itinerary',
      legal: 'Contract / Agreement',
      nda: 'NDA (Non-Disclosure)',
      lease: 'Lease / Rental Agreement',
      idScan: 'ID Scan / Passport',
      certification: 'Certification / Diploma',
      transcript: 'Academic Transcript',
      researchPaper: 'Research / Whitepaper',
      medicalReport: 'Medical / Lab Report',
      prescription: 'Medical Prescription',
      insurance: 'Insurance Policy'
    };
    
    return { 
      isResume: false, 
      identifiedType: typeNames[topNonResumeType] || 'Non-Resume Document' 
    };
  }

  if (resumeScore < 3) {
    return { isResume: false, identifiedType: 'Non-Standard Document' };
  }

  return { isResume: true, identifiedType: 'Resume' };
}
