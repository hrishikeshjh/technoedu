export interface FilterableResource {
  id: string;
  course_id: string;
  visibility?: string;
  subject_id?: string | null;
  [key: string]: any;
}

export function filterResourcesByCourse<T extends FilterableResource>(
  resources: T[],
  activeCourseId: string,
  userEnrolledCourses?: string[]
): T[] {
  if (!activeCourseId) return resources;

  return resources.filter((resource) => {
    // Universal resources allowed for all
    if (resource.visibility === 'all_courses') return true;

    // Strict isolation: must match active course
    if (resource.course_id === activeCourseId) return true;

    return false;
  });
}

export function filterSearchByCourse<T extends FilterableResource>(
  results: T[],
  activeCourseId: string
): T[] {
  if (!activeCourseId) return results;

  return results.filter((item) => {
    if (item.visibility === 'all_courses') return true;
    return item.course_id === activeCourseId;
  });
}

export function isResourceAuthorized(
  resource: FilterableResource,
  enrolledCourseIds: string[]
): boolean {
  if (resource.visibility === 'all_courses') return true;
  return enrolledCourseIds.includes(resource.course_id);
}
