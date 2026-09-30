import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { StickySubNav } from '../components/ugc-net/StickySubNav';
import { UgcNetHero } from '../components/ugc-net/UgcNetHero';
import { ExamBlueprintSection } from '../components/ugc-net/ExamBlueprintSection';
import { Paper1Section } from '../components/ugc-net/Paper1Section';
import { Paper2Section } from '../components/ugc-net/Paper2Section';
import { ComputerScienceSection } from '../components/ugc-net/ComputerScienceSection';
import { RoadmapSection } from '../components/ugc-net/RoadmapSection';
import { PyqStrategySection } from '../components/ugc-net/PyqStrategySection';
import { StudyMaterialSection } from '../components/ugc-net/StudyMaterialSection';
import { OerLibrarySection } from '../components/ugc-net/OerLibrarySection';
import { MocksAndStrategySection } from '../components/ugc-net/MocksAndStrategySection';

const STORAGE_KEY_P1 = 'ugc_net_completed_p1_units';
const STORAGE_KEY_CS = 'ugc_net_completed_cs_units';
const STORAGE_KEY_WEEKS = 'ugc_net_completed_roadmap_weeks';

export const UgcNetHubPage: React.FC = () => {
  // Paper 1 Completed Units State
  const [completedP1Units, setCompletedP1Units] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_P1);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Paper 2 CS Completed Units State
  const [completedCsUnits, setCompletedCsUnits] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Roadmap Completed Weeks State
  const [completedRoadmapWeeks, setCompletedRoadmapWeeks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEEKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Paper 2 Subject
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('subject-87');

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_P1, JSON.stringify(completedP1Units));
    } catch {
      // Ignore
    }
  }, [completedP1Units]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CS, JSON.stringify(completedCsUnits));
    } catch {
      // Ignore
    }
  }, [completedCsUnits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEEKS, JSON.stringify(completedRoadmapWeeks));
    } catch {
      // Ignore
    }
  }, [completedRoadmapWeeks]);

  // Handlers for toggles
  const handleToggleP1Unit = (unitId: string) => {
    setCompletedP1Units((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
    );
  };

  const handleToggleCsUnit = (unitId: number) => {
    setCompletedCsUnits((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
    );
  };

  const handleToggleRoadmapWeek = (weekNum: number) => {
    setCompletedRoadmapWeeks((prev) =>
      prev.includes(weekNum) ? prev.filter((w) => w !== weekNum) : [...prev, weekNum]
    );
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -72;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pb-16 transition-colors duration-200"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb 
          items={[
            { label: 'Exams', path: '/exams' },
            { label: 'UGC-NET & JRF Preparation Hub' }
          ]} 
        />
      </div>

      {/* Hero Section */}
      <UgcNetHero
        onExploreRoadmap={() => scrollToElement('roadmap')}
        onExploreStudyMaterial={() => scrollToElement('study-material')}
      />

      {/* Sticky Section Navigation */}
      <StickySubNav />

      {/* 01: Exam Blueprint Section */}
      <ExamBlueprintSection />

      {/* 02: Paper 1 Section (with Visual Progression Timeline) */}
      <Paper1Section
        completedUnits={completedP1Units}
        onToggleUnitCompletion={handleToggleP1Unit}
      />

      {/* 03: Paper 2 Section (Domain-Specific) */}
      <Paper2Section
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={setSelectedSubjectId}
      />

      {/* Computer Science (Subject 87) 10-Unit Grid */}
      <ComputerScienceSection
        completedCsUnits={completedCsUnits}
        onToggleCsUnitCompletion={handleToggleCsUnit}
      />

      {/* 04: Master Roadmap (24 Weeks & 90 Days) */}
      <RoadmapSection
        completedWeeks={completedRoadmapWeeks}
        onToggleWeekCompletion={handleToggleRoadmapWeek}
      />

      {/* 05: PYQ Strategy & Error Log System */}
      <PyqStrategySection />

      {/* 06: Study Material Guide */}
      <StudyMaterialSection />

      {/* 07: Open Educational Resources (OER) Digital Library */}
      <OerLibrarySection />

      {/* 08: Mocks & 3-Pass Exam-Day Strategy */}
      <MocksAndStrategySection />

    </div>
  );
};
