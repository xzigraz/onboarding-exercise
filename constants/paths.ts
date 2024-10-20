export type PATH = string;

export const PATH_TO_ONBOARDING: PATH = `/onboarding`;
export const getOnboardingPath = (step?: number, id?: string): PATH => `${PATH_TO_ONBOARDING}/${id}/${step}`;