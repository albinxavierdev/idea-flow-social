
export type ContentType = 'short-form' | 'long-form';

export type CreativeStatus = 'ideation' | 'scripting' | 'editing' | 'published';

export type ProductionStage = 'not started' | 'shoot pending' | 'shoot done' | 'editing' | 'posted';

export interface ContentIdea {
  id: string;
  title: string;
  type: ContentType;
  creativeStatus: CreativeStatus;
  productionStage: ProductionStage;
  referenceLinks: string[];
  deploymentLinks: string[];
  shootFileLinks: string[];
  editFileLinks: string[];
  script: string;
  createdAt: string;
  updatedAt: string;
}
