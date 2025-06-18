import React, { createContext, useContext, useState, useEffect } from 'react';
import { Submission, Mod, Server } from '../types';

interface SubmissionContextType {
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string) => void;
  getPendingSubmissions: () => Submission[];
  getApprovedMods: () => Mod[];
  getApprovedServers: () => Server[];
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export function SubmissionProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const savedSubmissions = localStorage.getItem('submissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission: Omit<Submission, 'id' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions(prev => [...prev, newSubmission]);
  };

  const approveSubmission = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: 'approved' as const } : sub
      )
    );
  };

  const rejectSubmission = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: 'rejected' as const } : sub
      )
    );
  };

  const getPendingSubmissions = () => {
    return submissions.filter(sub => sub.status === 'pending');
  };

  const getApprovedMods = () => {
    return submissions
      .filter(sub => sub.type === 'mod' && sub.status === 'approved')
      .map(sub => sub.data as Mod);
  };

  const getApprovedServers = () => {
    return submissions
      .filter(sub => sub.type === 'server' && sub.status === 'approved')
      .map(sub => sub.data as Server);
  };

  return (
    <SubmissionContext.Provider value={{
      submissions,
      addSubmission,
      approveSubmission,
      rejectSubmission,
      getPendingSubmissions,
      getApprovedMods,
      getApprovedServers,
    }}>
      {children}
    </SubmissionContext.Provider>
  );
}

export function useSubmissions() {
  const context = useContext(SubmissionContext);
  if (context === undefined) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
}