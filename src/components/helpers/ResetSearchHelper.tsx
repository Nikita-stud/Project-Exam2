'use client';
import { useEffect } from 'react';
import SearchStore from '@/store/searchStore';

export default function ResetSearchHelper() {
  const resetFormData = SearchStore((store) => store.resetFormData);

  useEffect(() => {
    resetFormData();
  }, []);

  return null;
}
