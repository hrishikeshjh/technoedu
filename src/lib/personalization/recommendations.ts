import { LearningResource } from './userLearningProfile';

export function getRecommendedResources(
  resources: LearningResource[],
  preparationLevel: string = 'Intermediate',
  preferredTypes: string[] = []
): LearningResource[] {
  if (!resources || resources.length === 0) return [];

  // Sort resources by priority according to user preferences and level
  return [...resources].sort((a, b) => {
    // 1. Check if resource type matches user's preferred learning methods
    const aTypeMatch = preferredTypes.some((t) =>
      t.toLowerCase().includes(a.resource_type.toLowerCase())
    );
    const bTypeMatch = preferredTypes.some((t) =>
      t.toLowerCase().includes(b.resource_type.toLowerCase())
    );

    if (aTypeMatch && !bTypeMatch) return -1;
    if (!aTypeMatch && bTypeMatch) return 1;

    // 2. Check difficulty match
    if (a.difficulty === preparationLevel && b.difficulty !== preparationLevel) return -1;
    if (a.difficulty !== preparationLevel && b.difficulty === preparationLevel) return 1;

    return 0;
  });
}
