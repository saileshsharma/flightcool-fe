export type PolicyStatus = 'active' | 'expired' | 'pending' | 'cancelled';
export type CoverageType = 'basic' | 'standard' | 'premium' | 'comprehensive';
export type ClaimStatus = 'submitted' | 'processing' | 'approved' | 'rejected' | 'paid';

export interface PolicyDocument {
  id: string;
  name: string;
  type: 'policy' | 'certificate' | 'receipt' | 'amendment';
  uploadedAt: string;
  fileSize: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  flightNumber: string;
  reason: string;
  amount: number;
  status: ClaimStatus;
  filedAt: string;
  resolvedAt?: string;
}

export interface PolicyHolder {
  id: string;
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  
  // Policy Info
  policyNumber: string;
  coverageType: CoverageType;
  startDate: string;
  endDate: string;
  premiumAmount: number;
  status: PolicyStatus;
  
  // Related data
  documents: PolicyDocument[];
  claims: Claim[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
